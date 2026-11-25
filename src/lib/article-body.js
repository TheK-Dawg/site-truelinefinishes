/**
 * NORMALISING THE ENGINE'S ARTICLE HTML INTO THIS SITE'S OWN.
 * Shared by ArticlePage.astro (renders it) and scripts/audit.mjs (proves it on the built page).
 *
 * OPERATOR REVIEW 6 (25 Nov 2026), on the resources path the SEO engine will publish into: an
 * engine article must carry "the same styled in-article CTA as the rest of the site".
 *
 * Why this exists. Every article the engine has ever written - 838 of 838 in
 * /root/audit/claude-seo-engine/clients on 25 Nov 2026 - ends its body with a hard-coded call to
 * action of the form
 *     <div data-lmb="cta" style="background:#f7f9fc;border-left:4px solid #9e9e9e;...">
 *       <p><strong>...one sentence about this job in this town...</strong></p>
 *       <p><a href="https://<that client>/<slug>/#contact" style="...#9e9e9e...">Quick Quote Online</a>
 *          <a href="tel:01306252266" style="...#000000...">Call Now: 01306 252266</a></p>
 *     </div>
 * carrying ANOTHER client's palette, another client's absolute URL and another client's telephone
 * number, all as inline styles that no stylesheet on this site can reach. Dropped in raw it would
 * have been the one block on the page that does not look like TrueLine, with a number that is not
 * Brandon's.
 *
 * So: the engine's SENTENCE is kept (it is the only part that is about this article), and the
 * furniture around it is rebuilt in the site's own markup - the same pill buttons, the same Quick
 * Quote Online wording, the same `#contact` anchor to the form at the foot of the page and the one
 * TrueLine number. Every other inline `style` attribute in the body is dropped as well, because
 * presentation on this site belongs to the stylesheet, and an inline colour is a token-law breach
 * the token gate cannot see (it only reads src/).
 *
 * Hand-written articles carry none of this and pass through untouched.
 */

/** Visible text of a fragment, for lifting the engine's own sentence out of its CTA block. */
function textOf(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * @param {string} html      the article body (intro + sections) as stored
 * @param {{phone: string, phoneHref: string}} business
 * @returns {string} the body in this site's own markup
 */
export function normaliseArticleBody(html, business) {
  let out = html;

  // 1. The engine's CTA block -> the site's own. Keep its sentence, drop its furniture.
  out = out.replace(/<div[^>]*data-lmb="cta"[\s\S]*?<\/div>/gi, (block) => {
    const first = block.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const line = first ? textOf(first[1]) : '';
    const lead = line && !/^(quick quote|call now)/i.test(line) ? `<p class="art__inline-cta-p">${line}</p>` : '';
    return `<div class="art__inline-cta" data-lmb="cta">${lead}<p class="art__inline-cta-actions">`
      + `<a class="btn btn-primary" href="#contact" data-cta="article-body-quote"><span class="btn__t">Quick Quote Online</span></a>`
      + `<a class="btn btn-call btn-call--light" href="${business.phoneHref}" data-cta="article-body-call"><span class="btn__t">Call ${business.phone}</span></a>`
      + `</p></div>`;
  });

  // 2. No other telephone number may appear in an article body (the engine hard-codes the client's
  //    number into its CTA; anything left over after step 1 is somebody else's line).
  out = out.replace(/href="tel:[^"]*"/gi, `href="${business.phoneHref}"`);

  // 3. Presentation belongs to the stylesheet. Drop every inline style attribute (this also removes
  //    the engine's border-left, which the house law of 30 Sep 2026 bans).
  out = out.replace(/\s+style="[^"]*"/gi, '');

  return out;
}
