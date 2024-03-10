# Infrastructure
This library may create the following resources:

- (Optional) API Gateway RestAPI
- API Gateway RestAPI sub-resources: Resource, Method and Model
- (Optional) Lambda Function
- (Optional) Systems Manager Parameter Store SecureString Parameters via Custom resource ([read below](#initialized-parameter))
- (Optional) Secrets Manager Secrets
- Attaching permissions to roles based on provided configuration

## Custom Setup
It's not the goal of this library to provide meaningful configuration options for the lambda function or rest api. Instead, create both as part of the stack and provide to the `TokenProviderApi` construct.

```typescript
import { ManagedGitHubApps, TokenProviderApi } from '@catnekaise/ghrawel';

const managedLambda = new lambda.Function(stack, 'Function', {
  code: lambda.Code.fromDockerBuild(path.join(process.cwd(), 'node_modules/@catnekaise/ghrawel/lambda/default/Dockerfile')),
  handler: 'bootstrap',
  runtime: lambda.Runtime.PROVIDED_AL2023,
});

const managedApi = new apigateway.RestApi(stack, 'RestApi', {});

const apps = new ManagedGitHubApps(stack, 'Apps', {
  defaultAppId: 1234,
  storage: GitHubAppSecretsStorage.PARAMETER_STORE,
});

const tokenProviderApi = new TokenProviderApi(stack, 'TokenProviderApi', {
  apps,
  lambda: managedLambda,
  api: managedApi,
});

// RestApi cannot be depoyed without at least one method
tokenProviderApi.newTokenProvider('example-provider', {
  permissions: {
    contents: PermissionLevel.READ,
  },
});

// Using PARAMETER_STORE
const key = kms.Key.fromLookup(stack, 'Key', { aliasName: 'github-private-keys' });

key.grantDecrypt(managedLambda);

managedLambda.addToRolePolicy(new iam.PolicyStatement({
  actions: ['ssm:GetParameter'],
  resources: [`arn:aws:ssm:${stack.region}:${stack.account}:parameter/catnekaise/github-apps/*`],
}));

// Using SECRETS_MANAGER
const secret = secretsmanager.Secret.fromSecretNameV2(stack, 'SecretDefault', '/catnekaise/github-apps/default');

secret.grantRead(managedLambda);
```

# GitHub Apps
Use either `ManagedGitHubApps`, `SelfManagedGitHubApps` or implement `IGitHubApps` to handle secrets storage for private keys and to configure which GitHub apps exist for usage by token providers.

## Default GitHub App
It's required to provide the id for the `default` GitHub App. When a token provider is not configured with a specific app, the default app is used.

## GitHub App Name
When adding additional GitHub Apps a name has to be specified next to the GitHub App Id. This name specifies where the application shall look for a private key in either the Parameter Store or Secrets Manager.

The name for a GitHub App must start with a lower-case `a-z` and can then contain characters `a-z`, digits `0-9` and hyphens (regex `/^[a-z][a-z0-9-]+$/`).

## Secrets Storage
> [!NOTE] 
> If using the `ManagedGitHubApps` construct and then changing the secrets storage after initial stack deployment, it will cause parameters to be deleted and secrets to be created or vice versa, unless having specified a removal policy of retain. If doing this make sure to update new parameters/secrets with private keys.

Secrets can either be stored in Secrets Manager or as SecureString parameters in Systems Manager Parameter Store.

## Secrets Prefix
> [!NOTE] 
> If using the `ManagedGitHubApps` construct and then changing the secrets prefix after initial stack deployment, it will cause parameters or secrets to be deleted and re-created under the new prefix, unless having specified a removal policy of retain. If doing this make sure to update new parameters/secrets with private keys.

> [!NOTE] 
> If using the `ManagedGitHubApps` and deploying multiple instances of `TokenProviderApi` (in same or separate stacks) in the same AWS Account and the same AWS region, each instance will require its own unique prefix to avoid problems.

The default prefix if not configured is `/catnekaise/github-apps`. The application will append this prefix with the github app name when fetching the private key from either the Parameter Store or Secrets Manager.

For example: the default app with the default prefix will result in the application looking for a parameter or secret at the path `/catnekaise/github-apps/default`.

## Initialized Parameter
It's not possible to directly create SecureString parameters using CDK/CloudFormation. When using the `ManagedGitHubApps` construct it will create a custom resource that will `onCreate` create the SecureString parameter, set the value to `placeholder` and associate it with any provided kms key. The custom resource will delete this parameter when `onDelete`, unless removal policy has been configured as retain. 

No action will happen on `onUpdate`. It's not possible to change the KMS key after having already deployed these parameters. If wanting to do this, then set a new secrets prefix to create new parameters

For more details, see the construct [InitializedParameter](../../src/apps.ts).

## ManagedGitHubApps
This construct will:

- Initialize empty SecureString Parameters in Systems Manager Parameter Store using the standard custom resource for doing so (if `PARAMETER_STORE` is selected as storage)
- Create secrets in Secrets Manager (if `SECRETS_MANAGER` is selected as storage)
- Set the provided kms key for encryption on any parameter or secret created
  - If not provided, AWS_MANAGED KMS keys are used

```typescript
const app = new cdk.App();
const stack = new cdk.Stack(app, 'TokenProviderStack', {});

declare const key: kms.Key;

const apps = new ManagedGitHubApps(stack, 'AppSecrets', {
  defaultAppId: 1234,
  storage: GitHubAppSecretsStorage.PARAMETER_STORE,
  kmsKey: key,
  additionalApps: [
    GitHubApp.create('checks', 1234567),
    GitHubApp.create('auto-approver', 890000),
  ],
});

```

### SelfManagedGitHubApps
This construct is used to configure secrets storage type, prefix and information about any non-default GitHub Apps. When using this construct, permissions to the lambda function have to be granted explicitly as seen below.

```typescript
const app = new cdk.App();
const stack = new cdk.Stack(app, 'TokenProviderStack');

const apps = new SelfManagedGitHubApps(stack, 'AppSecrets', {
  defaultAppId: 1234,
  storage: GitHubAppSecretsStorage.SECRETS_MANAGER,
  prefix: '/my-custom-prefix', // Optional
  additionalApps: [
    GitHubApp.create('checks', 1234567),
    GitHubApp.create('auto-approver', 890000),
  ],
});

const tokenProviderApi = new TokenProviderApi(stack, 'TokenProviderApi', {
  apps,
});

declare const key: kms.Ikey;

// Examples of granting required permissions
tokenProviderApi.lambdaFunction.addToRolePolicy(new iam.PolicyStatement({
  actions: ['ssm:GetParameter'],
  resources: [`arn:aws:ssm:${stack.region}:${stack.account}:parameter/catnekaise/github-apps/*`],
}));
key.grantDecrypt(tokenProviderApi.lambdaFunction.grantPrincipal);
```

### IGitHubApps
Optionally implement this interface instead of using `ManagedGitHubApps` or `SelfManagedGitHubApps`.

## Lambda
Read more in [application.md](./application.md).

### Lambda Outbound Network Requirements
> https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-githubs-ip-addresses

If putting the lambda function in a VPC it will in addition to AWS Services be allowed to communicate with `api.github.com`. The only AWS Service explicitly interacted with by the lambda function code is either Secrets Manager or Systems Manager Parameter Store to retrieve the required GitHub App private key.



