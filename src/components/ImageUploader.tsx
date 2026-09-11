import React, { useRef, useState } from 'react';
import { Upload, RefreshCw, Trash2, Image as ImageIcon, Camera } from 'lucide-react';

import { compressImage } from '../utils/image';

interface ImageUploaderProps {
  label: string;
  image: string;
  onChange: (dataUrl: string) => void;
  aspectRatio?: 'portrait' | 'square';
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  image,
  onChange,
  aspectRatio = 'portrait',
  helperText = 'Supports JPG, JPEG, PNG, WebP',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/i)) {
      alert('Please upload a valid JPG, PNG, or WebP image.');
      return;
    }

    setIsCompressing(true);
    try {
      const compressedDataUrl = await compressImage(file, 400, 0.6);
      onChange(compressedDataUrl);
    } catch (e) {
      console.error("Error compressing image:", e);
      alert("Failed to process image. Please try a different photo.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-stone-800">
          {label}
        </label>
        {image && (
          <span className="text-[11px] text-[#8B6E28] font-medium bg-[#FAF5E6] px-2 py-0.5 rounded-full">
            Photo Attached
          </span>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {image ? (
        /* Image Preview with Replace and Remove controls */
        <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-stone-50 p-2 group shadow-xs">
          <div className="flex items-center gap-4">
            <div className={`relative w-20 h-24 rounded-lg overflow-hidden border border-stone-200 shadow-xs flex-shrink-0 bg-stone-100`}>
              <img
                src={image}
                alt="Uploaded portrait"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 space-y-1.5">
              <p className="text-xs font-medium text-stone-700">Portrait Image</p>
              <p className="text-[11px] text-stone-500">
                Shown prominently in the central arch of your invitation.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  id="replace-photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-stone-300 hover:border-[#D4AF37] text-stone-700 hover:text-stone-900 transition shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#8B6E28]" />
                  <span>Replace</span>
                </button>

                <button
                  type="button"
                  id="remove-photo-btn"
                  onClick={handleRemove}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 transition shadow-2xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Upload Drag & Drop Area */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#8B6E28] bg-[#FAF6EC]'
              : 'border-stone-300 hover:border-[#D4AF37] bg-stone-50/70 hover:bg-[#FAF8F5]'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-[#FAF3DF] text-[#8B6E28] flex items-center justify-center mx-auto mb-2 border border-[#D4AF37]/30">
            <Camera className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-stone-700">
            Click to upload photo or drag and drop
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5">{helperText}</p>
        </div>
      )}
    </div>
  );
};
