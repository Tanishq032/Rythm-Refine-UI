
import { Music } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

interface TrackListProps {
  tracks: Track[];
  currentTrackId: string;
  onSelectTrack: (id: string) => void;
}

export default function TrackList({ tracks, currentTrackId, onSelectTrack }: TrackListProps) {
  return (
    <div className="mt-6 glass rounded-xl p-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Music size={18} />
        Up Next
      </h3>
      
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => onSelectTrack(track.id)}
            className={`flex items-center p-2 rounded-lg cursor-pointer track-hover ${
              currentTrackId === track.id ? "bg-primary/20" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
              <img
                src={track.cover}
                alt={`${track.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <p className="font-medium text-sm truncate">{track.title}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{track.artist}</p>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              {track.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
