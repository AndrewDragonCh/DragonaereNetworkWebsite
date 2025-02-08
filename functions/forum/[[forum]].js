export async function onRequest(context) {
  const url = new URL(context.request.url);
  const forumUrl = "https://forum.dragonaere.net";

  // Strip the '/forum' prefix from the URL path
  const strippedPath = url.pathname.replace(/^\/forum/, '');

  // Create the full URL to forward the request to XenForo
  const forwardUrl = forumUrl + strippedPath + url.search;

  try {
    // Forward the request to the forum
    const response = await fetch(forwardUrl, {
      method: context.request.method,
      headers: context.request.headers,
      body: context.request.method === 'POST' ? await context.request.text() : null,
    });

    // Return the proxied response
    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    });
  } catch (error) {
    return new Response('Error connecting to forum', {
      status: 500
    });
  }
}
