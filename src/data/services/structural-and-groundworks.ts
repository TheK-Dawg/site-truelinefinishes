import type { ServiceContent } from './types';

const content: ServiceContent = {
  slug: `structural-and-groundworks`,
  metaTitle: `Groundworks & Underpinning in Hedge End | Buildings For Life`,
  description: `Groundwork, foundations, drainage, underpinning and steel beams around Hedge End. Family-run builders with over 40 years in the trade.`,
  eyebrow: `Structural & Groundworks in Hampshire`,
  h1: `Groundwork, Foundations and Structural Alterations`,
  lead: `Foundations, drainage, concrete, underpinning and steel beams for homes around Hedge End. The below-ground and load-bearing work everything else sits on, run by Pete Bartlett.`,
  intro: [
    `Groundwork is buried once it is finished, so it has to be right: if a foundation settles or a drain fails, putting it right costs far more than doing it properly first time. We explain each stage in plain terms.`,
    `Buildings For Life is a family-run firm in Hedge End, and owner Pete Bartlett has over 40 years in the building trade. We work to engineer's designs and building control approval.`,
  ],
  sections: [
    {
      h2: `Foundations, Footings and Substructure`,
      lead: `The foundation type is set by the ground and the load. Much of the ground around Hedge End and Eastleigh is clay, which swells when wet and shrinks as it dries, so footings go below the zone where moisture changes.`,
      points: [
        '<strong>Strip footings.</strong> A concrete strip in the trench, blockwork up to ground level',
        '<strong>Trench fill.</strong> Concrete almost to the surface, common in clay and deeper trenches',
        '<strong>Reinforced and raft.</strong> Designed by an engineer for poor or variable ground',
        'Deeper again near trees, often with a compressible board against clay heave',
        'Blockwork or engineering brick to damp proof course, then membrane and floor insulation',
        'Nothing poured until building control has passed the open excavation',
      ],
      image: 'groundworks-drainage',
    },
    {
      h2: `Excavation, Site Preparation and Ground Clearance`,
      lead: `Before any digging we set the building out from the drawings and find what is already in the ground. Drains, gas, water and cables are traced with a detector and hand-dug trial holes.`,
      points: [
        'Vegetation cleared, old paving and slabs lifted, topsoil stripped',
        'Machine size, muck-away and deliveries planned around the side gate or passage',
        'Hand digging or a micro excavator where no machine can get in',
        'Spoil out by tracked dumper or in bags on tight sites',
        'Trenches supported where the ground is loose or the dig is deep',
        'Soil away by grab lorry or skip, with waste transfer paperwork',
      ],
      image: 'extension-groundworks',
    },
    {
      h2: `Drainage, Soakaways and Below-Ground Pipework`,
      lead: `Foul water goes to the sewer or a treatment plant; surface water goes to a separate sewer or a soakaway. Connecting one into the other is a fault building control will pick up.`,
      points: [
        'Pipework laid to proper falls, bedded and surrounded in pea gravel',
        'Inspection chambers at junctions and changes of direction',
        'New connections, runs diverted around an extension, drains protected near new footings',
        'Building over or near a public sewer agreed with the water authority first',
        'A percolation test before a soakaway is sized, because clay often will not drain',
        'Crate soakaways, attenuation storage, or a surface water connection where permitted',
      ],
      image: 'paving-preparation',
    },
    {
      h2: `Concrete Pours, Slabs and Formwork`,
      lead: `Concrete is only as good as what is under it and what is in it. A ground-bearing slab starts with compacted Type 1, a sand blinding, the membrane lapped and taped, then insulation where the floor is heated.`,
      points: [
        'Mesh or rebar on spacers, so the steel sits within the concrete',
        'Shuttering braced hard enough that wet concrete cannot push it out of line',
        'Joints planned in on larger slabs so shrinkage cracks along a chosen line',
        'Ready-mixed to the specified strength, pumped where the lorry cannot reach',
        'Compacted, levelled and finished: tamped, floated or power-floated to suit',
        'Covered against rain and frost, kept damp in heat so it does not crack',
      ],
      image: 'patio-slabs',
    },
    {
      h2: `Retaining Walls, Ground Beams and Structural Support`,
      lead: `Soil is heavy, especially wet. When retaining walls fail, missing drainage is usually the reason, so any real height of ground gets an engineer's design, a reinforced base and drainage behind it.`,
      points: [
        'Reinforced blockwork or concrete, faced in brick or stone where on show',
        'Terracing and steps alongside, on sloping gardens',
        'Neighbours spoken to early where a wall holds up their ground',
        'Ground beams: steel cages fixed, shuttering set, poured to the engineer details',
        'Substructure built off the beams once they have cured',
        'Temporary works: walls and floors propped so nothing moves while unsupported',
      ],
      image: 'garden-wall-piers',
    },
    {
      h2: `Underpinning and Deeper Foundations`,
      lead: `Underpinning deepens the foundations under an existing building after subsidence, shallow original footings, or a tree or leaking drain changing the soil. It is also part of most <a href="/basement-conversions/">basement conversions</a>.`,
      points: [
        "An engineer's report first: sometimes the answer is a drain repair, not new foundations",
        'Mass concrete underpinning: the wall dug under in short pins, in a set sequence',
        'Only a small length ever unsupported, each pin inspected before it is filled',
        'Packed tight to the old footing with dry-pack mortar',
        'The next pin only dug once the earlier ones have gained strength',
        'Where piles are specified, a rig comes in and we build the caps on top',
      ],
      image: 'structural-opening',
    },
    {
      h2: `Groundworks for Extensions, New Builds and Gardens`,
      lead: `Most of our groundwork is the first stage of a larger job, and we carry on with the rest of the build rather than handing over. The whole sequence is on our <a href="/house-extensions/">house extensions</a> page.`,
      points: [
        'Extensions: footings dug and poured, up to damp proof course, drains rerouted, slab laid',
        'New builds: site clearance, foundations to the whole footprint, new drainage connections',
        'Service trenches for water, power and data, and the sub-base for drives and paths',
        'Gardens: bases for garden rooms, outbuildings, walls and patios',
        'Levelling and terracing sloping plots, drainage for lawns that hold water',
        'Levels and falls set so water never collects against the house',
      ],
      image: 'new-build-brickwork',
    },
    {
      h2: `Steel Beams and Opening Up Walls`,
      lead: `Taking out a load-bearing wall means putting something in to carry what it held. Usually a steel beam, sized by an engineer from calculations covering the floors, walls and roof above.`,
      points: [
        'Needles through the brickwork on adjustable props, or proprietary wall supports',
        'Wall cut out only once the load above is taken',
        'Beam lifted onto padstones that spread the load into the wall below',
        'The gap above packed tight with dry-pack mortar or slate before the props come out',
        'Building control wants the calculations and to see the beam before it is covered',
        'Fire protection, usually fire-rated plasterboard; party wall notice where it bears on a shared wall',
      ],
      image: 'brick-wall-pointing',
    },
  ],
  process: {
    heading: `How a groundwork job runs`,
    lead: `Most of the risk on structural work is dealt with before the first bucket of soil comes out.`,
    steps: [
      {
        title: `Tell us the job`,
        body: `Use Quick Quote Online or call. Describe the work and send any drawings, engineer's reports or photos of cracks, so we can see straight away whether an engineer is already involved.`,
      },
      {
        title: `Site visit and written quote`,
        body: `Pete visits to look at access, ground, drains and the existing structure. If calculations or a design are still needed, we tell you. You then receive a written quote covering each stage of the work.`,
      },
      {
        title: `Build and sign-off`,
        body: `Excavation, drainage, concrete and steel go in to the engineer's design, with building control inspecting open trenches and beams before they are covered. We hand over the sign-off paperwork.`,
      },
    ],
  },
  cta: {
    heading: `Start with the ground`,
    line: `Send a Quick Quote Online enquiry with your drawings or photos, and Pete will arrange a visit to look at the site.`,
  },
  areas: {
    heading: `Groundwork across south Hampshire`,
    body: `From our base in Hedge End we carry out groundwork and structural alterations in Eastleigh, West End, Botley, Bursledon, Hamble-le-Rice, Chandlers Ford, Fair Oak, Southampton and Bishops Waltham. Ground conditions change quickly across the area, from heavy clay to sand and gravel, with wetter ground near the rivers and the Hamble, so every job starts with a look at what is actually under your house and garden.`,
  },
  faqs: [
    {
      q: `Do I need building control approval for groundwork or a steel beam?`,
      a: `New foundations, underpinning, structural alterations such as removing a load-bearing wall, and most new drainage serving a building all need building regulations approval. Planning permission is a separate question that depends on what is being built, so check with your local planning authority. We can help you work out which approvals apply.`,
    },
    {
      q: `Which foundation type is right for my house?`,
      a: `It depends on the soil, nearby trees, the load and how deep you need to go to reach firm ground. Strip or trench fill footings suit most extensions on reasonable ground. Poor or variable ground may need a reinforced design or piles. The engineer and building control confirm this, often once the trench is open.`,
    },
    {
      q: `What happens if the ground is clay?`,
      a: `Clay shrinks and swells with moisture, so footings go deeper, particularly near trees, and may be lined with a compressible material to take up heave. Soakaways drain slowly in clay, so surface water may need attenuation storage or a sewer connection instead.`,
    },
    {
      q: `How long does underpinning take?`,
      a: `It depends on the number of pins, their depth and the access. Each pin is dug, inspected and poured in sequence, with time for the concrete to gain strength, so underpinning is steady rather than fast. A short run might take a couple of weeks and larger jobs longer. You get a realistic programme with the quote.`,
    },
    {
      q: `Do you provide the structural engineer's calculations?`,
      a: `Calculations come from a structural engineer, not the builder. If you do not have one yet, we can help you arrange one, and we build strictly to their design and to building control approval.`,
    },
  ],
  related: [`house-extensions`, `basement-conversions`, `brickwork`],
  quote: {
    heading: `Quick Quote for groundwork and structural work`,
    lead: `Tell us what you need, where the property is and whether an engineer is already involved. Drawings and photos help.`,
  },
};

export default content;
