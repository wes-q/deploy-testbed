# deploy-testbed

A stand-in for a client repository, for testing the deploy pipelines in
[ci-templates](https://github.com/Marketplace-Studio-Dev/ci-templates). It deploys one tiny
Worker that answers every request with its environment and the commit it was
built from, to a Cloudflare account used for nothing else.

`.github/workflows/deploy.yml` was rendered by the stub generator, unedited.

| Step | Command | Proves |
| --- | --- | --- |
| setup | fails if `CLOUDFLARE_API_TOKEN` is visible | no secrets reach setup |
| deploy | `wrangler deploy --env <env> --var COMMIT:$GITHUB_SHA`, output to `deploy.log` | the secrets reach deploy and work |
| smoke | reads the URL from `deploy.log`, retries until it serves `$GITHUB_SHA` | the live Worker is the commit just merged |

The smoke step runs without secrets, like any visitor, so it passes only if the
deploy really reached Cloudflare.

## Setup

1. A Cloudflare account used only for this repository, with a workers.dev
   subdomain registered.
2. An API token from the "Edit Cloudflare Workers" template, limited to that
   account.
3. Repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Never
   use a token from an account that runs anything real: a Workers token can
   deploy every Worker in its account.

## Tests

| Do | Expect |
| --- | --- |
| Merge a pull request to `main` | `deploy-testbed-staging` serves the merge commit |
| Actions, Deploy, Run workflow, on `main` | `deploy-testbed-production` serves that commit |
| Run workflow on any other branch | "Check the request" fails: deploys run from `main` only |
