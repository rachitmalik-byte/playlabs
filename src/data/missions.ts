import { Mission } from '../types/concepts';

export const missions: Mission[] = [
  {
    id: 'origins',
    title: 'Mission 1: Origins',
    subtitle: 'Where does stuff come from?',
    icon: '🌍',
    concepts: ['material', 'natural_material', 'synthetic_material'],
    isCompleted: false,
    isUnlocked: true,
    route: '/missions/origins'
  },
  {
    id: 'fibres',
    title: 'Mission 2: Fantastic Fibres',
    subtitle: 'The threads that make our world.',
    icon: '🧵',
    concepts: ['fibre', 'nylon', 'polyester', 'rayon', 'acrylic'],
    isCompleted: false,
    isUnlocked: false,
    route: '/missions/fibres'
  },
  {
    id: 'experiments',
    title: 'Mission 3: Lab Tests',
    subtitle: 'Test strength, heat, and water!',
    icon: '🧪',
    concepts: ['plastic_properties', 'heat_conductor', 'heat_insulator', 'electrical_conductor', 'electrical_insulator'],
    isCompleted: false,
    isUnlocked: false,
    route: '/missions/experiments'
  },
  {
    id: 'safety',
    title: 'Mission 4: Safety First',
    subtitle: 'Why plastics and fire do not mix.',
    icon: '🔥',
    concepts: ['plastic_safety'],
    isCompleted: false,
    isUnlocked: false,
    route: '/missions/safety'
  },
  {
    id: 'plastic',
    title: 'Mission 5: The Plastic Paradox',
    subtitle: 'Amazing uses, terrible trash.',
    icon: '🧩',
    concepts: ['synthetic_rubber', 'synthetic_adhesive', 'non_biodegradable'],
    isCompleted: false,
    isUnlocked: false,
    route: '/missions/plastic'
  },
  {
    id: 'environment',
    title: 'Mission 6: Saving the Planet',
    subtitle: 'The 5 Rs of plastic management.',
    icon: '🌱',
    concepts: ['environmental_impact'],
    isCompleted: false,
    isUnlocked: false,
    route: '/missions/environment'
  },
  {
    id: 'extras',
    title: 'Mission 7: Bonus Discoveries',
    subtitle: 'Extra facts for true scientists.',
    icon: '⭐',
    concepts: [],
    isCompleted: false,
    isUnlocked: false,
    route: '/missions/extras'
  },
  {
    id: 'final-mission',
    title: 'The Final Exam',
    subtitle: 'Prove your materials mastery!',
    icon: '🎓',
    concepts: [],
    isCompleted: false,
    isUnlocked: false,
    route: '/missions/final'
  }
];
