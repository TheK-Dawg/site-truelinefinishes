import type { ServiceContent } from './types';

// HUB 6, FENCING (site-plan commit 542315e, 25 Nov 2026; D-2026-11-25-01, flag 17). Brandon asked
// for it twice on WhatsApp and the operator confirmed his scope in his own words: "he does all the
// main types of UK fencing". NO BLUEPRINT HAS BEEN BOUGHT for this hub, so it takes the plan's
// DEFAULT SKELETON (intro / what the job covers / how a job runs / sectors / FAQ / contact), the
// same shape as Exterior Painting, and nothing here goes beyond what the seed's contentNote carries.
// The fence types and the two service-intent terms are the real DataForSEO findings in the seed:
// panel, composite, close board (feather edge), trellis and toppers; installation and repairs.
// NEVER: a fence height, a panel brand, a timber treatment, a warranty, a price or a timescale.
// Brandon has named none of them (standing prohibitions 12, 13, 14, 17).
//
// 26 Nov 2026: Brandon's own first section and credited stock fencing photographs added (DECISIONS
// B1-B6); the paragraph below still holds for his OWN photographs.
// PHOTOGRAPHS: the pool has NO photograph of a fence TrueLine has put up (194 photographs, all
// painting and decorating), and only Brandon's own photographs may be used (CLAUDE.md: R2 only,
// never generated). So this hub's section cards carry copy alone, there is no "Fencing in Pictures"
// band, and the two photographs that ARE used - the hero and the intro - are his own job at a
// property boundary (painted railings and the gate on their wall), which is what they show and all
// they claim. The moment he sends fencing photographs they drop into the same fields as every
// other hub. Recorded for the operator in BUILD-REPORT.md.
const content: ServiceContent = {
  slug: 'fencing',
  metaTitle: 'Fencing in West and North Yorkshire | TrueLine Finishes',
  description: 'Garden fencing across West and North Yorkshire: panel, close board, composite and trellis fencing, new installation and repairs. Free quotations, fully insured.',
  h1: 'Fencing in West and North Yorkshire',
  lead: 'Garden fencing put up and repaired for homes and business premises in Baildon, Shipley, Ilkley, Leeds, Bradford, Harrogate and the towns around them.',
  heroImage: 'painted-railings-0181',
  introH2: 'Fencing Put Up, and Fencing Put Right',
  introImage: 'painted-railings-0180',
  sectionsH2: 'What a Fencing Job Covers',
  intro: [
    'All the main types of garden fencing: panel fencing, close board (feather edge), composite fencing, and trellis fencing and toppers. New fencing from scratch, and repairs where a line of fencing is sound but a panel or a post has gone. A call to 07949 484274 is a direct line to the owner.',
    'The work is for homes and businesses, the same as every other job TrueLine Finishes takes on. Tell us what the boundary looks like now and what you want it to look like, and it is quoted free.',
  ],
  sections: [
    // BRANDON'S OWN SECTION (WhatsApp 25 Nov 2026, operator GO 26 Nov): "could you add this one above
    // all the others please". Heading, description and the four points are his words, unchanged.
    {
      h2: 'Slotted Panel Fencing with Concrete Posts',
      lead: 'Fence panels slide into grooves in the concrete posts and sit on concrete kickboards, also known as gravel boards. The kickboards keep the panels off the ground, helping protect timber from damp and rot. If a panel gets damaged, it can usually be replaced without removing the posts.',
      points: ['Slotted concrete posts for a sturdy garden boundary', 'Concrete kickboards fitted beneath each panel', 'Fence panels that can be replaced individually', 'Panel style and fence height agreed before materials are ordered'],
    },
    {
      h2: 'Panel and Close Board Fencing',
      lead: 'Fence panels are the usual answer to a garden boundary, and close board (feather edge) fencing is built up board by board where a boundary wants something heavier than a panel.',
      points: ['Fence panels fitted to posts', 'Close board, also called feather edge', 'New fencing where there is none', 'Old fencing taken down first'],
    },
    {
      h2: 'Composite Fencing',
      lead: 'Composite fencing is the modern alternative to timber for a garden boundary. It is a straight choice to talk through when you are deciding what to put up, and it is quoted like any other fencing job.',
      points: ['Composite fence panels', 'Fitted to a prepared line of posts', 'An alternative to timber panels', 'Talked through before anything is ordered'],
    },
    {
      h2: 'Trellis Fencing and Toppers',
      lead: 'Trellis goes up as a fence in its own right, or as a topper along the top of fencing that is already there when a boundary wants a little more height and light through it.',
      points: ['Trellis fencing', 'Trellis toppers on existing fencing', 'Fitted along an existing run', 'Planting left room to grow'],
    },
    {
      h2: 'Fence Repairs and Replacement Panels',
      lead: 'When one panel has blown out or a post has rotted at the base, the run does not need replacing: the broken part is taken out and made good so the boundary matches again.',
      points: ['A single blown-out panel replaced', 'Rotted or broken posts taken out', 'Repairs to a run that is otherwise sound', 'Matched to the fencing already there'],
    },
  ],
  sectorsLine: 'For homes and businesses alike: a garden boundary at home, or the fencing around business premises.',
  process: {
    heading: 'How a Fencing Job Runs',
    lead: 'Three steps, and a call to 07949 484274 is a direct line to the owner.',
    steps: [
      { title: 'Get in Touch', body: 'Call 07949 484274, use the quote form or send a WhatsApp message with your postcode and what the boundary looks like now.' },
      { title: 'A Free Quotation', body: 'The run is talked through with you: how much of it, which kind of fencing, and whether anything is coming down first. The quotation is free.' },
      { title: 'Put Up, and Cleared Up', body: 'The old fencing comes out where there is any, the new line goes up, and the garden is left clear. The job is seen through to the finish by the person who quoted it.' },
    ],
  },
  processImage: 'stone-farmhouse-0093',
  // STOCK PICTURES (Brandon, 25 Nov 2026: "some images to add to fencing page ... just stock images
  // for now but I'll send them"). Still no photograph of TrueLine fencing exists, so the band is
  // headed and introduced as example photographs, never as his jobs, and every one is credited under
  // the band and on /image-credits/ (scripts/stock-images.mjs; the receipts are in stock-src/). The
  // slotted concrete-post fence leads, matching his new first section. When his own fencing
  // photographs arrive they replace these and the heading goes back to "Fencing in Pictures".
  pictures: {
    heading: 'Fencing Styles in Pictures',
    lead: 'Example photographs of the kinds of garden fencing we put up. They are credited stock photographs, not TrueLine Finishes jobs.',
    images: ['concrete-post-panel-fence', 'lattice-topped-fence', 'close-board-fence-path', 'lap-panel-garden-fence', 'panel-garden-fencing-roadside', 'panel-fence-footpath'],
  },
  faqs: [
    { q: 'What kinds of fencing do you put up?', a: 'Panel fencing, close board (feather edge) fencing, composite fencing, and trellis fencing and toppers: the main types of garden fencing in this country.' },
    { q: 'Do you repair fencing as well as fit it?', a: 'Yes. A blown-out panel or a broken post can be taken out and replaced without redoing the whole run, as long as the rest of the fencing is sound.' },
    { q: 'Can you take the old fencing away?', a: 'Yes. Where there is fencing up already it comes down as part of the job, and the garden is left clear at the end.' },
    { q: 'Do you fit trellis on top of a fence that is already there?', a: 'Yes. Trellis toppers are fitted along the top of an existing run, and trellis is also put up as fencing in its own right.' },
    { q: 'Do you do fencing for businesses?', a: 'Yes. Fencing is for homes and business premises alike, the same as every other job TrueLine Finishes takes on.' },
    { q: 'How much does fencing cost?', a: 'Every boundary is a different length and a different kind of fencing, so it is quoted after it has been talked through with you. Quotations are free.' },
  ],
  related: ['painting-and-decorating', 'exterior-painting', 'commercial-painting-and-decorating'],
  quote: { heading: 'Ask About Your Fencing', lead: 'Leave your details and postcode, with a short description of the boundary and the kind of fencing you have in mind. It will be talked through with you, then quoted. Quotations are free.' },
};
export default content;
