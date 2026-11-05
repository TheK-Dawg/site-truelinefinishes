/**
 * FAQ content. The home page's questions (plan, Layout: an FAQ on home) plus each hub's own FAQ
 * from its content module (the plan's hub FAQs). The /faq/ page groups them; nothing here is
 * written beyond the plan's Q&A. A question asked word for word on two pages is listed once.
 */
import { serviceContent } from './services';
import { services } from './site';

export const generalFaqs = [
  { q: 'What does TrueLine Finishes do?', a: 'All aspects of painting and decorating for homes and businesses: interior painting, exterior painting, wallpapering and commercial work, from individual rooms to full property redecorations.' },
  { q: 'Who will carry out the work?', a: 'Brandon Dawson, the owner. He carries out the work and oversees every job, and a call to 07949 484274 is a direct line to him.' },
  { q: 'Is the quotation free?', a: 'Yes. Brandon talks the job through with you and gives you a free quotation.' },
  { q: 'Which areas do you cover?', a: 'Baildon, Guiseley, Menston, Ilkley, Shipley, Otley, Horsforth, Bingley and the towns around them, including Saltaire, Yeadon, Rawdon, Burley in Wharfedale, Leeds and Skipton.' },
  { q: 'Is preparation included?', a: 'Yes. Sanding, filling and caulking come with everything, and brand-new plaster gets a mist coat before the finish goes on.' },
  { q: 'Are you insured?', a: 'Yes. TrueLine Finishes is fully insured.' },
];

const seen = new Set(generalFaqs.map((f) => f.q));
export const siteFaqs = [
  { group: 'About TrueLine Finishes', items: generalFaqs },
  ...serviceContent.map((c) => ({
    group: services.find((s) => s.slug === c.slug)!.name,
    slug: c.slug,
    items: c.faqs.filter((f) => (seen.has(f.q) ? false : (seen.add(f.q), true))),
  })),
].filter((g) => g.items.length > 0);
