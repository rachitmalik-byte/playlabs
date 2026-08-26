"use client";

export type ScienceIllustrationType =
  | "cotton"
  | "wool"
  | "silk"
  | "nylon"
  | "polyester"
  | "plastic"
  | "rubber"
  | "acrylic"
  | "insulator"
  | "heat_insulator"
  | "conductor"
  | "breathable"
  | "wrinkle_compare"
  | "tensile"
  | "polymer"
  | "monomer"
  | "non_biodegradable"
  | "synthetic"
  | "natural";

interface IllustratedScienceCardProps {
  type: ScienceIllustrationType;
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg" | "banner";
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
    banner: "w-full h-28 sm:h-36",
  }[size];

  const renderIllustration = () => {
    switch (type) {
      case "cotton":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            <path d="M50 90 Q50 60 50 40" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 65 Q30 60 25 45 Q38 52 50 60" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
            <path d="M50 55 Q70 50 75 35 Q62 45 50 52" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
            <circle cx="38" cy="36" r="15" fill="#FFFFFF" stroke="#90A4AE" strokeWidth="2.5" />
            <circle cx="62" cy="36" r="15" fill="#FFFFFF" stroke="#90A4AE" strokeWidth="2.5" />
            <circle cx="50" cy="24" r="17" fill="#FFFFFF" stroke="#90A4AE" strokeWidth="2.5" />
            <path d="M36 45 Q50 52 64 45 Q50 48 36 45" fill="#8D6E63" stroke="#5D4037" strokeWidth="1.5" />
          </svg>
        );

      case "wool":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            <path
              d="M30 65 C20 65 15 55 20 45 C15 35 25 25 35 30 C40 20 55 20 60 28 C70 20 80 30 78 40 C88 45 85 60 75 65 C70 72 35 72 30 65 Z"
              fill="#F5F5F7"
              stroke="#90A4AE"
              strokeWidth="2.5"
            />
            <ellipse cx="68" cy="46" rx="10" ry="12" fill="#FFE082" stroke="#FFB300" strokeWidth="2" />
            <circle cx="70" cy="44" r="2" fill="#212121" />
            <path d="M72 38 Q82 36 78 44 Z" fill="#FFD54F" stroke="#FFB300" strokeWidth="1.5" />
            <rect x="32" y="66" width="5" height="15" rx="2.5" fill="#5D4037" />
            <rect x="58" y="66" width="5" height="15" rx="2.5" fill="#5D4037" />
          </svg>
        );

      case "silk":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            <path d="M15 75 Q45 85 85 60 Q55 20 15 75 Z" fill="#81C784" stroke="#388E3C" strokeWidth="2" />
            <path d="M18 73 Q50 60 82 60" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="52" cy="48" rx="20" ry="14" transform="rotate(-15 52 48)" fill="#FFF59D" stroke="#FBC02D" strokeWidth="2.5" />
            <path d="M42 42 Q55 30 65 42 Q55 58 45 50" stroke="#F57F17" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case "nylon":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            <path d="M20 30 Q50 15 80 30 Q50 45 20 60 Q50 75 80 60" stroke="#1E88E5" strokeWidth="8" strokeLinecap="round" />
            <path d="M22 30 Q50 16 78 30 M22 60 Q50 74 78 60" stroke="#90CAF9" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
            <rect x="68" y="45" width="18" height="26" rx="8" stroke="#FB8C00" strokeWidth="4" fill="none" />
            <rect x="64" y="52" width="6" height="12" rx="2" fill="#E65100" />
          </svg>
        );

      case "polyester":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            <path
              d="M32 25 L42 28 C45 34 55 34 58 28 L68 25 L80 40 L70 48 L66 42 L66 80 L34 80 L34 42 L30 48 L20 40 Z"
              fill="#FF7043"
              stroke="#D84315"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M72 58 Q77 50 82 58 Q77 64 72 58 Z" fill="#29B6F6" stroke="#0288D1" strokeWidth="1.5" />
            <path d="M24 62 Q28 56 32 62 Q28 67 24 62 Z" fill="#29B6F6" stroke="#0288D1" strokeWidth="1.5" />
          </svg>
        );

      case "plastic":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            <rect x="42" y="15" width="16" height="10" rx="3" fill="#1976D2" stroke="#0D47A1" strokeWidth="2" />
            <path
              d="M44 25 L44 35 C35 42 35 48 35 55 L35 80 Q35 85 40 85 L60 85 Q65 85 65 80 L65 55 C65 48 65 42 56 35 L56 25 Z"
              fill="#E1F5FE"
              stroke="#0288D1"
              strokeWidth="2.5"
            />
            <circle cx="50" cy="62" r="10" stroke="#00C853" strokeWidth="2" strokeDasharray="8 4" fill="none" />
          </svg>
        );

      case "rubber":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            <ellipse cx="50" cy="30" rx="28" ry="18" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2" />
            <rect x="44" y="44" width="12" height="42" rx="3" fill="#795548" stroke="#4E342E" strokeWidth="2" />
            <line x1="44" y1="58" x2="56" y2="65" stroke="#3E2723" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 68 Q54 74 58 68 Z" fill="#FFFFFF" stroke="#3E2723" strokeWidth="1.5" />
          </svg>
        );

      case "acrylic":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
            <path
              d="M30 25 L42 28 C45 32 55 32 58 28 L70 25 L82 45 L72 50 L66 42 L66 82 L34 82 L34 42 L28 50 L18 45 Z"
              fill="#AB47BC"
              stroke="#6A1B9A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M42 50 Q50 46 58 50 M42 62 Q50 58 58 62" stroke="#E1BEE7" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case "insulator":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Exposed Copper Core */}
            <rect x="15" y="34" width="30" height="12" rx="3" fill="#FF8A65" stroke="#D84315" strokeWidth="2" />
            {/* Electric Spark Warning */}
            <path d="M22 24 L28 32 L24 33 L30 42" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round" />
            {/* Thick Protective Plastic Insulation Sleeve */}
            <rect x="42" y="26" width="65" height="28" rx="8" fill="#1E88E5" stroke="#0D47A1" strokeWidth="3" />
            <rect x="52" y="32" width="45" height="16" rx="4" fill="#64B5F6" />
            {/* Green Shield Icon on top of Plastic */}
            <path d="M74 20 L86 25 L86 38 Q86 48 74 53 Q62 48 62 38 L62 25 Z" fill="#00E676" stroke="#00A152" strokeWidth="2" />
            <path d="M69 36 L73 40 L80 32" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <text x="60" y="72" fontSize="9" fontWeight="bold" fill="#0D47A1" textAnchor="middle">Plastic Insulator (Safe)</text>
          </svg>
        );

      case "heat_insulator":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Boiling Pot Metal Body */}
            <rect x="10" y="32" width="55" height="34" rx="8" fill="#CFD8DC" stroke="#78909C" strokeWidth="2.5" />
            {/* Heat Waves from Pan */}
            <path d="M20 25 Q24 16 28 25 M32 25 Q36 16 40 25 M44 25 Q48 16 52 25" stroke="#FF5722" strokeWidth="2.5" strokeLinecap="round" />
            {/* Bakelite Cool Plastic Handle */}
            <rect x="62" y="40" width="46" height="18" rx="6" fill="#212121" stroke="#424242" strokeWidth="2.5" />
            <rect x="68" y="44" width="34" height="10" rx="3" fill="#616161" />
            {/* Safe Hand Touch */}
            <text x="85" y="32" fontSize="16">✋✅</text>
            <text x="60" y="74" fontSize="9" fontWeight="bold" fill="#263238" textAnchor="middle">Plastic Handle Stays Cool</text>
          </svg>
        );

      case "conductor":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Battery / Power */}
            <rect x="12" y="30" width="22" height="20" rx="3" fill="#424242" stroke="#212121" strokeWidth="2" />
            <rect x="34" y="35" width="4" height="10" fill="#FFC107" />
            {/* Copper Wire Conducting */}
            <path d="M38 40 L80 40" stroke="#FF8A65" strokeWidth="5" strokeLinecap="round" />
            {/* Flowing Electricity Sparks */}
            <path d="M48 32 L54 40 L50 41 L56 48 M64 32 L70 40 L66 41 L72 48" stroke="#FFEA00" strokeWidth="2" strokeLinecap="round" />
            {/* Glowing Light Bulb */}
            <circle cx="95" cy="40" r="14" fill="#FFEE58" stroke="#FDD835" strokeWidth="2.5" />
            <path d="M90 40 L94 45 L100 35" stroke="#F57F17" strokeWidth="2" />
            <text x="60" y="72" fontSize="9" fontWeight="bold" fill="#E65100" textAnchor="middle">Copper Wire Conducts Current</text>
          </svg>
        );

      case "breathable":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Cotton Fabric Weave Mesh */}
            <rect x="15" y="20" width="90" height="40" rx="10" fill="#E8F5E9" stroke="#81C784" strokeWidth="2.5" />
            <line x1="30" y1="20" x2="30" y2="60" stroke="#A5D6A7" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="50" y1="20" x2="50" y2="60" stroke="#A5D6A7" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="70" y1="20" x2="70" y2="60" stroke="#A5D6A7" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="90" y1="20" x2="90" y2="60" stroke="#A5D6A7" strokeWidth="2" strokeDasharray="3 3" />
            {/* Fresh Air Breeze Arrows Passing Through */}
            <path d="M35 68 L35 12 M30 18 L35 12 L40 18" stroke="#00B0FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60 68 L60 12 M55 18 L60 12 L65 18" stroke="#00B0FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M85 68 L85 12 M80 18 L85 12 L90 18" stroke="#00B0FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="60" y="76" fontSize="9" fontWeight="bold" fill="#0277BD" textAnchor="middle">Air & Sweat Pass Easily 🌬️</text>
          </svg>
        );

      case "wrinkle_compare":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Left: Wrinkled Cotton */}
            <rect x="8" y="12" width="48" height="52" rx="8" fill="#FFEBEE" stroke="#E57373" strokeWidth="2" />
            <path d="M16 26 Q28 36 40 24 M18 48 Q32 36 48 46 M22 36 Q34 46 44 38" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" />
            <text x="32" y="74" fontSize="8" fontWeight="bold" fill="#C62828" textAnchor="middle">Wrinkled ✗</text>

            {/* Right: Smooth Polyester */}
            <rect x="64" y="12" width="48" height="52" rx="8" fill="#E8F5E9" stroke="#81C784" strokeWidth="2" />
            <line x1="72" y1="38" x2="104" y2="38" stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="72" y1="48" x2="104" y2="48" stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round" />
            <text x="88" y="74" fontSize="8" fontWeight="bold" fill="#2E7D32" textAnchor="middle">Smooth ✓</text>
          </svg>
        );

      case "tensile":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Top Anchor Rig */}
            <rect x="25" y="8" width="70" height="8" rx="2" fill="#546E7A" stroke="#37474F" strokeWidth="1.5" />
            {/* Strong Nylon Cable */}
            <line x1="60" y1="16" x2="60" y2="48" stroke="#1E88E5" strokeWidth="6" strokeLinecap="round" />
            <line x1="60" y1="16" x2="60" y2="48" stroke="#90CAF9" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
            {/* 120kg Heavy Weight Hanging */}
            <rect x="40" y="48" width="40" height="20" rx="5" fill="#263238" stroke="#37474F" strokeWidth="2" />
            <text x="60" y="62" fontSize="10" fontWeight="black" fill="#FFFFFF" textAnchor="middle">120 kg</text>
            <text x="60" y="76" fontSize="8" fontWeight="bold" fill="#1565C0" textAnchor="middle">Super Tensile Strength 💪</text>
          </svg>
        );

      case "polymer":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Connected Molecular Chain (Train Cars) */}
            <line x1="20" y1="38" x2="100" y2="38" stroke="#B0BEC5" strokeWidth="4" />
            <circle cx="25" cy="38" r="11" fill="#42A5F5" stroke="#1E88E5" strokeWidth="2" />
            <circle cx="50" cy="38" r="11" fill="#66BB6A" stroke="#43A047" strokeWidth="2" />
            <circle cx="75" cy="38" r="11" fill="#FFA726" stroke="#FB8C00" strokeWidth="2" />
            <circle cx="100" cy="38" r="11" fill="#AB47BC" stroke="#8E24AA" strokeWidth="2" />
            <text x="60" y="68" fontSize="9" fontWeight="black" fill="#37474F" textAnchor="middle">Polymer (Chain of Monomers) ⛓️</text>
          </svg>
        );

      case "monomer":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Single LEGO-like building block */}
            <rect x="42" y="24" width="36" height="30" rx="6" fill="#42A5F5" stroke="#1E88E5" strokeWidth="2.5" />
            <circle cx="52" cy="20" r="4" fill="#90CAF9" stroke="#1E88E5" strokeWidth="2" />
            <circle cx="68" cy="20" r="4" fill="#90CAF9" stroke="#1E88E5" strokeWidth="2" />
            <text x="60" y="44" fontSize="11" fontWeight="black" fill="#FFFFFF" textAnchor="middle">1 Unit</text>
            <text x="60" y="68" fontSize="9" fontWeight="bold" fill="#1565C0" textAnchor="middle">Single Monomer Block 🧪</text>
          </svg>
        );

      case "non_biodegradable":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Soil Cross Section */}
            <rect x="10" y="25" width="100" height="42" rx="8" fill="#4E342E" stroke="#3E2723" strokeWidth="2" />
            {/* Composted Apple (Leaves Soil) */}
            <text x="35" y="48" fontSize="18">🪴</text>
            <text x="35" y="60" fontSize="7" fontWeight="bold" fill="#A5D6A7" textAnchor="middle">Apple Rotted</text>
            {/* Plastic Bottle Intact */}
            <rect x="68" y="36" width="30" height="14" rx="3" fill="#E1F5FE" stroke="#03A9F4" strokeWidth="2" />
            <text x="83" y="60" fontSize="7" fontWeight="bold" fill="#FFE082" textAnchor="middle">Plastic Intact!</text>
            <text x="60" y="74" fontSize="8" fontWeight="black" fill="#D32F2F" textAnchor="middle">Lasts 100+ Years in Soil ⏳</text>
          </svg>
        );

      case "synthetic":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Factory Building */}
            <path d="M15 60 L15 35 L30 45 L30 35 L45 45 L45 25 L65 25 L65 60 Z" fill="#78909C" stroke="#455A64" strokeWidth="2" />
            {/* Chemistry Beaker with reaction */}
            <path d="M80 30 L80 42 L72 58 Q70 62 76 62 L98 62 Q104 62 102 58 L94 42 L94 30 Z" fill="#E0F7FA" stroke="#0097A7" strokeWidth="2" />
            <circle cx="85" cy="52" r="3" fill="#00E5FF" />
            <circle cx="92" cy="48" r="2" fill="#00E5FF" />
            <text x="60" y="74" fontSize="9" fontWeight="black" fill="#37474F" textAnchor="middle">Made in Chemical Factories 🏭</text>
          </svg>
        );

      case "natural":
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full drop-shadow-xs" fill="none">
            {/* Sun */}
            <circle cx="30" cy="24" r="10" fill="#FFEE58" stroke="#FBC02D" strokeWidth="2" />
            {/* Soil & Plant Sprout */}
            <path d="M15 55 Q60 50 105 55" stroke="#8D6E63" strokeWidth="4" strokeLinecap="round" />
            <path d="M60 55 Q60 38 60 28" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 40 Q45 35 42 24 Q55 28 60 38" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5" />
            <path d="M60 34 Q75 28 78 18 Q66 22 60 32" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5" />
            <text x="60" y="72" fontSize="9" fontWeight="black" fill="#2E7D32" textAnchor="middle">Harvested from Living Nature 🌳</text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className={`${sizeClasses} flex items-center justify-center p-1 transition-transform hover:scale-105`}>
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
