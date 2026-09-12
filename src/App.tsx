import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { TemplateGallery } from './components/TemplateGallery';
import { DoorReveal } from './components/DoorReveal';
import { InvitationForm } from './components/InvitationForm';
import { InvitationCard } from './components/InvitationCard';
import { ShareModal } from './components/ShareModal';
import { PhotoLightbox } from './components/PhotoLightbox';
import { CustomizationGate } from './components/CustomizationGate';
import { AdminDashboard } from './components/AdminDashboard';
import { InvitationData, TemplateId } from './types';
import { TEMPLATES } from './config/templates';
import { loadSavedInvitation, saveInvitation, generateShareableUrl } from './utils/storage';
import { fetchInvitationById, getOrGenerateShortUrl } from './utils/shortener';
import { downloadInvitationCard } from './utils/download';
import { compressDataUrl } from './utils/image';
import { 
  Eye, 
  Edit3, 
  Sparkles, 
  Share2, 
  Smartphone, 
  Monitor, 
  Check, 
  ArrowLeft,
  RotateCcw,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  // Centralized State
  const [data, setData] = useState<InvitationData>(() => loadSavedInvitation());
  const [currentView, setCurrentView] = useState<'landing' | 'templates' | 'editor' | 'invitation' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('id') || params.get('i') || params.get('invitation') || params.get('name') || params.get('guest')) {
        return 'invitation';
      }
    }
    return 'landing';
  });
  const [isDoorRevealing, setIsDoorRevealing] = useState<boolean>(false);
  const [pendingTemplateId, setPendingTemplateId] = useState<TemplateId | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [doorDestinationView, setDoorDestinationView] = useState<'landing' | 'templates' | 'editor' | 'invitation'>('invitation');
  const [isLoadingShortLink, setIsLoadingShortLink] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return !!(params.get('id') || params.get('i'));
    }
    return false;
  });
  const [isGuestView, setIsGuestView] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return !!(params.get('id') || params.get('i') || params.get('invitation') || params.get('name') || params.get('guest'));
    }
    return false;
  });

  // Auto-heal legacy uncompressed images so they can successfully save to Firestore under the 1MB limit
  useEffect(() => {
    if (isGuestView) return;
    
    const healLegacyData = async () => {
      let modified = false;
      const healedData = { ...data };
      
      try {
        if (healedData.profileImage && healedData.profileImage.length > 100000) {
          healedData.profileImage = await compressDataUrl(healedData.profileImage, 400, 0.6);
          modified = true;
        }
        
        if (healedData.mahavirSwamiImage && healedData.mahavirSwamiImage.length > 100000) {
          healedData.mahavirSwamiImage = await compressDataUrl(healedData.mahavirSwamiImage, 400, 0.6);
          modified = true;
        }

        if (healedData.familyPhoto && healedData.familyPhoto.length > 100000) {
          healedData.familyPhoto = await compressDataUrl(healedData.familyPhoto, 400, 0.6);
          modified = true;
        }

        if (healedData.familyPhotos && healedData.familyPhotos.length > 0) {
          const newFamily = await Promise.all(healedData.familyPhotos.map(async (url) => {
            if (url && url.length > 100000) {
              modified = true;
              return await compressDataUrl(url, 400, 0.6);
            }
            return url;
          }));
          healedData.familyPhotos = newFamily;
        }
        
        if (healedData.yearlyPhotos && healedData.yearlyPhotos.length > 0) {
          const newYearly = await Promise.all(healedData.yearlyPhotos.map(async (m) => {
            if (m.photoUrl && m.photoUrl.length > 100000) {
              return { ...m, photoUrl: await compressDataUrl(m.photoUrl, 400, 0.6) };
            }
            return m;
          }));
          
          const anyChanged = newYearly.some((m, i) => m.photoUrl !== healedData.yearlyPhotos![i].photoUrl);
          if (anyChanged) {
            healedData.yearlyPhotos = newYearly;
            modified = true;
          }
        }

        // STRIP BASE64 AUDIO: Prevent legacy uploaded MP3s from crashing Firestore
        if (healedData.customAudioUrl && healedData.customAudioUrl.startsWith('data:')) {
          healedData.customAudioUrl = '';
          modified = true;
        }
        if (healedData.songAudioUrls) {
          Object.keys(healedData.songAudioUrls).forEach((key) => {
            if (healedData.songAudioUrls![key]?.startsWith('data:')) {
              healedData.songAudioUrls![key] = '';
              modified = true;
            }
          });
        }
        
        if (modified) {
          setData(healedData);
          saveInvitation(healedData);
          // Silently sync the healed data to Firestore so their broken link instantly works
          getOrGenerateShortUrl(healedData).catch(e => console.warn("Auto-heal sync failed:", e));
        }
      } catch (e) {
        console.warn("Failed to heal legacy images:", e);
      }
    };
    
    healLegacyData();
  }, [isGuestView]); // Only run once on mount for the editor view

  // Auto-detect if someone opened an existing invitation via URL or short link
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const shortId = params.get('id') || params.get('i');

      if (shortId) {
        setIsGuestView(true);
        setIsLoadingShortLink(true);
        setCurrentView('invitation');
        setDoorDestinationView('invitation');

        fetchInvitationById(shortId)
          .then(async (fetchedData) => {
            if (fetchedData) {
              setData(fetchedData);
              // CRITICAL FIX: DO NOT call saveInvitation(fetchedData) here! 
              // This is a guest viewing a shared link. We must not overwrite their own local draft.
              setIsLoadingShortLink(false);
              setIsDoorRevealing(true);
            } else {
              // FALLBACK: If the data is missing from the database (e.g. legacy 1MB limit issue),
              // Check if the person clicking the link is ACTUALLY the creator!
              const myLocalId = localStorage.getItem('my_invitation_short_id');
              const localDataRaw = localStorage.getItem('jain_parna_invitation_data_v1');
              
              let recoveredData = null;
              
              if (localDataRaw) {
                const parsed = JSON.parse(localDataRaw);
                // Simple hash function to check legacy ID match
                const content = `${parsed.name || ''}_${parsed.tapasyaType || ''}_${parsed.date || ''}_${parsed.selectedTemplate || ''}_${parsed.hostNames || ''}`;
                let hash = 0;
                for (let i = 0; i < content.length; i++) {
                  hash = (hash << 5) - hash + content.charCodeAt(i);
                  hash |= 0;
                }
                const legacyId = (Math.abs(hash).toString(36) + '7x9k2p').substring(0, 7);
                
                if (myLocalId === shortId || legacyId === shortId) {
                  recoveredData = parsed;
                }
              }

              if (recoveredData) {
                // It's the creator! Auto-heal their massive images right now and sync to database.
                let modified = false;
                if (recoveredData.profileImage && recoveredData.profileImage.length > 100000) {
                  recoveredData.profileImage = await compressDataUrl(recoveredData.profileImage, 400, 0.6);
                  modified = true;
                }
                
                if (recoveredData.mahavirSwamiImage && recoveredData.mahavirSwamiImage.length > 100000) {
                  recoveredData.mahavirSwamiImage = await compressDataUrl(recoveredData.mahavirSwamiImage, 400, 0.6);
                  modified = true;
                }

                if (recoveredData.familyPhoto && recoveredData.familyPhoto.length > 100000) {
                  recoveredData.familyPhoto = await compressDataUrl(recoveredData.familyPhoto, 400, 0.6);
                  modified = true;
                }

                if (recoveredData.familyPhotos && recoveredData.familyPhotos.length > 0) {
                  recoveredData.familyPhotos = await Promise.all(recoveredData.familyPhotos.map(async (url: string) => {
                    if (url && url.length > 100000) {
                      modified = true;
                      return await compressDataUrl(url, 400, 0.6);
                    }
                    return url;
                  }));
                }

                if (recoveredData.yearlyPhotos && recoveredData.yearlyPhotos.length > 0) {
                  recoveredData.yearlyPhotos = await Promise.all(recoveredData.yearlyPhotos.map(async (m: any) => {
                    if (m.photoUrl && m.photoUrl.length > 100000) {
                      modified = true;
                      return { ...m, photoUrl: await compressDataUrl(m.photoUrl, 400, 0.6) };
                    }
                    return m;
                  }));
                }

                // STRIP BASE64 AUDIO: Prevent legacy uploaded MP3s from crashing Firestore
                if (recoveredData.customAudioUrl && recoveredData.customAudioUrl.startsWith('data:')) {
                  recoveredData.customAudioUrl = '';
                  modified = true;
                }
                if (recoveredData.songAudioUrls) {
                  Object.keys(recoveredData.songAudioUrls).forEach((key) => {
                    if (recoveredData.songAudioUrls![key]?.startsWith('data:')) {
                      recoveredData.songAudioUrls![key] = '';
                      modified = true;
                    }
                  });
                }
                
                setData(recoveredData);
                getOrGenerateShortUrl(recoveredData).catch(console.error);
                
                // Since they are the creator, let's treat them as the editor so they can make changes
                setIsGuestView(false);
                setIsLoadingShortLink(false);
                setIsDoorRevealing(true);
              } else {
                // If it's truly lost or the link is invalid, don't show an ugly alert and black screen.
                // Reset them gracefully back to the landing page so they can create a new one.
                console.warn("Invitation not found. Redirecting to landing page.");
                setCurrentView('landing');
                setDoorDestinationView('landing');
                window.history.replaceState({}, document.title, "/");
                setIsLoadingShortLink(false);
                setIsDoorRevealing(false); // Do not reveal the door, just go to landing page
              }
            }
          })
          .catch((err) => {
            console.error('Error fetching short link invitation:', err);
            setIsLoadingShortLink(false);
            setIsDoorRevealing(true);
          });
      } else if (params.get('invitation') || params.get('name') || params.get('guest')) {
        // Direct invitation view mode for guests via shared link
        setIsGuestView(true);
        setCurrentView('invitation');
        setDoorDestinationView('invitation');
        setIsDoorRevealing(true);
      }
    }
  }, []);

  // Save changes to localStorage and background sync to Firestore
  const handleDataChange = (newData: InvitationData) => {
    setData(newData);
    saveInvitation(newData);
    
    // Silently update Firestore so their live link stays in sync automatically
    // Debounce to prevent spam
    if (!isGuestView) {
      if ((window as any).syncTimeout) clearTimeout((window as any).syncTimeout);
      (window as any).syncTimeout = setTimeout(() => {
        getOrGenerateShortUrl(newData).catch(console.error);
      }, 2000);
    }
  };

  // When user selects a template from Gallery
  const handleSelectTemplate = (templateId: TemplateId) => {
    setPendingTemplateId(templateId);
    handleDataChange({
      ...data,
      selectedTemplate: templateId,
    });
    setCurrentView('editor');
  };

  // When door animation completes
  const handleDoorOpened = () => {
    setIsDoorRevealing(false);
    setCurrentView(doorDestinationView);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Soft celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#E5C07B', '#FFFFFF', '#C29B38'],
      });
    } catch {
      // noop
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentView, isDoorRevealing]);

  const handleDownload = async () => {
    await downloadInvitationCard(
      'invitation-card-container',
      `jain-parna-invitation-${(data.name || 'tapasvi').toLowerCase().replace(/\s+/g, '-') || 'tapasvi'}.png`
    );
  };

  const handleShareWhatsApp = async () => {
    try {
      const shareUrl = await getOrGenerateShortUrl(data);
      const text = encodeURIComponent(
        `✨ You are warmly invited to the sacred Pārna of ${data.name || 'our Tapasvi'}.\n\n` +
        `Tap the link to view the complete invitation:\n${shareUrl}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    } catch {
      const shareUrl = generateShareableUrl(data);
      const text = encodeURIComponent(
        `✨ You are warmly invited to the sacred Pārna of ${data.name || 'our Tapasvi'}.\n\n` +
        `Tap the link to view the complete invitation:\n${shareUrl}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
  };

  const handleWebShare = async () => {
    try {
      const shareUrl = await getOrGenerateShortUrl(data);
      if (navigator.share) {
        await navigator.share({
          title: `Jain Tapasya Pārna Invitation - ${data.name}`,
          text: `You are warmly invited to the Pārna of ${data.name}.`,
          url: shareUrl,
        });
      } else {
        setIsShareModalOpen(true);
      }
    } catch {
      setIsShareModalOpen(true);
    }
  };

  const currentTemplate = TEMPLATES[data.selectedTemplate] || TEMPLATES.sukoon || {};

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-500"
      style={{
        background: currentView === 'invitation' ? currentTemplate?.colors.outerBgGradient : '#FAF8F5',
        color: currentView === 'invitation' && currentTemplate.id === 'divya' ? '#E8ECEF' : '#2C241E',
      }}
    >
      {/* Short Link Loading Overlay */}
      {isLoadingShortLink && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#110D09] text-[#EAD096] p-6 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin mb-5 shadow-lg shadow-[#D4AF37]/20" />
          <p className="font-hindi text-xl font-bold tracking-wide text-[#F3E5AB]">॥ મંગલ પાવન નિમંત્રણ પત્ર ॥</p>
          <p className="text-xs text-[#C5A059] mt-2 animate-pulse font-medium">Opening Sacred Tapasvi Invitation...</p>
        </div>
      )}
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        isGuestView={isGuestView}
        onNavigate={(view) => {
          if (view === 'door') {
            setPendingTemplateId(data.selectedTemplate);
            setIsDoorRevealing(true);
          } else {
            setCurrentView(view);
          }
        }}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenDoorCeremony={() => {
          setPendingTemplateId(data.selectedTemplate);
          setDoorDestinationView(currentView === 'editor' ? 'editor' : 'invitation');
          setIsDoorRevealing(true);
        }}
        selectedTemplateName={currentTemplate?.name}
        selectedSongId={data.selectedSongId || 'reAavyaTapashvi'}
        customAudioUrl={data.customAudioUrl}
        songAudioUrls={data.songAudioUrls}
        onSelectSong={(songId) => setData((prev) => ({ ...prev, selectedSongId: songId }))}
      />

      {/* 3D Door Opening Reveal Overlay with Sacred Gujarati Jai Jinendra Gateway & Digital Tilak */}
      {isDoorRevealing && (
        <DoorReveal
          template={TEMPLATES[pendingTemplateId || data.selectedTemplate] || currentTemplate}
          onDoorOpened={handleDoorOpened}
          customMahavirSwamiImage={data.mahavirSwamiImage}
          language={data.language}
          invitationData={data}
        />
      )}

      {/* VIEW 1: INVITEO-STYLE LANDING PAGE WITH 8 COMPLETE SECTIONS */}
      {currentView === 'landing' && (
        <main className="flex-1 flex flex-col">
          <LandingPage
            data={data}
            template={currentTemplate}
            onExplore={() => setCurrentView('editor')}
            onSelectTemplate={(templateId) => {
              handleDataChange({
                ...data,
                selectedTemplate: templateId,
              });
            }}
            onPreviewTemplate={(templateId) => {
              setPendingTemplateId(templateId);
              setDoorDestinationView('invitation');
              setIsDoorRevealing(true);
            }}
            onOpenDoorCeremony={() => {
              setPendingTemplateId(data.selectedTemplate);
              setDoorDestinationView('invitation');
              setIsDoorRevealing(true);
            }}
          />
        </main>
      )}

      {/* VIEW 2: TEMPLATE SELECTION VIEW */}
      {currentView === 'templates' && (
        <main className="flex-1 py-6">
          <div className="max-w-7xl mx-auto px-4 mb-4">
            <button
              onClick={() => setCurrentView('landing')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>
          <TemplateGallery
            selectedTemplateId={data.selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
          />
        </main>
      )}

      {/* ADMIN DASHBOARD VIEW */}
      {currentView === 'admin' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <AdminDashboard />
        </main>
      )}

      {/* VIEW 3: INVITATION CUSTOMIZATION & LIVE PREVIEW STUDIO */}
      {currentView === 'editor' && (
        <CustomizationGate templateId={data.selectedTemplate}>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            
            {/* Top Bar for Editor */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-cinzel tracking-widest text-[#8B6E28] font-semibold">
                  Personalization Studio
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500 font-medium">
                  {currentTemplate?.name} Theme
                </span>
              </div>
              <h1 className="font-cinzel text-2xl font-bold text-stone-900 mt-0.5">
                Customize Invitation
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile View Switcher (Tabs) */}
              <div className="flex lg:hidden rounded-lg bg-stone-200/80 p-1">
                <button
                  type="button"
                  onClick={() => setMobileTab('edit')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    mobileTab === 'edit'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    mobileTab === 'preview'
                      ? 'bg-white text-[#8B6E28] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
              </div>

              {/* Full Invitation Preview Button */}
              <button
                id="open-full-invitation-view-btn"
                onClick={() => setCurrentView('invitation')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#8B6E28] hover:bg-[#72581E] text-white shadow-md transition"
              >
                <Eye className="w-4 h-4" />
                <span>Final Invitation</span>
              </button>
            </div>
          </div>

          {/* Two-Column Responsive Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Personalization Form */}
            <div className={`lg:col-span-6 xl:col-span-6 ${mobileTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
              <InvitationForm
                data={data}
                onChange={handleDataChange}
                onSelectTemplateModal={() => setCurrentView('templates')}
                onPreviewPhoto={(url) => setLightboxPhoto(url)}
              />
            </div>

            {/* Right Column: Sticky Live Preview */}
            <div className={`lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20 space-y-4 ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
              
              {/* Preview Controls Bar */}
              <div className="bg-white rounded-xl border border-stone-200 p-3 px-4 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider font-cinzel">
                    Live Real-Time Preview
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPendingTemplateId(data.selectedTemplate);
                      setIsDoorRevealing(true);
                    }}
                    title="Experience Door Opening Reveal & Bhagwan Mahavir Swami Darshan"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-[#8B6E28] bg-[#FAF3DF] hover:bg-[#F3ECCE] border border-[#D4AF37]/50 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                    <span className="hidden sm:inline">Door Ceremony</span>
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    title="Mobile preview format"
                    className={`p-1.5 rounded-md transition ${
                      previewDevice === 'mobile'
                        ? 'bg-[#FAF3DF] text-[#8B6E28] border border-[#D4AF37]/50'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    title="Desktop card preview format"
                    className={`p-1.5 rounded-md transition ${
                      previewDevice === 'desktop'
                        ? 'bg-[#FAF3DF] text-[#8B6E28] border border-[#D4AF37]/50'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview Frame Wrapper */}
              <div className={`mx-auto transition-all duration-300 ${
                previewDevice === 'mobile'
                  ? 'max-w-sm rounded-[36px] p-3 bg-stone-900 shadow-2xl border-4 border-stone-800'
                  : 'w-full'
              }`}>
                {previewDevice === 'mobile' && (
                  <div className="w-24 h-4 bg-stone-800 rounded-full mx-auto mb-2" />
                )}

                <div className={previewDevice === 'mobile' ? 'max-h-[640px] overflow-y-auto rounded-[24px] pr-0.5' : ''}>
                  <InvitationCard
                    data={data}
                    template={currentTemplate}
                    isInteractivePreview={true}
                    onPreviewPhoto={(url) => setLightboxPhoto(url)}
                    onShareWhatsApp={handleShareWhatsApp}
                    onWebShare={handleWebShare}
                    onDownloadImage={handleDownload}
                    onEdit={() => setMobileTab('edit')}
                    onChangeTemplate={() => setCurrentView('templates')}
                  />
                </div>
              </div>
            </div>

          </div>
        </main>
        </CustomizationGate>
      )}

      {/* VIEW 4: DEDICATED FULL INVITATION VIEW */}
      {currentView === 'invitation' && (
        <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          
          {/* Top Navigation Banner - ONLY shown in Creator Mode */}
          {!isGuestView && (
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-stone-200">
              <button
                onClick={() => setCurrentView('editor')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-3.5 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#8B6E28]" />
                <span>Back to Editor</span>
              </button>

              <div className="flex items-center gap-2">
                {/* Door Ceremony Replay */}
                <button
                  onClick={() => {
                    setPendingTemplateId(data.selectedTemplate);
                    setIsDoorRevealing(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#683D10] bg-gradient-to-r from-[#FAF2DE] to-[#F1E4C3] border border-[#D4AF37] px-3.5 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>॥ જય જિનેન્દ્ર ॥ દ્વાર</span>
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#2D4B3E] hover:bg-[#1E332A] px-4 py-1.5 rounded-lg shadow-sm transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          )}

          {/* Centered Full Invitation Card */}
          <div className="w-full flex justify-center">
            <InvitationCard
              data={data}
              template={currentTemplate}
              isInteractivePreview={false}
              onPreviewPhoto={(url) => setLightboxPhoto(url)}
              onShareWhatsApp={handleShareWhatsApp}
              onWebShare={handleWebShare}
              onDownloadImage={handleDownload}
              onEdit={() => setCurrentView('editor')}
              onChangeTemplate={() => setCurrentView('templates')}
            />
          </div>
        </main>
      )}

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={data}
        onDownloadImage={handleDownload}
      />

      {/* Lightbox for zooming photos */}
      <PhotoLightbox
        photoUrl={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
      />

      {/* Subtle Footer */}
      <footer className="py-6 border-t border-stone-200 text-center text-xs text-stone-500 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-cinzel text-[#8B6E28]">
            <span>Jain Tapasya Pārna</span>
            <span>•</span>
            <span className="font-hindi text-sm">॥ ॐ नमो जिणाणं ॥</span>
          </div>
          <p className="text-stone-400 text-[11px]">
            Created with reverence for Tapasya, Atma-Shuddhi, and Pārna Utsav.
          </p>
        </div>
      </footer>
    </div>
  );
}
export default App;
