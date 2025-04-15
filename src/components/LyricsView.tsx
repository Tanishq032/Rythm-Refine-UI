
import { useState, useEffect } from "react";
import { MusicIcon } from "lucide-react";

interface LyricsViewProps {
  currentTrack: {
    id: string;
    title: string;
    artist: string;
  };
  progress: number;
  isPlaying: boolean;
}

interface LyricLine {
  time: number;
  text: string;
}

export default function LyricsView({ currentTrack, progress, isPlaying }: LyricsViewProps) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLine, setCurrentLine] = useState<number>(-1);
  
  // Mock lyrics for demo purposes
  useEffect(() => {
    // In a real app, you would fetch lyrics from an API based on the track
    const mockLyrics: Record<string, LyricLine[]> = {
      "1": [
        { time: 0.1, text: "I've been tryna call" },
        { time: 0.2, text: "I've been on my own for long enough" },
        { time: 0.3, text: "Maybe you can show me how to love, maybe" },
        { time: 0.4, text: "I'm going through withdrawals" },
        { time: 0.5, text: "You don't even have to do too much" },
        { time: 0.6, text: "You can turn me on with just a touch, baby" },
        { time: 0.7, text: "I look around and Sin City's cold and empty" },
        { time: 0.8, text: "No one's around to judge me" },
        { time: 0.9, text: "I can't see clearly when you're gone" },
      ],
      "2": [
        { time: 0.1, text: "Take my breath away" },
        { time: 0.2, text: "And make it last forever, babe" },
        { time: 0.3, text: "Do it now or never, babe" },
        { time: 0.4, text: "Take my breath away" },
        { time: 0.5, text: "Nobody does it better, babe" },
        { time: 0.6, text: "Bring me close to heaven, babe" },
        { time: 0.7, text: "Take my breath" },
        { time: 0.8, text: "And I know you won't let me OD" },
        { time: 0.9, text: "And if I finally die in peace" },
      ],
      "3": [
        { time: 0.1, text: "I'm a motherf*ckin' starboy" },
        { time: 0.2, text: "Look what you've done" },
        { time: 0.3, text: "I'm a motherf*ckin' starboy" },
        { time: 0.4, text: "Every day a n*gga try to test me, ah" },
        { time: 0.5, text: "Every day a n*gga try to end me, ah" },
        { time: 0.6, text: "Pull up in that new toy" },
        { time: 0.7, text: "The Wraith of new toys" },
        { time: 0.8, text: "And I'm looking for the cash flow" },
        { time: 0.9, text: "House so empty, need a centerpiece" },
      ],
      "4": [
        { time: 0.1, text: "In your eyes, I see there's something burning inside you" },
        { time: 0.2, text: "Oh, inside you" },
        { time: 0.3, text: "In your eyes, I know it hurts to smile but you try to" },
        { time: 0.4, text: "Oh, you try to" },
        { time: 0.5, text: "You always try to hide the pain" },
        { time: 0.6, text: "You always know just what to say" },
        { time: 0.7, text: "I always look the other way" },
        { time: 0.8, text: "I'm blind, I'm blind" },
        { time: 0.9, text: "In your eyes, you lie, but I don't let it define you" },
      ],
      "5": [
        { time: 0.1, text: "Take my hand and we will run away" },
        { time: 0.2, text: "Down the sweeping hallways" },
        { time: 0.3, text: "After hours 'til the daylight" },
        { time: 0.4, text: "Feels like I've waited my whole life" },
        { time: 0.5, text: "For this one night" },
        { time: 0.6, text: "Run away" },
        { time: 0.7, text: "Let my presence be the gift for your birthday" },
        { time: 0.8, text: "Save all your love for me" },
        { time: 0.9, text: "We can dance 'til sunrise" },
      ]
    };
    
    setLyrics(mockLyrics[currentTrack.id] || []);
    setCurrentLine(-1);
  }, [currentTrack.id]);
  
  // Update current line based on progress
  useEffect(() => {
    if (lyrics.length === 0) return;
    
    // Map progress (0-1) to lyrics lines
    const lineIndex = Math.floor(progress * lyrics.length);
    if (lineIndex !== currentLine && lineIndex < lyrics.length) {
      setCurrentLine(lineIndex);
    }
  }, [progress, lyrics, currentLine]);
  
  if (lyrics.length === 0) {
    return (
      <div className="glass rounded-xl p-6 flex flex-col items-center justify-center h-[300px]">
        <MusicIcon size={40} className="mb-4 text-gray-400" />
        <p className="text-center text-gray-600 dark:text-gray-400">
          Lyrics not available for this track
        </p>
      </div>
    );
  }
  
  return (
    <div className="glass rounded-xl p-4 overflow-hidden h-[300px] relative">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MusicIcon size={18} />
        Lyrics
      </h3>
      
      <div className="overflow-auto h-[calc(100%-40px)] px-2 py-1">
        {lyrics.map((line, index) => (
          <div
            key={index}
            className={`py-2 transition-all duration-300 ${
              index === currentLine 
                ? "text-lg font-bold text-primary transform scale-105" 
                : "text-base text-gray-600 dark:text-gray-400"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>
      
      {isPlaying && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/20 dark:bg-white/10 px-3 py-1 rounded-full text-xs">
            Karaoke Mode
          </div>
        </div>
      )}
    </div>
  );
}
