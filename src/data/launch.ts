/**
 * LAUNCH INTERLOCK. false = test build: every page `noindex, nofollow` and
 * robots.txt disallows everything. Flip to true only on the operator's go-live,
 * together with public/robots.txt (see GO-LIVE-CLOUDFLARE-LAW.md).
 *
 * true since the production order (Vince, 26 Oct 2026): this build is the
 * site-buildingsforlifeltd Worker on buildingsforlife.com (the correct domain,
 * Vince 27 Oct; buildingsforlifeltd.com was the wrong one). Utility pages
 * (thank-you, 404) stay noindex, and public/_headers keeps the workers.dev
 * copies out of Google.
 */
export const INDEXABLE = true;
