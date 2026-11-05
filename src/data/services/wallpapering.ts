import type { ServiceContent } from './types';

// Seed hubs[3] sections (blueprint, reworded at source): six content bands; "How a Wallpapering
// Job Runs" heads the how-a-job-runs block and "Wallpapering in Pictures" the pictures block, in
// order. Only Brandon's own wallpaper photo (one in the pool so far). No brands, no murals.
const content: ServiceContent = {
  slug: 'wallpapering',
  metaTitle: 'Wallpapering in Baildon, Ilkley & Guiseley | TrueLine Finishes',
  description: 'Wallpapering in Baildon, Ilkley, Guiseley and Shipley: feature walls and whole rooms, hung on walls prepared properly first. Free quotations from Brandon.',
  h1: 'Want a Feature Wall, or a Whole Room Papered? Wallpapering',
  lead: 'One papered wall behind the bed, or every wall in the room: TrueLine Finishes hangs wallpaper on walls that are filled, sanded and lined where they need it, with the pattern matched at every join.',
  heroImage: 'leaf-pattern-feature-wall-0026',
  intro: [
    'Wallpaper shows every flaw in the wall underneath, so the preparation matters as much as the hanging. Brandon Dawson, the owner, carries out the work and oversees every job, for homes and businesses.',
  ],
  sections: [
    {
      h2: 'Wallpaper Hung Straight, Matched and Smooth',
      lead: 'Paper hung straight, plumb and tight to the ceiling and skirting, with clean cuts around sockets, switches and frames. A single feature wall or every wall in the room.',
      points: ['Feature walls', 'Whole rooms', 'Clean cuts at ceilings, skirting and frames', 'For homes and businesses'],
      image: 'leaf-pattern-feature-wall-0026',
    },
    {
      h2: 'Getting the Wall Right Before the First Drop',
      lead: 'Holes and cracks are filled and sanded flat, and lining paper goes up first where a wall needs it, so the finished paper lies smooth.',
      points: ['Filling and sanding', 'Lining paper where a wall needs it', 'Walls sized and ready before hanging', 'A sound, even surface to paper onto'],
      image: 'bedroom-filled-0020',
    },
    {
      h2: 'Papers, Vinyls and Specialist Wallcoverings',
      lead: 'Standard papers, vinyls that wipe clean, textured papers and lining paper each hang a little differently. The paste and the method suit the paper you have chosen.',
      points: ['Standard wallpaper', 'Vinyl wallcoverings', 'Textured papers', 'Lining paper'],
      image: 'room-before-patched-0139',
    },
    {
      h2: 'Joins You Cannot See, Patterns That Line Up',
      lead: 'Patterns are matched drop by drop, seams are butted tight and rolled flat, and excess paste is cleaned off before it dries.',
      points: ['Pattern matched across every drop', 'Tight, flat seams', 'Paste cleaned from the face', 'Straight first drop set from a plumb line'],
      image: 'skirting-detail-0080',
    },
    {
      h2: 'Chimney Breasts, Alcoves and the Awkward Corners',
      lead: 'Chimney breasts, alcoves, sloping ceilings and stairwells take more planning than a flat wall. The cuts are worked out before the first drop goes up.',
      points: ['Chimney breasts and alcoves', 'Sloping ceilings', 'Around windows and doors', 'Stairwells and landings'],
      image: 'lounge-alcoves-prepared-0099',
    },
    {
      h2: 'Paper for Homes and for Business Premises',
      lead: 'A bedroom feature wall at home or a reception wall at work: the same preparation and the same care with the finish. Painting the rest of the room is covered on our <a href="/interior-painting/">interior painting</a> page.',
      points: ['Living rooms and bedrooms', 'Hallways and landings', 'Offices and reception areas', 'Paint and paper in one job'],
      image: 'bedroom-fresh-walls-0156',
    },
  ],
  sectorsLine: 'For homes and businesses: homes, offices, restaurants, schools, hotels, spas, leisure centres and local businesses, small and large.',
  process: {
    heading: 'How a Wallpapering Job Runs',
    lead: 'Three steps, with Brandon from the first call to the last drop.',
    steps: [
      { title: 'Get in touch', body: 'Call Brandon directly, use the quote form or send a WhatsApp message saying which room and your postcode.' },
      { title: 'A free quotation', body: 'Brandon talks the job through with you, the wall or walls and the paper, and gives you a free quotation.' },
      { title: 'Prepared, then hung', body: 'The room is protected, the walls prepared and the paper hung. Brandon carries out the work and oversees the job.' },
    ],
  },
  pictures: {
    heading: 'Wallpapering in Pictures',
    lead: 'A feature wall from one of Brandon’s own jobs.',
    images: ['leaf-pattern-feature-wall-0026'],
  },
  faqs: [
    { q: 'Do you hang a single feature wall?', a: 'Yes. A single feature wall or a whole room, in homes and businesses.' },
    { q: 'What preparation is done before hanging?', a: 'Holes and cracks are filled and sanded, and lining paper goes up first where a wall needs it, so the paper lies smooth.' },
    { q: 'Can you hang wallpaper I have bought?', a: 'Yes. Tell Brandon what paper you have when you get in touch, and he will talk the job through with you.' },
    { q: 'Which kinds of wallpaper can you hang?', a: 'Standard papers, vinyl wallcoverings, textured papers and lining paper. Each is hung with the paste and method that suits it.' },
    { q: 'Can you paint the rest of the room too?', a: 'Yes. Wallpapering and painting can be done as one job, with the ceiling, the other walls and the woodwork painted to finish the room.' },
  ],
  related: ['interior-painting', 'painting-and-decorating'],
  quote: { heading: 'Talk to Brandon About Your Wallpaper', lead: 'Leave your details and postcode, with a line about the wall and the paper you have in mind. Brandon will give you a free quotation.' },
};
export default content;
