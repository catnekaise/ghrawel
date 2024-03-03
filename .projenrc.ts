import { awscdk } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Daniel Jonsén',
  authorAddress: 'djonser1@gmail.com',
  cdkVersion: '2.82.0',
  projenVersion: '^0.80.0',
  defaultReleaseBranch: 'main',
  description: 'Use ghrawel to deploy an AWS API Gateway RestAPI capable of returning GitHub App installation access tokens and use AWS IAM to control access to this API.',
  jsiiVersion: '~5.3.0',
  name: '@catnekaise/ghrawel',
  projenrcTs: true,
  license: 'Apache-2.0',
  repositoryUrl: 'https://github.com/catnekaise/ghrawel.git',
  buildWorkflow: true,
  pullRequestTemplate: false,
  releaseToNpm: true,
  npmProvenance: true,
  npmAccess: NpmAccess.PUBLIC,
  release: true,
  depsUpgrade: false,
  gitignore: ['.idea'],
  githubOptions: {
    pullRequestLint: true,
    mergify: false,
  },
  publishToNuget: {
    dotNetNamespace: 'Catnekaise.CDK.Ghrawel',
    packageId: 'Catnekaise.CDK.Ghrawel',
  },
  publishToPypi: {
    distName: 'catnekaise.ghrawel',
    module: 'catnekaise_ghrawel',
  },
  keywords: [
    'github',
    'github-actions',
    'aws-iam',
    'github-app',
    'api-gateway',
  ],
});

project.addDevDeps('@catnekaise/cdk-iam-utilities@^0.0.13');
project.addPeerDeps('@catnekaise/cdk-iam-utilities@^0.0.13');

project.synth();
