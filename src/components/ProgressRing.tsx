
import React from "react";

interface ProgressRingProps {
  progress: number; // 0 to 1
  size: number;
  strokeWidth: number;
  isPlaying: boolean;
  accentColor?: string;
}

export default function ProgressRing({ 
  progress, 
  size, 
  strokeWidth, 
  isPlaying,
  accentColor
}: ProgressRingProps) {
  const normalizedRadius = size / 2 - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg 
      height={size} 
      width={size} 
      className={`absolute top-0 left-0 -rotate-90 transition-all duration-1000 ease-in-out ${
        isPlaying ? 'opacity-100' : 'opacity-70'
      }`}
    >
      {/* Enhanced glow effect */}
      {isPlaying && (
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feFlood floodColor={accentColor || "#9b87f5"} floodOpacity="0.7" result="glowColor" />
          <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow" />
          <feComposite in="SourceGraphic" in2="softGlow" operator="over" />
        </filter>
      )}
      
      {/* Background circle */}
      <circle
        stroke={accentColor || "currentColor"}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeOpacity="0.2"
        r={normalizedRadius}
        cx={size / 2}
        cy={size / 2}
        className={!accentColor ? "text-primary" : ""}
      />
      
      {/* Progress circle with enhanced animation */}
      <circle
        stroke={accentColor || "currentColor"}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={size / 2}
        cy={size / 2}
        className={`transition-all duration-700 ease-in-out ${!accentColor ? "text-primary" : ""}`}
        filter={isPlaying ? "url(#glow)" : ""}
      />
    </svg>
  );
}
