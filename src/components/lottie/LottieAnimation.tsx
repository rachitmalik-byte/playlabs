"use client";

import { useEffect, useState } from "react";
import { Lottie } from "lottie-react";
import { 
  chemistryLabAnimation, 
  flameAnimation, 
  electricityAnimation, 
  plantGrowthAnimation, 
  celebrationAnimation, 
  waterDropletsAnimation 
} from "./animations";

export type LottiePreset =
  | "chemistry"
  | "flame"
  | "electricity"
  | "plant"
  | "celebration"
  | "water";

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
        <div className="w-8 h-8 rounded-full border-2 border-pip-blue border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width, height }}
    >
      <Lottie
        animationData={data}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
