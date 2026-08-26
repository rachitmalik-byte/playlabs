"use client";

import { useEffect, useState } from "react";
import { Lottie } from "lottie-react";
import { 
  chemistryLabAnimation, 
  flameAnimation, 
  electricityAnimation, 
  plantGrowthAnimation, 
  celebrationAnimation, 
  waterDropletsAnimation,
  woolSheepAnimation,
  silkwormAnimation,
  nylonRopeAnimation,
  polyesterJacketAnimation,
  plasticBottleAnimation,
  rubberTreeAnimation,
  boilingKettleAnimation,
  tensileMachineAnimation,
  biodegradationAnimation,
  adhesiveBondAnimation
} from "./animations";

export type LottiePreset =
  | "chemistry"
  | "flame"
  | "electricity"
  | "plant"
  | "celebration"
  | "water"
  | "wool"
  | "silk"
  | "rope"
  | "jacket"
  | "bottle"
  | "rubber_tree"
  | "boiling_kettle"
  | "tensile_machine"
  | "biodegradation"
  | "adhesive_bond";

interface LottieAnimationProps {
  preset?: LottiePreset;
  animationData?: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const PRESET_MAP: Record<LottiePreset, any> = {
  chemistry: chemistryLabAnimation,
  flame: flameAnimation,
  electricity: electricityAnimation,
  plant: plantGrowthAnimation,
  celebration: celebrationAnimation,
  water: waterDropletsAnimation,
  wool: woolSheepAnimation,
  silk: silkwormAnimation,
  rope: nylonRopeAnimation,
  jacket: polyesterJacketAnimation,
  bottle: plasticBottleAnimation,
  rubber_tree: rubberTreeAnimation,
  boiling_kettle: boilingKettleAnimation,
  tensile_machine: tensileMachineAnimation,
  biodegradation: biodegradationAnimation,
  adhesive_bond: adhesiveBondAnimation,
};

export function LottieAnimation({
  preset = "chemistry",
  animationData,
  loop = true,
  autoplay = true,
  className = "",
  width = 120,
  height = 120,
}: LottieAnimationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = animationData || PRESET_MAP[preset] || chemistryLabAnimation;

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="w-6 h-6 rounded-full border-2 border-pip-blue border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center select-none pointer-events-none bg-transparent ${className}`}
      style={{ width, height }}
    >
      <Lottie
        src={data}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      />
    </div>
  );
}
