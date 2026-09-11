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
  const validPhotos = (photos || []).filter(p => typeof p === 'string' && p.trim() !== '');
  if (validPhotos.length === 0) return null;

  const colors = template?.colors || ({} as any);
  const appliedTextColor = textColor || colors.text;
  const isDarkBg = ['parnaUtsav', 'divya', 'param', 'mangalam'].includes(template.id);
  const displayHostNames = hostNames?.trim() || 'Kamlesh & Hansa Shah and Family';

  return (
    <div className="w-full py-6 px-3 sm:px-4 text-center">
      {/* Title */}
      <h3 className="text-xs sm:text-sm font-bold font-hindi mb-2 tracking-widest uppercase opacity-90" style={{ color: colors.accentGold || '#C98A3E' }}>
        ॥ {TRANSLATIONS[language]?.familyHostsSuperTitle || 'Cordially Invited By'} ॥
      </h3>
      
      <div 
        className="inline-block px-6 sm:px-8 py-2 rounded-full shadow-sm border mb-6"
        style={{ 
          backgroundColor: `${colors.accentGold || '#C98A3E'}15`, 
          borderColor: `${colors.accentGold || '#C98A3E'}40`,
        }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-hindi tracking-wide" style={{ color: appliedTextColor }}>
            {TRANSLATIONS[language]?.familyHostsTitle || 'Warm Invitation'}
        </h2>
      </div>

      {/* Responsive Family Photos Container */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        {validPhotos.length === 1 ? (
          /* Single Family Portrait (Wide/Adaptive) */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div 
              className="w-full rounded-2xl sm:rounded-3xl overflow-hidden p-1.5 sm:p-2 shadow-lg border mb-3.5 transition-transform hover:scale-[1.01]"
              style={{ 
                backgroundColor: isDarkBg ? 'rgba(0, 0, 0, 0.25)' : '#FFFFFF',
                borderColor: `${colors.accentGold || '#C98A3E'}60` 
              }}
            >
              <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-50">
                <img 
                  src={validPhotos[0]} 
                  alt="Family Portrait" 
                  className="w-full h-auto max-h-[450px] object-cover rounded-xl sm:rounded-2xl block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <h4 className="text-lg sm:text-xl font-bold font-hindi max-w-xs sm:max-w-md leading-snug" style={{ color: appliedTextColor }}>
              {displayHostNames}
            </h4>
          </motion.div>
        ) : (
          /* Multiple Family Member Photos Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {validPhotos.map((photo, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div 
                  className="w-full rounded-2xl overflow-hidden p-2 shadow-lg border mb-2"
                  style={{ 
                    backgroundColor: isDarkBg ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.7)',
                    borderColor: `${colors.accentGold || '#C98A3E'}50` 
                  }}
                >
                  <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-stone-100">
                    <img 
                      src={photo} 
                      alt={`Family member ${index + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
