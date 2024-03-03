# GitHub Actions
> [!NOTE]
> Goto [catnekaise/ghrawel-token](https://github.com/catnekaise/ghrawel-token) for a re-usable action and more examples.

## configure-aws-credentials and cURL
Using the official AWS action [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) and cURL.

```yaml
on:
  workflow_dispatch:
jobs:
  job1:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-region: "eu-west-1"
          role-to-assume: "arn:aws:iam::111111111111:role/<role-name>"
          
      - name: "Get Token using cURL"
        id: token
        env:
          AWS_REGION: "eu-west-1"
          BASE_URL: "https://abcd1234.execute-api.eu-west-1.amazonaws.com/dev"
          PROVIDER: "example-provider"
          OWNER: "catnekaise"
          REPO: "example-repo"
        run: |        
          response=$(curl "${BASE_URL}/x/${PROVIDER}/${OWNER}/${REPO}" \
          --user "${AWS_ACCESS_KEY_ID}":"${AWS_SECRET_ACCESS_KEY}" \
          -H "x-amz-security-token: ${AWS_SESSION_TOKEN}" \
          --aws-sigv4 "aws:amz:${AWS_REGION}:execute-api")
          
          token=$(echo "$response" | jq -r '.token')

          echo "::add-mask::$token"
          echo "token=$token" >> "$GITHUB_OUTPUT"

      - name: "Use Token"
        env:
          TOKEN: "${{ steps.token.outputs.token }}"
        run: |
          echo "Do something with the token"
```
