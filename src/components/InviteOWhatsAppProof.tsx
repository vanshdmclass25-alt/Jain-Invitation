import React, { useState } from 'react';
import { Share2, Copy, Check, ExternalLink, MessageCircle, Heart } from 'lucide-react';
import { InvitationData, TemplateDefinition } from '../types';
import { MahavirSwamiImage } from './MahavirSwamiImage';

interface InviteOWhatsAppProofProps {
  data: InvitationData;
  template: TemplateDefinition;
  onOpenInvitePreview: () => void;
}

export const InviteOWhatsAppProof: React.FC<InviteOWhatsAppProofProps> = ({
  data,
  template,
  onOpenInvitePreview,
}) => {
  const [copied, setCopied] = useState(false);

  const formattedShareText = `🙏 *जय जिनेन्द्र | JAI JINENDRA* 🙏

With the divine grace and blessings of *Bhagwan Mahavir Swami*, we cordially invite you and your family to the auspicious *Tapasya Pārna Mahotsav* of our beloved:

⭐ *${(data.name || 'tapasvi').toUpperCase()}*
✨ *${data.tapasyaType}*

📅 *Date:* ${data.date || 'Sunday, 18th October 2026'}
⏰ *Muhurat:* ${data.time || '8:30 AM onwards'}
📍 *Venue:* ${data.location || 'Shree Parshwanath Jain Derasar'}

✨ *Touch the link below to view the sacred interactive invitation website:*
👉 https://is.gd/parna-${encodeURIComponent((data.name || 'tapasvi').toLowerCase().replace(/\s+/g, ''))}

_Blessings & Pranam:_
*${data.hostNames || 'Shah Parivar and Family'}*`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedShareText)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="whatsapp" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF8EE] to-[#FFFBF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest border border-emerald-200 mb-3">
            WhatsApp Delivery
          </span>

          <h2 className="font-poppins text-2xl sm:text-4xl font-bold text-[#2A2018] tracking-tight mb-3">
            This is what lands in your family group
          </h2>

          <p className="text-[#5C4E42] text-sm sm:text-base leading-relaxed">
            One link, one message. It opens instantly on any phone — no app, no login, nothing to download. Older family members can simply tap and walk through.
          </p>
        </div>

        {/* WhatsApp Phone Mockup Container */}
        <div className="max-w-md mx-auto">
          {/* Simulated WhatsApp Phone Screen */}
          <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-stone-800 bg-[#EFEAE2]">
            
            {/* WhatsApp Green App Header */}
            <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-sm text-emerald-100 border border-emerald-600">
                  शाह
                </div>
                <div>
                  <h4 className="font-poppins text-xs sm:text-sm font-semibold flex items-center gap-1 leading-tight">
                    <span>Shah Parivar Group</span>
                    <Heart className="w-3 h-3 fill-red-400 text-red-400 inline" />
                  </h4>
                  <p className="text-[10px] text-emerald-100/90 leading-none">
                    Kishore, Hansa, Bhavin, Sneha, +34 others
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-emerald-100 text-xs font-medium">
                <span>WhatsApp</span>
              </div>
            </div>

            {/* Chat Body Canvas with WhatsApp Pattern */}
            <div className="p-4 space-y-3 min-h-[460px] flex flex-col justify-end">
              
              {/* Date Badge */}
              <div className="text-center my-1">
                <span className="px-2.5 py-0.5 rounded-md bg-white/80 text-[10px] text-stone-500 font-semibold shadow-2xs">
                  TODAY
                </span>
              </div>

              {/* Introductory Chat Bubble */}
              <div className="bg-white rounded-lg rounded-tl-none p-2.5 max-w-[85%] shadow-xs text-xs text-stone-800">
                <p className="leading-relaxed">
                  ॥ जय जिनेन्द्र ॥ Sending our daughter's Tapasya Pārna invitation website to everyone in the family 🙏
                </p>
                <div className="text-[9px] text-stone-400 text-right mt-1 flex items-center justify-end gap-1">
                  <span>10:42 AM</span>
                  <span className="text-emerald-500">✓✓</span>
                </div>
              </div>

              {/* RICH LINK PREVIEW CARD (THE CORE INNOVATION) */}
              <div className="bg-white rounded-lg rounded-tl-none p-1.5 shadow-sm border border-stone-200/80 max-w-[95%]">
                {/* Clickable Rich Link Preview Box */}
                <div 
                  onClick={onOpenInvitePreview}
                  className="bg-[#F8F6F0] rounded-md overflow-hidden border border-stone-200 cursor-pointer group hover:bg-[#F3ECCE] transition"
                >
                  {/* Rich Thumbnail with Bhagwan Mahavir Swami & Tapasvi */}
                  <div className="relative h-44 bg-gradient-to-tr from-[#FAF4E6] via-[#FFFBF2] to-[#FAF4E6] p-3 flex items-center justify-around overflow-hidden border-b border-stone-200">
                    {/* Bhagwan Mahavir Swami Figure */}
                    <div className="text-center">
                      <MahavirSwamiImage
                        customImageUrl={data.mahavirSwamiImage}
                        className="w-24 h-28 drop-shadow-sm"
                        showAura={false}
                      />
                      <span className="font-devanagari text-[9px] text-[#8C5D1F] font-bold block mt-0.5">
                        ॥ श्री महावीराय नमः ॥
                      </span>
                    </div>

                    {/* Tapasvi Portrait */}
                    <div className="text-center">
                      <div className="w-16 h-20 rounded-t-2xl rounded-b-md overflow-hidden border border-[#C98A3E] shadow-xs bg-stone-100 mx-auto">
                        <img
                          src={data.profileImage}
                          alt={data.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="font-poppins text-[9px] font-bold text-[#2A2018] block mt-1">
                        {data.name || 'Tapasvi'}
                      </span>
                    </div>
                  </div>

                  {/* Link Meta Details */}
                  <div className="p-2.5">
                    <span className="text-[10px] text-stone-400 font-mono block">
                      tattva.co.in/parna/{((data.name || 'tapasvi').toLowerCase()).replace(/\s+/g, '-')}
                    </span>
                    <h5 className="font-poppins text-xs font-bold text-[#2A2018] leading-snug mt-0.5 group-hover:text-[#C98A3E] transition">
                      🙏 Tapasya Pārna Mahotsav | {data.name}
                    </h5>
                    <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-snug">
                      With divine blessings of Bhagwan Mahavir Swami, join us for {data.tapasyaType}. Touch to open the interactive invitation website.
                    </p>
                  </div>
                </div>

                {/* Accompanying Message with Auspicious Timings & Venue */}
                <div className="px-2 pt-2 pb-1 text-[11px] text-stone-700 space-y-1">
                  <p>✨ <strong>Date:</strong> {data.date || 'Sunday, 18 Oct 2026'}</p>
                  <p>⏰ <strong>Pārna Vidhi:</strong> {data.time || '8:30 AM onwards'}</p>
                  <p>📍 <strong>Venue:</strong> {data.location || 'Shree Parshwanath Jain Derasar'}</p>
                </div>

                <div className="text-[9px] text-stone-400 text-right pr-1 pb-0.5 flex items-center justify-end gap-1">
                  <span>10:43 AM</span>
                  <span className="text-emerald-500">✓✓</span>
                </div>
              </div>

            </div>

          </div>

          {/* WhatsApp Interactive Actions */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-poppins font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-white hover:bg-stone-100 text-[#2A2018] font-poppins font-semibold text-xs sm:text-sm border border-stone-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#C98A3E]" />
                  <span>Copy Message Text</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
