import * as path from 'node:path';
import * as lambda from 'aws-cdk-lib/aws-lambda';

/**
 * Only applicable to TokenProviderLambdaCodeOptions.
 * Ensure that the lambda function architecture matches.
 */
export class ApplicationArchitecture {

  static readonly X86_64 = new ApplicationArchitecture('x86_64');
  static readonly ARM_64 = new ApplicationArchitecture('arm64');

  private constructor(public readonly name: string) {
  }
}

/**
 * Use this to build a supported the TokenProvider lambda application when the source is located in a public repository.
 */
export interface TokenProviderLambdaCodeOptions {

  /**
   * Repository Url
   * Example: https://github.com/catnekaise/example-fork.git
   */
  readonly repository?: string;

  /**
   * Value for `git checkout` after cloning the repository
   * Example: main, origin/feature1, SHA
   */
  readonly checkout?: string;

  /**
   * Should be equal to the architecture configured for the lambda function. This value is used to build the application in the specified architecture.
   */
  readonly architecture?: ApplicationArchitecture;

  /**
   * Value for docker platform
   * Example: linux/amd64
   */
  readonly platform?: string;
}

export abstract class TokenProviderLambdaCode {

  static defaultGo(options?: TokenProviderLambdaCodeOptions): lambda.Code {

    const architecture = options?.architecture ?? lambda.Architecture.X86_64;

    return lambda.Code.fromDockerBuild(path.join(__dirname, '../../lambda/default'), {
      platform: options?.platform,
      buildArgs: {
        ARCH: architecture.name === 'arm64' ? 'arm64' : 'amd64',
        ...this.repoBuildArgs(options?.repository, options?.checkout),
      },
    });
  }

  static dotnet(options?: TokenProviderLambdaCodeOptions): lambda.Code {

    const architecture = options?.architecture ?? lambda.Architecture.X86_64;

    return lambda.Code.fromDockerBuild(path.join(__dirname, '../../lambda/dotnet'), {
      platform: options?.platform,
      buildArgs: {
        IMAGE_TAG: `latest-${architecture.name}`,
        ARCH: architecture.name === 'arm64' ? 'linux-arm64' : 'linux-x64',
        ...this.repoBuildArgs(options?.repository, options?.checkout),
      },
    });
  }

  private static repoBuildArgs(repo?: string, checkout?: string): { [key: string]: string } {

    const args: { [key: string]: string } = {};

    if (repo) {
      args.GIT_REPO = repo;
    }

    if (checkout) {
      args.GIT_CHECKOUT = checkout;
    }

    return args;
  }
}
