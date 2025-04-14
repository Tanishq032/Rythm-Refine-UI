
import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface VolumeSliderProps {
  volume: number;
  setVolume: (value: number) => void;
}

export default function VolumeSlider({ volume, setVolume }: VolumeSliderProps) {
  const [prevVolume, setPrevVolume] = useState(1);

  const handleVolumeToggle = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.3) return <Volume size={20} />;
    if (volume < 0.7) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-[150px]">
      <button
        onClick={handleVolumeToggle}
        className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
        aria-label={volume === 0 ? "Unmute" : "Mute"}
      >
        <VolumeIcon />
      </button>
      
      <div className="relative w-full h-7 flex items-center group">
        <div className="absolute w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all"
            style={{ width: `${volume * 100}%` }}
          />
        </div>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
          aria-label="Volume slider"
        />
        
        <div 
          className="absolute h-3 w-3 bg-primary rounded-full shadow-md transition-all"
          style={{ left: `calc(${volume * 100}% - 6px)` }}
        />
      </div>
    </div>
  );
}
