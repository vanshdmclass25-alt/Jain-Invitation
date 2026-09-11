import React from 'react';
import { Eye } from 'lucide-react';
import { TemplateDefinition } from '../types';
import { JainLotusPrayer, OrnateArchBorder, JainDhyanaSymbol } from '../config/assets';
import { MahavirSwamiImage } from './MahavirSwamiImage';

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
        className="relative pt-6 px-4 pb-8 flex flex-col items-center transition-all" 
        style={{ 
          background: template.id === 'parnaUtsav'
            ? 'radial-gradient(circle at 50% 20%, #7A1927 0%, #4D0C17 60%, #2A040B 100%)'
            : template.id === 'shwet'
            ? 'linear-gradient(180deg, #F5F3EE 0%, #E2DDD3 60%, #D0CAC0 100%)'
            : 'linear-gradient(180deg, #F0F6F2 0%, #E3EFE7 50%, #D4E5DA 100%)'
        }}
      >
        {/* Badge */}
        <div 
          className="absolute top-4 left-4 text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md z-10"
          style={{
            backgroundColor: template.id === 'parnaUtsav' ? '#8B1828' : template.id === 'shwet' ? '#22201D' : '#264A38',
            color: template.id === 'parnaUtsav' ? '#FFF1C5' : template.id === 'shwet' ? '#FFFFFF' : '#F0F9F3',
            border: `1px solid ${template.colors.accentGold}`
          }}
        >
          {template.audienceBadge || template.audienceGroup}
        </div>

        {/* Template-Specific Distinct Frame */}
        <div className="w-36 h-44 mt-4 mb-3 relative drop-shadow-2xl flex flex-col justify-center items-center overflow-hidden rounded-2xl transition-all">
          {/* Background Texture / Accent */}
          {template.id === 'parnaUtsav' && (
            <div className="absolute inset-0 bg-[#3B0710] border-2 border-[#D4AF37] rounded-2xl p-1.5 flex flex-col items-center justify-between">
              <div className="w-full text-center text-[#F5D061] text-[8px] tracking-widest font-bold border-b border-[#D4AF37]/40 pb-0.5">
                ❖ RAJWADA HAVELI ❖
              </div>
              <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-black/40 flex items-center justify-center">
                <MahavirSwamiImage 
                  customImageUrl="/bhagwan-mahavir-pic.png"
                  className="w-full h-full object-contain"
                  showAura={true}
                />
              </div>
              <div className="text-[9px] text-[#F5D061] font-serif font-bold">ROYAL JHAROKHA</div>
            </div>
          )}

          {template.id === 'sukoon' && (
            <div className="absolute inset-0 bg-[#1D3D2E] border-2 border-[#A7C8B4] rounded-2xl p-1.5 flex flex-col items-center justify-between shadow-inner">
              <div className="w-full text-center text-[#E69AB0] text-[8px] tracking-widest font-bold border-b border-[#A7C8B4]/30 pb-0.5 flex items-center justify-center gap-1">
                🌸 SUKOON LOTUS 🌸
              </div>
              <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#A7C8B4]/40 bg-[#183325] flex items-center justify-center">
                <MahavirSwamiImage 
                  customImageUrl="/bhagwan-mahavir-pic.png"
                  className="w-full h-full object-contain"
                  showAura={true}
                />
              </div>
              <div className="text-[9px] text-[#A7C8B4] font-serif font-bold">PISTACHIO SILK</div>
            </div>
          )}

          {template.id === 'shwet' && (
            <div className="absolute inset-0 bg-white border-2 border-[#22201D] rounded-2xl p-1.5 flex flex-col items-center justify-between shadow-md">
              <div className="w-full text-center text-[#22201D] text-[8px] tracking-widest font-bold border-b border-[#B89758]/50 pb-0.5">
                ✧ SHWET MARBLE ✧
              </div>
              <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#B89758]/40 bg-[#FAF8F5] flex items-center justify-center">
                <MahavirSwamiImage 
                  customImageUrl="/bhagwan-mahavir-pic.png"
                  className="w-full h-full object-contain mix-blend-multiply"
                  showAura={false}
                />
              </div>
              <div className="text-[9px] text-[#22201D] font-mono font-bold tracking-tight">PURE AHIMSA</div>
            </div>
          )}
        </div>

        <span className="font-hindi text-[11px] font-bold tracking-wide mb-1 z-10" style={{ color: template.id === 'parnaUtsav' ? '#F5D061' : template.id === 'shwet' ? '#22201D' : '#C29B38' }}>
          ॥ श्री महावीराय नमः ॥
        </span>
        <span className="font-cormorant text-[13px] font-bold z-10" style={{ color: template.id === 'parnaUtsav' ? '#FFF1C5' : template.id === 'shwet' ? '#1F1E1C' : '#183325' }}>
          {template?.name} Edition
        </span>
      </div>

      {/* Bottom Details Section */}
      <div className="p-5 bg-white flex flex-col flex-1 border-t border-stone-100">
        <div className="flex flex-col mb-4">
          <h3 className="font-cormorant text-[1.35rem] font-bold text-[#352516] mb-1">{template?.name}</h3>
          <p className="text-xs text-stone-500 font-sans leading-snug">{template?.tagline}</p>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onPreview) onPreview(template.id);
          }}
          className="w-full mb-3 mt-auto py-2.5 rounded-xl border border-[#D4AF37]/40 text-[#C08B46] bg-[#FAF6EB] hover:bg-[#F3ECCE] text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
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

