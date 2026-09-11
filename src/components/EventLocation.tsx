import React from 'react';
import { TemplateDefinition } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';
import { MapPin, Map, ExternalLink, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface EventLocationProps {
  location: string;
  mapsUrl: string;
  template: TemplateDefinition;
  textColor?: string;
  language?: SupportedLanguage;
}

export const EventLocation: React.FC<EventLocationProps> = React.memo(({
  location,
  mapsUrl,
  template,
  language = 'hi',
  textColor
}) => {
  if (!location) return null;
  const colors = template?.colors || ({} as any);
  const appliedTextColor = textColor || colors.text;
  const isDarkBg = ['parnaUtsav', 'divya', 'param', 'mangalam'].includes(template.id);
  const isDark = template.id === 'divya' || template.id === 'param';

  return (
    <div className="w-full py-8 px-4 text-center">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold font-hindi mb-2 tracking-wide" style={{ color: appliedTextColor }}>
        {TRANSLATIONS[language]?.eventLocationTitle || 'Event Venue'}
      </h2>
      <p className="text-xs mb-6 opacity-80" style={{ color: appliedTextColor }}>
        {TRANSLATIONS[language]?.eventLocationSubtitle || 'Welcome to seek blessings'}
      </p>

      {/* Map Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border"
        style={{ 
          backgroundColor: colors.cardBg,
          borderColor: `${colors.border}40`,
        }}
      >
        {/* Fake Map Image / Iframe Placeholder (since real iframe might block scrolls, we use a static style) */}
        <div className="w-full h-48 bg-stone-200 relative overflow-hidden flex items-center justify-center">
            {/* If we had a real maps embed we'd put it here, for now a styled placeholder or just use actual iframe if we can */}
            <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>

        {/* Info Area */}
        <div className="p-6 text-center rounded-t-[2rem] -mt-6 relative z-10"
            style={{ 
                backgroundColor: colors.primary, // Very dark blue like video
                color: '#F8FAFC'
            }}
        >
          <h3 className="text-xl sm:text-2xl font-bold font-hindi mb-2 text-[#E2E8F0]">
            {location.split(',')[0]}
          </h3>
          <p className="text-xs sm:text-sm opacity-90 mb-6 leading-relaxed font-hindi">
            {location}
          </p>

          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full text-sm font-bold font-hindi shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
            }}
          >
            <Map className="w-4 h-4" />
            {TRANSLATIONS[language]?.openMapsBtn || 'Open Map'}
          </a>
        </div>
      </motion.div>
    </div>
  );
});
