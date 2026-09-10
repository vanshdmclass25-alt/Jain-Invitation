import React from 'react';
import { YearlyPhotoMilestone, TemplateDefinition } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';
import { motion } from 'motion/react';

interface YearlyJourneyTimelineProps {
  milestones?: YearlyPhotoMilestone[];
  template: TemplateDefinition;
  textColor?: string;
  language?: SupportedLanguage;
  onPreviewPhoto?: (url: string) => void;
  className?: string;
}

export const YearlyJourneyTimeline: React.FC<YearlyJourneyTimelineProps> = ({
  milestones = [],
  template,
  language = 'hi',
  textColor,
  onPreviewPhoto,
  className = '',
}) => {
  if (!milestones || milestones.length === 0) return null;
  const colors = template?.colors || ({} as any);
  const appliedTextColor = textColor || colors.text;
  const isDarkBg = ['rajwada', 'divya', 'param', 'mangalam'].includes(template.id);

  return (
    <div className={`w-full py-10 px-4 text-center ${className}`}>
      {/* Section Header */}
      <p className="text-xs font-bold font-hindi uppercase tracking-widest opacity-80 mb-1" style={{ color: colors.accentGold }}>
        {TRANSLATIONS[language]?.memoriesSuperTitle || 'Memories'}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold font-hindi mb-2 tracking-wide" style={{ color: appliedTextColor }}>
        {TRANSLATIONS[language]?.memoriesTitle || 'Darshan from Past Years'}
      </h2>
      <p className="text-xs mb-10 opacity-80 font-hindi" style={{ color: appliedTextColor }}>
        {TRANSLATIONS[language]?.memoriesSubtitle || 'Memories from previous years'}
      </p>

      {/* Grid */}
      <div className="max-w-sm mx-auto grid grid-cols-2 gap-4">
        {milestones.map((item, index) => (
          <motion.div 
            key={item.id || index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => onPreviewPhoto && onPreviewPhoto(item.photoUrl)}
          >
            <div className="w-full bg-white p-2 sm:p-3 rounded-md shadow-lg border border-stone-100 transition-transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:rotate-1">
              <div className="w-full aspect-[4/5] overflow-hidden bg-stone-100 mb-2 sm:mb-3 rounded-sm">
                <img 
                    src={item.photoUrl} 
                    alt={`Darshan ${item.year}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <p className="text-sm font-bold text-stone-800 font-cinzel">
                {item.year}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
