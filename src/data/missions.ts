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
    route: '/play/origins'
  },
  {
    id: 'fibres',
    title: 'Mission 2: Fantastic Fibres',
    subtitle: 'The threads that make our world.',
    icon: '🧵',
    concepts: ['fibre', 'nylon', 'polyester', 'rayon', 'acrylic'],
    isCompleted: false,
    isUnlocked: false,
    route: '/play/fibres'
  },
  {
    id: 'experiments',
    title: 'Mission 3: Lab Tests',
    subtitle: 'Test strength, heat, and water!',
    icon: '🧪',
    concepts: ['plastic_properties', 'heat_conductor', 'heat_insulator', 'electrical_conductor', 'electrical_insulator'],
    isCompleted: false,
    isUnlocked: false,
    route: '/play/experiments'
  },
  {
    id: 'safety',
    title: 'Mission 4: Safety First',
    subtitle: 'Why plastics and fire do not mix.',
    icon: '🔥',
    concepts: ['plastic_safety'],
    isCompleted: false,
    isUnlocked: false,
    route: '/play/safety'
  },
  {
    id: 'plastic',
    title: 'Mission 5: The Plastic Paradox',
    subtitle: 'Amazing uses, terrible trash.',
    icon: '🧩',
    concepts: ['synthetic_rubber', 'synthetic_adhesive', 'non_biodegradable'],
    isCompleted: false,
    isUnlocked: false,
    route: '/play/plastic'
  },
  {
    id: 'environment',
    title: 'Mission 6: Saving the Planet',
    subtitle: 'The 5 Rs of plastic management.',
    icon: '🌱',
    concepts: ['environmental_impact'],
    isCompleted: false,
    isUnlocked: false,
    route: '/play/environment'
  },
  {
    id: 'extras',
    title: 'Mission 7: Rubber & Glue Lab',
    subtitle: 'Synthetic rubber and adhesives.',
    icon: '⭐',
    concepts: [],
    isCompleted: false,
    isUnlocked: false,
    route: '/play/extras'
  },
  {
    id: 'final-mission',
    title: 'Mission 8: Pip\'s Safe Camp',
    subtitle: 'Prove your materials mastery!',
    icon: '🎓',
    concepts: [],
    isCompleted: false,
    isUnlocked: false,
    route: '/play/final-mission'
  }
];
