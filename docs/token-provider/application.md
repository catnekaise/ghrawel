# Application
The application running in the lambda function can either be one of the templates, a fork of a template, or a customized implementation that takes the same [input](./README.md#input) and returns the expected [output](./README.md#output).

## Templates

- [catnekaise/ghrawel-tokenprovider-lambda-go](https://github.com/catnekaise/ghrawel-tokenprovider-lambda-go)
- [catnekaise/ghrawel-tokenprovider-lambda-dotnet](https://github.com/catnekaise/ghrawel-tokenprovider-lambda-dotnet)
  - Does not yet have proper logging support. See repo for more info.

# TokenProviderLambdaCode
> [!NOTE]
> TokenProviderLambdaCode should only be used if the repository containing the source is located in a public repository. See [AWS Lambda Construct Library](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda-readme.html) for more options on bundling asset code.

TokenProviderLambdaCode is a wrapper around `lambda.Code.fromDockerBuild()` that uses the Dockerfiles contained in this repository located [here](https://github.com/catnekaise/ghrawel/tree/main/lambda).

## Go (also default)

```typescript
import { TokenProviderLambdaCode } from '@catnekaise/ghrawel';

const func = new lambda.Function(this, 'Function', {
  code: TokenProviderLambdaCode.defaultGo(),
  handler: 'bootstrap',
  runtime: lambda.Runtime.PROVIDED_AL2023,
});

const tokenProviderApi = new TokenProviderApi(this, 'TokenProviderApi', {
  lambda: func,
})
```

## .NET

```typescript
import { TokenProviderLambdaCode } from '@catnekaise/ghrawel';

const func = new lambda.Function(this, 'Function', {
  code: TokenProviderLambdaCode.dotnet(),
  handler: 'bootstrap',
  runtime: lambda.Runtime.DOTNET_8,
});

const tokenProviderApi = new TokenProviderApi(this, 'TokenProviderApi', {
  lambda: func,
})
```

## Arguments
Arguments for the build can optionally be provided.

```typescript
import { TokenProviderLambdaCode, ApplicationArchitecture } from '@catnekaise/ghrawel';

const code: lambda.Code = TokenProviderLambdaCode.dotnet({
  // Use arm64 build image and arm64 as build target
  architecture: ApplicationArchitecture.ARM64,
  // use linux/arm64 as docker platform
  platform: 'linux/arm64',
  // Use source from fork repo
  repository: 'https://github.com/catnekaise/example-fork.git',
  // Checkout specific commit in repo
  checkout: '9273875b91d5404484897675d040e8a036f60ef0',
});

const func = new lambda.Function(this, 'Function', {
  code: code,
  handler: 'bootstrap',
  runtime: lambda.Runtime.DOTNET_8,
  // When building application in arm64, also configure architecture on the function.
  architecture: lambda.Architecture.ARM64
});
```

# Environment Variables
The `TokenProviderApi` construct will set two environment variables on the Lambda Function and this includes a customized and provided lambda as seen in [custom setup](#custom-setup) above.

- `SECRETS_STORAGE` - The configured secrets storage type on the provided `IGitHubApps` to `TokenProviderApi`
- `SECRETS_PREFIX` - Either the default `/catnekaise/github-apps` or the configured prefix on provided `IGitHubApps`

# Debug Logging
Set the environment variable `DEBUG_LOGGING` to `true` and debug logs will be emitted.
