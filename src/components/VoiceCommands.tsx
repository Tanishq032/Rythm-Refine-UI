
import { useState, useEffect } from "react";
import { Mic, MicOff, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceCommandsProps {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (volume: number) => void;
  currentVolume: number;
  onFavorite: () => void;
}

export default function VoiceCommands({
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onVolumeChange,
  currentVolume,
  onFavorite
}: VoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const { toast } = useToast();
  
  // Mock speech recognition for demo purposes
  // In a real app, you would use the Web Speech API or a similar library
  useEffect(() => {
    if (!isListening) return;
    
    let timeoutId: number;
    
    const processCommand = (command: string) => {
      const lowerCommand = command.toLowerCase();
      
      if (lowerCommand.includes("play")) {
        onPlay();
        return "Playing music";
      } else if (lowerCommand.includes("pause") || lowerCommand.includes("stop")) {
        onPause();
        return "Music paused";
      } else if (lowerCommand.includes("next") || lowerCommand.includes("skip")) {
        onNext();
        return "Playing next track";
      } else if (lowerCommand.includes("previous") || lowerCommand.includes("back")) {
        onPrevious();
        return "Playing previous track";
      } else if (lowerCommand.includes("volume")) {
        if (lowerCommand.includes("up")) {
          const newVolume = Math.min(1, currentVolume + 0.1);
          onVolumeChange(newVolume);
          return "Volume increased";
        } else if (lowerCommand.includes("down")) {
          const newVolume = Math.max(0, currentVolume - 0.1);
          onVolumeChange(newVolume);
          return "Volume decreased";
        } else if (lowerCommand.includes("max")) {
          onVolumeChange(1);
          return "Volume set to maximum";
        } else if (lowerCommand.includes("mute")) {
          onVolumeChange(0);
          return "Volume muted";
        }
      } else if (lowerCommand.includes("favorite") || lowerCommand.includes("like")) {
        onFavorite();
        return "Added to favorites";
      }
      
      return "Command not recognized";
    };
    
    // Simulate voice recognition with random commands for demo
    timeoutId = window.setTimeout(() => {
      const demoCommands = [
        "Play music",
        "Pause",
        "Next track",
        "Previous song",
        "Volume up",
        "Volume down",
        "Add to favorites"
      ];
      
      const randomCommand = demoCommands[Math.floor(Math.random() * demoCommands.length)];
      setTranscript(randomCommand);
      
      const response = processCommand(randomCommand);
      
      toast({
        title: "Voice Command",
        description: `"${randomCommand}" - ${response}`,
      });
      
      setIsListening(false);
    }, 2000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isListening, onPlay, onPause, onNext, onPrevious, onVolumeChange, currentVolume, onFavorite]);
  
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setTranscript("");
    } else {
      setIsListening(true);
      toast({
        title: "Voice Activated",
        description: "Listening for commands...",
      });
    }
  };
  
  return (
    <div className="relative">
      <button
        onClick={toggleListening}
        className={`p-2 rounded-full transition-all ${
          isListening 
            ? "bg-primary text-white animate-pulse-beat" 
            : "bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
        }`}
        aria-label={isListening ? "Stop listening" : "Start voice commands"}
      >
        {isListening ? <Mic size={20} /> : <MicOff size={20} />}
      </button>
      
      <button
        onClick={() => setShowHelp(!showHelp)}
        className="ml-2 p-2 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-colors"
      >
        <HelpCircle size={20} />
      </button>
      
      {isListening && (
        <div className="absolute top-full right-0 mt-2 p-2 bg-primary/90 text-white rounded-lg text-sm min-w-[120px] animate-fade-in">
          Listening... {transcript && `"${transcript}"`}
        </div>
      )}
      
      {showHelp && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 w-64 animate-fade-in">
          <h4 className="font-bold mb-2">Voice Commands</h4>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li>"Play" - Start playback</li>
            <li>"Pause/Stop" - Pause playback</li>
            <li>"Next/Skip" - Play next track</li>
            <li>"Previous/Back" - Play previous track</li>
            <li>"Volume up/down" - Adjust volume</li>
            <li>"Volume max/mute" - Set volume</li>
            <li>"Favorite/Like" - Add to favorites</li>
          </ul>
        </div>
      )}
    </div>
  );
}
