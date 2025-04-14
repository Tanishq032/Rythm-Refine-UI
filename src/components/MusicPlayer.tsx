import { useState, useEffect } from "react";
import { Heart, Info } from "lucide-react";
import ProgressRing from "./ProgressRing";
import PlayerControls from "./PlayerControls";
import VolumeSlider from "./VolumeSlider";
import TrackList from "./TrackList";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import ColorPicker from "./ColorPicker";
import DynamicBackground from "./DynamicBackground";
import FavoriteAnimation from "./FavoriteAnimation";
import PulsingPlayhead from "./PulsingPlayhead";
import { useToast } from "@/hooks/use-toast";

const tracks = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:22",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "2",
    title: "Save Your Tears",
    artist: "The Weeknd",
    duration: "3:35",
    cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "3",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    duration: "3:50",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "4",
    title: "In Your Eyes",
    artist: "The Weeknd",
    duration: "3:58",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "5",
    title: "After Hours",
    artist: "The Weeknd",
    duration: "6:01",
    cover: "https://images.unsplash.com/photo-1493225339996-2f7bedcc002c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

export default function MusicPlayer() {
  const [currentTrackId, setCurrentTrackId] = useState(tracks[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavoriteAnimation, setShowFavoriteAnimation] = useState(false);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeatActive, setRepeatActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [accentColor, setAccentColor] = useState("#9b87f5");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const { toast } = useToast();
  
  const currentTrack = tracks.find((track) => track.id === currentTrackId) || tracks[0];
  
  const filteredTracks = searchQuery 
    ? tracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tracks;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        handleNext();
      } else if (e.code === "ArrowLeft") {
        handlePrevious();
      } else if (e.code === "KeyM") {
        setVolume(prev => prev > 0 ? 0 : 0.7);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty('--primary', accentColorToHsl(accentColor));
  }, [accentColor]);

  const accentColorToHsl = (hex: string): string => {
    const colorMapping = {
      "#9b87f5": "262 80% 60%",
      "#10b981": "160 74% 40%",
      "#3b82f6": "214 93% 60%",
      "#ec4899": "325 78% 60%",
      "#f97316": "24 96% 53%",
      "#eab308": "48 96% 47%",
      "#ef4444": "0 84% 60%",
      "#a855f7": "270 96% 65%"
    };
    return colorMapping[hex] || "262 80% 60%";
  };

  useEffect(() => {
    let interval: number | undefined;
    
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            handleNext();
            return 0;
          }
          return prev + 0.003;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex((track) => track.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrackId(tracks[nextIndex].id);
    setProgress(0);
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex((track) => track.id === currentTrackId);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackId(tracks[prevIndex].id);
    setProgress(0);
  };

  const selectTrack = (id: string) => {
    setCurrentTrackId(id);
    setProgress(0);
    setIsPlaying(true);
  };

  const formatTime = (progress: number) => {
    const duration = 210;
    const currentSeconds = Math.floor(progress * duration);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleToggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    if (newFavoriteState) {
      setShowFavoriteAnimation(true);
      toast({
        title: "Added to favorites",
        description: `${currentTrack.title} by ${currentTrack.artist} has been added to your favorites.`,
      });
    } else {
      toast({
        title: "Removed from favorites",
        description: `${currentTrack.title} by ${currentTrack.artist} has been removed from your favorites.`,
      });
    }
  };
  
  const handleColorChange = (color: string) => {
    setAccentColor(color);
    toast({
      title: "Color theme updated",
      description: "Your new accent color has been applied.",
    });
  };
  
  const handleThemeChange = (isDark: boolean) => {
    setIsDarkTheme(isDark);
  };

  return (
    <div className="player-gradient min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden transition-colors duration-700">
      <DynamicBackground albumCover={currentTrack.cover} isActive={isPlaying} />
      
      <div className="glass w-full max-w-4xl rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden transition-all duration-700">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-player-primary/10 to-transparent opacity-80 dark:opacity-40 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-player-primary to-player-secondary bg-clip-text text-transparent">
              Rhythm Refine
            </h1>
            
            <SearchBar onSearch={handleSearch} />
            
            <div className="flex items-center gap-2">
              <div 
                className="text-sm text-gray-600 dark:text-gray-400 hidden md:block"
                onMouseEnter={() => setShowTooltip("keyboard")}
                onMouseLeave={() => setShowTooltip("")}
              >
                <button className="p-2 rounded hover:bg-white/20 dark:hover:bg-white/10 relative">
                  <Info size={16} />
                  {showTooltip === "keyboard" && (
                    <div className="absolute right-0 mt-2 p-3 bg-black/70 dark:bg-white/90 dark:text-black text-white text-xs rounded shadow-lg z-50 whitespace-nowrap animate-fade-in">
                      <p className="mb-1"><b>Space</b>: Play/Pause</p>
                      <p className="mb-1"><b>←/→</b>: Previous/Next</p>
                      <p className="mb-1"><b>M</b>: Mute</p>
                      <p><b>Ctrl+K</b>: Search</p>
                    </div>
                  )}
                </button>
              </div>
              <ColorPicker onColorSelect={handleColorChange} selectedColor={accentColor} />
              <ThemeToggle onThemeChange={handleThemeChange} />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-grow flex flex-col items-center">
              <div className="relative inline-block">
                {showFavoriteAnimation && (
                  <FavoriteAnimation 
                    isFavorite={isFavorite} 
                    onAnimationComplete={() => setShowFavoriteAnimation(false)} 
                  />
                )}
                
                <ProgressRing
                  progress={progress}
                  size={280}
                  strokeWidth={4}
                  isPlaying={isPlaying}
                  accentColor={accentColor}
                />
                
                <div className="w-[280px] h-[280px] rounded-full overflow-hidden border-4 border-white/30 dark:border-black/30 shadow-xl relative group">
                  <img
                    src={currentTrack.cover}
                    alt={`${currentTrack.title} album cover`}
                    className={`w-full h-full object-cover transition-transform duration-1000 ease-in-out ${
                      isPlaying ? "animate-spin-slow" : ""
                    } group-hover:scale-105 transition-all duration-700`}
                  />
                  
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={togglePlay}
                  >
                    <div className="bg-white/90 text-black rounded-full p-5 transform transition-transform hover:scale-110 active:scale-95">
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <h2 className="text-xl font-bold">{currentTrack.title}</h2>
                    <button
                      onClick={handleToggleFavorite}
                      className={`transition-colors ${
                        isFavorite ? "text-red-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      }`}
                      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                      onMouseEnter={() => setShowTooltip("favorite")}
                      onMouseLeave={() => setShowTooltip("")}
                    >
                      <Heart 
                        size={18} 
                        fill={isFavorite ? "currentColor" : "none"} 
                        className={isFavorite ? "animate-favorite-beat" : ""}
                      />
                      {showTooltip === "favorite" && (
                        <div className="absolute mt-2 p-2 bg-black/70 dark:bg-white/90 dark:text-black text-white text-xs rounded animate-fade-in">
                          {isFavorite ? "Remove favorite" : "Add favorite"}
                        </div>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{currentTrack.artist}</p>
                </div>
                
                <div className="w-full mt-4">
                  <PulsingPlayhead
                    isPlaying={isPlaying}
                    progress={progress}
                    accentColor={accentColor}
                    onClick={(clickedProgress) => setProgress(clickedProgress)}
                  />
                </div>
                
                <PlayerControls
                  isPlaying={isPlaying}
                  togglePlay={togglePlay}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  shuffleActive={shuffleActive}
                  toggleShuffle={() => setShuffleActive(!shuffleActive)}
                  repeatActive={repeatActive}
                  toggleRepeat={() => setRepeatActive(!repeatActive)}
                  showTooltip={showTooltip}
                  setShowTooltip={setShowTooltip}
                />
                
                <div className="mt-6 flex justify-center">
                  <VolumeSlider volume={volume} setVolume={setVolume} />
                </div>
              </div>
            </div>
            
            <div className="hidden md:block w-full md:w-[280px]">
              <TrackList
                tracks={filteredTracks}
                currentTrackId={currentTrackId}
                onSelectTrack={selectTrack}
              />
            </div>
          </div>
          
          <div className="block md:hidden mt-6">
            <TrackList
              tracks={filteredTracks}
              currentTrackId={currentTrackId}
              onSelectTrack={selectTrack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
