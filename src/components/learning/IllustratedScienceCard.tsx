"use client";

import { motion } from "framer-motion";

export type ScienceIllustrationType =
  | "cotton"
  | "wool"
  | "silk"
  | "nylon"
  | "polyester"
  | "plastic"
  | "rubber"
  | "acrylic"
  | "kettle"
  | "tensile"
  | "soil"
  | "wrinkle_compare";

interface IllustratedScienceCardProps {
  type: ScienceIllustrationType;
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IllustratedScienceCard({
  type,
  title,
  subtitle,
  size = "md",
  className = "",
}: IllustratedScienceCardProps) {
  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-20 h-20 sm:w-24 sm:h-24",
    lg: "w-28 h-28 sm:w-32 sm:h-32",
  }[size];

  const renderIllustration = () => {
    switch (type) {
      case "cotton":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Green Stem & Leaves */}
            <path d="M50 90 Q50 60 50 40" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 65 Q30 60 25 45 Q38 52 50 60" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
            <path d="M50 55 Q70 50 75 35 Q62 45 50 52" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
            {/* Fluffy Cotton Boll (3 Puffs) */}
            <circle cx="38" cy="36" r="16" fill="#FFFFFF" stroke="#B0BEC5" strokeWidth="2.5" />
            <circle cx="62" cy="36" r="16" fill="#FFFFFF" stroke="#B0BEC5" strokeWidth="2.5" />
            <circle cx="50" cy="24" r="18" fill="#FFFFFF" stroke="#B0BEC5" strokeWidth="2.5" />
            {/* Brown Calyx / Base */}
            <path d="M36 45 Q50 52 64 45 Q50 48 36 45" fill="#8D6E63" stroke="#5D4037" strokeWidth="1.5" />
            <path d="M42 42 L50 52 L58 42" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case "wool":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Sheep Body (Fluffy Cloud) */}
            <path
              d="M30 65 C20 65 15 55 20 45 C15 35 25 25 35 30 C40 20 55 20 60 28 C70 20 80 30 78 40 C88 45 85 60 75 65 C70 72 35 72 30 65 Z"
              fill="#F5F5F7"
              stroke="#90A4AE"
              strokeWidth="2.5"
            />
            {/* Cute Face */}
            <ellipse cx="68" cy="46" rx="10" ry="12" fill="#FFE082" stroke="#FFB300" strokeWidth="2" />
            <circle cx="70" cy="44" r="2" fill="#212121" />
            {/* Soft Ear */}
            <path d="M72 38 Q82 36 78 44 Z" fill="#FFD54F" stroke="#FFB300" strokeWidth="1.5" />
            {/* Legs */}
            <rect x="32" y="66" width="5" height="15" rx="2.5" fill="#5D4037" />
            <rect x="58" y="66" width="5" height="15" rx="2.5" fill="#5D4037" />
          </svg>
        );

      case "silk":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Green Leaf */}
            <path d="M15 75 Q45 85 85 60 Q55 20 15 75 Z" fill="#81C784" stroke="#388E3C" strokeWidth="2" />
            <path d="M18 73 Q50 60 82 60" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
            {/* Golden Silk Cocoon */}
            <ellipse cx="52" cy="48" rx="20" ry="14" transform="rotate(-15 52 48)" fill="#FFF59D" stroke="#FBC02D" strokeWidth="2.5" />
            {/* Shiny Silk Thread Loop */}
            <path d="M42 42 Q55 30 65 42 Q55 58 45 50" stroke="#F57F17" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case "nylon":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Braided Blue Climbing Rope */}
            <path d="M20 30 Q50 15 80 30 Q50 45 20 60 Q50 75 80 60" stroke="#1E88E5" strokeWidth="8" strokeLinecap="round" />
            <path d="M22 30 Q50 16 78 30 M22 60 Q50 74 78 60" stroke="#90CAF9" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Carabiner Lock */}
            <rect x="68" y="45" width="18" height="26" rx="8" stroke="#FB8C00" strokeWidth="4" fill="none" />
            <rect x="64" y="52" width="6" height="12" rx="2" fill="#E65100" />
          </svg>
        );

      case "polyester":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Athletic Sportswear Shirt */}
            <path
              d="M32 25 L42 28 C45 34 55 34 58 28 L68 25 L80 40 L70 48 L66 42 L66 80 L34 80 L34 42 L30 48 L20 40 Z"
              fill="#FF7043"
              stroke="#D84315"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Quick-Dry Water Droplets Bouncing Off */}
            <path d="M72 58 Q77 50 82 58 Q77 64 72 58 Z" fill="#29B6F6" stroke="#0288D1" strokeWidth="1.5" />
            <path d="M24 62 Q28 56 32 62 Q28 67 24 62 Z" fill="#29B6F6" stroke="#0288D1" strokeWidth="1.5" />
          </svg>
        );

      case "plastic":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Blue Cap */}
            <rect x="42" y="15" width="16" height="10" rx="3" fill="#1976D2" stroke="#0D47A1" strokeWidth="2" />
            {/* Transparent Blue Bottle Body */}
            <path
              d="M44 25 L44 35 C35 42 35 48 35 55 L35 80 Q35 85 40 85 L60 85 Q65 85 65 80 L65 55 C65 48 65 42 56 35 L56 25 Z"
              fill="#E1F5FE"
              stroke="#0288D1"
              strokeWidth="2.5"
            />
            {/* Recycle Arrows Symbol */}
            <circle cx="50" cy="62" r="10" stroke="#00C853" strokeWidth="2" strokeDasharray="8 4" fill="none" />
          </svg>
        );

      case "rubber":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Green Tree Foliage */}
            <ellipse cx="50" cy="30" rx="28" ry="18" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2" />
            {/* Brown Trunk */}
            <rect x="44" y="44" width="12" height="42" rx="3" fill="#795548" stroke="#4E342E" strokeWidth="2" />
            {/* Tapping Cut & Latex Bowl */}
            <line x1="44" y1="58" x2="56" y2="65" stroke="#3E2723" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 68 Q54 74 58 68 Z" fill="#FFFFFF" stroke="#3E2723" strokeWidth="1.5" />
          </svg>
        );

      case "acrylic":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Warm Knitted Sweater */}
            <path
              d="M30 25 L42 28 C45 32 55 32 58 28 L70 25 L82 45 L72 50 L66 42 L66 82 L34 82 L34 42 L28 50 L18 45 Z"
              fill="#AB47BC"
              stroke="#6A1B9A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Warmth Waves */}
            <path d="M42 50 Q50 46 58 50 M42 62 Q50 58 58 62" stroke="#E1BEE7" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case "wrinkle_compare":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Left: Wrinkled Cloth */}
            <rect x="10" y="15" width="45" height="50" rx="8" fill="#FFEBEE" stroke="#E57373" strokeWidth="2" />
            <path d="M18 30 Q28 40 38 28 M20 50 Q32 38 45 48" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" />
            <text x="32" y="74" fontSize="9" fontWeight="bold" fill="#C62828" textAnchor="middle">Wrinkled ✗</text>

            {/* Right: Smooth Polyester */}
            <rect x="65" y="15" width="45" height="50" rx="8" fill="#E8F5E9" stroke="#81C784" strokeWidth="2" />
            <line x1="72" y1="40" x2="102" y2="40" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" />
            <text x="87" y="74" fontSize="9" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Smooth ✓</text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className={`${sizeClasses} flex items-center justify-center p-1.5 transition-transform hover:scale-105`}>
        {renderIllustration()}
      </div>
      {title && (
        <span className="font-black text-xs sm:text-sm text-text-dark text-center mt-1">
          {title}
        </span>
      )}
      {subtitle && (
        <span className="text-[10px] text-text-muted text-center leading-tight">
          {subtitle}
        </span>
      )}
    </div>
  );
}
