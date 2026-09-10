import React from 'react';
import { TemplateDefinition, EventSchedule } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';
import { Sparkles, Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface EventScheduleTimelineProps {
  events?: EventSchedule[];
  template: TemplateDefinition;
  textColor?: string;
  language?: SupportedLanguage;
}

export const EventScheduleTimeline: React.FC<EventScheduleTimelineProps> = ({
  events = [],
  template,
  language = 'hi',
  textColor
}) => {
  if (!events || events.length === 0) return null;
  const colors = template?.colors || ({} as any);
  const appliedTextColor = textColor || colors.text;
  const isDarkBg = ['parnaUtsav', 'divya', 'param', 'mangalam'].includes(template.id);
  const isDark = template.id === 'divya' || template.id === 'param';

  return (
    <div className="w-full py-8 text-center relative overflow-hidden">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold font-hindi mb-12 tracking-wide z-10 relative" style={{ color: appliedTextColor }}>
        {TRANSLATIONS[language]?.eventScheduleTitle || 'Utsav Ka Mangal Pravas'}
      </h2>

      {/* Timeline Container */}
      <div className="relative max-w-sm mx-auto px-4 z-10">
        {/* Center Vertical Line */}
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" 
          style={{ backgroundColor: colors.accentGold, opacity: 0.5 }}
        />

        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div 
              key={event.id || index}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center justify-between mb-8 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Spacer for empty side */}
              <div className="w-1/2" />
              
              {/* Center Dot */}
              <div 
                className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 z-20 border-2"
                style={{ backgroundColor: colors.bg, borderColor: colors.accentGold }}
              />

              {/* Horizontal Connector Line */}
              <div 
                className={`absolute top-1/2 w-[10%] h-[1px] z-10 ${isLeft ? 'right-[40%]' : 'left-[40%]'}`}
                style={{ backgroundColor: colors.accentGold, opacity: 0.5 }}
              />

              {/* Card */}
              <div className={`w-[45%] ${isLeft ? 'pr-4 text-right' : 'pl-4 text-left'}`}>
                <div 
                  className="rounded-xl p-4 shadow-lg border relative overflow-hidden flex flex-col items-center text-center backdrop-blur-sm"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderColor: `${colors.border}40`,
                  }}
                >
                  <div className="w-10 h-10 mb-2 rounded-full border flex items-center justify-center shadow-inner" style={{ backgroundColor: `${colors.accentGold}15`, borderColor: `${colors.accentGold}30` }}>
                    <Sparkles className="w-5 h-5" style={{ color: colors.accentGold }} />
                  </div>
                  
                  <h3 className="font-hindi text-sm sm:text-base font-bold mb-1.5" style={{ color: colors.text }}>
                    {event.title}
                  </h3>
                  
                  <p className="text-[10px] sm:text-xs mb-0.5 opacity-80" style={{ color: colors.text }}>
                    {event.date}
                  </p>
                  <p className="text-[10px] sm:text-xs font-semibold" style={{ color: colors.text }}>
                      {event.time}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
