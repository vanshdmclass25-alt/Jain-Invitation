import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { PriceTagBadge } from './PriceTagBadge';

interface InviteOPricingProps {
  onCreateInvite: () => void;
}

export const InviteOPricing: React.FC<InviteOPricingProps> = ({ onCreateInvite }) => {
  const features = [
    "Interactive 3D Door Opening Darshan",
    "Choice of 3 Premium Luxury Templates",
    "Family Photo Gallery & Milestone Memories",
    "Event Schedule with Google Maps Integration",
    "Custom Spiritual Background Audio",
    "Multi-language (Gujarati, Hindi, English)",
    "Interactive Scratch Reveal Darshan"
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-devanagari text-sm tracking-widest text-[#8C5D1F] uppercase font-bold mb-4 block">
            ॥ Simple & Transparent ॥
          </span>
          <h2 className="font-poppins text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2A2018] mb-6">
            Everything you need for a divine invitation.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            One single flat price for complete access to the premium Tattva interactive Pārna invitation platform. No hidden fees, no subscriptions.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto bg-white rounded-[32px] p-8 sm:p-10 shadow-2xl border border-stone-200 relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-radial from-[#F3ECCE] via-[#FAF8EE]/20 to-transparent opacity-50 blur-2xl pointer-events-none" />

          {/* Pricing Header */}
          <div className="relative z-10 flex flex-col items-center text-center border-b border-stone-100 pb-8 mb-8">
            <h3 className="text-xl font-bold font-cinzel text-[#8B6E28] mb-2 uppercase tracking-wide">
              Complete Package
            </h3>
            <div className="flex items-baseline gap-1 justify-center text-[#2A2018]">
              <span className="text-3xl font-bold">₹</span>
              <span className="text-6xl font-extrabold tracking-tighter">499</span>
            </div>
            <p className="text-stone-500 text-sm mt-3 font-medium">
              One-time payment. Lifetime access.
            </p>
          </div>

          {/* Features List */}
          <div className="relative z-10 space-y-4 mb-10">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#FAF3DF] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#8C5D1F] stroke-[3]" />
                </div>
                <span className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="relative z-10 w-full text-center">
            <div className="absolute -top-3.5 -left-2 z-20">
              <PriceTagBadge price="₹499" period="ONE-TIME" />
            </div>
            <button
              onClick={onCreateInvite}
              className="w-full py-4 rounded-xl bg-[#2A2018] hover:bg-[#1A130E] text-[#FBF8EE] font-poppins font-bold text-base shadow-lg transition cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Create Your Invite Now</span>
              <Sparkles className="w-4 h-4 text-[#E0A458] group-hover:scale-110 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
