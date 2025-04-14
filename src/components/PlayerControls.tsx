
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  shuffleActive: boolean;
  toggleShuffle: () => void;
  repeatActive: boolean;
  toggleRepeat: () => void;
}

export default function PlayerControls({
  isPlaying,
  togglePlay,
  onNext,
  onPrevious,
  shuffleActive,
  toggleShuffle,
  repeatActive,
  toggleRepeat,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={toggleShuffle}
        className={`p-2 rounded-full transition-all hover:bg-white/30 dark:hover:bg-white/10 
          ${shuffleActive ? "text-primary" : "text-gray-500 dark:text-gray-400"}`}
        aria-label="Shuffle"
      >
        <Shuffle size={18} />
      </button>
      
      <button
        onClick={onPrevious}
        className="p-3 rounded-full transition-all hover:bg-white/30 dark:hover:bg-white/10"
        aria-label="Previous track"
      >
        <SkipBack size={24} />
      </button>
      
      <button
        onClick={togglePlay}
        className="bg-primary text-white p-4 rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>
      
      <button
        onClick={onNext}
        className="p-3 rounded-full transition-all hover:bg-white/30 dark:hover:bg-white/10"
        aria-label="Next track"
      >
        <SkipForward size={24} />
      </button>
      
      <button
        onClick={toggleRepeat}
        className={`p-2 rounded-full transition-all hover:bg-white/30 dark:hover:bg-white/10
          ${repeatActive ? "text-primary" : "text-gray-500 dark:text-gray-400"}`}
        aria-label="Repeat"
      >
        <Repeat size={18} />
      </button>
    </div>
  );
}
