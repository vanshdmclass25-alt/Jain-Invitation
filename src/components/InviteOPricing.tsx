import React from 'react';
import { Check, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface InviteOPricingProps {
  onCreateInvite: () => void;
}

export const InviteOPricing: React.FC<InviteOPricingProps> = ({ onCreateInvite }) => {
  const features = [
    'Your own personal link (e.g. jain-invitation.vercel.app/#designs)',
    'Sacred darshan with Bhagwan Mahavir Swami',
    'Tapasvi portrait photo & sacred tapasya vow highlights',
    'Sacred ambient audio stotra & bell chimes',
    'Complete Pārna ceremony schedule & auspicious Muhurats',
    'Interactive Google Maps venue location with 1-tap directions',
    'Interactive Pushpanjali floral devotion & secret scratch card',
    'Instant digital invitation card download (high-res image)',
    'Unlimited guests, shares, and lifetime website access',
    'Zero advertisements or third-party banners',
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF8EE] via-[#F4EEDD] to-[#FAF8EE] border-t border-[#E0A458]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-[#C98A3E] text-xs font-bold uppercase tracking-widest border border-[#E0A458]/40 mb-3">
            Transparent Pricing
          </span>

          <h2 className="font-poppins text-2xl sm:text-4xl font-bold text-[#2A2018] tracking-tight mb-3">
            One price. Unlimited guests.
          </h2>

          <p className="text-[#5C4E42] text-sm sm:text-base leading-relaxed">
            Pay once. No subscriptions, no per-guest charges, no hidden fees.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#E0A458]/60 shadow-xl relative overflow-hidden">
          {/* Top Gold Corner Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

          {/* Pricing Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#2A2018] text-[#E0A458] text-[10px] font-bold uppercase tracking-wider mb-2">
                All-Inclusive Package
              </span>
              <h3 className="font-poppins text-xl font-bold text-[#2A2018]">
                Personalised Pārna Invite Website
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Fully personalized · Live in 2 minutes
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="flex items-baseline sm:justify-end gap-2">
                <span className="text-sm text-stone-400 line-through">₹1,499</span>
                <span className="text-3xl sm:text-4xl font-black font-poppins text-[#2A2018]">
                  ₹899
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mt-1">
                Special Offer (Save ₹600)
              </span>
            </div>
          </div>

          {/* Feature List */}
          <div className="py-6 space-y-3.5">
            {features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-[#8C5D1F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-xs sm:text-sm text-stone-700 leading-snug">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-stone-100">
            <button
              onClick={onCreateInvite}
              className="w-full py-4 px-6 rounded-full bg-[#2A2018] hover:bg-[#160F0A] text-[#FBF8EE] font-poppins font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Your Invite Website — ₹899</span>
              <ArrowRight className="w-4 h-4 text-[#E0A458]" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure UPI / Card</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Activation</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
