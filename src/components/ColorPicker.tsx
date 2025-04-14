
import { useCallback, useState } from "react";
import { Circle, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  selectedColor: string;
}

export default function ColorPicker({ onColorSelect, selectedColor }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const colors = [
    "#9b87f5", // Default purple
    "#f97316", // Orange
    "#10b981", // Green
    "#3b82f6", // Blue
    "#ec4899", // Pink
    "#eab308", // Yellow
    "#ef4444", // Red
    "#a855f7", // Violet
  ];
  
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="p-2 rounded-full transition-colors hover:bg-secondary flex items-center justify-center"
        aria-label="Change accent color"
        title="Change accent color"
      >
        <Palette size={20} className="text-gray-600 dark:text-gray-400" strokeWidth={1.5} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onColorSelect(color);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-6 h-6 rounded-full transition-transform hover:scale-110",
                  selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600" : ""
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} as accent color`}
              >
                {selectedColor === color && (
                  <Circle size={12} className="text-white mx-auto" fill="white" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
