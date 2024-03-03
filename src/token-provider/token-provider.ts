import { ClaimsUtility, IClaimsContext, PolicyVariable } from '@catnekaise/cdk-iam-utilities';
import { IamResourcePathBuilder } from '@catnekaise/cdk-iam-utilities/lib/iam-resource-path';
import { Annotations, ArnFormat, Stack } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { TokenProviderConfigurator } from './configurator';
import { TokenProviderPathPolicyVariable, TokenProviderPathStrategy, TokenProviderPathStrategyType } from './gha-abac';
import { RepositorySelectionMode, TokenProviderTargetRule } from './target';
import { GitHubAppPermissions } from '../app-permissions';

export enum TokenProviderEndpointType {
  DEFAULT = 'DEFAULT',
  DYNAMIC_OWNER = 'DYNAMIC_OWNER',
  STATIC_OWNER = 'STATIC_OWNER',
}

export class TokenProviderEndpoint {

  /**
   * Use this to configure a token provider at `/x/<provider-name>/{owner}/{repo}`
   */
  static useDefault(): TokenProviderEndpoint {
    return new TokenProviderEndpoint(TokenProviderEndpointType.DEFAULT);
  }

  /**
   * Use this to configure a token provider at `/x/<provider-name>/{owner}` or `/x/<provider-name>/<owner>`
   */
  static useOwner(owner?: string): TokenProviderEndpoint {
    return new TokenProviderEndpoint(owner ? TokenProviderEndpointType.STATIC_OWNER : TokenProviderEndpointType.DYNAMIC_OWNER, owner);
  }

  private constructor(public readonly type: TokenProviderEndpointType, public readonly owner?: string, public readonly repo?: string) {
  }

  get isOwnerEndpoint(): boolean {
    return [TokenProviderEndpointType.DYNAMIC_OWNER, TokenProviderEndpointType.STATIC_OWNER].includes(this.type);
  }
}

export interface TokenProviderActionsIdentitySettings {
  readonly claimsContext: IClaimsContext;
  readonly pathStrategy?: TokenProviderPathStrategy;

}

export interface ITokenProvider {

  /**
   * Use this to grant access to the token provider.
   */
  grantExecute(role: iam.IRole, owner?: string, ...repo: string[]): iam.Grant;

  /**
   * use this to grant access to the token provider when the role is assumed via Cognito Identity
   */
  grantExecuteGitHubActionsAbac(role: iam.IRole, settings: TokenProviderActionsIdentitySettings): iam.Grant;
}

export interface TokenProviderMethodOptions {
  readonly requestValidator: apigateway.RequestValidator;
  readonly endpointType: TokenProviderEndpointType;
  readonly tokenResponseModel: apigateway.Model;
  readonly errorResponseModel: apigateway.Model;
  readonly operationName: string;
}

export interface TokenProviderSettings {
  readonly permissions: GitHubAppPermissions;
  readonly endpoint: TokenProviderEndpoint;
  readonly targetRule: TokenProviderTargetRule;
  readonly app: string;
  readonly appId: number;
  readonly configurator: TokenProviderConfigurator;
  readonly methodOptions: TokenProviderMethodOptions;
  readonly name: string;
  readonly api: apigateway.IRestApi;
  readonly lambda: lambda.Function;
}

/**
 * This construct may receive some changes before constructor is made public. Until then use static create method.
 */
export class TokenProvider extends Construct implements ITokenProvider {

  static create(scope: Construct, id: string, settings: TokenProviderSettings): TokenProvider {
    return new TokenProvider(scope, id, settings);
  }

  private readonly method: apigateway.Method;

  private constructor(scope: Construct, id: string, private readonly settings: TokenProviderSettings) {
    super(scope, id);

    if (!settings.name.match(/^[a-z][a-z-]+$/)) {
      throw new Error('A Token Provider can only consist of lower-case a-z and hyphens');
    }

    const appName = settings.app ?? 'default';

    if (!appName.match(/^[a-z]/)) {
      throw new Error('A GitHub App name must start with a lower-case a-z character');
    }

    if (!appName.match(/^[a-z][a-z0-9-]+$/)) {
      throw new Error('A GitHub App name can only consist of lower-case a-z, 0-9 and hyphens');
    }

    switch (settings.targetRule.repositorySelectionMode) {
      case RepositorySelectionMode.ALLOW_OWNER:

        if (!settings.endpoint.isOwnerEndpoint) {
          throw new Error('When using RepositorySelectionMode.ALLOW_OWNER, the ProviderEndpointType must be either DYNAMIC_OWNER or STATIC_OWNER');
        }
        break;
    }

    validatePermissionSelection(settings.permissions);

    if (settings.endpoint.type !== settings.methodOptions.endpointType) {
      throw new Error('Error');
    }

    const configurator = settings.configurator;

    const lambdaIntegrationOptions = configurator.createIntegrationOptions({
      name: settings.name,
      endpoint: settings.endpoint,
      permissions: settings.permissions,
      appName,
      appId: settings.appId,
      targetRule: {
        mode: settings.targetRule.repositorySelectionMode,
      },
    });

    const methodOptions = configurator.createMethodOptions({
      requestValidator: settings.methodOptions.requestValidator,
      endpointType: settings.endpoint.type,
      tokenResponseModel: settings.methodOptions.tokenResponseModel,
      errorResponseModel: settings.methodOptions.errorResponseModel,
      repositorySelectionMode: settings.targetRule.repositorySelectionMode,
      operationName: settings.methodOptions.operationName,
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(settings.lambda, lambdaIntegrationOptions);

    this.method = configurator.createApiResource(settings.api, settings.name, settings.endpoint)
      .addMethod('GET', lambdaIntegration, methodOptions);
  }

  grantExecute(role: iam.IRole, owner?: string, ...repo: string[]): iam.Grant {

    let resourceArns: string[];

    if (repo.length === 0) {
      resourceArns = [ProviderPermissions.createExecuteArn(this, {
        baseResourcePath: this.baseResourcePath().toString(),
        endpoint: this.settings.endpoint,
        restApiId: this.settings.api.restApiId,
        owner,
      })];

      if (!owner && this.settings.endpoint.isOwnerEndpoint && !this.node.tryGetContext('@catnekaise/disableGrantExecuteImplicitAccessWarning')) {
        Annotations.of(this).addWarning('By not specifying a owner or repositories, access is granted for all owners and repositories');
      }

    } else {
      resourceArns = repo.map(r => ProviderPermissions.createExecuteArn(this, {
        baseResourcePath: this.baseResourcePath().toString(),
        endpoint: this.settings.endpoint,
        restApiId: this.settings.api.restApiId,
        owner,
        repo: r,
      }));
    }

    return iam.Grant.addToPrincipal({
      grantee: role,
      actions: [
        'execute-api:Invoke',
      ],
      resourceArns,
    });
  }

  grantExecuteGitHubActionsAbac(role: iam.IRole, settings: TokenProviderActionsIdentitySettings): iam.Grant {

    if (this.settings.endpoint.isOwnerEndpoint && !settings.pathStrategy) {
      throw new Error('When the token provider uses an owner endpoint, pathStrategy must explicitly be configured');
    } else if (this.settings.endpoint.isOwnerEndpoint && settings.pathStrategy?.pathTargetsRepositories) {
      throw new Error('When the token provider uses an owner endpoint, pathStrategy must not match against repositories');
    }

    const pathStrategy = settings.pathStrategy ?? TokenProviderPathStrategy.policyVarRepository();

    const createArnSettings: CreateExecuteArn = {
      baseResourcePath: this.baseResourcePath().toString(),
      endpoint: this.settings.endpoint,
      restApiId: this.settings.api.restApiId,
    };

    const resourceArns: string[] = [];

    switch (pathStrategy.type) {
      case TokenProviderPathStrategyType.ANY_REPOSITORY:

        resourceArns.push(ProviderPermissions.createExecuteArn(this, createArnSettings));
        break;
      case TokenProviderPathStrategyType.OWNER:

        resourceArns.push(ProviderPermissions.createExecuteArn(this, {
          ...createArnSettings,
          owner: pathStrategy.owner!,
        }));
        break;
      case TokenProviderPathStrategyType.REPOSITORIES:

        for (const repo of pathStrategy.repositories) {
          resourceArns.push(ProviderPermissions.createExecuteArn(this, {
            ...createArnSettings,
            owner: pathStrategy.owner,
            repo,
          }));
        }
        break;
      case TokenProviderPathStrategyType.POLICY_VAR:

        if (pathStrategy.repositories.length > 0) {
          for (const repo of pathStrategy.repositories) {
            resourceArns.push(ProviderPermissions.createExecuteArnWithPolicyVariable(this, {
              ...createArnSettings,
              pathStrategy,
              claimsContext: settings.claimsContext,
              repo,
            }));
          }
        } else {
          resourceArns.push(ProviderPermissions.createExecuteArnWithPolicyVariable(this, {
            ...createArnSettings,
            pathStrategy,
            claimsContext: settings.claimsContext,
          }));
        }
    }

    return iam.Grant.addToPrincipal({
      grantee: role,
      actions: [
        'execute-api:Invoke',
      ],
      resourceArns,
    });

  }

  private baseResourcePath(): ResourcePathBuilder {
    return new ResourcePathBuilder([this.settings.api.deploymentStage.stageName, 'GET', 'x', this.settings.name]);
  }

  metric(metricName: string, stage: apigateway.IStage, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.method.metric(metricName, stage, props);
  }

  metricClientError(stage: apigateway.IStage, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.method.metricClientError(stage, props);
  }

  metricServerError(stage: apigateway.IStage, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.method.metricServerError(stage, props);
  }

  metricCacheHitCount(stage: apigateway.IStage, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.method.metricCacheHitCount(stage, props);
  }

  metricCacheMissCount(stage: apigateway.IStage, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.method.metricCacheMissCount(stage, props);
  }

  metricCount(stage: apigateway.IStage, props?: cloudwatch.MetricOptions): cloudwatch.Metric {
    return this.method.metricCount(stage, props);
  }

  get methodArn(): string {
    return this.method.methodArn;
  }

  get methodId(): string {
    return this.method.methodId;
  }

  get httpMethod(): string {
    return this.method.httpMethod;
  }
}

interface CreateExecuteArn {
  readonly baseResourcePath: string;
  readonly endpoint: TokenProviderEndpoint;
  readonly owner?: string;
  readonly repo?: string;
  readonly restApiId: string;
}

interface CreateExecuteArnWithPolicyVariable {
  readonly baseResourcePath: string;
  readonly endpoint: TokenProviderEndpoint;
  readonly claimsContext: IClaimsContext;
  readonly pathStrategy: TokenProviderPathStrategy;
  readonly repo?: string;
  readonly restApiId: string;
}

abstract class ProviderPermissions {

  public static createExecuteArn(scope: Construct, input: CreateExecuteArn): string {

    const {
      baseResourcePath,
      endpoint,
      owner: owner,
      repo: repo,
      restApiId,
    } = input;

    const endpointOwner = endpoint.owner;
    let resourcePath = new ResourcePathBuilder([baseResourcePath]);

    switch (endpoint.type) {
      case TokenProviderEndpointType.DEFAULT:
        resourcePath = resourcePath.text(owner ?? '*', repo ?? '*');

        break;
      case TokenProviderEndpointType.STATIC_OWNER:
        if (owner && owner !== endpointOwner) {
          throw new Error('ProviderEndpoint is of type STATIC_OWNER and provided owner does not match statically configured owner of the endpoint. Either specify owner name or omit owner when calling grantExecute.');
        }
        resourcePath = resourcePath.text(endpointOwner!);

        break;
      case TokenProviderEndpointType.DYNAMIC_OWNER:
        resourcePath = resourcePath.text(owner ?? '*');

        break;
    }

    return Stack.of(scope).formatArn({
      service: 'execute-api',
      resource: restApiId,
      arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
      resourceName: resourcePath.toString(),
    });
  }

  public static createExecuteArnWithPolicyVariable(scope: Construct, settings: CreateExecuteArnWithPolicyVariable): string {

    const {
      baseResourcePath,
      claimsContext,
      endpoint,
      pathStrategy,
      repo,
      restApiId,
    } = settings;

    let resourcePath = new ResourcePathBuilder([baseResourcePath]);
    const util = ClaimsUtility.forContext(claimsContext);

    if (pathStrategy.policyVar === TokenProviderPathPolicyVariable.REPOSITORY) {
      resourcePath = resourcePath.text(PolicyVariable.principalTag(util.tagNameForClaim('repository')).toString());
      return this.createArnFromPathPart(scope, restApiId, resourcePath);
    }

    if (pathStrategy.policyVar === TokenProviderPathPolicyVariable.REPOSITORY_OWNER) {
      resourcePath = resourcePath.text(PolicyVariable.principalTag(util.tagNameForClaim('repository_owner')).toString());

      if (repo) {
        resourcePath = resourcePath.text(repo);
      } else if (!endpoint.isOwnerEndpoint) {
        resourcePath = resourcePath.text('*');
      }

      return this.createArnFromPathPart(scope, restApiId, resourcePath);
    }

    throw new Error('Provide a valid TokenProviderPathPolicyVariable');
  }

  private static createArnFromPathPart(scope: Construct, restApiId: string, resourceName: IamResourcePathBuilder): string {
    return Stack.of(scope).formatArn({
      service: 'execute-api',
      resource: restApiId,
      arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
      resourceName: resourceName.toString(),
    });
  }

  private constructor() {
  }
}

class ResourcePathBuilder extends IamResourcePathBuilder {

  constructor(path: string[]) {
    super(path);
  }

  text(...values: string[]): ResourcePathBuilder {
    return new ResourcePathBuilder(this.appendText(...values));
  }
}

const allowsAdmin = ['repositoryProjects', 'organizationProjects', 'organizationCustomProperties'];
const allowsReadOnly = ['organizationPlan', 'organizationEvents'];
const allowsWriteOnly = ['workflows', 'organizationCopilotSeatManagement', 'profile'];

function validatePermissionSelection(permissions: GitHubAppPermissions): void {

  if (Object.keys(permissions).length === 0) {
    throw new Error('At least one permission has to be configured');
  }

  for (const key of Object.keys(permissions)) {

    const permission = permissions[key as never];
    let allowed: string[];

    if (allowsAdmin.includes(key)) {
      allowed = ['admin', 'read', 'write'];
    } else if (allowsReadOnly.includes(key)) {
      allowed = ['read'];
    } else if (allowsWriteOnly.includes(key)) {
      allowed = ['write'];
    } else {
      allowed = ['read', 'write'];
    }

    if (!allowed.includes(permission)) {
      throw new Error(`The permission ${key} does not allow permission of ${permission}`);
    }

  }


}
