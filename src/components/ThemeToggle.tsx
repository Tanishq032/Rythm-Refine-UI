
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  onThemeChange?: (isDark: boolean) => void;
}

export default function ThemeToggle({ onThemeChange }: ThemeToggleProps = {}) {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme based on system preferences
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      onThemeChange?.(true);
    }
  }, [onThemeChange]);

  // Toggle theme with animation
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    document.documentElement.classList.add('theme-transition');
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    onThemeChange?.(newIsDark);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 800);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 hover:bg-secondary flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-300 animate-scale-in" />
      ) : (
        <Moon size={20} className="text-slate-700 animate-scale-in" />
      )}
    </button>
  );
}
