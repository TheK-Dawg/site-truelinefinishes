import type { ServiceContent } from './types';

// Seed hubs[0] sections (blueprint, reworded at source): the first six are content bands;
// "Project Management and Site Working" heads the how-a-job-runs block and "Requesting a Free
// Quotation" heads the quote form, in that order. contentNote scope throughout.
const content: ServiceContent = {
  slug: 'painting-and-decorating',
  metaTitle: 'Painting and Decorating in Baildon, Ilkley & Otley | TrueLine Finishes',
  description: 'Painting and decorating for homes and businesses in Baildon, Guiseley, Ilkley, Otley and Shipley. Brandon carries out every job. Free quotations.',
  h1: 'Painting and Decorating for Homes and Businesses',
  lead: 'Tired rooms, a worn exterior or a whole property to refresh? TrueLine Finishes handles all aspects of painting and decorating, from one room to a full property redecoration, with careful preparation on every job.',
  heroImage: 'victorian-hallway-0065',
  intro: [
    'Painting and decorating is the whole trade: walls and ceilings, woodwork, exterior masonry, windows and doors, and wallpaper, for homes and for businesses. Brandon Dawson, the owner, carries out the work and oversees every job, so the person you speak to on the phone is the person doing the preparation and the finish.',
    'We take pride in attention to detail, lasting finishes and treating your property with care. Every job starts with the preparation, because that is what decides how the paint looks and how long it lasts.',
  ],
  sections: [
    {
      h2: 'Interior Painting and Repainting',
      lead: 'Bedrooms and living rooms first, then kitchens, bathrooms, hallways, stairs and landings. Walls and ceilings are cut in cleanly and rolled evenly, and the woodwork is finished to match. The detail is on our <a href="/interior-painting/">interior painting</a> page.',
      points: ['Walls and ceilings in every room', 'Stairs, landings and hallways', 'Kitchens and bathrooms, kitchen doors included', 'A single room or the whole house'],
      image: 'lounge-dark-arched-alcove-0101',
    },
    {
      h2: 'Surface Preparation',
      lead: 'Sanding, filling and caulking come with everything. Hairline cracks are opened up and filled, gaps along skirting and frames are caulked, and the surface is sanded smooth before any paint goes on.',
      points: ['Filling and sanding as standard', 'Caulking gaps around woodwork and frames', 'Fixing hairline cracks before painting', 'A mist coat on brand-new plaster'],
      image: 'bedroom-filled-0016',
    },
    {
      h2: 'Wallpapering and Wall Finishes',
      lead: 'A papered feature wall, a whole room in paper, or a painted finish chosen for how the room is used. Wallpaper goes onto walls prepared properly first; see <a href="/wallpapering/">wallpapering</a> for how it is hung.',
      points: ['Feature walls and whole rooms', 'Lining paper where a wall needs it', 'Matt, eggshell, satin or gloss, chosen for the room', 'Pattern matched across every join'],
      image: 'leaf-pattern-feature-wall-0026',
    },
    {
      h2: 'Woodwork, Doors and Staircases',
      lead: 'All aspects of woodwork are painted: skirting boards, architraves, doors, spindles, handrails and staircase trims. Each is sanded, filled and caulked first so the gloss or satin lies flat.',
      points: ['Skirting boards and architraves', 'Internal doors and frames', 'Spindles, handrails and staircase trims', 'Water-based or oil-based finishes'],
      image: 'white-staircase-spindles-0162',
    },
    {
      h2: 'Residential and Commercial Decorating',
      lead: 'The same careful work for homes and for business premises: offices, restaurants, schools, hotels, spas, leisure centres and local businesses, small and large. Business premises have their own page, <a href="/commercial-painting-and-decorating/">commercial painting and decorating</a>.',
      points: ['Homes, from one room to a full redecoration', 'Offices and other business premises', 'Hard-wearing finishes for busy areas', 'Work planned around how the building is used'],
      image: 'office-navy-feature-wall-0175',
    },
    {
      h2: 'Period Features and Finish Quality',
      lead: 'Older houses have details worth taking care over: sash and mullion windows, turned spindles, handrails and staircase trims. Outside, masonry, windows and doors are covered on our <a href="/exterior-painting/">exterior painting</a> page.',
      points: ['Sash and mullion windows', 'Spindles, handrails and staircase trims', 'Clean, straight cutting-in lines', 'Lasting finishes, applied with care'],
      image: 'mock-tudor-house-0075',
    },
  ],
  sectorsLine: 'For homes and businesses: homes, offices, restaurants, schools, hotels, spas, leisure centres and local businesses, small and large.',
  slider: ['bedroom', 'bathroom', 'gable'],
  process: {
    heading: 'Project Management and Site Working',
    lead: 'Three steps, and you deal with Brandon from the first call to the last coat.',
    steps: [
      { title: 'Get in touch', body: 'Call Brandon directly, use the quote form or send a WhatsApp message with the room or the outside job and your postcode.' },
      { title: 'A free quotation', body: 'Brandon talks the job through with you, what needs doing and the finish you want, and gives you a free quotation.' },
      { title: 'The work, done properly', body: 'Preparation first, with floors and surfaces protected. Brandon carries out the work and oversees the job through to the finish.' },
    ],
  },
  pictures: {
    heading: 'Painting and Decorating in Pictures',
    lead: 'Brandon’s own photographs from his jobs: interiors, exteriors, woodwork and wallpaper.',
    images: ['victorian-hallway-0065', 'lounge-dark-arched-alcove-0101', 'mock-tudor-house-0075', 'green-bedroom-0136', 'kitchen-diner-protected-0007', 'white-sash-window-stone-0030'],
  },
  video: { heading: 'Brandon’s video: a whole house', lead: 'Brandon’s own video, from his YouTube channel.' },
  faqs: [
    { q: 'What does TrueLine Finishes do?', a: 'All aspects of painting and decorating for homes and businesses: interior painting of walls, ceilings and woodwork, exterior painting of masonry, windows, doors and woodwork, and wallpapering, from individual rooms to full property redecorations.' },
    { q: 'How much preparation is included?', a: 'Preparation comes with everything. Sanding, filling and caulking are part of every job, hairline cracks are filled, and brand-new plaster gets a mist coat before the finish goes on.' },
    { q: 'Who will actually do the work?', a: 'Brandon Dawson, the owner, carries out the work and oversees every job. A call to 07949 484274 is a direct line to him.' },
    { q: 'Are you insured?', a: 'Yes. TrueLine Finishes is fully insured.' },
    { q: 'How are floors and furniture protected?', a: 'Floors and surfaces are covered before any work starts, and the room is protected while it is being prepared and painted, as Brandon’s own kitchen video on the home page shows.' },
    { q: 'Do you do plastering?', a: 'Not for now. TrueLine Finishes is painting and decorating only. Small cracks and holes are filled as part of the preparation, and painting render, brick or stone that is already there is offered under exterior painting.' },
  ],
  related: ['interior-painting', 'exterior-painting', 'wallpapering', 'commercial-painting-and-decorating'],
  quote: { heading: 'Requesting a Free Quotation', lead: 'Pick the room or the exterior work, add your postcode and a short description. Brandon will talk it through with you and give you a free quotation.' },
};
export default content;
