import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  Download, 
  Sparkles, 
  MessageCircle,
  Loader2,
  Link as LinkIcon
} from 'lucide-react';
import { InvitationData } from '../types';
import { generateShareableUrl } from '../utils/storage';
import { getOrGenerateShortUrl } from '../utils/shortener';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  onDownloadImage: () => void;
  onOpenPrintModal?: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  data,
  onDownloadImage,
  onOpenPrintModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [shortUrl, setShortUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      getOrGenerateShortUrl(data)
        .then((url) => {
          setShortUrl(url);
          setIsGenerating(false);
        })
        .catch(() => {
          setShortUrl(generateShareableUrl(data));
          setIsGenerating(false);
        });
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const displayUrl = shortUrl || generateShareableUrl(data);
  const whatsappText = encodeURIComponent(
    `✨ You are warmly invited to the sacred Pārna of ${data.name || 'our Tapasvi'}.\n\n` +
    `Tap the link to view the complete invitation:\n${displayUrl}`
  );

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(displayUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Jain Tapasya Pārna Invitation - ${data.name}`,
          text: `You are warmly invited to the Pārna of ${data.name}.`,
          url: displayUrl,
        });
      } catch {
        // User cancelled or failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-[#FAF3DF] text-[#8B6E28] flex items-center justify-center mx-auto mb-2 border border-[#D4AF37]/40">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-stone-900">
            Share Invitation
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Send this sacred invitation to family and friends
          </p>
        </div>

        <div className="space-y-3">
          {/* WhatsApp Direct */}
          <a
            href={`https://api.whatsapp.com/send?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-medium text-sm bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2.5 shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send via WhatsApp</span>
          </a>

          {/* Web Share (Native Mobile Sheet) */}
          <button
            onClick={handleWebShare}
            className="w-full py-3 px-4 rounded-xl font-medium text-sm bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center gap-2.5 shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Native Share (Apps & SMS)</span>
          </button>

          {/* Download Image */}
          <button
            onClick={() => {
              onClose();
              onDownloadImage();
            }}
            className="w-full py-3 px-4 rounded-xl font-medium text-sm bg-[#FAF5E6] hover:bg-[#F3ECCE] text-[#7A5B18] border border-[#D4AF37]/50 flex items-center justify-center gap-2.5 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#8B6E28]" />
            <span>Download Invitation Card Image</span>
          </button>

          {/* Copy Short Link Input Bar */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-1">
                <LinkIcon className="w-3 h-3 text-[#D4AF37]" />
                <span>Short Ready-to-Share Link</span>
              </label>
              {isGenerating ? (
                <span className="text-[10px] text-amber-600 font-medium flex items-center gap-1 animate-pulse">
                  <Loader2 className="w-2.5 h-2.5 animate-spin" /> Shortening...
                </span>
              ) : (
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  ✨ Ultra Short URL
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={isGenerating ? 'Generating ultra-short link...' : displayUrl}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 bg-stone-50 text-stone-700 truncate font-mono focus:outline-hidden"
              />
              <button
                onClick={handleCopy}
                disabled={isGenerating}
                className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-900 disabled:bg-stone-400 text-white text-xs font-semibold flex items-center gap-1.5 transition flex-shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer info & website hyperlink */}
        <div className="text-center mt-5 space-y-1">
          <p className="text-[11px] text-stone-400">
            Recipients can open this ultra-short link directly in any browser on phone or computer.
          </p>
          <a
            href="https://jain-invitation.vercel.app/#designs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] text-[#8B6E28] hover:underline font-medium"
          >
            Explore more designs at jain-invitation.vercel.app
          </a>
        </div>
      </div>
    </div>
  );
};
