export function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.pathname.startsWith("/forum")) {
    // Proxy requests to XenForo at forum.dragonaere.net
    return fetch("https://forum.dragonaere.net" + url.pathname + url.search, {
      headers: context.request.headers
    });
  }

  // Let Pages handle static assets and other routes
  return context.env.ASSETS.fetch(context.request);
}