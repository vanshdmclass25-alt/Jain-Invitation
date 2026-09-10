import React from 'react';
import { Palette, PlayCircle, Send, Check } from 'lucide-react';

export const InviteOHowItWorks: React.FC = () => {
  const steps = [
    {
      step: '1',
      title: 'Pick a design & personalize',
      desc: 'Select from 4 sacred themes. Fill in your Tapasvi\'s name, tapasya vow (Athai, Upvas, Maskhamana), venue, and upload their portrait photo.',
      time: '~30 seconds',
      icon: Palette,
      accent: 'from-[#E0A458] to-[#C98A3E]',
    },
    {
      step: '2',
      title: 'Walk through your live website',
      desc: 'Experience sacred Bhagwan Mahavir Swami darshan, audio stotra, and interactive event schedule just like your guests will.',
      time: 'Instant preview',
      icon: PlayCircle,
      accent: 'from-[#C98A3E] to-[#986815]',
    },
    {
      step: '3',
      title: 'Press publish & share on WhatsApp',
      desc: 'Receive your unique invite link with a pre-formatted message. One tap delivers it cleanly into all your family and community groups.',
      time: 'Unlimited guests',
      icon: Send,
      accent: 'from-[#2A2018] to-[#453427]',
    },
  ];

  return (
    <section id="how" className="py-16 sm:py-20 bg-[#FAF8EE] border-t border-[#E0A458]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-[#C98A3E] text-xs font-bold uppercase tracking-widest border border-[#E0A458]/40 mb-3">
            Simple Process
          </span>

          <h2 className="font-poppins text-2xl sm:text-4xl font-bold text-[#2A2018] tracking-tight mb-3">
            Three steps. Two minutes. Zero phone calls.
          </h2>

          <p className="text-[#5C4E42] text-sm sm:text-base leading-relaxed">
            You do the whole thing yourself, right now on this screen. No waiting for designers or draft revisions.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FAF4E6] to-[#FFFBF2] border border-[#E0A458]/40 flex items-center justify-center text-[#C98A3E] shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-2xl font-black font-poppins text-stone-200">
                      0{item.step}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-bold text-[#C98A3E] uppercase tracking-wider mb-1">
                    {item.time}
                  </span>

                  <h3 className="font-poppins text-lg font-bold text-[#2A2018] mb-2.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C4E42] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Self-serve & immediate</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
