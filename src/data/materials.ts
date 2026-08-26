import { Material, FabricSwatch } from '../types/experiments';

export const materials: Material[] = [
  {
    id: 'cotton',
    name: 'Cotton',
    type: 'natural',
    origin: 'Cotton plant',
    properties: ['absorbent', 'breathable', 'comfortable'],
    realWorldUses: [{ name: 'T-shirts', emoji: '👕' }, { name: 'Towels', emoji: '🧻' }],
    superpower: 'Absorbs sweat on a hot summer day!',
    icon: '☁️',
    color: '#F9F6F0'
  },
  {
    id: 'wool',
    name: 'Wool',
    type: 'natural',
    origin: 'Sheep',
    properties: ['warm', 'insulating', 'water-resistant'],
    realWorldUses: [{ name: 'Sweaters', emoji: '🧶' }, { name: 'Blankets', emoji: '🛌' }],
    superpower: 'Traps body heat to keep you warm!',
    icon: '🐑',
    color: '#E8DCC4'
  },
  {
    id: 'silk',
    name: 'Silk',
    type: 'natural',
    origin: 'Silkworm',
    properties: ['smooth', 'lustrous', 'strong'],
    realWorldUses: [{ name: 'Dresses', emoji: '👗' }, { name: 'Scarves', emoji: '🧣' }],
    superpower: 'Shines brilliantly and feels incredibly soft!',
    icon: '🦋',
    color: '#EBD1EB'
  },
  {
    id: 'wood',
    name: 'Wood',
    type: 'natural',
    origin: 'Trees',
    properties: ['hard', 'durable', 'insulator'],
    realWorldUses: [{ name: 'Furniture', emoji: '🪑' }, { name: 'Utensil handles', emoji: '🥄' }],
    superpower: 'Stops heat from burning your hands!',
    icon: '🪵',
    color: '#8B6F47'
  },
  {
    id: 'natural_rubber',
    name: 'Natural Rubber',
    type: 'natural',
    origin: 'Rubber tree sap',
    properties: ['elastic', 'waterproof'],
    realWorldUses: [{ name: 'Bands', emoji: '〰️' }, { name: 'Erasers', emoji: '✏️' }],
    superpower: 'Stretches and snaps back!',
    icon: '🌳',
    color: '#D4C3A3'
  },
  {
    id: 'jute',
    name: 'Jute',
    type: 'natural',
    origin: 'Jute plant',
    properties: ['rough', 'strong', 'biodegradable'],
    realWorldUses: [{ name: 'Sacks', emoji: '🛍️' }, { name: 'Ropes', emoji: '🪢' }],
    superpower: 'Strong enough for heavy loads!',
    icon: '🌾',
    color: '#BFA888'
  },
  {
    id: 'nylon',
    name: 'Nylon',
    type: 'synthetic',
    origin: 'Petrochemicals',
    properties: ['strong', 'elastic', 'lightweight', 'lustrous'],
    realWorldUses: [{ name: 'Parachutes', emoji: '🪂' }, { name: 'Ropes', emoji: '🧗' }],
    superpower: 'Super strength in a tiny thread!',
    icon: '🧵',
    color: '#A0D2EB'
  },
  {
    id: 'polyester',
    name: 'Polyester',
    type: 'synthetic',
    origin: 'Petrochemicals',
    properties: ['wrinkle-resistant', 'quick-drying', 'durable'],
    realWorldUses: [{ name: 'Sportswear', emoji: '🎽' }, { name: 'PET bottles', emoji: '🧴' }],
    superpower: 'Defeats wrinkles and dries in a flash!',
    icon: '🏃',
    color: '#E5AAC3'
  },
  {
    id: 'rayon',
    name: 'Rayon',
    type: 'synthetic',
    origin: 'Wood pulp (chemically treated)',
    properties: ['soft', 'comfortable', 'absorbent'],
    realWorldUses: [{ name: 'Shirts', emoji: '👔' }, { name: 'Bed sheets', emoji: '🛏️' }],
    superpower: 'The affordable twin of fancy silk!',
    icon: '✨',
    color: '#D4B8E1'
  },
  {
    id: 'acrylic',
    name: 'Acrylic',
    type: 'synthetic',
    origin: 'Petrochemicals',
    properties: ['warm', 'lightweight', 'moth-resistant'],
    realWorldUses: [{ name: 'Sweaters', emoji: '🧥' }, { name: 'Blankets', emoji: '🛋️' }],
    superpower: 'Mock wool without the itchy scratch!',
    icon: '🧶',
    color: '#FFB3B3'
  },
  {
    id: 'plastic',
    name: 'Plastic',
    type: 'synthetic',
    origin: 'Petrochemicals',
    properties: ['moldable', 'insulator', 'non-reactive'],
    realWorldUses: [{ name: 'Toys', emoji: '🧸' }, { name: 'Containers', emoji: '🥡' }],
    superpower: 'Takes any shape and lasts forever!',
    icon: '🧩',
    color: '#FFD700'
  },
  {
    id: 'synthetic_rubber',
    name: 'Synthetic Rubber',
    type: 'synthetic',
    origin: 'Petrochemicals',
    properties: ['durable', 'heat-resistant'],
    realWorldUses: [{ name: 'Tires', emoji: '🛞' }, { name: 'Hoses', emoji: '🚿' }],
    superpower: 'Tougher than natural rubber!',
    icon: '🚘',
    color: '#333333'
  },
  {
    id: 'synthetic_adhesive',
    name: 'Synthetic Adhesive',
    type: 'synthetic',
    origin: 'Petrochemicals',
    properties: ['strong bond', 'quick-setting'],
    realWorldUses: [{ name: 'Super glue', emoji: '🧴' }, { name: 'Tape', emoji: '🩹' }],
    superpower: 'Sticks things together permanently!',
    icon: '🧪',
    color: '#B3E6B3'
  }
];

export const fabricSwatches: Record<string, FabricSwatch> = {
  cotton: {
    materialId: 'cotton',
    burnBehavior: {
      description: 'Burns vigorously, smells like burning paper.',
      meltsDangerously: false,
      ashDescription: 'Leaves a fine, grayish ash.'
    },
    tensileStrengthKg: 5,
    waterAbsorption: 'high',
    mothResistant: false
  },
  nylon: {
    materialId: 'nylon',
    burnBehavior: {
      description: 'Shrinks from flame, melts and burns slowly, smells like celery.',
      meltsDangerously: true,
      ashDescription: 'Leaves a hard, gray, uncrushable bead.'
    },
    tensileStrengthKg: 20,
    waterAbsorption: 'low',
    mothResistant: true
  },
  polyester: {
    materialId: 'polyester',
    burnBehavior: {
      description: 'Shrinks from flame, melts and burns, smells sweet or chemical.',
      meltsDangerously: true,
      ashDescription: 'Leaves a hard, dark, round bead.'
    },
    tensileStrengthKg: 15,
    waterAbsorption: 'low',
    mothResistant: true
  },
  acrylic: {
    materialId: 'acrylic',
    burnBehavior: {
      description: 'Melts and burns rapidly with a sputtering flame, smells acrid.',
      meltsDangerously: true,
      ashDescription: 'Leaves a hard, brittle, black bead.'
    },
    tensileStrengthKg: 10,
    waterAbsorption: 'low',
    mothResistant: true
  }
};
