import React from 'react';
import { X } from 'lucide-react';

interface PhotoLightboxProps {
  photoUrl: string | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photoUrl, onClose }) => {
  if (!photoUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl max-h-[85vh] rounded-xl overflow-hidden shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <img
          src={photoUrl}
          alt="Zoomed family photo"
          className="w-full h-full object-contain max-h-[80vh]"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
