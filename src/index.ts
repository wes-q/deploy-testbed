// Answers every request with where it runs and the commit it was built from,
// so the smoke step can prove the live Worker is the one just deployed.
interface Env {
  ENVIRONMENT: string;
  COMMIT: string;
}

export default {
  fetch(_request: Request, env: Env): Response {
    return new Response(`deploy-testbed ${env.ENVIRONMENT} ${env.COMMIT}\n`, {
      headers: { "content-type": "text/plain" },
    });
  },
};
