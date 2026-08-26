"use client";

import { LearningTrail } from "@/components/world/LearningTrail";
import { SoundControl } from "@/components/ui";

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a full implementation, these would come from the learning engine context
  const completedMissions: string[] = [];
  const unlockedMissions = ["origins", "fibres", "experiments", "safety", "plastic", "environment", "extras", "final-mission"];

  return (
    <div className="min-h-screen lab-bg">
      <SoundControl />
      <LearningTrail
        completedMissions={completedMissions}
        unlockedMissions={unlockedMissions}
      />
      <main>{children}</main>
    </div>
  );
}
