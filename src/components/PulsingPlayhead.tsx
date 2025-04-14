
import { useEffect, useState } from "react";

interface PulsingPlayheadProps {
  isPlaying: boolean;
  progress: number;
  accentColor: string;
  onClick: (clickedProgress: number) => void;
}

export default function PulsingPlayhead({ 
  isPlaying, 
  progress, 
  accentColor, 
  onClick 
}: PulsingPlayheadProps) {
  const [isPulsing, setIsPulsing] = useState(false);
  
  // Simulate beat detection
  useEffect(() => {
    if (!isPlaying) {
      setIsPulsing(false);
      return;
    }
    
    // Simulate beat detection - in a real app, this would be connected to audio analysis
    const beatInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 200); // Short pulse duration
    }, 650); // Beat frequency - would be dynamic in a real implementation
    
    return () => clearInterval(beatInterval);
  }, [isPlaying]);
  
  return (
    <div className="relative w-full">
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
        <span>{formatTime(progress)}</span>
        <span>-{formatRemainingTime(progress)}</span>
      </div>
      
      <div 
        className="relative h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const clickedProgress = x / rect.width;
          onClick(Math.max(0, Math.min(1, clickedProgress)));
        }}
      >
        <div
          className="absolute h-full transition-all duration-300 ease-linear"
          style={{ width: `${progress * 100}%`, backgroundColor: accentColor }}
        />
        <div 
          className={`absolute h-3 w-3 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all shadow-md ${
            isPulsing ? 'scale-150 opacity-60' : 'scale-100 opacity-100'
          }`}
          style={{ 
            left: `${progress * 100}%`, 
            backgroundColor: accentColor,
            transition: 'transform 0.2s ease, opacity 0.2s ease' 
          }}
        />
      </div>
    </div>
  );
}

// Helper functions to format time displays
function formatTime(progress: number) {
  const duration = 210; // Assuming average track is 3:30
  const currentSeconds = Math.floor(progress * duration);
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = currentSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatRemainingTime(progress: number) {
  const duration = 210; // Assuming average track is 3:30
  const remainingSeconds = Math.floor((1 - progress) * duration);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
