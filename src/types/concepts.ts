export type ConceptMastery = 'not_started' | 'introduced' | 'developing' | 'understood' | 'mastered';

export type ConceptId =
  | 'material' | 'natural_material' | 'synthetic_material'
  | 'fibre' | 'nylon' | 'polyester' | 'rayon' | 'acrylic'
  | 'plastic_properties' | 'heat_conductor' | 'heat_insulator'
  | 'electrical_conductor' | 'electrical_insulator'
  | 'synthetic_rubber' | 'synthetic_adhesive'
  | 'non_biodegradable' | 'plastic_safety' | 'environmental_impact';

export type LearningConcept = {
  id: ConceptId;
  title: string;
  simpleExplanation: string;
  academicTerm: string;
  examAnswer: string;
  prerequisites: ConceptId[];
  mastery: ConceptMastery;
  attempts: number;
  correctAttempts: number;
  lastReviewedAt?: string;
};

export type MissionId = 
  | 'origins' | 'fibres' | 'experiments' | 'safety' 
  | 'plastic' | 'environment' | 'extras' | 'final-mission';

export type Mission = {
  id: MissionId;
  title: string;
  subtitle: string;
  icon: string;
  concepts: ConceptId[];
  isCompleted: boolean;
  isUnlocked: boolean;
  route: string;
};
