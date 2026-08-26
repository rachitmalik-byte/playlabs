"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const MISSIONS = [
  {
    id: "origins",
    icon: "🌱",
    title: "Origins",
    subtitle: "What are things made from?",
    route: "/play/origins",
    color: "from-nature-green/15 to-nature-green/5",
    borderColor: "border-nature-green/20 hover:border-nature-green/40",
    unlocked: true,
  },
  {
    id: "fibres",
    icon: "🧵",
    title: "Fibres",
    subtitle: "Meet the four fabrics",
    route: "/play/fibres",
    color: "from-pip-blue/15 to-pip-blue/5",
    borderColor: "border-pip-blue/20 hover:border-pip-blue/40",
    unlocked: true,
  },
  {
    id: "experiments",
    icon: "🔬",
    title: "Experiments",
    subtitle: "Test their superpowers",
    route: "/play/experiments",
    color: "from-factory-orange/15 to-factory-orange/5",
    borderColor: "border-factory-orange/20 hover:border-factory-orange/40",
    unlocked: true,
  },
  {
    id: "safety",
    icon: "🔥",
    title: "Safety",
    subtitle: "Fire & summer tests",
    route: "/play/safety",
    color: "from-fire-red/12 to-fire-red/4",
    borderColor: "border-fire-red/20 hover:border-fire-red/40",
    unlocked: true,
  },
  {
    id: "plastic",
    icon: "⚡",
    title: "Plastic & Power",
    subtitle: "Electricity & heat",
    route: "/play/plastic",
    color: "from-hint-yellow/15 to-hint-yellow/5",
    borderColor: "border-hint-yellow/30 hover:border-hint-yellow/50",
    unlocked: true,
  },
  {
    id: "environment",
    icon: "🌍",
    title: "Environment",
    subtitle: "What happens underground?",
    route: "/play/environment",
    color: "from-earth-brown/12 to-earth-brown/4",
    borderColor: "border-earth-brown/20 hover:border-earth-brown/40",
    unlocked: true,
  },
  {
    id: "extras",
    icon: "🔧",
    title: "Rubber & Glue",
    subtitle: "Stretch & stick",
    route: "/play/extras",
    color: "from-lab-wood/12 to-lab-wood/4",
    borderColor: "border-lab-wood/20 hover:border-lab-wood/40",
    unlocked: true,
  },
  {
    id: "final-mission",
    icon: "🏕️",
    title: "Final Mission",
    subtitle: "Build Pip's safe camp",
    route: "/play/final-mission",
    color: "from-success/12 to-success/4",
    borderColor: "border-success/20 hover:border-success/40",
    unlocked: true,
  },
];

export default function PlayMapPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-dark mb-2">
          The Materials Mystery
        </h1>
        <p className="text-text-muted text-lg">
          Every object holds a secret. Discover it.
        </p>
      </motion.div>

      {/* Adventure trail — vertical illustrated path */}
      <div className="relative">
        {/* Trail line */}
        <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-nature-green/30 via-pip-blue/20 to-success/30" />

        {/* Mission nodes */}
        <div className="flex flex-col gap-4">
          {MISSIONS.map((mission, i) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              {mission.unlocked ? (
                <Link href={mission.route} className="block group">
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Node circle */}
                    <motion.div
                      className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-lab-wood/15 group-hover:border-pip-blue/40 transition-colors shadow-soft"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl sm:text-3xl">{mission.icon}</span>
                    </motion.div>

                    {/* Mission info */}
                    <div
                      className={`flex-1 bg-gradient-to-r ${mission.color} rounded-xl border ${mission.borderColor} px-5 py-4 transition-all group-hover:shadow-soft`}
                    >
                      <h3 className="text-lg font-bold text-text-dark">
                        {mission.title}
                      </h3>
                      <p className="text-sm text-text-muted mt-0.5">
                        {mission.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-4 sm:gap-6 opacity-40">
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-lab-chalk border-2 border-lab-wood/10">
                    <span className="text-2xl sm:text-3xl grayscale">
                      {mission.icon}
                    </span>
                  </div>
                  <div className="flex-1 bg-lab-chalk/50 rounded-xl border border-lab-wood/10 px-5 py-4">
                    <h3 className="text-lg font-bold text-text-light">
                      {mission.title}
                    </h3>
                    <p className="text-sm text-text-light mt-0.5">
                      {mission.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* End trophy */}
        <motion.div
          className="flex items-center gap-4 sm:gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-hint-yellow to-factory-orange shadow-warm">
            <span className="text-2xl sm:text-3xl">🏆</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-text-dark">
              Material Master
            </h3>
            <p className="text-sm text-text-muted">
              Complete all missions to earn this title
            </p>
          </div>
        </motion.div>
      </div>

      {/* Discovery Book link */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          href="/play/discovery-book"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-lab-wood/15 text-text-muted hover:text-text-dark hover:border-lab-wood/30 transition-all hover:shadow-soft"
        >
          <span className="text-xl">📖</span>
          <span className="font-semibold">My Discovery Book</span>
        </Link>
      </motion.div>
    </div>
  );
}
