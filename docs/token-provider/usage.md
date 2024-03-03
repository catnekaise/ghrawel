# Usage Examples

## cURL
> https://curl.se/libcurl/c/CURLOPT_AWS_SIGV4.html

```shell
AWS_REGION="eu-west-1"
BASE_URL="https://abcd1234.execute-api.${AWS_REGION}.amazonaws.com/dev"
PROVIDER="example-provider"

SINGLE_REPO_RESPONSE=$(curl "${BASE_URL}/x/${PROVIDER}/catnekaise/example-repo" \
	--user "${AWS_ACCESS_KEY_ID}":"${AWS_SECRET_ACCESS_KEY}" \
	-H "x-amz-security-token: ${AWS_SESSION_TOKEN}" \
	--aws-sigv4 "aws:amz:${AWS_REGION}:execute-api")
	
TOKEN=$(echo "$SINGLE_REPO_RESPONSE" | jq -r '.token')

ORG_RESPONSE=$(curl "${BASE_URL}/x/${PROVIDER}/catnekaise" \
	--user "${AWS_ACCESS_KEY_ID}":"${AWS_SECRET_ACCESS_KEY}" \
	-H "x-amz-security-token: ${AWS_SESSION_TOKEN}" \
	--aws-sigv4 "aws:amz:${AWS_REGION}:execute-api")
	
MULTI_REPO_RESPONSE=$(curl "${BASE_URL}/x/${PROVIDER}/catnekaise?repo=repo-1,repo-2,repo-3,repo-99" \
	--user "${AWS_ACCESS_KEY_ID}":"${AWS_SECRET_ACCESS_KEY}" \
	-H "x-amz-security-token: ${AWS_SESSION_TOKEN}" \
	--aws-sigv4 "aws:amz:${AWS_REGION}:execute-api")
```

## Use Go
> https://pkg.go.dev/github.com/aws/aws-sdk-go-v2/aws/signer/v4

The following example signs a request using credentials from environment and then uses the token with [google/go-github](https://github.com/google/go-github). This example contains no error handling.

```go
package main

import (
	"bytes"
	"context"
	"crypto/sha256"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/aws/signer/v4"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/google/go-github/v59/github"
	"net/http"
	"net/url"
	"time"
)

type tokenBody struct {
	Token string `json:"token"`
}

func main() {
	
	region := "eu-west-1"
	apiId := "abcd1234"
	owner := "catnekaise"
	repo := "example-repo"
	stageName := "dev"

	u, _ := url.ParseRequestURI(fmt.Sprintf("https://%s.execute-api.%s.amazonaws.com", region, apiId))
	
	// When using custom domain do not include stageName
	u.Path = fmt.Sprintf("%s/x/example-provider/%s/%s", stageName, owner, repo)

	q := u.Query()
	// if OWNER_ENDPOINT and targeting repositories
	//q.Set("repo", "test-repo-1,test-repo-2")
	u.RawQuery = q.Encode()

	request, _ := http.NewRequest("GET", u.String(), nil)
	ctx := context.TODO()

	cfg, _ := config.LoadDefaultConfig(ctx)
	credentials, _ := cfg.Credentials.Retrieve(ctx)

	hash := sha256.Sum256([]byte(""))
	hexHash := fmt.Sprintf("%x", hash)

	v4.NewSigner()
	signer := v4.NewSigner()
	signer.SignHTTP(ctx, credentials, request, hexHash, "execute-api", cfg.Region, time.Now())

	client := &http.Client{}
	response, _ := client.Do(request)

	buf := new(bytes.Buffer)
	buf.ReadFrom(response.Body)

	var body tokenBody

	json.Unmarshal(buf.Bytes(), &body)

	githubClient := github.NewClient(nil).WithAuthToken(body.Token)

	issues, _, _ := githubClient.Issues.ListByRepo(ctx, owner, repo, &github.IssueListByRepoOptions{})
	
	// Do something with your issues
}
```

## Use TypeScript
TODO

## Use .NET
TODO

## Use ProBot
TODO
