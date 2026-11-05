# SITE PLAN — TrueLine Finishes (new site on truelinefinishes.com + SEO articles)

**STATUS: APPROVED (the operator, 4 Nov 2026). Fingerprint `7495853204d1a803`, recorded in
`site-plan/APPROVED-BY-OPERATOR`.** Ready to go to Vincent (who builds the site, with his AI). Only
the operator writes that file — Vincent should not build from this plan unless it is present with a
matching fingerprint. Rebuilt on 4 Nov 2026 from Brandon's own WhatsApp messages, on the operator's
brief, and updated the same evening on the operator's second instruction (the commercial hub
retitled; the videos placed; opening hours; the WhatsApp number; the research bought:
D-2026-11-04-07). That instruction also added a sixth hub, Kitchen Renovation and Installation,
which the operator dropped again that night, on learning that no source has Brandon fitting kitchens
(D-2026-11-04-10): the plan is back to five hubs. Later that night the operator settled the towns
(D-2026-11-04-11): a 15-mile radius from Brandon's own words, the Lancashire and Rochdale towns gone,
the places he named first and Bradford last, 77 towns. The operator's last edit before approving
(D-2026-11-04-12) made Buildings for Life the structural template, in place of Vision Plumbing, and
added a second batch of 39 towns out to 20 miles, published after all 77: **5 hubs × 116 towns =
580 articles, the first 385 (the 77 towns, in the same order) unchanged.** Every edit to `nap.json`
or `services-override.json`, and every re-run, is the operator's, in this repo (site-planner);
Vincent builds from the approved `seed.json` and this file. Nothing in "Read first" is left to
decide, and the open items are questions for Brandon and the operator's own tasks: none stops the
build starting. A re-run that changes the plan changes its fingerprint, and then the approval no
longer covers it. The generated REVIEW-BRIEF.md and the notices in PROVENANCE.md are records: where
their wording differs from this file (Section 2 lists where), this file wins.

**How this file is laid out.** **Section 1, The Site Plan,** is everything needed to build the site:
read it top to bottom. **Section 2, Additional Info,** is at the very bottom, under the heading
"SECTION 2 — ADDITIONAL INFO". It is the record: where each fact came from, Brandon's messages word
for word, what the brief said and where his messages differ, exact counts, decision IDs, what
changed and when, and the validator history. Nothing in Section 2 is needed to build.

---

# SECTION 1 — THE SITE PLAN

**Words used here:** a **hub** is a service's own page (five of them); an **SEO article** is one page
per hub per town ("Exterior Painting in Guiseley"); **`seed.json`** is this plan in machine-readable
form, which the article engine and the build read; the **standing prohibitions** are 24 rules every
page follows, listed word for word in `seed.json` `negativeTopics` with this site's 9 additions (33 in
all); a **blueprint** is the outline the firms ranking in London for a hub's phrase share (bought on
4 Nov 2026, in `blueprints/`); **the Jev pass** and **`npm test`** are this repo's automatic checks;
**re-run** means re-running this repo's free planning steps after an edit to `nap.json` or
`services-override.json`; **the pool** is Brandon's own job photos (Images); **Business Info** is what
`seed.json` says about the business (the NAP, the USPs, the services, the trust anchors and the hub
content notes), which the standing prohibitions measure against. Where `seed.json` and this file
differ, the seed decides which hubs and towns exist and which content sections a page carries; this
file decides their order, form and wording, adds the blocks every page of the build has (Layout),
and is the only source for the pages the seed does not hold (the legal pages).

## The business
TrueLine Finishes is Brandon Dawson's painting and decorating business, working across the places on
his own list (Towns), most of them in West and North Yorkshire: interior and exterior painting, wallpapering and careful surface preparation, for homes and
businesses, from individual rooms to full property redecorations (Brandon's own advert). Over eight
years' experience. Fully insured. Brandon is the expert on every job: he carries
out the work and oversees every job, and a call is a direct line to him (the operator, 4 Nov 2026).
For now the site is painting and decorating only: Brandon has ruled plastering out (flag 12).

Domain `truelinefinishes.com`, bought at GoDaddy; a brand-new site, with no old site to copy or
redirect. The machine-readable deliverable is `site-plan/seed.json`; this file is the human-readable
brief for Vincent and his AI, and the reason the seed says what it says. Towns with distances and
populations: `towns.json`. Logo files: `sites/truelinefinishes.com/brand/`. Source trail:
`PROVENANCE.md` and Section 2.

**NAP** (Brandon's own message of 27 Oct 2026, word for word: "Phone number : 07949 484274 / Email
Brandon@truelinefinishes.com / Website that will be Www.truelinefinishes.com"):
- Name: **TrueLine Finishes**: "TrueLine" one word with a capital L, then "Finishes", exactly as on
  Brandon's real Google Business Profile (the operator, 4 Nov 2026:
  https://www.google.com/maps/place/TrueLine+Finishes/@53.8447197,-1.7533232,17z), and re-confirmed by
  the operator that evening ("True Line is one word", "a capital L for the line part"). No "Ltd".
  Brandon's own messages, his advert and his YouTube channel spell it "Trueline"; quotes of his words
  keep his spelling, and everything the site says uses the listing's.
- Phone: **07949 484274**, the site's one number, on every page and in every directory. Not the
  number Brandon messages from (07706 215917), which is his own mobile and goes nowhere on the site.
  Matches the Google listing.
- WhatsApp: **07949 484274**, the same business number, for the click-to-chat button
  (`https://wa.me/447949484274`; the operator, 4 Nov 2026: "we'll use his phone number that's on this
  one, the one that ends in 274 ... because then that's his business one"). Never 07706 215917.
- Email: **Brandon@truelinefinishes.com**, on the Contact page and in the footer (he gave it for the
  website). It is a new Google Workspace mailbox: check it receives mail before launch (Contact).
- Website: **www.truelinefinishes.com**.
- Address: **Briar Rhydding, Charlestown, Baildon, Shipley BD17 7JW, United Kingdom** (the
  operator, 4 Nov 2026, from the real Google Business Profile). For the Google listing and
  directories only, never shown on the site (standing prohibition 10: say where the business
  works, never where it is based).
- GBP: confirmed, mapsUrl `https://maps.app.goo.gl/47CXTvHKMybPQHkR9`, CID `8023434379390696838`.
  Name, phone and address on the listing match the site.
- Hours, from the Google listing (the operator, 4 Nov 2026; `nap.json` `hours`): **open seven days a
  week**.

  | Day | Hours |
  |---|---|
  | Monday | 7am-7pm |
  | Tuesday | 7am-7pm |
  | Wednesday | 7am-7pm |
  | Thursday | 7am-7pm |
  | Friday | 7am-7pm |
  | Saturday | 8am-6pm |
  | Sunday | 8am-6pm |

  On the Contact page, in the footer and in the schema, exactly as listed. They are opening hours,
  not a promise of when work on site is done or how fast anyone replies (site prohibition 5,
  standing prohibition 6).

## Business model & priority service
- **Monetization: CLIENT SITE** (`site.mode = "client"` in seed.json, `mode: "client"` in
  nap.json). This is TrueLine Finishes' own marketing site: their job, their quote. Enquiries go
  straight to TrueLine Finishes, which prices and does the work itself (Brandon, with his brother
  working for him "more or less full time" and "another lad", 2 Apr call). It is not a lead-gen asset, so nothing on
  it should read like a directory or a referral service. (A second site under another name, passing
  enquiries to Brandon, was floated on the 23 Oct call as a future idea; it is not this site.)
- **Priority / headline service: PAINTING AND DECORATING, the whole trade, for homes and
  businesses** (`site.niche = "decorating"`; `site.vertical = "Painter and decorator"`; the Painting
  and Decorating hub is pinned first in services-override.json, so it is `services[0]` and the trade
  head term is "painting and decorating"). The homepage headline, title tags and schema
  (`serviceType`) lead with painting and decorating (the operator, 4 Nov 2026: "Just say Painting and
  Decorating. That's fine", not "painter and decorator"); the other four hubs are its parts: three
  kinds of work and the commercial side. In
  Brandon's words: "just domestic and commercial clients all aspects of painting and decorating".

## Read first: flags and decisions
1. **Resolved (the operator, 4 Nov 2026, and re-confirmed that evening): the name is "TrueLine
   Finishes"**, confirmed against Brandon's real Google Business Profile: "TrueLine" one word with a
   capital L, then "Finishes". This overrides the earlier "Trueline Finishes" (lower-case l) inferred
   from his logo and advert; the listing is the authority, since it must match the site exactly. The registered company name is still not settled (the
   23 Oct call's notes have Brandon checking it at Companies House). The exact spelling matters: a
   different business called TrueLine trades in Eastbourne (2 Apr call).
2. **Resolved (the operator, 4 Nov 2026): address confirmed.** Briar Rhydding, Charlestown, Baildon,
   Shipley BD17 7JW, United Kingdom — from Brandon's real Google Business Profile. In `nap.json` and
   `seed.json` (the seed's contract requires an address); never shown on the site: standing
   prohibition 10, which the seed carries, keeps it off every page, and `"addressDisplay": "no"` is in
   `nap.json` for the build.
3. **Resolved (the operator, 4 Nov 2026): Baildon confirmed as the base town**, not just inferred.
   The real address above is in Baildon itself, exactly matching the earlier inference from his
   "close to home" list and the 2 Apr call ("I've lived there most of my life"). It decides only
   where the 15-mile proximity fill after the places he named, and the 20-mile second batch after
   it, are measured from, and which town the home page's local research is for; it is never printed
   (standing prohibition 10).
4. **Resolved (the operator, 4 Nov 2026): Brandon's Google listing is confirmed.** Maps URL
   `https://maps.app.goo.gl/47CXTvHKMybPQHkR9`, CID `8023434379390696838`, in `nap.json` `gbp`. It
   had three reviews on 2 Apr and "a few" more by 28 Sep — the reviews widget and the NAP check key
   on it; its name, phone and address match the site. He also has reviews on MyJobQuote; the site
   points at Google. **The 14 Rated People reviews seen on the 2 Apr call are not his** ("No, that's
   somebody else called TrueLine. They're in Eastbourne."): never link or cite them, and note that a
   second business trades under a similar name.
5. **Resolved (the operator, 4 Nov 2026): Commercial Painting and Decorating is its own hub**, under
   that title ("The commercial painting hub should be Commercial Painting and Decorating"), on
   `/commercial-painting-and-decorating/` (the URL follows the title; nothing was ever published at
   `/commercial-painting/`). It names every kind of business premises, as the operator ruled:
   offices, restaurants, schools, hotels, spas, leisure centres, and local businesses, small and large
   ("He can do it all"), never as past clients. Brandon named commercial clients in writing and his
   advert says "homes and businesses" and "COMMERCIAL". The title is 34 characters, over the
   28-character article-title advisory, and the bare "decorating" its second half brings in rides as
   a body-target variant (as "painting" does on the headline hub); both accepted with the title.
6. **Resolved (the operator, 4 Nov 2026, night): the places Brandon named publish first, Bradford
   last of the first 77 towns** (D-2026-11-04-11; the full order is under Towns, below). First his 18
   "close to home", in his order; then Leeds and Skipton, the two places he said on the 2 Apr call he
   would target ("otley leads [Leeds] ilkley menston skipton") that are not already in the 18; then the
   rest of the places he named, nearest first, Pool-in-Wharfedale among them; then every town of
   1,000+ people within 15 miles of Baildon, closest first; and **Bradford last of these 77**. The
   second batch (flag 8) follows all 77, Bradford included. On 2 Apr he said places
   "like shipley or bradford" are ones he "wouldn't target", because he knows people there and they
   lowball him; the operator's ruling is to keep Bradford, since he never said drop it and his 30 Oct
   list names it, but to "put that one near the end of where to publish". **Shipley stays 5th**: his
   written list of 30 Oct puts it among the close-to-home ones, and the later, written list wins.
   Eight of his places (Harden, Idle, Burley Woodhead, Hawksworth, Rawdon, Wrose, Headingley, Meanwood)
   are not in the repo's town dataset at all; they are in the plan with real GeoNames coordinates
   through `townOrder.namedPlaces`, and their population is shown as unknown rather than guessed.
   Knaresborough, Holmfirth, Ripon, York and Northallerton are beyond 15 miles and in because he named
   them.
7. **Resolved (the operator, 4 Nov 2026, night): the eleven Lancashire and Rochdale towns are out.**
   The 20-mile fill had brought in nine Lancashire towns (Earby, Colne, Foulridge, Nelson,
   Barnoldswick, Barrowford, Brierfield, Burnley, Bacup) and two in Rochdale (Littleborough, Wardle).
   No call or message of Brandon's names them, and he headed his own list "West / north yorkshire
   Areas"; the operator: "Those two, Lancashire and Rochdale, we'll drop them". The 15-mile radius
   (flag 8) takes all eleven out of the first 77 by itself, as the nearest, Earby, is 15.2 miles from
   Baildon. The 20-mile second batch (flag 8) keeps them out by county: `nap.json`
   `townOrder.laterBatches` takes towns only from the five West Yorkshire districts (Bradford,
   Calderdale, Kirklees, Leeds, Wakefield) and North Yorkshire, the only other authorities inside 20
   miles. None of the eleven is anywhere in the plan.
8. **Resolved (the operator, 4 Nov 2026, night): a 15-mile radius for the first 77 towns (385
   articles), then a second batch out to 20 miles, so 5 hubs × 116 towns = 580 articles**, under the
   standing 900. Asked on the 2 Apr call what mile radius he is happy to work within, Brandon said "i
   could do a 10 mile radius 15 mile but then that won't cover like knaresborough ... harriga
   [Harrogate] um york". The operator's ruling: "He said a flat 10-15-mile radius so in his case we'll
   go for a 15-mile radius", the top of his range. The places he named override the radius by name,
   not by number: those beyond it are in (flag 6), and Bradford, inside it, publishes last of the 77.
   `nap.json` `coverageEvidence` records the quote and the ruling. Then, the operator's last edit
   before approving (D-2026-11-04-12): "I would actually like you to extend it to a 20-mile radius because
   there are only 385 articles ... add the new extra towns that are the furthest away. Add them to be
   published at the end so whenever those 385 run out these new towns would take over." So the 39
   West and North Yorkshire towns from 15.6 to 19.7 miles, the ones the 15-mile radius had taken out,
   are back as a **second batch**: towns 78 to 116, closest first, published after all 77 (Towns). The
   first 77, their order and their 385 articles are unchanged.
9. **Resolved (the operator, 4 Nov 2026): the WhatsApp button uses 07949 484274**, the business
   number on the site, not 07706 215917, which Brandon messages from (Contact). Build it and show it.
   Before launch, tap it on a phone: if 07949 484274 is not on WhatsApp the chat will not open; then
   hide the button until Brandon has WhatsApp or WhatsApp Business on that number, and never fall back
   to 07706 215917.
10. **Two logos, one primary, and Vincent may redo it.** Brandon sent his wordmark twice on 26 Oct:
    first with TRUELINE in silver chrome and FINISHES in blue ("This is my logo just Trueline
    Finishes"), then an hour later all in metallic blue ("That's the logo"). The later, all-blue one is
    primary (Brand). Both are compressed JPEGs on solid black (1,600 × 535 and 2,048 × 684), with no
    transparent or vector version. The operator, 4 Nov 2026: Vincent "may need to redo it within the
    exact same style but to make it suitable for the site": recreate it at a resolution the site needs,
    in exactly the same style, if the files are not sharp enough (Brand). Ask Brandon for the original
    file first.
11. **The quote form is built exactly as Brandon listed it on WhatsApp on 28 Oct** (Contact). The
    operator re-confirmed it on 4 Nov 2026, deliberately over the form talked through on the 2 Apr
    call: "we'll keep it as what he asked for in the WhatsApp messages because that's the most recent
    one". Not an oversight; nothing added.
12. **Two typing slips, read the obvious way.** In his close-to-home list, "Mention" is Menston (on
    his main list and both earlier calls, between Guiseley and Burley in Wharfedale). In "rather then
    planting as well", "planting" is plastering: the 23 Oct call's notes list plastering, silicone
    rendering and Venetian plastering among his services, and his brother, who helps him, is a
    plasterer by trade. So plastering, applying render, silicone rendering and Venetian plastering
    are out for now; **painting existing render, brick or stone stays in** (Exterior Painting).
13. **The YouTube videos are placed (the operator, 4 Nov 2026).** Their titles, read from YouTube on
    4 Nov: the first link is the kitchen video ("Full kitchen renovation #painting #kitchen", a
    portrait Short), the second the house video ("Full house panting and decorating #harrogate
    #painting #house", his typing slip). The kitchen video goes on the home page (Brandon's pick) and
    nowhere else: its hub-page and article placements went with the kitchen hub (D-2026-11-04-10). The
    house video goes on the Painting and Decorating and Interior Painting hub pages and every one of
    their articles, and above the first H2 of "Painting and Decorating in Harrogate". In articles the
    position rotates (Video).
14. **Blueprints: bought on 4 Nov for the hubs and the home page; four are used.** Painting and
    Decorating, Interior Painting, Wallpapering and the home page take their blueprints' headings, with
    fifteen reworded at the source (`nap.json` `blueprintHeadings`), so the seed itself carries no
    heading that claims what Brandon has not: "High-End", "Listed", "Survey", "Joinery", "Repairs",
    "Decorative Finishes", the wallpaper "Installation" headings, "the team", "repairs and restoration"
    are gone; each hub's content note says how to write the rest. The home page blueprint was bought
    while the plan had the kitchen hub, so it gave that hub a heading, "Kitchen renovation and
    installation": it is removed at the source too (`blueprintHeadings`, `null`), and the page keeps
    its other seven. Exterior Painting and Commercial Painting and Decorating do not use theirs
    (`nap.json` `blueprintsNotUsed`): each has headings selling what Brandon does not do ("Masonry,
    Brickwork and Render Repairs"; "Floor Coatings, Carpets ..." and "Spray Painting, Murals ..."), and
    a hub's sections are the outline of every one of its articles. Those two take the default skeleton
    and their content notes. The 2 Nov Interior Painting blueprint, ruled out for plastering and colour
    consultation, is replaced by the 4 Nov one, which has neither. The blueprint file of every hub in
    the plan is research for Vincent's hub pages (Build scope).
15. **Town research: Baildon's is in the seed** (bought 4 Nov, five sourced facts from Bradford
    Council documents: conservation areas and stone terraces, the River Aire and the canal, the mixed
    housing and commercial land), for the home page's local section. It names the base town only as a
    place served, never as where the business is (standing prohibition 10). **Use what the place is**
    (its stone terraces, conservation areas, neighbourhoods, the river, the canal and the moor), **not
    the research tool's own trade guesses** that end several facts ("demand for ... timber repairs",
    "heritage-sensitive repairs", "a local market for ...", "a mixed workload of ..."): the council
    documents say none of that, and timber repair is not offered (site prohibition 3). Harrogate's 2 Nov
    research, from the placeholder-base days, stays held back.
16. **"Over eight years' experience" is the operator's ruling (4 Nov 2026):** "When it says 8 years'
    experience, say over 8 years' experience." Brandon's own answer on 23 Oct was "Eight. Eight."; the
    operator said "over eight years" on that call. The figure is eight either way (standing
    prohibition 3); copy may write "over eight years" or "over 8 years".

## Build scope
- **A new website plus a year of SEO articles** on truelinefinishes.com.
- **Build and hosting:** the operator's standard client build (a static site, built in Astro and
  served through Cloudflare), with **Buildings for Life as the structural template; TrueLine
  Finishes' own brand and colours below, not Buildings for Life's.** The template is
  **buildingsforlife.com** (this repo's folder for that client is `sites/buildingsforlifeltd.com/`),
  the operator's choice on 4 Nov 2026 ("change the template be used so it's not Vision Plumbing but
  it's this one, Buildings for Life, with his colours"; "his" is Brandon); it replaces
  visionplumbing.co.uk, the template until then. Take its structure and layout only. Its colours,
  logo, wording, photos and claims belong to Buildings for Life and none of them is used here: the
  colours and the logo are Brandon's (Brand), and Brandon's own layout asks (below) come first. The
  pages and URLs are this plan's (below), not the template's: Buildings for Life's town pages at the
  root of its site (such as `/house-extensions-hedge-end/`) and its Areas page are not built here.
  The operator's team gives Vincent access and, at launch, the DNS records. **What Vincent is handed:**
  this repo's `sites/truelinefinishes.com/` folder (`site-plan/seed.json`, this file, `nap.json`,
  `site-plan/towns.json`, `brand/`, and the research in `site-plan/blueprints/`, `keywords/` and
  `serp-classified/`), plus the photos from the planning server (Images).
- **The domain** is at GoDaddy; Brandon hands over access when the site is ready (23 Oct call).
- **Pages and URLs:** the home page (`/`); the five hub pages on their locked URLs (Hub pages);
  About (`/about/`); Contact (`/contact/`); the legal pages (`/privacy/`, `/terms/`,
  `/cookie-policy/`, built from this file, not from the seed); and the SEO articles, one per hub per
  town, on this plan's article pattern, `/resources/<hub-slug>-<town-slug>/` (for example
  `/resources/exterior-painting-guiseley/`), which the change of template does not change. **No
  Areas page:** a hub links down to its town articles and each article links up to its hub.
- **Who writes and publishes the articles:** the article engine, from the approved seed after the
  handoff, a few a day from launch, in the seed's town order: the 385 articles of the first 77 towns,
  then the 195 of the second batch (Towns); test articles go to Brandon for comments first (23 Oct
  call).
- **A standard enquiry site:** quote form, phone, email and WhatsApp. No payments of any kind.
- **The research, for the hub pages** (the operator, 4 Nov 2026: "go ahead and buy it, which can be
  used to inform Vincent's content that he makes for the hub pages. Tell us to use that"). Bought on
  4 Nov for the hubs and the home page: `blueprints/<hub>.blueprint.json` and
  `blueprints/home.blueprint.json` (what the firms ranking in London cover: headings, buyer fears, the
  People Also Ask questions they leave unanswered, the terms they use), `serp-classified/` (those
  firms), and `keywords/<hub>.csv` (every phrase with its UK monthly volume). **Use them** when writing
  each hub page and its FAQ, within Brandon's scope: the hub's content note and the "Never" list below
  win over anything a London firm sells. Four blueprints are the seed's outlines (flag 14); the other
  two (Exterior Painting, Commercial Painting and Decorating) are reading only. The 2 Nov files for the
  old hubs (wood staining, plaster repairs, spray painting, wall murals, rendering, varnishing,
  painting) and the 4 Nov kitchen files (`kitchen-renovation-and-installation`, for the hub the
  operator dropped) are not for building from.
- **Timeline** given on the 23 Oct call: about two to three weeks to build, content first.

## What Brandon asked for, in his own words
Build these; each is placed in Layout and Images below.
- **A before-and-after slider** (23 Oct): "i like the adjusting photo ie the before and after image of
  this that you an slide so love to add this to website" (of a slider on another decorator's services
  page), then, with his pictures: "These are the before and after images I'd like and exterior and
  interior sliding image if possible."
- **The top of the page** (23 Oct): "i also like how the websites you shown was laid out with call to
  action and quote form and phone number with the video at the top".
- **Three tiles** (23 Oct, with a photo of another decorator's site as the reference): "Something
  adding like this as well with wall specialized covering, interior & Exterior work and Domestic &
  Commercial". The reference's tiles read "Specialist Wallcoverings", "Interior & Exterior Work" and
  "Domestic & Commercial".
- **The quote form's options** (28 Oct; Contact).
- **The charity** (27 Oct): "Also can we add this to website I've sponsored / donated to the
  following" (The charity, below).
- **The home-page video** (3 Nov): "Two videos uploaded to YouTube unsure what will be the best maybe
  the first link as video on home page".

## Contact, quote form, calls to action and the WhatsApp button
- **Calls to action** name Brandon and the ways in: "Get a free quotation: call Brandon on 07949
  484274 or use the quote form." ("Free quotation" is his own advert's word.) Calling is a direct line
  to Brandon, and the site says so (the operator, 4 Nov 2026: "Whenever you call, you have a direct line
  to Brandon"). WhatsApp, on the same number, joins them (flag 9). Keep the phone and the quote request
  visible on mobile at all times.
- **The quote form, exactly as Brandon listed it on 28 Oct** ("For the dropdown. Can we offer
  following, exterior work / Bedroom / Living room / Kitchen / Hallway / Bathroom / Home owner or
  tenant / Postcode / Short description"):
  1. A dropdown of the work, in his order and his words: **Exterior work, Bedroom, Living room,
     Kitchen, Hallway, Bathroom**.
  2. **Home owner or tenant**: a two-option choice, Home owner / Tenant.
  3. **Postcode**.
  4. **Short description**: a free-text box.
  Plus the contact fields every quote form needs to return an enquiry: **name, phone and email**.
  They are not in his list, and without them no enquiry can be answered. Nothing else: no budget, no
  timescale (the 2 Apr call's form idea of interior or exterior, room and timescale is superseded by
  his own list).
  **Re-confirmed by the operator on 4 Nov 2026, deliberately over the version talked through on the
  phone, not an oversight:** "we'll keep it as what he asked for in the WhatsApp messages because
  that's the most recent one".
- **Where enquiries go:** by email to **Brandon@truelinefinishes.com**, the moment they are sent. It
  is a new Workspace mailbox: test-submit before launch. If it is not receiving mail yet, route the
  form to the older address on his printed advert, Brandon.trueline@gmail.com, until it is, and never
  print that one on the site. Wire the form the way the operator's other builds are (the operator's
  team supplies the form endpoint and the anti-spam key privately). Accept a little spam rather than
  filter hard: on the 23 Oct call the operator advised against aggressive filtering because it also
  cuts real enquiries (5-10% of them, the 1 Nov plan's figure). A WhatsApp alert for each enquiry
  is planned for later, not part of this build.
- **The thank-you page:** "Thanks: we've got your enquiry and Brandon will be in touch. Want to talk
  now? Call Brandon on 07949 484274." No response time and no "our team" (standing prohibitions 1 and
  6, and site prohibition 6).
- **A WhatsApp click-to-chat button** in the bottom-right corner on mobile (the 23 Oct call's notes),
  opening a chat with **07949 484274** (`https://wa.me/447949484274`), never 07706 215917 (flag 9).
  Build it and show it; test it on a phone before launch, and hide it if the chat does not open
  (flag 9).
- **The Contact page** (`/contact/`): the name, the phone, the email, the WhatsApp button, the opening
  hours (NAP, exactly as on the Google listing), the quote form. The seed's NAP block has no field for
  the email, the WhatsApp number or the hours: take them from here and `nap.json` (the seed's Contact
  page has an `hours` section for the hours). No address.
- **Schema:** `HousePainter` on the home page, with the name, the phone, the URL, the five services,
  `areaServed` as the towns in the plan, and `openingHoursSpecification` (Mo-Fr 07:00-19:00, Sa-Su
  08:00-18:00). No address in schema: it is `addressDisplay: "no"`, for the Google listing and
  directories only.
- **Prices:** none on any page or in any article. Brandon has published none.

## Brand: Brandon's own logo, metallic blue on black
**The logo** is Brandon's own, sent on WhatsApp on 26 Oct 2026 and now in this repo, in
`sites/truelinefinishes.com/brand/`:
- **Primary: `trueline-finishes-logo-blue.jpg`** (1,600 × 535; message `OpGoplCKAoe2TQ-hdqf1wAAAOw`,
  12:18 UTC, followed by "That's the logo"). On a solid black ground, "TRUELINE" in large classical
  serif capitals, the T taller than the other letters, with a polished, bevelled metallic-blue
  finish and a chrome highlight; beneath it, centred, "FINISHES" in smaller, bold, widely spaced
  serif capitals in the same blue; a thin blue line tapering to a point either side of "FINISHES".
- **Variant: `trueline-finishes-logo-silver-blue.jpg`** (2,048 × 684; message
  `OgUFdXHp4RVk4w-hSCf1wAAAOw`, 11:19 UTC, followed by "This is my logo just Trueline Finishes"). The
  same lockup with "TRUELINE" in silver chrome; "FINISHES" and the lines in blue.
- **Not** the earlier logo on his printed advert (a house-and-paintbrush icon in navy and blue on
  white, with "PAINTING & DECORATING" beneath): the 26 Oct wordmark replaces it ("This is my logo
  just Trueline Finishes"; the 23 Oct call's notes have him sending updated logo files).
- Both files are compressed JPEGs on solid black (65 KB and 64 KB) with no transparent version.
  **Put them on black only**: the header, the footer and the hero bands are black, so the logo sits
  there seamlessly. Ask Brandon for the original file (a PNG with a transparent background, or an
  SVG) first.
- **Vincent may redo it, in exactly the same style** (the operator, 4 Nov 2026: "Vince may need to
  redo it within the exact same style but to make it suitable for the site as I think it's a low-res
  image"). If the files are not sharp enough where the site uses them, and Brandon has no original,
  recreate the logo at a resolution suitable for the site, as an SVG or a large transparent PNG,
  keeping everything the same: "TRUELINE" in the same classical serif capitals with the taller T, the
  same bevelled metallic-blue gradient and chrome highlight, "FINISHES" beneath in the same spaced
  serif capitals between the two thin tapering blue lines, on black. A copy, not a new design: no
  restyling, no new colours, no added icon.

**The palette is sampled from the logo's own pixels**, not invented (contrast ratios are WCAG 2.x):

| Role | Hex | From | Used for |
|---|---|---|---|
| Black | `#000000` | the logo's ground | header, nav, footer, hero and call-to-action bands |
| Royal blue | `#01529B` | the logo blue's mid-tone | primary buttons on white and light sections (white text on it), accent bars, icons |
| Deep blue | `#003A72` | the logo blue's shadow | links and small blue text on white; button hover |
| Chrome blue | `#2CB0F8` | the logo's highlight | accents and buttons on black (black text on it) |
| Silver | `#BFC5CB` | the variant's chrome highlight | secondary text and fine rules on black |
| Gunmetal | `#545C63` | the variant's chrome mid-tone | borders and dividers on white |
| White | `#FFFFFF` | | **every SEO article's reading area**; hub content sections; text on black |
| Ink | `#1A1A1A` | | body text on white |
| Light grey | `#F2F2F2` | | alternating light sections |

- White on royal blue is 7.8:1, deep blue on white 11.4:1, black on chrome blue and chrome blue on
  black 8.7:1, silver on black 12.1:1: all pass. **Never royal blue on black** (2.7:1) **and never
  chrome blue on white** (2.4:1).
- Type: the logo is classical serif capitals, so headings in a classical serif, in capitals or small
  capitals, suit it; body text in a plain, readable sans at a comfortable size. The exact faces are
  the builder's choice.
- **SEO articles stay white where people read:** the body and its FAQ on plain `#FFFFFF` with
  `#1A1A1A` text, whatever black and blue the header, nav, footer and sidebar card carry.

## Layout
Brandon's asks shape the top of the home page; the rest follows the template's structure (Buildings
for Life's, Build scope), in TrueLine Finishes' own colours.
- **Home page:** a black hero with Brandon's chosen video, the kitchen Short, portrait beside the
  headline (Video), the headline about painting and decorating for homes and businesses, the call to
  action, the phone number and the quote form, all at the top as he asked; **the three tiles** from his
  reference, "Specialist Wallcoverings", "Interior & Exterior Work" and "Domestic & Commercial",
  linking to Wallpapering, to Interior Painting and Exterior Painting (that tile carries two links,
  one for each), and to Commercial Painting and Decorating; **the before-and-after slider**, his three pairs first, interior before exterior (the
  bedroom, the bathroom, then the gable wall: his ideal jobs are interiors, 25 Feb call) (Images); the
  five hubs as cards; "why choose us" (the usable claims, below, led by Brandon himself and the direct
  line to him); one line naming the main places served (his close-to-home list: Baildon, Guiseley,
  Menston, Ilkley, Shipley, Otley, Horsforth, Bingley and the towns around them); the reviews (the
  operator's standard live Google reviews widget, as on the other client builds, "live Google reviews
  on every single page" as the 25 Feb call put it, keyed on the Google listing recorded in flag 4); a
  line on the charity he supports; an FAQ; a call-to-action band; the latest articles; footer.
- **Hub pages:** a hero picture for the hub (Images); intro; what the job covers; a before-and-after
  slider where a pair fits the hub; how a job runs; "<hub> in pictures"; **Brandon's video** on the
  two hubs that carry one, placed where it suits the page (the house video on Painting and
  Decorating and Interior Painting; Video); the other hubs as related links; FAQ; the quote form; "further reading" (the hub's town articles);
  footer.
- **SEO articles:** a header band; breadcrumbs; the white reading column and a sidebar with "on this
  page" and a "need a quote?" card; **Brandon's video** in every article of the two hubs that carry
  one, at the position its hub's rotation gives (Video); pictures from the pool; the FAQ in the body;
  related articles (the same hub in other towns, other hubs in the same town); the quote form; footer.
- **How a job runs, three steps,** kept to what the sources support: you get in touch (call Brandon
  directly, the form, or WhatsApp); Brandon talks the job through with you and gives you a free
  quotation; the work is done, with the preparation first and floors and surfaces protected (as his
  own kitchen video shows), Brandon carrying out the work and overseeing the job. No timings, response
  times, site-visit or start-date promises (none is on record).
- **How the seed's section lists map onto this layout.** `seed.json` gives each page its content
  sections; this file gives their order, form and wording, and the blocks above that every page of
  the build has (the hero, the slider, pictures, video, FAQ, the quote form, further reading).
  - Home page (from its blueprint, read off the 17 London decorators ranking for "painting and
    decorating", three headings reworded and the kitchen hub's removed: flag 14): "Professional
    painting and decorating for every property" → the hero and its headline; "Residential and
    commercial decorating services" → the tiles; "Interior painting and preparation", "Exterior
    painting" and "Wallpapering and specialist wallcoverings" → the hub cards, each in its hub's
    scope; "A quality-led service from
    preparation to completion" → "why choose us" and how a job runs; "Talk to Brandon about your
    project" → the call-to-action band; `contact-cta` → the quote form. The coverage line, the reviews
    widget and the charity line are this file's, as above: **not an Areas page**.
  - Hub pages with a blueprint (Painting and Decorating, Interior Painting, Wallpapering): the
    blueprint's eight headings, as reworded (flag 14), are the page's content sections, in order,
    written as the hub's content note says; `sectors: ...` → one line on who the work is for;
    `contact-cta` → the quote form; the FAQ and "further reading" as above.
  - Hub pages on the default skeleton (Exterior Painting, Commercial Painting and Decorating):
    `intro` → the intro; `what-we-do` → what the job covers; `process` →
    how a job runs; `areas-covered` → "further reading", the hub's own town-article links; `faqs` → the
    FAQ; `sectors: ...` → one line on who the work is for; `contact-cta` → the quote form.
  - About (`story`, `credentials`, `contact-cta`): `story` is Brandon's business in the terms of this
    file, Brandon as the expert who carries out the work and oversees every job; `credentials` means
    the usable claims only (over eight years' experience, fully insured, the charity he supports). He
    has **no accreditations, qualifications, memberships, guarantees or warranties**, so none is shown.
  - Contact (`nap`, `enquiry-form`, `hours`): as under Contact, `hours` being the Google listing's.
- **Footer:** the five hubs, quick links, contact (phone, email, WhatsApp, the opening hours; no
  address), the charity line, the legal pages.

## Hub pages (5, locked in services-override.json, 4 Nov 2026)
Each hub's name is used word for word as its page title and in its articles' titles ("Exterior
Painting in Guiseley"), and the URLs are locked: a re-run that changed one would fail the Jev pass and
`npm test`. The title of hub 5 is the operator's (4 Nov 2026), and it runs over the
28-character article-title advisory ("Commercial Painting and Decorating in Northallerton" is a long
title); accepted with the title. These are the five the plan had before the operator's kitchen hub,
which the operator dropped the same night (D-2026-11-04-10).

| # | Hub | URL | Main search phrase | What it covers (Brandon's own scope) |
|---|---|---|---|---|
| 1 | **Painting and Decorating** (the headline) | `/painting-and-decorating/` | "painting and decorating", 5,400/mo ("painter and decorator" the same) | the whole trade, inside and out, homes and businesses, linking to the other four |
| 2 | **Interior Painting** | `/interior-painting/` | "interior painting", 1,600/mo | walls, ceilings, every room, stairs and landings, all the woodwork, kitchen doors |
| 3 | **Exterior Painting** | `/exterior-painting/` | "exterior painting", 4,400/mo | masonry (painting render, brick, stone), woodwork, oil varnishing, windows, doors, fascias and soffits |
| 4 | **Wallpapering** | `/wallpapering/` | "wallpapering", 720/mo | wallpaper hanging, feature walls and whole rooms |
| 5 | **Commercial Painting and Decorating** | `/commercial-painting-and-decorating/` | "commercial painting", 390/mo ("office decorating" 1,300 among its variants) | the same work for business premises of every kind: offices, restaurants, schools, hotels, spas, leisure centres, and local businesses, small and large (the operator, 4 Nov 2026) |

Each hub's full brief is its `contentNote` in `seed.json` (from `nap.json` `hubContentNotes`): what
to cover, how to write its blueprint's headings, what never to offer, Brandon named as the expert,
its video, the cross-links and the call to action. Every hub says, in passing, that the work is for
homes and businesses. The nav shows the five in this order.

## What to write, and what never to write
**Usable claims** (`nap.json` `usps`, all affirmed: Brandon's own words, and the operator's rulings of
4 Nov 2026 where marked):
- "Over eight years' experience" (the operator's ruling, 4 Nov 2026: "say over 8 years' experience";
  Brandon's own answer on the 23 Oct call was "Eight", flag 16). "Over eight years" or "over 8 years";
  the figure is eight and never another number.
- "Brandon Dawson, the owner, carries out the work and oversees every job, and a call is a direct line
  to Brandon" (the operator's ruling, 4 Nov 2026: "he is the expert and the man that will be carrying
  out the work and overseeing all jobs. Whenever you call, you have a direct line to Brandon").
- "Fully insured, friendly and reliable" (his advert). No cover amount is stated, so none is given.
- "Free quotations" (his advert: "Contact us for a free quotation").
- "We take pride in attention to detail, lasting finishes and treating your property with care" (his
  advert).
- "Painting and decorating for homes and businesses, from individual rooms to full property
  redecorations" (his advert and his 27 Oct message).
- "Careful surface preparation on every job: sanding, filling and caulking come with everything"
  (his advert and the 2 Apr call).
- "Supports the charity A Child's Wish" (27 Oct).

**How to write:**
- Sell quality, not price. Brandon's customers pay for a finish ("I do like to make the job absolutely
  spot on", 25 Feb call); never "cheap", never a price. Painting and decorating jobs run longer than
  small trades' call-outs, so no urgency or job-count copy (the operator's note from the 23 Oct
  call).
- Write as "we", as his advert does, and **name Brandon as the expert**: Brandon Dawson, the owner,
  carries out the work and oversees every job, and calling the business is a direct line to him (the
  operator's ruling, 4 Nov 2026, in every hub's content note and in site prohibition 6). He is the
  business's identity, not "staff", so standing prohibition 1 does not bar him; it still bars everyone
  else: his brother and the other worker are never named, and no team or crew is claimed. His ideal
  jobs are interiors, bedrooms and living rooms first (25 Feb call), so interior work leads the
  examples.
- Name the places served, never a whole region ("across West Yorkshire"): the coverage rule in
  `docs/SEED-CONTRACT.md`. Brandon's advert says "across West and North Yorkshire"; the site does not.
- Homes and businesses on every page, in passing.
- Generic buyer's-guide material is welcome (paint finishes, preparation, weather and drying, kinds of
  wallpaper), with no paint or wallpaper brand unless Brandon names one.

**Never** (`seed.json` `negativeTopics`: the 24 standing prohibitions plus these 9 for this site):
1. Plastering, skimming, plaster repairs, applying render, silicone rendering or Venetian plastering
   as a service. Painting render, brick or stone that is already there is offered.
2. Gutter painting or gutter work (Brandon: "I'll stay away from gutters because most of them are
   plastic now").
3. Floor sanding, floor staining or varnishing, decking, wall murals, spray painting or respraying, or
   timber repair, as a service: no source offers any of them.
4. Guarantees, warranties, accreditations, trade bodies, certifications or qualifications: he has
   none (23 Oct call, asked directly: "No").
5. Opening hours other than the Google listing's (Monday to Friday 7am-7pm, Saturday and Sunday
   8am-6pm, stated exactly or not at all), and any 24-hour, overnight, emergency or out-of-hours
   availability, or a promise of evening or weekend work on site: when the work is done is arranged
   with Brandon.
6. Team size, staff numbers, or anyone named as working for TrueLine Finishes other than Brandon.
   Brandon himself IS named, as the expert who carries out the work and oversees every job, with a
   direct line (the operator, 4 Nov 2026). He works with his brother and another worker; neither is
   named on the site, and no team is claimed.
7. The A Child's Wish magazine cover or his printed advert as images, or any photo of another
   business's website, name or number (Images).
8. "Many five-star reviews", anywhere: his Google listing, now recorded, had three reviews on 2 Apr
   and "a few" more by 28 Sep, which is not "many". Point to the reviews widget instead, with no count
   and no rating; never the Rated People reviews of the other TrueLine. The rule's own text in the seed
   says it overrides standing prohibition 24's suggested words for this site, so the engine sees one
   instruction, not two; the operator lifts it when the listing shows many reviews.
9. Kitchen fitting or installation of any kind as TrueLine Finishes' work (units, worktops,
   appliances, kitchen design or layouts, plumbing, electrics, lighting, tiling, splashbacks,
   flooring), and kitchen prices or renovation costs. No source has Brandon fitting kitchens, and the
   operator ruled it out with the kitchen hub (4 Nov 2026: "if you said he didn't do it, then I will
   not include that"). Painting and decorating a kitchen is offered, under Interior Painting, and the
   kitchen video on the home page is introduced by its title alone, never as a fitting service.

**The 24 standing prohibitions**, word for word as in `seed.json` (the numbers cited in this file):

1. Named staff or team members not listed in Business Info
2. Fake or assumed customer reviews or testimonials
3. Made-up years of experience. Only the exact figure from Business Info
4. Made-up qualifications or certifications not listed in Business Info
5. Made-up past projects, clients or work history not stated in Business Info
6. Assumed or invented response times, for example arriving within one hour
7. Invented business details or claims not stated in Business Info
8. How to choose a provider, advisory or comparison sections that set this business against a competitor, or compare or rank named brands or manufacturers against each other. Comparing generic types or options (vented vs unvented cylinders, combi vs system boilers, repair vs replacement) is encouraged, and so is naming the brands the business works with
9. Competing businesses, services or providers, local, national or international
10. The physical base or location of the business. Only state that the area is served
11. Serving this location for X years. Only general experience years from Business Info
12. Bespoke, custom, or designed and tailored systems unless stated in Business Info
13. Services not listed in Business Info. Do not invent new offerings
14. Warranty or guarantee durations not stated in Business Info
15. Insurance values or cover amounts not stated in Business Info
16. Government grants or schemes such as ECO4, BUS, SEG or HUG2 unless in Business Info
17. Price ranges, cost estimates or savings figures not stated in Business Info
18. Specific ROI percentages, CO2 savings or energy output projections
19. Named utility companies, tariff names or grid operator names
20. Awards, ratings or industry body memberships not in Business Info
21. Unsubstantiated superlatives in SEO articles, in any position, including number one, best, top, leading and most trusted. Banned as a class, not as a list of strings. Hub pages and the home page may use them
22. A company registration number, unless present in Business Info
23. A VAT registration number, unless present in Business Info
24. A stated review count or numeric rating; say many five-star reviews and point to the reviews widget

The ones most likely to bite here: the base or address (10); named staff other than Brandon (1, and
site rule 6); response times (6); a review count or rating (24, and site rule 8); prices (17, and
kitchen costs, site rule 9); services he does not offer, kitchen fitting among them (13, and site
rule 9); superlatives in SEO articles (21); a company or VAT number (22, 23).

## Service detail (article material)
Brandon's own lists, from the 2 Apr call unless marked.
- **Exterior:** masonry (painting render, brick or stone that is already rendered or painted: "if
  someone's had it rendered ... you can paint the masonry ... even if it's stone and it's already been
  painted"); exterior woodwork; oil varnishing, with oil and water-based paints; mullion, sash and
  wooden windows; front doors and garage doors; fascia boards and soffits (on his 2 Apr list; on 25 Feb
  he said he tries to stay away from them on their own and takes them on as part of a full exterior, so
  never lead with them). Not gutters.
- **Interior:** walls and ceilings; kitchens, bathrooms, bedrooms, living rooms, hallways, stairs and
  landings; "all aspects of woodwork": skirting boards, architraves, doors, spindles, handrails and
  staircase trims; kitchen doors ("I can do the kitchen doors").
- **Preparation, on every job:** sanding, filling, caulking, fixing hairline cracks ("everything
  comes with ... full preparation"); brand-new plaster gets a mist coat (25 Feb call: "it's brand new
  plaster so I've just mist-coated it all").
- **Wallpapering:** his advert names it; his 23 Oct reference calls it "Specialist Wallcoverings". Papering
  a feature wall is part of it ("Feature Walls" is dropped only as a hub of its own). Likewise oil
  varnishing of exterior woodwork is offered under Exterior Painting; "Varnishing" is dropped only as a
  hub, and floor varnishing is not offered.
- **Who for:** homes and businesses, and business premises of every kind, as the operator ruled on 4
  Nov 2026: offices, restaurants, schools, hotels, spas, leisure centres, and local businesses, small
  and large ("He can do it all"). On the 23 Oct call the operator asked about "restaurants or schools
  or warehouses" and then "spas, hotels, leisure", and Brandon said "Yes ... Yeah" and "Yeah";
  warehouses and bars are not named. Never present any customer as a past client (standing
  prohibition 5).

## Images
**The pool:** 195 of Brandon's own job photos, sent on WhatsApp on 26 Oct 2026 in two albums, which
he described as "images of different parts of houses and offices, before and after photos, external
photos, bathroom and kitchen photos, bedroom and living room photos, before and after images". All
were downloaded on 4 Nov and checked against the SHA-256 Whapi recorded for each, so they are the
files he sent. They are on the planning server, not in this repo (73 MB), at
`/root/work/trueline-finishes-media/images/`: 203 of Brandon's images (the pool, the slider pairs and
the logos), each named `<unix time>_<Whapi message id>.jpg`, with the SHA-256 checks in
`image-manifest.json` beside them. The three that are never for the site (Never, below) are kept
apart in `not-for-the-site/`. The operator copies `images/` to Vincent. **SEO articles** use the pool freely: any photo may illustrate any
article it fits. **Hub pages** use the picks below.

To pull more, or again: the customer-service Whapi channel, chat `447706215917@s.whatsapp.net`,
`GET https://gate.whapi.cloud/messages/list/447706215917%40s.whatsapp.net?count=100` (page with
`&offset=`), the header `Authorization: Bearer <token>` (the token is the operator's, not in this
repo) and a real browser `User-Agent` (without one, Whapi's firewall refuses with error 1010); each
image message has an `image.link`.

**Before-and-after pairs** (Whapi message ids, before → after):

| Pair | Before | After | Where |
|---|---|---|---|
| Exterior gable wall: stained render to clean white masonry paint | `Oj2fzOpJ80xnkA-hU.f1wAAAOw` | `OlaUzHiGp9Vvpw-hbmf1wAAAOw` | home slider; Exterior Painting |
| Bedroom: patched plaster to finished | `OsoBU8ttxSeF3w-hSWf1wAAAOw` | `OnyFQ1aE2nyQAA-hb.f1wAAAOw` | home slider; Interior Painting |
| Bathroom: bare plaster to green walls | `OoIpOkZ2GffpsQ-hcif1wAAAOw` | `OnKHJgeMtUewWg-hQKf1wAAAOw` | home slider; Interior Painting |
| Semi-detached house: painted brick to dark grey | `OnOVwuFyOs40RQ-hdGf1wAAAOw` | `Ojkyw9DVZCfS_A-hYWf1wAAAOw` | Exterior Painting |

The first three are Brandon's own picks for the slider (23 Oct), and two of them are on his printed
advert. The fourth is paired by this plan from the pool (the same house).

**Hub-page picks** (working choices; Brandon may swap any once the site is live):

| Hub | Pictures | Message ids |
|---|---|---|
| Painting and Decorating | hallway with Victorian floor tiles and a black dado line; lounge with a dark arched alcove; mock-Tudor house exterior | `Ou1e_6QyYI5ngA-hSOf1wAAAOw`, `Okyl20srNwbygw-hd2f1wAAAOw`, `Osm3lEGy3PFFQg-hQCf1wAAAOw` |
| Interior Painting | green bedroom; white staircase with spindles; navy kitchen | `OuNzpQyQGG3SrQ-hemf1wAAAOw`, `Opw7CwlYWQIdOg-hXqf1wAAAOw`, `Ooi3LG0lCtL.cA-hd2f1wAAAOw` |
| Exterior Painting | the dark grey house (after); a white sash window in stone; a stone terrace with a sage-green front door | `Ojkyw9DVZCfS_A-hYWf1wAAAOw`, `Oo7FieZGZ_B.3A-hTyf1wAAAOw`, `OkwJi5pwsnI.FQ-hSOf1wAAAOw` |
| Wallpapering | a leaf-pattern feature wall in a lounge (the only wallpaper photo in the pool: ask Brandon for more) | `Or24brkA.OaAVQ-hZ2f1wAAAOw` |
| Commercial Painting and Decorating | an office with a navy feature wall (mid-job); a burgundy exhibition stand | `OkoaEAjRlKsMhg-hT6f1wAAAOw`, `OkVCM1vmI_C0gg-hdef1wAAAOw` |

- Blur any car number plate (the dark grey house has a car on the drive) and crop out the name board
  on the exhibition stand, which names another business.
- A few photos show a person at work, back to camera: use one as "Brandon at work" only once he
  confirms it is him.
- **Never:** the 23 Oct reference photo of another decorator's website (`Ooxspsjwt7ZAAQ-hbif1wAAAOw`,
  which shows that business's name and phone number); the magazine cover or his printed advert
  (`OlKscwVaxZnHhw-hSOf1wAAAOw`, `Oot_uqIWddL6Ow-haSf1wAAAOw`); the old house-and-paintbrush logo.
- **Gaps:** one wallpaper photo; no finished hotel, spa, school, restaurant or leisure-centre photos.
  Ask Brandon for both; until they come, those hubs use what is above.

## Video
Brandon uploaded two videos to his YouTube channel ("Trueline Finishes", @TruelineFinishes) and sent
the links on 3 Nov. Their titles were read from YouTube itself (oEmbed) on 4 Nov:

| Video | Link | YouTube title | Embed on |
|---|---|---|---|
| **The kitchen video** (the first link) | `https://youtube.com/shorts/v3g1Kdja0gk` | "Full kitchen renovation #painting #kitchen" | the home page hero (Brandon's pick), and nowhere else |
| **The house video** (the second link) | `https://youtu.be/mNwdUtQedkc` | "Full house panting and decorating #harrogate #painting #house" | the Painting and Decorating and Interior Painting hub pages; **every** Painting and Decorating and Interior Painting article; above the first H2 of "Painting and Decorating in Harrogate" |

- **The home page:** the kitchen video, Brandon's own pick ("maybe the first link as video on home
  page"). It is a YouTube Short, so portrait: beside the headline and the quote form in the hero, not
  full width. It is on no hub page and in no article: those placements were the kitchen hub's, and
  went with it (D-2026-11-04-10).
- **Hub pages** (the operator, 4 Nov 2026: "in an appropriate place for the hub pages"): once each,
  where it suits the page.
- **SEO articles: the position rotates**, so the video is not in the same place on every page (the
  operator, 4 Nov 2026: "sometimes at the top of the SEO article, sometimes at the bottom, sometimes in
  the middle"). The rule, in both hubs' content notes, goes to the article engine with
  every article: by the town's publish order, the 1st, 4th, 7th ... article has it just above the first
  H2; the 2nd, 5th, 8th ... mid-article, between two H2 sections; the 3rd, 6th, 9th ... near the end,
  after the last H2 section and before the FAQ; at random among the three if the publish order is not
  to hand. "Painting and Decorating in Harrogate" always has it, above its first H2, because the
  house video's title is tagged #harrogate. Nothing in this repo placed media at random before; the
  rule is new.
- **Captions:** one line, as Brandon's own video, with its title's words: "Full kitchen renovation";
  "Full house painting and decorating" (his title has a typing slip, "panting"). Nothing about the
  job, the house or the customer beyond that.
- Embed from YouTube (the operator's reason, 23 Oct call: Google owns YouTube, and an embedded video
  helps the page). Neither video has been watched in full by this plan: the Short's preview frames show
  a kitchen-diner being decorated (the floor under protection board, the units sheeted) and the
  finished room. Watch both before launch.

## The charity
Brandon asked for it on the site (27 Oct: "Also can we add this to website I've sponsored / donated
to the following", with a photo of the cover of *A Child's Wish* magazine, Issue 1; his advert is
inside). Add one line on the About page and in the footer: "Proud to support A Child's Wish, a
children's charity." "Support" is true whether he sponsored or donated. Name the charity in words; a
link to its website, or its logo, only with the charity's say-so (its site address is not in any
source, so do not guess one). The cover carries "Registered Charity Number 1192870"; the number is
not needed on the site. **Do not reproduce the cover** (a child's photograph and the charity's
artwork) **or the advert.**

## Legal pages
There is no old site with legal pages to copy, so write them from standard UK template wording for a
sole-trader decorating business: a **Privacy Policy** (`/privacy/`), **Terms and Conditions**
(`/terms/`) and a **Cookie Policy** (`/cookie-policy/`). They are built from this file, not from
`seed.json`. Name the business as TrueLine Finishes, with Brandon Dawson as the person responsible
for enquiry data unless the operator says the business is registered as a company (open items). No
company number is on file, so none is published. The cookie policy must match what the build
actually sets.

## Towns (reference): 116 in the plan, in two batches
Base: **Baildon** (confirmed, flag 3). **The publish queue is `seed.json` `towns[]`, in this order:**
publish town 1's articles first, then town 2's, and so on down to 116; nothing needs working out.
Towns 1-77 are the first batch (385 articles); towns 78-116 are the second batch (195 articles),
which take over when the first 385 have run out.
Distances (straight-line from Baildon) and populations are real, from the repo's GeoNames gazetteer
(`towns.json`); the eight places marked * are not in that gazetteer and come from GeoNames' full
extract through `nap.json` `townOrder.namedPlaces`, with their population unknown.

**How the order was decided** (the operator's ruling, 4 Nov 2026: "we want to go after the best towns
first, as well as the closest towns, like a mix of that"; flags 6 to 8): the places Brandon wants
come first, and most of them are also the closest, so the easiest to rank; then everything else
within 15 miles, closest first; and the one place he does not want prioritised goes at the end of
these 77. Then the operator's extension (flag 8): the towns from 15 to 20 miles, closest first, after
all 77. In six blocks:

**1-18, "the main ones close to home"**, in Brandon's own order from his WhatsApp list of 30 Oct
(miles from Baildon): 1 Baildon · 2 Guiseley 3.7 · 3 Menston 3.5 · 4 Ilkley 5.5 · 5 Shipley 1.3 · 6
Otley 5.6 · 7 Horsforth 6.1 · 8 Bingley 2.1 · 9 Saltaire 1 · 10 Harden* 3.4 · 11 Haworth 6.7 · 12
Wilsden 3.4 · 13 Idle* 2.4 · 14 Burley in Wharfedale 4.5 · 15 Yeadon 4.3 · 16 Burley Woodhead* 3.7 ·
17 Hawksworth* 2.3 · 18 Rawdon* 4.3

**19-20, the rest of the places he said he would target** on the 2 Apr call ("otley leads [Leeds]
ilkley menston skipton"): 19 Leeds 10.4 · 20 Skipton 12.2. With Menston (3rd), Ilkley (4th) and Otley
(6th), all five are in the first twenty.

**21-35, the rest of the places he named, nearest first** (his written order is not a ranking): 21
Wrose* 1.8 · 22 Pudsey 6.3 · 23 Pool 7.9 · 24 Headingley* 8.7 · 25 Meanwood* 9.1 · 26 Chapel Allerton
10.2 · 27 Sowerby Bridge 10.8 · 28 Batley 11.8 · 29 Dewsbury 12.6 · 30 Harrogate 14.2 · 31
Knaresborough 17.1 · 32 Holmfirth 19.2 · 33 Ripon 22.6 · 34 York 29.7 · 35 Northallerton 36.9. Pool
(Pool-in-Wharfedale) is here because the 2 Apr call names it three times among "the main ones where
you can get the most money", though his 30 Oct list leaves it out. The last five are beyond the 15
miles, in because he named them.

**36-76, the 15-mile fill:** every other settlement of 1,000+ people within 15 miles straight-line of
Baildon, closest first: 36 Cullingworth 4.7 · 37 Keighley 5 · 38 Denholme 5.4 · 39 Queensbury 6.1 ·
40 Steeton 7.1 · 41 Oxenhope 7.1 · 42 Bramhope 7.5 · 43 Silsden 7.7 · 44 Addingham 7.8 · 45
Cleckheaton 9 · 46 Cross Hills 9 · 47 Stainburn 9.2 · 48 Halifax 9.4 · 49 Glusburn 9.4 · 50 Southowram
9.7 · 51 Brighouse 9.9 · 52 Holbeck 10 · 53 Low Bradley 10.3 · 54 Liversedge 10.5 · 55 Morley 10.7 ·
56 Heckmondwike 10.7 · 57 Rastrick 10.7 · 58 Luddenden Foot 11 · 59 Mytholmroyd 11.3 · 60 Elland 11.4
· 61 Hebden Bridge 11.8 · 62 Embsay 12.2 · 63 Holywell Green 12.4 · 64 Mirfield 12.6 · 65 Pannal 12.9
· 66 Shadwell 12.9 · 67 Barkisland 13 · 68 Ripponden 13.5 · 69 Huddersfield 13.7 · 70 Scarcroft 13.8
· 71 East Keswick 14.1 · 72 Bardsey 14.2 · 73 Ossett 14.3 · 74 Lofthouse 14.4 · 75 Thorner 14.7 · 76
Scholes 14.8. The big towns here that he did not name (Keighley 37th, Halifax 48th, Brighouse 51st,
Morley 55th, Huddersfield 69th) sit where their distance puts them; a town the operator wants
earlier goes into `nap.json` `townOrder.pinned`.

**77, last of the first batch: Bradford** (4 miles). Brandon said on 2 Apr he "wouldn't target" it;
the operator's ruling is to keep it and publish it last (`nap.json` `townOrder.publishLast`), so its
articles go out after every other first-batch town's. The second batch follows it.

**78-116, the second batch** (`nap.json` `townOrder.laterBatches`; the operator, 4 Nov 2026: "add the
new extra towns that are the furthest away. Add them to be published at the end so whenever those 385
run out these new towns would take over"): every other settlement of 1,000+ people in West and North
Yorkshire within 20 miles straight-line of Baildon, closest first: 78 Todmorden 15.6 · 79 Linthwaite
15.6 · 80 Middlestown 15.6 · 81 Spofforth 15.7 · 82 Horbury 15.9 · 83 Collingham 16 · 84 Gargrave 16 ·
85 Swillington 16.1 · 86 Flockton 16.2 · 87 Blackmoorfoot 16.3 · 88 Wakefield 16.4 · 89 Cornholme
16.4 · 90 Walsden 16.6 · 91 Pateley Bridge 16.6 · 92 Kirkburton 16.7 · 93 Garforth 17 · 94 Wetherby
17.3 · 95 Emley 17.3 · 96 Meltham Mills 17.6 · 97 Shelley 17.6 · 98 Meltham 17.7 · 99 Grassington 17.7
· 100 Methley 17.7 · 101 Bramham 17.8 · 102 Kippax 17.9 · 103 Marsden 17.9 · 104 Aberford 18.2 · 105
Boston Spa 18.5 · 106 Shepley 18.5 · 107 Skelmanthorpe 18.6 · 108 New Mill 18.9 · 109 Clayton West
18.9 · 110 Scissett 19 · 111 Upper Cumberworth 19.2 · 112 Castleford 19.3 · 113 Sharlston 19.6 · 114
Thorp Arch 19.6 · 115 Crofton 19.7 · 116 Denby Dale 19.7. Knaresborough (17.1) and Holmfirth (19.2)
are inside 20 miles too, and already in the first batch by name. The Lancashire and Rochdale towns
inside 20 miles stay out (flag 7).

By district: the first batch Bradford 22, Leeds 22, Calderdale 12, North Yorkshire 11, Kirklees 8,
Wakefield 1 (Ossett), York 1; the second batch Kirklees 16, Leeds 10, Wakefield 6, North Yorkshire
4, Calderdale 3. No Lancashire or Rochdale town (flag 7).

Gazetteer names to know: Saltaire is part of Shipley; Holbeck, Chapel Allerton, Headingley and
Meanwood are districts of Leeds; Idle and Wrose are districts of Bradford; Pool is
Pool-in-Wharfedale. GeoNames gives Yeadon 37,379 people, which looks like the whole of Aireborough;
populations are for sorting only and never appear on a page.

## The article budget
**5 hubs × 116 towns = 580 articles** (`seed.json` `articleCap`), under the standing 900, which does
not bite (900 ÷ 5 = 180 towns allowed): first the 385 of the first batch (5 × 77), then the 195 of
the second (5 × 39). It was 385 on the 15-mile ruling before the operator extended it (flag 8), 635
(5 × 127) on the 20-mile fill, the figure the operator gave before ruling on the radius, and 762 only while
the kitchen hub was in the plan. The home page, About, Contact and the legal pages add no articles.

## Open items (not in any source: ask, do not invent)
For Brandon, through the operator:
- Whether **07949 484274 is on WhatsApp**, so the button opens a chat (flag 9).
- Whether **Brandon@truelinefinishes.com** is receiving mail yet (Contact).
- **The logo's original file**, with a transparent background or as a vector; without one, Vincent
  may recreate it in the same style (flag 10).
- **More wallpaper photos**, and photos of finished **commercial** jobs (Images); whether the person
  in the work photos is him.
- How he wants **the charity** worded, and whether to link it.
- **The website he was having built in February** ("I'm currently getting a website built as we
  speak", his email of 22 Feb 2026): whether it exists, and on what domain. A live second site would
  carry a conflicting NAP and duplicate content.
- **Kirkstall, Bramley and Farsley**, which he named on the 2 Apr call but left off his 30 Oct list:
  whether to add them (none is in the gazetteer, so through `namedPlaces`, as Headingley was).
- **His YouTube channel's name**, "Trueline Finishes": renaming it "TrueLine Finishes" would match
  his Google listing and the site (his choice; the videos embed either way).
For the operator:
- **The form endpoint, anti-spam key and mailbox routing** for the quote form, supplied to Vincent
  privately (Contact).
- **The full 2 Apr transcript in saleshq:** its copy there stops at 12,000 characters, so the swarm's
  data-fidelity check cannot see the service list; the full text is
  `/root/work/call-search/acr/Call - Brandon Trueline Finish -[02-04-2026][13-07-28].txt`.
- **Whether the legal pages** name a company or Brandon as a sole trader (Legal pages).
- **The duplicate saleshq record** for Brandon (`c_wa_706215917`, waiting to be merged into
  `c_brandon-dawson-painting`). The operator asked for the merge on 4 Nov ("If it's the same person,
  just merge them"); it is a write to saleshq, outside this repo, and was not done here.
- **The Jev over-check** of every section against the prohibitions, a paid call that was not part of
  the 4 Nov spend: the code checks ran in full.

---

# SECTION 2 — ADDITIONAL INFO (records and reference; not needed to build)

**Section 2 is a record, in date order, and a later pass supersedes an earlier one. Where anything
here differs from Section 1, Section 1 wins.** Superseded on the evening of 4 Nov 2026 in particular:
the sectors narrowed to homes and offices, and restaurants out (now the operator's list: Section 1,
Service detail); "eight years" as Brandon gave it (now "over eight years", the operator's ruling,
flag 16); Baildon as a provisional base, and the address and Google listing as open (all confirmed
the same day, flags 2 to 4). Superseded that night: the sixth hub, Kitchen Renovation and
Installation, with its videos, blueprint ruling, flag and 762 articles (dropped by the operator,
D-2026-11-04-10; the pass that added it is kept below as the record it is); and, later that night,
the 20-mile fill, its 127 towns and 635 articles, Bradford pinned 20th, and the open question of the
Lancashire and Rochdale towns (now 15 miles, 77 towns, 385 articles, Bradford last: D-2026-11-04-11);
and, last, the 77 towns as the whole plan, and visionplumbing.co.uk as the template (now 116 towns in
two batches, 580 articles, Bradford last of the first batch, and Buildings for Life as the structural
template: D-2026-11-04-12). Where an earlier pass below says 127 or 77 towns, that was the plan then.

## Status and history
- **1 Nov 2026:** the first plan, by K-Hermes, from the three calls: "True Line Finishes",
  "decorating", Harrogate as a placeholder base, no phone, email or address.
- **2 Nov 2026:** the research chain ($0.21 for this site, 24 paid calls, in `state/stage4-spend.json`): ten
  hubs chosen by the select stage from the "decorating" keyword table (Painting, Rendering Painting,
  Preparation, Spray Painting, Wood Staining, Wall Murals, Exterior Painting, Varnishing, Plaster
  Repairs, Interior Painting), 76 towns round Harrogate, SERPs and blueprints read through London.
- **3 Nov 2026:** the Goldfish swarm FAILED the plan: 39 blockers, 39 major, 14 nit (`SWARM-REVIEW.md`
  of that date, now replaced). Chief findings: no phone or address; six of ten hubs with no client
  source; the Wood Staining hub's sections read off London wood-floor sanding firms; Harrogate shown
  as a base though unconfirmed; Bradford and Shipley built though the plan said the client excluded
  them; towns he named missing; no logo or colours; no commercial hub; "decorating" as a priority
  service with no service behind it; "Bespoke" in a heading; the swarm had no call transcripts.
- **4 Nov 2026:** this rebuild, from Brandon's WhatsApp, read directly from Whapi (D-2026-11-04-05);
  then the real address, Google listing and name from the operator (D-2026-11-04-06).
- **4 Nov 2026, evening:** the operator's second instruction: a sixth hub, the commercial hub
  retitled, the videos placed, the hours, the WhatsApp number, the logo, Brandon named as the expert,
  and the research bought (D-2026-11-04-07, below).
- **4 Nov 2026, night:** the sixth hub, Kitchen Renovation and Installation, dropped by the operator
  on hearing that no source has Brandon fitting kitchens; back to five hubs and 635 articles
  (D-2026-11-04-10, below). Everything else from the evening's pass stands.
- **4 Nov 2026, late night:** the operator's final town ruling: a 15-mile radius, the Lancashire and
  Rochdale towns gone, the places Brandon named first, Bradford last; 77 towns, 385 articles
  (D-2026-11-04-11, below). Nothing else changed.
- **4 Nov 2026, last:** the operator's last edit, then the approval: Buildings for Life as the
  structural template in place of Vision Plumbing, and a second batch of 39 towns out to 20 miles,
  published after the first 77; 116 towns, 580 articles, the first 385 unchanged
  (D-2026-11-04-12, below). Approved, fingerprint `7495853204d1a803`.

## The 4 Nov 2026 pass (D-2026-11-04-05)
The brief is `.claude-dispatch-briefs/truelinefinishes-whatsapp-rebuild.md` (the operator, 4 Nov
2026, relayed by Hermes). What the run did:
- **Sources first.** The brief's content was checked against the messages themselves: the whole chat
  (262 messages, 26 Sep to 3 Nov 2026) was pulled from Whapi, all 206 of Brandon's images downloaded
  and checked against Whapi's SHA-256, and the three calls (25 Feb, 2 Apr, 23 Oct) and the 23 Oct
  call's auto-generated notes were read for every fact used. Where the brief and the messages differ,
  the messages won (below).
- **NAP:** phone, email and website from his 27 Oct message; the name to his own spelling; no address
  (none supplied); base Baildon by inference.
- **Hubs:** five title-locked operator adds, each backed by his own material, replacing the ten from
  the keyword table; the other five table groups and the old hub names dropped; plastering and gutters
  recorded as not offered. The commercial hub ran one select pass as "Commercial Painting and
  Decorating" and was retitled "Commercial Painting" (Keyword detail).
- **Towns:** his 35 places pinned; 8 added through the new `townOrder.namedPlaces`; 3 beyond the
  radius through `pinBeyondRadius`; the 20-mile fill from Baildon: 127 towns, 635 articles.
- **Content:** seven USPs in his words, the sectors, trust anchors, hub content notes, 8 site
  prohibitions, the image record (`nap.json` `images`, carried into `seed.json` `site.images`), and the
  Interior Painting blueprint ruled out (`blueprintsNotUsed`).
- **Logo** committed to `brand/`: `trueline-finishes-logo-blue.jpg` (sha256
  `212858040c248a99…`) and `trueline-finishes-logo-silver-blue.jpg` (sha256 `326b389029ca34f4…`),
  byte-identical to the WhatsApp files.
- **Code** (tested; no other site's plan changes): two opt-in fields, `townOrder.namedPlaces` in the
  geo stage and `blueprintsNotUsed` in the assembler, and one rule: town research reaches the seed only
  for the base (Harrogate's, bought for the old placeholder base, is held back).
- **Corrections after the first swarm run** (each checked against the transcript): the 14 Rated People
  reviews are another business's ("somebody else called TrueLine ... in Eastbourne", 2 Apr), so they are
  out; Brandon works with his brother "more or less full time" and "another lad" (2 Apr), so "does every
  job himself" is out; "spas, hotels, leisure" were the operator's words on 23 Oct, answered with a
  "Yeah", so the seed names only homes and offices (his own words), hotels, spas and leisure centres
  are to confirm, and restaurants and bars are out; "over eight years" was the operator's
  phrasing, so the USP is Brandon's "eight years".
- **Spend: $0.00.** The geo stage is free; select and review ran from the volume cache with the gate
  closed.

## The second 4 Nov 2026 pass (D-2026-11-04-07)
The brief is `.claude-dispatch-briefs/truelinefinishes-hubs-videos-hours.md` (the operator, 4 Nov
2026, relayed by Hermes), and behind it the operator's own message to Hermes of 19:22 UTC that day,
read in full from Hermes's local message store (the brief summarises it; where they differ, below).
What the run did:
- **Hubs.** Commercial Painting → **Commercial Painting and Decorating**, on
  `/commercial-painting-and-decorating/`; **Kitchen Renovation and Installation** added, sixth, on
  `/kitchen-renovation-and-installation/`; Painting and Decorating unchanged (it already was).
  Both are title-locked operator adds with their phrases priced, not chosen by hand: "commercial
  painting" 390/mo leads the commercial hub by `primaryPhrase` so that the bare "decorating" (4,400)
  its title brings in cannot; "kitchen renovation" 4,400/mo leads the kitchen hub, whose phrases
  measured "kitchen cupboard painting" 22,200, "kitchen decorating" 4,400, "kitchen cabinet painting"
  3,600, "kitchen makeover" 2,900, "kitchen installation" and "kitchen refurbishment" 1,600 each,
  "kitchen painting" 90; "kitchen renovation and installation" has no measurable volume. Not priced
  as phrasings: "kitchen fitter(s)", "kitchen fitting" (the fitting trade's words), anything with
  "spray". The pairing check merged and folded nothing (7 hubs from 7 services, then `drop` removed
  "Painting" as before).
- **The research, all bought:** the pairing check for the five hubs whose seed phrase had none, SERPs
  for all six through London, the domain rulings, blueprints for all six and the home page, and the
  Baildon town research. Used and ruled out: flag 14.
- **A pipeline fault, found and fixed.** The first SERP pulls came back with 13 to 16 of each hub's 20
  results as `https://google.com/goto?url=...` tokens, which the classifier read as google.com: peer
  sets of 1 or 2, under the floor of 3, so no blueprint could be built. One recorded probe pull showed
  DataForSEO's own `domain` field says google.com too, but `breadcrumb` starts with the real origin.
  `src/serp/serp.mjs` now reads the origin back from the breadcrumb (or a social platform from
  `website_name`), keeps the token as `redirectUrl`, and never builds a path; the six SERPs were pulled
  again. The same fault is in every SERP in this repo pulled since 2 Nov (42 files; the last clean
  pull is from 8 Oct): Cumbria Spas' and Family Home Solutions' too (`docs/DECISIONS.md`
  D-2026-11-04-07). `airtasker.com`, ruled a peer by an earlier automatic pass
  ("independent trade firm with its own site"), is a task marketplace and is now a known exclusion.
- **Domain rulings:** 48 new, all provisional (`research/domain-rulings.json`): 45 London decorators,
  wallpaper hangers and kitchen firms as peers; `myadam.pro` (a quotes directory),
  `londonwallpapercompany.com` (a wallpaper shop) and `buildbank.uk` (a cost guide) excluded, the
  first-pass ruler having proposed them as peers. The ruler also proposed a ruling on google.com
  itself; not written, because it would hide the next redirect fault. Peer sets after: Painting and
  Decorating 17, Commercial 13, Interior 11, Kitchen 10, Exterior 9, Wallpapering 7.
- **Content** (`nap.json`): `hours` and `whatsapp` added; the USPs "Over eight years' experience" and
  Brandon as the expert with a direct line; `sectors` widened to the operator's list; the six hub
  content notes rewritten (Brandon named, the blueprint headings steered, the videos and their
  rotation, the kitchen scope); site prohibitions 5 (hours) and 6 (Brandon named) reworded and 9
  (kitchen fitting) added, 33 in all; `images.videos` with their real titles; the logo note for
  Vincent; `blueprintsNotUsed` for three hubs. Name prose in `nap.json` to "TrueLine", which the
  D-2026-11-04-06 bulk change had made in `seed.json` and here but not at the source, so the next
  assembly would have put "Trueline" back; Brandon's own quoted words keep his spelling, and so do
  this file's quotes of them, which that change had altered.
- **Not touched:** `townOrder`, `namedPlaces`, the 900 budget, `towns.json` (byte-identical): 127
  towns, now 762 articles.
- **After the first swarm run** (8 blockers, 37 major, 12 nit: below): fourteen blueprint headings
  reworded in the seed itself through a new opt-in `nap.json` field, `blueprintHeadings` (the
  reviewers' point: a heading crosses the handoff as the outline of every article, so prose steering
  in this file cannot reach the engine); site rule 8 made unconditional ("many five-star reviews" is
  out now the listing is recorded with a handful of reviews); flag 8 reworded so the article count
  is not credited to the operator; flags 7 and 8 moved before approval; Section 2's precedence
  stated; the Baildon research's trade guesses ruled out of the home page; the two-link tile; what
  Vincent is handed; the address wording; REVIEW-BRIEF.md's live-site sentence listed below.
- **After the second swarm run** (13 blockers, 26 major, 21 nit: below): site rule 8's text now says
  it overrides standing prohibition 24's wording, so the seed itself carries the precedence; the last
  wallpaper "Installation" heading reworded (fifteen in all); the precedence sentence names the legal
  pages; the WhatsApp button hides if the chat does not open; `selected-services.json` re-decided free
  from the cache, because after a purchase the select stage records the cache's metadata from before
  it (here the dry run's "NOT bought" line), which a free re-run corrects: the decisions are identical
  and nothing was bought. No third run.
- **Spend: $0.2540, 27 calls** (`state/stage4-spend.json`), inside the $0.39 to $0.49 the operator
  authorised: select $0.0900 (one volume task, 29 new phrases); the pairing check $0.0672 (five
  seeds); SERPs $0.0455 (thirteen calls: the first six, one probe, the six again after the fix);
  blueprints $0.0452 (seven); Baildon $0.0060. The kitchen hub's own calls: $0.0304 (its pairing
  seed, its three SERP calls with the probe, its blueprint), plus a share of the volume task.

## The kitchen hub dropped (D-2026-11-04-10)
The brief is `.claude-dispatch-briefs/truelinefinishes-drop-kitchen-hub.md` (the operator, 4 Nov
2026, relayed by Hermes); behind it, the operator's own message to Hermes of 20:33 UTC that day, read
in Hermes's local message store: "Yes, with regards to the kitchen installation stuff, if you said he
didn't do it, then I will not include that. So, you have that, don't include that in the site plan,
we'll keep with the ones we had." What the run did:
- **The hub.** Kitchen Renovation and Installation moved from `add` to `drop` in
  `services-override.json`, and out of `pin` and `hubUrls`: dropped, not renamed (no "Kitchen
  Painting" or "Kitchen Cupboard Painting"). The five hubs are the ones the plan had before it, the
  commercial hub under the title the operator gave it that evening. The select stage re-decided the
  list free from the cache (each of the five hubs' entries is identical to the evening's) and the plan
  was re-assembled: 5 hubs × 127 towns = 635 articles, the towns untouched.
- **Its research stays on disk, referenced by nothing,** as the 3 Nov hubs' files do: its keyword
  CSV, SERP, classified peers and blueprint (`kitchen-renovation-and-installation.*`), and its rows in
  `keywords/volumes.json` and `suggestions.json`. The paid stages' indexes (`keywords/summary.json`,
  `serp/summary.json`, `blueprints/index.json`) still list it, as they went on listing the 3 Nov hubs
  after D-2026-11-04-05, and the assembler reads past it with a notice. Those stages were not re-run,
  so the SERPs re-pulled that evening and every other research file stay byte-identical; and the
  blueprint stage reuses a home page blueprint only for the same service list, so a run would have
  either bought the home page again or, at zero spend, put it on the default skeleton.
- **The home page blueprint** was bought that evening for the six hubs, and gave the kitchen hub a
  heading, "Kitchen renovation and installation". `blueprintHeadings` can now remove a heading as well
  as reword one (`null`; a small opt-in code change, tested), so the heading is taken out at the
  source and the page keeps its other seven, three of them reworded as before. Buying the page again
  for the five hubs (one Sonar call, about $0.0065) would also do it; that was not authorised.
- **What went with the hub:** its content note; its `blueprintsNotUsed` ruling; the kitchen video's
  hub-page and article placements (the video stays in the home page hero, Brandon's pick; its rotation
  was only ever on the kitchen hub's own articles, below); the old flag 16 (what "Installation"
  covers, and the "Kitchen Painting" or "Kitchen Cupboard Painting" title) and the open items that
  hung on it; the kitchen photo picks and the kitchen photo gap; the "Kitchens" service-detail
  bullet; the kitchen line in `trustAnchors.neverUse`; the cross-links to the hub from Painting and
  Decorating and Interior Painting, and "kitchens" in the headline hub's list of what it links on to.
  Flag 17 ("over eight years") is now flag 16, and flag 8 is resolved: 635 is the operator's figure.
- **What stayed, reworded:** site prohibition 9 still bars kitchen fitting, kitchen design and kitchen
  prices, now citing the operator's ruling instead of the hub. The kitchen video stays on the home
  page under its own title, "Full kitchen renovation", and painting a kitchen stays in Interior
  Painting, so the line between painting a kitchen and fitting one still needs drawing. Still 33
  prohibitions in all.
- **Not touched,** as the brief asked: Commercial Painting and Decorating's title, URL and content;
  the house video and its Harrogate rule; the WhatsApp number; the hours; Brandon as the expert; the
  quote-form note; the SERP fix and its re-pulled SERPs; `blueprintHeadings`' fifteen rewordings; the
  towns.
- **Spend: $0.00.** The select stage and the assembly ran from the cache with the gate at zero.

## The final town list (D-2026-11-04-11)
The brief is `.claude-dispatch-briefs/truelinefinishes-final-towns.md` (the operator, 4 Nov 2026,
relayed by Hermes); behind it, the operator's own messages to Hermes of 22:10, 22:14 and 22:16 UTC
that night, read in Hermes's local message store. He asked why the Lancashire and Rochdale towns
were a question and what Brandon had said about travel, then ruled: "Those two, Lancashire and
Rochdale, we'll drop them. He said a flat 10-15-mile radius so in his case we'll go for a 15-mile
radius. With all the stipulations of the call as well (areas he likes to target, areas he doesn't
want to target, things like that), we'll apply the usual standard process. Take into consideration
the [towns] he does want to target and the [towns] he doesn't want to; we should always put them
first, with the big ones too." Told that Brandon had said he would not target Bradford: "We'll put
that one near the end of where to publish because we want to go after the best towns first, as well
as the closest towns, like a mix of that. The closest towns are the easiest to rank for and the best
towns are obviously the ones he wants to target and the best for his business. Leeds and places like
that are good so we'll have to do a mix of that." What the run did:
- **Sources first.** The 2 Apr passage was read in the full transcript (from character 5,777), the 25
  Feb transcript and the 23 Oct call (saleshq) were searched for anything else on travel (neither has
  a limit from Brandon), and his 30 Oct list was checked against the Whapi export.
- **The radius:** `nap.json` `townOrder.radiusMiles` 20 → 15. No Lancashire or Rochdale town is
  within 15 miles, so all eleven went with the radius; `townOrder.counties` was not needed (flag 7).
- **The order** (Towns): Leeds and Skipton raised to 19th and 20th (from 25th and 28th), Pool pinned
  23rd (from 45th in the fill), Bradford moved from 20th to 77th of 77, Shipley left 5th; the rest of
  the pins, `pinBeyondRadius` and `namedPlaces` unchanged.
- **A small code change** (tested; no other site's plan changes): `townOrder.publishLast`, the
  pin's opposite. Nothing could put a town at the end of the publish order; unpinned, the fill would
  have published Bradford 36th, straight after the pins.
- **`nap.json` `coverageEvidence`**, the record the coverage fix of D-2026-11-04-08 adds, written by
  hand in its shape because that fix is not in master yet: the quote, the radius as the operator read
  it (`radiusMilesStated: 15`), the 36 places he named, and the rule that named places override the
  radius by name, not by number. `recordedBy: "operator"`, so the pipeline's writer will not replace
  it. That fix's own check passes it.
- **Re-run, free:** the geo stage and the assembly for this site only. 77 towns (5,321 places
  considered, 78 inside 15 miles, 6 of them under the 1,000 floor and unnamed, plus the five named
  places beyond the radius); 385 articles.
- **What changed in `seed.json`:** only `towns`, `townOrder`, `articleCap` and each hub's town
  coverage. The hubs, the services, the NAP, the logo, the videos and their placements, the images,
  the sectors, the trust anchors, the prohibitions, the blueprints and the Baildon research are
  byte-identical to D-2026-11-04-10's. Two notes in `nap.json` lost an old count ("Brandon's own 35
  places", "127 Exterior Painting articles"), and this file's flags 3 and 14 likewise.
- **Spend: $0.00.**

## The template and the second batch, and the approval (D-2026-11-04-12)
The brief is `.claude-dispatch-briefs/truelinefinishes-template-and-radius-extend.md` (the operator,
4 Nov 2026, relayed by Hermes); behind it, the operator's own message to Hermes of 22:58 UTC that
night, read in Hermes's local message store: "https://buildingsforlife.com/ Yeah two things: it all
looks good. I'd like you to change the template be used so it's not Vision Plumbing but it's this
one, Buildings for Life, with his colours. I would actually like you to extend it to a 20-mile radius
because there are only 385 articles. We're going to later extend it anyway so I think just extend it
now. Make it a 20-mile radius in his case and add the new extra towns that are the furthest away. Add
them to be published at the end so whenever those 385 run out these new towns would take over. I'd
like you to just go ahead and do that, approve it, and send it to Vince as everything looks fine on
it." What the run did:
- **The template:** Build scope and Layout name Buildings for Life as the structural template, and
  `nap.json` `buildNote` says the same; the "Words used here" paragraph and the article-URL line no
  longer name Vision Plumbing (the article URLs themselves are unchanged); the brand and colours stay
  Brandon's (Brand, unchanged). buildingsforlife.com was checked live on 4 Nov 2026: "Builders in
  Hedge End & Southampton | Buildings For Life Ltd", phone 07853 945013, the same business as this
  repo's `sites/buildingsforlifeltd.com/` (named for its email domain), also built in Astro. Its town
  pages sit at the root of the site and it has an Areas page; this plan keeps its own URLs and no
  Areas page (the standing rule, D-2026-09-09-08), and Build scope says so.
- **The second batch:** `nap.json` `townOrder.laterBatches`, `[{ "radiusMiles": 20, "counties":
  [the five West Yorkshire districts, North Yorkshire] }]`. A small code change (tested; no other
  site's plan changes) adds it: nothing could add towns after the town put last, and widening
  `radiusMiles` to 20 would have mixed the new towns into the fill ahead of Bradford and renumbered
  what the pins record.
- **Re-run, free:** the geo stage and the assembly for this site only. The geo stage at 20 miles
  found 50 towns of 1,000+ people beyond the 77; the county list kept out the eleven Lancashire and
  Rochdale ones (12 places in all, with Kelbrook, 678 people, under the floor anyway), leaving 39, the
  same 39 West and North Yorkshire towns, at the same distances and populations, that the 15-mile
  ruling took out. They are towns 78 to 116, 15.6 to 19.7 miles, closest first.
- **The first 77:** the same towns in the same order, every `publishOrder` the same, 76 of the 77
  entries byte-identical in `towns.json` and `seed.json`. The 77th, Bradford, keeps its position and
  its `publishLast` record; one sentence of its rationale changed, from "published after every other
  town" to "published after every other town of the first batch; the later batches
  (townOrder.laterBatches) follow it", because the old words were no longer true.
- **What changed in `seed.json`:** `towns` (39 added after the 77), `townOrder` (the basis says what
  the batch is, and `laterBatches` records it), `articleCap` (580) and each hub's town coverage (the
  39 appended after the same 77). The services, the hubs' other fields, the NAP, the logo, the videos,
  the images, the sectors, the trust anchors, the prohibitions, the blueprints and the Baildon research
  are byte-identical to D-2026-11-04-11's.
- **The approval:** the operator's "approve it": `site-plan/APPROVED-BY-OPERATOR` names fingerprint
  `7495853204d1a803` (`seedFingerprint`, `src/plan/review.js`), approved 4 Nov 2026, as for Cumbria
  Spas and Family Home Solutions; the status line at the top says the same. "Send it to Vince" is the
  operator's and Hermes's hand-off, outside this repo, and was not done here.
- **Spend: $0.00.**

## Sources and provenance
| Source | Where | Size | Used for |
|---|---|---|---|
| WhatsApp, 26 Sep - 3 Nov 2026 | Whapi, customer-service channel, chat `447706215917@s.whatsapp.net` ("Brandon True Line Finishes (LMB)"); export `/root/work/trueline-finishes-media/all_messages.json`; **not in saleshq** | 262 messages: 40 texts (20 each way), 206 images from Brandon (2 more from the operator's side, expired), 3 albums, 6 link previews, 5 voice notes | NAP, scope, quote form, towns, logo, images, the charity, the advert, videos, the payment arrangement |
| 25 Feb 2026 discovery call | saleshq `c_brandon-dawson-painting`; text `/root/work/call-search/acr/Call - -[25-02-2026][18-08-09].txt` | 40,084 chars | the business, quality positioning, his brother's and father's trades, reviews, early coverage |
| 2 Apr 2026 sign-up call | the same contact (saleshq's copy stops at 12,000 chars, so the swarm cannot see the service list; the full file was read for the 1 Nov plan and again here); `Call - Brandon Trueline Finish -[02-04-2026][13-07-28].txt` | 32,648 chars | his full exterior and interior service list, gutters, kitchen doors, coverage and the Bradford/Shipley remark, reviews |
| 23 Oct 2026 call (Google Meet) | the same contact; recording transcript `VN - Brandon True Line .-[23-10-2026][15-01-29].txt` (poor audio) and the meeting's auto-generated notes (email `gm_1a1694b4418324a3`) | 17,505 chars; the notes, one page | years' experience, no guarantees or accreditations, commercial sectors, the chat button, email, YouTube, the build timeline |
| Emails, Feb 2026 | the same contact | 4 messages | the enquiry that started it |
| GeoNames | `data/uk-places.json` (committed); the full GB extract, fetched 4 Nov 2026, for the eight named places | | distances and populations |
| Keyword volumes | `keywords/volumes.json`, priced 2 Nov 2026 from the sibling decorating site's readings, and 4 Nov 2026 for the commercial and kitchen phrases | 110 phrases | hub choice and lead phrases |
| The operator's instruction, 4 Nov 2026, 19:22 UTC | his message to Hermes, in Hermes's local message store (`/root/.hermes/state.db`); relayed as the dispatch brief | one message | the kitchen hub, the commercial title and premises, the videos, the hours, the WhatsApp number, the logo, the quote form, Brandon as the expert, "over 8 years", the template, the towns |
| The operator's ruling, 4 Nov 2026, 20:33 UTC | the operator's message to Hermes, in the same store; relayed as the third dispatch brief | one message | the kitchen hub dropped, site prohibition 9's wording |
| The operator's town ruling, 4 Nov 2026, 22:10 to 22:16 UTC | the operator's messages to Hermes, in the same store; relayed as the fourth dispatch brief | three messages | the 15-mile radius, the Lancashire and Rochdale towns dropped, Bradford last, "a mix" of the best and the closest towns |
| The operator's last edit and approval, 4 Nov 2026, 22:58 UTC | the operator's message to Hermes, in the same store; relayed as the fifth dispatch brief | one message | Buildings for Life as the template, the 20-mile second batch after the 385, the approval |
| buildingsforlife.com, 4 Nov 2026 | the live site (home, `/resources/`, `/areas/`, a town page, the sitemap) | | the template: the same business as `sites/buildingsforlifeltd.com/`, its page structure and URLs |
| YouTube oEmbed, 4 Nov 2026 | `https://www.youtube.com/oembed` for both links; the Short's preview frames | | the videos' titles, channel and shape; what the kitchen video shows |
| The 4 Nov research | `serp/`, `serp-classified/`, `blueprints/`, `town-research/town-baildon.json`, `keywords/` | | Hub pages, flag 14, the home page's local section |

saleshq holds a duplicate, WhatsApp-only record for Brandon (`c_wa_706215917`, one message) waiting in
the match queue; the calls and emails are on `c_brandon-dawson-painting`, which `nap.json`
`saleshqContactId` names for the checks.

**Where Section 1's facts come from:**
- NAP: WhatsApp 27 Oct (`Ol9epWK4mg0eNQ-hSGf1wAAAOw`); the name also the logo texts (26 Oct,
  `OmNEleeaPm8eDQ-hQaf1wAAAOw`, `Or4hE4_hu0TQGg-hQ2f1wAAAOw`) and the advert (27 Oct,
  `Oot_uqIWddL6Ow-haSf1wAAAOw`).
- Scope: WhatsApp 27 Oct; the advert; the 23 Oct reference (`Ooxspsjwt7ZAAQ-hbif1wAAAOw`); the 2 Apr
  call.
- Quote form: WhatsApp 28 Oct (`Om6uMR.dWy9jLw-hU6f1wAAAOw`).
- Towns: WhatsApp 30 Oct (`OheAFo4OYSjnmg-hcqf1wAAAOw`); the 2 Apr call (the radius, Leeds and
  Skipton, Pool, Bradford); the operator, 4 Nov (the 15 miles, Bradford last, the Lancashire and
  Rochdale towns out, the 20-mile second batch).
- Template: the operator, 4 Nov, 22:58 UTC (Buildings for Life); buildingsforlife.com, read that night.
- Logo: WhatsApp 26 Oct (`OgUFdXHp4RVk4w-hSCf1wAAAOw`, `OpGoplCKAoe2TQ-hdqf1wAAAOw`).
- Images: WhatsApp 23 Oct (album, caption on `Oj2fzOpJ80xnkA-hU.f1wAAAOw`) and 26 Oct (two albums;
  description `Oom2q07LecRssQ-hc.f1wAAAOw`).
- Charity: WhatsApp 27 Oct (`OlKscwVaxZnHhw-hSOf1wAAAOw`).
- Videos: WhatsApp 3 Nov (`OiSu.0s4Syl1Ig-hVCf1wAAAOw`, `OtXxUrT2B8m.RQ-hXOf1wAAAOw`,
  `OptgltZvBmytEg-hbif1wAAAOw`).
- Slider and layout: WhatsApp 23 Oct (`O8NeROKkitxV7A-hT6f1wAAAOw`, `O0Su3hyjT9va3w-hcSf1wAAAOw`).
- Experience, no guarantees or accreditations, commercial sectors, chat button: the 23 Oct call and
  its notes; "over eight years", the premises named, the WhatsApp number, the hours, Brandon as the
  expert, the logo redo, the quote form's re-confirmation and no kitchen fitting (site prohibition 9):
  the operator, 4 Nov.
- Service detail: the 2 Apr call; the mist coat, the 25 Feb call.
- Palette: sampled from the two logo files (median pixel colour of the dark, middle and highlight
  bands of the lettering).

## Brandon's key messages, word for word
- **27 Oct 2026, 23:09 UTC:** "Phone number : 07949 484274 / Email Brandon@truelinefinishes.com /
  Website that will be / Www.truelinefinishes.com / We would rather just target paint and decorating
  for now rather then planting as well for now just domestic and commercial clients all aspects of
  painting and decorating like we discussed on the phone. I know you mentioned locations with seo
  search will work well do you want me to send over a list I have got with all the locations I can
  work in."
- **28 Oct 2026:** "For the dropdown. Can we offer following, / exterior work / Bedroom / Living room /
  Kitchen / Hallway / Bathroom / Home owner or tenant / Postcode / Short description"
- **30 Oct 2026:** "Please see below for areas I would like to target within my SEO articles. / West /
  north yorkshire Areas / • Leeds / Headingley / Chapel Allerton / Meanwood / Horsforth / • Bradford /
  • Dewsbury / • Batley / • Baildon / • Bingley / • Ilkley / • Sowerby Bridge / • Holmfirth / • Otley /
  • Shipley / • Pudsey / • Baildon / Saltair / Haworth / Burley in wharfedale / Harden / • Wrose / •
  Menston / Yeadon / Hawksworth / • Guiseley / Harrogate / Wilsden / Idle / • York / • Ripon / •
  Skipton / Rawdon / Burly woodhead / • Knaresborough / • Northallerton / The main ones close to home
  are. / Baildon / Guiseley / Mention / Ilkley / Shipley / Otley / Horsforth / Bingley / Saltair /
  Harden / Haworth / Wilsden / Idle / Burley in wharfedale / Yeadon / Burly woodhead / Hawksworth /
  Rawdon"
- **26 Oct 2026:** "These are images of different parts of houses and offices, before and after photos,
  external photos, bathroom and kitchen photos, bedroom and living room photos, before and after
  images" · "This is my logo just Trueline Finishes" · "I'll upload videos to YouTube later on today
  and sort Google Drive out and send you links for YouTube" · "That's the logo"
- **27 Oct 2026:** "Also can we add this to website I've sponsored / donated to the following" · "That's
  my article"
- **3 Nov 2026:** the two YouTube links, then "Two videos uploaded to YouTube unsure what will be the
  best maybe the first link as video on home page"
- **His advert** (A Child's Wish magazine, Issue 1, photographed 27 Oct): "TRUELINE FINISHES /
  PAINTING & DECORATING / PROFESSIONAL PAINTING & DECORATING / INTERIOR | EXTERIOR | RESIDENTIAL |
  COMMERCIAL / [before and after: the bedroom and the gable wall] / Trueline Finishes offers
  professional painting and decorating for homes and businesses across West and North Yorkshire. From
  individual rooms to full property redecorations, we specialise in interior and exterior painting,
  wallpapering and careful surface preparation. We take pride in attention to detail, lasting finishes
  and treating your property with care. Contact us for a free quotation. Fully insured, friendly and
  reliable. / CONTACT US FOR A FREE QUOTATION / 07949 484274 / Brandon.trueline@gmail.com". "Across West
  and North Yorkshire" is his phrase; the site states the places served, never a whole region (the
  coverage rule in `docs/SEED-CONTRACT.md`).

## What the brief said, and where the messages differ
- **Menston was missing** from the brief's close-to-home list. Brandon's own list has "Mention" third;
  it is Menston, and it is pinned third.
- **"~15 real images"**: Brandon sent 206: 195 job photos in two albums on 26 Oct, the six slider
  photos and the reference on 23 Oct, the two logos, and the two magazine photos on 27 Oct.
- **"Videos ... still pending"**: the links had already arrived, on 3 Nov; the brief is dated 4 Nov.
- **The logo** was sent twice, in two colourways, not the same image twice. The brief describes the
  all-blue one. Its timestamps: the logo images are 1793013571 and 1793017102; 1793013580 is the
  "This is my logo" text.
- **"[plastering]"** is "planting" in the message; the reading is the brief's and is supported by the
  23 Oct notes and his brother's trade.
- **"Bespoke is allowed sitewide":** the un-ban is in `src/validate/prohibitions.mjs` (3 Nov 2026): the
  code no longer flags the word, though standing prohibition 12's text still begins "Bespoke, custom".
  Nothing in this plan needs the word.
- The brief's opening names a chat "+447949484274" and corrects itself to `447706215917`: the chat is
  447706215917 (Brandon's mobile); 07949 484274 is the number he gave for the website.

## The second brief, the operator's own message, and the sources
- **"Over 8 years' experience"** is in the operator's message ("When it says 8 years' experience, say
  over 8 years' experience") and not in the brief. Applied, as his ruling (flag 16).
- **"Leave the town list and the 635-article count exactly as they are"**: the operator said "leave
  it at 635 articles" in the message that also added the kitchen hub; 635 was 5 × 127. The towns are
  untouched; six hubs make 762 (flag 8).
- **Random placement for the kitchen video too:** the brief gives it only to the house video; the
  operator's message says "those videos are to be added to a random place ... on the appropriate ones.
  The kitchen renovation and painting SEO articles should be in those ones". Both rotate.
- **"Painting and Decorating in Harrogate", guaranteed:** the brief's. The operator called the second
  video "Painting and Decorating in Harrogate" (its title is tagged #harrogate) and asked for it on
  every Painting and Decorating and Interior Painting article; the Harrogate article has it either
  way, and now above its first H2.
- **The house video's title** is "Full house panting and decorating #harrogate #painting #house": the
  brief corrected Brandon's typing slip without saying so. Captions use "painting".
- **"Standing prohibition 6 (no staff names)"** is this site's rule 6; standing prohibition 6 is
  response times, and named staff is standing prohibition 1. Both read as intended.
- **"Brandon's real logo file is low-resolution"**: the operator said "I think it's a low-res image".
  The files are 1,600 × 535 and 2,048 × 684 JPEGs, compressed, with no transparent version; recorded
  as they are, with his instruction (flag 10).
- **"Carries out and oversees every job"**: the operator's words were "the man that will be carrying
  out the work and overseeing all jobs". Written as "carries out the work and oversees every job":
  on 2 Apr Brandon said his brother works for him "more or less full time" with "another lad", so no
  line says he does every job alone.
- **In the operator's message, not in the brief:** visionplumbing.co.uk as the template (already the
  plan's, now named, Build scope); merge the duplicate saleshq record (a saleshq write, not done here;
  Open items); questions to Hermes about the site builder and the validator (not this repo's work).
- **The kitchen hub's "Installation"** is the operator's word, and no source of Brandon's supports it.
  Put to the operator, the hub was dropped (next section).

## The third brief, the operator's own message, and the sources
- **The brief and the operator's message agree:** drop the hub, do not rename it, "we'll keep with
  the ones we had".
- **The brief's "later message" of the operator's ("the kitchen video also gets the rotating
  placement, since the message says 'those videos'")**: there is no such later message. That line is
  this file's own reading of the operator's 19:22 UTC message (above: "Random placement for the
  kitchen video too"), and the rotation it gave
  the kitchen video was on the kitchen hub's own articles only; the Painting and Decorating and
  Interior Painting articles only ever carried the house video. So, by the brief's own condition, it
  went with the hub.
- **"The 5 hubs from before this addition"** are the five, but the commercial one keeps the title the
  operator gave it that same evening (Commercial Painting and Decorating, not the morning's Commercial
  Painting), as the brief's own list has it.
- **Not in the brief:** the home page blueprint's kitchen heading, and site prohibition 9, which named
  the hub. Both handled above.
- **In the operator's message, not in the brief:** which repo the google.com SERP fault is in ("the
  site planner repo or ... Vincent's site builder repo or ... my Claude SEO engine repo"). In this repo
  it is fixed (`src/serp/serp.mjs`, D-2026-11-04-07); the other repos are not this repo's work, and the
  operator's next message gives that to Hermes's SEO bot as a separate investigation.

## The fourth brief, the operator's own messages, and the sources
- **The brief and the operator agree** on the radius (15 miles), on dropping the Lancashire and
  Rochdale towns, on Bradford near the end of the publish order and not dropped, and on "a mix" of
  the best towns and the closest.
- **The quote** the brief calls verbatim is the transcript tidied: capitals added, "harriga" written
  "Harrogate" and "leads" written "Leeds", a doubled "where" dropped, and cuts marked "...". The
  transcript is a machine transcript in lower case with no speaker names; `nap.json`
  `coverageEvidence.quote` is its own text, and the readings ("harriga" is Harrogate, "leads" is Leeds)
  are noted beside it.
- **"Knaresborough, Harrogate, York, Ripon, Northallerton" beyond 15 miles:** Harrogate is 14.2 miles
  from Baildon, inside; Holmfirth, on his list, is 19.2, outside. The five beyond are Knaresborough,
  Holmfirth, Ripon, York and Northallerton, all kept by name.
- **"Named-wanted towns stay pinned ... unchanged from the current plan"** would have left Pool in the
  fill. The operator asked for the call's "areas he likes to target" to go first; Hermes had told him
  the call's list includes Pool-in-Wharfedale and that "every one of those named places is already in
  the plan", which was true of the plan but not of the pins: Pool was 45th, in the fill. It is pinned
  now, among the places he named, nearest first (23rd). Kirkstall, Bramley and Farsley, named on the
  same call, are not in the plan at all and stay an open item.
- **Leeds and Skipton "stay near the front":** they were 25th and 28th, behind Wrose, Bradford,
  Pudsey and three Leeds districts; they are now 19th and 20th, after his 18 close-to-home places.
- **"`radiusMiles: 15`"** in the coverage record: the coverage fix's shape names the field
  `radiusMilesStated`; the radius the plan is drawn at is `townOrder.radiusMiles`, also 15.
- **Shipley:** the brief reads the call as a mixed signal and keeps Shipley pinned on his 30 Oct list.
  In the call Shipley and Bradford are named together ("places like shipley or bradford that i
  wouldn't target"); the operator ruled only on Bradford and did not object to Shipley staying 5th.
- **"The big ones too":** the operator named Bradford and Leeds as the big ones in Brandon's case;
  Leeds is raised, Bradford goes last. The big towns Brandon never named (Keighley, Halifax,
  Brighouse, Morley, Huddersfield) keep their places in the fill: no ruling raises them.

## The fifth brief, the operator's own message, and the sources
- **The brief and the operator agree** on Buildings for Life as the template, on 20 miles, on the
  new towns published after the 385, and on approving.
- **"With his colours"** is the operator's phrase; the brief reads "his" as Brandon's, which is how
  this plan already had it (Brand), and so does this pass.
- **"The repo's folder for it is `buildingsforlifeltd.com`"**: confirmed against the live site (same
  name, base and phone). The brief puts the template line at "line ~248"; it was at 242, and the
  "Words used here" paragraph, the article-URL line and `nap.json` `buildNote` named Vision Plumbing
  too. Section 2's earlier passes still name it, as the record of what was true then.
- **"The same two-county-plus-named-exceptions logic already used for the 15-mile list"**: no county
  list was used at 15 miles; the radius alone kept the eleven out (flag 7). The second batch is the
  first part of the plan with a county list. **"And immediately-adjacent areas"**: inside 20 miles of
  Baildon the gazetteer holds only the five West Yorkshire districts, North Yorkshire, Lancashire and
  Rochdale, so there is no other adjacent area to add.
- **"Every town between 15.1 and 20 miles"**: the 39 run from 15.6 to 19.7 miles; the only places
  between 15.1 and 15.6 are Earby, Kelbrook and Colne, all in Lancashire. Knaresborough and Holmfirth
  are inside 20 miles and already in the first batch, so they are not counted twice.
- **"Byte-identical"**: 76 of the first 77 entries are; Bradford's position and record are, and one
  sentence of its rationale is not (the pass above says why).
- **"Bradford pushed to the very end of THAT set"**: kept, 77th. By the operator's words it is no
  longer the last town of the whole plan: the 39 new towns publish after it.
- **In the operator's message, not in the brief:** "send it to Vince" (the hand-off to Vincent is the
  operator's and Hermes's, outside this repo; not done here).
- **The brief's own ask for a setting:** "check `townOrder`/`seed.json`'s publish-order fields" for "a
  genuinely later batch": none existed, so `townOrder.laterBatches` was built (the pass above).

## Service-list history and the drop list
- **4 Nov, night:** Kitchen Renovation and Installation moved from `add` to `drop` (the operator:
  "don't include that in the site plan, we'll keep with the ones we had"). Five hubs.
- **4 Nov, evening:** Commercial Painting → Commercial Painting and Decorating (the operator's title);
  Kitchen Renovation and Installation added (the operator's hub). `drop` and `notOffered` unchanged.
- **3 Nov list → 4 Nov:** Painting → Painting and Decorating (led on "painting and decorating", not the
  bare "painting"); Interior Painting and Exterior Painting kept, now operator adds; Rendering Painting
  → part of Exterior Painting (masonry painting); Varnishing → part of Exterior Painting (oil
  varnishing); Preparation → part of every hub (surface preparation); Wood Staining, Wall Murals, Spray
  Painting and Plaster Repairs dropped (no client source; plastering ruled out); Wallpapering and
  Commercial Painting added (his advert and his 27 Oct message).
- **`drop`:** Spray Painting, Wood Staining & Varnishing, Wood Staining, Varnishing, Plaster Repairs &
  Preparation, Plaster Repairs, Preparation, Rendering Painting, Wall Murals & Feature Walls, Wall
  Murals, Feature Walls, Commercial Decorating (the table's own name for the commercial group, with
  "industrial painting" among its phrasings), Painting, Kitchen Renovation and Installation (the
  operator's hub of 4 Nov evening, dropped that night).
- **`notOffered`:** Plastering (with skimming, applying render, silicone rendering, Venetian
  plastering); Gutters.
- The table's "Painting & Decorating" group was split by the select stage into Painting and
  Decorating, Decorating merged into Painting, and Painting is dropped: the operator's add is the hub.

## Keyword detail
All volumes are UK monthly, priced on 2 Nov 2026 from the sibling decorating site's readings
(prochapsprofessionaldecorators.co.uk), and on 4 Nov 2026 for the 29 commercial and kitchen phrases
nobody had priced.
- Painting and Decorating: "painting and decorating" 5,400; "painter and decorator" 5,400;
  "decorator", "decorators", "decorating" 4,400 each; "local decorator(s)" 480. The bare "painting"
  (110,000, mostly art) is attached as a body-target variant because the select stage prices both
  halves of an "X and Y" title; it leads nothing. The approved Family Home Solutions plan carries the
  same variant.
- Interior Painting: "interior painting" 1,600 (lead, by override); "house painting" 1,900; "room
  painting" 880.
- Exterior Painting: "exterior painting" 4,400 (lead); "masonry painting" 27,100 (variant: mostly
  people buying paint); "exterior house painting" 2,400; "painting exterior walls" 1,900; "render
  painting" 390.
- Wallpapering: "wallpapering" 720 (lead); "wallpaper installer" 720; "wallpaper hanging" 320.
- Commercial Painting and Decorating: "commercial painting" 390 (lead by `primaryPhrase`, below the
  500/mo floor, kept because Brandon named commercial clients); "office decorating" 1,300; "office
  painting" 170; "shop painting" 170; "commercial decorator(s)" 140; "commercial painting and
  decorating" 90; "commercial painter(s)" 90; "commercial decorating" 70; "restaurant painting" 30;
  "hotel painting" 10; "school painting" no data. The bare "decorating" (4,400) rides as a variant
  through the title's split, as "painting" does on the headline hub.
- **The title, twice:** the hub was "Commercial Painting and Decorating" for one run on the morning
  of 4 Nov, retitled "Commercial Painting" for the split and the 34 characters, and is "Commercial
  Painting and Decorating" again by the operator's ruling that evening.
- Kitchen Renovation and Installation (dropped on 4 Nov; its readings kept as bought):
  "kitchen renovation(s)" 4,400 (its lead by `primaryPhrase`);
  "kitchen cupboard painting" / "painting kitchen cupboards" 22,200; "kitchen decorating" 4,400;
  "kitchen cabinet painting" / "painting kitchen cabinets" 3,600; "kitchen makeover(s)" 2,900;
  "kitchen installation(s)" 1,600; "kitchen refurbishment(s)" 1,600; "kitchen painter(s)" 90; "kitchen
  painting" 90; "kitchen renovation and installation" no data.
- Total measured demand across the five lead phrases: 12,510/mo (16,910 with the kitchen hub's).
  Tiers in REVIEW-BRIEF.md.

## Towns: how they were chosen, and what was left out
- **His list** is the one he promised on the 2 Apr call, when asked for his areas and his favourites
  ("if you can, like, even number them": "Yeah, yeah, I will do"); the close-to-home list is the
  favourites. His full list's written order is not a ranking ("Baildon" appears twice; Horsforth is
  in both lists), so 21-35 are nearest first.
- **The radius, 2 Apr**, asked "what sort of mile radius you're happy to work within": "i could do a
  10 mile radius 15 mile but then that won't cover like knaresborough where where i've just done a full
  house repaint on walls um like knaresborough harriga um york um i've got one in york coming up as
  well". The operator read it as 15 miles for the fill (flag 8). The full passage is in `nap.json`
  `coverageEvidence.quote`.
- **The places he would target, 2 Apr:** "target guys the otley leads ilkley menston skipton places
  like that" ("leads" is Leeds), and his favourites shortly after: "otley otley menston um skipton
  ilkley geisley ... headingley ... kirkstall bramley farsley also just leads in general ... pool and
  wharf ... barely and wharf dale ... knaresborough harriga. They're, like, the main ones where you can
  get the most money." Leeds and Skipton are 19th and 20th; the rest were already in his 30 Oct list
  except Pool (now pinned) and Kirkstall, Bramley and Farsley.
- **Bradford and Shipley, 2 Apr:** "within the mile radius around me there's certain places like
  shipley or bradford that i wouldn't target ... because i know obviously i've lived there most of my
  life so i know most of them people that oh what you can't paint a full house for 400 quid". His 30
  Oct list names both, Shipley among the close-to-home ones: Shipley stays 5th, and Bradford, by the
  operator's ruling, is kept and published last of the first batch (77th).
- **Named on the calls but not on his list:** Kirkstall, Bramley and Farsley (2 Apr) are not in the
  plan (the gazetteer holds no Kirkstall or Farsley and only the Hampshire and Surrey Bramleys, and he
  did not list them). Pool-in-Wharfedale is pinned 23rd (it was 45th, in the fill). Wakefield (16.4
  miles; on 2 Apr he was on a job there, "I'm in Wakefield at the moment", and later called it "quite
  far, it's an hour drive") and Wetherby (17.3 miles; "Weatherby", a quote visit he mentioned on 25
  Feb) were in the 20-mile fill, went with the 15-mile ruling, and are back in the second batch
  (Wakefield 88th, Wetherby 94th). Neither is on his list, so neither is pinned; pin one if Brandon
  asks for it to go earlier.
- **The eight named places** (GeoNames ids): Harden 13275323, Idle 2646293, Burley Woodhead 12265202,
  Hawksworth 12265246 (the village by Guiseley; the other Hawksworth in Leeds is an estate in
  Kirkstall), Rawdon 2639589, Headingley 6695619 (GeoNames records 300 people, not the suburb's
  population, so shown as unknown), Meanwood 2642846, Wrose 13271809.
- **The geo run (D-2026-11-04-11):** 5,321 places considered (the gazetteer plus the eight), 78
  inside 15 miles, 6 of them below the 1,000 floor and unnamed, so out; plus the five named places
  beyond the radius: 77. On the 20-mile run before it, 132 were inside 20 miles and 8 below the floor:
  127. The 50 that went are the eleven Lancashire and Rochdale towns and 39 West and North Yorkshire
  towns between 15.6 and 19.7 miles (among them Wakefield, Castleford, Garforth, Wetherby, Todmorden,
  Grassington and Pateley Bridge).
- **The second batch's geo run (D-2026-11-04-12):** at 20 miles, 50 towns of 1,000+ people that the
  first 77 do not hold; the county list (the five West Yorkshire districts and North Yorkshire) keeps
  out 12 places inside 20 miles, the eleven Lancashire and Rochdale towns and Kelbrook (Lancashire,
  678 people, under the floor anyway): 39, the same 39 that went, at the same distances and
  populations. 77 + 39 = 116.
- Harrogate, the 1 Nov placeholder base, is 30th.

## Background from the calls (not article material)
- **How he works and wants to grow:** "it's just myself" on 25 Feb, and "I operate on my own, but
  looking to scale and build a team" (email, 22 Feb); by 2 Apr, "I've had my brother working for me
  more or less full time. I've got another lad." His brother is a plasterer by trade; his father has been a painter and decorator since he was 16, with a company.
  He wanted to take on one or two people; the 23 Oct notes say two by next June. None of this goes on
  the site (no team claims).
- **Where his work came from:** MyJobQuote leads, paid per lead ("seven five star reviews just in the
  last couple of months" on his profile there, 25 Feb); 3 on Google by 2 Apr. The 14 Rated People
  reviews the operator found on 2 Apr belong to "somebody else called TrueLine", in Eastbourne. On the 2 Apr call he said he would give customers £20 cash for leaving a review ("if you leave a
  review, I'll give you 20 quid"): his own idea, never site copy, and worth steering him off, because
  paying for reviews is against Google's review policy and puts the listing at risk.
- **His tools:** he uses Go High Level himself (and has built a site in it for a floor client, 23 Oct
  notes); no integration with this site was asked for. Google Workspace (about £15 a month) for the
  new email and the YouTube channel; Facebook and Instagram pages to set up (23 Oct notes).
- **The deal:** a website plus a year of SEO articles, £1,000; Klarna instalments would not go
  through, so £500 was paid on 23 Oct and £500 is due when the site is finished and he is happy
  (WhatsApp 23 Oct). Earlier pitches (25 Feb, 2 Apr) also offered a monthly map-boosting service at
  £100, with £250 later; the 23 Oct notes have the operator sending him the link for a monthly
  Google-posts service. The 1 Nov plan also recorded £1,000/year for the articles or £500 over six
  months by Klarna, £250/month for backlink boosting, and a February framing of £100-250/month map
  boosting plus £500 + £500 for the website and SEO, all without VAT; the WhatsApp of 23 Oct is the
  arrangement now. None of it changes the build.
- **The operator's advice to Brandon, not site copy:** call every new enquiry within the first minute
  ("speed to lead"); drip-email past customers for reviews; post jobs to his Google listing.
- **The 1 Nov plan's thank-you line**, "one of our team will be in touch, or skip the queue and call
  Brandon directly", is in none of the transcripts; the idea (always offer the direct call) is kept, in
  words that claim no team.
- **The 1 Nov plan's form spec** (interior or exterior, room, timescale) came from the 2 Apr call and
  is superseded by his 28 Oct list.
- **A second or third site** under another name, passing enquiries to Brandon, was floated on the 23 Oct
  call as a later upsell ("down the line"), as for an existing Bristol plumbing client with three
  sites; not part of this plan.
- **Old contradictions, settled:** the 1 Nov plan had two versions of the 2 Apr deal and two of Go High
  Level; both are as above.

## Validator and swarm history
- **3 Nov 2026 swarm:** FAILED; 39 blockers, 39 major, 14 nit. This pass answers: the phone (now
  confirmed), the base (Baildon, provisional and labelled), Bradford and Shipley (named by Brandon), the
  missing towns (his 35 pinned), the hubs without a source (five from his own material), Wood Staining
  (dropped), the logo and colours (his own), commercial (a hub), the priority service (Painting and
  Decorating, a hub), "Bespoke" (gone), the hours and credentials sections (mapped above), the lead
  email (Brandon@truelinefinishes.com), the transcripts (`saleshqContactId`). Still open: the address
  and the Google listing, both the operator's.
- **4 Nov 2026:** `validate-jev --check-only` (code checks, no paid call): 0 fixes, 1 failure, the
  address. Swarm run 1, with the saleshq contact: FAILED, comprehension gate PASSED (both cold reads:
  "Painting and Decorating"); 11 blockers (6 the address, 1 the Google listing, 2 approval wording, "over
  eight years" and the Harrogate research), 44 major, 17 nit. Fixed after it: the experience figure,
  the Harrogate research (a code rule), Rated People, the team wording, the sectors, the WhatsApp button
  and build template made definite, the 24 standing prohibitions listed in Section 1, a site rule on
  "many five-star reviews", the region wording, the email's source, the hub-lock wording, and the
  generated-file notes below. Swarm run 2 (the committed `SWARM-REVIEW.md`): FAILED, gate PASSED
  (both reads "Painting and Decorating"); 9 blockers, all the operator's (6 the address, 1 the Google
  listing, 2 approval), 38 major, 19 nit. Fixed after it, without a third run: the commercial sectors
  narrowed to his own words, the three never-use images moved out of the pool's folder, Kirkstall,
  Bramley and Farsley put to him, and wording (what Business Info means, which of the seed and this
  file wins on what, the reviews widget, the owner-naming rule, site rule 8 against standing
  prohibition 24, the Wakefield remark, the places on the home page's coverage line). Much of what
  run 2 still raises is evidence its reviewers cannot see: the WhatsApp export, the full 2 Apr
  transcript (saleshq's copy is truncated) and the 23 Oct call's auto-generated notes. `npm test` is in
  D-2026-11-04-05 (`docs/DECISIONS.md`).
- **4 Nov 2026, evening (D-2026-11-04-07):** `validate-jev --check-only`: passed, 0 fixes, 0 failures
  (the paid over-check flagged as not run). Two Goldfish runs, both with the saleshq contact; both
  FAILED, both passed the comprehension gate (both cold reads: "TrueLine Finishes", a client site,
  painting and decorating), 6 of 6 Goldfish each time.
  - Run 1: 8 blockers, 37 major, 12 nit. Six blockers, from different lenses, were the kitchen hub's
    title (then flag 16); two were approval. Its majors drove the fixes listed under the second pass above.
  - Run 2 (the committed `SWARM-REVIEW.md`): 13 blockers, 26 major, 21 nit. Seven blockers are the
    kitchen title, three the article count against "leave it at 635" (flag 8), one the Lancashire and
    Rochdale towns (flag 7), two approval: every one the operator's. More blockers than run 1 because
    flags 7 and 8 now sit before approval, as run 1 asked; the majors fell from 37 to 26. Not changed
    from its majors: the evidence its reviewers cannot see (the advert and WhatsApp, the full 2 Apr
    transcript; "I can do the kitchen doors" is in the full file), the commercial premises (the
    operator's ruling, with the 23 Oct exchange as background), the Baildon research text in the seed
    (bought as it is; the home page is built from this file, which rules the trade guesses out), the
    "decorating" variant on two hubs (accepted with the operator's title), and the operator's process
    items (the reviews widget, the form keys, the legal entity, how articles reach the site, the
    engine's handoff inputs). Its "preparation on every job" point (the 25 Feb call mentions a
    "landlord special" with no prep) is about a USP from the first 4 Nov pass, left for the operator.
- **4 Nov 2026, night (D-2026-11-04-10, the kitchen hub dropped):** `validate-jev --check-only`:
  passed, 0 fixes, 0 failures (the paid over-check flagged as not run, as before); fingerprint
  `c687a398f9aee3be`. `npm test`: 3,971 of 3,973 assertions across 336 suites (3,959 of 3,961 across
  334 before; the 12 new assertions test the heading removal); the two failures are the `sites/`
  person-names scan, still 29 offences, none in this site. Every other site in the repo assembles
  byte-for-byte the same with the new code as with the old. The swarm was not run again: of run 2's
  13 blockers, the seven on the kitchen title and the three on the article count are answered by the
  drop, the Lancashire towns (flag 7) and approval remain.
- **4 Nov 2026, late night (D-2026-11-04-11, the final town list):** `validate-jev --check-only`:
  passed, 0 fixes, 0 failures (the paid over-check flagged as not run, as before); fingerprint
  `2c7a4539a117998a`, the plan an approval would now name. `npm test`: 4,031 of 4,033 assertions
  across 342 suites (the 60 new assertions test `townOrder.publishLast`); the two failures are the
  `sites/` person-names scan, still 29 offences, none in this site. Every other site in the repo
  assembles byte-for-byte the same with the new code as with the old (2,141 files compared). The
  swarm was not run again: its committed report is still the evening's run 2, on the six-hub plan;
  of its 13 blockers, the kitchen title and the article count were answered by D-2026-11-04-10, the
  Lancashire and Rochdale towns (flag 7) by this pass, and approval remains.
- **4 Nov 2026, last (D-2026-11-04-12, the template, the second batch and the approval):**
  `validate-jev --check-only`: passed, 0 fixes, 0 failures (the paid over-check flagged as not run,
  as before); fingerprint `7495853204d1a803`, the plan the approval names. `npm test`: see
  D-2026-11-04-12 in `docs/DECISIONS.md` (the new assertions test `townOrder.laterBatches`); the two
  failures there are the `sites/` person-names scan, still 29 offences, none in this site. Every other
  site in the repo assembles byte-for-byte the same with the new code as with the old (2,141 files
  compared, and the same Jev results and fingerprints). The swarm was not run again: its committed
  report is still the evening's run 2, and its last open blockers, approval, are answered by the
  approval.
- **Generated files this file overrides:** REVIEW-BRIEF.md's description line says "based in Baildon"
  (from the base; never site copy: standing prohibition 10) and lists four of the five hubs; its USP
  paragraph's "four from the owner ... read off its own pages" is the generator's wording for a site
  with a live website (this is a new build). `selected-services.json` counts six hubs and a
  "Painting" hub from the pairing pass, before `drop` removed it; the seed has the five.
  `SWARM-REVIEW.md` and `swarm-review.json` are the evening's run 2, on the six-hub plan, and
  REVIEW-BRIEF.md no longer carries its summary (every assembly re-renders that file whole).
  PROVENANCE.md's notice of "no correspondence" describes the correspondence miner, not the calls and
  WhatsApp this plan was read from. REVIEW-BRIEF.md's line that "the details above were checked
  against its own live site and confirmed with the owner" is the generator's wording for a client
  with a live website: this is a new build, the NAP is Brandon's own message and the operator's
  reading of the Google listing. REVIEW-BRIEF.md's "NOT-APPROVED" is the state when it was rendered,
  just before `APPROVED-BY-OPERATOR` was written (as on the other two plans approved that day); the
  approval is that file and the status line at the top of this one, and both name `7495853204d1a803`.
