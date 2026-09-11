import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Sparkles, Check, ArrowRight, Volume2, VolumeX, Eye } from 'lucide-react';
import { InvitationData, TemplateDefinition, TemplateId } from '../types';
import { TEMPLATES } from '../config/templates';
import { LongInvitePreview } from './LongInvitePreview';
import { spiritualAudio } from '../utils/audio';

interface LongPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  initialTemplateId?: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

export const LongPreviewModal: React.FC<LongPreviewModalProps> = ({
  isOpen,
  onClose,
  data,
  initialTemplateId = 'sukoon',
  onSelectTemplate,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>(initialTemplateId);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sync initial template when modal opens
  React.useEffect(() => {
    if (initialTemplateId) {
      setSelectedTemplateId(initialTemplateId);
    }
  }, [initialTemplateId, isOpen]);

  const toggleAudio = () => {
    const active = spiritualAudio.toggle();
    setIsPlayingAudio(active);
  };

  const currentTemplate: TemplateDefinition = TEMPLATES[selectedTemplateId] || TEMPLATES.sukoon;

  const handleSelectAndProceed = () => {
    onSelectTemplate(selectedTemplateId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-[#191410] text-[#FAF8EE] rounded-3xl border border-[#3D3024] shadow-2xl overflow-hidden flex flex-col max-h-[96vh]"
        >
          {/* TOP HEADER BAR */}
          <div className="px-4 sm:px-6 py-3.5 border-b border-[#3D3024] bg-[#221B14] flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#D4AF37]/60 shadow-xs">
                <img src="/logo.png" alt="Tattva" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#FBF8EE] tracking-tight">
                    Tattva Live Website Preview
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3D3024] text-[#E0A458] border border-[#E0A458]/30">
                    ₹499 Full Access
                  </span>
                </div>
                <p className="text-[11px] text-[#A69989]">
                  Continuous scrollable website guests receive on WhatsApp
                </p>
              </div>
            </div>

            {/* ACTION CONTROLS */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAndProceed}
                id="select-preview-template-btn"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#C98A3E] hover:bg-[#B3792E] text-white shadow-md transition cursor-pointer"
              >
                <span>Customize This Design</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#33271D] hover:bg-[#443427] text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* THEME PICKER TAB BAR */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#1C1610] border-b border-[#3D3024] flex items-center justify-between gap-2 overflow-x-auto shrink-0 no-scrollbar">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#A69989] shrink-0 font-cinzel">
                Theme:
              </span>
              <div className="flex items-center gap-1.5">
                {(['aura', 'param', 'mangalam', 'sukoon', 'parnaUtsav', 'shwet', 'divya'] as TemplateId[]).map((tmplId) => {
                  const tmpl = TEMPLATES[tmplId];
                  const isCurrent = selectedTemplateId === tmplId;
                  return (
                    <button
                      key={tmplId}
                      type="button"
                      onClick={() => setSelectedTemplateId(tmplId)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#C98A3E] text-white font-bold shadow-xs'
                          : 'bg-[#2A2018] text-[#C4B7A6] hover:text-white hover:bg-[#382C22]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/30"
                        style={{ backgroundColor: tmpl?.colors.primary }}
                      />
                      <span>{tmpl?.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              className="flex items-center gap-1.5 text-xs text-[#E0A458] bg-[#2A2018] hover:bg-[#382C22] px-3 py-1 rounded-lg border border-[#E0A458]/30 transition shrink-0 cursor-pointer"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#E0A458]" />
                  <span>Stotra Audio Playing</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Test Background Stotra</span>
                </>
              )}
            </button>
          </div>

          {/* MODAL MAIN CONTENT BODY */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center justify-center">
            
            {/* LEFT / DESKTOP SIDEBAR: KEY HIGHLIGHTS */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-3 text-left">
              <div className="bg-[#241C15] rounded-2xl p-4 border border-[#3D3024]">
                <div className="flex items-center gap-2 mb-2 text-[#E0A458]">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">
                    Full Webpage Experience
                  </h4>
                </div>
                <p className="text-xs text-[#C4B7A6] leading-relaxed">
                  Guests open this exact high-speed web link on WhatsApp with no app download required. Everything loads instantly with serene audio stotras.
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#D8CDC0]">
                <div className="flex items-start gap-2.5 bg-[#201812] p-2.5 rounded-xl border border-[#35281D]">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-white font-semibold">Bhagwan Mahavir Swami Darshan</strong>
                    <span className="text-[11px] text-[#A69989]">Auspicious blessing portrait with divine radiance</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-[#201812] p-2.5 rounded-xl border border-[#35281D]">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-white font-semibold">1 Cherished Family Portrait</strong>
                    <span className="text-[11px] text-[#A69989]">Dedicated gold-framed Parivar blessings section</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-[#201812] p-2.5 rounded-xl border border-[#35281D]">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-white font-semibold">Ceremony Muhurat Timings</strong>
                    <span className="text-[11px] text-[#A69989]">Complete sequence: Navkarshi, Shobha Yatra, Swami Vatsalya</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-[#201812] p-2.5 rounded-xl border border-[#35281D]">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-white font-semibold">Direct Google Maps Navigation</strong>
                    <span className="text-[11px] text-[#A69989]">One-tap direct driving navigation to the derasar/venue</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-r from-[#C98A3E]/20 to-[#E0A458]/10 border border-[#C98A3E]/40 text-center">
                <p className="text-[11px] font-semibold text-[#E0A458]">
                  Price: ₹499 (One-Time) • 24h Editing Access • Website Live Always
                </p>
              </div>
            </div>

            {/* CENTER: PHONE SIMULATOR WITH LONG SCROLLABLE PREVIEW */}
            <div className="lg:col-span-8 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[360px] sm:max-w-[380px]">
                {/* Phone Hardware Outer Shell */}
                <div className="relative rounded-[48px] p-3 bg-[#2A2018] shadow-2xl border-[6px] border-[#3D3024]">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1F1711] rounded-full z-30 flex items-center justify-center gap-3">
                    <div className="w-10 h-1 bg-[#3D3024] rounded-full" />
                    <div className="w-2 h-2 rounded-full bg-[#2A2018] border border-[#3D3024]" />
                  </div>

                  {/* Scrollable Viewport Container */}
                  <div className="relative rounded-[36px] bg-[#FAF8EE] overflow-hidden pt-7 h-[620px] sm:h-[660px] border border-stone-200 shadow-inner">
                    <LongInvitePreview
                      data={data}
                      template={currentTemplate}
                      isPlayingAudio={isPlayingAudio}
                      onToggleAudio={toggleAudio}
                      className="h-full"
                    />
                  </div>

                  {/* Bottom Home Bar */}
                  <div className="w-24 h-1 bg-stone-500 rounded-full mx-auto mt-2" />
                </div>
              </div>

              <p className="text-xs text-[#A69989] mt-3 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#E0A458]" />
                <span>Scroll inside the phone above to explore the entire invitation website</span>
              </p>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
