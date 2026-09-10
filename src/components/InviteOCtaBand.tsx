import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface InviteOCtaBandProps {
  onCreateInvite: () => void;
}

export const InviteOCtaBand: React.FC<InviteOCtaBandProps> = ({ onCreateInvite }) => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#2A2018] via-[#3B2C22] to-[#2A2018] text-[#FBF8EE] relative overflow-hidden border-t-2 border-[#E0A458]/40">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-radial from-[#E0A458]/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Sacred Mantra Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-[#E0A458]/30 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#E0A458]" />
          <span className="font-devanagari text-xs text-amber-200 tracking-wider">
            ॥ श्री महावीराय नमः ॥
          </span>
        </div>

        <h2 className="font-poppins text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
          Ready to invite everyone to Bhagwan Mahavir Swami's darshan & Pārna?
        </h2>

        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Create your own interactive invitation website right now. It takes less than 2 minutes and is ready to share on WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onCreateInvite}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E0A458] hover:bg-[#C98A3E] text-[#2A2018] font-poppins font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Create Your Invite Website — ₹899</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-stone-400 mt-4">
          ⚡ Instant activation · Works on all phones · Unlimited guests
        </p>

      </div>
    </section>
  );
};
