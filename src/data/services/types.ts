export interface ServiceStep { title: string; body: string }

/**
 * One hub page. Section order and form come from the plan (Layout, Hub pages); the section
 * headings come from seed.json hubs[].sections (blueprint hubs) or the default skeleton.
 * Every section carries its own real pool photo, shown directly above its H2.
 */
export interface ServiceContent {
  slug: string;
  metaTitle: string; // service + area first, "| TrueLine Finishes" last
  description: string; // 140-160 chars
  h1: string;
  lead: string;
  heroImage: string; // image key (plan hub pick)
  intro: string[]; // 1-2 short paragraphs, light inline HTML
  introH2: string; // round 3: the intro's own heading (no unlabelled text box)
  introImage: string; // round 3: pool photo beside the intro (no half-width orphan text)
  sectionsH2: string; // round 3: the H2 over the section cards (the cards are H3s under it)
  /**
   * The section cards. `image` is the card's own pool photograph, above its H3.
   * IT IS OPTIONAL, and on exactly one hub it is absent: FENCING. TrueLine's photo pool (194 of
   * Brandon's own photographs) contains no photograph of a fence he has put up, and the site may
   * use only his own photographs (CLAUDE.md: R2 only, never generated, no stock). A painted bedroom
   * over "Composite Fencing" would be a picture that says something untrue, so that hub's cards
   * carry their copy alone until Brandon sends fencing photographs.
   */
  sections: { h2: string; lead: string; points: string[]; image?: string }[];
  sectorsLine: string; // the seed's `sectors:` section: one line on who the work is for
  sectorsImage?: string; // round 3: with an odd number of sections the line becomes the last grid card (photo + black box) so no cell is left empty
  process: { heading: string; lead: string; steps: [ServiceStep, ServiceStep, ServiceStep] };
  processImage?: string; // the photo beside "how a job runs"; defaults to the first section card's
  /** "<hub> in pictures". An EMPTY images list drops the band. Keys may be credited STOCK keys
   *  (stock-images.json; fencing only, Brandon's 25 Nov 2026 request): the band then prints their
   *  credits, and its heading/lead must say they are example photographs, not TrueLine jobs. */
  pictures: { heading: string; lead: string; images: string[] };
  faqs: { q: string; a: string }[];
  related: string[];
  quote: { heading: string; lead: string };
}
