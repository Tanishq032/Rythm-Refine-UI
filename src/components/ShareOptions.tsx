
import { useState } from "react";
import { Share, Link, Facebook, Twitter, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareOptionsProps {
  currentTrack: {
    title: string;
    artist: string;
    cover: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareOptions({ currentTrack, isOpen, onClose }: ShareOptionsProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  if (!isOpen) return null;
  
  const handleCopyLink = () => {
    const shareText = `Listening to ${currentTrack.title} by ${currentTrack.artist} on Rhythm Refine`;
    navigator.clipboard.writeText(shareText);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard",
    });
  };
  
  const handleShare = (platform: string) => {
    // In a real app, this would open the platform's share dialog with proper URLs
    toast({
      title: "Shared!",
      description: `Track shared on ${platform}`,
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="glass max-w-md w-full rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Share Track</h3>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="flex items-center mb-6 p-3 bg-white/30 dark:bg-black/30 rounded-lg">
          <img src={currentTrack.cover} alt={currentTrack.title} className="w-14 h-14 rounded-md object-cover" />
          <div className="ml-3">
            <p className="font-medium">{currentTrack.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{currentTrack.artist}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button 
            className="bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 rounded-lg p-3 flex flex-col items-center transition-colors"
            onClick={() => handleShare("Facebook")}
          >
            <Facebook size={24} className="text-[#1877F2]" />
            <span className="text-xs mt-1">Facebook</span>
          </button>
          
          <button 
            className="bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 rounded-lg p-3 flex flex-col items-center transition-colors"
            onClick={() => handleShare("Twitter")}
          >
            <Twitter size={24} className="text-[#1DA1F2]" />
            <span className="text-xs mt-1">Twitter</span>
          </button>
          
          <button 
            className="bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 rounded-lg p-3 flex flex-col items-center transition-colors"
            onClick={() => handleShare("WhatsApp")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#25D366]"><path d="M17.6 6.31a8.5 8.5 0 0 0-14.48 6.08c0 1.47.36 2.87 1.08 4.13L3 22l5.7-1.49a8.46 8.46 0 0 0 4.05 1.03 8.5 8.5 0 0 0 8.5-8.5c0-2.33-.86-4.43-2.34-6.06"></path><path d="M3 22v-1.7A10.73 10.73 0 0 1 3 22z"></path><path d="M9.1 14.69a11.24 11.24 0 0 0 4.75-2.53 6.62 6.62 0 0 0 1.91-2.48c.12-.35.19-.72.19-1.1a2.5 2.5 0 0 0-2.5-2.47c-.35 0-.7.06-1.03.19a2.35 2.35 0 0 0-1.43 1.61l-.18.6a.5.5 0 0 1-.3.32l-1.13.22c-.27.05-.56-.16-.5-.44l.2-.87c.14-.67.5-1.21.98-1.55a4.13 4.13 0 0 1 2.78-.69 3.5 3.5 0 0 1 3.47 3.52c0 .55-.11 1.09-.32 1.59a7.49 7.49 0 0 1-2.16 2.77 12.3 12.3 0 0 1-5.16 2.45h-.05a.5.5 0 0 1-.57-.46v-.18c0-.15.07-.3.17-.4z"></path></svg>
            <span className="text-xs mt-1">WhatsApp</span>
          </button>
          
          <button 
            className="bg-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 rounded-lg p-3 flex flex-col items-center transition-colors"
            onClick={() => handleShare("Instagram")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E4405F]"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span className="text-xs mt-1">Instagram</span>
          </button>
        </div>
        
        <div className="relative">
          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-3">
              <Link size={18} />
            </div>
            <div className="px-3 py-2 flex-grow text-sm truncate">
              {`Listening to ${currentTrack.title} by ${currentTrack.artist}...`}
            </div>
            <button 
              className="bg-primary hover:bg-primary/90 text-white p-3 transition-colors"
              onClick={handleCopyLink}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
