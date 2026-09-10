import React, { useRef, useState } from 'react';
import { Upload, Trash2, Camera, RefreshCw, Eye, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { YearlyPhotoMilestone } from '../types';

interface YearlyMilestoneUploaderProps {
  milestone: YearlyPhotoMilestone;
  index: number;
  onUpdate: (field: keyof YearlyPhotoMilestone, value: string) => void;
  onRemove: () => void;
  onPreviewPhoto?: (url: string) => void;
}

export const YearlyMilestoneUploader: React.FC<YearlyMilestoneUploaderProps> = ({
  milestone,
  index,
  onUpdate,
  onRemove,
  onPreviewPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFile = (file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|jpg|png|webp|gif)$/i)) {
      alert('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onUpdate('photoUrl', e.target.result);
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const hasPhoto = Boolean(milestone.photoUrl && milestone.photoUrl.trim());

  return (
    <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3 transition-all">
      {/* Header: Milestone Index, Year Input, and Delete Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#FAF3DF] text-[#8B6E28] font-bold text-xs flex items-center justify-center">
            {index + 1}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-stone-500">Year:</span>
            <input
              type="text"
              value={milestone.year}
              onChange={(e) => onUpdate('year', e.target.value)}
              placeholder="e.g. 2024"
              className="w-24 px-2 py-1 rounded-lg border border-stone-200 text-xs font-bold font-cinzel text-stone-800 focus:border-[#8B6E28] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="p-1 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
          title="Remove this milestone"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hidden File Input for Direct Device Upload */}
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

      {/* Photo Selection Area: Direct Upload vs Preview */}
      {hasPhoto ? (
        /* State 1: Photo is selected/uploaded */
        <div className="flex items-center gap-3 p-2 rounded-xl bg-stone-50 border border-[#D4AF37]/40">
          <div
            className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-300 shrink-0 bg-stone-200 group cursor-pointer"
            onClick={() => onPreviewPhoto && onPreviewPhoto(milestone.photoUrl)}
            title="Click to zoom photo"
          >
            <img
              src={milestone.photoUrl}
              alt={`Milestone ${milestone.year}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Eye className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-xs font-semibold text-stone-800 truncate">
              {milestone.caption || `Year ${milestone.year} Photo`}
            </p>
            <p className="text-[10.5px] text-emerald-600 font-medium flex items-center gap-1">
              ✓ Direct photo attached
            </p>

            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2 py-1 rounded-md text-[11px] font-medium bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 flex items-center gap-1 transition cursor-pointer shadow-2xs"
              >
                <RefreshCw className="w-3 h-3 text-[#8B6E28]" />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={() => onUpdate('photoUrl', '')}
                className="px-2 py-1 rounded-md text-[11px] font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* State 2: No photo yet — Direct upload dropzone & click-to-upload */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-3.5 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-[#8B6E28] bg-[#FAF5E6]'
              : 'border-stone-300 hover:border-[#8B6E28] bg-stone-50/70 hover:bg-[#FAF8F5]'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-[#FAF3DF] flex items-center justify-center text-[#8B6E28] shadow-2xs">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-800">
                Click to add photo from gallery / computer
              </p>
              <p className="text-[10.5px] text-stone-500">
                Direct file upload (JPG, PNG, WebP) or drag & drop
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Caption Input */}
      <div>
        <input
          type="text"
          value={milestone.caption}
          onChange={(e) => onUpdate('caption', e.target.value)}
          placeholder="Caption (e.g. 16 Upvaas Tapasya / Varsitap Pārna)"
          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-700 focus:border-[#8B6E28] focus:outline-none"
        />
      </div>

      {/* Optional URL Toggle (for users who still want to paste an online link) */}
      <div className="pt-0.5">
        {!showUrlInput ? (
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="text-[10.5px] text-stone-400 hover:text-stone-600 flex items-center gap-1 transition"
          >
            <LinkIcon className="w-3 h-3" />
            <span>Or paste an image web link</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={milestone.photoUrl}
              onChange={(e) => onUpdate('photoUrl', e.target.value)}
              placeholder="Paste web URL (https://...)"
              className="flex-1 px-2.5 py-1 rounded-lg border border-stone-200 text-[11px] text-stone-700 focus:border-[#8B6E28] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="text-[11px] text-stone-400 hover:text-stone-600 px-1"
            >
              Hide
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
