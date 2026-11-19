// TrueLine Finishes Worker: Brandon's static site (./dist, served by Workers static assets) plus the
// permanent redirects for retired URLs. Assets that exist are served without running this script
// (run_worker_first is off); it only sees requests that match no file, so it never slows a page.
//  - /home-2/ and /home-3/: the temporary homepage variants (5 Nov 2026). Vince picked Home 3 and the
//    regular homepage was rebuilt in its design (19 Nov 2026), so both 301 to the homepage.
//  - /complaints/: the short name for the Complaints Procedure (STD-PAGES round, 5 Nov 2026).
// Everything else goes to the assets binding, which answers 404 with the site's own 404 page.
const RULES = [
  [/^\/home-[23](?:\/(?:index\.html)?)?$/i, '/'],
  [/^\/complaints(?:\/(?:index\.html)?)?$/i, '/complaints-procedure/'],
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    for (const [re, to] of RULES) {
      if (re.test(url.pathname)) return Response.redirect(`${url.origin}${to}${url.search}`, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
