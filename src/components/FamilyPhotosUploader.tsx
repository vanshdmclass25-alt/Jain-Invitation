import React, { useRef, useState } from 'react';
import { Upload, Trash2, Eye, RefreshCw, Users, CheckCircle2 } from 'lucide-react';

interface FamilyPhotosUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  onPreviewPhoto?: (url: string) => void;
}

export const FamilyPhotosUploader: React.FC<FamilyPhotosUploaderProps> = ({
  photos,
  onChange,
  onPreviewPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Strictly single family photo
  const currentPhoto = photos && photos.length > 0 ? photos[0] : '';

  const handleSingleFile = (file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onChange([e.target.result]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSingleFile(e.dataTransfer.files[0]);
    }
  };

  const removePhoto = () => {
    onChange([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#C98A3E]" />
          <label className="block text-sm font-semibold text-stone-900">
            Family Photo <span className="text-xs font-normal text-stone-500">(1 photo)</span>
          </label>
        </div>
        {currentPhoto && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>1 photo attached</span>
          </span>
        )}
      </div>

      <p className="text-xs text-stone-500">
        Upload 1 family portrait to feature your parivar's blessings on the invitation website.
      </p>

      {/* Hidden Single File Input (NO multiple attribute) */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleSingleFile(e.target.files[0]);
          }
        }}
      />

      {currentPhoto ? (
        /* State 1: A single photo is uploaded */
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#E0A458]/40 bg-[#FFFDF9] shadow-sm p-3">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Image Preview Thumbnail */}
            <div className="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 group">
              <img
                src={currentPhoto}
                alt="Family Portrait"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {onPreviewPhoto && (
                <button
                  type="button"
                  onClick={() => onPreviewPhoto(currentPhoto)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-medium"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Full Image</span>
                </button>
              )}
            </div>

            {/* Photo Details & Action Controls */}
            <div className="flex-1 space-y-2 text-center sm:text-left w-full">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-stone-900 font-poppins">
                  Selected Family Photo
                </h4>
                <p className="text-xs text-stone-500">
                  This photo will appear with gold filigree under Family Blessings.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <button
                  type="button"
                  id="replace-family-photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 shadow-2xs transition"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C98A3E]" />
                  <span>Change Photo</span>
                </button>

                {onPreviewPhoto && (
                  <button
                    type="button"
                    onClick={() => onPreviewPhoto(currentPhoto)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                )}

                <button
                  type="button"
                  id="remove-family-photo-btn"
                  onClick={removePhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* State 2: No photo uploaded yet (Clean dropzone for exactly 1 photo) */
        <div
          id="family-photo-upload-dropzone"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
            isDragging
              ? 'border-[#C98A3E] bg-[#FFFBF0] scale-[0.99]'
              : 'border-stone-300 hover:border-[#E0A458] hover:bg-[#FAF8F5]'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#FAF3DF] text-[#C98A3E] flex items-center justify-center mx-auto mb-3 border border-[#E0A458]/30 shadow-2xs">
            <Upload className="w-5 h-5" />
          </div>

          <h4 className="text-sm font-bold text-stone-900 mb-1">
            Click or drag to upload 1 Family Photo
          </h4>
          <p className="text-xs text-stone-500 max-w-xs mx-auto mb-3">
            Add a family portrait featuring the Tapasvi's parivar for personal warmth.
          </p>

          <span className="inline-block px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-medium text-stone-600 shadow-2xs">
            Supports JPG, PNG, WebP (Single Photo)
          </span>
        </div>
      )}
    </div>
  );
};
