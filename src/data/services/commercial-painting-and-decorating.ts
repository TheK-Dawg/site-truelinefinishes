import type { ServiceContent } from './types';

// Seed hubs[4]: default skeleton; the London blueprint is not used (it sells floor coatings,
// spraying and murals). Premises are named as kinds of business, NEVER as past clients
// (standing prohibition 5). No out-of-hours, evening or weekend working promised.
const content: ServiceContent = {
  slug: 'commercial-painting-and-decorating',
  metaTitle: 'Commercial Painting and Decorating, Baildon & Leeds | TrueLine Finishes',
  description: 'Commercial painting and decorating for offices, restaurants, schools, hotels and local businesses across Baildon, Shipley, Leeds and Ilkley. Free quotations.',
  h1: 'Premises Looking Worn? Commercial Painting and Decorating',
  lead: 'Customers and staff notice tired walls. TrueLine Finishes brings the same careful painting and decorating to offices, restaurants, schools, hotels, spas, leisure centres and local businesses, small and large.',
  heroImage: 'office-navy-feature-wall-0178',
  intro: [
    'Commercial work is the same trade as at home: interior painting, exterior painting and wallpapering, for business premises of every kind. Brandon Dawson, the owner, carries out the work and oversees every job, and a call is a direct line to him.',
  ],
  sections: [
    {
      h2: 'Offices, Restaurants, Schools, Hotels and More',
      lead: 'Offices, restaurants, schools, hotels, spas, leisure centres and local businesses, small and large. One room, one floor or the whole building.',
      points: ['Offices and reception areas', 'Restaurants and hotels', 'Schools, spas and leisure centres', 'Shops and local businesses'],
      image: 'office-navy-feature-wall-0177',
    },
    {
      h2: 'Walls, Ceilings and Woodwork Inside the Building',
      lead: 'Walls, ceilings, doors and trims, prepared and painted. Feature walls in a brand colour, or a clean neutral finish throughout. The detail is on our <a href="/interior-painting/">interior painting</a> page.',
      points: ['Walls and ceilings', 'Doors, frames and skirting', 'Feature walls', 'Wallpapered walls'],
      image: 'office-prepared-0171',
    },
    {
      h2: 'The Outside, Where Customers Look First',
      lead: 'Painted masonry, windows, doors and railings on the outside of the building, the first thing customers see. See <a href="/exterior-painting/">exterior painting</a> for what is covered.',
      points: ['Painted render, brick and stone', 'Windows and doors', 'Railings and exterior woodwork', 'Shop fronts and entrances'],
      image: 'painted-railings-0180',
    },
    {
      h2: 'Finishes That Stand Up to Busy Corridors',
      lead: 'Corridors, receptions and kitchens take knocks and need cleaning. Wipeable eggshell and satin finishes, and gloss on woodwork, hold up to daily use.',
      points: ['Wipeable wall finishes', 'Durable finishes on doors and trims', 'Finishes chosen for how each area is used', 'Clean, straight lines throughout'],
      image: 'exhibition-stand-burgundy-0194',
    },
    {
      h2: 'Work Planned Around How Your Building Is Used',
      lead: 'The work is planned with you around how the building is used, and the premises are protected while it is done. When the work itself happens is arranged with Brandon.',
      points: ['Planned with you before work starts', 'Floors, furniture and fittings protected', 'Areas worked through in a sensible order', 'Protection kept in place until the finish'],
      image: 'office-prepared-0173',
    },
  ],
  sectorsLine: 'For business premises of every kind: offices, restaurants, schools, hotels, spas, leisure centres and local businesses, small and large.',
  process: {
    heading: 'How a Commercial Job Runs',
    lead: 'Three steps, and you deal with Brandon directly.',
    steps: [
      { title: 'Get in touch', body: 'Call Brandon directly, use the quote form or send a WhatsApp message with the premises, the work and the postcode.' },
      { title: 'A free quotation', body: 'Brandon talks the job through with you, the areas, the finish and how the building is used, and gives you a free quotation.' },
      { title: 'Planned, protected, painted', body: 'The work is planned around the business, the premises protected, then prepared and painted. Brandon carries out the work and oversees the job.' },
    ],
  },
  pictures: {
    heading: 'Commercial Painting and Decorating in Pictures',
    lead: 'Business premises from Brandon’s own jobs.',
    images: ['office-navy-feature-wall-0178', 'exhibition-stand-burgundy-0194', 'office-navy-feature-wall-0175', 'office-prepared-0172'],
  },
  faqs: [
    { q: 'What kinds of business premises do you work in?', a: 'All kinds: offices, restaurants, schools, hotels, spas, leisure centres and local businesses, small and large.' },
    { q: 'Do you do exterior work on commercial buildings?', a: 'Yes. Painted render, brick and stone, windows, doors, railings and exterior woodwork, the same as on homes.' },
    { q: 'Can the work be planned around our business?', a: 'Yes. The work is planned with you around how the building is used. When it is carried out is arranged with Brandon.' },
    { q: 'Do you offer spray painting or floor coatings?', a: 'No. Spray painting, floor coatings, murals and carpets are not offered: TrueLine Finishes is painting, decorating and wallpapering.' },
    { q: 'Are you insured for commercial work?', a: 'Yes. TrueLine Finishes is fully insured.' },
  ],
  related: ['painting-and-decorating', 'interior-painting', 'exterior-painting'],
  quote: { heading: 'Talk to Brandon About Your Premises', lead: 'Leave your details and the postcode of the premises, with a short description of the work. Brandon will give you a free quotation.' },
};
export default content;
