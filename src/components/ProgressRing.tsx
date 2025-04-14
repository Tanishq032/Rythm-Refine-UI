
import React from "react";

interface ProgressRingProps {
  progress: number; // 0 to 1
  size: number;
  strokeWidth: number;
  isPlaying: boolean;
}

export default function ProgressRing({ progress, size, strokeWidth, isPlaying }: ProgressRingProps) {
  const normalizedRadius = size / 2 - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg 
      height={size} 
      width={size} 
      className={`absolute top-0 left-0 -rotate-90 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-70'}`}
    >
      {/* Background circle */}
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeOpacity="0.2"
        r={normalizedRadius}
        cx={size / 2}
        cy={size / 2}
        className="text-primary"
      />
      
      {/* Progress circle */}
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={size / 2}
        cy={size / 2}
        className="text-primary transition-all duration-500 ease-in-out"
      />
    </svg>
  );
}
