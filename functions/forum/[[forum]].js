export async function onRequest(context) {
  const url = new URL(context.request.url);
  const forumUrl = "https://forum.dragonaere.net";

  const forwardUrl = forumUrl + url.pathname + url.search;

  try {
    const response = await fetch(forwardUrl, {
      method: context.request.method,
      headers: context.request.headers,
      body: context.request.method === 'POST' ? await context.request.text() : null,
    });

    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    });
  } catch (error) {
    return new Response('Error connecting to forum', { status: 500 });
  }
}
