# deploy-testbed

A stand-in for a client repository, for testing the deploy pipelines in
[ci-templates](https://github.com/Marketplace-Studio-Dev/ci-templates). It has
nothing to deploy on purpose: every command in
`.github/workflows/deploy.yml` only checks what it can see and prints a line.

That file was rendered by the stub generator, unedited, from a profile with
the Cloudflare shape, pnpm, and these commands:

| Step | Command checks | Passes when |
| --- | --- | --- |
| setup | `CLOUDFLARE_API_TOKEN` is empty | no secrets reach it |
| migrate | `CLOUDFLARE_API_TOKEN` is set | secrets reach it |
| deploy | `CLOUDFLARE_API_TOKEN` is set | secrets reach it |
| smoke | `CLOUDFLARE_API_TOKEN` is empty | no secrets reach it |

## Setup

Under Settings, Environments, create `staging` and `production`, each with
deployment branches set to `main`, and add two environment secrets to each:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Any non-empty placeholder works. Nothing here calls Cloudflare, so never put a
real token in this repository.

## Tests

| Do | Expect |
| --- | --- |
| Merge a pull request to `main` | Deploy runs the `staging` job; every step passes |
| Actions, Deploy, Run workflow, on `main` | The `production` job runs; every step passes |
| Run workflow on any other branch | "Check the request" fails: deploys run from `main` only |
| Delete `CLOUDFLARE_ACCOUNT_ID` from `staging`, then merge | "Check this environment holds the secrets" fails and names it |
