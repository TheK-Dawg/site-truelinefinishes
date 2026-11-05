import type { ServiceContent } from './types';

// Seed hubs[2]: default skeleton (intro / what-we-do / process / areas-covered / faqs); the
// London blueprint is not used (nap.json blueprintsNotUsed). Scope: Brandon's 2 Apr list.
// Never gutters, never applying or repairing render, brickwork repairs or repointing.
const content: ServiceContent = {
  slug: 'exterior-painting',
  metaTitle: 'Exterior Painting in Baildon, Shipley & Otley | TrueLine Finishes',
  description: 'Exterior painting in Baildon, Shipley, Otley and Ilkley: masonry paint on render, brick and stone, windows, doors and woodwork. Free quotations.',
  h1: 'Exterior Painting That Lifts the Whole House',
  lead: 'Faded masonry, flaking windows or a front door that has seen better days? Exterior painting from TrueLine Finishes covers painted render, brick and stone, windows, doors and exterior woodwork, prepared properly first.',
  heroImage: 'semi-detached-after-0125',
  intro: [
    'If a wall has already been rendered or painted, it can be painted again, even if it is stone. Exterior painting covers masonry, exterior woodwork, mullion, sash and wooden windows, front and garage doors, and oil varnishing. Brandon Dawson, the owner, carries out the work and oversees every job.',
    'The work is for homes and businesses. Preparation comes with everything: sanding, filling, caulking and fixing hairline cracks before a coat goes on.',
  ],
  sections: [
    {
      h2: 'Masonry Painting on Render, Brick and Stone',
      lead: 'Render, brick or stone that has already been painted or rendered is cleaned down, prepared and painted in masonry paint. A fresh colour on a gable or a whole house changes how the property looks from the street.',
      points: ['Previously painted render', 'Painted brickwork', 'Stone that has already been painted', 'Gable walls and whole elevations'],
      image: 'gable-wall-after-0004',
    },
    {
      h2: 'Windows, Doors and Exterior Woodwork',
      lead: 'Mullion, sash and wooden windows, front doors and garage doors are sanded, filled and caulked, then painted so the finish sheds water instead of soaking it up.',
      points: ['Sash and mullion windows', 'Wooden window frames and sills', 'Front doors and garage doors', 'Exterior woodwork and railings'],
      image: 'white-sash-window-stone-0030',
    },
    {
      h2: 'Oil Varnishing, Oil and Water-Based Finishes',
      lead: 'Bare or previously varnished exterior timber can be oil varnished to bring out the grain. Painted woodwork takes oil-based or water-based paint, chosen for the surface and what it is already coated with.',
      points: ['Oil varnishing of exterior woodwork', 'Oil-based paints for woodwork', 'Water-based paints where they suit', 'The right primer for the surface'],
      image: 'stone-terrace-sage-door-0191',
    },
    {
      h2: 'Preparation, Weather and Drying',
      lead: 'Exterior paint needs a dry surface and the right conditions to cure. Walls and woodwork are prepared first, and painting is planned around the weather so each coat can dry properly.',
      points: ['Sanding, filling and caulking', 'Hairline cracks filled before painting', 'Dry surfaces before every coat', 'Plants, paths and windows protected'],
      image: 'window-prepared-0031',
    },
    {
      h2: 'Fascias and Soffits as Part of a Full Exterior',
      lead: 'Fascia boards and soffits are painted as part of a full exterior, alongside the walls, windows and doors, so the whole house is finished together.',
      points: ['Part of a full exterior repaint', 'Prepared and painted to match', 'Finished at the same time as the walls', 'Gutters are not included'],
      image: 'mock-tudor-house-0071',
    },
  ],
  sectorsLine: 'For homes and businesses: homes, offices, restaurants, schools, hotels, spas, leisure centres and local businesses, small and large.',
  process: {
    heading: 'How an Exterior Job Runs',
    lead: 'Three steps, and a call is a direct line to Brandon.',
    steps: [
      { title: 'Get in touch', body: 'Call Brandon directly, use the quote form (choose Exterior work) or send a WhatsApp message with your postcode.' },
      { title: 'A free quotation', body: 'Brandon talks through the walls, windows and doors with you, the colours and the finish, and gives you a free quotation.' },
      { title: 'Prepared, then painted', body: 'Surfaces are prepared and the surroundings protected, then painted in the right conditions. Brandon carries out the work and oversees the job.' },
    ],
  },
  pictures: {
    heading: 'Exterior Painting in Pictures',
    lead: 'Masonry, windows and doors from Brandon’s own exterior jobs.',
    images: ['semi-detached-after-0125', 'white-sash-window-stone-0030', 'stone-terrace-sage-door-0191', 'mock-tudor-house-0075', 'navy-front-door-stone-0027', 'stone-farmhouse-0092'],
  },
  faqs: [
    { q: 'Can you paint a stone or brick house?', a: 'Yes, where the stone or brick has already been painted, or the wall has already been rendered. It is cleaned down, prepared and painted in masonry paint.' },
    { q: 'Do you apply or repair render?', a: 'No. Applying render is plastering work, which TrueLine Finishes does not offer for now. Painting render that is already there is offered.' },
    { q: 'Do you paint gutters?', a: 'No. Most gutters are plastic now, so gutter painting is not offered. Fascias and soffits are painted as part of a full exterior.' },
    { q: 'What paint is used on exterior woodwork?', a: 'Oil-based or water-based paint, chosen for the surface and what is already on it. Bare or varnished timber can be oil varnished instead.' },
    { q: 'Does the weather affect exterior painting?', a: 'Yes. Paint needs a dry surface and suitable conditions to dry and cure, so exterior work is planned around the weather.' },
    { q: 'Do you paint front doors and garage doors?', a: 'Yes, front doors and garage doors, along with mullion, sash and wooden windows and other exterior woodwork.' },
  ],
  related: ['painting-and-decorating', 'interior-painting', 'commercial-painting-and-decorating'],
  quote: { heading: 'Ask Brandon about your exterior', lead: 'Choose Exterior work, add your postcode and a short description of the walls, windows or doors. Brandon will give you a free quotation.' },
};
export default content;
