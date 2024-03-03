import * as path from 'path';
import { Annotations, Duration } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { TokenProviderConfigurator } from './configurator';
import { TokenProviderTargetRule } from './target';
import { ITokenProvider, TokenProvider, TokenProviderEndpoint } from './token-provider';
import { GitHubAppPermissions } from '../';
import { IGitHubApps } from '../apps';

export interface TokenProviderApiProps {

  /**
   * GitHub Apps configuration
   */
  readonly apps: IGitHubApps;

  /**
   * Use this to provide the API Gateway RestApi configured to your requirements
   */
  readonly api?: apigateway.RestApi;

  /**
   * Use this to provide the Lambda Function configured to your requirements
   */
  readonly lambda?: lambda.Function;
}

export interface NewTokenProviderConfiguration {

  /**
   * Permissions
   */
  readonly permissions: GitHubAppPermissions;

  /**
   * @default DEFAULT
   */
  readonly endpoint?: TokenProviderEndpoint;

  /**
   * @default AT_LEAST_ONE
   */
  readonly targetRule?: TokenProviderTargetRule;

  /**
   * @default default
   */
  readonly app?: string;
}

export interface ITokenProviderApi {
  newTokenProvider(name: string, configuration: NewTokenProviderConfiguration): ITokenProvider;
}

export class TokenProviderApi extends Construct implements ITokenProviderApi {

  private readonly usedTokenProviderNames: string[] = [];

  private readonly tokenResponseModel: apigateway.Model;
  private readonly errorResponseModel: apigateway.Model;
  private readonly _lambda: lambda.Function;
  private readonly _api: apigateway.RestApi;
  private readonly props: TokenProviderApiProps;
  private readonly requestValidator: apigateway.RequestValidator;

  get lambdaFunction(): lambda.Function {
    return this._lambda;
  }

  get restApi(): apigateway.RestApi {
    return this._api;
  }

  constructor(scope: Construct, id: string, props: TokenProviderApiProps) {
    super(scope, id);

    this.props = props;

    if (props.api) {
      this._api = props.api;
    } else {
      this._api = new apigateway.RestApi(this, 'TokenProviderApi', {
        deployOptions: {
          throttlingBurstLimit: 10,
          throttlingRateLimit: 10,
          stageName: 'dev',
        },
      });
      Annotations.of(this).addWarning('The RestApi created by the `TokenProviderApi` construct is only intended for testing purposes. Provide your own RestApi via props to this construct.');
    }

    this.tokenResponseModel = this._api.addModel('TokenResponseModel', {
      contentType: 'application/json',
      modelName: 'TokenResponse',
      schema: {
        schema: apigateway.JsonSchemaVersion.DRAFT7,
        title: 'tokenResponse',
        type: apigateway.JsonSchemaType.OBJECT,
        properties: {
          token: { type: apigateway.JsonSchemaType.STRING },
        },
      },
    });

    this.errorResponseModel = this._api.addModel('ErrorResponseModel', {
      contentType: 'application/json',
      modelName: 'ErrorResponseModel',
      schema: {
        schema: apigateway.JsonSchemaVersion.DRAFT7,
        title: 'errorResponse',
        type: apigateway.JsonSchemaType.OBJECT,
        properties: {
          errorMessage: { type: apigateway.JsonSchemaType.STRING },
        },
      },
    });

    this.requestValidator = new apigateway.RequestValidator(this, 'RequestValidator', {
      requestValidatorName: 'ParameterValidator',
      restApi: this._api,
      validateRequestBody: false,
      validateRequestParameters: true,

    });

    if (props.lambda) {
      this._lambda = props.lambda;
    } else {
      this._lambda = new lambda.Function(this, 'Function', {
        code: lambda.Code.fromDockerBuild(path.join(__dirname, '../../lambda/default'), {
          platform: 'linux/amd64',
        }),
        handler: 'bootstrap',
        runtime: new lambda.Runtime('provided.al2023', lambda.RuntimeFamily.OTHER),
        memorySize: 512,
        retryAttempts: 0,
        timeout: Duration.seconds(10),
      });
    }

    this._lambda.addEnvironment('SECRETS_PREFIX', props.apps.secretsPrefix);
    this._lambda.addEnvironment('SECRETS_STORAGE', props.apps.secretsStorage);

    props.apps.grantAccess(this._lambda.grantPrincipal);

  }

  newTokenProvider(name: string, configuration: NewTokenProviderConfiguration): ITokenProvider {

    if (this.usedTokenProviderNames.includes(name)) {
      throw new Error(`A token provider with the name ${name} has already been created`);
    }

    this.usedTokenProviderNames.push(name);

    const endpoint = configuration.endpoint ?? TokenProviderEndpoint.useDefault();
    const targetRule = configuration.targetRule ?? TokenProviderTargetRule.atLeastOne();
    const appName = configuration.app ?? 'default';

    return TokenProvider.create(this, name, {
      api: this._api,
      app: appName,
      appId: this.props.apps.getAppIdForAppName(appName),
      configurator: TokenProviderConfigurator.create(),
      endpoint,
      lambda: this._lambda,
      methodOptions: {
        requestValidator: this.requestValidator,
        endpointType: endpoint.type,
        tokenResponseModel: this.tokenResponseModel,
        errorResponseModel: this.errorResponseModel,
        operationName: `provider-${name}`,
      },
      name,
      permissions: configuration.permissions,
      targetRule,
    });
  }

}
