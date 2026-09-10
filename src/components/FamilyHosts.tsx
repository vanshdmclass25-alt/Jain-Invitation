import React from 'react';
import { TemplateDefinition } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';
import { motion } from 'motion/react';

interface FamilyHostsProps {
  photos: string[];
  hostNames?: string;
  template: TemplateDefinition;
  textColor?: string;
  language?: SupportedLanguage;
}

export const FamilyHosts: React.FC<FamilyHostsProps> = ({
  photos = [],
  hostNames,
  template,
  language = 'hi',
  textColor
}) => {
  if (!photos || photos.length === 0) return null;
  const colors = template?.colors || ({} as any);
  const appliedTextColor = textColor || colors.text;
  const isDarkBg = ['rajwada', 'divya', 'param', 'mangalam'].includes(template.id);
  
  // Try to parse names from hostNames if it's a comma separated string, otherwise fallback.
  const names = hostNames ? hostNames.split(',').map(n => n.trim()) : ['राजेश पाटीदार', 'मीरा पाटीदार', 'आरव पाटीदार', 'अनन्या पाटीदार'];

  return (
    <div className="w-full py-8 px-4 text-center">
      {/* Title */}
      <h3 className="text-sm font-bold font-hindi mb-2 tracking-widest uppercase opacity-90" style={{ color: colors.accentGold }}>
        ॥ {TRANSLATIONS[language]?.familyHostsSuperTitle || 'Cordially Invited By'} ॥
      </h3>
      
      <div 
        className="inline-block px-8 py-2.5 rounded-full shadow-md border mb-10"
        style={{ 
          backgroundColor: `${colors.accentGold}15`, 
          borderColor: `${colors.accentGold}40`,
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold font-hindi tracking-wide" style={{ color: appliedTextColor }}>
            {TRANSLATIONS[language]?.familyHostsTitle || 'Warm Invitation'}
        </h2>
      </div>

      {/* Vertical list of hosts */}
      <div className="max-w-xs mx-auto flex flex-col gap-8">
        {photos.map((photo, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div 
              className="w-full aspect-[3/4] rounded-[2rem] overflow-hidden p-2 shadow-2xl mb-4"
              style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  border: `1px solid ${colors.accentGold}50` 
              }}
            >
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-stone-100">
                <img 
                    src={photo} 
                    alt={`Family member ${index + 1}`} 
                    className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h4 className="text-xl font-bold font-hindi" style={{ color: appliedTextColor }}>
                {names[index] || names[0]}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
