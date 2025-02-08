export const onRequest = [
  // Handle /forum routes for XenForo
  {
    matcher: '/forum/*',
    async handler(context) {
      const url = new URL(context.request.url);
      return fetch("https://forum.dragonaere.net" + url.pathname + url.search, {
        headers: context.request.headers
      });
    }
  },
  // Handle all other routes with Pages
  async function(context) {
    return context.env.ASSETS.fetch(context.request);
  }
];