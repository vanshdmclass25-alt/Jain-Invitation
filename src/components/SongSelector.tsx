import React, { useState } from 'react';
import { Music, Play, Pause, Check, Volume2, Sparkles, VolumeX, Upload, Link, Trash2, ShieldCheck } from 'lucide-react';
import { TAPASYA_SONGS, spiritualAudio } from '../utils/audio';

interface SongSelectorProps {
  selectedSongId?: string;
  songAudioUrls?: Record<string, string>;
  onSelectSong: (songId: string) => void;
  onUpdateSongAudioUrl?: (songId: string, url: string | null) => void;
}

export const SongSelector: React.FC<SongSelectorProps> = ({
  selectedSongId = 'reAavyaTapashvi',
  songAudioUrls = {},
  onSelectSong,
  onUpdateSongAudioUrl,
}) => {
  const [previewingSongId, setPreviewingSongId] = useState<string | null>(null);
  const [activeUrlInputSongId, setActiveUrlInputSongId] = useState<string | null>(null);
  const [tempUrlInput, setTempUrlInput] = useState<string>('');

  const handlePreviewSong = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    const customUrl = songAudioUrls[songId];
    if (previewingSongId === songId && spiritualAudio.getStatus()) {
      spiritualAudio.stop();
      setPreviewingSongId(null);
    } else {
      spiritualAudio.selectSong(songId, customUrl);
      spiritualAudio.start();
      setPreviewingSongId(songId);
    }
  };

  const handleChooseSong = (songId: string) => {
    onSelectSong(songId);
    const customUrl = songAudioUrls[songId];
    spiritualAudio.selectSong(songId, customUrl);
    if (!spiritualAudio.getStatus() && songId !== 'none') {
      spiritualAudio.start();
      setPreviewingSongId(songId);
    }
  };

  const handleFileUpload = (songId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      alert('Please select an audio MP3 file smaller than 20MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const resultUrl = e.target?.result as string;
      if (resultUrl && onUpdateSongAudioUrl) {
        onUpdateSongAudioUrl(songId, resultUrl);
        spiritualAudio.selectSong(songId, resultUrl);
        spiritualAudio.start();
        setPreviewingSongId(songId);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUrl = (songId: string) => {
    if (tempUrlInput.trim() && onUpdateSongAudioUrl) {
      onUpdateSongAudioUrl(songId, tempUrlInput.trim());
      spiritualAudio.selectSong(songId, tempUrlInput.trim());
      spiritualAudio.start();
      setPreviewingSongId(songId);
    }
    setActiveUrlInputSongId(null);
    setTempUrlInput('');
  };

  const handleRemoveCustomAudio = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    if (onUpdateSongAudioUrl) {
      onUpdateSongAudioUrl(songId, null);
    }
    spiritualAudio.selectSong(songId, null);
    spiritualAudio.start();
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
              <span>Background Stotra / Bhakti Song</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </h3>
            <p className="text-xs text-stone-500">
              Pick a sacred song or upload your original MP3 track for guests
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        {spiritualAudio.getStatus() && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B6E28]/15 border border-[#8B6E28]/30 text-xs font-semibold text-[#8B6E28]">
            <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#C98A3E]" />
            <span>Playing Preview</span>
          </div>
        )}
      </div>

      {/* Song List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {TAPASYA_SONGS.map((song) => {
          const isSelected = selectedSongId === song.id;
          const isPreviewing = previewingSongId === song.id && spiritualAudio.getStatus();
          const customUrl = songAudioUrls[song.id];

          return (
            <div
              key={song.id}
              onClick={() => handleChooseSong(song.id)}
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

                {/* Preview Play Button */}
                <button
                  type="button"
                  onClick={(e) => handlePreviewSong(e, song.id)}
                  title={isPreviewing ? 'Stop Preview' : 'Listen Preview'}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition ${
                    isPreviewing
                      ? 'bg-[#8B6E28] text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-[#FAF3DF] text-stone-700 hover:text-[#8B6E28] border border-stone-200'
                  }`}
                >
                  {isPreviewing ? (
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

              {/* Singer & Tag */}
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between gap-1 flex-wrap">
                <span className="text-[10.5px] font-semibold text-[#8B6E28]">
                  🎤 {song.singer}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF4E6] text-[#8C5D1F] font-medium border border-[#E0A458]/30">
                  {song.tag}
                </span>
              </div>

              {/* Attached Audio Status or Upload MP3 Button */}
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between gap-2 flex-wrap">
                {customUrl ? (
                  <div className="flex items-center justify-between w-full bg-[#F0FDF4] border border-green-300 rounded-lg p-1.5 text-xs text-green-800">
                    <span className="flex items-center gap-1 font-semibold text-[11px] truncate">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>Custom MP3 Track Attached</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleRemoveCustomAudio(e, song.id)}
                      title="Remove custom MP3"
                      className="p-1 text-red-500 hover:text-red-700 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full justify-end">
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className="px-2 py-1 rounded-md bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[10px] font-bold text-stone-700 flex items-center gap-1 cursor-pointer transition"
                    >
                      <Upload className="w-3 h-3 text-[#8B6E28]" />
                      <span>Upload Original MP3</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleFileUpload(song.id, e)}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveUrlInputSongId(activeUrlInputSongId === song.id ? null : song.id);
                        setTempUrlInput('');
                      }}
                      className="px-2 py-1 rounded-md bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[10px] font-bold text-stone-700 flex items-center gap-1 cursor-pointer transition"
                    >
                      <Link className="w-3 h-3 text-[#8B6E28]" />
                      <span>Paste MP3 Link</span>
                    </button>
                  </div>
                )}

                {/* Inline URL Input Box */}
                {activeUrlInputSongId === song.id && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full mt-2 p-2 bg-stone-50 border border-stone-300 rounded-lg space-y-1.5"
                  >
                    <input
                      type="url"
                      value={tempUrlInput}
                      onChange={(e) => setTempUrlInput(e.target.value)}
                      placeholder="https://.../song.mp3"
                      className="w-full px-2 py-1 text-xs border rounded bg-white"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActiveUrlInputSongId(null)}
                        className="px-2 py-0.5 text-[10px] rounded bg-stone-200 text-stone-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveUrl(song.id)}
                        className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#8B6E28] text-white"
                      >
                        Save Track
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Option for No Music / Mute */}
        <div
          onClick={() => handleChooseSong('none')}
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
