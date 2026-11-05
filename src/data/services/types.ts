export interface ServiceStep { title: string; body: string }

export interface ServiceContent {
  slug: string; // plan hub slug
  metaTitle: string; // 50-60 chars: service + area first, "| Buildings For Life" last
  description: string; // 140-158 chars
  eyebrow: string; // short uppercase label over the H1, e.g. "Brickwork in Hampshire"
  h1: string; // the page H1, contains the plan primary phrase
  lead: string; // 25-40 words under the H1
  intro: string[]; // 2-3 HTML paragraphs (<p> content only, no wrapping <p>)
  /**
   * SERVICE BANDS (REV3 item 1): a landing page, not an article. One band per plan
   * H2: a SHORT lead (one to three sentences, light inline HTML for contextual links
   * only), scannable points, and its own work photograph, so a phone scroll reads as
   * image + text alternating instead of a wall of prose.
   */
  sections: { h2: string; lead: string; points: string[]; image: string }[];
  process: { heading: string; lead: string; steps: [ServiceStep, ServiceStep, ServiceStep] }; // exactly 3 (pass 2): tell us the job / site visit and written quote / build and sign-off
  cta: { heading: string; line: string };
  areas: { heading: string; body: string }; // plain text, no links
  faqs: { q: string; a: string }[]; // 5-6, answers are plain text or light HTML (no links)
  related: [string, string, string]; // three sibling hub slugs
  quote: { heading: string; lead: string };
}

export interface TownContent {
  slug: string;
  name: string; // exact plan town name
  metaTitle: string; // 50-60 chars: "Builders in <Town> | ... | Buildings For Life"
  description: string; // 140-158 chars
  eyebrow: string;
  h1: string;
  lead: string; // 25-40 words
  intro: string[]; // 2 HTML paragraphs
  sections: { h2: string; html: string }[]; // 4 sections
  servicesHeading: string; // heading for the services grid on this page
  servicesLead: string;
  faqs: { q: string; a: string }[]; // 4
  quote: { heading: string; lead: string };
}
