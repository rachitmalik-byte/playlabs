"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// === PARENT DASHBOARD ===
// Calm, useful, completely different from the child's game experience
// Shows UNDERSTANDING, not just scores

type ConceptStatus = "strong" | "developing" | "needs_practice" | "not_started";

type ConceptProgress = {
  name: string;
  status: ConceptStatus;
  detail: string;
};

// Simulated progress data (in production, this comes from the learning engine)
const CONCEPT_PROGRESS: ConceptProgress[] = [
  { name: "Natural vs Synthetic", status: "strong", detail: "Correctly sorted 9/9 materials and explained the difference" },
  { name: "Nylon strength", status: "strong", detail: "Predicted correctly and connected to real-world uses" },
  { name: "Cotton breathability", status: "strong", detail: "Understands why cotton is better in summer" },
  { name: "Fire safety", status: "developing", detail: "Knows cotton is safer but unsure why synthetic melts" },
  { name: "Polyester properties", status: "developing", detail: "Identified water resistance but missed wrinkle resistance" },
  { name: "Rayon classification", status: "developing", detail: "Confused whether rayon is natural or synthetic" },
  { name: "Electrical insulation", status: "needs_practice", detail: "Can identify plastic as insulator but can't explain why" },
  { name: "Heat insulation", status: "needs_practice", detail: "Chose metal handle for kettle — needs to revisit" },
  { name: "Plastic environmental impact", status: "developing", detail: "Knows plastic lasts long but unclear on 'non-biodegradable'" },
  { name: "Acrylic properties", status: "strong", detail: "Correctly identified as wool-like synthetic" },
  { name: "Synthetic rubber", status: "not_started", detail: "Not yet explored" },
  { name: "Synthetic adhesives", status: "not_started", detail: "Not yet explored" },
];

const HOME_ACTIVITIES = [
  {
    emoji: "👕",
    title: "Label Hunt",
    description: "Find 3 clothing labels together. Read what material each garment is made from. Ask: \"Is this natural or synthetic?\"",
    time: "5 min",
  },
  {
    emoji: "☕",
    title: "Kitchen Detective",
    description: "Look at a cooking pan or kettle handle. Ask: \"Why isn't the handle made of metal?\"",
    time: "3 min",
  },
  {
    emoji: "🪢",
    title: "Nylon Finder",
    description: "Find one object at home made from nylon. Hint: check toothbrushes, bags, or ropes.",
    time: "3 min",
  },
  {
    emoji: "🧴",
    title: "Plastic Audit",
    description: "Count how many plastic objects are in one room. Discuss: Why is plastic used so much? What problems can it cause?",
    time: "5 min",
  },
  {
    emoji: "🔌",
    title: "Wire Check",
    description: "Look at any electrical wire. Ask: \"What is the outer covering? Why is it there?\"",
    time: "3 min",
  },
];

const statusConfig = {
  strong: { label: "Strong", color: "text-success", bg: "bg-success/8", border: "border-success/15", icon: "✓" },
  developing: { label: "Developing", color: "text-factory-orange", bg: "bg-factory-orange/8", border: "border-factory-orange/15", icon: "◐" },
  needs_practice: { label: "Needs Practice", color: "text-fire-red", bg: "bg-fire-red/6", border: "border-fire-red/12", icon: "○" },
  not_started: { label: "Not Started", color: "text-text-light", bg: "bg-lab-chalk/50", border: "border-lab-wood/8", icon: "—" },
};

export default function ParentDashboard() {
  const strong = CONCEPT_PROGRESS.filter((c) => c.status === "strong");
  const developing = CONCEPT_PROGRESS.filter((c) => c.status === "developing");
  const needsPractice = CONCEPT_PROGRESS.filter((c) => c.status === "needs_practice");
  const notStarted = CONCEPT_PROGRESS.filter((c) => c.status === "not_started");

  return (
    <div className="min-h-screen bg-lab-cream">
      {/* Clean header */}
      <div className="bg-white border-b border-lab-wood/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-text-dark">
              Learning Progress
            </h1>
            <p className="text-sm text-text-muted">
              Materials Science — Chapter Overview
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-pip-blue font-semibold hover:text-pip-blue-dark transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Natural language insight — the MOST important section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-bold text-text-dark mb-4">
            What Your Child Understands
          </h2>
          <div className="bg-white rounded-xl border border-lab-wood/10 p-5 space-y-3">
            <p className="text-base text-text-dark leading-relaxed">
              Your child can <strong>correctly sort materials</strong> into natural
              and synthetic categories. They understand that{" "}
              <strong>nylon is strong</strong> and used in ropes and parachutes,
              and that <strong>cotton is breathable</strong> and safer near fire.
            </p>
            <p className="text-base text-text-dark leading-relaxed">
              They&apos;re still building understanding of{" "}
              <strong>why synthetic fabrics melt</strong> near flames, and are{" "}
              <strong>confused about whether rayon is natural or synthetic</strong>.
            </p>
            <p className="text-base text-text-dark leading-relaxed">
              They need more practice understanding{" "}
              <strong>electrical and heat insulation</strong> — they can identify
              plastic as an insulator but can&apos;t yet explain the underlying reason.
            </p>
          </div>
        </motion.section>

        {/* Concept mastery breakdown */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-text-dark mb-4">
            Concept Mastery
          </h2>

          {/* Summary counts */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "Strong", count: strong.length, config: statusConfig.strong },
              { label: "Developing", count: developing.length, config: statusConfig.developing },
              { label: "Needs Practice", count: needsPractice.length, config: statusConfig.needs_practice },
              { label: "Not Started", count: notStarted.length, config: statusConfig.not_started },
            ].map((item) => (
              <div
                key={item.label}
                className={`${item.config.bg} border ${item.config.border} rounded-lg p-3 text-center`}
              >
                <p className={`text-2xl font-bold ${item.config.color}`}>
                  {item.count}
                </p>
                <p className="text-xs text-text-muted font-medium mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed concept list */}
          <div className="space-y-2">
            {CONCEPT_PROGRESS.map((concept, i) => {
              const config = statusConfig[concept.status];
              return (
                <motion.div
                  key={concept.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-start gap-3 p-3 rounded-lg ${config.bg} border ${config.border}`}
                >
                  <span className={`text-sm font-bold ${config.color} mt-0.5 w-5 text-center`}>
                    {config.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-dark">
                      {concept.name}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {concept.detail}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium ${config.color} shrink-0`}
                  >
                    {config.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Home connection activities */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-text-dark mb-2">
            Try at Home
          </h2>
          <p className="text-sm text-text-muted mb-4">
            Quick activities to reinforce learning — less than 5 minutes each
          </p>

          <div className="space-y-3">
            {HOME_ACTIVITIES.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="flex gap-4 p-4 bg-white rounded-xl border border-lab-wood/10"
              >
                <span className="text-3xl shrink-0">{activity.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-text-dark">
                      {activity.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-text-light bg-lab-chalk px-2 py-0.5 rounded-full">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
