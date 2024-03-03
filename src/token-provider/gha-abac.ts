export enum TokenProviderPathPolicyVariable {
  REPOSITORY = 'REPOSITORY',
  REPOSITORY_OWNER = 'REPOSITORY_OWNER',
}

export enum TokenProviderPathStrategyType {
  POLICY_VAR = 'POLICY_VAR',
  ANY_REPOSITORY = 'ANY_REPOSITORY',
  OWNER = 'OWNER',
  REPOSITORIES = 'REPOSITORIES',
}

interface PathStrategySettings {
  readonly type: TokenProviderPathStrategyType;
  readonly repositories?: string[];
  readonly owner?: string;
  readonly policyVar?: TokenProviderPathPolicyVariable;
}

export class TokenProviderPathStrategy {

  /**
   * Grants permission to `/x/<provider-name>/${aws:PrincipalTag/repository}`
   */
  static policyVarRepository(): TokenProviderPathStrategy {
    return new TokenProviderPathStrategy({
      type: TokenProviderPathStrategyType.POLICY_VAR,
      policyVar: TokenProviderPathPolicyVariable.REPOSITORY,
    });
  }

  /**
   * Grants permission to `/x/<provider-name>/${aws:PrincipalTag/repository_owner}` or `/x/<provider-name>/${aws:PrincipalTag/repository_owner}/<repo>`
   */
  static policyVarRepositoryOwner(...repositories: string[]): TokenProviderPathStrategy {
    return new TokenProviderPathStrategy({
      type: TokenProviderPathStrategyType.POLICY_VAR,
      policyVar: TokenProviderPathPolicyVariable.REPOSITORY_OWNER,
      repositories,
    });
  }

  /**
   * Grants permission to `/x/<provider-name>/*`
   */
  static anyRepository(): TokenProviderPathStrategy {
    return new TokenProviderPathStrategy({ type: TokenProviderPathStrategyType.ANY_REPOSITORY });
  }

  /**
   * Grants permission for each specified repo `/x/<provider-name>/<owner>/<repo>`
   */
  static selectRepositories(owner: string, ...repositories: string[]): TokenProviderPathStrategy {

    if (repositories.length === 0) {
      throw new Error('At least one repository has to be specified');
    }

    return new TokenProviderPathStrategy({
      type: TokenProviderPathStrategyType.REPOSITORIES,
      owner,
      repositories,
    });
  }

  /**
   * Grants permission to `/x/<provider-name>/<owner>`
   */
  static selectOwner(owner: string): TokenProviderPathStrategy {
    return new TokenProviderPathStrategy({
      type: TokenProviderPathStrategyType.OWNER,
      owner,
    });
  }

  private constructor(private readonly settings: PathStrategySettings) {
  }

  get type(): TokenProviderPathStrategyType {
    return this.settings.type;
  }

  get owner(): string | undefined {
    return this.settings.owner;
  }

  get repositories(): string[] {
    return this.settings.repositories ?? [];
  }

  get policyVar(): TokenProviderPathPolicyVariable | undefined {
    return this.settings.policyVar;
  }

  get pathTargetsRepositories(): boolean {

    switch (this.type) {
      case TokenProviderPathStrategyType.POLICY_VAR:
        if (this.settings.policyVar === TokenProviderPathPolicyVariable.REPOSITORY) {
          return true;
        } else if (this.settings.policyVar === TokenProviderPathPolicyVariable.REPOSITORY_OWNER) {
          return this.repositories.length > 0;
        }

        throw new Error('Configure a valid policy var');
      case TokenProviderPathStrategyType.ANY_REPOSITORY:
        return false;
      case TokenProviderPathStrategyType.OWNER:
        return false;

      case TokenProviderPathStrategyType.REPOSITORIES:
        return true;
    }
  }
}
