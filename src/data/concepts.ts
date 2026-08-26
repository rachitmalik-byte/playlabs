import { LearningConcept, ConceptId } from '../types/concepts';

export const concepts: Record<ConceptId, Omit<LearningConcept, 'mastery' | 'attempts' | 'correctAttempts' | 'lastReviewedAt'>> = {
  material: {
    id: 'material',
    title: 'Materials',
    simpleExplanation: 'The stuff things are made from.',
    academicTerm: 'Material',
    examAnswer: 'A material is a substance from which objects and items are made.',
    prerequisites: []
  },
  natural_material: {
    id: 'natural_material',
    title: 'Natural Materials',
    simpleExplanation: 'Stuff we get directly from nature, like plants, animals, or the earth.',
    academicTerm: 'Natural Material',
    examAnswer: 'Natural materials are obtained from natural sources such as plants, animals, or rocks and minerals.',
    prerequisites: ['material']
  },
  synthetic_material: {
    id: 'synthetic_material',
    title: 'Synthetic Materials',
    simpleExplanation: 'Stuff made by humans in factories, usually using chemicals.',
    academicTerm: 'Synthetic Material',
    examAnswer: 'Synthetic materials are human-made materials produced in industries using chemical processes, often originating from petrochemicals.',
    prerequisites: ['material']
  },
  fibre: {
    id: 'fibre',
    title: 'Fibres',
    simpleExplanation: 'Tiny, thin threads that can be spun together to make fabric.',
    academicTerm: 'Fibre',
    examAnswer: 'A fibre is a thin, thread-like structure that can be spun into yarn and woven or knitted into fabrics.',
    prerequisites: ['material']
  },
  nylon: {
    id: 'nylon',
    title: 'Nylon',
    simpleExplanation: 'Super strong and lightweight thread.',
    academicTerm: 'Synthetic fibre - Nylon',
    examAnswer: 'Nylon is a synthetic fibre with high tensile strength, elasticity, and resistance to wear. It is used in making ropes, parachutes, and toothbrush bristles.',
    prerequisites: ['synthetic_material', 'fibre']
  },
  polyester: {
    id: 'polyester',
    title: 'Polyester',
    simpleExplanation: 'A fabric that doesn\'t wrinkle easily and dries really fast.',
    academicTerm: 'Synthetic fibre - Polyester',
    examAnswer: 'Polyester is a synthetic fibre known for being durable, wrinkle-resistant, and quick-drying. It is commonly blended with cotton for making clothing and used in making PET bottles.',
    prerequisites: ['synthetic_material', 'fibre']
  },
  rayon: {
    id: 'rayon',
    title: 'Rayon (Artificial Silk)',
    simpleExplanation: 'A synthetic fabric made from wood pulp that feels smooth like silk.',
    academicTerm: 'Synthetic fibre - Rayon',
    examAnswer: 'Rayon is a synthetic fibre made by chemically treating wood pulp. It is cheaper than silk but has similar properties, earning it the name "artificial silk".',
    prerequisites: ['synthetic_material', 'fibre']
  },
  acrylic: {
    id: 'acrylic',
    title: 'Acrylic',
    simpleExplanation: 'A cozy, warm fabric that feels like wool but is made in a factory.',
    academicTerm: 'Synthetic fibre - Acrylic',
    examAnswer: 'Acrylic is a synthetic fibre that resembles wool. It is lightweight, soft, and warm, and is more affordable and durable than natural wool, often used for making sweaters and blankets.',
    prerequisites: ['synthetic_material', 'fibre']
  },
  plastic_properties: {
    id: 'plastic_properties',
    title: 'Plastic Properties',
    simpleExplanation: 'Plastics are light, strong, and can be molded into any shape, but they don\'t break down easily.',
    academicTerm: 'Properties of Plastics',
    examAnswer: 'Plastics are typically non-reactive, light, strong, durable, and can be molded into various shapes and sizes. They are poor conductors of heat and electricity.',
    prerequisites: ['synthetic_material']
  },
  heat_conductor: {
    id: 'heat_conductor',
    title: 'Heat Conductor',
    simpleExplanation: 'Allows heat to travel through it quickly, like a metal spoon in hot soup.',
    academicTerm: 'Good conductor of heat',
    examAnswer: 'A material is a good conductor of heat if it allows thermal energy to flow through it easily.',
    prerequisites: []
  },
  heat_insulator: {
    id: 'heat_insulator',
    title: 'Heat Insulator',
    simpleExplanation: 'Stops heat from traveling through it, like the plastic handle on a frying pan.',
    academicTerm: 'Poor conductor of heat / Thermal insulator',
    examAnswer: 'Thermal insulators are materials that do not allow heat to pass through them easily. For example, plastic and wood are used for handles of cooking utensils.',
    prerequisites: ['heat_conductor']
  },
  electrical_conductor: {
    id: 'electrical_conductor',
    title: 'Electrical Conductor',
    simpleExplanation: 'Allows electricity to travel through it.',
    academicTerm: 'Good conductor of electricity',
    examAnswer: 'A material is a good conductor of electricity if it allows electrical current to pass through it with minimal resistance.',
    prerequisites: []
  },
  electrical_insulator: {
    id: 'electrical_insulator',
    title: 'Electrical Insulator',
    simpleExplanation: 'Stops electricity from getting through, protecting us from shocks.',
    academicTerm: 'Electrical insulator / Poor conductor of electricity',
    examAnswer: 'Materials like plastic are poor conductors of electricity and are used as insulators to coat electrical wires and make switches.',
    prerequisites: ['electrical_conductor']
  },
  synthetic_rubber: {
    id: 'synthetic_rubber',
    title: 'Synthetic Rubber',
    simpleExplanation: 'Stretchy material made in factories, used for things like car tires.',
    academicTerm: 'Synthetic Rubber',
    examAnswer: 'Synthetic rubber is a human-made polymer designed to replicate or improve upon the properties of natural rubber, widely used in automotive tires.',
    prerequisites: ['synthetic_material']
  },
  synthetic_adhesive: {
    id: 'synthetic_adhesive',
    title: 'Synthetic Adhesives',
    simpleExplanation: 'Super strong glues made in factories.',
    academicTerm: 'Synthetic Adhesives',
    examAnswer: 'Synthetic adhesives are engineered bonding agents, such as epoxy or super glue, manufactured through chemical processes for high-strength applications.',
    prerequisites: ['synthetic_material']
  },
  non_biodegradable: {
    id: 'non_biodegradable',
    title: 'Non-biodegradable',
    simpleExplanation: 'Things that nature cannot break down over time, so they become garbage for hundreds of years.',
    academicTerm: 'Non-biodegradable',
    examAnswer: 'A material is non-biodegradable if it is not easily decomposed by natural processes, such as the action of bacteria. Most plastics are non-biodegradable.',
    prerequisites: ['plastic_properties']
  },
  plastic_safety: {
    id: 'plastic_safety',
    title: 'Plastic Safety',
    simpleExplanation: 'You should not wear clothes made of synthetic plastics near fire, because they can melt and stick to you.',
    academicTerm: 'Hazards of Synthetic Fibres',
    examAnswer: 'Synthetic fibres catch fire easily and melt on heating. This is hazardous because if the clothes catch fire, the fabric melts and sticks to the body of the person wearing it.',
    prerequisites: ['synthetic_material', 'fibre']
  },
  environmental_impact: {
    id: 'environmental_impact',
    title: 'Environmental Impact of Plastics',
    simpleExplanation: 'Plastics create pollution because they don\'t go away, so we need to reduce, reuse, and recycle.',
    academicTerm: 'Environmental Impact and Management of Plastics',
    examAnswer: 'Since plastics take several years to decompose, they cause environmental pollution. Managing plastic waste involves the 5 Rs: Reduce, Reuse, Recycle, Recover, and Refuse.',
    prerequisites: ['plastic_properties', 'non_biodegradable']
  }
};
