
import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search songs..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const clearSearch = () => {
    setQuery("");
    onSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search when Ctrl+K or Cmd+K is pressed
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative w-full max-w-md transition-all duration-300 ${
        isFocused ? "scale-105" : "scale-100"
      }`}
    >
      <div className={`
        glass flex items-center gap-2 px-3 py-2 rounded-full
        border border-white/20 transition-all duration-300
        ${isFocused ? "shadow-lg border-primary/50 bg-white/10" : "shadow-md bg-white/5"}
      `}>
        <Search size={18} className="text-gray-400" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm placeholder:text-gray-400"
          aria-label="Search songs"
        />
        
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      {isFocused && (
        <div className="absolute right-3 top-2 text-xs text-gray-400">
          Ctrl+K
        </div>
      )}
    </form>
  );
}
