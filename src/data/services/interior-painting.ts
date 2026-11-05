import type { ServiceContent } from './types';

// Seed hubs[1] sections (blueprint, reworded at source): six content bands; "The Painting and
// Decorating Process" heads the how-a-job-runs block, "Requesting a Quotation" the quote form.
const content: ServiceContent = {
  slug: 'interior-painting',
  metaTitle: 'Interior Painting in Baildon, Guiseley & Ilkley | TrueLine Finishes',
  description: 'Interior painting in Baildon, Guiseley, Ilkley and Shipley: walls, ceilings, stairs and all the woodwork, with full preparation first. Free quotations.',
  h1: 'Walls Marked and Woodwork Chipped? Interior Painting, Room by Room',
  lead: 'Walls marked, ceilings tired, woodwork chipped? Interior painting from TrueLine Finishes covers every room, the stairs and landings and all the woodwork, with sanding, filling and caulking before any paint goes on.',
  heroImage: 'green-bedroom-0136',
  intro: [
    'From one bedroom to a whole house, interior painting is walls and ceilings, every room, stairs and landings, and all aspects of woodwork. Brandon Dawson, the owner, carries out the work and oversees every job, and a call is a direct line to him.',
    'Bedrooms and living rooms are the jobs Brandon enjoys most, and kitchens, bathrooms and hallways get the same care. The work is for homes and businesses alike.',
  ],
  sections: [
    {
      h2: 'Every Room in the House, One at a Time or All Together',
      lead: 'Every room in the house, plus the stairs and landings: bedrooms, living rooms, kitchens, hallways and bathrooms, in a single room or right through the house.',
      points: ['Bedrooms and living rooms', 'Kitchens, kitchen doors included, painted by hand', 'Hallways, stairs and landings', 'Bathrooms and cloakrooms'],
      image: 'bedroom-fresh-walls-0154',
    },
    {
      h2: 'Filling, Sanding and Caulking Before Any Paint Goes On',
      lead: 'The finish is only as good as what is under it. Filling, sanding, caulking and fixing hairline cracks are part of every job, and brand-new plaster gets a mist coat first so the paint bonds.',
      points: ['Filling holes and hairline cracks', 'Sanding to a smooth surface', 'Caulking along skirting, frames and trims', 'Mist coat on new plaster'],
      image: 'stairs-prepared-0061',
    },
    {
      h2: 'Clean Lines Where Walls Meet Ceilings and Woodwork',
      lead: 'Ceilings first, then walls, then the woodwork, so every edge is cut in cleanly. All aspects of woodwork are covered: skirting boards, architraves, doors, spindles, handrails and staircase trims.',
      points: ['Ceilings and walls, cut in by hand', 'Skirting boards and architraves', 'Doors, spindles and handrails', 'Water-based or oil-based paint on woodwork'],
      image: 'skirting-detail-0078',
    },
    {
      h2: 'Matt, Eggshell, Satin or Paper: Choosing the Finish',
      lead: 'Matt suits most walls and ceilings, eggshell and satin wipe clean in busy rooms, and gloss gives woodwork a hard-wearing shine. A feature wall can be painted in a deeper colour or papered; see <a href="/wallpapering/">wallpapering</a>.',
      points: ['Matt for walls and ceilings', 'Eggshell or satin where rooms see wear', 'Gloss or satin on woodwork', 'Painted or papered feature walls'],
      image: 'lounge-navy-feature-wall-0036',
    },
    {
      h2: 'Homes First, and Business Interiors Too',
      lead: 'Homes and business premises get the same preparation and finish. For offices and other premises, see <a href="/commercial-painting-and-decorating/">commercial painting and decorating</a>.',
      points: ['Homes, from one room to every room', 'Offices and business premises', 'Hard-wearing finishes for busy areas', 'Floors and furniture protected throughout'],
      image: 'open-plan-kitchen-diner-0050',
    },
    {
      h2: 'From Period Hallways to Brand-New Plaster',
      lead: 'Older houses bring turned spindles, handrails, staircase trims and deep skirting; newer homes bring fresh plaster that needs a mist coat. Both are prepared and painted with the same care. For the whole trade, inside and out, see <a href="/painting-and-decorating/">painting and decorating</a>.',
      points: ['Spindles, handrails and staircase trims', 'Deep skirting and architraves', 'New plaster sealed with a mist coat', 'Clean lines on every edge'],
      image: 'landing-white-spindles-0150',
    },
  ],
  sectorsLine: 'For homes and businesses: homes, offices, restaurants, schools, hotels, spas, leisure centres and local businesses, small and large.',
  process: {
    heading: 'How an Interior Job Runs',
    lead: 'Three steps, with Brandon on the job from the first call to the finish.',
    steps: [
      { title: 'Get in touch', body: 'Call Brandon directly, use the quote form or send a WhatsApp message saying which rooms and your postcode.' },
      { title: 'A free quotation', body: 'Brandon talks the job through with you, the rooms, the colours and the finish, and gives you a free quotation.' },
      { title: 'Prepared, then painted', body: 'Floors and furniture are protected, the surfaces are prepared, then painted. Brandon carries out the work and oversees the job.' },
    ],
  },
  pictures: {
    heading: 'Interior Painting in Pictures',
    lead: 'Rooms, stairs and woodwork from Brandon’s own jobs.',
    images: ['green-bedroom-0136', 'white-staircase-spindles-0162', 'navy-kitchen-0038', 'grey-living-room-0133', 'hallway-green-panelling-0039', 'cream-room-0082'],
  },
  faqs: [
    { q: 'Which rooms do you paint?', a: 'Every room: bedrooms, living rooms, kitchens, hallways and bathrooms, plus stairs and landings. A single room or the whole house.' },
    { q: 'Do you paint woodwork as well as walls?', a: 'Yes, all aspects of woodwork: skirting boards, architraves, doors, spindles, handrails and staircase trims.' },
    { q: 'Can you paint kitchen doors?', a: 'Yes. Kitchen doors are painted by hand as part of a kitchen job. TrueLine Finishes does not fit kitchens or spray-paint units.' },
    { q: 'What happens with new plaster?', a: 'Brand-new plaster gets a mist coat first, a thinned first coat that soaks in and seals the surface, so the finish coats bond properly.' },
    { q: 'Which paint finish should I choose?', a: 'Matt is the usual choice for walls and ceilings. Eggshell and satin are more wipeable for kitchens, hallways and children’s rooms. Gloss or satin suits woodwork. Brandon can talk the options through with you.' },
    { q: 'Do you move and protect furniture?', a: 'Floors and furniture are covered and protected before any preparation starts, and the room is kept protected until the work is finished.' },
  ],
  related: ['painting-and-decorating', 'wallpapering', 'exterior-painting'],
  quote: { heading: 'Tell Brandon Which Rooms Need Doing', lead: 'Leave your details and postcode, and say which rooms need painting and what state they are in. Brandon will talk it through and give you a free quotation.' },
};
export default content;
