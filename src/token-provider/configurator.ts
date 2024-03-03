import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { RepositorySelectionMode, TargetRuleSettings } from './target';
import { TokenProviderEndpoint, TokenProviderEndpointType } from './token-provider';
import { GitHubAppPermissions, PermissionLevel } from '../';

interface TokenProviderConfiguratorIntegrationOptionsParameters {
  readonly requestParameters: Record<string, string>;
  readonly pathParameters: Record<string, string>;
  readonly tokenRequestParameters: Record<string, string>;
  readonly queryStringParameters?: Record<string, string>;
}

export interface TokenProviderConfiguratorIntegrationOptionsContext {
  readonly name: string;
  readonly endpoint: TokenProviderEndpoint;
  readonly appId: number;
  readonly appName: string;
  readonly permissions: GitHubAppPermissions;
  readonly targetRule: TargetRuleSettings;
}

export interface TokenProviderConfiguratorMethodOptionsContext {
  readonly requestValidator?: apigateway.IRequestValidator;
  readonly endpointType: TokenProviderEndpointType;
  readonly repositorySelectionMode: RepositorySelectionMode;
  readonly tokenResponseModel: apigateway.Model;
  readonly errorResponseModel: apigateway.Model;
  readonly operationName: string;
}

/**
 * This class may see some breaking changes but the intent is to stabilize, be made abstract and available as input on `TokenProviderConfiguration`
 **/
export class TokenProviderConfigurator {

  static create(): TokenProviderConfigurator {
    return new TokenProviderConfigurator();
  }

  private constructor() {
  }

  get integrationResponses(): apigateway.IntegrationResponse[] {

    return [
      {
        statusCode: '201',
        responseTemplates: {
          'application/json': `${JSON.stringify({ token: '$util.escapeJavaScript($input.path(\'$.token\'))' })}`,
        },
        responseParameters: {
          'method.response.header.Content-Type': '\'application/json\'',
        },
      },
      {
        selectionPattern: '.*CK_ERR_400.*',
        statusCode: '400',
        responseTemplates: {
          'application/json': `#set($body = $util.parseJson($input.path('$.errorMessage')))\n${JSON.stringify({ message: '$util.escapeJavaScript($body.message)' })}`,
        },
        responseParameters: {
          'method.response.header.Content-Type': '\'application/json\'',
        },
      },
      {
        selectionPattern: '.*CK_ERR_500.*',
        statusCode: '500',
        responseTemplates: {
          'application/json': `#set($body = $util.parseJson($input.path('$.errorMessage')))\n${JSON.stringify({ message: '$util.escapeJavaScript($body.message)' })}`,
        },
        responseParameters: {
          'method.response.header.Content-Type': '\'application/json\'',
        },
      },
    ];
  }

  createApiResource(api: apigateway.IRestApi, name: string, endpoint: TokenProviderEndpoint): apigateway.Resource {

    let resource = api.root.resourceForPath(`x/${name}`);

    switch (endpoint.type) {
      case TokenProviderEndpointType.DEFAULT:
        resource = resource.addResource('{owner}').addResource('{repo}');
        break;
      case TokenProviderEndpointType.STATIC_OWNER:
        resource = resource.addResource(endpoint.owner!);
        break;
      case TokenProviderEndpointType.DYNAMIC_OWNER:
        resource = resource.addResource('{owner}');
        break;
    }

    return resource;
  }

  createMethodOptions(input: TokenProviderConfiguratorMethodOptionsContext): apigateway.MethodOptions {

    const requestParameters: Record<string, boolean> = {};

    switch (input.endpointType) {
      case TokenProviderEndpointType.DEFAULT:
        requestParameters['method.request.path.owner'] = true;
        requestParameters['method.request.path.repo'] = true;
        break;
      case TokenProviderEndpointType.STATIC_OWNER:
        requestParameters['method.request.querystring.repo'] = input.repositorySelectionMode === RepositorySelectionMode.AT_LEAST_ONE;
        break;
      case TokenProviderEndpointType.DYNAMIC_OWNER:
        requestParameters['method.request.path.owner'] = true;
        requestParameters['method.request.querystring.repo'] = input.repositorySelectionMode === RepositorySelectionMode.AT_LEAST_ONE;
        break;
    }

    return {
      authorizationType: apigateway.AuthorizationType.IAM,
      operationName: input.operationName,
      requestValidator: input.requestValidator,
      requestParameters,
      methodResponses: [
        {
          statusCode: '201',
          responseParameters: {
            'method.response.header.Content-Type': true,
          },
          responseModels: {
            'application/json': input.tokenResponseModel,
          },
        },
        {
          statusCode: '400',
          responseParameters: {
            'method.response.header.Content-Type': true,
          },
          responseModels: {
            'application/json': input.errorResponseModel,
          },
        },
        {
          statusCode: '500',
          responseParameters: {
            'method.response.header.Content-Type': true,
          },
          responseModels: {
            'application/json': input.errorResponseModel,
          },
        },
      ],
    };
  }


  // eslint-disable-next-line max-len
  private doCreateIntegrationOptions(settings: TokenProviderConfiguratorIntegrationOptionsContext, parameters: TokenProviderConfiguratorIntegrationOptionsParameters): apigateway.LambdaIntegrationOptions {

    const {
      tokenRequestParameters,
      requestParameters,
      queryStringParameters,
      pathParameters,
    } = parameters;

    return {
      proxy: false,
      passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
      requestParameters,
      requestTemplates: {
        'application/json': JSON.stringify({
          tokenRequest: tokenRequestParameters,
          tokenContext: {
            endpoint: {
              type: settings.endpoint.type,
            },
            providerName: settings.name,
            app: {
              name: settings.appName,
              id: settings.appId,
            },
            permissions: remapPermissionKeys(settings.permissions),
            targetRule: {
              repositorySelectionMode: settings.targetRule.mode,
            },
          },
          path: '$context.path',
          resource: '$context.resourcePath',
          httpMethod: '$context.httpMethod',
          queryStringParameters,
          requestContext: {
            accountId: '$context.accountId',
            apiId: '$context.apiId',
            domainName: '$context.domainName',
            domainPrefix: '$context.domainPrefix',
            extendedRequestId: '$context.extendedRequestId',
            httpMethod: '$context.httpMethod',
            identity: {
              accessKey: '$context.authorizer.principalId',
              accountId: '$context.identity.accountId',
              caller: '$context.identity.caller',
              cognitoAuthenticationProvider: '$context.identity.cognitoAuthenticationProvider',
              cognitoAuthenticationType: '$context.identity.cognitoAuthenticationType',
              cognitoIdentityId: '$context.identity.cognitoIdentityId',
              cognitoIdentityPoolId: '$context.identity.cognitoIdentityPoolId',
              principalOrgId: '$context.identity.principalOrgId',
              sourceIp: '$context.identity.sourceIp',
              user: '$context.identity.user',
              userAgent: '$context.identity.userAgent',
              userArn: '$context.identity.userArn',
            },
            path: '$context.path',
            protocol: '$context.protocol',
            requestId: '$context.requestId',
            requestTime: '$context.requestTime',
            requestTimeEpoch: 'REQUEST_TIME_EPOCH',
            resourceId: '$context.resourceId',
            resourcePath: '$context.resourcePath',
            stage: '$context.stage',
          },
          pathParameters,
          stageVariables: null,
          isBase64Encoded: false,
        }).replace('\"REQUEST_TIME_EPOCH\"', '$context.requestTimeEpoch'),
      },
      integrationResponses: this.integrationResponses,
    };
  }

  createIntegrationOptions(settings: TokenProviderConfiguratorIntegrationOptionsContext): apigateway.LambdaIntegrationOptions {

    const requestParameters: Record<string, string> = {};
    const pathParameters: Record<string, string> = {};
    const tokenRequestParameters: Record<string, string> = {};
    let queryStringParameters: Record<string, string> | undefined;

    switch (settings.endpoint.type) {
      case TokenProviderEndpointType.DEFAULT:
        requestParameters['integration.request.path.owner'] = 'method.request.path.owner';
        requestParameters['integration.request.path.repo'] = 'method.request.path.repo';
        tokenRequestParameters.owner = '$util.escapeJavaScript($input.params(\'owner\'))';
        tokenRequestParameters.repo = '$util.escapeJavaScript($input.params(\'repo\'))';
        pathParameters.owner = '$util.escapeJavaScript($input.params(\'owner\'))';
        pathParameters.repo = '$util.escapeJavaScript($input.params(\'repo\'))';
        break;
      case TokenProviderEndpointType.DYNAMIC_OWNER:
        requestParameters['integration.request.path.owner'] = 'method.request.path.owner';
        requestParameters['integration.request.querystring.repo'] = 'method.request.querystring.repo';
        tokenRequestParameters.owner = '$util.escapeJavaScript($input.params(\'owner\'))';
        tokenRequestParameters.repo = '$util.escapeJavaScript($input.params(\'repo\'))';
        pathParameters.owner = '$util.escapeJavaScript($input.params(\'owner\'))';
        queryStringParameters = { repo: '$util.escapeJavaScript($input.params(\'repo\'))' };
        break;
      case TokenProviderEndpointType.STATIC_OWNER:
        requestParameters['integration.request.querystring.repo'] = 'method.request.querystring.repo';
        tokenRequestParameters.owner = `${settings.endpoint.owner!}`;
        tokenRequestParameters.repo = '$util.escapeJavaScript($input.params(\'repo\'))';
        queryStringParameters = { repo: '$util.escapeJavaScript($input.params(\'repo\'))' };
        break;
    }

    return this.doCreateIntegrationOptions(settings, {
      requestParameters,
      pathParameters,
      tokenRequestParameters,
      queryStringParameters,
    });

  }
}

const PermissionObjectKeyRemaps = {
  actions: 'actions',
  administration: 'administration',
  checks: 'checks',
  codespaces: 'codespaces',
  contents: 'contents',
  dependabotSecrets: 'dependabot_secrets',
  deployments: 'deployments',
  environments: 'environments',
  issues: 'issues',
  metadata: 'metadata',
  packages: 'packages',
  pages: 'pages',
  pullRequests: 'pull_requests',
  repositoryCustomProperties: 'repository_custom_properties',
  repositoryHooks: 'repository_hooks',
  repositoryProjects: 'repository_projects',
  secretScanningAlerts: 'secret_scanning_alerts',
  secrets: 'secrets',
  securityEvents: 'security_events',
  singleFile: 'single_file',
  statuses: 'statuses',
  vulnerabilityAlerts: 'vulnerability_alerts',
  workflows: 'workflows',
  members: 'members',
  organizationAdministration: 'organization_administration',
  organizationCustomRoles: 'organization_custom_roles',
  organizationCustomOrgRoles: 'organization_custom_org_roles',
  organizationCustomProperties: 'organization_custom_properties',
  organizationCopilotSeatManagement: 'organization_copilot_seat_management',
  organizationAnnouncementBanners: 'organization_announcement_banners',
  organizationEvents: 'organization_events',
  organizationHooks: 'organization_hooks',
  organizationPersonalAccessTokens: 'organization_personal_access_tokens',
  organizationPersonalAccessTokenRequests: 'organization_personal_access_token_requests',
  organizationPlan: 'organization_plan',
  organizationProjects: 'organization_projects',
  organizationPackages: 'organization_packages',
  organizationSecrets: 'organization_secrets',
  organizationSelfHostedRunners: 'organization_self_hosted_runners',
  organizationUserBlocking: 'organization_user_blocking',
  teamDiscussions: 'team_discussions',
  emailAddresses: 'email_addresses',
  followers: 'followers',
  gitSshKeys: 'git_ssh_keys',
  gpgKeys: 'gpg_keys',
  interactionLimits: 'interaction_limits',
  profile: 'profile',
  starring: 'starring',
};

function remapPermissionKeys(permissions: GitHubAppPermissions): { [key: string]: PermissionLevel } {

  const remapped: { [key: string]: PermissionLevel } = {};

  for (const key of Object.keys(permissions)) {

    const newKey = PermissionObjectKeyRemaps[key as never];

    remapped[newKey] = permissions[key as never];
  }

  return remapped;
}

