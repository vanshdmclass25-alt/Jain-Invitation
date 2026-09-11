import React, { useState } from 'react';
import { Eye, Check, ArrowRight } from 'lucide-react';
import { TEMPLATES } from '../config/templates';
import { TemplateId, InvitationData } from '../types';

interface InviteODesignsProps {
  selectedTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  onPreviewTemplate: (id: TemplateId) => void;
  data: InvitationData;
}

export const InviteODesigns: React.FC<InviteODesignsProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  onPreviewTemplate,
}) => {
  const [selectedLang, setSelectedLang] = useState<'gu' | 'hi' | 'en'>('gu');

  const allTemplatesList = [
    {
      ...TEMPLATES.sukoon,
      badge: TEMPLATES.sukoon.audienceBadge,
      subtitle: TEMPLATES.sukoon.description,
      bgPreview: 'bg-gradient-to-b from-[#EBF3ED] via-[#F8FBF8] to-[#EBF3ED]',
      textColor: 'text-[#183325]',
    },
    {
      ...TEMPLATES.parnaUtsav,
      badge: TEMPLATES.parnaUtsav.audienceBadge,
      subtitle: TEMPLATES.parnaUtsav.description,
      bgPreview: 'bg-gradient-to-b from-[#FFFDF8] via-[#FAF5EA] to-[#F5ECDD]',
      textColor: 'text-[#352516]',
    },
    {
      ...TEMPLATES.shwet,
      badge: TEMPLATES.shwet.audienceBadge,
      subtitle: TEMPLATES.shwet.description,
      bgPreview: 'bg-gradient-to-b from-[#E5E5EB] via-[#FFFFFF] to-[#E5E5EB]',
      textColor: 'text-[#22201D]',
    }
  ];

  return (
    <section id="designs" className="py-16 sm:py-20 bg-[#F5F2EB] border-t border-[#E0A458]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Language Toggle like User screenshot */}
        <div className="flex justify-center mb-8 sm:mb-10 px-2">
          <div className="bg-white rounded-2xl sm:rounded-full p-1.5 flex flex-wrap sm:flex-nowrap items-center justify-center shadow-sm border border-[#E0A458]/20 gap-1 max-w-full">
            <span className="px-2 text-xs sm:text-sm text-stone-600 font-medium whitespace-nowrap">Preview in:</span>
            {(['gu', 'hi', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3.5 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  selectedLang === lang 
                    ? 'bg-[#352516] text-white shadow-md' 
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {lang === 'gu' ? 'ગુજરાતી' : lang === 'hi' ? 'हिंदी' : 'English'}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Designs Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {allTemplatesList.map((tmpl) => {
            const isSelected = selectedTemplateId === tmpl.id;
            
            return (
              <div
                key={tmpl.id}
                className={`bg-[#FAF8F3] p-4 sm:p-5 rounded-3xl transition-all flex flex-col h-full ${
                  isSelected ? 'border-2 border-[#C98A3E] shadow-xl' : 'border border-[#E0A458]/30 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Badge */}
                <div className="flex justify-between items-center mb-4">
                  <div 
                    className="text-[10px] sm:text-xs font-bold tracking-wider px-3.5 py-1 rounded-full uppercase shadow-sm"
                    style={{
                      backgroundColor: tmpl.id === 'parnaUtsav' ? '#8B1828' : tmpl.id === 'shwet' ? '#22201D' : '#264A38',
                      color: tmpl.id === 'parnaUtsav' ? '#FFF1C5' : tmpl.id === 'shwet' ? '#FFFFFF' : '#F0F9F3',
                    }}
                  >
                    {tmpl.badge}
                  </div>
                  <span className="text-xs font-medium text-stone-500 font-serif italic">{tmpl.tagline}</span>
                </div>

                {/* Mockup Container with Distinct Template Themes */}
                <div 
                  className="relative overflow-hidden mb-6 flex flex-col justify-center items-center h-[260px] sm:h-[300px] rounded-2xl p-4 transition-all"
                  style={{
                    background: tmpl.id === 'parnaUtsav' 
                      ? 'radial-gradient(circle at 50% 20%, #7A1927 0%, #4D0C17 60%, #2A040B 100%)'
                      : tmpl.id === 'shwet'
                      ? 'linear-gradient(180deg, #F5F3EE 0%, #E2DDD3 60%, #D0CAC0 100%)'
                      : 'linear-gradient(180deg, #F0F6F2 0%, #E3EFE7 50%, #D4E5DA 100%)'
                  }}
                >
                  {/* Pārna Utsav: Rajwada Sandstone & Royal Jharokha */}
                  {tmpl.id === 'parnaUtsav' && (
                    <div className="relative z-10 flex flex-col items-center w-full max-w-[220px] bg-[#3B0710]/90 border-2 border-[#D4AF37] rounded-2xl p-3 shadow-2xl">
                      <div className="text-[9px] font-bold text-[#F5D061] tracking-widest uppercase mb-2 border-b border-[#D4AF37]/40 pb-1 w-full text-center">
                        ❖ RAJWADA JHAROKHA ARCH ❖
                      </div>
                      <div className="w-28 sm:w-36 h-32 sm:h-38 rounded-xl border-2 border-[#D4AF37]/60 overflow-hidden bg-black/40 flex items-center justify-center p-1.5 shadow-inner">
                        <img 
                          src="/bhagwan-mahavir-pic.png" 
                          alt="Mahavir Swami" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-hindi text-xs font-bold text-[#F5D061] mt-2 block">॥ श्री महावीराय नमः ॥</span>
                      <span className="text-[10px] text-[#FFF1C5] font-serif tracking-wider">SANDSTONE & KUMKUM</span>
                    </div>
                  )}

                  {/* Sukoon: Pistachio Silk & Lotus Garden */}
                  {tmpl.id === 'sukoon' && (
                    <div className="relative z-10 flex flex-col items-center w-full max-w-[220px] bg-[#1D3D2E]/90 border-2 border-[#A7C8B4] rounded-2xl p-3 shadow-2xl">
                      <div className="text-[9px] font-bold text-[#E69AB0] tracking-widest uppercase mb-2 border-b border-[#A7C8B4]/40 pb-1 w-full text-center flex items-center justify-center gap-1">
                        🌸 PISTACHIO & LOTUS ARCH 🌸
                      </div>
                      <div className="w-28 sm:w-36 h-32 sm:h-38 rounded-xl border-2 border-[#A7C8B4]/60 overflow-hidden bg-[#183325] flex items-center justify-center p-1.5 shadow-inner">
                        <img 
                          src="/bhagwan-mahavir-pic.png" 
                          alt="Mahavir Swami" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-hindi text-xs font-bold text-[#C29B38] mt-2 block">॥ श्री महावीराय नमः ॥</span>
                      <span className="text-[10px] text-[#A7C8B4] font-serif tracking-wider">PISTACHIO & CHANDAN</span>
                    </div>
                  )}

                  {/* Shwet: Pure Makrana White Marble & Ahimsa */}
                  {tmpl.id === 'shwet' && (
                    <div className="relative z-10 flex flex-col items-center w-full max-w-[220px] bg-white border-2 border-[#22201D] rounded-2xl p-3 shadow-2xl">
                      <div className="text-[9px] font-bold text-[#22201D] tracking-widest uppercase mb-2 border-b border-[#B89758]/50 pb-1 w-full text-center">
                        ✧ MAKRANA MARBLE ARCH ✧
                      </div>
                      <div className="w-28 sm:w-36 h-32 sm:h-38 rounded-xl border-2 border-[#B89758]/50 overflow-hidden bg-[#FAF8F5] flex items-center justify-center p-1.5 shadow-inner">
                        <img 
                          src="/bhagwan-mahavir-pic.png" 
                          alt="Mahavir Swami" 
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <span className="font-hindi text-xs font-bold text-[#1F1E1C] mt-2 block">॥ श्री महावीराय नमः ॥</span>
                      <span className="text-[10px] text-[#615E58] font-mono tracking-wider">PURE WHITE AHIMSA</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="px-1 mb-6 flex-1 flex flex-col bg-white p-4 rounded-b-2xl -mt-10 pt-8 border-t-0">
                  <div className="flex flex-col w-full mb-4">
                    <h3 className="text-2xl font-bold text-[#352516] font-cormorant">{tmpl?.name}</h3>
                    <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">{tmpl.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 mt-auto">
                    <button
                      onClick={() => onPreviewTemplate(tmpl.id)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#E0A458]/40 text-[#352516] font-semibold bg-[#FAF8F3] hover:bg-[#F4EEDD] transition-colors group"
                    >
                      <Eye className="w-4 h-4 text-[#C98A3E] group-hover:scale-110 transition-transform" />
                      Preview Live Website
                    </button>

                    <button
                      onClick={() => onSelectTemplate(tmpl.id)}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold transition-all ${
                        isSelected 
                          ? 'bg-[#2A2018] text-[#FBF8EE] shadow-md' 
                          : 'bg-[#C98A3E] hover:bg-[#B37A36] text-white shadow-md'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4 text-[#E0A458]" />
                          Selected Theme
                        </>
                      ) : (
                        <>
                          Select & Customize
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
