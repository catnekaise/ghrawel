# Application
The lambda function uses an application that can be found at [catnekaise/ghrawel-tokenprovider-lambda-go](https://github.com/catnekaise/ghrawel-tokenprovider-lambda-go).

## Lambda Configuration
By default, the application used in the lambda function is built using docker and using the image `public.ecr.aws/sam/build-go1.x:latest`. The result of this build is a binary file output to `/asset/bootstrap` and then CDK handles the rest.

## Lambda Configurations - Default/Generic
The default and generic configuration if buil

```typescript
const func = new lambda.Function(this, 'Function', {
  code: lambda.Code.fromDockerBuild(path.join(process.cwd(), 'node_modules/@catnekaise/ghrawel/lambda/default/Dockerfile'), {
    platform: 'linux/amd64',
  }),
  handler: 'bootstrap',
  runtime: lambda.Runtime.PROVIDED_AL2023,
  memorySize: 512,
  retryAttempts: 0,
  timeout: Duration.seconds(10),
});

const tokenProviderApi = new TokenProviderApi(this, 'TokenProviderApi', {
  lambda: func,
})
```

## Lambda Configuration - Specific commit

```typescript
const func = new lambda.Function(this, 'Function', {
  code: lambda.Code.fromDockerBuild(path.join(process.cwd(), 'node_modules/@catnekaise/ghrawel/lambda/default/Dockerfile'), {
    platform: 'linux/amd64',
    buildArgs: {
      GIT_CHECKOUT: 'abcdef12345678980',
    },
  }),
  handler: 'bootstrap',
  runtime: lambda.Runtime.PROVIDED_AL2023,
  memorySize: 512,
  retryAttempts: 0,
  timeout: Duration.seconds(10),
});

const tokenProviderApi = new TokenProviderApi(this, 'TokenProviderApi', {
  lambda: func,
});
```

## Lambda Configuration - Forked repo

```typescript
const func = new lambda.Function(this, 'Function', {
  code: lambda.Code.fromDockerBuild(path.join(process.cwd(), 'node_modules/@catnekaise/ghrawel/lambda/default/Dockerfile'), {
    platform: 'linux/amd64',
    buildArgs: {
      GIT_REPO: 'https://github.com/catnekaise/example-fork.git',
    },
  }),
  handler: 'bootstrap',
  runtime: lambda.Runtime.PROVIDED_AL2023,
  memorySize: 512,
  retryAttempts: 0,
  timeout: Duration.seconds(10),
});

const tokenProviderApi = new TokenProviderApi(this, 'TokenProviderApi', {
  lambda: func,
});
```

## Input & Output
See examples [here](./README.md#input).
