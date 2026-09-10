import React, { useState, useRef } from 'react';
import { Printer, Download, X, Globe, Check, Sparkles, MapPin, Calendar, Clock, Utensils, QrCode } from 'lucide-react';
import { InvitationData, TemplateDefinition } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../utils/translations';
import { MahavirSwamiImage } from './MahavirSwamiImage';
import { AshtamangalaRow } from './JainTempleAccents';
import { toPng } from 'html-to-image';

interface PrintableInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  template: TemplateDefinition;
}

export const PrintableInvitationModal: React.FC<PrintableInvitationModalProps> = ({
  isOpen,
  onClose,
  data,
  template,
}) => {
  const [printLang, setPrintLang] = useState<SupportedLanguage>(data.language || 'gu');
  const [isElderLargeText, setIsElderLargeText] = useState(true);
  const [isGeneratingPng, setIsGeneratingPng] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const printAreaRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const t = TRANSLATIONS[printLang] || TRANSLATIONS.gu;

  // Handle high-resolution PDF / Print via browser print dialog
  const handleTriggerPrint = () => {
    window.print();
  };

  // Handle 300 DPI high-resolution image download
  const handleDownloadHighResPng = async () => {
    if (!printAreaRef.current) return;
    setIsGeneratingPng(true);
    try {
      const dataUrl = await toPng(printAreaRef.current, {
        quality: 1.0,
        pixelRatio: 3, // 300 DPI ultra-high-resolution print standard
        cacheBust: true,
      });

      const safeName = (data.name || 'tapasvi').toLowerCase().replace(/\s+/g, '-');
      const filename = `jain-parna-patrika-${safeName}-print-ready.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate high-resolution print image:', err);
      alert('Could not generate image. You can also use the "Print / Save PDF" option.');
    } finally {
      setIsGeneratingPng(false);
    }
  };

  // Google Maps navigation QR code URL
  const mapsTarget = data.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(mapsTarget)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Card Container */}
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#D4AF37]/50 flex flex-col my-auto max-h-[94vh] overflow-hidden">
        
        {/* Top Control Bar (Hidden during actual print) */}
        <div className="no-print bg-[#1E1610] text-[#FFFDF8] px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F5D061]">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-cinzel text-sm sm:text-base font-bold text-[#F5D061]">
                {printLang === 'gu' ? 'પરંપરાગત પ્રિન્ટ-રેડી પત્રિકા' : printLang === 'hi' ? 'पारंपरिक प्रिंट-रेडी पत्रिका' : 'Traditional Print-Ready Invitation'}
              </h2>
              <p className="text-[11px] text-stone-300">
                {printLang === 'gu' ? 'વડીલો માટે ભવ્ય પ્રિન્ટેડ આમંત્રણ અને PDF ડાઉનલોડ' : 'High-resolution layout for elderly family members & physical printing'}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Language Selector */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/20 text-xs">
              <button
                type="button"
                onClick={() => setPrintLang('gu')}
                className={`px-2 py-1 rounded-md transition ${printLang === 'gu' ? 'bg-[#D4AF37] text-stone-900 font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                ગુજરાતી
              </button>
              <button
                type="button"
                onClick={() => setPrintLang('hi')}
                className={`px-2 py-1 rounded-md transition ${printLang === 'hi' ? 'bg-[#D4AF37] text-stone-900 font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setPrintLang('en')}
                className={`px-2 py-1 rounded-md transition ${printLang === 'en' ? 'bg-[#D4AF37] text-stone-900 font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                EN
              </button>
            </div>

            {/* Elder Friendly Font Toggle */}
            <button
              type="button"
              onClick={() => setIsElderLargeText(!isElderLargeText)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1 ${
                isElderLargeText
                  ? 'bg-[#FAF3DF] text-[#784600] border-[#D4AF37]'
                  : 'bg-white/10 text-stone-300 border-white/20 hover:bg-white/20'
              }`}
              title="Toggle larger typography for elderly family members"
            >
              <span>{isElderLargeText ? 'મોટા અક્ષરો (Large)' : 'સામાન્ય (Normal)'}</span>
            </button>

            {/* High-Res PNG Button */}
            <button
              type="button"
              onClick={handleDownloadHighResPng}
              disabled={isGeneratingPng}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2D4B3E] hover:bg-[#1E352B] text-white border border-[#3E6554] shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isGeneratingPng ? 'જનરેટ થાય છે...' : '300 DPI Photo'}</span>
            </button>

            {/* Primary Print / Save PDF Button */}
            <button
              id="print-save-pdf-button"
              type="button"
              onClick={handleTriggerPrint}
              className="px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C29B38] text-stone-950 shadow-md hover:scale-105 active:scale-95 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-900" />
              <span>પ્રિન્ટ / Save PDF</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Sheet Canvas Wrapper */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#524B46]/20">
          
          {/* =========================================================================
              PRINTABLE DOCUMENT SHEET ROOT (Target for Window Print & html-to-image)
              Designed to look like an authentic ₹2000+ Traditional Jain Kankotri / Patrika
             ========================================================================= */}
          <div
            ref={printAreaRef}
            id="printable-invitation-root"
            className={`w-full max-w-[760px] bg-[#FFFDF9] text-[#2C1810] rounded-2xl shadow-xl p-6 sm:p-10 border-4 border-[#C29B38] relative flex flex-col justify-between overflow-hidden print:w-full print:max-w-none print:shadow-none print:border-none print:p-6 print:m-0 ${
              isElderLargeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
            style={{
              backgroundImage: `radial-gradient(circle, rgba(212, 175, 55, 0.04) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          >
            {/* Outer Royal Kumkum-Gold Double Border */}
            <div className="absolute inset-2 sm:inset-3 border-2 border-[#7A1224] pointer-events-none rounded-xl" />
            <div className="absolute inset-3 sm:inset-4 border border-[#D4AF37] pointer-events-none rounded-lg" />

            {/* Corner Traditional Swastik (સાથિયો) & Floral Filigree */}
            <div className="absolute top-4 left-4 text-[#7A1224] text-lg font-bold select-none">卐</div>
            <div className="absolute top-4 right-4 text-[#7A1224] text-lg font-bold select-none">卐</div>
            <div className="absolute bottom-4 left-4 text-[#7A1224] text-lg font-bold select-none">卐</div>
            <div className="absolute bottom-4 right-4 text-[#7A1224] text-lg font-bold select-none">卐</div>

            {/* SECTION 1: AUSPICIOUS JAIN MANTRAS & ASHTAMANGALA HEADER */}
            <div className="relative z-10 text-center mb-3 pt-2">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#7A1224]" />
                <span className="font-hindi text-base sm:text-xl font-bold tracking-widest text-[#7A1224]">
                  ॥ શ્રી મહાવીરાય નમઃ ॥ શ્રી ઋષભદેવાય નમઃ ॥
                </span>
                <span className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#7A1224]" />
              </div>

              <p className="font-hindi text-xs sm:text-sm font-semibold tracking-wider text-[#9C6D28] mb-1">
                ॥ ૐ નમો અરિહંતાણં • ૐ નમો સિદ્ધાણં • ૐ નમો આયરિયાણં • ૐ નમો ઉવજ્ઝાયાણં • ૐ નમો લોએ સવ્વસાહૂણં ॥
              </p>

              {/* Ashtamangala Holy Row */}
              <div className="max-w-md mx-auto my-1.5 px-4 py-1 bg-[#FAF3DF]/60 rounded-full border border-[#D4AF37]/50">
                <AshtamangalaRow color="#7A1224" />
              </div>
            </div>

            {/* SECTION 2: SACRED BHAGWAN MAHAVIR SWAMI MURTI & TAPASVI PORTRAIT (Side-by-Side) */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 my-3 pb-3 border-b border-[#D4AF37]/40">
              
              {/* Bhagwan Mahavir Swami Darshan in Royal Arch */}
              <div className="flex flex-col items-center">
                <div className="relative p-1.5 rounded-t-[55px] rounded-b-lg bg-gradient-to-b from-[#D4AF37] to-[#8C5D1F] shadow-md">
                  <div className="rounded-t-[50px] rounded-b-md overflow-hidden bg-[#FAF6EE] p-1">
                    <MahavirSwamiImage
                      customImageUrl={data.mahavirSwamiImage}
                      className="w-24 h-28 sm:w-28 sm:h-32 object-contain"
                      showAura={false}
                    />
                  </div>
                </div>
                <span className="font-hindi text-xs font-bold text-[#7A1224] mt-1">
                  દેવાધિદેવ શ્રી મહાવીર સ્વામી
                </span>
              </div>

              {/* Tapasvi Portrait in Traditional Gold Frame */}
              {data.profileImage && (
                <div className="flex flex-col items-center">
                  <div className="relative p-1.5 rounded-t-[55px] rounded-b-lg bg-gradient-to-b from-[#7A1224] to-[#C25E00] shadow-md">
                    <div className="rounded-t-[50px] rounded-b-md overflow-hidden bg-stone-100 w-24 h-28 sm:w-28 sm:h-32">
                      <img
                        src={data.profileImage}
                        alt={data.name || 'Tapasvi'}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <span className="font-hindi text-xs font-bold text-[#7A1224] mt-1">
                    તપસ્વી: {data.name}
                  </span>
                </div>
              )}
            </div>

            {/* SECTION 3: GRAND HEADLINE & REVERENT INVITATION LETTER */}
            <div className="relative z-10 text-center my-3 px-2 sm:px-6">
              <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#8C5D1F] uppercase block mb-1">
                ॥ મંગલ પારણા નિમંત્રણ પત્રિકા ॥
              </span>

              <h1 className="font-hindi text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#7A1224] tracking-tight mb-2">
                તપસ્વી શ્રી {data.name}
              </h1>

              <div className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#7A1224] via-[#941930] to-[#7A1224] text-[#FDF6D8] font-hindi text-sm sm:text-lg font-bold shadow-sm mb-3">
                {data.tapasyaType || 'પાવન અઠ્ઠાઈ તપસ્યા પારણા મહોત્સવ'}
              </div>

              {/* Respectful Invitation Body (Elder Friendly Wording) */}
              <p className="font-hindi leading-relaxed text-stone-800 text-justify sm:text-center max-w-2xl mx-auto mb-2 font-medium">
                {data.invitationMessage || (
                  printLang === 'gu'
                    ? `પરમકૃપાળુ દેવાધિદેવ ૧૦૦૮ શ્રી મહાવીરસ્વામી ભગવાનની અસીમ કૃપાથી તથા પૂજ્ય ગુરુભગવંતોના મંગલ આશીર્વાદથી અમારા પરિવારના વહાલા તપસ્વીએ આત્મકલ્યાણ અર્થે કઠિન તપસ્યાની આરાધના પરિપૂર્ણ કરેલ છે. આ મંગલમય અવસરે આપશ્રી સપરિવાર પધારી તપસ્વીને અંતઃકરણપૂર્વક અનુમોદના અને આશીર્વાદ આપી અમારા આંગણને પાવન કરશો તેવી હાર્દિક વિનંતી છે.`
                    : printLang === 'hi'
                    ? `परमकृपालु देवाधिदेव १००८ श्री महावीर स्वामी भगवान की असीम कृपा और पूज्य गुरुभगवंतों के मंगल आशीर्वाद से हमारे तपस्वी ने कठिन तपस्या की आराधना पूर्ण की है। इस पावन अवसर पर आप सपरिवार पधारकर तपस्वी की अनुमोदना कर हमें अनुग्रहीत करें।`
                    : `With the divine grace of Bhagwan Mahavir Swami and revered elders, we cordially invite you with your family to celebrate the sacred Pārna Mahotsav of our beloved Tapasvi.`
                )}
              </p>
            </div>

            {/* SECTION 4: HIGH-CONTRAST CEREMONY PROGRAM SCHEDULE & REAL QR CODE */}
            <div className="relative z-10 my-3 p-4 sm:p-5 rounded-xl bg-[#FAF4E6] border-2 border-[#D4AF37] shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Left 8 Cols: Schedule Details */}
                <div className="md:col-span-8 space-y-2.5 text-left font-hindi">
                  
                  {/* Date */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#7A1224] text-[#FAF4E6] flex items-center justify-center shrink-0 mt-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#7A1224] uppercase tracking-wider block">
                        {printLang === 'gu' ? 'શુભ તારીખ / વાર:' : 'Auspicious Date:'}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-stone-900">
                        {data.date || '૨૦૨૬-૧૦-૧૮'}
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#7A1224] text-[#FAF4E6] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#7A1224] uppercase tracking-wider block">
                        {printLang === 'gu' ? 'શુભ મુહૂર્ત / સમય:' : 'Sacred Time:'}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-stone-900">
                        {data.time || 'સવારે ૮:૩૦ કલાકે'}
                      </span>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#7A1224] text-[#FAF4E6] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#7A1224] uppercase tracking-wider block">
                        {printLang === 'gu' ? 'પાવન સ્થળ / સરનામું:' : 'Venue / Derasar:'}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                        {data.location || 'Shree Parshwanath Jain Derasar, Mumbai'}
                      </span>
                    </div>
                  </div>

                  {/* Swami Vatsalya */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <div className="w-7 h-7 rounded-full bg-[#2D4B3E] text-[#FAF4E6] flex items-center justify-center shrink-0 mt-0.5">
                      <Utensils className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#2D4B3E] uppercase tracking-wider block">
                        {printLang === 'gu' ? 'સ્વામી વાત્સલ્ય (પ્રભુ પ્રસાદ):' : 'Swami Vatsalya:'}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-stone-800">
                        {printLang === 'gu' ? 'પારણા વિધિ પશ્ચાત પાવન સ્વામી વાત્સલ્ય રાખેલ છે' : 'Prabhu Prasad will be served following the sacred Pārna'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right 4 Cols: Real Google Maps QR Code for Physical Printing */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-2 rounded-lg bg-white border border-[#D4AF37]/50 shadow-xs">
                  <span className="text-[11px] font-bold text-[#7A1224] font-hindi mb-1">
                    {printLang === 'gu' ? 'મેપ્સ નેવિગેશન QR' : 'Scan for Maps'}
                  </span>
                  
                  {/* High Resolution Dynamic QR code */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 p-1 bg-white rounded border border-stone-300 shadow-2xs">
                    <img
                      src={qrCodeUrl}
                      alt="Google Maps QR Code"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <span className="text-[10px] text-stone-500 font-sans mt-1 leading-tight">
                    {printLang === 'gu' ? 'કેમેરાથી સ્કેન કરી રસ્તો જુઓ' : 'Scan with mobile camera for directions'}
                  </span>
                </div>

              </div>
            </div>

            {/* SECTION 5: NIMANTRAK / HOST FAMILY & WELL-WISHERS */}
            <div className="relative z-10 mt-3 pt-3 border-t border-[#D4AF37]/50 flex flex-wrap items-center justify-between gap-4 text-center sm:text-left font-hindi">
              <div>
                <span className="text-xs font-bold text-[#7A1224] uppercase tracking-wider block">
                  {printLang === 'gu' ? 'વિનંતિકાર (નિમંત્રક):' : 'Invited By (Host Family):'}
                </span>
                <span className="text-base sm:text-lg font-bold text-stone-900">
                  {data.hostNames || 'સમસ્ત શાહ પરિવાર'}
                </span>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-xs font-bold text-[#8C5D1F] uppercase tracking-wider block">
                  {printLang === 'gu' ? 'સ્નેહાધીન / દર્શનાભિલાષી:' : 'Well Wishers:'}
                </span>
                <span className="text-sm sm:text-base font-semibold text-stone-800">
                  સમસ્ત મિત્ર મંડળ તથા સ્નેહીજનો
                </span>
              </div>
            </div>

            {/* Auspicious Footnote */}
            <div className="relative z-10 text-center mt-3 pt-2 text-xs font-hindi font-semibold text-[#7A1224]">
              ॥ સુખ સાતામાં રહેવું • મિચ્છામિ દુક્કડં • જીવો અને જીવવા દો ॥
            </div>

          </div>
        </div>

        {/* Modal Bottom Guidance Footer (Hidden when printing) */}
        <div className="no-print bg-[#FFFDF8] px-6 py-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
          <div className="flex items-center gap-2 text-[#7A1224]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-hindi font-medium">
              A4 કદ પર પરફેક્ટ પ્રિન્ટ માટે "Background graphics" ઓપ્શન ચાલુ રાખો.
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
          >
            બંધ કરો (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
