import React from 'react';
import { TemplateDefinition } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';
import { CalendarDays, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface MangalMuhuratProps {
  date: string;
  time: string;
  location: string;
  mapsUrl: string;
  template: TemplateDefinition;
  textColor?: string;
  language?: SupportedLanguage;
}

export const MangalMuhurat: React.FC<MangalMuhuratProps> = ({
  date,
  time,
  location,
  mapsUrl,
  template,
  language = 'hi',
  textColor
}) => {
  const colors = template?.colors || ({} as any);
  const appliedTextColor = textColor || colors.text;
  const isDarkBg = ['parnaUtsav', 'divya', 'param', 'mangalam'].includes(template.id);
  const isDark = template.id === 'divya' || template.id === 'param';

  return (
    <div className="w-full py-8 px-4 text-center">
      {/* Title */}
      <div className="flex items-center justify-center mb-2">
        <div className="h-[1px] w-12" style={{ backgroundColor: colors.accentGold }} />
        <span className="mx-2">
           <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L14.5 4.5L19.5 5.5L15.5 9L16.5 12L12 10.5L7.5 12L8.5 9L4.5 5.5L9.5 4.5L12 0Z" fill={colors.accentGold}/>
           </svg>
        </span>
        <div className="h-[1px] w-12" style={{ backgroundColor: colors.accentGold }} />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold font-hindi mb-2 tracking-wide" style={{ color: appliedTextColor }}>
        {TRANSLATIONS[language]?.mangalMuhuratTitle || 'Mangal Muhurat'}
      </h2>
      <p className="text-xs mb-8 opacity-80" style={{ color: appliedTextColor }}>
        {TRANSLATIONS[language]?.mangalMuhuratSubtitle || 'Auspicious timing - Save the date'}
      </p>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-xs mx-auto rounded-[2rem] p-6 shadow-2xl relative overflow-hidden"
        style={{ 
          backgroundColor: colors.primary, // Deep navy/slate
          color: colors.secondary,
        }}
      >
        <div className="relative z-10 flex flex-col items-center">
            <p className="text-xs mb-2 opacity-80 font-hindi">{TRANSLATIONS[language]?.mangalMuhuratDay || 'Monday'}</p>
            <h3 className="text-3xl font-bold font-hindi mb-1 tracking-wider" style={{ color: colors.accentGold }}>
                {date || '14 सितंबर 2026'}
            </h3>
            <p className="text-sm font-semibold mb-6">सुबह {time || '10:00'} बजे</p>
            
            <p className="text-[11px] leading-relaxed opacity-90 text-center font-hindi max-w-[85%]">
                {location}
            </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="max-w-xs mx-auto mt-6 space-y-3">
        <a 
            href="#" 
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full text-sm font-bold shadow-md transition-transform hover:scale-105 active:scale-95 border bg-white/10 backdrop-blur-md"
            style={{ 
                color: appliedTextColor,
                borderColor: `${colors.border}60`,
            }}
        >
            <CalendarDays className="w-4 h-4 text-rose-500" />
            {TRANSLATIONS[language]?.mangalMuhuratBtnCal || 'Add to Calendar'}
        </a>
        <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full text-sm font-bold shadow-md transition-transform hover:scale-105 active:scale-95 border bg-white/10 backdrop-blur-md"
            style={{ 
                color: appliedTextColor,
                borderColor: `${colors.border}60`,
            }}
        >
            <MapPin className="w-4 h-4 text-rose-500" />
            {TRANSLATIONS[language]?.mangalMuhuratBtnDir || 'Get Directions'}
        </a>
      </div>
    </div>
  );
};
