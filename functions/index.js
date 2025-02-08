export const onRequest = [
  // Handle /forum routes for XenForo
  {
    matcher: '/forum/*',
    async handler(context) {
      const url = new URL(context.request.url);
      const forumUrl = "https://forum.dragonaere.net";

      // Proxy requests to XenForo at forum.dragonaere.net
      try {
        const response = await fetch(forumUrl + url.pathname + url.search, {
          method: context.request.method,
          headers: context.request.headers,
          body: context.request.method === 'POST' ? await context.request.text() : null, // Handle body for POST requests
        });

        // Return the proxied response
        return new Response(response.body, {
          status: response.status,
          headers: response.headers
        });
      } catch (error) {
        return new Response('Error fetching forum content.', { status: 500 });
      }
    }
  },
  
  // Handle all other routes with Pages (React static files)
  async function(context) {
    return context.env.ASSETS.fetch(context.request);
  }
];
