# Logging

- [Configure access logging in the AWS API Gateway](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway-readme.html#access-logging)

# Application Logs
These are created by [catnekaise/ghrawel-tokenprovider-lambda-go](https://github.com/catnekaise/ghrawel-tokenprovider-lambda-go)

## Init
```json
{
  "time": "10/Jan/2020:00:00:00 +0000",
  "level": "INFO",
  "msg": "Init",
  "awsRequestId": "abcd1234-example",
  "functionArn": "arn:aws:lambda:eu-west-1:111111111111:function:some-name",
  "tokenProviderName": "example-provider",
  "userArn": "arn:aws:sts::111111111111:assumed-role/role/session",
  "user": "ABCDEFGHIABCDEFGHIABC:djonser",
  "path": "/x/example-provider/catnekaise/example-repo",
  "tokenRequestOwner": "catnekaise",
  "tokenRequestRepo": "example-repo",
  "endpointType": "DEFAULT",
  "repositorySelectionMode": "AT_LEAST_ONE",
  "githubAppId": 12345,
  "githubAppName": "default",
  "userAgent": "curl/1.1.1",
  "permissions": {
    "contents": "read",
    "issues": "write"
  }
}
```

### Token Created

```json
{
  "time": "2020-01-01T00:00:00.000",
  "level": "INFO",
  "msg": "TokenCreated",
  "awsRequestId": "abcd1234-example",
  "functionArn": "arn:aws:lambda:eu-west-1:111111111111:function:some-name",
  "tokenProviderName": "example-provider",
  "userArn": "arn:aws:sts::111111111111:assumed-role/role/session",
  "user": "ABCDEFGHIABCDEFGHIABC:djonser",
  "githubAppId": 12345,
  "tokenRequestOwner": "catnekaise",
  "tokenRequestRepo": "example-repo"
}
```

### Error

```json
{
  "time": "2020-01-01T00:00:00.000",
  "level": "ERROR",
  "msg": "Private Key not found",
  "awsRequestId": "abcd1234-example",
  "functionArn": "arn:aws:lambda:eu-west-1:111111111111:function:some-name",
  "tokenProviderName": "example-provider",
  "userArn": "arn:aws:sts::111111111111:assumed-role/role/session",
  "user": "ABCDEFGHIABCDEFGHIABC:djonser",
  "githubAppId": 12345,
  "tokenRequestOwner": "catnekaise",
  "tokenRequestRepo": "example-repo"
}
```

### Error

```json
{
  "time": "2020-01-01T00:00:00.000",
  "level": "ERROR",
  "msg": "Could not create token based on valid input",
  "awsRequestId": "abcd1234-example",
  "functionArn": "arn:aws:lambda:eu-west-1:111111111111:function:some-name",
  "tokenProviderName": "example-provider",
  "userArn": "arn:aws:sts::111111111111:assumed-role/role/session",
  "user": "ABCDEFGHIABCDEFGHIABC:djonser",
  "githubAppId": 12345,
  "tokenRequestOwner": "catnekaise",
  "tokenRequestRepo": "example-repo",
  "originalError": "POST https://api.github.com/app/installations/1234/access_tokens: 422 There is at least one repository that does not exist or is not accessible to the parent installation. []"
}
```
