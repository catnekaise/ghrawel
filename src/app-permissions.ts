export enum PermissionLevel {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
}

export interface GitHubAppPermissions {
  readonly actions?: PermissionLevel;
  readonly administration?: PermissionLevel;
  readonly checks?: PermissionLevel;
  readonly codespaces?: PermissionLevel;
  readonly contents?: PermissionLevel;
  readonly dependabotSecrets?: PermissionLevel;
  readonly deployments?: PermissionLevel;
  readonly environments?: PermissionLevel;
  readonly issues?: PermissionLevel;
  readonly metadata?: PermissionLevel;
  readonly packages?: PermissionLevel;
  readonly pages?: PermissionLevel;
  readonly pullRequests?: PermissionLevel;
  readonly repositoryCustomProperties?: PermissionLevel;
  readonly repositoryHooks?: PermissionLevel;
  readonly repositoryProjects?: PermissionLevel;
  readonly secretScanningAlerts?: PermissionLevel;
  readonly secrets?: PermissionLevel;
  readonly securityEvents?: PermissionLevel;
  readonly singleFile?: PermissionLevel;
  readonly statuses?: PermissionLevel;
  readonly vulnerabilityAlerts?: PermissionLevel;
  readonly workflows?: PermissionLevel;
  readonly members?: PermissionLevel;
  readonly organizationAdministration?: PermissionLevel;
  readonly organizationCustomRoles?: PermissionLevel;
  readonly organizationCustomOrgRoles?: PermissionLevel;
  readonly organizationCustomProperties?: PermissionLevel;
  readonly organizationCopilotSeatManagement?: PermissionLevel;
  readonly organizationAnnouncementBanners?: PermissionLevel;
  readonly organizationEvents?: PermissionLevel;
  readonly organizationHooks?: PermissionLevel;
  readonly organizationPersonalAccessTokens?: PermissionLevel;
  readonly organizationPersonalAccessTokenRequests?: PermissionLevel;
  readonly organizationPlan?: PermissionLevel;
  readonly organizationProjects?: PermissionLevel;
  readonly organizationPackages?: PermissionLevel;
  readonly organizationSecrets?: PermissionLevel;
  readonly organizationSelfHostedRunners?: PermissionLevel;
  readonly organizationUserBlocking?: PermissionLevel;
  readonly teamDiscussions?: PermissionLevel;
  readonly emailAddresses?: PermissionLevel;
  readonly followers?: PermissionLevel;
  readonly gitSshKeys?: PermissionLevel;
  readonly gpgKeys?: PermissionLevel;
  readonly interactionLimits?: PermissionLevel;
  readonly profile?: PermissionLevel;
  readonly starring?: PermissionLevel;

}

