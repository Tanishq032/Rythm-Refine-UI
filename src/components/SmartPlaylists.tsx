
import { useState } from "react";
import { ListMusic, TrendingUp, Coffee, Zap, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface Playlist {
  id: string;
  title: string;
  description: string;
  tracks: string[];
  type: "mood" | "genre" | "smart";
  icon: React.ReactNode;
}

interface SmartPlaylistsProps {
  onSelectPlaylist: (tracks: string[]) => void;
  currentTrackId: string;
  accentColor: string;
}

export default function SmartPlaylists({ onSelectPlaylist, currentTrackId, accentColor }: SmartPlaylistsProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  
  const playlists: Playlist[] = [
    {
      id: "relaxing",
      title: "Relaxing Vibes",
      description: "Chill tracks for winding down",
      tracks: ["3", "4", "5"],
      type: "mood",
      icon: <Coffee size={18} />
    },
    {
      id: "energetic",
      title: "Energy Boost",
      description: "High-tempo tracks to get you moving",
      tracks: ["1", "3", "2"],
      type: "mood",
      icon: <Zap size={18} />
    },
    {
      id: "focus",
      title: "Deep Focus",
      description: "Concentration-enhancing tracks",
      tracks: ["5", "4", "1"],
      type: "mood",
      icon: <Brain size={18} />
    },
    {
      id: "trending",
      title: "Your Trending",
      description: "Based on your recent plays",
      tracks: ["2", "1", "3", "4"],
      type: "smart",
      icon: <TrendingUp size={18} />
    }
  ];
  
  const handleSelectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist.id);
    onSelectPlaylist(playlist.tracks);
  };
  
  return (
    <div className="glass rounded-xl p-4 mb-4 max-h-[300px] overflow-auto">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <ListMusic size={18} />
        Smart Playlists
      </h3>
      
      <div className="space-y-2">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => handleSelectPlaylist(playlist)}
            className={cn(
              "flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-white/30 dark:hover:bg-white/10",
              selectedPlaylist === playlist.id ? "bg-primary/20" : ""
            )}
            style={{
              borderLeft: selectedPlaylist === playlist.id ? `3px solid ${accentColor}` : ""
            }}
          >
            <div className="bg-black/10 dark:bg-white/10 p-2 rounded-md mr-3">
              {playlist.icon}
            </div>
            
            <div>
              <p className="font-medium text-sm">{playlist.title}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{playlist.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
