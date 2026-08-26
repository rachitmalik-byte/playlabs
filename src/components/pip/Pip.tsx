'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PipExpression } from '@/types/pip';

interface PipProps {
  expression: PipExpression;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const sizeMap = {
  sm: 80,
  md: 120,
  lg: 180,
};

// Define states for the elements based on expression
const bodyVariants = {
  curious: { scale: 1, rotate: 5, y: 0 },
  confused: { scale: 1, rotate: -5, y: 0 },
  thinking: { scale: 1, rotate: 0, y: 0 },
  excited: { scale: 1.05, rotate: 0, y: -10 },
  worried: { scale: 0.95, rotate: 0, y: 2 },
  surprised: { scale: 1, rotate: 0, y: -5 },
  happy: { scale: 1, rotate: 0, y: 0 },
  proud: { scale: 1.05, rotate: 0, y: -5 },
  sleepy: { scale: 1, rotate: 0, y: 5 },
  celebrating: { scale: 1.1, rotate: 10, y: -15 },
  pointing: { scale: 1, rotate: 0, y: 0 },
  silent: { scale: 1, rotate: 0, y: 0 },
};

const leftEyeVariants = {
  curious: { scaleY: 1.2, scaleX: 1, y: -5 },
  confused: { scaleY: 0.8, scaleX: 1, y: 0 },
  thinking: { scaleY: 1, scaleX: 1, y: -5, x: 2 },
  excited: { scaleY: 1.3, scaleX: 1.3, y: -2 },
  worried: { scaleY: 0.7, scaleX: 0.7, y: 2 },
  surprised: { scaleY: 1.5, scaleX: 1.5, y: -2 },
  happy: { scaleY: 0.8, scaleX: 1, y: 0 },
  proud: { scaleY: 1, scaleX: 1, y: -2 },
  sleepy: { scaleY: 0.3, scaleX: 1, y: 5 },
  celebrating: { scaleY: 1.2, scaleX: 1.2, y: -2 },
  pointing: { scaleY: 1, scaleX: 1, y: 0 },
  silent: { scaleY: 1, scaleX: 1, y: 0 },
};

const rightEyeVariants = {
  curious: { scaleY: 1, scaleX: 1, y: 0 },
  confused: { scaleY: 1.2, scaleX: 1, y: -2 },
  thinking: { scaleY: 1, scaleX: 1, y: -5, x: 2 },
  excited: { scaleY: 1.3, scaleX: 1.3, y: -2 },
  worried: { scaleY: 0.7, scaleX: 0.7, y: 2 },
  surprised: { scaleY: 1.5, scaleX: 1.5, y: -2 },
  happy: { scaleY: 0.8, scaleX: 1, y: 0 },
  proud: { scaleY: 1, scaleX: 1, y: -2 },
  sleepy: { scaleY: 0.3, scaleX: 1, y: 5 },
  celebrating: { scaleY: 1.2, scaleX: 1.2, y: -2 },
  pointing: { scaleY: 1, scaleX: 1, y: 0 },
  silent: { scaleY: 1, scaleX: 1, y: 0 },
};

const mouthVariants = {
  curious: { d: "M 45 65 Q 50 65 55 65", strokeWidth: 2, fill: "transparent" },
  confused: { d: "M 45 65 Q 47 62 50 65 T 55 65", strokeWidth: 2, fill: "transparent" },
  thinking: { d: "M 48 65 Q 50 65 52 65", strokeWidth: 2, fill: "transparent" },
  excited: { d: "M 40 60 Q 50 80 60 60 Z", strokeWidth: 2, fill: "#2D2520" },
  worried: { d: "M 45 68 Q 50 62 55 68", strokeWidth: 2, fill: "transparent" },
  surprised: { d: "M 45 65 Q 50 55 55 65 Q 50 75 45 65", strokeWidth: 2, fill: "#2D2520" },
  happy: { d: "M 40 62 Q 50 72 60 62", strokeWidth: 2, fill: "transparent" },
  proud: { d: "M 40 62 Q 50 75 60 62", strokeWidth: 2, fill: "transparent" },
  sleepy: { d: "M 48 65 Q 50 65 52 65", strokeWidth: 2, fill: "transparent" },
  celebrating: { d: "M 40 60 Q 50 80 60 60 Z", strokeWidth: 2, fill: "#2D2520" },
  pointing: { d: "M 45 65 Q 50 68 55 65", strokeWidth: 2, fill: "transparent" },
  silent: { d: "M 45 65 Q 50 65 55 65", strokeWidth: 2, fill: "transparent" },
};

const leftArmVariants = {
  curious: { rotate: 0, y: 0, x: 0 },
  confused: { rotate: -45, y: -10, x: 5 }, // scratching head
  thinking: { rotate: -60, y: -15, x: 10 }, // on chin
  excited: { rotate: -120, y: -10, x: -5 },
  worried: { rotate: 45, y: 5, x: 10 }, // hugging self
  surprised: { rotate: 20, y: 5, x: 0 },
  happy: { rotate: 0, y: 0, x: 0 },
  proud: { rotate: -30, y: 5, x: 5 }, // on hip
  sleepy: { rotate: 10, y: 5, x: 0 },
  celebrating: { rotate: -150, y: -15, x: -10 },
  pointing: { rotate: 0, y: 0, x: 0 },
  silent: { rotate: 0, y: 0, x: 0 },
};

const rightArmVariants = {
  curious: { rotate: 0, y: 0, x: 0 },
  confused: { rotate: 0, y: 0, x: 0 },
  thinking: { rotate: 0, y: 0, x: 0 },
  excited: { rotate: 120, y: -10, x: 5 },
  worried: { rotate: -45, y: 5, x: -10 }, // hugging self
  surprised: { rotate: -20, y: 5, x: 0 },
  happy: { rotate: 0, y: 0, x: 0 },
  proud: { rotate: 30, y: 5, x: -5 }, // on hip
  sleepy: { rotate: -10, y: 5, x: 0 },
  celebrating: { rotate: 150, y: -15, x: 10 },
  pointing: { rotate: -90, y: -10, x: 15 }, // pointing out
  silent: { rotate: 0, y: 0, x: 0 },
};

export function Pip({ expression = 'silent', size = 'md', className = '', onClick }: PipProps) {
  const s = sizeMap[size];

  return (
    <div 
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className}`}
      style={{ width: s, height: s }}
      onClick={onClick}
    >
      <motion.svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        animate={expression}
        variants={bodyVariants}
        initial="silent"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Left Arm */}
        <motion.path
          d="M 25 60 Q 10 70 15 80"
          stroke="#4A90D9"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          variants={leftArmVariants}
          style={{ originX: "25px", originY: "60px" }}
        />
        
        {/* Right Arm */}
        <motion.path
          d="M 75 60 Q 90 70 85 80"
          stroke="#4A90D9"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          variants={rightArmVariants}
          style={{ originX: "75px", originY: "60px" }}
        />
        
        {/* Body */}
        <path 
          d="M 50 10 C 20 10 15 40 20 70 C 25 90 75 90 80 70 C 85 40 80 10 50 10 Z" 
          fill="#4A90D9" 
        />
        
        {/* Belly patch */}
        <path 
          d="M 50 35 C 35 35 30 55 35 75 C 40 85 60 85 65 75 C 70 55 65 35 50 35 Z" 
          fill="#FFF8F0" 
          opacity="0.3"
        />

        {/* Goggles (pushed up on head) */}
        <g stroke="#E8845A" strokeWidth="4" fill="transparent">
          <path d="M 18 35 Q 50 15 82 35" />
          <circle cx="30" cy="28" r="10" fill="#68B8D7" opacity="0.8" />
          <circle cx="70" cy="28" r="10" fill="#68B8D7" opacity="0.8" />
          <path d="M 40 28 L 60 28" />
        </g>

        {/* Left Eye */}
        <motion.g variants={leftEyeVariants} style={{ originX: "35px", originY: "50px" }}>
          <circle cx="35" cy="50" r="6" fill="#2D2520" />
          <circle cx="37" cy="48" r="2" fill="white" />
        </motion.g>

        {/* Right Eye */}
        <motion.g variants={rightEyeVariants} style={{ originX: "65px", originY: "50px" }}>
          <circle cx="65" cy="50" r="6" fill="#2D2520" />
          <circle cx="67" cy="48" r="2" fill="white" />
        </motion.g>

        {/* Mouth */}
        <motion.path
          variants={mouthVariants}
          stroke="#2D2520"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
