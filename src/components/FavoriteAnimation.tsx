
import { useEffect, useState } from "react";

interface FavoriteAnimationProps {
  isFavorite: boolean;
  onAnimationComplete?: () => void;
}

export default function FavoriteAnimation({ isFavorite, onAnimationComplete }: FavoriteAnimationProps) {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    if (isFavorite) {
      setShowAnimation(true);
      
      // Generate particles
      const newParticles = [];
      for (let i = 0; i < 25; i++) {
        const size = Math.random() * 8 + 4;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 70 + 40;
        const duration = Math.random() * 1.2 + 0.8;
        const delay = Math.random() * 0.3;
        
        // Colors
        const colors = ["#f87171", "#fb923c", "#facc15", "#a3e635", "#38bdf8", "#c084fc", "#f472b6"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        newParticles.push(
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              transform: `translate(${x}px, ${y}px) scale(0)`,
              animation: `favoriteParticle ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s forwards`,
              opacity: 0,
            }}
          />
        );
      }
      setParticles(newParticles);
      
      // Reset after animation
      const timer = setTimeout(() => {
        setShowAnimation(false);
        onAnimationComplete?.();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isFavorite, onAnimationComplete]);
  
  if (!showAnimation) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="relative">
        {particles}
        <div 
          className="w-12 h-12 text-red-500 animate-favorite-pulse"
          style={{
            animation: "favoriteHeart 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards"
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
