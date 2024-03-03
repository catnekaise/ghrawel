# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### BaseGitHubApps <a name="BaseGitHubApps" id="@catnekaise/ghrawel.BaseGitHubApps"></a>

- *Implements:* <a href="#@catnekaise/ghrawel.IGitHubApps">IGitHubApps</a>

#### Initializers <a name="Initializers" id="@catnekaise/ghrawel.BaseGitHubApps.Initializer"></a>

```typescript
import { BaseGitHubApps } from '@catnekaise/ghrawel'

new BaseGitHubApps(scope: Construct, id: string, baseProps: GitHubAppsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.Initializer.parameter.baseProps">baseProps</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppsProps">GitHubAppsProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@catnekaise/ghrawel.BaseGitHubApps.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@catnekaise/ghrawel.BaseGitHubApps.Initializer.parameter.id"></a>

- *Type:* string

---

##### `baseProps`<sup>Required</sup> <a name="baseProps" id="@catnekaise/ghrawel.BaseGitHubApps.Initializer.parameter.baseProps"></a>

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppsProps">GitHubAppsProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.getAppIdForAppName">getAppIdForAppName</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.grantAccess">grantAccess</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@catnekaise/ghrawel.BaseGitHubApps.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `getAppIdForAppName` <a name="getAppIdForAppName" id="@catnekaise/ghrawel.BaseGitHubApps.getAppIdForAppName"></a>

```typescript
public getAppIdForAppName(name?: string): number
```

###### `name`<sup>Optional</sup> <a name="name" id="@catnekaise/ghrawel.BaseGitHubApps.getAppIdForAppName.parameter.name"></a>

- *Type:* string

---

##### `grantAccess` <a name="grantAccess" id="@catnekaise/ghrawel.BaseGitHubApps.grantAccess"></a>

```typescript
public grantAccess(principal: IPrincipal): Grant
```

###### `principal`<sup>Required</sup> <a name="principal" id="@catnekaise/ghrawel.BaseGitHubApps.grantAccess.parameter.principal"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@catnekaise/ghrawel.BaseGitHubApps.isConstruct"></a>

```typescript
import { BaseGitHubApps } from '@catnekaise/ghrawel'

BaseGitHubApps.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@catnekaise/ghrawel.BaseGitHubApps.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.property.secretsPrefix">secretsPrefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.BaseGitHubApps.property.secretsStorage">secretsStorage</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@catnekaise/ghrawel.BaseGitHubApps.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `secretsPrefix`<sup>Required</sup> <a name="secretsPrefix" id="@catnekaise/ghrawel.BaseGitHubApps.property.secretsPrefix"></a>

```typescript
public readonly secretsPrefix: string;
```

- *Type:* string

---

##### `secretsStorage`<sup>Required</sup> <a name="secretsStorage" id="@catnekaise/ghrawel.BaseGitHubApps.property.secretsStorage"></a>

```typescript
public readonly secretsStorage: GitHubAppSecretsStorage;
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a>

---


### ManagedGitHubApps <a name="ManagedGitHubApps" id="@catnekaise/ghrawel.ManagedGitHubApps"></a>

- *Implements:* <a href="#@catnekaise/ghrawel.IGitHubApps">IGitHubApps</a>

#### Initializers <a name="Initializers" id="@catnekaise/ghrawel.ManagedGitHubApps.Initializer"></a>

```typescript
import { ManagedGitHubApps } from '@catnekaise/ghrawel'

new ManagedGitHubApps(scope: Construct, id: string, props: ManagedGitHubAppsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.Initializer.parameter.props">props</a></code> | <code><a href="#@catnekaise/ghrawel.ManagedGitHubAppsProps">ManagedGitHubAppsProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@catnekaise/ghrawel.ManagedGitHubApps.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@catnekaise/ghrawel.ManagedGitHubApps.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@catnekaise/ghrawel.ManagedGitHubApps.Initializer.parameter.props"></a>

- *Type:* <a href="#@catnekaise/ghrawel.ManagedGitHubAppsProps">ManagedGitHubAppsProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.getAppIdForAppName">getAppIdForAppName</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.grantAccess">grantAccess</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@catnekaise/ghrawel.ManagedGitHubApps.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `getAppIdForAppName` <a name="getAppIdForAppName" id="@catnekaise/ghrawel.ManagedGitHubApps.getAppIdForAppName"></a>

```typescript
public getAppIdForAppName(name?: string): number
```

###### `name`<sup>Optional</sup> <a name="name" id="@catnekaise/ghrawel.ManagedGitHubApps.getAppIdForAppName.parameter.name"></a>

- *Type:* string

---

##### `grantAccess` <a name="grantAccess" id="@catnekaise/ghrawel.ManagedGitHubApps.grantAccess"></a>

```typescript
public grantAccess(principal: IPrincipal): Grant
```

###### `principal`<sup>Required</sup> <a name="principal" id="@catnekaise/ghrawel.ManagedGitHubApps.grantAccess.parameter.principal"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@catnekaise/ghrawel.ManagedGitHubApps.isConstruct"></a>

```typescript
import { ManagedGitHubApps } from '@catnekaise/ghrawel'

ManagedGitHubApps.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@catnekaise/ghrawel.ManagedGitHubApps.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.property.secretsPrefix">secretsPrefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubApps.property.secretsStorage">secretsStorage</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@catnekaise/ghrawel.ManagedGitHubApps.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `secretsPrefix`<sup>Required</sup> <a name="secretsPrefix" id="@catnekaise/ghrawel.ManagedGitHubApps.property.secretsPrefix"></a>

```typescript
public readonly secretsPrefix: string;
```

- *Type:* string

---

##### `secretsStorage`<sup>Required</sup> <a name="secretsStorage" id="@catnekaise/ghrawel.ManagedGitHubApps.property.secretsStorage"></a>

```typescript
public readonly secretsStorage: GitHubAppSecretsStorage;
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a>

---


### SelfManagedGitHubApps <a name="SelfManagedGitHubApps" id="@catnekaise/ghrawel.SelfManagedGitHubApps"></a>

- *Implements:* <a href="#@catnekaise/ghrawel.IGitHubApps">IGitHubApps</a>

#### Initializers <a name="Initializers" id="@catnekaise/ghrawel.SelfManagedGitHubApps.Initializer"></a>

```typescript
import { SelfManagedGitHubApps } from '@catnekaise/ghrawel'

new SelfManagedGitHubApps(scope: Construct, id: string, props: GitHubAppsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.Initializer.parameter.props">props</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppsProps">GitHubAppsProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@catnekaise/ghrawel.SelfManagedGitHubApps.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@catnekaise/ghrawel.SelfManagedGitHubApps.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@catnekaise/ghrawel.SelfManagedGitHubApps.Initializer.parameter.props"></a>

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppsProps">GitHubAppsProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.getAppIdForAppName">getAppIdForAppName</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.grantAccess">grantAccess</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@catnekaise/ghrawel.SelfManagedGitHubApps.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `getAppIdForAppName` <a name="getAppIdForAppName" id="@catnekaise/ghrawel.SelfManagedGitHubApps.getAppIdForAppName"></a>

```typescript
public getAppIdForAppName(name?: string): number
```

###### `name`<sup>Optional</sup> <a name="name" id="@catnekaise/ghrawel.SelfManagedGitHubApps.getAppIdForAppName.parameter.name"></a>

- *Type:* string

---

##### `grantAccess` <a name="grantAccess" id="@catnekaise/ghrawel.SelfManagedGitHubApps.grantAccess"></a>

```typescript
public grantAccess(principal: IPrincipal): Grant
```

###### `principal`<sup>Required</sup> <a name="principal" id="@catnekaise/ghrawel.SelfManagedGitHubApps.grantAccess.parameter.principal"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@catnekaise/ghrawel.SelfManagedGitHubApps.isConstruct"></a>

```typescript
import { SelfManagedGitHubApps } from '@catnekaise/ghrawel'

SelfManagedGitHubApps.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@catnekaise/ghrawel.SelfManagedGitHubApps.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.property.secretsPrefix">secretsPrefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.SelfManagedGitHubApps.property.secretsStorage">secretsStorage</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a></code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@catnekaise/ghrawel.SelfManagedGitHubApps.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `secretsPrefix`<sup>Required</sup> <a name="secretsPrefix" id="@catnekaise/ghrawel.SelfManagedGitHubApps.property.secretsPrefix"></a>

```typescript
public readonly secretsPrefix: string;
```

- *Type:* string

---

##### `secretsStorage`<sup>Required</sup> <a name="secretsStorage" id="@catnekaise/ghrawel.SelfManagedGitHubApps.property.secretsStorage"></a>

```typescript
public readonly secretsStorage: GitHubAppSecretsStorage;
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a>

---


### TokenProvider <a name="TokenProvider" id="@catnekaise/ghrawel.TokenProvider"></a>

- *Implements:* <a href="#@catnekaise/ghrawel.ITokenProvider">ITokenProvider</a>

This construct may receive some changes before constructor is made public.

Until then use static create method.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.grantExecute">grantExecute</a></code> | Use this to grant access to the token provider. |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.grantExecuteGitHubActionsAbac">grantExecuteGitHubActionsAbac</a></code> | use this to grant access to the token provider when the role is assumed via Cognito Identity. |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.metric">metric</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.metricCacheHitCount">metricCacheHitCount</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.metricCacheMissCount">metricCacheMissCount</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.metricClientError">metricClientError</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.metricCount">metricCount</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.metricServerError">metricServerError</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@catnekaise/ghrawel.TokenProvider.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `grantExecute` <a name="grantExecute" id="@catnekaise/ghrawel.TokenProvider.grantExecute"></a>

```typescript
public grantExecute(role: IRole, repo: string, owner?: string): Grant
```

Use this to grant access to the token provider.

###### `role`<sup>Required</sup> <a name="role" id="@catnekaise/ghrawel.TokenProvider.grantExecute.parameter.role"></a>

- *Type:* aws-cdk-lib.aws_iam.IRole

---

###### `repo`<sup>Required</sup> <a name="repo" id="@catnekaise/ghrawel.TokenProvider.grantExecute.parameter.repo"></a>

- *Type:* string

---

###### `owner`<sup>Optional</sup> <a name="owner" id="@catnekaise/ghrawel.TokenProvider.grantExecute.parameter.owner"></a>

- *Type:* string

---

##### `grantExecuteGitHubActionsAbac` <a name="grantExecuteGitHubActionsAbac" id="@catnekaise/ghrawel.TokenProvider.grantExecuteGitHubActionsAbac"></a>

```typescript
public grantExecuteGitHubActionsAbac(role: IRole, settings: TokenProviderActionsIdentitySettings): Grant
```

use this to grant access to the token provider when the role is assumed via Cognito Identity.

###### `role`<sup>Required</sup> <a name="role" id="@catnekaise/ghrawel.TokenProvider.grantExecuteGitHubActionsAbac.parameter.role"></a>

- *Type:* aws-cdk-lib.aws_iam.IRole

---

###### `settings`<sup>Required</sup> <a name="settings" id="@catnekaise/ghrawel.TokenProvider.grantExecuteGitHubActionsAbac.parameter.settings"></a>

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderActionsIdentitySettings">TokenProviderActionsIdentitySettings</a>

---

##### `metric` <a name="metric" id="@catnekaise/ghrawel.TokenProvider.metric"></a>

```typescript
public metric(metricName: string, stage: IStage, props?: MetricOptions): Metric
```

###### `metricName`<sup>Required</sup> <a name="metricName" id="@catnekaise/ghrawel.TokenProvider.metric.parameter.metricName"></a>

- *Type:* string

---

###### `stage`<sup>Required</sup> <a name="stage" id="@catnekaise/ghrawel.TokenProvider.metric.parameter.stage"></a>

- *Type:* aws-cdk-lib.aws_apigateway.IStage

---

###### `props`<sup>Optional</sup> <a name="props" id="@catnekaise/ghrawel.TokenProvider.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricCacheHitCount` <a name="metricCacheHitCount" id="@catnekaise/ghrawel.TokenProvider.metricCacheHitCount"></a>

```typescript
public metricCacheHitCount(stage: IStage, props?: MetricOptions): Metric
```

###### `stage`<sup>Required</sup> <a name="stage" id="@catnekaise/ghrawel.TokenProvider.metricCacheHitCount.parameter.stage"></a>

- *Type:* aws-cdk-lib.aws_apigateway.IStage

---

###### `props`<sup>Optional</sup> <a name="props" id="@catnekaise/ghrawel.TokenProvider.metricCacheHitCount.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricCacheMissCount` <a name="metricCacheMissCount" id="@catnekaise/ghrawel.TokenProvider.metricCacheMissCount"></a>

```typescript
public metricCacheMissCount(stage: IStage, props?: MetricOptions): Metric
```

###### `stage`<sup>Required</sup> <a name="stage" id="@catnekaise/ghrawel.TokenProvider.metricCacheMissCount.parameter.stage"></a>

- *Type:* aws-cdk-lib.aws_apigateway.IStage

---

###### `props`<sup>Optional</sup> <a name="props" id="@catnekaise/ghrawel.TokenProvider.metricCacheMissCount.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricClientError` <a name="metricClientError" id="@catnekaise/ghrawel.TokenProvider.metricClientError"></a>

```typescript
public metricClientError(stage: IStage, props?: MetricOptions): Metric
```

###### `stage`<sup>Required</sup> <a name="stage" id="@catnekaise/ghrawel.TokenProvider.metricClientError.parameter.stage"></a>

- *Type:* aws-cdk-lib.aws_apigateway.IStage

---

###### `props`<sup>Optional</sup> <a name="props" id="@catnekaise/ghrawel.TokenProvider.metricClientError.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricCount` <a name="metricCount" id="@catnekaise/ghrawel.TokenProvider.metricCount"></a>

```typescript
public metricCount(stage: IStage, props?: MetricOptions): Metric
```

###### `stage`<sup>Required</sup> <a name="stage" id="@catnekaise/ghrawel.TokenProvider.metricCount.parameter.stage"></a>

- *Type:* aws-cdk-lib.aws_apigateway.IStage

---

###### `props`<sup>Optional</sup> <a name="props" id="@catnekaise/ghrawel.TokenProvider.metricCount.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricServerError` <a name="metricServerError" id="@catnekaise/ghrawel.TokenProvider.metricServerError"></a>

```typescript
public metricServerError(stage: IStage, props?: MetricOptions): Metric
```

###### `stage`<sup>Required</sup> <a name="stage" id="@catnekaise/ghrawel.TokenProvider.metricServerError.parameter.stage"></a>

- *Type:* aws-cdk-lib.aws_apigateway.IStage

---

###### `props`<sup>Optional</sup> <a name="props" id="@catnekaise/ghrawel.TokenProvider.metricServerError.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.create">create</a></code> | *No description.* |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@catnekaise/ghrawel.TokenProvider.isConstruct"></a>

```typescript
import { TokenProvider } from '@catnekaise/ghrawel'

TokenProvider.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@catnekaise/ghrawel.TokenProvider.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `create` <a name="create" id="@catnekaise/ghrawel.TokenProvider.create"></a>

```typescript
import { TokenProvider } from '@catnekaise/ghrawel'

TokenProvider.create(scope: Construct, id: string, settings: TokenProviderSettings)
```

###### `scope`<sup>Required</sup> <a name="scope" id="@catnekaise/ghrawel.TokenProvider.create.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@catnekaise/ghrawel.TokenProvider.create.parameter.id"></a>

- *Type:* string

---

###### `settings`<sup>Required</sup> <a name="settings" id="@catnekaise/ghrawel.TokenProvider.create.parameter.settings"></a>

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderSettings">TokenProviderSettings</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.property.httpMethod">httpMethod</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.property.methodArn">methodArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProvider.property.methodId">methodId</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@catnekaise/ghrawel.TokenProvider.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `httpMethod`<sup>Required</sup> <a name="httpMethod" id="@catnekaise/ghrawel.TokenProvider.property.httpMethod"></a>

```typescript
public readonly httpMethod: string;
```

- *Type:* string

---

##### `methodArn`<sup>Required</sup> <a name="methodArn" id="@catnekaise/ghrawel.TokenProvider.property.methodArn"></a>

```typescript
public readonly methodArn: string;
```

- *Type:* string

---

##### `methodId`<sup>Required</sup> <a name="methodId" id="@catnekaise/ghrawel.TokenProvider.property.methodId"></a>

```typescript
public readonly methodId: string;
```

- *Type:* string

---


### TokenProviderApi <a name="TokenProviderApi" id="@catnekaise/ghrawel.TokenProviderApi"></a>

- *Implements:* <a href="#@catnekaise/ghrawel.ITokenProviderApi">ITokenProviderApi</a>

#### Initializers <a name="Initializers" id="@catnekaise/ghrawel.TokenProviderApi.Initializer"></a>

```typescript
import { TokenProviderApi } from '@catnekaise/ghrawel'

new TokenProviderApi(scope: Construct, id: string, props: TokenProviderApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApi.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApi.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApi.Initializer.parameter.props">props</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderApiProps">TokenProviderApiProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@catnekaise/ghrawel.TokenProviderApi.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@catnekaise/ghrawel.TokenProviderApi.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@catnekaise/ghrawel.TokenProviderApi.Initializer.parameter.props"></a>

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderApiProps">TokenProviderApiProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApi.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApi.newTokenProvider">newTokenProvider</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@catnekaise/ghrawel.TokenProviderApi.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `newTokenProvider` <a name="newTokenProvider" id="@catnekaise/ghrawel.TokenProviderApi.newTokenProvider"></a>

```typescript
public newTokenProvider(name: string, configuration: NewTokenProviderConfiguration): ITokenProvider
```

###### `name`<sup>Required</sup> <a name="name" id="@catnekaise/ghrawel.TokenProviderApi.newTokenProvider.parameter.name"></a>

- *Type:* string

---

###### `configuration`<sup>Required</sup> <a name="configuration" id="@catnekaise/ghrawel.TokenProviderApi.newTokenProvider.parameter.configuration"></a>

- *Type:* <a href="#@catnekaise/ghrawel.NewTokenProviderConfiguration">NewTokenProviderConfiguration</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApi.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@catnekaise/ghrawel.TokenProviderApi.isConstruct"></a>

```typescript
import { TokenProviderApi } from '@catnekaise/ghrawel'

TokenProviderApi.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@catnekaise/ghrawel.TokenProviderApi.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApi.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApi.property.lambdaFunction">lambdaFunction</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApi.property.restApi">restApi</a></code> | <code>aws-cdk-lib.aws_apigateway.RestApi</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@catnekaise/ghrawel.TokenProviderApi.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `lambdaFunction`<sup>Required</sup> <a name="lambdaFunction" id="@catnekaise/ghrawel.TokenProviderApi.property.lambdaFunction"></a>

```typescript
public readonly lambdaFunction: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---

##### `restApi`<sup>Required</sup> <a name="restApi" id="@catnekaise/ghrawel.TokenProviderApi.property.restApi"></a>

```typescript
public readonly restApi: RestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.RestApi

---


## Structs <a name="Structs" id="Structs"></a>

### GitHubAppPermissions <a name="GitHubAppPermissions" id="@catnekaise/ghrawel.GitHubAppPermissions"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.GitHubAppPermissions.Initializer"></a>

```typescript
import { GitHubAppPermissions } from '@catnekaise/ghrawel'

const gitHubAppPermissions: GitHubAppPermissions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.actions">actions</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.administration">administration</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.checks">checks</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.codespaces">codespaces</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.contents">contents</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.dependabotSecrets">dependabotSecrets</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.deployments">deployments</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.emailAddresses">emailAddresses</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.environments">environments</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.followers">followers</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.gitSshKeys">gitSshKeys</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.gpgKeys">gpgKeys</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.interactionLimits">interactionLimits</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.issues">issues</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.members">members</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.metadata">metadata</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationAdministration">organizationAdministration</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationAnnouncementBanners">organizationAnnouncementBanners</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationCopilotSeatManagement">organizationCopilotSeatManagement</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationCustomOrgRoles">organizationCustomOrgRoles</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationCustomProperties">organizationCustomProperties</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationCustomRoles">organizationCustomRoles</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationEvents">organizationEvents</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationHooks">organizationHooks</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationPackages">organizationPackages</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationPersonalAccessTokenRequests">organizationPersonalAccessTokenRequests</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationPersonalAccessTokens">organizationPersonalAccessTokens</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationPlan">organizationPlan</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationProjects">organizationProjects</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationSecrets">organizationSecrets</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationSelfHostedRunners">organizationSelfHostedRunners</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.organizationUserBlocking">organizationUserBlocking</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.packages">packages</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.pages">pages</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.profile">profile</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.pullRequests">pullRequests</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.repositoryCustomProperties">repositoryCustomProperties</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.repositoryHooks">repositoryHooks</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.repositoryProjects">repositoryProjects</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.secrets">secrets</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.secretScanningAlerts">secretScanningAlerts</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.securityEvents">securityEvents</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.singleFile">singleFile</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.starring">starring</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.statuses">statuses</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.teamDiscussions">teamDiscussions</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.vulnerabilityAlerts">vulnerabilityAlerts</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions.property.workflows">workflows</a></code> | <code><a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a></code> | *No description.* |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="@catnekaise/ghrawel.GitHubAppPermissions.property.actions"></a>

```typescript
public readonly actions: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `administration`<sup>Optional</sup> <a name="administration" id="@catnekaise/ghrawel.GitHubAppPermissions.property.administration"></a>

```typescript
public readonly administration: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `checks`<sup>Optional</sup> <a name="checks" id="@catnekaise/ghrawel.GitHubAppPermissions.property.checks"></a>

```typescript
public readonly checks: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `codespaces`<sup>Optional</sup> <a name="codespaces" id="@catnekaise/ghrawel.GitHubAppPermissions.property.codespaces"></a>

```typescript
public readonly codespaces: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `contents`<sup>Optional</sup> <a name="contents" id="@catnekaise/ghrawel.GitHubAppPermissions.property.contents"></a>

```typescript
public readonly contents: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `dependabotSecrets`<sup>Optional</sup> <a name="dependabotSecrets" id="@catnekaise/ghrawel.GitHubAppPermissions.property.dependabotSecrets"></a>

```typescript
public readonly dependabotSecrets: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `deployments`<sup>Optional</sup> <a name="deployments" id="@catnekaise/ghrawel.GitHubAppPermissions.property.deployments"></a>

```typescript
public readonly deployments: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `emailAddresses`<sup>Optional</sup> <a name="emailAddresses" id="@catnekaise/ghrawel.GitHubAppPermissions.property.emailAddresses"></a>

```typescript
public readonly emailAddresses: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `environments`<sup>Optional</sup> <a name="environments" id="@catnekaise/ghrawel.GitHubAppPermissions.property.environments"></a>

```typescript
public readonly environments: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `followers`<sup>Optional</sup> <a name="followers" id="@catnekaise/ghrawel.GitHubAppPermissions.property.followers"></a>

```typescript
public readonly followers: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `gitSshKeys`<sup>Optional</sup> <a name="gitSshKeys" id="@catnekaise/ghrawel.GitHubAppPermissions.property.gitSshKeys"></a>

```typescript
public readonly gitSshKeys: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `gpgKeys`<sup>Optional</sup> <a name="gpgKeys" id="@catnekaise/ghrawel.GitHubAppPermissions.property.gpgKeys"></a>

```typescript
public readonly gpgKeys: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `interactionLimits`<sup>Optional</sup> <a name="interactionLimits" id="@catnekaise/ghrawel.GitHubAppPermissions.property.interactionLimits"></a>

```typescript
public readonly interactionLimits: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `issues`<sup>Optional</sup> <a name="issues" id="@catnekaise/ghrawel.GitHubAppPermissions.property.issues"></a>

```typescript
public readonly issues: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `members`<sup>Optional</sup> <a name="members" id="@catnekaise/ghrawel.GitHubAppPermissions.property.members"></a>

```typescript
public readonly members: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `metadata`<sup>Optional</sup> <a name="metadata" id="@catnekaise/ghrawel.GitHubAppPermissions.property.metadata"></a>

```typescript
public readonly metadata: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationAdministration`<sup>Optional</sup> <a name="organizationAdministration" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationAdministration"></a>

```typescript
public readonly organizationAdministration: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationAnnouncementBanners`<sup>Optional</sup> <a name="organizationAnnouncementBanners" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationAnnouncementBanners"></a>

```typescript
public readonly organizationAnnouncementBanners: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationCopilotSeatManagement`<sup>Optional</sup> <a name="organizationCopilotSeatManagement" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationCopilotSeatManagement"></a>

```typescript
public readonly organizationCopilotSeatManagement: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationCustomOrgRoles`<sup>Optional</sup> <a name="organizationCustomOrgRoles" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationCustomOrgRoles"></a>

```typescript
public readonly organizationCustomOrgRoles: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationCustomProperties`<sup>Optional</sup> <a name="organizationCustomProperties" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationCustomProperties"></a>

```typescript
public readonly organizationCustomProperties: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationCustomRoles`<sup>Optional</sup> <a name="organizationCustomRoles" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationCustomRoles"></a>

```typescript
public readonly organizationCustomRoles: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationEvents`<sup>Optional</sup> <a name="organizationEvents" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationEvents"></a>

```typescript
public readonly organizationEvents: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationHooks`<sup>Optional</sup> <a name="organizationHooks" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationHooks"></a>

```typescript
public readonly organizationHooks: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationPackages`<sup>Optional</sup> <a name="organizationPackages" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationPackages"></a>

```typescript
public readonly organizationPackages: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationPersonalAccessTokenRequests`<sup>Optional</sup> <a name="organizationPersonalAccessTokenRequests" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationPersonalAccessTokenRequests"></a>

```typescript
public readonly organizationPersonalAccessTokenRequests: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationPersonalAccessTokens`<sup>Optional</sup> <a name="organizationPersonalAccessTokens" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationPersonalAccessTokens"></a>

```typescript
public readonly organizationPersonalAccessTokens: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationPlan`<sup>Optional</sup> <a name="organizationPlan" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationPlan"></a>

```typescript
public readonly organizationPlan: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationProjects`<sup>Optional</sup> <a name="organizationProjects" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationProjects"></a>

```typescript
public readonly organizationProjects: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationSecrets`<sup>Optional</sup> <a name="organizationSecrets" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationSecrets"></a>

```typescript
public readonly organizationSecrets: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationSelfHostedRunners`<sup>Optional</sup> <a name="organizationSelfHostedRunners" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationSelfHostedRunners"></a>

```typescript
public readonly organizationSelfHostedRunners: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `organizationUserBlocking`<sup>Optional</sup> <a name="organizationUserBlocking" id="@catnekaise/ghrawel.GitHubAppPermissions.property.organizationUserBlocking"></a>

```typescript
public readonly organizationUserBlocking: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `packages`<sup>Optional</sup> <a name="packages" id="@catnekaise/ghrawel.GitHubAppPermissions.property.packages"></a>

```typescript
public readonly packages: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `pages`<sup>Optional</sup> <a name="pages" id="@catnekaise/ghrawel.GitHubAppPermissions.property.pages"></a>

```typescript
public readonly pages: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `profile`<sup>Optional</sup> <a name="profile" id="@catnekaise/ghrawel.GitHubAppPermissions.property.profile"></a>

```typescript
public readonly profile: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `pullRequests`<sup>Optional</sup> <a name="pullRequests" id="@catnekaise/ghrawel.GitHubAppPermissions.property.pullRequests"></a>

```typescript
public readonly pullRequests: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `repositoryCustomProperties`<sup>Optional</sup> <a name="repositoryCustomProperties" id="@catnekaise/ghrawel.GitHubAppPermissions.property.repositoryCustomProperties"></a>

```typescript
public readonly repositoryCustomProperties: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `repositoryHooks`<sup>Optional</sup> <a name="repositoryHooks" id="@catnekaise/ghrawel.GitHubAppPermissions.property.repositoryHooks"></a>

```typescript
public readonly repositoryHooks: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `repositoryProjects`<sup>Optional</sup> <a name="repositoryProjects" id="@catnekaise/ghrawel.GitHubAppPermissions.property.repositoryProjects"></a>

```typescript
public readonly repositoryProjects: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `secrets`<sup>Optional</sup> <a name="secrets" id="@catnekaise/ghrawel.GitHubAppPermissions.property.secrets"></a>

```typescript
public readonly secrets: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `secretScanningAlerts`<sup>Optional</sup> <a name="secretScanningAlerts" id="@catnekaise/ghrawel.GitHubAppPermissions.property.secretScanningAlerts"></a>

```typescript
public readonly secretScanningAlerts: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `securityEvents`<sup>Optional</sup> <a name="securityEvents" id="@catnekaise/ghrawel.GitHubAppPermissions.property.securityEvents"></a>

```typescript
public readonly securityEvents: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `singleFile`<sup>Optional</sup> <a name="singleFile" id="@catnekaise/ghrawel.GitHubAppPermissions.property.singleFile"></a>

```typescript
public readonly singleFile: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `starring`<sup>Optional</sup> <a name="starring" id="@catnekaise/ghrawel.GitHubAppPermissions.property.starring"></a>

```typescript
public readonly starring: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `statuses`<sup>Optional</sup> <a name="statuses" id="@catnekaise/ghrawel.GitHubAppPermissions.property.statuses"></a>

```typescript
public readonly statuses: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `teamDiscussions`<sup>Optional</sup> <a name="teamDiscussions" id="@catnekaise/ghrawel.GitHubAppPermissions.property.teamDiscussions"></a>

```typescript
public readonly teamDiscussions: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `vulnerabilityAlerts`<sup>Optional</sup> <a name="vulnerabilityAlerts" id="@catnekaise/ghrawel.GitHubAppPermissions.property.vulnerabilityAlerts"></a>

```typescript
public readonly vulnerabilityAlerts: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

##### `workflows`<sup>Optional</sup> <a name="workflows" id="@catnekaise/ghrawel.GitHubAppPermissions.property.workflows"></a>

```typescript
public readonly workflows: PermissionLevel;
```

- *Type:* <a href="#@catnekaise/ghrawel.PermissionLevel">PermissionLevel</a>

---

### GitHubAppsProps <a name="GitHubAppsProps" id="@catnekaise/ghrawel.GitHubAppsProps"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.GitHubAppsProps.Initializer"></a>

```typescript
import { GitHubAppsProps } from '@catnekaise/ghrawel'

const gitHubAppsProps: GitHubAppsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.GitHubAppsProps.property.defaultAppId">defaultAppId</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppsProps.property.storage">storage</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppsProps.property.additionalApps">additionalApps</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubApp">GitHubApp</a>[]</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppsProps.property.prefix">prefix</a></code> | <code>string</code> | *No description.* |

---

##### `defaultAppId`<sup>Required</sup> <a name="defaultAppId" id="@catnekaise/ghrawel.GitHubAppsProps.property.defaultAppId"></a>

```typescript
public readonly defaultAppId: number;
```

- *Type:* number

---

##### `storage`<sup>Required</sup> <a name="storage" id="@catnekaise/ghrawel.GitHubAppsProps.property.storage"></a>

```typescript
public readonly storage: GitHubAppSecretsStorage;
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a>

---

##### `additionalApps`<sup>Optional</sup> <a name="additionalApps" id="@catnekaise/ghrawel.GitHubAppsProps.property.additionalApps"></a>

```typescript
public readonly additionalApps: GitHubApp[];
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubApp">GitHubApp</a>[]

---

##### `prefix`<sup>Optional</sup> <a name="prefix" id="@catnekaise/ghrawel.GitHubAppsProps.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string
- *Default:* /catnekaise/github-apps

---

### ManagedGitHubAppsProps <a name="ManagedGitHubAppsProps" id="@catnekaise/ghrawel.ManagedGitHubAppsProps"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.ManagedGitHubAppsProps.Initializer"></a>

```typescript
import { ManagedGitHubAppsProps } from '@catnekaise/ghrawel'

const managedGitHubAppsProps: ManagedGitHubAppsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubAppsProps.property.defaultAppId">defaultAppId</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubAppsProps.property.storage">storage</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubAppsProps.property.additionalApps">additionalApps</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubApp">GitHubApp</a>[]</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubAppsProps.property.prefix">prefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubAppsProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.ManagedGitHubAppsProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | *No description.* |

---

##### `defaultAppId`<sup>Required</sup> <a name="defaultAppId" id="@catnekaise/ghrawel.ManagedGitHubAppsProps.property.defaultAppId"></a>

```typescript
public readonly defaultAppId: number;
```

- *Type:* number

---

##### `storage`<sup>Required</sup> <a name="storage" id="@catnekaise/ghrawel.ManagedGitHubAppsProps.property.storage"></a>

```typescript
public readonly storage: GitHubAppSecretsStorage;
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a>

---

##### `additionalApps`<sup>Optional</sup> <a name="additionalApps" id="@catnekaise/ghrawel.ManagedGitHubAppsProps.property.additionalApps"></a>

```typescript
public readonly additionalApps: GitHubApp[];
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubApp">GitHubApp</a>[]

---

##### `prefix`<sup>Optional</sup> <a name="prefix" id="@catnekaise/ghrawel.ManagedGitHubAppsProps.property.prefix"></a>

```typescript
public readonly prefix: string;
```

- *Type:* string
- *Default:* /catnekaise/github-apps

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="@catnekaise/ghrawel.ManagedGitHubAppsProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* AWS_MANAGED

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="@catnekaise/ghrawel.ManagedGitHubAppsProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

---

### NewTokenProviderConfiguration <a name="NewTokenProviderConfiguration" id="@catnekaise/ghrawel.NewTokenProviderConfiguration"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.NewTokenProviderConfiguration.Initializer"></a>

```typescript
import { NewTokenProviderConfiguration } from '@catnekaise/ghrawel'

const newTokenProviderConfiguration: NewTokenProviderConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.NewTokenProviderConfiguration.property.permissions">permissions</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions">GitHubAppPermissions</a></code> | Permissions. |
| <code><a href="#@catnekaise/ghrawel.NewTokenProviderConfiguration.property.app">app</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.NewTokenProviderConfiguration.property.endpoint">endpoint</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderEndpoint">TokenProviderEndpoint</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.NewTokenProviderConfiguration.property.targetRule">targetRule</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderTargetRule">TokenProviderTargetRule</a></code> | *No description.* |

---

##### `permissions`<sup>Required</sup> <a name="permissions" id="@catnekaise/ghrawel.NewTokenProviderConfiguration.property.permissions"></a>

```typescript
public readonly permissions: GitHubAppPermissions;
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppPermissions">GitHubAppPermissions</a>

Permissions.

---

##### `app`<sup>Optional</sup> <a name="app" id="@catnekaise/ghrawel.NewTokenProviderConfiguration.property.app"></a>

```typescript
public readonly app: string;
```

- *Type:* string
- *Default:* default

---

##### `endpoint`<sup>Optional</sup> <a name="endpoint" id="@catnekaise/ghrawel.NewTokenProviderConfiguration.property.endpoint"></a>

```typescript
public readonly endpoint: TokenProviderEndpoint;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderEndpoint">TokenProviderEndpoint</a>
- *Default:* DEFAULT

---

##### `targetRule`<sup>Optional</sup> <a name="targetRule" id="@catnekaise/ghrawel.NewTokenProviderConfiguration.property.targetRule"></a>

```typescript
public readonly targetRule: TokenProviderTargetRule;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderTargetRule">TokenProviderTargetRule</a>
- *Default:* AT_LEAST_ONE

---

### TargetRuleSettings <a name="TargetRuleSettings" id="@catnekaise/ghrawel.TargetRuleSettings"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.TargetRuleSettings.Initializer"></a>

```typescript
import { TargetRuleSettings } from '@catnekaise/ghrawel'

const targetRuleSettings: TargetRuleSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TargetRuleSettings.property.mode">mode</a></code> | <code><a href="#@catnekaise/ghrawel.RepositorySelectionMode">RepositorySelectionMode</a></code> | *No description.* |

---

##### `mode`<sup>Required</sup> <a name="mode" id="@catnekaise/ghrawel.TargetRuleSettings.property.mode"></a>

```typescript
public readonly mode: RepositorySelectionMode;
```

- *Type:* <a href="#@catnekaise/ghrawel.RepositorySelectionMode">RepositorySelectionMode</a>

---

### TokenProviderActionsIdentitySettings <a name="TokenProviderActionsIdentitySettings" id="@catnekaise/ghrawel.TokenProviderActionsIdentitySettings"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.TokenProviderActionsIdentitySettings.Initializer"></a>

```typescript
import { TokenProviderActionsIdentitySettings } from '@catnekaise/ghrawel'

const tokenProviderActionsIdentitySettings: TokenProviderActionsIdentitySettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderActionsIdentitySettings.property.claimsContext">claimsContext</a></code> | <code>@catnekaise/cdk-iam-utilities.IClaimsContext</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderActionsIdentitySettings.property.pathStrategy">pathStrategy</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy">TokenProviderPathStrategy</a></code> | *No description.* |

---

##### `claimsContext`<sup>Required</sup> <a name="claimsContext" id="@catnekaise/ghrawel.TokenProviderActionsIdentitySettings.property.claimsContext"></a>

```typescript
public readonly claimsContext: IClaimsContext;
```

- *Type:* @catnekaise/cdk-iam-utilities.IClaimsContext

---

##### `pathStrategy`<sup>Optional</sup> <a name="pathStrategy" id="@catnekaise/ghrawel.TokenProviderActionsIdentitySettings.property.pathStrategy"></a>

```typescript
public readonly pathStrategy: TokenProviderPathStrategy;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderPathStrategy">TokenProviderPathStrategy</a>

---

### TokenProviderApiProps <a name="TokenProviderApiProps" id="@catnekaise/ghrawel.TokenProviderApiProps"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.TokenProviderApiProps.Initializer"></a>

```typescript
import { TokenProviderApiProps } from '@catnekaise/ghrawel'

const tokenProviderApiProps: TokenProviderApiProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApiProps.property.apps">apps</a></code> | <code><a href="#@catnekaise/ghrawel.IGitHubApps">IGitHubApps</a></code> | GitHub Apps configuration. |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApiProps.property.api">api</a></code> | <code>aws-cdk-lib.aws_apigateway.RestApi</code> | Use this to provide the API Gateway RestApi configured to your requirements. |
| <code><a href="#@catnekaise/ghrawel.TokenProviderApiProps.property.lambda">lambda</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | Use this to provide the Lambda Function configured to your requirements. |

---

##### `apps`<sup>Required</sup> <a name="apps" id="@catnekaise/ghrawel.TokenProviderApiProps.property.apps"></a>

```typescript
public readonly apps: IGitHubApps;
```

- *Type:* <a href="#@catnekaise/ghrawel.IGitHubApps">IGitHubApps</a>

GitHub Apps configuration.

---

##### `api`<sup>Optional</sup> <a name="api" id="@catnekaise/ghrawel.TokenProviderApiProps.property.api"></a>

```typescript
public readonly api: RestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.RestApi

Use this to provide the API Gateway RestApi configured to your requirements.

---

##### `lambda`<sup>Optional</sup> <a name="lambda" id="@catnekaise/ghrawel.TokenProviderApiProps.property.lambda"></a>

```typescript
public readonly lambda: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

Use this to provide the Lambda Function configured to your requirements.

---

### TokenProviderConfiguratorIntegrationOptionsContext <a name="TokenProviderConfiguratorIntegrationOptionsContext" id="@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.Initializer"></a>

```typescript
import { TokenProviderConfiguratorIntegrationOptionsContext } from '@catnekaise/ghrawel'

const tokenProviderConfiguratorIntegrationOptionsContext: TokenProviderConfiguratorIntegrationOptionsContext = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.appId">appId</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.appName">appName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.endpoint">endpoint</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderEndpoint">TokenProviderEndpoint</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.permissions">permissions</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions">GitHubAppPermissions</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.targetRule">targetRule</a></code> | <code><a href="#@catnekaise/ghrawel.TargetRuleSettings">TargetRuleSettings</a></code> | *No description.* |

---

##### `appId`<sup>Required</sup> <a name="appId" id="@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.appId"></a>

```typescript
public readonly appId: number;
```

- *Type:* number

---

##### `appName`<sup>Required</sup> <a name="appName" id="@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.appName"></a>

```typescript
public readonly appName: string;
```

- *Type:* string

---

##### `endpoint`<sup>Required</sup> <a name="endpoint" id="@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.endpoint"></a>

```typescript
public readonly endpoint: TokenProviderEndpoint;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderEndpoint">TokenProviderEndpoint</a>

---

##### `name`<sup>Required</sup> <a name="name" id="@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `permissions`<sup>Required</sup> <a name="permissions" id="@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.permissions"></a>

```typescript
public readonly permissions: GitHubAppPermissions;
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppPermissions">GitHubAppPermissions</a>

---

##### `targetRule`<sup>Required</sup> <a name="targetRule" id="@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext.property.targetRule"></a>

```typescript
public readonly targetRule: TargetRuleSettings;
```

- *Type:* <a href="#@catnekaise/ghrawel.TargetRuleSettings">TargetRuleSettings</a>

---

### TokenProviderConfiguratorMethodOptionsContext <a name="TokenProviderConfiguratorMethodOptionsContext" id="@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.Initializer"></a>

```typescript
import { TokenProviderConfiguratorMethodOptionsContext } from '@catnekaise/ghrawel'

const tokenProviderConfiguratorMethodOptionsContext: TokenProviderConfiguratorMethodOptionsContext = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.endpointType">endpointType</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderEndpointType">TokenProviderEndpointType</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.errorResponseModel">errorResponseModel</a></code> | <code>aws-cdk-lib.aws_apigateway.Model</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.operationName">operationName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.repositorySelectionMode">repositorySelectionMode</a></code> | <code><a href="#@catnekaise/ghrawel.RepositorySelectionMode">RepositorySelectionMode</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.tokenResponseModel">tokenResponseModel</a></code> | <code>aws-cdk-lib.aws_apigateway.Model</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.requestValidator">requestValidator</a></code> | <code>aws-cdk-lib.aws_apigateway.IRequestValidator</code> | *No description.* |

---

##### `endpointType`<sup>Required</sup> <a name="endpointType" id="@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.endpointType"></a>

```typescript
public readonly endpointType: TokenProviderEndpointType;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderEndpointType">TokenProviderEndpointType</a>

---

##### `errorResponseModel`<sup>Required</sup> <a name="errorResponseModel" id="@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.errorResponseModel"></a>

```typescript
public readonly errorResponseModel: Model;
```

- *Type:* aws-cdk-lib.aws_apigateway.Model

---

##### `operationName`<sup>Required</sup> <a name="operationName" id="@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.operationName"></a>

```typescript
public readonly operationName: string;
```

- *Type:* string

---

##### `repositorySelectionMode`<sup>Required</sup> <a name="repositorySelectionMode" id="@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.repositorySelectionMode"></a>

```typescript
public readonly repositorySelectionMode: RepositorySelectionMode;
```

- *Type:* <a href="#@catnekaise/ghrawel.RepositorySelectionMode">RepositorySelectionMode</a>

---

##### `tokenResponseModel`<sup>Required</sup> <a name="tokenResponseModel" id="@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.tokenResponseModel"></a>

```typescript
public readonly tokenResponseModel: Model;
```

- *Type:* aws-cdk-lib.aws_apigateway.Model

---

##### `requestValidator`<sup>Optional</sup> <a name="requestValidator" id="@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext.property.requestValidator"></a>

```typescript
public readonly requestValidator: IRequestValidator;
```

- *Type:* aws-cdk-lib.aws_apigateway.IRequestValidator

---

### TokenProviderMethodOptions <a name="TokenProviderMethodOptions" id="@catnekaise/ghrawel.TokenProviderMethodOptions"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.TokenProviderMethodOptions.Initializer"></a>

```typescript
import { TokenProviderMethodOptions } from '@catnekaise/ghrawel'

const tokenProviderMethodOptions: TokenProviderMethodOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderMethodOptions.property.endpointType">endpointType</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderEndpointType">TokenProviderEndpointType</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderMethodOptions.property.errorResponseModel">errorResponseModel</a></code> | <code>aws-cdk-lib.aws_apigateway.Model</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderMethodOptions.property.operationName">operationName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderMethodOptions.property.requestValidator">requestValidator</a></code> | <code>aws-cdk-lib.aws_apigateway.RequestValidator</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderMethodOptions.property.tokenResponseModel">tokenResponseModel</a></code> | <code>aws-cdk-lib.aws_apigateway.Model</code> | *No description.* |

---

##### `endpointType`<sup>Required</sup> <a name="endpointType" id="@catnekaise/ghrawel.TokenProviderMethodOptions.property.endpointType"></a>

```typescript
public readonly endpointType: TokenProviderEndpointType;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderEndpointType">TokenProviderEndpointType</a>

---

##### `errorResponseModel`<sup>Required</sup> <a name="errorResponseModel" id="@catnekaise/ghrawel.TokenProviderMethodOptions.property.errorResponseModel"></a>

```typescript
public readonly errorResponseModel: Model;
```

- *Type:* aws-cdk-lib.aws_apigateway.Model

---

##### `operationName`<sup>Required</sup> <a name="operationName" id="@catnekaise/ghrawel.TokenProviderMethodOptions.property.operationName"></a>

```typescript
public readonly operationName: string;
```

- *Type:* string

---

##### `requestValidator`<sup>Required</sup> <a name="requestValidator" id="@catnekaise/ghrawel.TokenProviderMethodOptions.property.requestValidator"></a>

```typescript
public readonly requestValidator: RequestValidator;
```

- *Type:* aws-cdk-lib.aws_apigateway.RequestValidator

---

##### `tokenResponseModel`<sup>Required</sup> <a name="tokenResponseModel" id="@catnekaise/ghrawel.TokenProviderMethodOptions.property.tokenResponseModel"></a>

```typescript
public readonly tokenResponseModel: Model;
```

- *Type:* aws-cdk-lib.aws_apigateway.Model

---

### TokenProviderSettings <a name="TokenProviderSettings" id="@catnekaise/ghrawel.TokenProviderSettings"></a>

#### Initializer <a name="Initializer" id="@catnekaise/ghrawel.TokenProviderSettings.Initializer"></a>

```typescript
import { TokenProviderSettings } from '@catnekaise/ghrawel'

const tokenProviderSettings: TokenProviderSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.api">api</a></code> | <code>aws-cdk-lib.aws_apigateway.IRestApi</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.app">app</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.appId">appId</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.configurator">configurator</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderConfigurator">TokenProviderConfigurator</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.endpoint">endpoint</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderEndpoint">TokenProviderEndpoint</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.lambda">lambda</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.methodOptions">methodOptions</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderMethodOptions">TokenProviderMethodOptions</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.permissions">permissions</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppPermissions">GitHubAppPermissions</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderSettings.property.targetRule">targetRule</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderTargetRule">TokenProviderTargetRule</a></code> | *No description.* |

---

##### `api`<sup>Required</sup> <a name="api" id="@catnekaise/ghrawel.TokenProviderSettings.property.api"></a>

```typescript
public readonly api: IRestApi;
```

- *Type:* aws-cdk-lib.aws_apigateway.IRestApi

---

##### `app`<sup>Required</sup> <a name="app" id="@catnekaise/ghrawel.TokenProviderSettings.property.app"></a>

```typescript
public readonly app: string;
```

- *Type:* string

---

##### `appId`<sup>Required</sup> <a name="appId" id="@catnekaise/ghrawel.TokenProviderSettings.property.appId"></a>

```typescript
public readonly appId: number;
```

- *Type:* number

---

##### `configurator`<sup>Required</sup> <a name="configurator" id="@catnekaise/ghrawel.TokenProviderSettings.property.configurator"></a>

```typescript
public readonly configurator: TokenProviderConfigurator;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderConfigurator">TokenProviderConfigurator</a>

---

##### `endpoint`<sup>Required</sup> <a name="endpoint" id="@catnekaise/ghrawel.TokenProviderSettings.property.endpoint"></a>

```typescript
public readonly endpoint: TokenProviderEndpoint;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderEndpoint">TokenProviderEndpoint</a>

---

##### `lambda`<sup>Required</sup> <a name="lambda" id="@catnekaise/ghrawel.TokenProviderSettings.property.lambda"></a>

```typescript
public readonly lambda: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---

##### `methodOptions`<sup>Required</sup> <a name="methodOptions" id="@catnekaise/ghrawel.TokenProviderSettings.property.methodOptions"></a>

```typescript
public readonly methodOptions: TokenProviderMethodOptions;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderMethodOptions">TokenProviderMethodOptions</a>

---

##### `name`<sup>Required</sup> <a name="name" id="@catnekaise/ghrawel.TokenProviderSettings.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `permissions`<sup>Required</sup> <a name="permissions" id="@catnekaise/ghrawel.TokenProviderSettings.property.permissions"></a>

```typescript
public readonly permissions: GitHubAppPermissions;
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppPermissions">GitHubAppPermissions</a>

---

##### `targetRule`<sup>Required</sup> <a name="targetRule" id="@catnekaise/ghrawel.TokenProviderSettings.property.targetRule"></a>

```typescript
public readonly targetRule: TokenProviderTargetRule;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderTargetRule">TokenProviderTargetRule</a>

---

## Classes <a name="Classes" id="Classes"></a>

### GitHubApp <a name="GitHubApp" id="@catnekaise/ghrawel.GitHubApp"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.GitHubApp.create">create</a></code> | *No description.* |

---

##### `create` <a name="create" id="@catnekaise/ghrawel.GitHubApp.create"></a>

```typescript
import { GitHubApp } from '@catnekaise/ghrawel'

GitHubApp.create(name: string, appId: number)
```

###### `name`<sup>Required</sup> <a name="name" id="@catnekaise/ghrawel.GitHubApp.create.parameter.name"></a>

- *Type:* string

---

###### `appId`<sup>Required</sup> <a name="appId" id="@catnekaise/ghrawel.GitHubApp.create.parameter.appId"></a>

- *Type:* number

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.GitHubApp.property.appId">appId</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubApp.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `appId`<sup>Required</sup> <a name="appId" id="@catnekaise/ghrawel.GitHubApp.property.appId"></a>

```typescript
public readonly appId: number;
```

- *Type:* number

---

##### `name`<sup>Required</sup> <a name="name" id="@catnekaise/ghrawel.GitHubApp.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---


### TokenProviderConfigurator <a name="TokenProviderConfigurator" id="@catnekaise/ghrawel.TokenProviderConfigurator"></a>

This class may see some breaking changes but the intent is to stabilize, be made abstract and available as input on `TokenProviderConfiguration`.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfigurator.createApiResource">createApiResource</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfigurator.createIntegrationOptions">createIntegrationOptions</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfigurator.createMethodOptions">createMethodOptions</a></code> | *No description.* |

---

##### `createApiResource` <a name="createApiResource" id="@catnekaise/ghrawel.TokenProviderConfigurator.createApiResource"></a>

```typescript
public createApiResource(api: IRestApi, name: string, endpoint: TokenProviderEndpoint): Resource
```

###### `api`<sup>Required</sup> <a name="api" id="@catnekaise/ghrawel.TokenProviderConfigurator.createApiResource.parameter.api"></a>

- *Type:* aws-cdk-lib.aws_apigateway.IRestApi

---

###### `name`<sup>Required</sup> <a name="name" id="@catnekaise/ghrawel.TokenProviderConfigurator.createApiResource.parameter.name"></a>

- *Type:* string

---

###### `endpoint`<sup>Required</sup> <a name="endpoint" id="@catnekaise/ghrawel.TokenProviderConfigurator.createApiResource.parameter.endpoint"></a>

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderEndpoint">TokenProviderEndpoint</a>

---

##### `createIntegrationOptions` <a name="createIntegrationOptions" id="@catnekaise/ghrawel.TokenProviderConfigurator.createIntegrationOptions"></a>

```typescript
public createIntegrationOptions(settings: TokenProviderConfiguratorIntegrationOptionsContext): LambdaIntegrationOptions
```

###### `settings`<sup>Required</sup> <a name="settings" id="@catnekaise/ghrawel.TokenProviderConfigurator.createIntegrationOptions.parameter.settings"></a>

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderConfiguratorIntegrationOptionsContext">TokenProviderConfiguratorIntegrationOptionsContext</a>

---

##### `createMethodOptions` <a name="createMethodOptions" id="@catnekaise/ghrawel.TokenProviderConfigurator.createMethodOptions"></a>

```typescript
public createMethodOptions(input: TokenProviderConfiguratorMethodOptionsContext): MethodOptions
```

###### `input`<sup>Required</sup> <a name="input" id="@catnekaise/ghrawel.TokenProviderConfigurator.createMethodOptions.parameter.input"></a>

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderConfiguratorMethodOptionsContext">TokenProviderConfiguratorMethodOptionsContext</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfigurator.create">create</a></code> | *No description.* |

---

##### `create` <a name="create" id="@catnekaise/ghrawel.TokenProviderConfigurator.create"></a>

```typescript
import { TokenProviderConfigurator } from '@catnekaise/ghrawel'

TokenProviderConfigurator.create()
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderConfigurator.property.integrationResponses">integrationResponses</a></code> | <code>aws-cdk-lib.aws_apigateway.IntegrationResponse[]</code> | *No description.* |

---

##### `integrationResponses`<sup>Required</sup> <a name="integrationResponses" id="@catnekaise/ghrawel.TokenProviderConfigurator.property.integrationResponses"></a>

```typescript
public readonly integrationResponses: IntegrationResponse[];
```

- *Type:* aws-cdk-lib.aws_apigateway.IntegrationResponse[]

---


### TokenProviderEndpoint <a name="TokenProviderEndpoint" id="@catnekaise/ghrawel.TokenProviderEndpoint"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderEndpoint.useDefault">useDefault</a></code> | Use this to configure a token provider at `/x/<provider-name>/{owner}/{repo}`. |
| <code><a href="#@catnekaise/ghrawel.TokenProviderEndpoint.useOwner">useOwner</a></code> | Use this to configure a token provider at `/x/<provider-name>/{owner}` or `/x/<provider-name>/<owner>`. |

---

##### `useDefault` <a name="useDefault" id="@catnekaise/ghrawel.TokenProviderEndpoint.useDefault"></a>

```typescript
import { TokenProviderEndpoint } from '@catnekaise/ghrawel'

TokenProviderEndpoint.useDefault()
```

Use this to configure a token provider at `/x/<provider-name>/{owner}/{repo}`.

##### `useOwner` <a name="useOwner" id="@catnekaise/ghrawel.TokenProviderEndpoint.useOwner"></a>

```typescript
import { TokenProviderEndpoint } from '@catnekaise/ghrawel'

TokenProviderEndpoint.useOwner(owner?: string)
```

Use this to configure a token provider at `/x/<provider-name>/{owner}` or `/x/<provider-name>/<owner>`.

###### `owner`<sup>Optional</sup> <a name="owner" id="@catnekaise/ghrawel.TokenProviderEndpoint.useOwner.parameter.owner"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderEndpoint.property.isOwnerEndpoint">isOwnerEndpoint</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderEndpoint.property.type">type</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderEndpointType">TokenProviderEndpointType</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderEndpoint.property.owner">owner</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderEndpoint.property.repo">repo</a></code> | <code>string</code> | *No description.* |

---

##### `isOwnerEndpoint`<sup>Required</sup> <a name="isOwnerEndpoint" id="@catnekaise/ghrawel.TokenProviderEndpoint.property.isOwnerEndpoint"></a>

```typescript
public readonly isOwnerEndpoint: boolean;
```

- *Type:* boolean

---

##### `type`<sup>Required</sup> <a name="type" id="@catnekaise/ghrawel.TokenProviderEndpoint.property.type"></a>

```typescript
public readonly type: TokenProviderEndpointType;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderEndpointType">TokenProviderEndpointType</a>

---

##### `owner`<sup>Optional</sup> <a name="owner" id="@catnekaise/ghrawel.TokenProviderEndpoint.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* string

---

##### `repo`<sup>Optional</sup> <a name="repo" id="@catnekaise/ghrawel.TokenProviderEndpoint.property.repo"></a>

```typescript
public readonly repo: string;
```

- *Type:* string

---


### TokenProviderPathStrategy <a name="TokenProviderPathStrategy" id="@catnekaise/ghrawel.TokenProviderPathStrategy"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.anyRepository">anyRepository</a></code> | Grants permission to `/x/<provider-name>/*`. |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.policyVarRepository">policyVarRepository</a></code> | Grants permission to `/x/<provider-name>/${aws:PrincipalTag/repository}`. |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.policyVarRepositoryOwner">policyVarRepositoryOwner</a></code> | Grants permission to `/x/<provider-name>/${aws:PrincipalTag/repository_owner}` or `/x/<provider-name>/${aws:PrincipalTag/repository_owner}/<repo>`. |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.selectOwner">selectOwner</a></code> | Grants permission to `/x/<provider-name>/<owner>`. |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.selectRepositories">selectRepositories</a></code> | Grants permission for each specified repo `/x/<provider-name>/<owner>/<repo>`. |

---

##### `anyRepository` <a name="anyRepository" id="@catnekaise/ghrawel.TokenProviderPathStrategy.anyRepository"></a>

```typescript
import { TokenProviderPathStrategy } from '@catnekaise/ghrawel'

TokenProviderPathStrategy.anyRepository()
```

Grants permission to `/x/<provider-name>/*`.

##### `policyVarRepository` <a name="policyVarRepository" id="@catnekaise/ghrawel.TokenProviderPathStrategy.policyVarRepository"></a>

```typescript
import { TokenProviderPathStrategy } from '@catnekaise/ghrawel'

TokenProviderPathStrategy.policyVarRepository()
```

Grants permission to `/x/<provider-name>/${aws:PrincipalTag/repository}`.

##### `policyVarRepositoryOwner` <a name="policyVarRepositoryOwner" id="@catnekaise/ghrawel.TokenProviderPathStrategy.policyVarRepositoryOwner"></a>

```typescript
import { TokenProviderPathStrategy } from '@catnekaise/ghrawel'

TokenProviderPathStrategy.policyVarRepositoryOwner(repositories: string)
```

Grants permission to `/x/<provider-name>/${aws:PrincipalTag/repository_owner}` or `/x/<provider-name>/${aws:PrincipalTag/repository_owner}/<repo>`.

###### `repositories`<sup>Required</sup> <a name="repositories" id="@catnekaise/ghrawel.TokenProviderPathStrategy.policyVarRepositoryOwner.parameter.repositories"></a>

- *Type:* string

---

##### `selectOwner` <a name="selectOwner" id="@catnekaise/ghrawel.TokenProviderPathStrategy.selectOwner"></a>

```typescript
import { TokenProviderPathStrategy } from '@catnekaise/ghrawel'

TokenProviderPathStrategy.selectOwner(owner: string)
```

Grants permission to `/x/<provider-name>/<owner>`.

###### `owner`<sup>Required</sup> <a name="owner" id="@catnekaise/ghrawel.TokenProviderPathStrategy.selectOwner.parameter.owner"></a>

- *Type:* string

---

##### `selectRepositories` <a name="selectRepositories" id="@catnekaise/ghrawel.TokenProviderPathStrategy.selectRepositories"></a>

```typescript
import { TokenProviderPathStrategy } from '@catnekaise/ghrawel'

TokenProviderPathStrategy.selectRepositories(owner: string, repositories: string)
```

Grants permission for each specified repo `/x/<provider-name>/<owner>/<repo>`.

###### `owner`<sup>Required</sup> <a name="owner" id="@catnekaise/ghrawel.TokenProviderPathStrategy.selectRepositories.parameter.owner"></a>

- *Type:* string

---

###### `repositories`<sup>Required</sup> <a name="repositories" id="@catnekaise/ghrawel.TokenProviderPathStrategy.selectRepositories.parameter.repositories"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.property.pathTargetsRepositories">pathTargetsRepositories</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.property.repositories">repositories</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.property.type">type</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategyType">TokenProviderPathStrategyType</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.property.owner">owner</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategy.property.policyVar">policyVar</a></code> | <code><a href="#@catnekaise/ghrawel.TokenProviderPathPolicyVariable">TokenProviderPathPolicyVariable</a></code> | *No description.* |

---

##### `pathTargetsRepositories`<sup>Required</sup> <a name="pathTargetsRepositories" id="@catnekaise/ghrawel.TokenProviderPathStrategy.property.pathTargetsRepositories"></a>

```typescript
public readonly pathTargetsRepositories: boolean;
```

- *Type:* boolean

---

##### `repositories`<sup>Required</sup> <a name="repositories" id="@catnekaise/ghrawel.TokenProviderPathStrategy.property.repositories"></a>

```typescript
public readonly repositories: string[];
```

- *Type:* string[]

---

##### `type`<sup>Required</sup> <a name="type" id="@catnekaise/ghrawel.TokenProviderPathStrategy.property.type"></a>

```typescript
public readonly type: TokenProviderPathStrategyType;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderPathStrategyType">TokenProviderPathStrategyType</a>

---

##### `owner`<sup>Optional</sup> <a name="owner" id="@catnekaise/ghrawel.TokenProviderPathStrategy.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* string

---

##### `policyVar`<sup>Optional</sup> <a name="policyVar" id="@catnekaise/ghrawel.TokenProviderPathStrategy.property.policyVar"></a>

```typescript
public readonly policyVar: TokenProviderPathPolicyVariable;
```

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderPathPolicyVariable">TokenProviderPathPolicyVariable</a>

---


### TokenProviderTargetRule <a name="TokenProviderTargetRule" id="@catnekaise/ghrawel.TokenProviderTargetRule"></a>


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderTargetRule.allowOwner">allowOwner</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderTargetRule.atLeastOne">atLeastOne</a></code> | *No description.* |

---

##### `allowOwner` <a name="allowOwner" id="@catnekaise/ghrawel.TokenProviderTargetRule.allowOwner"></a>

```typescript
import { TokenProviderTargetRule } from '@catnekaise/ghrawel'

TokenProviderTargetRule.allowOwner()
```

##### `atLeastOne` <a name="atLeastOne" id="@catnekaise/ghrawel.TokenProviderTargetRule.atLeastOne"></a>

```typescript
import { TokenProviderTargetRule } from '@catnekaise/ghrawel'

TokenProviderTargetRule.atLeastOne()
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderTargetRule.property.repositorySelectionMode">repositorySelectionMode</a></code> | <code><a href="#@catnekaise/ghrawel.RepositorySelectionMode">RepositorySelectionMode</a></code> | *No description.* |

---

##### `repositorySelectionMode`<sup>Required</sup> <a name="repositorySelectionMode" id="@catnekaise/ghrawel.TokenProviderTargetRule.property.repositorySelectionMode"></a>

```typescript
public readonly repositorySelectionMode: RepositorySelectionMode;
```

- *Type:* <a href="#@catnekaise/ghrawel.RepositorySelectionMode">RepositorySelectionMode</a>

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IGitHubApps <a name="IGitHubApps" id="@catnekaise/ghrawel.IGitHubApps"></a>

- *Implemented By:* <a href="#@catnekaise/ghrawel.BaseGitHubApps">BaseGitHubApps</a>, <a href="#@catnekaise/ghrawel.ManagedGitHubApps">ManagedGitHubApps</a>, <a href="#@catnekaise/ghrawel.SelfManagedGitHubApps">SelfManagedGitHubApps</a>, <a href="#@catnekaise/ghrawel.IGitHubApps">IGitHubApps</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.IGitHubApps.getAppIdForAppName">getAppIdForAppName</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.IGitHubApps.grantAccess">grantAccess</a></code> | *No description.* |

---

##### `getAppIdForAppName` <a name="getAppIdForAppName" id="@catnekaise/ghrawel.IGitHubApps.getAppIdForAppName"></a>

```typescript
public getAppIdForAppName(name?: string): number
```

###### `name`<sup>Optional</sup> <a name="name" id="@catnekaise/ghrawel.IGitHubApps.getAppIdForAppName.parameter.name"></a>

- *Type:* string

---

##### `grantAccess` <a name="grantAccess" id="@catnekaise/ghrawel.IGitHubApps.grantAccess"></a>

```typescript
public grantAccess(principal: IPrincipal): Grant
```

###### `principal`<sup>Required</sup> <a name="principal" id="@catnekaise/ghrawel.IGitHubApps.grantAccess.parameter.principal"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@catnekaise/ghrawel.IGitHubApps.property.secretsPrefix">secretsPrefix</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.IGitHubApps.property.secretsStorage">secretsStorage</a></code> | <code><a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a></code> | *No description.* |

---

##### `secretsPrefix`<sup>Required</sup> <a name="secretsPrefix" id="@catnekaise/ghrawel.IGitHubApps.property.secretsPrefix"></a>

```typescript
public readonly secretsPrefix: string;
```

- *Type:* string

---

##### `secretsStorage`<sup>Required</sup> <a name="secretsStorage" id="@catnekaise/ghrawel.IGitHubApps.property.secretsStorage"></a>

```typescript
public readonly secretsStorage: GitHubAppSecretsStorage;
```

- *Type:* <a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage">GitHubAppSecretsStorage</a>

---

### ITokenProvider <a name="ITokenProvider" id="@catnekaise/ghrawel.ITokenProvider"></a>

- *Implemented By:* <a href="#@catnekaise/ghrawel.TokenProvider">TokenProvider</a>, <a href="#@catnekaise/ghrawel.ITokenProvider">ITokenProvider</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.ITokenProvider.grantExecute">grantExecute</a></code> | Use this to grant access to the token provider. |
| <code><a href="#@catnekaise/ghrawel.ITokenProvider.grantExecuteGitHubActionsAbac">grantExecuteGitHubActionsAbac</a></code> | use this to grant access to the token provider when the role is assumed via Cognito Identity. |

---

##### `grantExecute` <a name="grantExecute" id="@catnekaise/ghrawel.ITokenProvider.grantExecute"></a>

```typescript
public grantExecute(role: IRole, repo: string, owner?: string): Grant
```

Use this to grant access to the token provider.

###### `role`<sup>Required</sup> <a name="role" id="@catnekaise/ghrawel.ITokenProvider.grantExecute.parameter.role"></a>

- *Type:* aws-cdk-lib.aws_iam.IRole

---

###### `repo`<sup>Required</sup> <a name="repo" id="@catnekaise/ghrawel.ITokenProvider.grantExecute.parameter.repo"></a>

- *Type:* string

---

###### `owner`<sup>Optional</sup> <a name="owner" id="@catnekaise/ghrawel.ITokenProvider.grantExecute.parameter.owner"></a>

- *Type:* string

---

##### `grantExecuteGitHubActionsAbac` <a name="grantExecuteGitHubActionsAbac" id="@catnekaise/ghrawel.ITokenProvider.grantExecuteGitHubActionsAbac"></a>

```typescript
public grantExecuteGitHubActionsAbac(role: IRole, settings: TokenProviderActionsIdentitySettings): Grant
```

use this to grant access to the token provider when the role is assumed via Cognito Identity.

###### `role`<sup>Required</sup> <a name="role" id="@catnekaise/ghrawel.ITokenProvider.grantExecuteGitHubActionsAbac.parameter.role"></a>

- *Type:* aws-cdk-lib.aws_iam.IRole

---

###### `settings`<sup>Required</sup> <a name="settings" id="@catnekaise/ghrawel.ITokenProvider.grantExecuteGitHubActionsAbac.parameter.settings"></a>

- *Type:* <a href="#@catnekaise/ghrawel.TokenProviderActionsIdentitySettings">TokenProviderActionsIdentitySettings</a>

---


### ITokenProviderApi <a name="ITokenProviderApi" id="@catnekaise/ghrawel.ITokenProviderApi"></a>

- *Implemented By:* <a href="#@catnekaise/ghrawel.TokenProviderApi">TokenProviderApi</a>, <a href="#@catnekaise/ghrawel.ITokenProviderApi">ITokenProviderApi</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.ITokenProviderApi.newTokenProvider">newTokenProvider</a></code> | *No description.* |

---

##### `newTokenProvider` <a name="newTokenProvider" id="@catnekaise/ghrawel.ITokenProviderApi.newTokenProvider"></a>

```typescript
public newTokenProvider(name: string, configuration: NewTokenProviderConfiguration): ITokenProvider
```

###### `name`<sup>Required</sup> <a name="name" id="@catnekaise/ghrawel.ITokenProviderApi.newTokenProvider.parameter.name"></a>

- *Type:* string

---

###### `configuration`<sup>Required</sup> <a name="configuration" id="@catnekaise/ghrawel.ITokenProviderApi.newTokenProvider.parameter.configuration"></a>

- *Type:* <a href="#@catnekaise/ghrawel.NewTokenProviderConfiguration">NewTokenProviderConfiguration</a>

---


## Enums <a name="Enums" id="Enums"></a>

### GitHubAppSecretsStorage <a name="GitHubAppSecretsStorage" id="@catnekaise/ghrawel.GitHubAppSecretsStorage"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage.PARAMETER_STORE">PARAMETER_STORE</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.GitHubAppSecretsStorage.SECRETS_MANAGER">SECRETS_MANAGER</a></code> | *No description.* |

---

##### `PARAMETER_STORE` <a name="PARAMETER_STORE" id="@catnekaise/ghrawel.GitHubAppSecretsStorage.PARAMETER_STORE"></a>

---


##### `SECRETS_MANAGER` <a name="SECRETS_MANAGER" id="@catnekaise/ghrawel.GitHubAppSecretsStorage.SECRETS_MANAGER"></a>

---


### PermissionLevel <a name="PermissionLevel" id="@catnekaise/ghrawel.PermissionLevel"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.PermissionLevel.READ">READ</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.PermissionLevel.WRITE">WRITE</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.PermissionLevel.ADMIN">ADMIN</a></code> | *No description.* |

---

##### `READ` <a name="READ" id="@catnekaise/ghrawel.PermissionLevel.READ"></a>

---


##### `WRITE` <a name="WRITE" id="@catnekaise/ghrawel.PermissionLevel.WRITE"></a>

---


##### `ADMIN` <a name="ADMIN" id="@catnekaise/ghrawel.PermissionLevel.ADMIN"></a>

---


### RepositorySelectionMode <a name="RepositorySelectionMode" id="@catnekaise/ghrawel.RepositorySelectionMode"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.RepositorySelectionMode.AT_LEAST_ONE">AT_LEAST_ONE</a></code> | Allows targeting of any individual or multiple repos, but NOT the organization. |
| <code><a href="#@catnekaise/ghrawel.RepositorySelectionMode.ALLOW_OWNER">ALLOW_OWNER</a></code> | Allows targeting of any individual or multiple repos and the organization/user. |

---

##### `AT_LEAST_ONE` <a name="AT_LEAST_ONE" id="@catnekaise/ghrawel.RepositorySelectionMode.AT_LEAST_ONE"></a>

Allows targeting of any individual or multiple repos, but NOT the organization.

---


##### `ALLOW_OWNER` <a name="ALLOW_OWNER" id="@catnekaise/ghrawel.RepositorySelectionMode.ALLOW_OWNER"></a>

Allows targeting of any individual or multiple repos and the organization/user.

---


### TokenProviderEndpointType <a name="TokenProviderEndpointType" id="@catnekaise/ghrawel.TokenProviderEndpointType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderEndpointType.DEFAULT">DEFAULT</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderEndpointType.DYNAMIC_OWNER">DYNAMIC_OWNER</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderEndpointType.STATIC_OWNER">STATIC_OWNER</a></code> | *No description.* |

---

##### `DEFAULT` <a name="DEFAULT" id="@catnekaise/ghrawel.TokenProviderEndpointType.DEFAULT"></a>

---


##### `DYNAMIC_OWNER` <a name="DYNAMIC_OWNER" id="@catnekaise/ghrawel.TokenProviderEndpointType.DYNAMIC_OWNER"></a>

---


##### `STATIC_OWNER` <a name="STATIC_OWNER" id="@catnekaise/ghrawel.TokenProviderEndpointType.STATIC_OWNER"></a>

---


### TokenProviderPathPolicyVariable <a name="TokenProviderPathPolicyVariable" id="@catnekaise/ghrawel.TokenProviderPathPolicyVariable"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathPolicyVariable.REPOSITORY">REPOSITORY</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathPolicyVariable.REPOSITORY_OWNER">REPOSITORY_OWNER</a></code> | *No description.* |

---

##### `REPOSITORY` <a name="REPOSITORY" id="@catnekaise/ghrawel.TokenProviderPathPolicyVariable.REPOSITORY"></a>

---


##### `REPOSITORY_OWNER` <a name="REPOSITORY_OWNER" id="@catnekaise/ghrawel.TokenProviderPathPolicyVariable.REPOSITORY_OWNER"></a>

---


### TokenProviderPathStrategyType <a name="TokenProviderPathStrategyType" id="@catnekaise/ghrawel.TokenProviderPathStrategyType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategyType.POLICY_VAR">POLICY_VAR</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategyType.ANY_REPOSITORY">ANY_REPOSITORY</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategyType.OWNER">OWNER</a></code> | *No description.* |
| <code><a href="#@catnekaise/ghrawel.TokenProviderPathStrategyType.REPOSITORIES">REPOSITORIES</a></code> | *No description.* |

---

##### `POLICY_VAR` <a name="POLICY_VAR" id="@catnekaise/ghrawel.TokenProviderPathStrategyType.POLICY_VAR"></a>

---


##### `ANY_REPOSITORY` <a name="ANY_REPOSITORY" id="@catnekaise/ghrawel.TokenProviderPathStrategyType.ANY_REPOSITORY"></a>

---


##### `OWNER` <a name="OWNER" id="@catnekaise/ghrawel.TokenProviderPathStrategyType.OWNER"></a>

---


##### `REPOSITORIES` <a name="REPOSITORIES" id="@catnekaise/ghrawel.TokenProviderPathStrategyType.REPOSITORIES"></a>

---

