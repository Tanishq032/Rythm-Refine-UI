
import { useState } from "react";
import { Users, PlusCircle, Trash, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface CollaborativePlaylist {
  id: string;
  name: string;
  creator: string;
  tracks: string[];
  collaborators: Collaborator[];
}

interface CollaborativePlaylistsProps {
  onClose: () => void;
  isOpen: boolean;
  onSelectPlaylist: (tracks: string[]) => void;
}

export default function CollaborativePlaylists({ onClose, isOpen, onSelectPlaylist }: CollaborativePlaylistsProps) {
  const [playlists, setPlaylists] = useState<CollaborativePlaylist[]>([
    {
      id: "collab-1",
      name: "Weekend Vibes",
      creator: "You",
      tracks: ["1", "3", "5"],
      collaborators: [
        { id: "user-1", name: "Alex", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "user-2", name: "Jordan", avatar: "https://i.pravatar.cc/150?img=2" }
      ]
    },
    {
      id: "collab-2",
      name: "Road Trip Mix",
      creator: "Alex",
      tracks: ["2", "4", "3"],
      collaborators: [
        { id: "user-3", name: "You", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: "user-4", name: "Taylor", avatar: "https://i.pravatar.cc/150?img=4" }
      ]
    }
  ]);
  
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  if (!isOpen) return null;
  
  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast({
        title: "Please enter a playlist name",
        variant: "destructive",
      });
      return;
    }
    
    const newPlaylist: CollaborativePlaylist = {
      id: `collab-${Date.now()}`,
      name: newPlaylistName,
      creator: "You",
      tracks: [],
      collaborators: [
        { id: "user-me", name: "You", avatar: "https://i.pravatar.cc/150?img=3" }
      ]
    };
    
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName("");
    
    toast({
      title: "Playlist created!",
      description: `"${newPlaylistName}" has been created.`,
    });
  };
  
  const handleInvite = (playlistId: string) => {
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send an invitation email
    toast({
      title: "Invitation sent!",
      description: `An invitation has been sent to ${inviteEmail}`,
    });
    
    setInviteEmail("");
  };
  
  const handleSelectPlaylist = (playlist: CollaborativePlaylist) => {
    onSelectPlaylist(playlist.tracks);
    onClose();
    
    toast({
      title: "Playlist loaded",
      description: `Playing "${playlist.name}"`,
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="glass max-w-md w-full rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Users size={20} />
            Collaborative Playlists
          </h3>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="Create new playlist..."
            className="flex-grow bg-white/20 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded-l-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button 
            onClick={handleCreatePlaylist}
            className="bg-primary hover:bg-primary/90 text-white p-2 rounded-r-lg transition-colors"
          >
            <PlusCircle size={20} />
          </button>
        </div>
        
        <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id}
              className="bg-white/20 dark:bg-black/20 rounded-lg p-3 cursor-pointer hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div onClick={() => handleSelectPlaylist(playlist)}>
                  <h4 className="font-medium">{playlist.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Created by {playlist.creator}</p>
                </div>
                <button 
                  onClick={() => setActivePlaylist(activePlaylist === playlist.id ? null : playlist.id)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {activePlaylist === playlist.id ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  )}
                </button>
              </div>
              
              {activePlaylist === playlist.id && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {playlist.collaborators.map((collaborator) => (
                      <div key={collaborator.id} className="flex items-center bg-white/30 dark:bg-white/10 rounded-full pl-1 pr-2 py-1">
                        <img 
                          src={collaborator.avatar} 
                          alt={collaborator.name} 
                          className="w-5 h-5 rounded-full mr-1" 
                        />
                        <span className="text-xs">{collaborator.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Invite via email..."
                      className="flex-grow bg-white/20 dark:bg-black/20 border border-gray-300 dark:border-gray-700 rounded-l-lg p-2 text-xs focus:outline-none"
                    />
                    <button 
                      onClick={() => handleInvite(playlist.id)}
                      className="bg-primary hover:bg-primary/90 text-white p-2 rounded-r-lg transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
