# AWS IAM
In order to access the RestApi the request has to be [signed](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html) by AWS IAM Credentials that have permissions to invoke (`execute-api:Invoke`) the API.

## Policy Examples

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/example-repo"
    },
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": [
        "arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/example-repo-1",
        "arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/example-repo-2",
        "arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/example-repo-3"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/example-*"
    }
  ]
}
```

## ARNs
> https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html

Given the following attributes:

- TokenProviderEndpointType is `DEFAULT` 
- RestApi deployed in the `eu-west-1` AWS Region
- AWS Account Id is `111111111111`
- RestApi Id `abcd1234`
- RestApi Stage Name `dev`
- Token Provider name `example-provider`
- Path Parameter `{owner}`
- Path Parameter `{repo}`

Access should be granted for the action `execute-api:Invoke` to the ARN: `arn:aws:execute-api:<region>:<account>:<apiId>/<stageName>/GET/x/<providerName>/<owner>/<repo>`, for example `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET/x/example-provider/catnekaise/example-repo`.

**Base ARN:** `arn:aws:execute-api:eu-west-1:111111111111:abcd1234/dev/GET`

| Resource appended to Base ARN               | Allows Org | Allows Repo                         |
|---------------------------------------------|------------|-------------------------------------|
| /x/example-provider/catnekaise/example-repo | catnekaise | example-repo                        |
| /x/example-provider/catnekaise/*            | catnekaise | Any repo                            |
| /x/example-provider/catnekaise/example-*    | catnekaise | Repos starting with name `example-` |
| /x/example-provider/*                       | Any Org    | Any Repo                            |

### ARNs - Owner Endpoints

| Resource appended to Base ARN    | Allows Org | Comment       |
|----------------------------------|------------|---------------|
| /x/example-provider/catnekaise   | catnekaise |               |
| /x/example-provider/*            | Any Org    |               |
| /x/example-provider/catnekaise/* | No Access  | 404 Not Found |
| /x/example-provider/*/*          | No Access  | 404 Not Found |

## Grant Execute - Default
When not providing a value for `owner` or `repo`, then `*` is used as the default value for both. A warning will be annotated when the TokenProviderEndpointType is `DEFAULT` and neither `owner` or `repo` has been defined.

```typescript
import { ITokenProvider } from '@catnekaise/ghrawel';

declare const provider: ITokenProvider;
declare const role: iam.Role;

// A warning is annotated
provider.grantExecute(role);

// No warning is annotated
provider.grantExecute(role, '*');

provider.grantExecute(role, 'catnekaise');

// creates 3 ARNs
provider.grantExecute(role, 'catnekaise', 'example-repo-1', 'example-repo-2', 'example-repo-3');

provider.grantExecute(role, 'catnekaise', 'example-*');
```

## Grant Execute - Owner Endpoint
When not providing a value for `owner`, then `*` is used as the default value. No warning is annotated.

```typescript
import { ITokenProvider } from '@catnekaise/ghrawel';

declare const provider: ITokenProvider;
declare const role: iam.Role;

provider.grantExecute(role);

provider.grantExecute(role, 'catnekaise');

// Throws error as there's no `{repo}` path parameter
provider.grantExecute(role, 'catnekaise', 'example-repo');
```

## Query Parameter - repo
Owner endpoints allow specifying one or more repositories via the query string parameter `repo`. It's not possible to use AWS IAM to specify which repositories are allowed in the query parameter.
