import React from 'react';
import { Heart } from 'lucide-react';

export const InviteOFooter: React.FC = () => {
  return (
    <footer className="bg-[#1F1711] text-stone-400 py-12 border-t border-[#3D3024]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800 text-center md:text-left">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#E0A458]/50 bg-[#FFFDF9] shadow-md shrink-0">
              <img src="/logo.png" alt="Tattva" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-cinzel text-lg font-bold text-[#FBF8EE] block leading-tight tracking-wider">
                Tattva
              </span>
              <span className="font-cinzel text-[9.5px] text-[#E0A458] font-semibold tracking-[0.2em] block uppercase mt-0.5">
                PAARNA INVITATIONS
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
            <a href="https://jain-invitation.vercel.app/#designs" target="_blank" rel="noopener noreferrer" className="hover:text-[#E0A458] transition">Designs</a>
            <a href="https://jain-invitation.vercel.app/#whatsapp" target="_blank" rel="noopener noreferrer" className="hover:text-[#E0A458] transition">WhatsApp Preview</a>
            <a href="https://jain-invitation.vercel.app/#how" target="_blank" rel="noopener noreferrer" className="hover:text-[#E0A458] transition">How It Works</a>
            <a href="https://jain-invitation.vercel.app/#pricing" target="_blank" rel="noopener noreferrer" className="hover:text-[#E0A458] transition">Pricing</a>
            <a href="https://jain-invitation.vercel.app/#faq" target="_blank" rel="noopener noreferrer" className="hover:text-[#E0A458] transition">FAQ</a>
          </div>

          {/* Sacred Jain Salutation */}
          <div className="text-center md:text-right">
            <span className="font-devanagari text-sm text-[#E0A458] font-semibold block">
              ॥ ॐ नमो जिणाणं ॥
            </span>
            <span className="text-[11px] text-stone-500">
              Bhagwan Mahavir Swami Darshan
            </span>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© 2026 Tattva. Crafted with devotion for sacred Jain Pārna celebrations.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Made with reverence</span>
            <Heart className="w-3 h-3 text-amber-500 fill-amber-500 inline" />
            <span>for Tapasvis worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
