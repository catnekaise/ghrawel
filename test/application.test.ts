import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { MockIntegration } from 'aws-cdk-lib/aws-apigateway';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as lambda from 'aws-cdk-lib/aws-lambda';
// @ts-ignore
import { createTestableStackApi } from './token-provider.test';
import { GitHubAppSecretsStorage, ManagedGitHubApps, TokenProviderApi } from '../src';

describe('Application - Lambda and GitHub Apps', () => {

  test('should have default env vars and parameter store permission', () => {

    const [stack, tokenProviderApi] = createTestableStackApi();
    tokenProviderApi.restApi.root.addMethod('GET', new MockIntegration());

    const template = Template.fromStack(stack);

    const roleRef = Object.keys(template.findResources('AWS::IAM::Role')).find(x => x.startsWith('FunctionServiceRole'));

    template.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: 'App',
      Environment: {
        Variables: {
          SECRETS_PREFIX: '/catnekaise/github-apps',
          SECRETS_STORAGE: 'PARAMETER_STORE',
        },
      },
    });

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.exact([
          {
            Action: 'ssm:GetParameter',
            Effect: 'Allow',
            Resource: 'arn:aws:ssm:eu-west-1:111111111111:parameter/catnekaise/github-apps/*',
          },
        ]),
      },
      Roles: [
        {
          Ref: roleRef,
        },
      ],
    });
  });

  test('should have non-default env vars and secrets manager permission', () => {

    const [stack, tokenProviderApi] = createTestableStackApi('/custom-prefix', GitHubAppSecretsStorage.SECRETS_MANAGER);
    tokenProviderApi.restApi.root.addMethod('GET', new MockIntegration());

    const template = Template.fromStack(stack);


    const roleRef = Object.keys(template.findResources('AWS::IAM::Role')).find(x => x.startsWith('FunctionServiceRole'));

    template.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: 'App',
      Environment: {
        Variables: {
          SECRETS_PREFIX: '/custom-prefix',
          SECRETS_STORAGE: 'SECRETS_MANAGER',
        },
      },
    });

    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.exact([
          {
            Action: 'secretsmanager:GetSecretValue',
            Effect: 'Allow',
            Resource: 'arn:aws:secretsmanager:eu-west-1:111111111111:secret:/custom-prefix/*',
          },
        ]),
      },
      Roles: [
        {
          Ref: roleRef,
        },
      ],
    });
  });

  test('should have kms permissions', () => {


    const stack = new cdk.Stack(new cdk.App(), 'TestStack', {
      env: {
        region: 'eu-west-1',
        account: '111111111111',
      },
    });

    stack.node.setContext('@aws-cdk/core:enablePartitionLiterals', 'true');

    const key = new kms.Key(stack, 'GitHubAppKey');

    const apps = new ManagedGitHubApps(stack, 'AppSecrets', {
      defaultAppId: 1234,
      storage: GitHubAppSecretsStorage.PARAMETER_STORE,
      kmsKey: key,
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

    tokenProviderApi.restApi.root.addMethod('GET', new MockIntegration());

    const template = Template.fromStack(stack);

    const roleRef = Object.keys(template.findResources('AWS::IAM::Role')).find(x => x.startsWith('FunctionServiceRole'));
    const keyRef = Object.keys(template.findResources('AWS::KMS::Key'))[0];


    template.hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: Match.exact([
          {
            Action: 'ssm:GetParameter',
            Effect: 'Allow',
            Resource: 'arn:aws:ssm:eu-west-1:111111111111:parameter/catnekaise/github-apps/*',
          },
          {
            Action: 'kms:Decrypt',
            Effect: 'Allow',
            Resource: {
              'Fn::GetAtt': [
                keyRef,
                'Arn',
              ],
            },
          },
        ]),
      },
      Roles: [
        {
          Ref: roleRef,
        },
      ],
    });
  });

});

