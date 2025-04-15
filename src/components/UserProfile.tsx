
import { useState } from "react";
import { X, Music, Heart, Clock, Settings, Edit, Camera } from "lucide-react";

interface UserProfileProps {
  onClose: () => void;
  accentColor: string;
  onColorChange: (color: string) => void;
  isDarkTheme: boolean;
  onThemeChange: (isDark: boolean) => void;
  favoriteTracks?: {
    id: string;
    title: string;
    artist: string;
    duration: string;
    cover: string;
  }[];
}

export default function UserProfile({
  onClose,
  accentColor,
  onColorChange,
  isDarkTheme,
  onThemeChange,
  favoriteTracks = [],
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState("Music Lover");
  const [bio, setBio] = useState("I love listening to The Weeknd and finding new music!");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedBio, setEditedBio] = useState(bio);
  
  const handleSaveProfile = () => {
    setUsername(editedUsername);
    setBio(editedBio);
    setIsEditing(false);
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass w-full max-w-3xl rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in">
        <div className="relative">
          <div 
            className="h-40 w-full" 
            style={{ backgroundColor: accentColor }}
          />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex px-6 pb-4">
            <div className="relative -mt-14">
              <div 
                className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700"
              >
                <img 
                  src="https://i.pravatar.cc/200" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full hover:bg-opacity-90 transition-opacity">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="flex-grow pl-6 pt-4">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-20"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSaveProfile} 
                      className="px-4 py-1.5 bg-primary text-white rounded-md hover:bg-opacity-90 transition-opacity"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="px-4 py-1.5 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{username}</h2>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 dark:bg-black/20 border-t border-white/10 dark:border-gray-800">
          <div className="flex overflow-x-auto scrollbar-thin">
            <button 
              className={`px-5 py-3 font-medium transition-colors ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`px-5 py-3 font-medium transition-colors ${activeTab === 'favorites' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </button>
            <button 
              className={`px-5 py-3 font-medium transition-colors ${activeTab === 'history' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
            <button 
              className={`px-5 py-3 font-medium transition-colors ${activeTab === 'settings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Music size={18} />
                    Your Top Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Pop', 'R&B', 'Electronic', 'Hip-Hop', 'Alternative'].map((genre) => (
                      <span 
                        key={genre} 
                        className="px-3 py-1 rounded-full bg-white/10 dark:bg-black/20 text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Heart size={18} />
                    Your Top Artists
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {['The Weeknd', 'Dua Lipa', 'Drake', 'Billie Eilish', 'Taylor Swift'].map((artist) => (
                      <div key={artist} className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                          <div className="w-full h-full bg-gray-300 dark:bg-gray-700" />
                        </div>
                        <span className="text-sm text-center">{artist}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'favorites' && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Heart size={18} className="text-red-500" />
                  Your Favorites
                </h3>
                
                {favoriteTracks.length > 0 ? (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {favoriteTracks.map((track) => (
                      <div 
                        key={track.id} 
                        className="flex items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={track.cover} 
                            alt={track.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://i.scdn.co/image/ab67616d0000b2736d4b58bdf055516f00aa0707"; // fallback image
                            }}
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-medium text-sm truncate">{track.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{track.artist}</p>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          {track.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/5 dark:bg-black/20 p-6 rounded-lg text-center">
                    <Heart size={32} className="mx-auto mb-3 text-gray-400" />
                    <p>No favorites yet</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Start adding songs to your favorites
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'history' && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock size={18} />
                  Recently Played
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Your listening history will appear here.</p>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings size={18} />
                  Appearance Settings
                </h3>
                
                <div>
                  <h4 className="font-medium mb-2">Theme</h4>
                  <div className="flex items-center gap-4">
                    <button 
                      className={`p-3 rounded-lg border ${!isDarkTheme ? 'border-primary ring-2 ring-primary/30' : 'border-white/20'}`}
                      onClick={() => onThemeChange(false)}
                    >
                      <div className="w-20 h-12 bg-white rounded-md shadow-sm mb-2"></div>
                      <span className="text-sm">Light</span>
                    </button>
                    
                    <button 
                      className={`p-3 rounded-lg border ${isDarkTheme ? 'border-primary ring-2 ring-primary/30' : 'border-white/20'}`}
                      onClick={() => onThemeChange(true)}
                    >
                      <div className="w-20 h-12 bg-gray-800 rounded-md shadow-sm mb-2"></div>
                      <span className="text-sm">Dark</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Accent Color</h4>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    {[
                      { name: "Purple", color: "#9b87f5" },
                      { name: "Orange", color: "#f97316" },
                      { name: "Green", color: "#10b981" },
                      { name: "Blue", color: "#3b82f6" },
                      { name: "Pink", color: "#ec4899" },
                      { name: "Yellow", color: "#eab308" },
                      { name: "Red", color: "#ef4444" },
                      { name: "Violet", color: "#a855f7" }
                    ].map(({ name, color }) => (
                      <button
                        key={color}
                        onClick={() => onColorChange(color)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-transform hover:scale-105 ${
                          accentColor === color ? 'ring-2 ring-gray-400' : ''
                        }`}
                      >
                        <div 
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs">{name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
