import React, { useState } from 'react';
import { Music, Play, Pause, Check, Volume2, Sparkles, VolumeX, Upload, Link, Trash2, ShieldCheck, Disc } from 'lucide-react';
import { TAPASYA_SONGS, spiritualAudio } from '../utils/audio';

interface SongSelectorProps {
  selectedSongId?: string;
  customAudioUrl?: string;
  onSelectSong: (songId: string) => void;
  onUpdateCustomAudioUrl?: (url: string | null) => void;
}

export const SongSelector: React.FC<SongSelectorProps> = ({
  selectedSongId = 'reAavyaTapashvi',
  customAudioUrl = '',
  onSelectSong,
  onUpdateCustomAudioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(spiritualAudio.getStatus());
  const [tempUrlInput, setTempUrlInput] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);

  const handleSelect = (songId: string) => {
    onSelectSong(songId);
    if (songId === 'custom') {
      spiritualAudio.selectSong('custom', customAudioUrl);
      if (customAudioUrl) {
        spiritualAudio.start();
        setIsPlaying(true);
      } else {
        spiritualAudio.stop();
        setIsPlaying(false);
      }
    } else if (songId === 'none') {
      spiritualAudio.stop();
      setIsPlaying(false);
    } else {
      spiritualAudio.selectSong(songId);
      spiritualAudio.start();
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    if (selectedSongId === songId && spiritualAudio.getStatus()) {
      spiritualAudio.stop();
      setIsPlaying(false);
    } else {
      handleSelect(songId);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert('Please select an audio MP3 file smaller than 25MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const resultUrl = e.target?.result as string;
      if (resultUrl && onUpdateCustomAudioUrl) {
        onUpdateCustomAudioUrl(resultUrl);
        onSelectSong('custom');
        spiritualAudio.selectSong('custom', resultUrl);
        spiritualAudio.start();
        setIsPlaying(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUrl = () => {
    if (tempUrlInput.trim() && onUpdateCustomAudioUrl) {
      onUpdateCustomAudioUrl(tempUrlInput.trim());
      onSelectSong('custom');
      spiritualAudio.selectSong('custom', tempUrlInput.trim());
      spiritualAudio.start();
      setIsPlaying(true);
      setShowUrlInput(false);
      setTempUrlInput('');
    }
  };

  const handleRemoveCustomAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdateCustomAudioUrl) {
      onUpdateCustomAudioUrl(null);
    }
    if (selectedSongId === 'custom') {
      onSelectSong('reAavyaTapashvi');
      spiritualAudio.selectSong('reAavyaTapashvi');
      spiritualAudio.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F7F2E6] border border-[#D4AF37]/50 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#8B6E28]/15 flex items-center justify-center text-[#8B6E28]">
            <Music className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 font-cinzel flex items-center gap-1.5">
              <span>Background Stotra & Bhakti Songs</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </h3>
            <p className="text-xs text-stone-500">
              Select an in-built sacred song or upload your own custom audio track
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        {spiritualAudio.getStatus() && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B6E28]/15 border border-[#8B6E28]/30 text-xs font-semibold text-[#8B6E28]">
            <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#C98A3E]" />
            <span>Playing Background Audio</span>
          </div>
        )}
      </div>

      {/* Grid of 6 In-Built Real Songs + 1 Custom Upload + 1 Mute Option */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {/* IN-BUILT SONGS */}
        {TAPASYA_SONGS.map((song) => {
          const isSelected = selectedSongId === song.id;
          const isCurrentPlaying = isSelected && spiritualAudio.getStatus();

          return (
            <div
              key={song.id}
              onClick={() => handleSelect(song.id)}
              className={`relative p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#8B6E28] ring-2 ring-[#8B6E28]/20 shadow-md'
                  : 'bg-white/80 hover:bg-white border-stone-200/80 hover:border-[#D4AF37] shadow-2xs'
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#8B6E28] text-white'
                        : 'border border-stone-300 text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate leading-snug">
                      {song.titleGu}
                    </h4>
                    <p className="text-[11px] font-medium text-stone-500 truncate">
                      {song.titleEn}
                    </p>
                  </div>
                </div>

                {/* Listen / Preview Button */}
                <button
                  type="button"
                  onClick={(e) => handleTogglePlay(e, song.id)}
                  title={isCurrentPlaying ? 'Pause Audio' : 'Listen Song'}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition cursor-pointer ${
                    isCurrentPlaying
                      ? 'bg-[#8B6E28] text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-[#FAF3DF] text-stone-700 hover:text-[#8B6E28] border border-stone-200'
                  }`}
                >
                  {isCurrentPlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      <span className="text-[10px]">Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span className="text-[10px]">Listen</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Singer & Style Tag */}
              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-1 flex-wrap">
                <span className="text-[10.5px] font-semibold text-[#8B6E28]">
                  🎤 {song.singer}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF4E6] text-[#8C5D1F] font-medium border border-[#E0A458]/30">
                  {song.tag}
                </span>
              </div>
            </div>
          );
        })}

        {/* OPTION 7: CUSTOM USER AUDIO UPLOAD */}
        <div
          onClick={() => handleSelect('custom')}
          className={`relative p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
            selectedSongId === 'custom'
              ? 'bg-white border-[#8B6E28] ring-2 ring-[#8B6E28]/20 shadow-md'
              : 'bg-white/80 hover:bg-white border-stone-200/80 hover:border-[#D4AF37] shadow-2xs'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  selectedSongId === 'custom'
                    ? 'bg-[#8B6E28] text-white'
                    : 'border border-stone-300 text-transparent'
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1">
                  <span>Upload Own Song / Audio</span>
                  <Disc className="w-3.5 h-3.5 text-[#8B6E28] animate-spin" />
                </h4>
                <p className="text-[11px] font-medium text-stone-500 truncate">
                  Custom MP3 file or audio link
                </p>
              </div>
            </div>

            {/* Custom Play button if uploaded */}
            {customAudioUrl && (
              <button
                type="button"
                onClick={(e) => handleTogglePlay(e, 'custom')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition ${
                  selectedSongId === 'custom' && spiritualAudio.getStatus()
                    ? 'bg-[#8B6E28] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {selectedSongId === 'custom' && spiritualAudio.getStatus() ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span className="text-[10px]">Playing</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span className="text-[10px]">Listen</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Custom Upload Controls */}
          <div className="mt-2.5 pt-2 border-t border-stone-100">
            {customAudioUrl ? (
              <div className="flex items-center justify-between bg-[#F0FDF4] border border-green-300 rounded-lg p-1.5 text-xs text-green-800">
                <span className="flex items-center gap-1 font-semibold text-[11px] truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  <span className="truncate">Custom MP3 Audio Attached</span>
                </span>
                <button
                  type="button"
                  onClick={handleRemoveCustomAudio}
                  title="Remove custom track"
                  className="p-1 text-red-500 hover:text-red-700 transition cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1.5 rounded-lg bg-[#8B6E28] hover:bg-[#6E551E] text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose MP3 File</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUrlInput(!showUrlInput);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[11px] font-bold text-stone-700 flex items-center gap-1 cursor-pointer transition"
                >
                  <Link className="w-3 h-3 text-[#8B6E28]" />
                  <span>Paste Link</span>
                </button>
              </div>
            )}

            {/* Inline Link Input Box */}
            {showUrlInput && !customAudioUrl && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-2 p-2 bg-stone-50 border border-stone-300 rounded-lg space-y-1.5"
              >
                <input
                  type="url"
                  value={tempUrlInput}
                  onChange={(e) => setTempUrlInput(e.target.value)}
                  placeholder="https://.../my-audio.mp3"
                  className="w-full px-2.5 py-1 text-xs border rounded bg-white"
                />
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(false)}
                    className="px-2 py-0.5 text-[10px] rounded bg-stone-200 text-stone-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveUrl}
                    className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-[#8B6E28] text-white"
                  >
                    Save Audio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* OPTION 8: MUTE OPTION */}
        <div
          onClick={() => handleSelect('none')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            selectedSongId === 'none'
              ? 'bg-white border-stone-400 ring-2 ring-stone-300 shadow-md'
              : 'bg-white/60 hover:bg-white border-stone-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                selectedSongId === 'none'
                  ? 'bg-stone-700 text-white'
                  : 'border border-stone-300 text-transparent'
              }`}
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-800">
                No Background Music (Mute)
              </h4>
              <p className="text-[11px] text-stone-400">
                Keep invitation silent by default
              </p>
            </div>
          </div>
          <VolumeX className="w-4 h-4 text-stone-400 shrink-0" />
        </div>
      </div>
    </div>
  );
};
