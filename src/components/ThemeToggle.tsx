
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "./ui/toggle";

interface ThemeToggleProps {
  onThemeChange?: (isDark: boolean) => void;
}

export default function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme based on system preferences or previously stored theme
  useEffect(() => {
    // Check if dark mode is preferred or already set
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    const initialDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    
    setIsDark(initialDark);
    
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (onThemeChange) {
      onThemeChange(initialDark);
    }
  }, [onThemeChange]);

  // Toggle theme
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    document.documentElement.classList.add('theme-transition');
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 800);
    
    if (onThemeChange) {
      onThemeChange(newIsDark);
    }
  };

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 hover:bg-secondary flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon size={20} className="text-yellow-300 animate-scale-in" />
      ) : (
        <Sun size={20} className="text-slate-700 animate-scale-in" />
      )}
    </Toggle>
  );
}
