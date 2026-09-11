import React, { useState } from 'react';
import { Music, Play, Pause, Check, Volume2, Sparkles, VolumeX, Link, RotateCcw } from 'lucide-react';
import { TAPASYA_SONGS, spiritualAudio } from '../utils/audio';

interface SongSelectorProps {
  selectedSongId?: string;
  onSelectSong: (songId: string) => void;
}

export const SongSelector: React.FC<SongSelectorProps> = ({
  selectedSongId = 'reAavyaTapashvi',
  onSelectSong,
}) => {
  const [previewingSongId, setPreviewingSongId] = useState<string | null>(null);
  const [customAudioUrl, setCustomAudioUrl] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  const handlePreviewSong = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    if (previewingSongId === songId && spiritualAudio.getStatus()) {
      spiritualAudio.stop();
      setPreviewingSongId(null);
    } else {
      spiritualAudio.selectSong(songId);
      spiritualAudio.start();
      setPreviewingSongId(songId);
    }
  };

  const handleChooseSong = (songId: string) => {
    onSelectSong(songId);
    spiritualAudio.selectSong(songId);
    if (!spiritualAudio.getStatus() && songId !== 'none') {
      spiritualAudio.start();
      setPreviewingSongId(songId);
    }
  };

  const handleApplyCustomUrl = () => {
    if (customAudioUrl.trim()) {
      spiritualAudio.setCustomAudioUrl(customAudioUrl.trim());
      spiritualAudio.start();
      setPreviewingSongId(selectedSongId);
    }
  };

  const handleResetCustomUrl = () => {
    setCustomAudioUrl('');
    spiritualAudio.setCustomAudioUrl(null);
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
              Pick a sacred song for your invitation (Plays when guests open the website)
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {TAPASYA_SONGS.map((song) => {
          const isSelected = selectedSongId === song.id;
          const isPreviewing = previewingSongId === song.id && spiritualAudio.getStatus();

          return (
            <div
              key={song.id}
              onClick={() => handleChooseSong(song.id)}
              className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#8B6E28] ring-2 ring-[#8B6E28]/20 shadow-md'
                  : 'bg-white/80 hover:bg-white border-stone-200/80 hover:border-[#D4AF37] shadow-2xs'
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
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
                  className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition ${
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

              {/* Bottom details */}
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between gap-1 flex-wrap">
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

        {/* Option for No Music / Mute */}
        <div
          onClick={() => handleChooseSong('none')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
            selectedSongId === 'none'
              ? 'bg-white border-stone-400 ring-2 ring-stone-300 shadow-md'
              : 'bg-white/60 hover:bg-white border-stone-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2">
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

      {/* Optional Custom Audio URL Section */}
      <div className="pt-2 border-t border-[#D4AF37]/30">
        <button
          type="button"
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="text-xs font-semibold text-[#8B6E28] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <Link className="w-3.5 h-3.5" />
          <span>{showCustomInput ? 'Hide Custom Audio URL Input' : 'Have your own song MP3 link? (Optional)'}</span>
        </button>

        {showCustomInput && (
          <div className="mt-2.5 p-3 rounded-xl bg-white border border-[#D4AF37]/40 space-y-2">
            <label className="block text-xs font-bold text-stone-800">
              Paste Direct Audio / MP3 Stream URL:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={customAudioUrl}
                onChange={(e) => setCustomAudioUrl(e.target.value)}
                placeholder="https://domain.com/my-tapasya-song.mp3"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#8B6E28]"
              />
              <button
                type="button"
                onClick={handleApplyCustomUrl}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#8B6E28] text-white hover:bg-[#6E551E] transition cursor-pointer"
              >
                Test & Play
              </button>
              {customAudioUrl && (
                <button
                  type="button"
                  onClick={handleResetCustomUrl}
                  title="Reset to default song"
                  className="p-1.5 text-stone-500 hover:text-stone-800 transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[11px] text-stone-500">
              Supports any direct `.mp3` or audio link from Google Drive, Dropbox, Archive.org, or your server.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
