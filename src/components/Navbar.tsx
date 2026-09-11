import React, { useState } from 'react';
import { Volume2, VolumeX, Share2, Eye, Edit3, ArrowRight, Sparkles, ShieldCheck, Music, CheckCircle2 } from 'lucide-react';
import { TAPASYA_SONGS } from '../utils/audio';
import { useAudioPlayback } from '../hooks/useAudioPlayback';
import { TattvaLogo } from './TattvaLogo';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: 'landing' | 'templates' | 'door' | 'editor' | 'invitation' | 'admin';
  onNavigate: (view: 'landing' | 'templates' | 'editor' | 'invitation' | 'door' | 'admin') => void;
  onOpenShare?: () => void;
  onOpenPrint?: () => void;
  onOpenDoorCeremony?: () => void;
  selectedTemplateName: string;
  selectedSongId?: string;
  customAudioUrl?: string;
  songAudioUrls?: Record<string, string>;
  onSelectSong?: (songId: string) => void;
  isGuestView?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenShare,
  onOpenPrint,
  onOpenDoorCeremony,
  selectedTemplateName,
  selectedSongId = 'reAavyaTapashvi',
  customAudioUrl = '',
  songAudioUrls = {},
  onSelectSong,
  isGuestView = false,
}) => {
  const [showSongDropdown, setShowSongDropdown] = useState(false);
  const { isAdmin } = useAuth();

  const {
    isPlaying,
    currentSong,
    validationInfo,
    toggleSound,
    selectSong,
  } = useAudioPlayback(selectedSongId, customAudioUrl, songAudioUrls);

  const handlePickSong = (songId: string) => {
    if (onSelectSong) {
      onSelectSong(songId);
    }
    selectSong(songId);
    setShowSongDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF8EE]/95 border-b border-[#E0A458]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-3">
        
        {/* Brand / Logo (Tattva Paarna Invitations) */}
        <a
          href="https://jain-invitation.vercel.app/#designs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 sm:gap-2 text-left group transition cursor-pointer shrink-0"
        >
          {/* On small mobile, show compact logo without long subtitle to avoid topbar overflow */}
          <div className="hidden sm:block">
            <TattvaLogo size="sm" showText={true} />
          </div>
          <div className="sm:hidden">
            <TattvaLogo size="xs" showText={false} />
            <span className="font-cinzel text-sm font-bold tracking-wider text-[#2A2018] ml-1">
              Tattva
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#5C4E42]">
          <a href="https://jain-invitation.vercel.app/#designs" target="_blank" rel="noopener noreferrer" className="hover:text-[#C98A3E] transition">
            Designs
          </a>
          <a href="https://jain-invitation.vercel.app/#whatsapp" target="_blank" rel="noopener noreferrer" className="hover:text-[#C98A3E] transition">
            WhatsApp Preview
          </a>
          <a href="https://jain-invitation.vercel.app/#how" target="_blank" rel="noopener noreferrer" className="hover:text-[#C98A3E] transition">
            How It Works
          </a>
          <a href="https://jain-invitation.vercel.app/#pricing" target="_blank" rel="noopener noreferrer" className="hover:text-[#C98A3E] transition">
            Pricing
          </a>
          <a href="https://jain-invitation.vercel.app/#faq" target="_blank" rel="noopener noreferrer" className="hover:text-[#C98A3E] transition">
            FAQ
          </a>
          {!isGuestView && (
            <button 
              onClick={() => onNavigate('admin')} 
              className={`transition flex items-center gap-1 ${currentView === 'admin' ? 'text-[#C98A3E]' : 'text-stone-300 hover:text-[#C98A3E]'}`}
              title="Admin Access"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
        </nav>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Sacred Door Entrance Trigger */}
          {onOpenDoorCeremony && (
            <button
              id="nav-door-ceremony-btn"
              onClick={onOpenDoorCeremony}
              title="Experience Bhagwan Mahavir Swami Darshan & Sacred Doors"
              className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-[#683D10] bg-gradient-to-r from-[#FAF2DE] via-[#F6E8C3] to-[#ECCF8D] border border-[#D4AF37] hover:shadow-sm transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B8860B] animate-pulse shrink-0" />
              <span>
                <span className="hidden sm:inline">॥ પાવન </span>દ્વાર<span className="hidden sm:inline"> ॥</span>
              </span>
            </button>
          )}

          {/* Audio toggle & song picker */}
          <div className="relative">
            <button
              id="audio-toggle-btn"
              onClick={toggleSound}
              title={isPlaying ? `Mute ${currentSong.titleEn}` : `Play ${currentSong.titleEn}`}
              className={`flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                isPlaying
                  ? 'bg-[#E0A458]/20 text-[#8C5D1F] border border-[#E0A458] shadow-xs font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200'
              }`}
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse text-[#C98A3E] shrink-0" />
                  <span className="hidden md:inline font-semibold">{currentSong.titleGu}</span>
                  <span className="md:hidden">Sound</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-500 shrink-0" />
                  <span className="hidden md:inline">{currentSong.titleGu}</span>
                  <span className="md:hidden">Sound</span>
                </>
              )}
            </button>

            {/* Song Switcher Dropdown Trigger */}
            <button
              type="button"
              onClick={() => setShowSongDropdown(!showSongDropdown)}
              title="Change Stotra Song"
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8B6E28] text-white flex items-center justify-center text-[9px] font-bold shadow-xs hover:scale-110 transition cursor-pointer"
            >
              <Music className="w-2.5 h-2.5" />
            </button>

            {/* Dropdown Menu */}
            {showSongDropdown && (
              <div className="absolute right-0 mt-2 w-60 sm:w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 text-left space-y-1">
                <div className="px-2 py-1 border-b border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold font-cinzel text-stone-800 uppercase tracking-wider">
                    Select Tapasya Song
                  </span>
                  <span className="text-[9px] text-[#8B6E28] font-semibold">6 Songs</span>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1 pt-1 no-scrollbar">
                  {TAPASYA_SONGS.map((song) => (
                    <button
                      key={song.id}
                      type="button"
                      onClick={() => handlePickSong(song.id)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition cursor-pointer flex flex-col ${
                        selectedSongId === song.id
                          ? 'bg-[#FAF4E6] text-[#8B6E28] font-bold border border-[#E0A458]/40'
                          : 'hover:bg-stone-50 text-stone-700 font-medium'
                      }`}
                    >
                      <span className="truncate">{song.titleGu}</span>
                      <span className="text-[10px] text-stone-400 font-normal truncate">
                        {song.singer}
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handlePickSong('none')}
                    className={`w-full text-left p-2 rounded-lg text-xs transition cursor-pointer ${
                      selectedSongId === 'none'
                        ? 'bg-stone-100 text-stone-900 font-bold'
                        : 'hover:bg-stone-50 text-stone-500'
                    }`}
                  >
                    🚫 No Music / Mute
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* View switcher buttons */}
          {!isGuestView && currentView === 'editor' && (
            <button
              id="view-full-invite-nav-btn"
              onClick={() => onNavigate('invitation')}
              className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#2A2018] hover:bg-[#160F0A] text-[#FBF8EE] shadow-sm transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E0A458] shrink-0" />
              <span>Full Invite</span>
            </button>
          )}

          {!isGuestView && currentView === 'invitation' && (
            <button
              id="edit-details-nav-btn"
              onClick={() => onNavigate('editor')}
              className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#FAF4E6] border border-[#E0A458]/50 hover:bg-[#F3ECCE] text-[#8C5D1F] transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>Edit</span>
            </button>
          )}

          {/* Share button in invitation view */}
          {currentView === 'invitation' && onOpenShare && (
            <button
              id="share-nav-btn"
              onClick={onOpenShare}
              className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#008069] hover:bg-[#006A57] text-white shadow-sm transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>Share</span>
            </button>
          )}

          {!isGuestView && currentView === 'landing' && (
            <button
              id="nav-create-btn"
              onClick={() => onNavigate('editor')}
              className="px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold font-poppins bg-[#2A2018] hover:bg-[#160F0A] text-[#FBF8EE] shadow-sm flex items-center gap-1 transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>Create <span className="hidden sm:inline">— ₹899</span></span>
              <ArrowRight className="w-3 h-3 text-[#E0A458] shrink-0" />
            </button>
          )}
        </div>
      </div>
    
      {/* Sacred Invocation Banner */}
      <div className="w-full bg-[#FAF8F3] border-t border-b border-[#D4AF37]/30 py-1 px-2 flex justify-center overflow-hidden">
        <span className="font-hindi text-[10px] sm:text-[11px] text-[#C08B46] tracking-widest font-medium whitespace-nowrap truncate">
          ॥ श्री महावीराय नमः ॥
        </span>
      </div>
    </header>
  );
};
