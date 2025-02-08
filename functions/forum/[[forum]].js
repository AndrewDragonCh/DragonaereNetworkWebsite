export async function onRequest(context) {
  const url = new URL(context.request.url);
  const forumUrl = "https://forum.dragonaere.net";

  try {
    // Forward the request to the forum
    const response = await fetch(forumUrl + url.pathname + url.search, {
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
