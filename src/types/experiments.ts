export type ExperimentId = 'burn_test' | 'water_test' | 'strength_test' | 'conductivity_test';

export type MaterialId = 
  | 'cotton' | 'wool' | 'silk' | 'wood' | 'natural_rubber' | 'jute'
  | 'nylon' | 'polyester' | 'rayon' | 'acrylic' | 'plastic' | 'synthetic_rubber' | 'synthetic_adhesive';

export type MaterialType = 'natural' | 'synthetic';

export type RealWorldUse = {
  name: string;
  emoji: string;
};

export type Material = {
  id: MaterialId;
  name: string;
  type: MaterialType;
  origin: string;
  properties: string[];
  realWorldUses: RealWorldUse[];
  superpower: string;
  icon: string;
  color: string;
};

export type BurnBehavior = {
  description: string;
  meltsDangerously: boolean;
  ashDescription: string;
};

export type FabricSwatch = {
  materialId: MaterialId;
  burnBehavior: BurnBehavior;
  tensileStrengthKg: number;
  waterAbsorption: 'high' | 'medium' | 'low';
  mothResistant: boolean;
};

export type InteractiveTestConfig = {
  experimentId: ExperimentId;
  title: string;
  description: string;
  materialsToTest: MaterialId[];
};
