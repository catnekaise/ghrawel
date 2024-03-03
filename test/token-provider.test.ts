import { IClaimsContext } from '@catnekaise/cdk-iam-utilities';
import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {
  GitHubApp,
  GitHubAppSecretsStorage,
  ManagedGitHubApps,
  PermissionLevel,
  TokenProvider,
  TokenProviderApi,
  TokenProviderEndpoint,
  TokenProviderPathStrategy,
  TokenProviderTargetRule,
} from '../src';

describe('Configures as expected', () => {

  test('should match defaults', () => {

    const [stack, tokenProviderApi] = createTestableStackApi();

    tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
        issues: PermissionLevel.WRITE,
      },
    });

    const template = Template.fromStack(stack);

    template.hasResource('AWS::ApiGateway::RestApi', {});

    template.hasResourceProperties('AWS::ApiGateway::Method', {
      AuthorizationType: 'AWS_IAM',
      HttpMethod: 'GET',
      Integration: {
        IntegrationHttpMethod: 'POST',
        IntegrationResponses: Match.exact([
          {
            ResponseParameters: {
              'method.response.header.Content-Type': '\'application/json\'',
            },
            ResponseTemplates: {
              'application/json': '{"token":"$util.escapeJavaScript($input.path(\'$.token\'))"}',
            },
            StatusCode: '201',
          },
          {
            ResponseParameters: {
              'method.response.header.Content-Type': '\'application/json\'',
            },
            ResponseTemplates: {
              'application/json': '#set($body = $util.parseJson($input.path(\'$.errorMessage\')))\n{"message":"$util.escapeJavaScript($body.message)"}',
            },
            SelectionPattern: '.*CK_ERR_400.*',
            StatusCode: '400',
          },
          {
            ResponseParameters: {
              'method.response.header.Content-Type': '\'application/json\'',
            },
            ResponseTemplates: {
              'application/json': '#set($body = $util.parseJson($input.path(\'$.errorMessage\')))\n{"message":"$util.escapeJavaScript($body.message)"}',
            },
            SelectionPattern: '.*CK_ERR_500.*',
            StatusCode: '500',
          },
        ]),
        PassthroughBehavior: 'NEVER',
        RequestParameters: Match.exact({
          'integration.request.path.owner': 'method.request.path.owner',
          'integration.request.path.repo': 'method.request.path.repo',
        }),
        RequestTemplates: {
          'application/json': '{"tokenRequest":{"owner":"$util.escapeJavaScript($input.params(\'owner\'))","repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"tokenContext":{"endpoint":{"type":"DEFAULT"},"providerName":"example-provider","app":{"name":"default","id":1234},"permissions":{"contents":"read","issues":"write"},"targetRule":{"repositorySelectionMode":"AT_LEAST_ONE"}},"path":"$context.path","resource":"$context.resourcePath","httpMethod":"$context.httpMethod","requestContext":{"accountId":"$context.accountId","apiId":"$context.apiId","domainName":"$context.domainName","domainPrefix":"$context.domainPrefix","extendedRequestId":"$context.extendedRequestId","httpMethod":"$context.httpMethod","identity":{"accessKey":"$context.authorizer.principalId","accountId":"$context.identity.accountId","caller":"$context.identity.caller","cognitoAuthenticationProvider":"$context.identity.cognitoAuthenticationProvider","cognitoAuthenticationType":"$context.identity.cognitoAuthenticationType","cognitoIdentityId":"$context.identity.cognitoIdentityId","cognitoIdentityPoolId":"$context.identity.cognitoIdentityPoolId","principalOrgId":"$context.identity.principalOrgId","sourceIp":"$context.identity.sourceIp","user":"$context.identity.user","userAgent":"$context.identity.userAgent","userArn":"$context.identity.userArn"},"path":"$context.path","protocol":"$context.protocol","requestId":"$context.requestId","requestTime":"$context.requestTime","requestTimeEpoch":$context.requestTimeEpoch,"resourceId":"$context.resourceId","resourcePath":"$context.resourcePath","stage":"$context.stage"},"pathParameters":{"owner":"$util.escapeJavaScript($input.params(\'owner\'))","repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"stageVariables":null,"isBase64Encoded":false}',
        },
        Type: 'AWS',
      },
      MethodResponses: Match.exact([
        {
          ResponseModels: {
            'application/json': {
              Ref: Match.anyValue(),
            },
          },
          ResponseParameters: {
            'method.response.header.Content-Type': true,
          },
          StatusCode: '201',
        },
        {
          ResponseModels: {
            'application/json': {
              Ref: Match.anyValue(),
            },
          },
          ResponseParameters: {
            'method.response.header.Content-Type': true,
          },
          StatusCode: '400',
        },
        {
          ResponseModels: {
            'application/json': {
              Ref: Match.anyValue(),
            },
          },
          ResponseParameters: {
            'method.response.header.Content-Type': true,
          },
          StatusCode: '500',
        },
      ]),
      OperationName: 'provider-example-provider',
      RequestParameters: Match.exact({
        'method.request.path.owner': true,
        'method.request.path.repo': true,
      }),
      RequestValidatorId: {
        Ref: Match.anyValue(),
      },
      ResourceId: {
        Ref: Match.anyValue(),
      },
      RestApiId: {
        Ref: Match.anyValue(),
      },
    });

  });

  test('should have owner path parameter, repo is required in query', () => {

    const [stack, tokenProviderApi] = createTestableStackApi();

    tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
      },
      endpoint: TokenProviderEndpoint.useOwner(),

    });

    const template = Template.fromStack(stack);


    template.hasResourceProperties('AWS::ApiGateway::Method', {
      AuthorizationType: 'AWS_IAM',
      HttpMethod: 'GET',
      Integration: {
        IntegrationHttpMethod: 'POST',
        PassthroughBehavior: 'NEVER',
        RequestParameters: Match.exact({
          'integration.request.path.owner': 'method.request.path.owner',
          'integration.request.querystring.repo': 'method.request.querystring.repo',
        }),
        RequestTemplates: {
          'application/json': '{"tokenRequest":{"owner":"$util.escapeJavaScript($input.params(\'owner\'))","repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"tokenContext":{"endpoint":{"type":"DYNAMIC_OWNER"},"providerName":"example-provider","app":{"name":"default","id":1234},"permissions":{"contents":"read"},"targetRule":{"repositorySelectionMode":"AT_LEAST_ONE"}},"path":"$context.path","resource":"$context.resourcePath","httpMethod":"$context.httpMethod","queryStringParameters":{"repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"requestContext":{"accountId":"$context.accountId","apiId":"$context.apiId","domainName":"$context.domainName","domainPrefix":"$context.domainPrefix","extendedRequestId":"$context.extendedRequestId","httpMethod":"$context.httpMethod","identity":{"accessKey":"$context.authorizer.principalId","accountId":"$context.identity.accountId","caller":"$context.identity.caller","cognitoAuthenticationProvider":"$context.identity.cognitoAuthenticationProvider","cognitoAuthenticationType":"$context.identity.cognitoAuthenticationType","cognitoIdentityId":"$context.identity.cognitoIdentityId","cognitoIdentityPoolId":"$context.identity.cognitoIdentityPoolId","principalOrgId":"$context.identity.principalOrgId","sourceIp":"$context.identity.sourceIp","user":"$context.identity.user","userAgent":"$context.identity.userAgent","userArn":"$context.identity.userArn"},"path":"$context.path","protocol":"$context.protocol","requestId":"$context.requestId","requestTime":"$context.requestTime","requestTimeEpoch":$context.requestTimeEpoch,"resourceId":"$context.resourceId","resourcePath":"$context.resourcePath","stage":"$context.stage"},"pathParameters":{"owner":"$util.escapeJavaScript($input.params(\'owner\'))"},"stageVariables":null,"isBase64Encoded":false}',
        },
        Type: 'AWS',
      },
      RequestParameters: Match.exact({
        'method.request.path.owner': true,
        'method.request.querystring.repo': true,
      }),
    });

  });

  test('should have no owner in path, repo is optional query', () => {

    const [stack, tokenProviderApi] = createTestableStackApi();

    tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
        issues: PermissionLevel.WRITE,
      },
      endpoint: TokenProviderEndpoint.useOwner('catnekaise'),
      targetRule: TokenProviderTargetRule.allowOwner(),
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ApiGateway::Method', {
      AuthorizationType: 'AWS_IAM',
      HttpMethod: 'GET',
      Integration: {
        IntegrationHttpMethod: 'POST',
        PassthroughBehavior: 'NEVER',
        RequestParameters: Match.exact({
          'integration.request.querystring.repo': 'method.request.querystring.repo',
        }),
        RequestTemplates: {
          'application/json': '{"tokenRequest":{"owner":"catnekaise","repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"tokenContext":{"endpoint":{"type":"STATIC_OWNER"},"providerName":"example-provider","app":{"name":"default","id":1234},"permissions":{"contents":"read","issues":"write"},"targetRule":{"repositorySelectionMode":"ALLOW_OWNER"}},"path":"$context.path","resource":"$context.resourcePath","httpMethod":"$context.httpMethod","queryStringParameters":{"repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"requestContext":{"accountId":"$context.accountId","apiId":"$context.apiId","domainName":"$context.domainName","domainPrefix":"$context.domainPrefix","extendedRequestId":"$context.extendedRequestId","httpMethod":"$context.httpMethod","identity":{"accessKey":"$context.authorizer.principalId","accountId":"$context.identity.accountId","caller":"$context.identity.caller","cognitoAuthenticationProvider":"$context.identity.cognitoAuthenticationProvider","cognitoAuthenticationType":"$context.identity.cognitoAuthenticationType","cognitoIdentityId":"$context.identity.cognitoIdentityId","cognitoIdentityPoolId":"$context.identity.cognitoIdentityPoolId","principalOrgId":"$context.identity.principalOrgId","sourceIp":"$context.identity.sourceIp","user":"$context.identity.user","userAgent":"$context.identity.userAgent","userArn":"$context.identity.userArn"},"path":"$context.path","protocol":"$context.protocol","requestId":"$context.requestId","requestTime":"$context.requestTime","requestTimeEpoch":$context.requestTimeEpoch,"resourceId":"$context.resourceId","resourcePath":"$context.resourcePath","stage":"$context.stage"},"pathParameters":{},"stageVariables":null,"isBase64Encoded":false}',
        },
        Type: 'AWS',
      },
      RequestParameters: Match.exact({
        'method.request.querystring.repo': false,
      }),
    });

  });

  test('should have no owner path parameter, repo is required in query', () => {

    const [stack, tokenProviderApi] = createTestableStackApi();

    tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
        issues: PermissionLevel.WRITE,
      },
      endpoint: TokenProviderEndpoint.useOwner('catnekaise'),
      targetRule: TokenProviderTargetRule.atLeastOne(),
    });

    const template = Template.fromStack(stack);


    template.hasResourceProperties('AWS::ApiGateway::Method', {
      AuthorizationType: 'AWS_IAM',
      HttpMethod: 'GET',
      Integration: {
        IntegrationHttpMethod: 'POST',
        PassthroughBehavior: 'NEVER',
        RequestParameters: Match.exact({
          'integration.request.querystring.repo': 'method.request.querystring.repo',
        }),
        RequestTemplates: {
          'application/json': '{"tokenRequest":{"owner":"catnekaise","repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"tokenContext":{"endpoint":{"type":"STATIC_OWNER"},"providerName":"example-provider","app":{"name":"default","id":1234},"permissions":{"contents":"read","issues":"write"},"targetRule":{"repositorySelectionMode":"AT_LEAST_ONE"}},"path":"$context.path","resource":"$context.resourcePath","httpMethod":"$context.httpMethod","queryStringParameters":{"repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"requestContext":{"accountId":"$context.accountId","apiId":"$context.apiId","domainName":"$context.domainName","domainPrefix":"$context.domainPrefix","extendedRequestId":"$context.extendedRequestId","httpMethod":"$context.httpMethod","identity":{"accessKey":"$context.authorizer.principalId","accountId":"$context.identity.accountId","caller":"$context.identity.caller","cognitoAuthenticationProvider":"$context.identity.cognitoAuthenticationProvider","cognitoAuthenticationType":"$context.identity.cognitoAuthenticationType","cognitoIdentityId":"$context.identity.cognitoIdentityId","cognitoIdentityPoolId":"$context.identity.cognitoIdentityPoolId","principalOrgId":"$context.identity.principalOrgId","sourceIp":"$context.identity.sourceIp","user":"$context.identity.user","userAgent":"$context.identity.userAgent","userArn":"$context.identity.userArn"},"path":"$context.path","protocol":"$context.protocol","requestId":"$context.requestId","requestTime":"$context.requestTime","requestTimeEpoch":$context.requestTimeEpoch,"resourceId":"$context.resourceId","resourcePath":"$context.resourcePath","stage":"$context.stage"},"pathParameters":{},"stageVariables":null,"isBase64Encoded":false}',
        },
        Type: 'AWS',
      },
      RequestParameters: Match.exact({
        'method.request.querystring.repo': true,
      }),
    });

  });

  test('should require owner in path, optional repo in query', () => {

    const [stack, tokenProviderApi] = createTestableStackApi();

    tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
        issues: PermissionLevel.WRITE,
        organizationProjects: PermissionLevel.ADMIN,
        workflows: PermissionLevel.WRITE,
        organizationPlan: PermissionLevel.READ,
      },
      endpoint: TokenProviderEndpoint.useOwner(),
      targetRule: TokenProviderTargetRule.allowOwner(),
    });

    const template = Template.fromStack(stack);


    template.hasResourceProperties('AWS::ApiGateway::Method', {
      AuthorizationType: 'AWS_IAM',
      HttpMethod: 'GET',
      Integration: {
        IntegrationHttpMethod: 'POST',
        PassthroughBehavior: 'NEVER',
        RequestParameters: Match.exact({
          'integration.request.path.owner': 'method.request.path.owner',
          'integration.request.querystring.repo': 'method.request.querystring.repo',
        }),
        RequestTemplates: {
          'application/json': '{"tokenRequest":{"owner":"$util.escapeJavaScript($input.params(\'owner\'))","repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"tokenContext":{"endpoint":{"type":"DYNAMIC_OWNER"},"providerName":"example-provider","app":{"name":"default","id":1234},"permissions":{"contents":"read","issues":"write","organization_projects":"admin","workflows":"write","organization_plan":"read"},"targetRule":{"repositorySelectionMode":"ALLOW_OWNER"}},"path":"$context.path","resource":"$context.resourcePath","httpMethod":"$context.httpMethod","queryStringParameters":{"repo":"$util.escapeJavaScript($input.params(\'repo\'))"},"requestContext":{"accountId":"$context.accountId","apiId":"$context.apiId","domainName":"$context.domainName","domainPrefix":"$context.domainPrefix","extendedRequestId":"$context.extendedRequestId","httpMethod":"$context.httpMethod","identity":{"accessKey":"$context.authorizer.principalId","accountId":"$context.identity.accountId","caller":"$context.identity.caller","cognitoAuthenticationProvider":"$context.identity.cognitoAuthenticationProvider","cognitoAuthenticationType":"$context.identity.cognitoAuthenticationType","cognitoIdentityId":"$context.identity.cognitoIdentityId","cognitoIdentityPoolId":"$context.identity.cognitoIdentityPoolId","principalOrgId":"$context.identity.principalOrgId","sourceIp":"$context.identity.sourceIp","user":"$context.identity.user","userAgent":"$context.identity.userAgent","userArn":"$context.identity.userArn"},"path":"$context.path","protocol":"$context.protocol","requestId":"$context.requestId","requestTime":"$context.requestTime","requestTimeEpoch":$context.requestTimeEpoch,"resourceId":"$context.resourceId","resourcePath":"$context.resourcePath","stage":"$context.stage"},"pathParameters":{"owner":"$util.escapeJavaScript($input.params(\'owner\'))"},"stageVariables":null,"isBase64Encoded":false}',
        },
        Type: 'AWS',
      },
      RequestParameters: Match.exact({
        'method.request.querystring.repo': false,
        'method.request.path.owner': true,
      }),
    });

  });
});

describe('Throws on configuration errors', () => {

  test('should throw error when name contains upper-case character', () => {

    const stack = new cdk.Stack(new cdk.App(), 'TestStack');

    expect(() => TokenProvider.create(stack, 'TokenProvider', {
      api: undefined as never,
      app: '',
      appId: 0,
      configurator: undefined as never,
      endpoint: TokenProviderEndpoint.useDefault(),
      lambda: undefined as never,
      methodOptions: undefined as never,
      name: 'Provider',
      permissions: undefined as never,
      targetRule: TokenProviderTargetRule.atLeastOne(),


    })).toThrow('A Token Provider can only consist of lower-case a-z and hyphens');

  });

  test('should throw error when token provider name starts with hyphen', () => {

    const stack = new cdk.Stack(new cdk.App(), 'TestStack');

    expect(() => TokenProvider.create(stack, 'TokenProvider', {
      api: undefined as never,
      app: '',
      appId: 0,
      configurator: undefined as never,
      endpoint: TokenProviderEndpoint.useDefault(),
      lambda: undefined as never,
      methodOptions: undefined as never,
      name: '-test',
      permissions: undefined as never,
      targetRule: TokenProviderTargetRule.atLeastOne(),

    })).toThrow('A Token Provider can only consist of lower-case a-z and hyphens');

  });

  test('should throw error when app name starts with number', () => {

    const stack = new cdk.Stack(new cdk.App(), 'TestStack');

    expect(() => TokenProvider.create(stack, 'TokenProvider', {
      api: undefined as never,
      app: '1234app',
      appId: 0,
      configurator: undefined as never,
      endpoint: TokenProviderEndpoint.useDefault(),
      lambda: undefined as never,
      methodOptions: undefined as never,
      name: 'test',
      permissions: undefined as never,
      targetRule: TokenProviderTargetRule.atLeastOne(),

    })).toThrow('A GitHub App name must start with a lower-case a-z character');

  });

  test('should throw error when app name contains upper-case', () => {

    const stack = new cdk.Stack(new cdk.App(), 'TestStack');

    expect(() => TokenProvider.create(stack, 'TokenProvider', {
      api: undefined as never,
      app: 'appS',
      appId: 0,
      configurator: undefined as never,
      endpoint: TokenProviderEndpoint.useDefault(),
      lambda: undefined as never,
      methodOptions: undefined as never,
      name: 'test',
      permissions: undefined as never,
      targetRule: TokenProviderTargetRule.atLeastOne(),

    })).toThrow('A GitHub App name can only consist of lower-case a-z, 0-9 and hyphens');

  });

  test('should throw error when configuring ALLOW_OWNER without an owner endpoint', () => {

    const [_, tokenProviderApi] = createTestableStackApi();


    expect(() => tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
        issues: PermissionLevel.WRITE,
      },
      targetRule: TokenProviderTargetRule.allowOwner(),
    })).toThrow();

  });

  test('should throw error when not providing at least one permission', () => {

    const [_, tokenProviderApi] = createTestableStackApi();


    expect(() => tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {},
    })).toThrow();

  });

  test('should throw error when setting unknown permission level', () => {

    const [_, tokenProviderApi] = createTestableStackApi();


    expect(() => tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        issues: 'superadmin' as never,
      },
      targetRule: TokenProviderTargetRule.allowOwner(),
    })).toThrow();

  });

  test('should throw error when setting unsupported permission level', () => {

    const [_, tokenProviderApi] = createTestableStackApi();


    expect(() => tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
        issues: PermissionLevel.ADMIN,
      },
    })).toThrow();

  });

  test('should throw error when re-using provider name', () => {

    const [_, tokenProviderApi] = createTestableStackApi();

    tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
      },
    });

    expect(() => tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,

      },
    })).toThrow();

  });

  test('should throw error when using non existing app', () => {

    const [_, tokenProviderApi] = createTestableStackApi();


    expect(() =>
      tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
        app: 'main',
      })).toThrow();


  });

});

describe('Grants execute', () => {

  describe('Default endpoint', () => {

    test('should grants access to any owner and any repo', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecute(role);

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/*/*'));
    });

    test('should grants access to single owner and any repo', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecute(role, 'catnekaise');

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/catnekaise/*'));
    });

    test('should grants access to single owner and single repo', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecute(role, 'catnekaise', 'example-repo');

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/catnekaise/example-repo'));
    });

    test('should grants access to single owner and multiple repo', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecute(role, 'catnekaise', 'repo-1', 'repo-2');

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/catnekaise/repo-1', '/GET/x/example-provider/catnekaise/repo-2'));
    });
  });

  describe('Owner endpoint', () => {

    test('should grants access to any owner', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
        endpoint: TokenProviderEndpoint.useOwner(),
      });


      provider.grantExecute(role);

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/*'));
    });

    test('should grants access to single owner', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
        endpoint: TokenProviderEndpoint.useOwner(),
      });

      provider.grantExecute(role, 'catnekaise');

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/catnekaise'));
    });

  });


});

describe('Grants execute GitHub Actions Attribute-based access control', () => {
  describe('Default endpoint', () => {

    test('should grants access via policyVar repository as default', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecuteGitHubActionsAbac(role, {
        claimsContext: createTestableClaimsContext(),
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/\${aws:PrincipalTag/repository}'));
    });

    test('should grants access to repositories when repositories strategy', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecuteGitHubActionsAbac(role, {
        claimsContext: createTestableClaimsContext(),
        pathStrategy: TokenProviderPathStrategy.selectRepositories('catnekaise', 'repo-1', 'repo-2'),
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/catnekaise/repo-1', '/GET/x/example-provider/catnekaise/repo-2'));
    });

    test('should grants access to owner when owner strategy', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecuteGitHubActionsAbac(role, {
        claimsContext: createTestableClaimsContext(),
        pathStrategy: TokenProviderPathStrategy.selectOwner('catnekaise'),
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/catnekaise/*'));
    });

    test('should grants access to any owner and any repository when strategy any repository', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecuteGitHubActionsAbac(role, {
        claimsContext: createTestableClaimsContext(),
        pathStrategy: TokenProviderPathStrategy.anyRepository(),
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/*/*'));
    });

    test('should grants access via policyVar repository_owner', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecuteGitHubActionsAbac(role, {
        claimsContext: createTestableClaimsContext(),
        pathStrategy: TokenProviderPathStrategy.policyVarRepositoryOwner(),
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/\${aws:PrincipalTag/repository_owner}/*'));
    });

    test('should grants access via policyVar repository_owner for configured repo', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
      });


      provider.grantExecuteGitHubActionsAbac(role, {
        claimsContext: createTestableClaimsContext(),
        pathStrategy: TokenProviderPathStrategy.policyVarRepositoryOwner('example-repo'),
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/\${aws:PrincipalTag/repository_owner}/example-repo'));
    });
  });

  describe('Owner endpoint', () => {
    test('should grants access via policyVar repository_owner', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
        endpoint: TokenProviderEndpoint.useOwner(),
      });


      provider.grantExecuteGitHubActionsAbac(role, {
        claimsContext: createTestableClaimsContext(),
        pathStrategy: TokenProviderPathStrategy.policyVarRepositoryOwner(),
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/\${aws:PrincipalTag/repository_owner}'));
    });

    test('should grants access for owner strategy', () => {

      const [stack, tokenProviderApi, role] = createTestableStackApiRole();

      const provider = tokenProviderApi.newTokenProvider('example-provider', {
        permissions: {
          contents: PermissionLevel.READ,
        },
        endpoint: TokenProviderEndpoint.useOwner('catnekaise'),
      });


      provider.grantExecuteGitHubActionsAbac(role, {
        claimsContext: createTestableClaimsContext(),
        pathStrategy: TokenProviderPathStrategy.selectOwner('catnekaise'),
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', generatePolicyApiResourceMatch(template, '/GET/x/example-provider/catnekaise'));
    });

  });
});

describe('Throws on unsupported granting access', () => {

  test('should throw error when granting access for owner with different name static owner', () => {

    const [_, tokenProviderApi, role] = createTestableStackApiRole();

    const provider = tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
      },
      endpoint: TokenProviderEndpoint.useOwner('catnekaise'),
    });

    expect(() => provider.grantExecuteGitHubActionsAbac(role, {
      claimsContext: createTestableClaimsContext(),
      pathStrategy: TokenProviderPathStrategy.selectOwner('djonser'),
    })).toThrow();

  });

  test('should throw error on owner endpoint when not configuring strategy', () => {

    const [_, tokenProviderApi, role] = createTestableStackApiRole();

    const provider = tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
      },
      endpoint: TokenProviderEndpoint.useOwner(),
    });

    expect(() => provider.grantExecuteGitHubActionsAbac(role, {
      claimsContext: createTestableClaimsContext(),
    })).toThrow();

  });

  test('should throw error on owner endpoint when strategy targets repositories', () => {

    const [_, tokenProviderApi, role] = createTestableStackApiRole();

    const provider = tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
      },
      endpoint: TokenProviderEndpoint.useOwner(),
    });

    expect(() => provider.grantExecuteGitHubActionsAbac(role, {
      claimsContext: createTestableClaimsContext(),
      pathStrategy: TokenProviderPathStrategy.selectRepositories('catnekaise', 'repo-1'),
    })).toThrow();

  });

  test('should throw error when strategy expects at least one repository', () => {

    const [_, tokenProviderApi, role] = createTestableStackApiRole();

    const provider = tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
      },
    });

    expect(() => provider.grantExecuteGitHubActionsAbac(role, {
      claimsContext: createTestableClaimsContext(),
      pathStrategy: TokenProviderPathStrategy.selectRepositories('catnekaise'),
    })).toThrow();

  });
});

describe('misc', () => {

  test('should return expected values', () => {

    const [_, tokenProviderApi] = createTestableStackApi();

    const p: any = tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
        issues: PermissionLevel.WRITE,
        organizationProjects: PermissionLevel.ADMIN,
        workflows: PermissionLevel.WRITE,
      },
      endpoint: TokenProviderEndpoint.useOwner(),
      targetRule: TokenProviderTargetRule.allowOwner(),
    });

    const provider: TokenProvider = p;

    expect(provider.httpMethod).toEqual('GET');
    expect(provider.methodArn).toBeTruthy();
    expect(provider.methodId).toBeTruthy();

  });

  test('should use non default app', () => {

    const [stack, tokenProviderApi] = createTestableStackApi();

    tokenProviderApi.newTokenProvider('example-provider', {
      permissions: {
        contents: PermissionLevel.READ,
      },
      app: 'alternative',
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ApiGateway::Method', {
      AuthorizationType: 'AWS_IAM',
      HttpMethod: 'GET',
      Integration: {
        IntegrationHttpMethod: 'POST',
        PassthroughBehavior: 'NEVER',
        Type: 'AWS',
      },
    });

  });
});


export function createTestableStackApi(secretsPrefix?: string, secretsStorage?: GitHubAppSecretsStorage): [cdk.Stack, TokenProviderApi] {
  const stack = new cdk.Stack(new cdk.App(), 'TestStack', {
    env: {
      region: 'eu-west-1',
      account: '111111111111',
    },
  });

  stack.node.setContext('@aws-cdk/core:enablePartitionLiterals', 'true');

  const apps = new ManagedGitHubApps(stack, 'AppSecrets', {
    defaultAppId: 1234,
    storage: secretsStorage ?? GitHubAppSecretsStorage.PARAMETER_STORE,
    prefix: secretsPrefix ?? undefined,
    additionalApps: [
      GitHubApp.create('alternative', 4321),
    ],
  });

  const func = new lambda.Function(stack, 'Function', {
    code: lambda.Code.fromInline('exports.handler = function() {};'),
    functionName: 'App',
    handler: 'bootstrap',
    runtime: lambda.Runtime.NODEJS_18_X,
    memorySize: 512,
    retryAttempts: 0,
    timeout: Duration.seconds(10),
  });

  const tokenProviderApi = new TokenProviderApi(stack, 'TokenProviderApi', {
    apps,
    lambda: func,
  });

  return [stack, tokenProviderApi];
}

function createTestableStackApiRole(): [cdk.Stack, TokenProviderApi, iam.Role] {

  const [stack, providerApi] = createTestableStackApi();

  const role = new iam.Role(stack, 'TestRole', {
    assumedBy: new iam.AccountRootPrincipal(),
    roleName: 'TestRole',
  });

  return [stack, providerApi, role];
}

function createTestableClaimsContext(): IClaimsContext {
  return {
    knownClaims: ['repository', 'repository_owner'],
    mappedClaims: {
      claims: [
        {
          tagName: 'repository',
          name: 'repository',
        },
        {
          tagName: 'repository_owner',
          name: 'repository_owner',
        },
      ],
    },

  };
}

function generatePolicyApiResourceMatch(template: Template, ...pathPart: string[]): any {

  const apiRef = Object.keys(template.findResources('AWS::ApiGateway::RestApi'))[0];
  const stageRef = Object.keys(template.findResources('AWS::ApiGateway::Stage'))[0];
  const roleRef = Object.keys(template.findResources('AWS::IAM::Role', {
    Properties: { RoleName: 'TestRole' },
  }))[0];

  return {
    PolicyDocument: {
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: pathPart.length === 1 ? generateFnJoin(apiRef, stageRef, pathPart[0]) : pathPart.map(x => generateFnJoin(apiRef, stageRef, x)),
        },
      ],
    },
    Roles: [
      {
        Ref: roleRef,
      },
    ],


  };
}

function generateFnJoin(apiRef: string, stageRef: string, pathPart: string): any {

  return {
    'Fn::Join': [
      '',
      [
        'arn:aws:execute-api:eu-west-1:111111111111:',
        {
          Ref: apiRef,
        },
        '/',
        {
          Ref: stageRef,
        },
        pathPart,
      ],
    ],
  };
}
