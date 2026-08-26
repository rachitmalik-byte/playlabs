export type Question = {
  id: string;
  conceptId: string;
  type: 'retrieval' | 'exam_bridge';
  question?: string;
  options?: string[];
  correctAnswer?: string;
  childSaid?: string;
  scientistSays?: string;
  examAnswer?: string;
  explanation?: string;
};

export const questions: Question[] = [
  {
    id: 'q_mat_1',
    conceptId: 'material',
    type: 'retrieval',
    question: 'When you look at a wooden chair, what is the "material"?',
    options: ['The chair itself', 'The wood', 'The color brown', 'The shape of the chair'],
    correctAnswer: 'The wood',
    explanation: 'A material is the substance used to make the object. The chair is the object, and wood is the material.'
  },
  {
    id: 'q_mat_2',
    conceptId: 'synthetic_material',
    type: 'retrieval',
    question: 'Why are plastic bottles considered "synthetic"?',
    options: ['Because they are cheap', 'Because they hold water', 'Because they are made by humans in factories using chemicals', 'Because they are clear'],
    correctAnswer: 'Because they are made by humans in factories using chemicals',
    explanation: 'Synthetic materials do not exist in nature; they are created through chemical processes.'
  },
  {
    id: 'q_mat_3',
    conceptId: 'synthetic_material',
    type: 'exam_bridge',
    childSaid: 'Plastics are made in a factory by people.',
    scientistSays: 'Plastics are synthetic materials produced in industries using chemical processes.',
    examAnswer: 'Synthetic materials are human-made materials produced in industries using chemical processes, often originating from petrochemicals.'
  },
  {
    id: 'q_nyl_1',
    conceptId: 'nylon',
    type: 'retrieval',
    question: 'If you need a rope for rock climbing, why is nylon a better choice than cotton?',
    options: ['Nylon comes in brighter colors', 'Nylon is much stronger and elastic', 'Nylon smells better', 'Nylon is softer'],
    correctAnswer: 'Nylon is much stronger and elastic',
    explanation: 'Nylon has very high tensile strength, making it perfect for parachutes and climbing ropes.'
  },
  {
    id: 'q_nyl_2',
    conceptId: 'nylon',
    type: 'exam_bridge',
    childSaid: 'Nylon is a super strong string.',
    scientistSays: 'Nylon is a synthetic fibre with high tensile strength.',
    examAnswer: 'Nylon is a synthetic fibre with high tensile strength, elasticity, and resistance to wear.'
  },
  {
    id: 'q_safe_1',
    conceptId: 'plastic_safety',
    type: 'retrieval',
    question: 'Why does a chef wear a cotton apron instead of a polyester one?',
    options: ['Cotton looks more professional', 'Cotton is cheaper', 'Polyester melts dangerously if it gets near a hot stove', 'Polyester is too heavy'],
    correctAnswer: 'Polyester melts dangerously if it gets near a hot stove',
    explanation: 'Synthetic fibres like polyester melt on heating and can stick to the skin causing severe burns.'
  },
  {
    id: 'q_safe_2',
    conceptId: 'plastic_safety',
    type: 'exam_bridge',
    childSaid: 'Don\'t wear fake fabrics near a fire because they melt onto you.',
    scientistSays: 'Synthetic fibres are hazardous near fire because they melt on heating.',
    examAnswer: 'Synthetic fibres catch fire easily and melt on heating. This is hazardous because the fabric melts and sticks to the body of the person wearing it.'
  }
];
