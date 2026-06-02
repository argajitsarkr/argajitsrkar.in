# argajitsrkar-downtime

Tiny Cloudflare Worker that fronts `argajitsrkar.in` and falls back to the GitHub Pages static portfolio (`argajitsarkr.github.io`) whenever the home-laptop tunnel is unreachable.

## Deploy

```bash
cd worker
npm install
npx wrangler login        # one-time
npx wrangler deploy
```

Or from the repo root: `./deploy.sh worker`

## How it works

On every request:
1. Try to fetch through to the configured route (the laptop tunnel).
2. If the response status is in `{502, 503, 520-526, 530}` -> 302-redirect to `FALLBACK_URL`.
3. If `fetch` throws (network error) -> same 302.
4. Otherwise pass through transparently.

`api.argajitsrkar.in` is intentionally **not** routed - JSON clients should see Cloudflare's parseable 5xx page instead of an HTML redirect.

## Customizing the fallback

`FALLBACK_URL` is set in `wrangler.toml` under `[vars]`. Currently points to `https://argajitsarkr.github.io/`. If you create a dedicated maintenance page (e.g. `argajitsarkr.github.io/argajitsrkar-offline/`) later, update the URL and redeploy.
