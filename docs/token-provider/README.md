# Token Providers
A Token provider is a method on an API Gateway RestAPI that will forward an authorized request to a lambda function that will return a GitHub App installation access token based on token provider configuration. The lambda function will perform input validation on `owner` and `repo` and conditionally performs additional validation based on the token provider configuration.

## Table of Contents

* [Short Version](#short-version)
* [TokenProviderApi](#tokenproviderapi)
* [Name](#name)
* [Token Provider Endpoint](#token-provider-endpoint)
* [Repository Selection Mode](#repository-selection-mode)
* [Target Rules](#target-rules)
* [Token Request](#token-request)
* [Token Context](#token-context)
* [New Token Provider](#new-token-provider)
* [Input](#input)
* [Output](#output)
  * [Bad Request](#bad-request)
  * [Internal Server Error](#internal-server-error)
  * [API Gateway](#api-gateway)

## Short Version


```typescript
// Use unique name for each token provider created using lower-case a-z and hyphens
const tokenProvider = tokenProviderApi.newTokenProvider('example-provider', {
  // Configure which permissions the installation access token should contain
  permissions: {
    contents: PermissionLevel.READ,
    issues: PermissionLevel.WRITE,
    repositoryProjects: PermissionLevel.ADMIN,
  },
  // Only specify app when token provider should use a GitHub App that is not the default app
  app: 'secondary-app',
  // Only specify endpoint if wanting to allow requesting a single access tokens that grants permissions to more than a single repository
  endpoint: TokenProviderEndpoint.useOwner(),
  // Only specify targetRule if wanting to allow requesting an access token that grants permission to the entire organization/user
  targetRule: TokenProviderTargetRule.allowOwner(),
});

// Grant access
tokenProvider.grantExecute(someRole);
tokenProvider.grantExecute(someRole, 'catnekaise');
tokenProvider.grantExecute(someRole, 'catnekaise', 'example-repo');
tokenProvider.grantExecute(someRole, 'catnekaise', 'example-repo-1', 'example-repo-2');
tokenProvider.grantExecute(someRole, 'catnekaise', 'example-*');
```

### Do and Don't

- Don't configure the token provider with permissions that has not been granted to the GitHub App
- Do configure `TokenProviderEndpoint.useOwner()` **and** `TokenProviderTargetRule.allowOwner()` to enable requesting tokens at the organization/user level
- Don't configure `TokenProviderTargetRule.allowOwner()` when the GitHub App is only installed on a selection of repositories
- Don't

## TokenProviderApi

The `TokenProviderApi` construct is used to provide defaults and wire up the required components and provide a more simplified interface for working with token providers.

## Name
A Token Provider name must start with a lower-case `a-z` and then only contain additional `a-z` characters and hypens.

## Token Provider Endpoint
> [!NOTE]
> Token Providers are prefixed with `/x/` in the RestAPI. Avoid configuring other resources under this path in the same RestAPI.

By default, a token provider will be configured to exist on path `/x/<provider-name>/{owner}/{repo}`. It's also possible to configure a token provider on path `/x/<provider-name>/{owner}` and `/x/<provider-name>/<static-owner>`.

| Type          | Path            | Example                  | Example 2                           |
|---------------|-----------------|--------------------------|-------------------------------------|
| DEFAULT       | /{owner}/{repo} | /catnekaise/example-repo | -                                   |
| DYNAMIC_OWNER | /{owner}        | /catnekaise              | /catnekaise?repo=repo-1,repo=repo-2 |
| STATIC_OWNER  | /OWNER          | /catnekaise              | /catnekaise?repo=repo-1,repo=repo-2 |

## Owner Endpoints
The only difference between `DYNAMIC_OWNER` and `STATIC_OWNER` is that `STATIC_OWNER` has a pre-configured path and no path parameter for `owner`.

If a GitHub App is only used within a single organization/user, then it matters less which of these endpoint types is used.

To simplify documentation these two endpoint types may be grouped together as `OWNER_ENDPOINTS` or be referred to as an `owner endpoint`.

```typescript
tokenProviderApi.newTokenProvider('provider-1', {
  permissions: {
    contents: PermissionLevel.READ,
  },
  endpoint: TokenProviderEndpoint.useDefault(),
});

tokenProviderApi.newTokenProvider('provider-2', {
  permissions: {
    contents: PermissionLevel.READ,
  },
  endpoint: TokenProviderEndpoint.useOwner(), // DYNAMIC_OWNER
});

tokenProviderApi.newTokenProvider('provider-3', {
  permissions: {
    contents: PermissionLevel.READ,
  },
  endpoint: TokenProviderEndpoint.useOwner('catnekaise'), // STATIC_OWNER
});
```

## Repository Selection Mode
Each token provider is configured with a `RepositorySelectionMode` and the default is `AT_LEAST_ONE`. The other option currently available is `ALLOW_OWNER`. In order to allow the requesting of a token scoped at the organization/user instead of individual repositories, a token provider must explicitly be configured with the repository selection mode `ALLOW_OWNER`.

| Endpoint Type  | Repository Selection Mode | Request                             | Application      | Token covers  |
|----------------|---------------------------|-------------------------------------|------------------|---------------|
| DEFAULT        | AT_LEAST_ONE              | /catnekaise/repo-1                  | Allows           | repo-1        |
| DEFAULT        | AT_LEAST_ONE              | /catnekaise/repo-1?repo=repo-2      | Allows           | repo-1        |
| DEFAULT        | ALLOW_OWNER               | -                                   | **Config Error** |               |
| OWNER_ENDPOINT | AT_LEAST_ONE              | /catnekaise?repo=repo-1,repo=repo-2 | Allows           | repo-1,repo-2 |
| OWNER_ENDPOINT | AT_LEAST_ONE              | /catnekaise                         | **Denies**       | -             |
| OWNER_ENDPOINT | ALLOW_OWNER               | /catnekaise                         | Allows           | catnekaise    |
| OWNER_ENDPOINT | ALLOW_OWNER               | /catnekaise?repo=repo-1             | Allows           | repo-1        |
| OWNER_ENDPOINT | ALLOW_OWNER               | /catnekaise?repo=repo-1,repo-2      | Allows           | repo-1,repo-2 |

## Target Rules
Target rules are configuration for additional validation regarding what repositories are allowed to be requested access for and this validation is performed in the lambda function. Currently, the target rule only contains information about the repository selection mode. Future repository selection modes may expand configuration contained within the target rule.

```typescript
tokenProviderApi.newTokenProvider('provider-1', {
  permissions: {
    contents: PermissionLevel.READ,
  },
  // same as not providing a value of targetRule
  targetRule: TokenProviderTargetRule.atLeastOne(),
});

tokenProviderApi.newTokenProvider('provider-2', {
  permissions: {
    contents: PermissionLevel.READ,
  },
  targetRule: TokenProviderTargetRule.allowOwner(),
  // When enabling `ALLOW_OWNER`, the endpoint must be an owner endpoint
  endpoint: TokenProviderEndpoint.useOwner(),
});

tokenProviderApi.newTokenProvider('provider-2', {
  permissions: {
    contents: PermissionLevel.READ,
  },
  // same as not providing a value of targetRule
  targetRule: TokenProviderTargetRule.atLeastOne(),
  endpoint: TokenProviderEndpoint.useOwner(),
});

// Config error as default endpoint type does not support `ALLOW_OWNER`
tokenProviderApi.newTokenProvider('provider-2', {
  permissions: {
    contents: PermissionLevel.READ,
  },
  targetRule: TokenProviderTargetRule.allowOwner(),
});
```

## Token Request
> Contents of token request is part of the larger input body to the lambda function. View [input](#input).

When AWS IAM authorizes a request to the API resource for a token provider, the configured Lambda Integration will be invoked with an input containing a `token request` and a `token context`. The configuration in `tokenRequest` is dynamic based on the request that was made.

- `owner` will either be value of path parameter `{owner}` or a statically configured owner.
- `repo` will either be value of path parameter `{repo}` or value of queryString parameter `repo` if using an owner endpoint.
  - When `repo` is a query parameter, multiple repositories may be specified in the querystring using a `,` as the separator.
  - When attempting to request multiple repositories with separator `,` using path parameter `repo`, lambda function will return a `400` bad request even when AWS IAM permissions would allow.
- `repo` is optional if using `repositorySelectionMode` `ALLOW_OWNER`.

```json5
{
  "owner": "catnekaise",
  "repo": "example-repo"
}
```

## Token Request - Owner

This value is validated by the lambda function as must match pattern `^[a-zA-Z][a-zA-Z0-9-]+$`. Mismatch will return 400 Bad Request.

## Token Request - Repo

The property `repo` in `tokenRequest` may be an empty string or a string containing one or more repositories (`,` used as separator). It's the lambda function that will perform validation on value of this property. Each individual repository must match the pattern `^[a-zA-Z][a-zA-Z0-9_.-]+$`. Mismatch will return 400 Bad Request.

| Endpoint Type  | Mode         | Repo Source     | Value          | Validation       |
|----------------|--------------|-----------------|----------------|------------------|
| DEFAULT        | AT_LEAST_ONE | Path parameter  | example-repo   | Allows           |
| DEFAULT        | AT_LEAST_ONE | Path parameter  | EXAMPLE.-_repo | Allows           |
| DEFAULT        | AT_LEAST_ONE | Path parameter  | repo-1,repo-2  | Fails            |
| DEFAULT        | AT_LEAST_ONE | Path parameter  | Not Set        | Fails (by APIGW) |
| OWNER_ENDPOINT | AT_LEAST_ONE | Query Parameter | example-repo   | Allows           |
| OWNER_ENDPOINT | AT_LEAST_ONE | Query Parameter | repo-1,repo-2  | Allows           |
| OWNER_ENDPOINT | AT_LEAST_ONE | Query Parameter | Not Set        | Fails (by APIGW) |
| OWNER_ENDPOINT | ALLOW_OWNER  | Query Parameter | Not Set        | Allows           |
| OWNER_ENDPOINT | ALLOW_OWNER  | Query Parameter | ExAmPle-repo   | Allows           |
| OWNER_ENDPOINT | ALLOW_OWNER  | Query Parameter | repo-1,repo-2  | Allows           |
| OWNER_ENDPOINT | ALLOW_OWNER  | Query parameter | example,,,repo | Fails            |

## Token Context
> Contents of token context is part of the larger input body to the lambda function. View [input](#input).

The configuration in `tokenContext` is the configuration passed into `tokenProviderApi.newTokenProvider(name, configuration)` and the result of defaults when certain configuration is not set.

```json
{
  "providerName": "example-provider",
  "permissions": {
    "contents": "read",
    "issues": "write"
  },
  "app": {
    "id": 123456,
    "name": "default"
  },
  "endpoint": {
    "type": "DEFAULT"
  },
  "targetRule": {
    "repositorySelectionMode": "AT_LEAST_ONE"
  }
}
```

## New Token Provider
> [!NOTE]
> See all available permissions at https://docs.github.com/en/rest/apps/apps?apiVersion=2022-11-28#create-an-installation-access-token-for-an-app

When creating a token provider, only the name and permissions are required and at least one permission has to be defined.

```typescript
const provider = tokenProviderApi.newTokenProvider('contents-read', {
  permissions: {
    contents: PermissionLevel.READ,
    issues: PermissionLevel.WRITE,
    repositoryProjects: PermissionLevel.ADMIN,

  },
  // Optional. When not provided, AT_LEAST_ONE is default.
  targetRule: TokenProviderTargetRule.atLeastOne(),
  // Optional. When not provided, default is used
  endpoint: ProviderEndpoint.useDefault(),
  // Optional. Default is default.
  app: 'default',
});
```

# Input
The integration configuration between the RestAPI and Lambda does not use proxy integration and instead uses [request/response mapping](https://docs.aws.amazon.com/apigateway/latest/developerguide/rest-api-data-transformations.html). However, the larger part of what is included in a [Lambda Proxy Request](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format) is also set in the request mapping and forwarded to the lambda function as seen in the example below. 

```json5
{
  "tokenRequest": {
    "owner": "catnekaise",
    "repo": "example-repo"
  },
  "tokenContext": {
    "providerName": "provider1",
    "permissions": {
      "contents": "read",
      "issues": "write"
    },
    "app": {
      "id": 123456,
      "name": "default"
    },
    "endpoint": {
      "type": "DEFAULT"
    },
    "targetRule": {
      "repositorySelectionMode": "AT_LEAST_ONE"
    }
  },
  // Subset of Lambda Proxy Request
  "resource": "/x/provider1/{owner}/{repo}",
  "path": "/dev/x/provider1/catnekaise/example-repo",
  "httpMethod": "GET",
  "queryStringParameters": {
    // Only when a OWNER_ENDPOINT is used
    "repo": "example-repo"
  },
  "pathParameters": {
    "owner": "catnekaise",
    "repo": "example-repo"
  },
  "stageVariables": null,
  "requestContext": {
    "accountId": "111111111111",
    "resourceId": "abcdef",
    "stage": "dev",
    "domainName": "abcd1234.execute-api.eu-west-1.amazonaws.com",
    "domainPrefix": "abcd1234",
    "requestId": "abcdef-example",
    "extendedRequestId": "abc",
    "protocol": "HTTP/1.1",
    "identity": {
      "accountId": "111111111111",
      "caller": "ABCDEFGHIABCDEFGHIABC:abc",
      "sourceIp": "1.1.1.1",
      "userArn": "arn:aws:sts::111111111111:assumed-role/role/session",
      "userAgent": "curl/1.1.1",
      "user": "ABCDEFGHIABCDEFGHIABC:abc",
      // Contains values when credentials that signed the request was from role assumed via Cognito Identity
      "cognitoIdentityPoolId": "",
      "cognitoIdentityId": "",
      "cognitoAuthenticationType": "",
      "cognitoAuthenticationProvider": ""
    },
    "resourcePath": "/x/example-provider/{owner}/{repo}",
    "path": "/dev/x/example-provider/catnekaise/example-repo",
    "httpMethod": "GET",
    "requestTime": "10/Jan/2020:00:00:00 +0000",
    "requestTimeEpoch": 1234567890,
    "apiId": "abcd1234"
  }
}
```

# Output
Assuming API Gateway forwards an authorized request and passing of validation in the lambda function, a normal response looks as follows and comes with the status code `201`:

```json
{
  "token": "ghp_....."
}
```

## Bad Request
Any request that passes authorization of the API Gateway but does not resolve in a token and there's a chance that altering the input could recover.

- The value of either `owner` or `repo` path parameters does not pass validation
- The value of `repo` query parameter does not pass validation


## Internal Server Error
Requests that passes both authorization in API Gateway and input validation may result in an internal server error when one of the following happen.

- Mismatch between token provider configuration and GitHub App:
  - The token provider is configured to request permissions that the GitHub App does not have
  - The token provider allows requesting organization tokens but the GitHub App is installed in a single repository
  - The token provider allows requesting tokens for an owner that does not have the GitHub App installed (installation not found)
- The application does not have permissions to read the private key in Parameter Store or Secrets Manager
  - The Lambda Execution role needs `ssm:GetParameter` or `secretsmanager:GetSecretValue` on the correct resource(s) in corresponding secret storage
- The application does not have permission to decrypt the private key due to insufficient permissions for a customer managed KMS key
  - The Lambda execution role need `kms:Decrypt` for the key(s) used to encrypt the parameters or secrets
- The application cannot locate the private key at the configured secrets storage and prefix
  - Check the Lambdaa environment variables for SECRETS_STORAGE and SECRETS_PREFIX, then check the corresponding storage for a secret located at `<SECRETS_PREFIX>/default`
- Invalid Private Key
  - Check what value was entered in Parameter Store or Secrets Manager.
- Revoked Private Key
- Incorrect GitHub App ID for the given private Key
- Suspended/Deleted GitHub App
- Configuration in GitHub related to [allowed IP addresses](https://docs.github.com/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/managing-allowed-ip-addresses-for-your-organization#allowing-access-by-github-apps) or [conditional access](https://docs.github.com/en/enterprise-cloud@latest/admin/identity-and-access-management/configuring-authentication-for-enterprise-managed-users/about-support-for-your-idps-conditional-access-policy).
