[![npm (scoped)](https://img.shields.io/npm/v/@catnekaise/ghrawel?style=flat-square)](https://www.npmjs.com/package/@catnekaise/ghrawel)
[![Nuget](https://img.shields.io/nuget/v/Catnekaise.CDK.Ghrawel?style=flat-square)](https://www.nuget.org/packages/Catnekaise.CDK.Ghrawel/)
[![PyPI](https://img.shields.io/pypi/v/catnekaise.ghrawel?style=flat-square)](https://pypi.org/project/catnekaise.ghrawel/)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/catnekaise/ghrawel?sort=semver&style=flat-square)](https://github.com/catnekaise/ghrawel/releases)

# ghrawel
`gh`r`aw`el will aim to provide components that help integrate GitHub and AWS using primarily AWS CDK and minimal application code.

# Token Provider

Use this to deploy an AWS API Gateway RestAPI capable of returning GitHub App installation access tokens and use AWS IAM to control access to this API.

## Table of Contents

* [Use Case](#use-case)
* [When not to use this](#when-not-to-use-this)
* [How it Works](#how-it-works)
* [Setup](#setup)
    * [Costs](#costs)
    * [1. GitHub](#1-github)
    * [2. AWS CDK](#2-aws-cdk)
    * [3. Add Private Key in Parameter Store](#3-add-private-key-in-parameter-store)
    * [4. Request a token](#4-request-a-token)
    * [5. Use the token](#5-use-the-token)
    * [6. Test limits of the token](#6-test-limits-of-the-token)
    * [7. Cleanup](#7-cleanup)
* [Granting Access](#granting-access)
* [Get Token - cURL](#get-token---curl)
* [Get Token - GitHub Actions](#get-token---github-actions)
* [Customize RestAPI and Lambda](#customize-restapi-and-lambda)
* [Next Steps](#next-steps)
    * [Token Providers](#next-steps)
    * [AWS IAM](#next-steps)
    * [Application](#next-steps)
    * [Usage](#next-steps)
    * [GitHub Actions Attribute-based Access Control](#next-steps)
    * [Infrastructure](#next-steps)
    * [Logging](#next-steps)
* [Contributions](#contributions)

## Use case

The private key belonging to a [GitHub App](https://docs.github.com/en/apps/overview) can be used to [create installation access tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app) that only contains a [selection of the permissions](https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#create-an-installation-access-token-for-an-app) that the GitHub App has been granted and also for a limited number of repositories that the GitHub App has been installed in. This installation access token has a maximum lifetime of an hour and can [revoke](https://docs.github.com/en/rest/apps/installations?apiVersion=2022-11-28#revoke-an-installation-access-token) itself.

Use ghrawel to control access to sensitive GitHub API credentials within an AWS and GitHub Actions environments, when such requirements exist.

## When not to use this

Creating PATs or GitHub App Private keys is easy and they are simple to use whether stored in AWS or as a GitHub secret. Using this solution introduces new components and complexity that has to be managed and such a thing is not always worth it.

## How it works
An application or a GitHub Actions workflow with access to AWS IAM Credentials initiates the sequence of events by signing a HTTP request with those credentials.

```mermaid
sequenceDiagram
    autonumber
    participant HTTP as HTTP Request
    participant App as Application/GHA
    note over App: Has AWS IAM Credentials
    participant API as API Gateway
    participant Authorizer as IAM Authorizer
    participant Lambda as Lambda
    participant GitHub as GitHub API
    App->>HTTP: Create and Sign
    App->>API: Send Request
    API->>Authorizer: Authorization
    alt if not authorized
        API-->>App: 401
    end
    API->>Lambda: Forward Authorized Request
    Lambda->>Lambda: Additional validation
    alt if validation fails
        Lambda-->>API: 400 Bad Request
        API-->>App: 400 Bad Request
    end
    Lambda->>GitHub: Request Token
    Lambda->>API: Token Response
    API->>App: Token Response
    App->>GitHub: Uses token    
```

# Setup

> [!NOTE]
> The machine deploying will require docker as [catnekaise/ghrawel-tokenprovider-lambda-go](https://github.com/catnekaise/ghrawel-tokenprovider-lambda-go) will be built to run in the lambda function. See [Dockerfile](./lambda/default/Dockerfile) and [application](./docs/token-provider/application.md) for more.

> [!NOTE]
> This guide assumes some familiarity with AWS CDK.

This test setup can be tested with a GitHub App that only has access to a single test repository in GitHub and this repository (and app) can be on your user instead of in your organization.

## Costs

Assuming that you make `10 000` requests using this test setup, the cost of lambda and cloudwatch is covered under the free tier. The cost of the API Gateway RestApi will be between free and 0.035$ depending on how old the AWS Account is. Depending on your AWS Environment there could be charges for CloudTrail, Config, other tools and any custom automations that might create additional resources based on the resources deployed. It's best to test this is a sandbox account.

There are no charges related to GitHub.

## 1. GitHub

> https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app

For our testing purposes we need to create a test `repository` and a `GitHub App`. The app being created shall be considered a test app and should not be granted unnecessary permissions or installed anywhere but in repositories used for testing this. The link above provides additional information about working with GitHub Apps.

1. Create a new empty repository in your organization or on your user which can be used for testing.
    - When creating this repository, initialize the repository so that a default branch with a README.md file is created.
2. Create a GitHub App in the same organization or user and grant `read & write` on the repository level permissions `contents` and `issues`.
    - Do not add configuration under `Identifying and authorizing users` as this app is not for users
    - Put any url under `Homepage URL` as its a required field
    - Deselect `active` under webhook as no webhook shall be configured for this use-case
    - Keep `only on this account` selected
3. Note down the `id` of the GitHub App as it will be used later.
4. Create a new private key for this GitHub App and keep it around as it will be used later.
5. Install the GitHub App in the single test repository that was created further above

## 2.1 Installation
> [!NOTE]
> CDK for .NET can also be used to test this but examples below has to be translated.

```shell
cdk init --language typescript
npm install -s @catnekaise/ghrawel
```

## 2.2 AWS CDK

1. Change the value of `defaultAppId` in the example below to match your newly created GitHub App.
2. Synthesis the stack and review what changes will be made before finally deploying the stack into a sandbox account.

```typescript
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { ManagedGitHubApps, GitHubAppSecretsStorage, TokenProviderApi, PermissionLevel } from '@catnekaise/ghrawel';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'TokenProviderStack');

const apps = new ManagedGitHubApps(stack, 'Apps', {
  // Change this value
  defaultAppId: 1234,
  storage: GitHubAppSecretsStorage.PARAMETER_STORE,
});

const tokenProviderApi = new TokenProviderApi(stack, 'TokenProviderApi', {
  apps,
});

const provider = tokenProviderApi.newTokenProvider('example-provider', {
  permissions: {
    contents: PermissionLevel.READ,
    issues: PermissionLevel.WRITE,
  },
});
```

## 3. Add Private Key in Parameter Store

When the stack has completed its deployment a secure string parameter will have been initialized at path `/catnekaise/github-apps/default` in `Systems Manager Parameter Store` with value `placeholder`. Go there and enter the full text value of GitHub App Private Key created earlier inside the value field of this parameter.

## 4. Request a token

The easiest way to see that this is now working and to request an access token is to head over to the API Gateway in the AWS Console. Examples on how to request a token with [cURL](#get-token---curl) or [GitHub Actions](#get-token---github-actions) can be seen further down, and more in additional [usage docs](./docs/token-provider/usage.md).

1. Open the API that was created.
2. Find the single `GET` method created and select it.
3. Click on the `Test` tab.
4. Enter the name of the organization or user where the test repository is located in the form field labeled `owner`.
5. Enter the name of the test repository in the form field labeled `repo`.
6. Click on the Test button.
7. If everything was done correctly, the response should look similar to below.

![](./docs/images/apigw-console.png)

## 5. Use the token

In this example cURL is used to create an issue in your test repository. Either use this example or use a tool of your choice with the same input. After Successfully performing this test there should be a new issue in your test repository.

```shell
#!/usr/bin/env bash

OWNER="Enter name of organization or user"
REPO="Enter name of repo"
TOKEN="Enter token"

curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Token ${TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/${OWNER}/${REPO}/issues" \
  -d '{"title":"Testing using app installation token","body":"Testing using app installation token"}'
```

## 6. Test limits of the token

If a GitHub App was created with the example permissions further above and the token provider was configured the with access `read` or the permission `contents`, then the token shall be able to read contents in the repository but not write content to the repository.

### 6.1 Read README.md

The following cURL command will fetch the contents of `README.md` and print out body the full JSON body and decode the value of `content` in the body.

```shell
#!/usr/bin/env bash

OWNER="Enter name of organization or user"
REPO="Enter name of repo"
MY_TOKEN="Enter token Value"

README_MD=$(curl -s -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Token ${MY_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/${OWNER}/${REPO}/contents/README.md")
   
echo "$README_MD"

echo "$README_MD" | jq -r '.content' | base64 -d
```

### 6.2 Write TEST.md

Again, assuming setup have been done as example above, the following cURL command shall **fail** to create the file `TEST.md` in the test repositories default branch.

```shell
#!/usr/bin/env bash

OWNER="Enter name of organization or user"
REPO="Enter name of repo"
MTOKEN="Enter token Value"

curl --fail-with-body -L \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Token ${TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/${OWNER}/${REPO}/contents/TEST.md" \
  -d '{"message":"my commit message","content":"SGVsbG8gZnJvbSBjYXRuZWthaXNlCg=="}'
```

### 6.3 Create a second token provider

Update the stack by creating a second token provider that is granted `write` for the `contents` permission and re-deploy the stack.

```typescript
tokenProviderApi.newTokenProvider('example-provider-2', {
  permissions: {
    contents: PermissionLevel.WRITE,
  },
});
```

### 6.4 Retry Creating TEST.md

After deployment, refresh the page in the web browser where you previously generated a token and find the second `GET` method available under the path `/x/example-provider-2/{owner}/{repo}`. Use this token provider to generate a new token for the same repository and re-run the example below. After successfully performing this test there should be a file named `TEST.md` in the root of your test repository on the default branch.

```shell
#!/usr/bin/env bash

OWNER="Enter name of organization or user"
REPO="Enter name of repo"
MY_TOKEN="Enter token Value"

curl --fail-with-body  -L \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Token ${MY_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/${OWNER}/${REPO}/contents/TEST.md" \
  -d '{"message":"my commit message","content":"SGVsbG8gZnJvbSBjYXRuZWthaXNlCg=="}'
```

## 7. Cleanup

Either clean up now or test this out some more using `cURL` or `GitHub Actions` before cleaning up. The steps to remove everything that was created.

1. In GitHub, find the GitHub App and either uninstall, suspend or delete this GitHub App
    - If wanting to test this again at a later date, suspend the installation and next time re-enable and rotate the private key to resume testing.
    - If done, delete the GitHub App
2. In AWS Console go to CloudFormation and find the Stack that was created and delete it.

# Granting Access

Continue reading [here](./docs/token-provider/aws-iam.md) for more detailed examples.

```typescript
declare const principal: iam.IPrincipal;

const role = new iam.Role(stack, 'Role', {
  assumedBy: principal,
});

const provider = tokenProviderApi.newTokenProvider('example-provider', {
  permissions: {
    contents: PermissionLevel.READ,
    issues: PermissionLevel.WRITE,
  },
});

provider.grantExecute(role);
```

# Get Token - cURL

This example shows how to use cURL to sign the request with the AWS IAM credentials. The example assumes the existence of `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_SESSION_TOKEN` in the environment.

For more usage examples, check out [usage docs](./docs/token-provider/usage.md).

```shell
AWS_REGION="eu-west-1"
BASE_URL="https://abcd1234.execute-api.${AWS_REGION}.amazonaws.com/dev"
PROVIDER="example-provider"

RESPONSE=$(curl "${BASE_URL}/x/${PROVIDER}/catnekaise/example-repo" \
	--user "${AWS_ACCESS_KEY_ID}":"${AWS_SECRET_ACCESS_KEY}" \
	-H "x-amz-security-token: ${AWS_SESSION_TOKEN}" \
	--aws-sigv4 "aws:amz:${AWS_REGION}:execute-api")
	
TOKEN=$(echo "$RESPONSE" | jq -r '.token')

## Use Token...
```

# Get Token - GitHub Actions

For more usage examples in GitHub Actions and a re-usable action, check out [GitHub Actions usage docs](./docs/token-provider/github-actions-usage.md).

```yaml
on:
  workflow_dispatch:
jobs:
  job1:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - name: "Authenticate"
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: "eu-west-1"
          role-to-assume: "arn:aws:iam::111111111111:role/role-name"

      - name: "Get Token"
        uses: catnekaise/ghrawel-token@v1
        id: token
        with:
          base-url: "https://abc123d4.execute-api.eu-west-1.amazonaws.com/dev"
          provider-name: "example-provider"
          aws-region: "eu-west-1"
      - name: "Use Token"
        env:
          TOKEN: "${{ steps.token.outputs.token }}"
        run: |
          echo "Utilize the token"
```

# Customize RestAPI and Lambda
Read more in [infrastructure](./docs/token-provider/infrastructure.md) and [application](./docs/token-provider/application.md).

```typescript
import { ManagedGitHubApps, TokenProviderApi, TokenProviderLambdaCode, ApplicationArchitecture } from '@catnekaise/ghrawel';

const managedLambda = new lambda.Function(stack, 'Function', {
  code: TokenProviderLambdaCode.dotnet({
    architecture: ApplicationArchitecture.ARM64,
    repository: 'https://github.com/catnekaise/example-fork.git',
    checkout: 'main',
  }),
  handler: 'bootstrap',
  runtime: lambda.Runtime.DOTNET_8,
  // Add name, vpc, etc
});

const managedApi = new apigateway.RestApi(stack, 'TokenProviderApi', {
  // Add domain, vpc, etc
});

const apps = new ManagedGitHubApps(stack, 'Apps', {
  defaultAppId: 1234,
  storage: GitHubAppSecretsStorage.PARAMETER_STORE,
  additionalApps: [
    GitHubApp.create('another-app', 1111),
    GitHubApp.create('yet-another-app', 2222),
  ],
});

const tokenProviderApi = new TokenProviderApi(stack, 'TokenProviderApi', {
  apps,
  lambda: managedLambda,
  api: managedApi,
});

tokenProviderApi.newTokenProvider('example-provider', {
  permissions: {
    contents: PermissionLevel.READ,
  },
});
```

# Next Steps

Here're some additional documentation on various topics:

- [Token Providers](./docs/token-provider/README.md)
- [AWS IAM](./docs/token-provider/aws-iam.md)
- [Application](./docs/token-provider/application.md)
- [Usage](./docs/token-provider/usage.md)
    - [cURL](./docs/token-provider/usage.md)
    - [Go](./docs/token-provider/usage.md)
    - [.NET](./docs/token-provider/usage.md)
    - [TypeScript](./docs/token-provider/usage.md)
- [GitHub Actions Attribute-based Access Control](./docs/token-provider/github-actions-abac.md)
- [Infrastructure](./docs/token-provider/infrastructure.md)
    - [Custom Setup](./docs/token-provider/infrastructure.md#custom-setup)
    - [GitHub Apps](./docs/token-provider/infrastructure.md#github-apps)
- [Logging](./docs/token-provider/logging.md)
- [Troubleshooting](./docs/token-provider/README.md#internal-server-error)


# Contributions
Please open issues if having general feedback or if getting stuck on something that was not covered by any documentation. PR's are welcome for bugfixes. For any feature additions, please open an issue for discussion first.
