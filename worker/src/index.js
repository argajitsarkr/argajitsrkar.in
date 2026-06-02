// argajitsrkar-downtime - Cloudflare Worker
// Passes traffic through to the home-laptop tunnel.
// On tunnel-down statuses (502/503/520-526/530) or fetch-throw, 302-redirects
// to the GitHub Pages static portfolio so visitors still see something.
//
// Mirrors grantsetu-downtime; same logic, different fallback URL.

const TUNNEL_DOWN = new Set([502, 503, 520, 521, 522, 523, 524, 525, 526, 530]);

export default {
  async fetch(request, env, ctx) {
    try {
      const response = await fetch(request);
      if (TUNNEL_DOWN.has(response.status)) {
        return Response.redirect(env.FALLBACK_URL, 302);
      }
      return response;
    } catch (_err) {
      return Response.redirect(env.FALLBACK_URL, 302);
    }
  },
};
