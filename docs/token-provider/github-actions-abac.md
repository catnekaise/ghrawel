# GitHub Actions Attribute-based Access Control
> [!NOTE]
> For additional information about this subject, read up on https://catnekaise.github.io/github-actions-abac-aws/cognito-identity/.

By utilizing Cognito Identity, attribute-based access control (ABAC) can be leveraged to only allow GitHub Actions the permissions to request installation access tokens from a token provider under precise conditions.

## Table of Contents

* [Note About Token Providers](#note-about-token-providers)
* [Policy Examples](#policy-examples)
* [Actions Constructs](#actions-constructs)
* [Setup](#setup)
   * [1. GitHub](#1-github) 
   * [2. AWS CDK](#2-aws-cdk)
   * [3. GitHub Actions](#3-github-actions)
   * [4. Test the workflow](#4-test-the-workflow)
   * [5. Test limits of granted access](#5-test-limits-of-granted-access)
   * [6. Cleanup](#6-cleanup)
* [Constraining](#constraining)
* [Path Strategies](#path-strategies)
   * [POLICY_VAR - REPOSITORY](#policy_var---repository)
   * [OWNER](#owner)
   * [ANY_REPOSITORY](#any_repository)
   * [REPOSITORIES](#repositories)
* [Job Workflow Ref](#job-workflow-ref)
   * [Tag Protection Rules](#tag-protection-rules)
   * [SHA](#sha)

## Note About Token Providers
There's no difference in how a token provider is configured when used for ABAC in GitHub Actions compared to RBAC in GitHub Actions or RBAC for automations running in AWS. However, it may be best to create separate token providers for usage with ABAC rather than re-using the same token provider across ABAC and RBAC.

## Policy Examples
For the following examples, the token provider is named `example-provider` and requires specifying both the `owner` and `repo` as part of the path (`x/example-provider/{owner}/{repo}`).

```json5
{
  "Version": "2012-10-17",
  "Statement": [
    // A Regular statement granting a role permission to a single repository in the token provider
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/example-repo"
    },
    // Requiring that the value of current sessionTag/PrincipalTag `repository` matches {owner}/{repo}
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/${aws:PrincipalTag/repository}"
    },
    // Requiring that the value of current sessionTag/PrincipalTag `repository` matches {owner}/{repo},
    // also requiring value of current sessionTag/PrincipalTag `ref` matches `refs/heads/main`
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/${aws:PrincipalTag/repository}",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalTag/ref": "refs/heads/main"
        }
      }
    },
    // and some more examples
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/${aws:PrincipalTag/repository}",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalTag/ref": "refs/heads/main",
          // Require the workflow job has specified running in environment named either `dev` `test` or `prod`
          "aws:PrincipalTag/environment": [
            "dev",
            "test",
            "prod"
          ],
          // Require the workflow was triggered/approved by one of the listed users
          "aws:PrincipalTag/actor": [
            "djonser",
            "user1",
            "user2",
            "user3",
            "user4"
          ],
          // Require workflow job running on a self-hosted GitHub Actions runner
          "aws:PrincipalTag/runner_environment": "self-hosted",
          // Require workflow was executed by workflow_dispatch or as part of a pull_request
          "aws:PrincipalTag/event_name": [
            "workflow_dispatch",
            "pull_request"
          ],
        },
        "StringLike": {
          // Require that the workflow that is running is any workflow located on the main branch in the repository `catnekaise/example-workflows`
          "aws:PrincipalTag/job_workflow_ref": "catnekaise/example-workflows/.github/workflows/*@refs/heads/main",
          // Require that the workflow is running in a repository which name starts with `example-`
          "aws:PrincipalTag/repository": "catnekaise/example-*"
        }
      }
    }
  ]
}
```

## Actions Constructs
[catnekaise/actions-constructs](https://github.com/catnekaise/actions-constructs) is a CDK library for configuring Cognito Identity in context with GitHub Actions and it will be used in the setup examples below.

```shell
npm install -s @catnekaise/actions-constructs
```

# Setup
> [!NOTE]
> Follow the setup guide the repositories root [README.md](../../README.md) until you have completed all steps except **Cleanup** and then head back over here again.

The following setup will demonstrate how using Cognito Identity, a single AWS IAM role with a single identity policy used by two (or thousands of) different repositories only allows an individual repository to request a token that targets their own repository. This is followed up by re-configuring to add a condition that the token may only be requested if the workflow is running on the main branch in the repository, preventing any non-protected feature branches from requesting tokens. 

## 1. GitHub

1. Create two new repositories in GitHub. They will be referred to as `test-repo-1` and `test-repo-2` below but can be created with any name you want.
2. Install the already created GitHub App in both of these repositories.

## 2. AWS CDK
> For more in depth documentation about configuring Cognito Identity as seen below, read documentation in [catnekaise/actions-constructs](https://github.com/catnekaise/actions-constructs).

In addition to what has already been deployed the following infrastructure will be created:

- A Cognito Identity Pool to map the GitHub Actions claims `repository`, `job_workflow_ref`, `ref`, `environment` and `actor`.
- An AWS IAM Role that can be assumed by GitHub Actions running in your organization/user

1. Copy the new relevant parts of the example below to your current stack
2. Locate `GitHubActionsClaimConstraint.repoOwners('catnekaise')` and replace the value `catnekaise` with your own organization or user where you are testing this
2. Re-deploy the stack

```typescript
import { ActionsIdentityMappedClaims, ActionsIdentityPoolV2, GhaClaim, GitHubActionsClaimConstraint } from '@catnekaise/actions-constructs';

declare const stack: cdk.Stack;

declare const apps: ManagedGitHubApps;
declare const tokenProviderApi: TokenProviderApi;
declare const provider: ITokenProvider;


// Add the rest of this example to your current stack
const mappedClaims = ActionsIdentityMappedClaims.create(
  GhaClaim.REPOSITORY,
  GhaClaim.JOB_WORKFLOW_REF,
  GhaClaim.REF,
  GhaClaim.ENVIRONMENT,
  GhaClaim.ACTOR,
);

const pool = new ActionsIdentityPoolV2(stack, 'Pool', {
  authenticatedRoleConstraints: [
    // Change value
    GitHubActionsClaimConstraint.repoOwners('catnekaise'),
  ],
  mappedClaims,
  authenticatedRoleName: 'GhaCognito',
});

const grant = provider.grantExecuteGitHubActionsAbac(pool.defaultAuthenticatedRole, {
  claimsContext: mappedClaims.toClaimsContext(),
});

new CfnOutput(stack, 'RoleArn', {
  value: pool.defaultAuthenticatedRole.roleArn,
});
```

## 3. GitHub Actions

1. Create a third test repository to be used for shared workflows. This repository may have any name but will be referred to as `test-workflows` going forward.
2. Configure the `test-workflows` repository to allow other private repositories to use workflows from it. Read more in [official docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#allowing-access-to-components-in-a-private-repository)
3. Create the example workflow below in `test-workflows` repository at path `.github/workflows/create-issue.yaml` and change the values that require changing as indicated by comments.

```yaml
on:
  workflow_call:
    inputs:
      owner:
        required: false
        default: ""
        description: "Owner"
        type: string
      repo:
        required: false
        default: ""
        description: "Repo"
        type: string
jobs:
  job1:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: catnekaise/ghrawel-token@v1
        id: token
        with:    
          auth-type: "identity-pool-basic"
          provider-name: "example-provider"
          owner: "${{ inputs.owner }}"
          repo: "${{ inputs.repo }}"
          # Change value to id of the AWS Account containing the Identity Pool
          aws-account-id: "1234567890"
          # Change value to the AWS Region where the Identity Pool is located
          aws-region: "eu-west-1"
          
          # The remaining configuration is available as CloudFormation outputs if example above was used
          # Change value to match base url of RestApi
          base-url: "https://abc123d4.execute-api.eu-west-1.amazonaws.com/dev"
          # Change value to id of Identity Pool that was created
          identity-pool-id: "eu-west-1:example"
          # Change value to ARN of the ARN of role that was created above
          role-arn: "arn:aws:iam::111111111111:role/GhaCognito"

      - name: "Use Token to create issue"
        uses: actions/github-script@v7
        with:
          github-token: "${{ steps.token.outputs.token }}"
          script: |
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Test Issue',
              body: 'Hello from GitHub Actions'
            });
```

### 3.1 Workflow for test-repo-1 and test-repo-2

1. Create a new workflow in both `test-repo-1` and `test-repo-2` containing the workflow example below. 
2. Change the value of `uses` to reflect where your `test-workflows` repository exists

```yaml
name: "ghrawel test workflow"
on:
  workflow_dispatch:
    inputs:
      owner:
        required: false
        default: ""
        description: "Owner"
      repo:
        required: false
        default: ""
        description: "Repo"
jobs:
  job1:
    # Change this value to reflect the name of the organization/user and repository where you are testing this
    uses: catnekaise/test-workflows/.github/workflows/create-issue.yaml@main
    permissions:
      id-token: write
      contents: read
    with:
      owner: "${{ inputs.owner }}"
      repo: "${{ inputs.repo }}"
```

## 4. Run the workflow
> [!NOTE]
> If this step fails and you eventually resolve it, please create an issue in this repository if anything could have been made more clear. 

1. Head over to the Actions tab in one of your two test repositories and locate the workflow
2. Click on `Run workflow` but do not enter details for either `owner` or `repo`.
3. Assuming everything was correctly configured, running the workflow in both `test-repo-1` and `test-repo-2` shall create a new issue in respective repository.

## 5. Test limits of granted access

1. Trigger the workflow again in one of the repositories, but this time enter a value for the `repo` field that is available and specify the name of the other repository. (For example, if running in `test-repo-1` then write `test-repo-2` in the repo field and vice versa.)
   - For example, if running in `test-repo-1` then write `test-repo-2` in the repo field and vice versa.
2. This workflow will fail to complete.

The reason for the workflow failing is that the repository is not allowed to invoke the API Gateway RestAPI with a different value for the path parameter variable `{repo}` than what its own name is. `test-repo-1` is allowed to specify exactly `test-repo-1` and nothing else.

### 5.1 Add a condition to permission granted

1. Create a new branch in one of your two test repositories. The name of the branch can be any valid branch name.
2. Go back to Actions and re-run the workflow, only this time, select `Use workflow from` before triggering the workflow and select the newly created branch instead of using the default branch.
   - Workflow will successfully complete.
3. In the CDK Stack, append the two lines shown in the code example below.
   - If using a different value for the default branch than `main` then specify that name instead.
4. Re-deploy the stack.
5. Run the workflow once again on the new branch.
    - Workflow will fail.
4. Run the workflow on the default branch again.
   - Workflow will successfully complete.

The reason for the workflow failing to run on the new branch after stack re-deployment is that the permission is now granted on the condition that the workflow is running on the main branch. See [policy examples](#policy-examples) further up.

```typescript
const constrainer = pool.policyUtility.constrainGrant(grant);
constrainer.refLike('refs/heads/main');
```

## 6. Cleanup
Either go back to [README.md](../../README.md#7-cleanup) and follow the cleanup guide or continue reading before cleanup.

# Constraining
> [!NOTE] 
> Read more about this topic in [catnekaise/actions-constructs](https://github.com/catnekaise/actions-constructs?tab=readme-ov-file#constraints).

> [!NOTE]
> It's not a requirement to use the constrainer or even the [catnekaise/actions-constructs](https://github.com/catnekaise/actions-constructs) library, but it can greatly simplify configuring Cognito Identity and permissions granted in context of roles assumed via Cognito Identity when using GitHub Actions.

The return value of `grantExecuteGitHubActionsAbac(role, settings)` is an [iam.Grant](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.Grant.html). A grant contains policy statements and these statements can be appended with additional actions, resources and `conditions`. By creating `constrainer` as seen in the example below, it becomes possible to add the conditions on the policy statement using the methods as seen in the example.

```typescript
import { ConditionOperator } from '@catnekaise/cdk-iam-utilities';
import { ActionsIdentityPoolV2 } from '@catnekaise/actions-constructs';

declare const pool: ActionsIdentityPoolV2;
declare const grant: iam.Gran;

const constrainer = pool.policyUtility.constrainGrant(grant);

const approvers = ['djonser', '...', '...'];

constrainer
  // Requirement workflow job running in the environment equal to name `prod`
  .environmentEquals('prod')
  // Require workflow triggered (or approved via environment) by one of the users in approvers array
  .approvedBy(...approvers)
  // Require the workflow running is located at catnekaise/deployment-workflows/.github/workflows/cdk-deploy.yaml@refs/heads/main
  .jobWorkflowLike('catnekaise', 'deployment-workflows', 'cdk-deploy.yaml', 'refs/heads/main')
  // Require the workflow is running on a self-hosted runner
  .whenSelfHosted()
  // require the repository running the workflow is in organization catnekaise and the repository name starts with `test-`
  .repositoryLike('catnekaise/test-*')
  // Require event that triggered workflow is `workflow_dispatch`
  .claimEquals(GhaClaim.EVENT_NAME, 'workflow_dispatch')
  // Require the repository environment name starts with `dev-`
  .claimLike(GhaClaim.ENVIRONMENT, 'dev-*')
  // But also require that the repository environment name does not equal `dev-custom`
  .claimCondition(ConditionOperator.STRING_NOT_EQUALS, GhaClaim.ENVIRONMENT, 'dev-custom');
```

# Path Strategies
> [!NOTE]
> Path strategies is only used in the specific context that is GitHub Actions ABAC.

When using `grantExecute(role)` its possible to specify a specific owner and/or repositories that shall be granted access to.

When using GitHub Actions ABAC and granting access via `grantExecuteGitHubActionsAbac(role,settings)`, a `path strategy` is used and the default path strategy if not provided is `POLICY_VAR` with value `REPOSITORY`. The configured path strategy is used to configure the remaining part on the ARN that is granted access to.

The value calculated based on the path strategy is appended to: `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET`.

| Strategy                                | Path                                                          | Comment |
|-----------------------------------------|---------------------------------------------------------------|---------|
| POLICY_VAR (REPOSITORY)                 | /x/example-provider/${aws:principalTag/repository}            | Default |
| POLICY_VAR (REPOSITORY_OWNER)           | /x/example-provider/${aws:principalTag/repository_owner}      |         |
| POLICY_VAR (REPOSITORY_OWNER with repo) | /x/example-provider/${aws:principalTag/repository_owner}/REPO |         |
| ANY_REPOSITORY                          | /x/example-provider/*                                         |         |
| OWNER                                   | /x/example-provider/OWNER/*                                   |         |
| REPOSITORIES                            | /x/example-provider/OWNER/REPO                                |         |


## POLICY_VAR - REPOSITORY
> Grants access to resource: `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/${aws:PrincipalTag/repository}`

The strategy `POLICY_VAR` with value `PathPolicyVariable.REPOSITORY` is the default behaviour of `grantExecuteGitHubActionsAbac`. This places a requirement that the `repository` claim is mapped in Cognito Identity and that the endpoint type is `DEFAULT`. This will grant a permission that allows the repository to ask the token provider for a token targeting itself.

```typescript
provider.grantExecuteGitHubActionsAbac(pool.defaultAuthenticatedRole, {
  claimsContext: mappedClaims.toClaimsContext(),
  pathStrategy: TokenProviderPathStrategy.policyVarRepository(),
});
```

| Repository making request | Path                                         | Outcome |
|---------------------------|----------------------------------------------|---------|
| catnekaise/test-repo-1    | /x/example-provider/catnekaise/test-repo-1   | Allowed |
| catnekaise/test-repo-1    | /x/example-provider/catnekaise/test-repo-2   | Denied  |
| catnekaise/test-repo-1    | /x/example-provider/catnekaise-2/test-repo-1 | Denied  |
| catnekaise/test-repo-2    | /x/example-provider/catnekaise/test-repo-2   | Allowed |
| catnekaise/test-repo-2    | /x/example-provider/catnekaise/test-repo-1   | Denied  |

## POLICY_VAR - REPOSITORY_OWNER
> Grants access to resource: `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/${aws:PrincipalTag/repository}`

The strategy `POLICY_VAR` with value `PathPolicyVariable.REPOSITORY_OWNER` should not be used if the app is not installed in multiple GitHub organizations/users. It requires that the `repository_owner` claim is mapped in Cognito Identity. This strategy can work with any endpoint type. This will grant a permission that allows the repository to target any repository in the same organization/user where GitHub Actions is running this workflow.

```typescript
provider.grantExecuteGitHubActionsAbac(pool.defaultAuthenticatedRole, {
  claimsContext: mappedClaims.toClaimsContext(),
  pathStrategy: TokenProviderPathStrategy.policyVarRepositoryOwner(),
});
```

| Repository making request | Path                                        | Outcome |
|---------------------------|---------------------------------------------|---------|
| catnekaise/test-repo-1    | /x/example-provider/catnekaise/test-repo-1  | Allowed |
| catnekaise/test-repo-1    | /x/example-provider/catnekaise/test-repo-2  | Allowed |
| catnekaise/test-repo-2    | /x/example-provider/catnekaise/test-repo-2  | Allowed |
| catnekaise/test-repo-2    | /x/example-provider/catnekaise/test-repo-1  | Allowed |
| catnekaise/test-repo-1    | /x/example-provider/catnekaise/test-repo-3  | Allowed |
| catnekaise/test-repo-2    | /x/example-provider/catnekaise2/test-repo-2 | Denied  |

### REPOSITORY_OWNER and selection of repositories
> Grants access to resource: `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/${aws:PrincipalTag/repository}/test-repo-1` and `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/${aws:PrincipalTag/repository}/test-repo-2`

It's possible to include that only a selection of repositories shall be allowed as long as the token provider does not use an `OWNER_ENDPOINT`. Each specified repo create one ARN in the policy statement.


```typescript
provider.grantExecuteGitHubActionsAbac(pool.defaultAuthenticatedRole, {
  claimsContext: mappedClaims.toClaimsContext(),
  pathStrategy: TokenProviderPathStrategy.policyVarRepositoryOwner('test-repo-1', 'test-repo-2'),
});
```

| Repository making request | Path                                       | Outcome |
|---------------------------|--------------------------------------------|---------|
| catnekaise/test-repo-1    | /x/example-provider/catnekaise/test-repo-1 | Allowed |
| catnekaise/test-repo-1    | /x/example-provider/catnekaise/test-repo-2 | Allowed |
| catnekaise/test-repo-2    | /x/example-provider/catnekaise/test-repo-1 | Allowed |
| catnekaise/test-repo-2    | /x/example-provider/catnekaise/test-repo-2 | Allowed |
| catnekaise/other-repo     | /x/example-provider/catnekaise/test-repo-1 | Allowed |
| catnekaise/other-repo     | /x/example-provider/catnekaise/test-repo-2 | Allowed |
| catnekaise/test-repo-1    | /x/example-provider/catnekaise/test-repo-3 | Denied  |

## OWNER
> `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/*`

Strategy `OWNER` shall be considered admin-like as it grants the role permissions to target all repositories in the organization/user.

```typescript
provider.grantExecuteGitHubActionsAbac(pool.defaultAuthenticatedRole, {
  pathStrategy: PathStrategy.selectOwner('catnekaise'),
});
```

## ANY_REPOSITORY
> Grants access to resource: `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/*`

Effectively the same as strategy `OWNER` (and shall also be considered admin-like) but would grant access to target any organization/user that have the app installed.

```typescript
provider.grantExecuteGitHubActionsAbac(pool.defaultAuthenticatedRole, {
  claimsContext: mappedClaims.toClaimsContext(),
  pathStrategy: PathStrategy.anyRepository(),
});
```

## REPOSITORIES
> Grants access to resource path:`arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/repo-1` and `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/repo-2`

Grant permissions to target one or more specific repositories within a single organization.

```typescript
provider.grantExecuteGitHubActionsAbac(pool.defaultAuthenticatedRole, {
  pathStrategy: PathStrategy.selectRepositories('catnekaise', 'repo-1', 'repo-2'),
});
```

# Job Workflow Ref
When requesting installation access tokens to be used in GitHub Actions, consider adding a requirement on condition `job_workflow_ref` for those instances where the token provider returns installation access tokens with sensitive permissions. Requiring this claim means additional guardrails can be used such as branch protection rules, tag protection rules and CODEOWNERS in GitHub. 

Consider an organization repository such as the example `automation-workflows` where the branch protection rule requires review by `CODEOWNERS` before merging changes to the `main` branch and a CODEOWNER rule that requires a certain team to approve when matching workflows ending with `.deploy.yaml`.

```typescript
const constrainer = exampleProvider.grantExecuteGitHubActionsAbac(pool.defaultAuthenticatedRole, {
  claimsContext: mappedClaims.toClaimsContext(),
});

constrainer.jobWorkflowLike('catnekaise', 'automation-workflows', '*.deploy.yaml', 'refs/heads/main');
```

## Tag

```typescript
constrainer.jobWorkflowLike('catnekaise', 'automation-workflows', '*.deploy.yaml', 'v1');
```

## SHA

```typescript
constrainer.jobWorkflowLike('catnekaise', 'automation-workflows', '*.deploy.yaml', 'abcdef1234abcdef1234abcdef1234abcdef1234');
```
