export enum RepositorySelectionMode {
  /**
   * Allows targeting of any individual or multiple repos, but NOT the organization
   */
  AT_LEAST_ONE = 'AT_LEAST_ONE',

  /**
   * Allows targeting of any individual or multiple repos and the organization/user
   */
  ALLOW_OWNER = 'ALLOW_OWNER',
}

export interface TargetRuleSettings {
  readonly mode: RepositorySelectionMode;
}

export class TokenProviderTargetRule {

  static atLeastOne(): TokenProviderTargetRule {
    return new TokenProviderTargetRule({
      mode: RepositorySelectionMode.AT_LEAST_ONE,
    });
  }

  static allowOwner(): TokenProviderTargetRule {
    return new TokenProviderTargetRule({
      mode: RepositorySelectionMode.ALLOW_OWNER,
    });
  }

  get repositorySelectionMode(): RepositorySelectionMode {
    return this.settings.mode;
  }

  private constructor(private readonly settings: TargetRuleSettings) {
  }
}

