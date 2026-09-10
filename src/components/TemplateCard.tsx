import React from 'react';
import { Eye } from 'lucide-react';
import { TemplateDefinition } from '../types';
import { JainLotusPrayer, OrnateArchBorder, JainDhyanaSymbol } from '../config/assets';

interface TemplateCardProps {
  template: TemplateDefinition;
  isSelected: boolean;
  onSelect: (templateId: TemplateDefinition['id']) => void;
  onPreview?: (templateId: TemplateDefinition['id']) => void;
}


export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onPreview,
}) => {
  return (
    <div
      className={`bg-white rounded-[1.5rem] overflow-hidden transition-all flex flex-col h-full ${
        isSelected ? 'border-2 border-[#C08B46] shadow-xl' : 'border border-stone-200 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top Image Section */}
      <div 
        className="relative pt-6 px-4 pb-8 flex flex-col items-center" 
        style={{ 
          background: `linear-gradient(to bottom, ${template?.colors.bg || '#F0F5F1'} 0%, white 100%)` 
        }}
      >
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-[#301E13] text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm z-10">
          {template.audienceBadge || template.audienceGroup}
        </div>

        {/* Idol Image Placeholder */}
        <div className="w-36 h-40 mt-4 mb-4 relative drop-shadow-2xl flex justify-center items-center overflow-hidden rounded-md border border-[#D4AF37]/20 shadow-inner">
          <img 
            src="/bhagwan-mahavir-pic.png" 
            className="w-full h-full object-cover" 
            alt="Mahavir Swami" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>

        <span className="font-hindi text-[11px] font-bold text-[#C08B46] tracking-wide mb-1 z-10">
          ॥ श्री महावीराय नमः ॥
        </span>
        <span className="font-cormorant text-[13px] font-bold text-[#352516] z-10">
          {template?.name} Edition
        </span>
      </div>

      {/* Bottom Details Section */}
      <div className="p-5 bg-white flex flex-col flex-1 border-t border-stone-100">
        <div className="flex justify-between items-center mb-5 mt-auto">
          <h3 className="font-cormorant text-[1.35rem] font-bold text-[#352516]">{template?.name}</h3>
          <span className="text-[#C08B46] font-bold text-sm">₹899</span>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onPreview) onPreview(template.id);
          }}
          className="w-full mb-3 py-2.5 rounded-xl border border-[#D4AF37]/40 text-[#C08B46] bg-[#FAF6EB] hover:bg-[#F3ECCE] text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5" /> Preview Live Website
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template.id);
          }}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
            isSelected 
            ? 'bg-[#301E13] text-white' 
            : 'bg-[#C08B46] text-white hover:bg-[#A8793A]'
          }`}
        >
          {isSelected ? '✓ Selected Theme' : 'Select & Customize →'}
        </button>
      </div>
    </div>
  );
};

