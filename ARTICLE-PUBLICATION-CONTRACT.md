# Publishing an article on truelinefinishes.com

What has to be true for an SEO-engine article to go live on this site, how to prove it before it
goes live, and the three things that are **not** wired yet. Written 25 Nov 2026 (operator review 6)
after running the real importer and the real renderer against a throwaway batch end to end.

Nothing in here publishes anything. Publication of a real article still needs the operator's word.

---

## 1. The path, as it actually works today

```
SEO engine run                      scripts/import-articles.mjs            Astro build            deploy
clients/truelinefinishes.com/        reads the accepted artefacts,          src/pages/resources/   npm run deploy
  <run>/work/rank-N-*.json     --->  writes src/data/articles.json    --->  [slug].astro      ---> Worker
                                     (status "review" unless --publish)     + ArticlePage.astro    site-truelinefinishes
```

* **URL contract.** The engine writes `slug = <hub>-<town>`; this site serves it at
  `/resources/<hub>-<town>/`. The importer keeps the slug and adds the prefix.
* **Hubs.** `painting-and-decorating`, `interior-painting`, `exterior-painting`, `wallpapering`,
  `commercial-painting-and-decorating`. `ctx.row.serviceSlug` must be one of those five or the
  importer throws.
* **Status gate.** Everything lands at `review`: the route builds, but it is `noindex`, out of
  `sitemap-0.xml`, and linked from nowhere. `--publish <slug,...>` is the only thing that flips it,
  and an article already `published` stays published across re-imports.
* **Rejects.** `accepted: false` or `exportBlocked: true` is skipped and never built.
* **Photographs.** Local WebP under `/images/<category>/`, built by `npm run images` from
  `site-images/customers/trueline-finishes/`. The site does **not** fetch images from R2 at runtime
  and does not use an `r2.dev` URL.

## 2. What the importer rewrites, and why

| The engine writes | What happens | Why |
|---|---|---|
| `introHtml` containing an inline-styled `<div>` with **The Quick Answer** and a `<ul>` | the bullets are lifted into `rundown` and the box is removed from the intro | the site renders its own Quick Rundown panel, and `scripts/audit.mjs` requires one on every article. Without this lift the **first engine article would have failed the audit and blocked the release**. |
| `bodyHtml` ending in `<div data-lmb="cta" style="background:#f7f9fc;border-left:…">…<a href="tel:01306252266">` | rebuilt at render into the site's own pill buttons, `#contact` and Brandon's number (`src/lib/article-body.js`) | all 838 engine articles on this box carry that block with **another client's palette, URL and telephone number**. |
| any other inline `style="…"` in the body | dropped at render | presentation belongs to the stylesheet; an inline colour also dodges `scripts/token-gate.mjs`, which only reads `src/`. |
| absolute `https://www.truelinefinishes.com/...` links | made relative; sibling article links get the `/resources/` prefix | — |
| `schemaJsonLd` FAQPage | becomes the article's FAQ section and its own FAQPage schema | — |

An accepted article with **no** Quick Answer box is reported by the importer as a `WARNING` and will
fail `scripts/audit.mjs` until one is supplied. That is deliberate: it stops silently.

## 3. Photographs: the honest per-service inventory

`npm run articles:pool` prints it. On 25 Nov 2026, from 194 photographs of Brandon's own work:

| Hub | Subjects accepted | Figures an article can carry |
|---|---|---|
| painting-and-decorating | interior, exterior, wallpapering, commercial | **187** |
| interior-painting | interior | **147** |
| exterior-painting | exterior | **31** |
| commercial-painting-and-decorating | commercial | **6** |
| wallpapering | wallpapering | **0** |
| fencing (hub 6, added 25 Nov 2026) | *none declared* | **0** |

Rules, enforced by `src/lib/article-photos.js` and proved on the built page by `scripts/audit.mjs`:

* A hub takes **only its own subjects**. There is no fallback chain. An Interior Painting article
  cannot be illustrated with a gable wall; a Wallpapering article cannot be padded with interior
  painting shots.
* A photograph named `*-before-*` is never a figure above an H2 (it shows the problem, not the work).
* One photograph per H2, **no repeats on a page**, and the hero is never reused in the body.
* When a hub's pool runs out, the remaining H2s carry **no figure** rather than a repeat or a borrow.

**Open content gap — fencing (hub 6).** The site plan added Fencing on 25 Nov 2026 (commit
`542315e`, D-2026-11-25-01) and contemplates 116 fencing town articles inside a 696-article budget
(462 in the first 77-town batch, 234 in the second 39-town batch). **None has been generated,
published or queued**, and none should be until the publication path in section 5 is commissioned.
What IS wired, so that a future batch cannot go wrong quietly:

* `fencing` is a known hub in `scripts/import-articles.mjs`, so a batch with `serviceSlug: fencing`
  imports instead of throwing, into `/resources/fencing-<town>/` like every other hub.
* Its accepted photo subjects in `src/lib/article-photos.js` are **deliberately empty**: TrueLine has
  no photograph of fencing it has put up, so a fencing article carries its hero and **no body
  figures**. That is the honest answer and it is the same rule, not an exception — the renderer and
  the audit gate read the same list, so a fencing article can never borrow an interior or exterior
  photograph to fill itself out.
* Its hero, `painted-railings-0181` (the railings and gate Brandon painted at a property boundary),
  is marked in the code as a **stand-in** and should be replaced the moment a fencing album arrives.
* `scripts/audit.mjs` requires a figure above all but one H2 on a **published** article, so a fencing
  article would have to stay at `review` status, or arrive with a real fencing album behind it,
  before it can be published. That is the gate doing its job, not a blocker to work around.

**The ask: a fencing album from Brandon**, the same way the 195 painting photographs arrived.

**Open content gap — wallpapering.** TrueLine has exactly one wallpapering photograph in R2 and it is
already that hub's hero, so a wallpapering article ships with its hero and no body figures. The R2
bucket was listed on 25 Nov 2026 and the 10 uncategorised objects in `gallery/` were inspected: they
are another decorator's website screenshot, two logo wordmarks, two photographs with a person in
them, a rotten-frame close-up and four near-duplicate frames of jobs already on the site. **None is a
wallpapering photograph.** Commercial is also thin at 6. Both need more photographs from Brandon
before those hubs get a figure-rich article; stock and generated imagery are banned on this site.

## 4. The pre-flight, before a batch is approved

Run from the repo root, in this order. Every one of these was run on 25 Nov 2026 against a throwaway
batch of three engine-shaped articles (4, 3 and 7 H2s, plus one deliberately rejected rank).

```bash
npm run articles:pool                 # does each hub in the batch have the figures its H2s need?
node scripts/import-articles.mjs <run> --engine /root/audit/claude-seo-engine
                                      # imports at REVIEW status; read every WARNING line
npm run build                         # the routes must appear in the build log
node scripts/audit.mjs                # 0 fails, including the round-6 article photo and body gates
node scripts/token-gate.mjs           # 0 violations
node scripts/contrast.mjs /resources/<slug>/ …      # pass each new route explicitly: the default
                                      # list does not include it, and this is what caught the
                                      # in-article CTA reading 1.45:1 on 25 Nov
node scripts/hero-heights.mjs         # the new routes take the shared inner hero height
node scripts/check.mjs                # 26+ routes x 2 widths
```

Then, on the built pages, confirm by eye and by grep:

* `grep -L 'content="noindex' dist/resources/<slug>/index.html` — a review article MUST be noindex
* `grep -c '<slug>' dist/sitemap-0.xml` — 0 while in review, 1 once published
* `grep -c 'href="/resources/<slug>/"' dist/resources/index.html` — 0 in review, 1 once published
* every `src="/images/…"` in the page resolves to a file in `dist/`
* the in-article CTA says **Quick Quote Online** to `#contact` and **Call 07949 484274** to
  `tel:+447949484274`, in the site's pills — and the page contains no other telephone number

Publication is then one command and one deploy:

```bash
node scripts/import-articles.mjs <run> --engine … --publish <slug>
npm run build && node scripts/audit.mjs && npm run deploy
```

## 5. What is NOT wired — these need the owner's decision

1. **Nothing rebuilds or redeploys this site on a push.** There is no GitHub Actions workflow in this
   repository and the Worker serves a pre-built `dist/`. A commit to `main` changes nothing that a
   visitor can see until somebody runs `npm run build && npm run deploy`. **A scheduled publisher that
   only commits a file will publish nothing here.**
2. **`worker-drip-worker` cannot publish to this site as it stands.** Four separate mismatches, each
   needing a change to that worker (a different repository — not touched by this pass):
   * its `REGISTRY` has `aim2aid.co.uk`, `heatingservicesltd.co.uk` and `weyvalleyroofing.co.uk`.
     `truelinefinishes.com` is not in it.
   * it commits `src/content/resources/<slug>.md`. This site has **no** `src/content/` and no Astro
     content collection; such a file would sit in the repository inert and render nothing. This site
     reads `src/data/articles.json`.
   * its image pool is R2 `<clientKey>/<category>/` with `clientKey = truelinefinishes`, and
     `site-images/truelinefinishes/` holds **zero objects** (verified 25 Nov 2026). TrueLine's
     photographs live under `customers/trueline-finishes/`, there are no `_hero/` subfolders, and its
     `general/` fallback is empty too. It would publish articles with no images at all.
   * it writes `<img src="<PUBLIC_BASE>/<r2 key>">`, i.e. an `r2.dev` URL. This site serves its own
     local WebP and has no public R2 base.
   Its service taxonomy also differs: it keys images on the D1 `category` column (boiler/gas/drain
   families), while this site's photographs are categorised by subject (interior, exterior,
   commercial, wallpapering, before-after) and its articles by hub.
3. **The publisher contract therefore cannot be proved end to end from D1 to a live page.** What has
   been proved is everything from the engine's artefacts onward: importer, schema, routes, status
   gate, photographs, CTA, sitemap, noindex, links and build. The D1 → repository → deploy half needs
   either the drip worker taught this site's contract, or a different trigger. **Not claimed as
   working.**

## 6. The three articles that are already live

`painting-and-decorating-baildon`, `painting-and-decorating-guiseley` and `interior-painting-ilkley`
were written by hand at build time, not by the engine (`engine.runId: "site-build-r2"`). They keep
their URLs and their `published` status. The authorised SEO-engine pass over them is still owed.
