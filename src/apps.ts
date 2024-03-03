import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

export enum GitHubAppSecretsStorage {
  PARAMETER_STORE = 'PARAMETER_STORE',
  SECRETS_MANAGER = 'SECRETS_MANAGER'
}

export class GitHubApp {

  static create(name: string, appId: number): GitHubApp {

    return new GitHubApp(name, appId);
  }

  private constructor(public readonly name: string, public readonly appId: number) {
  }
}


export interface IGitHubApps {
  get secretsPrefix(): string;

  get secretsStorage(): GitHubAppSecretsStorage;

  grantAccess(principal: iam.IPrincipal): iam.Grant | undefined;

  getAppIdForAppName(name?: string): number;

}

const DEFAULT_SECRETS_PREFIX = '/catnekaise/github-apps' as const;


export interface GitHubAppsProps {
  readonly storage: GitHubAppSecretsStorage;
  readonly defaultAppId: number;
  /**
   * @default /catnekaise/github-apps
   */
  readonly prefix?: string;
  readonly additionalApps?: GitHubApp[];

}

export abstract class BaseGitHubApps extends Construct implements IGitHubApps {
  protected constructor(scope: Construct, id: string, private readonly baseProps: GitHubAppsProps) {
    super(scope, id);

  }

  get secretsPrefix(): string {
    return this.baseProps.prefix ?? DEFAULT_SECRETS_PREFIX;
  }

  abstract grantAccess(principal: iam.IPrincipal): iam.Grant | undefined;

  get secretsStorage(): GitHubAppSecretsStorage {
    return this.baseProps.storage;
  }

  getAppIdForAppName(name?: string | undefined): number {

    if (!name || name === 'default') {
      return this.baseProps.defaultAppId;
    }

    const app = this.baseProps.additionalApps?.find(x => x.name === name);

    if (!app) {
      throw new Error(`No app with name ${name} added as an additional app`);
    }
    return app.appId;
  }
}


export interface ManagedGitHubAppsProps extends GitHubAppsProps {
  /**
   * @default AWS_MANAGED
   */
  readonly kmsKey?: kms.IKey;
  readonly removalPolicy?: RemovalPolicy;
}

export class ManagedGitHubApps extends BaseGitHubApps implements IGitHubApps {
  constructor(scope: Construct, id: string, private readonly props: ManagedGitHubAppsProps) {
    super(scope, id, props);

    const appNames: string[] = ['default', ...(props.additionalApps ?? []).map(x => x.name)];

    const secretPrefixId = this.secretsPrefix.substring(1).split('/')
      .map(x => x.split('-').map(y => y[0].toUpperCase() + y.substring(1)).join('')).join('');

    for (const appName of appNames) {

      const appNameId = appName.split('-').map(y => y[0].toUpperCase() + y.substring(1)).join('');
      const name = `${this.secretsPrefix}/${appName}`;

      if (props.storage === GitHubAppSecretsStorage.PARAMETER_STORE) {

        new InitializedParameter(this, `${secretPrefixId}${appNameId}`, name, props.kmsKey, props.removalPolicy);
      } else if (props.storage === GitHubAppSecretsStorage.SECRETS_MANAGER) {

        new secretsmanager.Secret(this, `${secretPrefixId}${appNameId}`, {
          secretName: name,
          encryptionKey: props.kmsKey,
          removalPolicy: props.removalPolicy,
        });
      }
    }
  }

  grantAccess(principal: iam.IPrincipal): iam.Grant | undefined {

    const region = Stack.of(this).region;
    const account = Stack.of(this).account;
    const storagePrefix = this.secretsPrefix;
    let grant: iam.Grant;

    if (this.secretsStorage === GitHubAppSecretsStorage.PARAMETER_STORE) {
      grant = iam.Grant.addToPrincipal({
        grantee: principal,
        actions: [
          'ssm:GetParameter',
        ],
        resourceArns: [
          `arn:aws:ssm:${region}:${account}:parameter${storagePrefix}/*`,
        ],
      });
    } else if (this.secretsStorage === GitHubAppSecretsStorage.SECRETS_MANAGER) {
      grant = iam.Grant.addToPrincipal({
        grantee: principal,
        actions: [
          'secretsmanager:GetSecretValue',
        ],
        resourceArns: [
          `arn:aws:secretsmanager:${region}:${account}:secret:${storagePrefix}/*`,
        ],
      });
    } else {
      throw new Error('Error');
    }


    if (this.props.kmsKey) {
      grant = grant.combine(this.props.kmsKey.grantDecrypt(principal));
    }

    return grant;
  }
}

export class SelfManagedGitHubApps extends BaseGitHubApps implements IGitHubApps {
  constructor(scope: Construct, id: string, props: GitHubAppsProps) {
    super(scope, id, props);
  }

  // @ts-ignore
  grantAccess(principal: iam.IPrincipal): iam.Grant | undefined {
    return undefined;
  }

}

class InitializedParameter extends AwsCustomResource {
  constructor(scope: Construct, name: string, parameterName: string, kmsKey?: kms.IKey, removalPolicy?: RemovalPolicy) {

    const region = Stack.of(scope).region;
    const account = Stack.of(scope).account;

    const policies: iam.PolicyStatement[] = [
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['ssm:PutParameter', 'ssm:DeleteParameter', 'ssm:GetParameter'],
        resources: [`arn:aws:ssm:${region}:${account}:parameter${parameterName}`],
      }),
    ];

    if (kmsKey) {
      policies.push(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['kms:Encrypt', 'kms:DescribeKey'],
        resources: [kmsKey.keyArn],
      }));
    }

    const shouldNotDelete = removalPolicy === RemovalPolicy.RETAIN;

    super(scope, name, {
      onCreate: {
        service: 'SSM',
        action: 'putParameter',
        parameters: {
          Name: parameterName,
          Value: 'placeholder',
          Type: 'SecureString',
          KeyId: kmsKey ? kmsKey.keyId : undefined,
        },
        region,

        physicalResourceId: PhysicalResourceId.of(parameterName),
      },
      onUpdate: undefined,
      onDelete: shouldNotDelete ? undefined : {
        service: 'SSM',
        action: 'deleteParameter',
        parameters: {
          Name: parameterName,
        },
        region,

        physicalResourceId: PhysicalResourceId.of(parameterName),
      },
      policy: AwsCustomResourcePolicy.fromStatements(policies),
    });
  }
}
