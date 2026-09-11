import React, { useState } from 'react';
import { SereneParticleSystem } from './SereneParticleSystem';
import { InviteOHero } from './InviteOHero';
import { InviteODesigns } from './InviteODesigns';
import { InviteOWhatsAppProof } from './InviteOWhatsAppProof';
import { InviteOHowItWorks } from './InviteOHowItWorks';
import { InviteOTestimonials } from './InviteOTestimonials';
import { InviteOFaq } from './InviteOFaq';
import { InviteOCtaBand } from './InviteOCtaBand';
import { InviteOFooter } from './InviteOFooter';
import { InvitationData, TemplateDefinition, TemplateId } from '../types';
import { LongPreviewModal } from './LongPreviewModal';

interface LandingPageProps {
  data: InvitationData;
  template: TemplateDefinition;
  onExplore: () => void;
  onSelectTemplate: (id: TemplateId) => void;
  onPreviewTemplate: (id: TemplateId) => void;
  onOpenDoorCeremony: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  data,
  template,
  onExplore,
  onSelectTemplate,
  onPreviewTemplate,
  onOpenDoorCeremony,
}) => {
  const [isLongPreviewOpen, setIsLongPreviewOpen] = useState(false);
  const [previewModalTemplateId, setPreviewModalTemplateId] = useState<TemplateId>(template.id);

  const handleShowLongPreview = (tmplId: TemplateId) => {
    setPreviewModalTemplateId(tmplId);
    setIsLongPreviewOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8EE] text-[#2A2018] overflow-x-hidden font-poppins selection:bg-[#E0A458]/30 selection:text-[#2A2018]">
      {/* Subtle, animated ambient particle system across the entire page */}
      <SereneParticleSystem
        variant="ambient"
        density="light"
        colorScheme="gold"
        interactive={true}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      />

      {/* Decorative Top Arch Accent */}
      <div className="relative z-10 w-full max-w-xl mx-auto pt-4 px-4 flex justify-center items-center">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#E0A458]/40 to-transparent" />
        <span className="font-devanagari text-xs tracking-widest text-[#8C5D1F] px-4 font-normal">
          ॥ श्री महावीराय नमः ॥
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#E0A458]/40 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* 1. HERO SECTION WITH INTERACTIVE LONG PHONE PREVIEW & MAHAVIR SWAMI */}
        <InviteOHero
          data={data}
          template={template}
          onCreateInvite={onExplore}
          onSeeRealInvite={onOpenDoorCeremony}
          onOpenDoorCeremony={onOpenDoorCeremony}
        />

        {/* 2. SECTION: SEE THE WHOLE INVITE WEBSITE BEFORE YOU PAY */}
        <InviteODesigns
          selectedTemplateId={template.id}
          onSelectTemplate={(id) => {
            onSelectTemplate(id);
            onExplore();
          }}
          onPreviewTemplate={handleShowLongPreview}
          data={data}
        />

        {/* 3. SECTION: THIS IS WHAT LANDS IN YOUR FAMILY GROUP (WHATSAPP SIMULATOR) */}
        <InviteOWhatsAppProof
          data={data}
          template={template}
          onOpenInvitePreview={() => handleShowLongPreview(template.id)}
        />

        {/* 4. SECTION: THREE STEPS. TWO MINUTES. ZERO PHONE CALLS. */}
        <InviteOHowItWorks />

        {/* 5. SECTION: FAMILIES LOVE THEIR INVITE WEBSITES */}
        <InviteOTestimonials />

        {/* 7. SECTION: FREQUENTLY ASKED QUESTIONS */}
        <InviteOFaq />

        {/* 8. SECTION: READY TO INVITE EVERYONE TO BHAGWAN MAHAVIR SWAMI'S DARSHAN? */}
        <InviteOCtaBand onCreateInvite={onExplore} />

        {/* FOOTER */}
        <InviteOFooter />
      </div>

      {/* DEDICATED FULL LONG PREVIEW MODAL */}
      <LongPreviewModal
        isOpen={isLongPreviewOpen}
        onClose={() => setIsLongPreviewOpen(false)}
        data={data}
        initialTemplateId={previewModalTemplateId}
        onSelectTemplate={(tmplId) => {
          onSelectTemplate(tmplId);
          onExplore();
        }}
      />
    </div>
  );
};
