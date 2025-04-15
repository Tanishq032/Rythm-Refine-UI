import { useState, useEffect } from "react";
import { Heart, Info, ListMusic, Share, Mic, Users } from "lucide-react";
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
import SmartPlaylists from "./SmartPlaylists";
import LyricsView from "./LyricsView";
import ShareOptions from "./ShareOptions";
import CollaborativePlaylists from "./CollaborativePlaylists";
import VoiceCommands from "./VoiceCommands";
import { useToast } from "@/hooks/use-toast";
import UserProfile from "./UserProfile";

const tracks = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:22",
    cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  },
  {
    id: "2",
    title: "Save Your Tears",
    artist: "The Weeknd",
    duration: "3:35",
    cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  },
  {
    id: "3",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    duration: "3:50",
    cover: "https://i.scdn.co/image/ab67616d0000b273118f03533e47529f9d9a2c69",
  },
  {
    id: "4",
    title: "In Your Eyes",
    artist: "The Weeknd",
    duration: "3:58",
    cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  },
  {
    id: "5",
    title: "After Hours",
    artist: "The Weeknd",
    duration: "6:01",
    cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  },
  {
    id: "6",
    title: "Bad Guy",
    artist: "Billie Eilish",
    duration: "3:14",
    cover: "https://i.scdn.co/image/ab67616d0000b273d55684e600efb76670a7920a",
  },
  {
    id: "7",
    title: "Everything I Wanted",
    artist: "Billie Eilish",
    duration: "4:05",
    cover: "https://i.scdn.co/image/ab67616d0000b273cb719f5cc6fcc598bc8acdab",
  },
  {
    id: "8",
    title: "drivers license",
    artist: "Olivia Rodrigo",
    duration: "4:07",
    cover: "https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a",
  },
  {
    id: "9",
    title: "good 4 u",
    artist: "Olivia Rodrigo",
    duration: "2:58",
    cover: "https://i.scdn.co/image/ab67616d0000b2736d4b58bdf055516f00aa0707",
  },
  {
    id: "10",
    title: "positions",
    artist: "Ariana Grande",
    duration: "2:52",
    cover: "https://i.scdn.co/image/ab67616d0000b2735ef878a782c987d38d82b605",
  },
  {
    id: "11",
    title: "34+35",
    artist: "Ariana Grande",
    duration: "2:53",
    cover: "https://i.scdn.co/image/ab67616d0000b2735ef878a782c987d38d82b605",
  },
  {
    id: "12",
    title: "Leave The Door Open",
    artist: "Bruno Mars, Anderson .Paak, Silk Sonic",
    duration: "4:02",
    cover: "https://i.scdn.co/image/ab67616d0000b273ba3c3bed35f1526e0cdfbdae",
  }
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
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showCollaborativePlaylists, setShowCollaborativePlaylists] = useState(false);
  const [displayedTracks, setDisplayedTracks] = useState(tracks);
  const [favoriteTracks, setFavoriteTracks] = useState<typeof tracks>([]);
  
  const { toast } = useToast();
  
  const currentTrack = tracks.find((track) => track.id === currentTrackId) || tracks[0];
  
  const filteredTracks = searchQuery 
    ? tracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : displayedTracks;

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
    const isFav = favoriteTracks.some(track => track.id === currentTrackId);
    setIsFavorite(isFav);
  }, [currentTrackId, favoriteTracks]);

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
    const currentIndex = filteredTracks.findIndex((track) => track.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % filteredTracks.length;
    setCurrentTrackId(filteredTracks[nextIndex].id);
    setProgress(0);
  };

  const handlePrevious = () => {
    const currentIndex = filteredTracks.findIndex((track) => track.id === currentTrackId);
    const prevIndex = (currentIndex - 1 + filteredTracks.length) % filteredTracks.length;
    setCurrentTrackId(filteredTracks[prevIndex].id);
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
      const trackToAdd = tracks.find(track => track.id === currentTrackId);
      if (trackToAdd && !favoriteTracks.some(t => t.id === currentTrackId)) {
        setFavoriteTracks(prev => [...prev, trackToAdd]);
      }
      
      setShowFavoriteAnimation(true);
      toast({
        title: "Added to favorites",
        description: `${currentTrack.title} by ${currentTrack.artist} has been added to your favorites.`,
      });
    } else {
      setFavoriteTracks(prev => prev.filter(track => track.id !== currentTrackId));
      
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
  
  const handleSmartPlaylistSelect = (trackIds: string[]) => {
    setDisplayedTracks(tracks.filter(track => trackIds.includes(track.id)));
    setCurrentTrackId(trackIds[0]);
    setProgress(0);
    setIsPlaying(true);
    
    toast({
      title: "Smart Playlist Loaded",
      description: "Enjoy your personalized selection!",
    });
  };

  return (
    <div className="player-gradient min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden transition-colors duration-700">
      <DynamicBackground albumCover={currentTrack.cover} isActive={isPlaying} />
      
      <div className="glass w-full max-w-5xl rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden transition-all duration-700">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[hsl(var(--player-primary)_/_0.6)] to-[hsl(var(--player-secondary)_/_0.2)] dark:from-[hsl(var(--player-primary)_/_0.3)] dark:to-[hsl(var(--player-dark))] opacity-80 dark:opacity-40 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--player-primary))] to-[hsl(var(--player-secondary))] bg-clip-text text-transparent">
              Rhythm Refine
            </h1>
            
            <SearchBar onSearch={handleSearch} />
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowUserProfile(true)}
                className="p-2 rounded-full transition-colors hover:bg-secondary"
                aria-label="User Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </button>
              
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
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-6">
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
                        onError={(e) => {
                          e.currentTarget.src = "https://i.scdn.co/image/ab67616d0000b2736d4b58bdf055516f00aa0707";
                        }}
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
                    
                    <div className="flex items-center justify-between w-full mt-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setShowLyrics(!showLyrics)}
                          className="p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-colors"
                          aria-label={showLyrics ? "Hide lyrics" : "Show lyrics"}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                        </button>
                        
                        <button
                          onClick={() => setShowShareOptions(true)}
                          className="p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-colors"
                          aria-label="Share track"
                        >
                          <Share size={20} />
                        </button>
                        
                        <button
                          onClick={() => setShowCollaborativePlaylists(true)}
                          className="p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-colors"
                          aria-label="Collaborative playlists"
                        >
                          <Users size={20} />
                        </button>
                        
                        <VoiceCommands
                          onPlay={togglePlay}
                          onPause={() => setIsPlaying(false)}
                          onNext={handleNext}
                          onPrevious={handlePrevious}
                          onVolumeChange={setVolume}
                          currentVolume={volume}
                          onFavorite={handleToggleFavorite}
                        />
                      </div>
                      
                      <VolumeSlider volume={volume} setVolume={setVolume} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-[280px] space-y-4">
              <SmartPlaylists 
                onSelectPlaylist={handleSmartPlaylistSelect}
                currentTrackId={currentTrackId}
                accentColor={accentColor}
              />
              
              {showLyrics ? (
                <LyricsView 
                  currentTrack={currentTrack} 
                  progress={progress}
                  isPlaying={isPlaying}
                />
              ) : (
                <TrackList
                  tracks={filteredTracks}
                  currentTrackId={currentTrackId}
                  onSelectTrack={selectTrack}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showUserProfile && (
        <UserProfile 
          onClose={() => setShowUserProfile(false)} 
          accentColor={accentColor}
          onColorChange={handleColorChange}
          isDarkTheme={isDarkTheme}
          onThemeChange={handleThemeChange}
          favoriteTracks={favoriteTracks}
        />
      )}
      
      <ShareOptions 
        currentTrack={currentTrack} 
        isOpen={showShareOptions} 
        onClose={() => setShowShareOptions(false)} 
      />
      
      <CollaborativePlaylists 
        isOpen={showCollaborativePlaylists} 
        onClose={() => setShowCollaborativePlaylists(false)}
        onSelectPlaylist={handleSmartPlaylistSelect}
      />
    </div>
  );
}
