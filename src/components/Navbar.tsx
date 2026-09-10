import React, { useState } from 'react';
import { Volume2, VolumeX, Share2, Eye, Edit3, ArrowRight, Printer, Sparkles, ShieldCheck } from 'lucide-react';
import { spiritualAudio } from '../utils/audio';
import { TattvaLogo } from './TattvaLogo';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: 'landing' | 'templates' | 'door' | 'editor' | 'invitation' | 'admin';
  onNavigate: (view: 'landing' | 'templates' | 'editor' | 'invitation' | 'door' | 'admin') => void;
  onOpenShare?: () => void;
  onOpenPrint?: () => void;
  onOpenDoorCeremony?: () => void;
  selectedTemplateName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenShare,
  onOpenPrint,
  onOpenDoorCeremony,
  selectedTemplateName,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const { isAdmin } = useAuth();


  const toggleSound = () => {
    const active = spiritualAudio.toggle();
    setIsPlayingAudio(active);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF8EE]/95 border-b border-[#E0A458]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo (Tattva Paarna Invitations) */}
        <button
          id="nav-brand-btn"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left group transition cursor-pointer"
        >
          <TattvaLogo size="sm" showText={true} />
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#5C4E42]">
          <a href="#designs" className="hover:text-[#C98A3E] transition">
            Designs
          </a>
          <a href="#whatsapp" className="hover:text-[#C98A3E] transition">
            WhatsApp Preview
          </a>
          <a href="#how" className="hover:text-[#C98A3E] transition">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-[#C98A3E] transition">
            Pricing
          </a>
          <a href="#faq" className="hover:text-[#C98A3E] transition">
            FAQ
          </a>
          <button 
            onClick={() => onNavigate('admin')} 
            className={`transition flex items-center gap-1 ${currentView === 'admin' ? 'text-[#C98A3E]' : 'text-stone-300 hover:text-[#C98A3E]'}`}
            title="Admin Access"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </nav>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Sacred Door Entrance & Digital Tilak Ceremony Trigger */}
          {onOpenDoorCeremony && (
            <button
              id="nav-door-ceremony-btn"
              onClick={onOpenDoorCeremony}
              title="Experience Bhagwan Mahavir Swami Darshan, Sacred Doors & Digital Tilak"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#683D10] bg-gradient-to-r from-[#FAF2DE] via-[#F6E8C3] to-[#ECCF8D] border border-[#D4AF37] hover:shadow-sm transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B] animate-pulse" />
              <span>॥ પાવન દ્વાર & તિલક ॥</span>
            </button>
          )}

          {/* Traditional Print / Save PDF for Elders */}
          {onOpenPrint && (
            <button
              id="nav-print-pdf-btn"
              onClick={onOpenPrint}
              title="Print or Save PDF for elderly relatives"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#543007] bg-[#FFFBF0] border border-[#D4AF37]/70 hover:bg-[#FDF4D9] transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#8C5D1F]" />
              <span className="hidden sm:inline">પ્રિન્ટ / PDF</span>
            </button>
          )}

          {/* Audio toggle */}
          <button
            id="audio-toggle-btn"
            onClick={toggleSound}
            title={isPlayingAudio ? 'Mute sacred ambient sound' : 'Play sacred ambient sound'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#E0A458]/20 text-[#8C5D1F] border border-[#E0A458]'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#C98A3E]" />
                <span className="hidden md:inline">Stotra Audio</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden md:inline">Sound</span>
              </>
            )}
          </button>

          {/* View switcher buttons */}
          {currentView === 'editor' && (
            <button
              id="view-full-invite-nav-btn"
              onClick={() => onNavigate('invitation')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2A2018] hover:bg-[#160F0A] text-[#FBF8EE] shadow-sm transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#E0A458]" />
              <span>Full Invite</span>
            </button>
          )}

          {currentView === 'invitation' && (
            <button
              id="edit-details-nav-btn"
              onClick={() => onNavigate('editor')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF4E6] border border-[#E0A458]/50 hover:bg-[#F3ECCE] text-[#8C5D1F] transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          )}

          {/* Share button in invitation view */}
          {currentView === 'invitation' && onOpenShare && (
            <button
              id="share-nav-btn"
              onClick={onOpenShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#008069] hover:bg-[#006A57] text-white shadow-sm transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          )}

          {currentView === 'landing' && (
            <button
              id="nav-create-btn"
              onClick={() => onNavigate('editor')}
              className="px-4 py-1.5 rounded-full text-xs font-bold font-poppins bg-[#2A2018] hover:bg-[#160F0A] text-[#FBF8EE] shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Create — ₹899</span>
              <ArrowRight className="w-3 h-3 text-[#E0A458]" />
            </button>
          )}
        </div>
      </div>
    
      {/* Sacred Invocation Banner */}
      <div className="w-full bg-[#FAF8F3] border-t border-b border-[#D4AF37]/30 py-1.5 flex justify-center">
        <span className="font-hindi text-[11px] text-[#C08B46] tracking-widest font-medium">॥ श्री महावीराय नमः ॥</span>
      </div>
    </header>

  );
};
