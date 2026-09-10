import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, Filter } from 'lucide-react';
import { TEMPLATES } from '../config/templates';
import { TemplateId, AudienceGroup } from '../types';
import { TemplateCard } from './TemplateCard';
import { GoldDivider } from '../config/assets';

interface TemplateGalleryProps {
  selectedTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  selectedTemplateId,
  onSelectTemplate,
}) => {
  const [activeAudienceFilter, setActiveAudienceFilter] = useState<'all' | AudienceGroup>('all');
  const allTemplates = Object.values(TEMPLATES);

  const filteredTemplates = activeAudienceFilter === 'all'
    ? allTemplates
    : allTemplates.filter((t) => t.audienceGroup === activeAudienceFilter);

  return (
    <section id="templates-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E0A458]/40 text-[#C08B46] text-[10px] font-bold tracking-widest uppercase mb-4">
          <span>SACRED TEMPLATES</span>
        </div>
        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#352516] tracking-tight mb-4 leading-tight">
          See the whole invite website before you pay
        </h2>
        <p className="text-stone-600 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto">
          Real screens from the live invite websites — not static mockups. Tap any card to test a working invite with Bhagwan Mahavir Swami darshan yourself.
        </p>

        {/* Language Preview Tabs */}
        <div className="inline-flex items-center gap-4 bg-white px-5 py-2 rounded-full border border-stone-200/80 shadow-sm mt-8">
          <span className="text-stone-500 text-[11px] font-medium">Preview in:</span>
          {[
            { id: 'gu', label: 'ગુજરાતી' },
            { id: 'hi', label: 'हिंदी' },
            { id: 'en', label: 'English' },
          ].map((tab) => {
            const isCurrent = tab.id === 'gu';
            return (
              <button
                key={tab.id}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#301E13] text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>


      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
        {filteredTemplates.map((tmpl) => (
          <TemplateCard
            key={tmpl.id}
            template={tmpl}
            isSelected={selectedTemplateId === tmpl.id}
            onSelect={onSelectTemplate}
          />
        ))}
      </div>

      {/* Subtle reassurance note */}
      <div className="mt-12 text-center text-xs text-stone-500 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
        <span>You can switch templates at any time without losing any entered details.</span>
      </div>
    </section>
  );
};
