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
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-full p-1.5 flex items-center shadow-sm border border-[#E0A458]/20 gap-1">
            <span className="px-3 text-sm text-stone-600 font-medium mr-1">Preview in:</span>
            {(['gu', 'hi', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all ${
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
                <div className="flex justify-start items-start mb-4">
                  <div className="bg-[#352516] text-white text-[10px] sm:text-xs font-bold tracking-wider px-3 py-1 rounded-full uppercase">
                    {tmpl.badge}
                  </div>
                </div>

                {/* Mockup Container */}
                <div className="relative overflow-hidden mb-6 flex flex-col justify-center items-center h-[260px] sm:h-[300px]">
                  <div className={`absolute inset-0 ${tmpl.bgPreview} opacity-50 rounded-2xl`} />
                  
                  {/* Idol Image based on template */}
                  <div className="relative z-10 flex flex-col items-center mt-6">
                    <div className="w-32 sm:w-40 h-36 sm:h-44 shadow-2xl border border-[#D4AF37]/30 bg-white">
                      <img 
                        src="/bhagwan-mahavir-pic.png" 
                        alt="Mahavir Swami" 
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <span className="font-hindi text-sm font-bold text-[#C08B46] block mb-1">॥ श्री महावीराय नमः ॥</span>
                      <h3 className="font-cormorant text-xl font-bold text-[#352516]">{tmpl?.name} Edition</h3>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="px-1 mb-6 flex-1 flex flex-col bg-white p-4 rounded-b-2xl -mt-10 pt-8 border-t-0">
                  <div className="flex w-full justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-[#352516] font-cormorant">{tmpl?.name}</h3>
                    <div className="text-lg font-bold text-[#C98A3E]">₹899</div>
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
