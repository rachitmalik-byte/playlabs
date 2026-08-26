"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const TRAIL_NODES = [
  { id: "origins", icon: "🌱", label: "Origins", route: "/play/origins" },
  { id: "fibres", icon: "🧵", label: "Fibres", route: "/play/fibres" },
  { id: "experiments", icon: "🔬", label: "Experiments", route: "/play/experiments" },
  { id: "safety", icon: "🔥", label: "Safety", route: "/play/safety" },
  { id: "plastic", icon: "⚡", label: "Plastic", route: "/play/plastic" },
  { id: "environment", icon: "🌍", label: "Environment", route: "/play/environment" },
  { id: "extras", icon: "🔧", label: "More", route: "/play/extras" },
  { id: "final-mission", icon: "🏕️", label: "Final", route: "/play/final-mission" },
];

export function LearningTrail({
  completedMissions = [],
  unlockedMissions = ["origins"],
}: {
  completedMissions?: string[];
  unlockedMissions?: string[];
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  // Find current mission index
  const currentIndex = TRAIL_NODES.findIndex((n) => pathname.startsWith(n.route));

  return (
    <>
      {/* Desktop Trail — horizontal sticky bar */}
      <div className="hidden md:block sticky top-0 z-40">
        <div className="bg-white/90 backdrop-blur-sm border-b border-lab-wood/10">
          <div className="max-w-4xl mx-auto px-4 py-2.5">
            <div className="flex items-center justify-between">
              {/* Home link */}
              <Link
                href="/play"
                className="flex items-center gap-2 text-text-muted hover:text-text-dark transition-colors"
              >
                <span className="text-lg">🏠</span>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Materials Mystery
                </span>
              </Link>

              {/* Trail nodes */}
              <div className="flex items-center gap-1">
                {TRAIL_NODES.map((node, i) => {
                  const isCompleted = completedMissions.includes(node.id);
                  const isCurrent = pathname.startsWith(node.route);
                  const isUnlocked =
                    unlockedMissions.includes(node.id) || isCompleted;

                  return (
                    <div key={node.id} className="flex items-center">
                      {i > 0 && (
                        <div
                          className={`w-4 h-0.5 mx-0.5 rounded-full transition-colors ${
                            isCompleted
                              ? "bg-success"
                              : i <= currentIndex
                              ? "bg-pip-blue/30"
                              : "bg-lab-chalk"
                          }`}
                        />
                      )}

                      {isUnlocked ? (
                        <Link href={node.route}>
                          <motion.div
                            className={`trail-node text-sm ${
                              isCompleted
                                ? "completed"
                                : isCurrent
                                ? "current"
                                : "bg-white border-2 border-lab-wood/20 text-text-muted hover:border-pip-blue/30"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title={node.label}
                          >
                            {node.icon}
                          </motion.div>
                        </Link>
                      ) : (
                        <div
                          className="trail-node locked text-sm opacity-50"
                          title={`${node.label} (locked)`}
                        >
                          {node.icon}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Discovery book */}
              <Link
                href="/play/discovery-book"
                className="flex items-center gap-1.5 text-text-muted hover:text-text-dark transition-colors"
              >
                <span className="text-lg">📖</span>
                <span className="text-xs font-semibold hidden lg:inline">
                  My Book
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Trail — compact collapsible indicator */}
      <div className="md:hidden sticky top-0 z-40">
        <div className="bg-white/90 backdrop-blur-sm border-b border-lab-wood/10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-2.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {currentIndex >= 0 ? TRAIL_NODES[currentIndex].icon : "🏠"}
              </span>
              <div className="text-left">
                <p className="text-xs text-text-muted font-medium">
                  Mission {currentIndex >= 0 ? currentIndex + 1 : "—"} of{" "}
                  {TRAIL_NODES.length}
                </p>
                <p className="text-sm font-semibold text-text-dark">
                  {currentIndex >= 0
                    ? TRAIL_NODES[currentIndex].label
                    : "Materials Mystery"}
                </p>
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp size={18} className="text-text-muted" />
            ) : (
              <ChevronDown size={18} className="text-text-muted" />
            )}
          </button>

          {/* Expanded mobile trail */}
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-3 border-t border-lab-chalk"
            >
              <div className="flex flex-wrap gap-2 pt-3">
                {TRAIL_NODES.map((node) => {
                  const isCompleted = completedMissions.includes(node.id);
                  const isCurrent = pathname.startsWith(node.route);
                  const isUnlocked =
                    unlockedMissions.includes(node.id) || isCompleted;

                  return isUnlocked ? (
                    <Link
                      key={node.id}
                      href={node.route}
                      onClick={() => setIsExpanded(false)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        isCurrent
                          ? "bg-pip-blue text-white"
                          : isCompleted
                          ? "bg-success/10 text-success"
                          : "bg-lab-chalk text-text-muted hover:bg-lab-wood/10"
                      }`}
                    >
                      <span>{node.icon}</span>
                      <span>{node.label}</span>
                    </Link>
                  ) : (
                    <span
                      key={node.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-lab-chalk/50 text-text-light/50"
                    >
                      <span>{node.icon}</span>
                      <span>{node.label}</span>
                    </span>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
