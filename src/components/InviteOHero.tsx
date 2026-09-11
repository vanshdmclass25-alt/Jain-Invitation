import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, ArrowRight, Star, Clock, Users, Music, MapPin, Calendar, CheckCircle2, ChevronRight, Volume2, Smartphone } from 'lucide-react';
import { MahavirSwamiImage } from './MahavirSwamiImage';
import { InvitationData, TemplateDefinition } from '../types';
import { spiritualAudio } from '../utils/audio';
import { LongInvitePreview } from './LongInvitePreview';
import { PriceTagBadge } from './PriceTagBadge';

interface InviteOHeroProps {
  data: InvitationData;
  template: TemplateDefinition;
  onCreateInvite: () => void;
  onSeeRealInvite: () => void;
  onOpenDoorCeremony: () => void;
  onSelectTemplate: (id: import('../types').TemplateId) => void;
}

export const InviteOHero: React.FC<InviteOHeroProps> = ({
  data,
  template,
  onCreateInvite,
  onSeeRealInvite,
  onOpenDoorCeremony,
  onSelectTemplate,
}) => {
  // Audio playback state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    const active = spiritualAudio.toggle();
    setIsPlayingAudio(active);
  };

  return (
    
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-[#FAF8EE]">
      
      {/* Pink & Gold Swoosh Background */}
      <div className="absolute top-0 inset-x-0 h-40 pointer-events-none z-0">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 C360,120 1080,120 1440,0 L1440,0 L0,0 Z" fill="#FCE4EC" />
          <path d="M0,0 C360,110 1080,110 1440,0" fill="none" stroke="#F48FB1" strokeWidth="2" />
          <path d="M0,10 C360,130 1080,130 1440,10" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M0,20 C360,150 1080,150 1440,20" fill="none" stroke="#F48FB1" strokeWidth="4" strokeOpacity="0.4" />
        </svg>
        {/* Decorative Floating Dots */}
        <div className="absolute top-16 left-[10%] w-8 h-8 rounded-full border border-pink-300 bg-pink-100 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        <div className="absolute top-24 right-[15%] w-10 h-10 rounded-full border border-amber-300 bg-amber-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="absolute top-10 right-[35%] w-3 h-4 rounded-b-full bg-pink-400 opacity-60" />
      </div>


      {/* Decorative Toran & Auspicious Bells at top of page */}
      <div className="absolute top-0 inset-x-0 h-10 pointer-events-none z-10 flex justify-around opacity-75">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-[1px] h-3 bg-gradient-to-b from-[#C49A28] to-[#E5B242]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#C49A28]/80 shadow-xs border border-amber-200" />
            {i % 2 === 0 && (
              <div className="w-1.5 h-1.5 rotate-45 bg-[#E5B242] mt-0.5" />
            )}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: HERO COPY & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left pt-4 lg:pt-0">
            {/* Festival Date / Occasion Pill with Tattva Branding */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-[#E0A458]/40 shadow-xs text-xs font-semibold text-[#5C4E42] mb-6"
            >
              <img src="/logo.png" alt="Tattva" className="w-5 h-5 rounded-full object-cover border border-[#E0A458]/50" />
              <span className="font-cinzel text-xs font-bold text-[#2A2018]">Tattva</span>
              <span className="text-[#8C5D1F]">•</span>
              <span className="font-cinzel tracking-widest text-[10px] text-[#8C5D1F] uppercase font-semibold">PAARNA INVITATIONS</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-[#352516] tracking-tight leading-[1.15] mb-4 sm:mb-5"
            >
              Your own <span className="text-[#C08B46] italic relative inline-block underline decoration-1 underline-offset-4 sm:underline-offset-8">Jain Tapasya Pārna</span> <br className="hidden lg:block"/> invite website by <span className="font-bold text-[#6F4E37]">Tattva</span> — ready in 2 minutes
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#5C4E42] text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-6 sm:mb-8"
            >
              Not a card. Not a PDF — a real interactive website your guests walk through on their phone, shared as one WhatsApp link. Featuring sacred Bhagwan Mahavir Swami darshan, tapasvi photo, and event details. No calls, no waiting.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 mb-8 pt-2"
            >
              {/* Primary CTA with Tilted Price Tag Badge */}
              <div className="relative inline-block w-full sm:w-auto">
                <div className="absolute -top-3.5 -left-1 sm:-left-2 z-20">
                  <PriceTagBadge price="₹499" period="ONE-TIME" />
                </div>

                <button
                  id="hero-create-btn"
                  onClick={onCreateInvite}
                  className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-[#301E13] hover:bg-[#1A0F08] text-[#FBF8EE] font-poppins font-semibold text-sm sm:text-base shadow-xl shadow-[#2A2018]/25 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Create yours</span>
                  <ArrowRight className="w-4 h-4 text-[#E0A458]" />
                </button>
              </div>

              <button
                id="hero-sample-btn"
                onClick={onSeeRealInvite}
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full bg-white hover:bg-stone-50 text-[#2A2018] font-poppins font-medium text-sm border border-stone-300/80 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#C98A3E]" />
                <span>See sample</span>
              </button>
            </motion.div>

            {/* Trust Badges & Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-2 pt-4 border-t border-[#E0A458]/25 text-xs text-[#5C4E42]"
            >
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#2A2018]">5/5</span>
                  <span>by 1,200+ Jain families</span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C98A3E]" />
                  <span>2 min self-serve</span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#C98A3E]" />
                  <span>Unlimited guests</span>
                </div>
              </div>

              {/* Explicit pricing disclaimer line */}
              <div className="text-center lg:text-left text-[11px] font-medium text-[#7C6352] mt-0.5">
                <span className="font-bold text-[#2A2018]">₹499</span> one-time · no hidden fees
              </div>
            </motion.div>
          </div>

          
          {/* RIGHT: REAL LONG PHONE PREVIEW (LIKE INVITEO) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Floating Template Switcher */}
            <div className="mb-4 flex flex-wrap justify-center gap-2 z-10">
              <button 
                onClick={() => onSelectTemplate('sukoon')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${template.id === 'sukoon' ? 'bg-[#264A38] text-white border-[#264A38]' : 'bg-white text-[#5C4E42] border-[#E0A458]/40 shadow-sm hover:shadow-md'}`}
              >
                <span className="text-emerald-500">🍃</span> Sukoon
              </button>
              <button 
                onClick={() => onSelectTemplate('parnaUtsav')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${template.id === 'parnaUtsav' ? 'bg-[#8B1828] text-white border-[#8B1828]' : 'bg-white text-[#5C4E42] border-[#E0A458]/40 shadow-sm hover:shadow-md'}`}
              >
                <span className="text-pink-500">🌸</span> Pārna Utsav
              </button>
              <button 
                onClick={() => onSelectTemplate('shwet')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${template.id === 'shwet' ? 'bg-stone-200 text-[#1F1711] border-stone-300' : 'bg-white text-[#5C4E42] border-[#E0A458]/40 shadow-sm hover:shadow-md'}`}
              >
                <span className="text-stone-400">🤍</span> Shwet
              </button>
            </div>

            {/* Helpful indicator badge above phone */}
            <div className="mb-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E0A458]/40 shadow-xs text-xs text-[#5C4E42] z-10">
              <Smartphone className="w-3.5 h-3.5 text-[#C98A3E]" />
              <span className="font-medium">Live Website Preview — Scroll to view full page</span>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[300px] min-[380px]:max-w-[340px] sm:max-w-[365px]"
            >
              {/* Outer Phone Hardware Shell */}
              <div className="relative rounded-[48px] p-3 bg-[#2A2018] shadow-2xl border-[5px] border-[#3D3024]">
                
                {/* Phone Speaker Notch & Front Camera */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1F1711] rounded-full z-30 flex items-center justify-center gap-3">
                  <div className="w-10 h-1 bg-[#3D3024] rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-[#2A2018] border border-[#3D3024]" />
                </div>

                {/* Inner Screen Canvas (Tall, continuous scrollable long mobile webpage) */}
                <div className="relative rounded-[36px] bg-[#FAF8EE] overflow-hidden pt-7 min-h-[600px] sm:min-h-[640px] h-[640px] border border-stone-200 shadow-inner">
                  <LongInvitePreview
                    data={data}
                    template={template}
                    isPlayingAudio={isPlayingAudio}
                    onToggleAudio={toggleAudio}
                    className="h-full"
                  />
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="w-24 h-1 bg-stone-500 rounded-full mx-auto mt-2" />
              </div>

              {/* Action pill underneath phone */}
              <div className="mt-3 text-center">
                <button
                  onClick={onSeeRealInvite}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C5D1F] hover:text-[#2A2018] transition bg-white/80 hover:bg-white px-3.5 py-1.5 rounded-full border border-[#E0A458]/40 shadow-xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C98A3E]" />
                  <span>Open Immersive Fullscreen Preview</span>
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
