export default {
  async fetch(request) {
    let url = new URL(request.url);

    if (url.pathname.startsWith("/forum")) {
      // Proxy requests to XenForo at forum.dragonaere.net
      return fetch("https://forum.dragonaere.net" + url.pathname + url.search, {
        headers: request.headers
      });
    }

    // Serve React static site for everything else
    return fetch("https://www.dragonaere.net" + url.pathname + url.search, {
      headers: request.headers
    });
  }
};
