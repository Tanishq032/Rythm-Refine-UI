
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
  showTooltip: string;
  setShowTooltip: (tooltip: string) => void;
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
  showTooltip,
  setShowTooltip,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={toggleShuffle}
        className={`p-2 rounded-full transition-all hover:bg-white/30 dark:hover:bg-white/10 relative
          ${shuffleActive ? "text-primary" : "text-gray-500 dark:text-gray-400"}`}
        aria-label="Shuffle"
        onMouseEnter={() => setShowTooltip("shuffle")}
        onMouseLeave={() => setShowTooltip("")}
      >
        <Shuffle size={18} />
        {showTooltip === "shuffle" && (
          <div className="absolute bottom-full mb-2 p-2 bg-black/70 dark:bg-white/90 dark:text-black text-white text-xs rounded whitespace-nowrap">
            {shuffleActive ? "Disable shuffle" : "Enable shuffle"}
          </div>
        )}
      </button>
      
      <button
        onClick={onPrevious}
        className="p-3 rounded-full transition-all hover:bg-white/30 dark:hover:bg-white/10 relative"
        aria-label="Previous track"
        onMouseEnter={() => setShowTooltip("previous")}
        onMouseLeave={() => setShowTooltip("")}
      >
        <SkipBack size={24} />
        {showTooltip === "previous" && (
          <div className="absolute bottom-full mb-2 p-2 bg-black/70 dark:bg-white/90 dark:text-black text-white text-xs rounded">
            Previous track
          </div>
        )}
      </button>
      
      <button
        onClick={togglePlay}
        className="bg-primary text-white p-4 rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg relative"
        aria-label={isPlaying ? "Pause" : "Play"}
        onMouseEnter={() => setShowTooltip("play")}
        onMouseLeave={() => setShowTooltip("")}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        {showTooltip === "play" && (
          <div className="absolute bottom-full mb-2 p-2 bg-black/70 dark:bg-white/90 dark:text-black text-white text-xs rounded">
            {isPlaying ? "Pause" : "Play"}
          </div>
        )}
      </button>
      
      <button
        onClick={onNext}
        className="p-3 rounded-full transition-all hover:bg-white/30 dark:hover:bg-white/10 relative"
        aria-label="Next track"
        onMouseEnter={() => setShowTooltip("next")}
        onMouseLeave={() => setShowTooltip("")}
      >
        <SkipForward size={24} />
        {showTooltip === "next" && (
          <div className="absolute bottom-full mb-2 p-2 bg-black/70 dark:bg-white/90 dark:text-black text-white text-xs rounded">
            Next track
          </div>
        )}
      </button>
      
      <button
        onClick={toggleRepeat}
        className={`p-2 rounded-full transition-all hover:bg-white/30 dark:hover:bg-white/10 relative
          ${repeatActive ? "text-primary" : "text-gray-500 dark:text-gray-400"}`}
        aria-label="Repeat"
        onMouseEnter={() => setShowTooltip("repeat")}
        onMouseLeave={() => setShowTooltip("")}
      >
        <Repeat size={18} />
        {showTooltip === "repeat" && (
          <div className="absolute bottom-full mb-2 p-2 bg-black/70 dark:bg-white/90 dark:text-black text-white text-xs rounded whitespace-nowrap">
            {repeatActive ? "Disable repeat" : "Enable repeat"}
          </div>
        )}
      </button>
    </div>
  );
}
