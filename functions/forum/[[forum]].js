export async function onRequest(context) {
  const url = new URL(context.request.url);
  const forumUrl = "https://forum.dragonaere.net";
  
  const strippedPath = url.pathname.replace(/^\/forum/, '');
  const forwardUrl = forumUrl + strippedPath + url.search;

  try {
    const response = await fetch(forwardUrl, {
      method: context.request.method,
      headers: context.request.headers,
      body: context.request.method === 'POST' ? await context.request.text() : null,
    });

    // If the response is HTML, modify the URLs of static resources (e.g., /js, /css) to include /forum
    if (response.headers.get('Content-Type')?.includes('text/html')) {
      let html = await response.text();

      // Modify <script> and <link> tags to include the /forum prefix for static assets
      html = html.replace(/(href|src)="\/(js|css|images)\/([^"]+)"/g, '$1="/forum/$2/$3"');

      // Return the modified HTML response
      return new Response(html, {
        status: response.status,
        headers: {
          ...response.headers,
          'Content-Type': 'text/html; charset=UTF-8',
        }
      });
    }

    // Return the response as is for non-HTML content
    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    });

  } catch (error) {
    return new Response('Error connecting to forum', { status: 500 });
  }
}
