import type { ServiceContent } from './types';

const content: ServiceContent = {
  slug: 'carpentry',
  metaTitle: 'Carpentry & Joinery in Hampshire | Buildings For Life',
  description:
    'Carpentry and joinery in Hampshire: fitted wardrobes, bookcases, kitchens and doors, plus structural carpentry for roofs, joists and oak framing. Family-run.',
  eyebrow: 'Carpentry and joinery in Hampshire',
  h1: 'Carpentry and Joinery in Hedge End and Across Hampshire',
  lead:
    'Fitted wardrobes, shelving, kitchens, doors and the structural timberwork inside extensions and roofs. Carpentry from a family-run building firm, measured on site and fitted by people who understand the walls behind it.',
  intro: [
    `Buildings For Life is a family-run building company from Hedge End, and carpentry runs through almost everything we build: fitted furniture, wardrobes, bookcases, kitchens and doors, plus the joists, stud walls, cut roofs and oak framing on our builds.`,
    `Pete Bartlett, who owns the firm and runs the jobs, has over 40 years in the building trade. Good carpentry is mostly invisible: doors close without catching, shelves do not sag, and units meet uneven walls without a gap.`,
  ],
  sections: [
    {
      h2: 'Fitted Furniture',
      lead: `Fitted furniture earns its place in awkward spaces: alcoves beside a chimney breast, the void under the stairs, a sloping loft ceiling, a bay window that wants a seat. Shop-bought units leave gaps in all of them.`,
      points: [
        'Every piece starts with a site measure: plumb, level and skirting height recorded',
        'Set out from a level datum line rather than trusting the floor',
        'Carcasses made slightly undersized, with scribe strips cut to the real wall line',
        'Alcove cupboards with open shelving above',
        'Understairs storage with pull-out drawers or hinged doors',
        'Window seats with lift-up lids, and built-in desks in box rooms',
      ],
      image: 'oak-and-brick-well',
    },
    {
      h2: 'Fitted Wardrobes and Storage',
      lead: `The carpentry job we are asked about most, and the one where fit matters most. A run of wardrobes has to cope with a dipping ceiling and a falling floor and still give even door gaps top to bottom. In <a href="/loft-conversions/">loft conversions</a> we plan them with the stud walls.`,
      points: [
        'Space framed out, plinth levelled, doors on adjustable concealed hinges',
        'Gaps set once the unit is loaded and settled',
        'Double hanging for shirts, full height for coats, shelves at a sensible depth',
        'Hinged or sliding doors, painted, veneered or solid timber',
        'Wardrobes into loft eaves, doors cut to follow the roof slope',
        'Floor-to-ceiling runs with top boxes, so there is no dusty gap on top',
      ],
      image: 'loft-insulation',
    },
    {
      h2: 'Built-In Bookcases and Shelving',
      lead: `A bookcase full of books is heavy, and that is where shelving usually fails. A long shelf in thin MDF will bow within a year, so we size the shelf to the span and the load.`,
      points: [
        'A thicker board, a hardwood lipping, or a central upright to halve the span',
        'Adjustable shelves on pins at close centres, so the layout can change later',
        'Fixed to the wall and tied together so nothing can tip',
        'Scribed to ceiling and side walls so they read as part of the room',
        'Timber kept well clear of a working fireplace opening and hearth',
        'Library walls, floating alcove shelves, shelving over doors and around windows',
      ],
      image: 'timber-clad-renovation',
    },
    {
      h2: 'Kitchen and Interior Joinery',
      lead: `Kitchen fitting is joinery work before it is anything else: units level along the full run, fixed back to the wall, and scribed where the wall wanders.`,
      points: [
        'Clean worktop joints and properly supported overhangs',
        'Tall oven and fridge housings plumb, so their doors line up with the rest',
        'Plinths, cornices, pelmets and end panels',
        'Breakfast bars, island framing, open shelving and larder cupboards',
        'Pipework and soil stacks boxed in, in timber and board',
        'Period mouldings matched from stock or machined to suit; square-edged in newer houses',
      ],
      image: 'tudor-house-renovation',
    },
    {
      h2: 'Doors, Cupboards and Timber Fixtures',
      lead: `A door that sticks, drifts or rattles is almost always a fitting problem, not a door problem. Period doors are worth saving: eased, re-hung on new hinges and fitted to a matching lining.`,
      points: [
        'Planed to an even gap all round, hinges square so it stays where you leave it',
        'Latch and keep set so it closes with a click rather than a slam',
        'Internal doors hung in new or existing linings, fire doors where regulations call for them',
        'Replacement linings where old frames have twisted out of square',
        'Cupboard doors, landing cupboards, loft hatches and access panels',
        'Timber handrails, newel posts and staircase repairs',
      ],
      image: 'brick-porch',
    },
    {
      h2: 'Structural Carpentry for Builds and Extensions',
      lead: `Behind the finish work is the carpentry that holds a building up. On our new builds, lofts and <a href="/house-extensions/">house extensions</a>, first fix is done by the firm that built the walls, so hangers, wall plates and lintels all line up.`,
      points: [
        '<strong>Floor joists.</strong> Sized to the span, on hangers or built in, with noggins and strutting',
        '<strong>Stud walls.</strong> Head and sole plates, noggins at board joints, insulation for sound',
        '<strong>Cut roofs.</strong> Rafters, ridge, purlins and hips cut and pitched on site',
        '<strong>Flat roofs.</strong> Joists with firrings for the fall, decked ready for the covering',
        '<strong>Oak framing.</strong> Porches and canopies jointed in the traditional way',
      ],
      image: 'new-build-brickwork',
    },
    {
      h2: 'Materials, Finish and Craftsmanship',
      lead: `The material is chosen for where it goes, and the standard is simple: doors line up, gaps are even, nothing moves when you lean on it, and where the wall is out the unit follows the wall.`,
      points: [
        '<strong>Moisture-resistant MDF.</strong> Stable and takes paint well, for most painted units',
        '<strong>Birch plywood.</strong> Stronger and holds screws, for carcasses and heavy shelving',
        '<strong>Solid hardwood.</strong> Oak, ash or sapele where it is handled or seen up close',
        '<strong>Graded treated softwood.</strong> Structural sizes from the engineer or span tables',
        'Painted units primed on every face, backs and cut edges included, so they cannot move',
        'Joints filled and sanded before top coats; hardwood oiled or lacquered to suit the use',
      ],
      image: 'brick-detail',
    },
  ],
  process: {
    heading: `From first measure to final fitting`,
    lead: `Carpentry is only as good as the measuring behind it, so every job follows the same three steps.`,
    steps: [
      {
        title: `Tell us the job`,
        body: `Use Quick Quote Online or call. Tell us what you want built, stored or displayed, and send a photo of the space if you can.`,
      },
      {
        title: `Site visit and written quote`,
        body: `Pete checks walls, floors and ceilings for level and plumb and takes a full set of measurements. The layout, materials, door style and hardware are set out in a written quote before anything is ordered or cut.`,
      },
      {
        title: `Build and sign-off`,
        body: `Components are cut and primed, then fixed, levelled and scribed on site, with doors and drawers adjusted. We check every one with you.`,
      },
    ],
  },
  cta: {
    heading: 'Have a space that needs fitting out?',
    line: 'Send us a few details and photos of the room. Pete will arrange a visit to measure up and talk through the options.',
  },
  areas: {
    heading: 'Where we carry out carpentry',
    body: 'We carry out carpentry and joinery from our base in Hedge End across the surrounding area, including Botley, Bursledon, Hamble-le-Rice, Locks Heath, Warsash, Eastleigh, Chandlers Ford, North Baddesley and Southampton itself. Structural carpentry is usually part of a wider build we are running. If you are unsure whether we reach you, send a Quick Quote with your postcode and we will let you know.',
  },
  faqs: [
    {
      q: 'How much does carpentry cost?',
      a: 'It depends on size, material and finish. A painted MDF alcove unit is a very different job from a solid oak bookcase, and a cut roof is priced differently again. We give a written quote once we have measured the space.',
    },
    {
      q: 'How long does fitting take?',
      a: 'A single alcove unit may be fitted in a day or two; a full run of wardrobes or a kitchen usually takes longer, depending on size and how much scribing the walls need. Material lead times can add to that, and we give you a timeframe with the quote.',
    },
    {
      q: 'What materials do you use?',
      a: 'Moisture-resistant MDF for most painted work, birch plywood for strong carcasses, solid hardwoods such as oak for edges, doors and handrails, and graded treated softwood for structural timber. We explain the options when we quote.',
    },
    {
      q: 'Do you design the furniture as well as fit it?',
      a: 'Yes. We measure on site and set out a layout with you, covering the internal arrangement, door style and finish. If you already have a design in mind, we can work from your drawings or pictures.',
    },
    {
      q: 'What do I need to do before you fit?',
      a: 'Clear the room, or the area around the work, and tell us about any pipes or cables you know run through the walls. New plaster should be fully dry before fitted furniture goes against it.',
    },
  ],
  related: ['renovation-and-refurbishment', 'loft-conversions', 'house-extensions'],
  quote: {
    heading: 'Tell us about your carpentry job',
    lead: 'Describe the space and what you want built. Photos help. Pete will come back to you to arrange a measure.',
  },
};

export default content;
