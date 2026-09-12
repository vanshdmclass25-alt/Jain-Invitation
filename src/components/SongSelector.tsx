import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Check, Volume2, Sparkles, VolumeX, Upload, Link, Trash2, ShieldCheck, Disc } from 'lucide-react';
import { TAPASYA_SONGS, spiritualAudio } from '../utils/audio';

interface SongSelectorProps {
  selectedSongId?: string;
  customAudioUrl?: string;
  songAudioUrls?: Record<string, string>;
  onSelectSong: (songId: string) => void;
  onUpdateCustomAudioUrl?: (url: string | null) => void;
  onUpdateSongAudioUrl?: (songId: string, url: string | null) => void;
}

export const SongSelector: React.FC<SongSelectorProps> = ({
  selectedSongId = 'reAavyaTapashvi',
  customAudioUrl = '',
  songAudioUrls = {},
  onSelectSong,
  onUpdateCustomAudioUrl,
  onUpdateSongAudioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(spiritualAudio.getStatus());
  const [activeUrlInputSongId, setActiveUrlInputSongId] = useState<string | null>(null);
  const [tempUrlInput, setTempUrlInput] = useState<string>('');

  useEffect(() => {
    const update = () => {
      setIsPlaying(spiritualAudio.getStatus());
    };
    update();
    const unsub = spiritualAudio.subscribe(update);
    return unsub;
  }, []);

  const handleSelect = (songId: string) => {
    onSelectSong(songId);
    const customUrl = songId === 'custom' ? customAudioUrl : songAudioUrls[songId];
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
      spiritualAudio.selectSong(songId, customUrl);
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

  const handleSaveUrl = (songId: string) => {
    if (tempUrlInput.trim()) {
      const url = tempUrlInput.trim();
      if (songId === 'custom') {
        if (onUpdateCustomAudioUrl) onUpdateCustomAudioUrl(url);
      } else {
        if (onUpdateSongAudioUrl) onUpdateSongAudioUrl(songId, url);
      }
      onSelectSong(songId);
      spiritualAudio.selectSong(songId, url);
      spiritualAudio.start();
      setIsPlaying(true);
      setActiveUrlInputSongId(null);
      setTempUrlInput('');
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
              Pick a song below or paste/upload your exact MP3 audio link for any track
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

      {/* Grid of 6 Songs + Custom Upload + Mute */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {TAPASYA_SONGS.map((song) => {
          const isSelected = selectedSongId === song.id;
          const isCurrentPlaying = isSelected && spiritualAudio.getStatus();
          const songCustomUrl = songAudioUrls[song.id];

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

                {/* Listen / Play Button */}
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

              {/* Singer Tag & Custom MP3 Link Controls */}
              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-1 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10.5px] font-semibold text-[#8B6E28]">
                    🎤 {song.singer}
                  </span>
                  {(() => {
                    const resolvedUrl = spiritualAudio.getResolvedAudioUrl(song.id);
                    const val = spiritualAudio.getValidationInfo(resolvedUrl);
                    if (val?.isFullLength) {
                      return (
                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-800 border border-green-200">
                          ✓ Full Track ({val.formattedDuration})
                        </span>
                      );
                    }
                    return null;
                  })()}
                </div>

                <div className="flex items-center gap-1">

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveUrlInputSongId(activeUrlInputSongId === song.id ? null : song.id);
                      setTempUrlInput(songCustomUrl || '');
                    }}
                    title="Paste direct MP3 URL"
                    className="p-1 rounded bg-stone-100 hover:bg-[#FAF3DF] text-stone-600 hover:text-[#8B6E28] border border-stone-200 text-[10px] flex items-center gap-0.5 cursor-pointer"
                  >
                    <Link className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Show Custom Attached URL Badge */}
              {songCustomUrl && (
                <div className="mt-1.5 p-1 bg-green-50 border border-green-200 rounded text-[10px] text-green-700 flex items-center justify-between">
                  <span className="truncate font-medium">Custom MP3 set</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onUpdateSongAudioUrl) onUpdateSongAudioUrl(song.id, null);
                    }}
                    className="text-red-500 font-bold ml-1 hover:underline"
                  >
                    Reset
                  </button>
                </div>
              )}

              {/* Inline URL Input */}
              {activeUrlInputSongId === song.id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 p-2 bg-stone-50 border border-stone-300 rounded-lg space-y-1.5"
                >
                  <input
                    type="url"
                    value={tempUrlInput}
                    onChange={(e) => setTempUrlInput(e.target.value)}
                    placeholder="Paste exact MP3 link (https://...)"
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
                      className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-[#8B6E28] text-white"
                    >
                      Save MP3 Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* OPTION 7: CUSTOM AUDIO */}
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
                  <span>Any Custom MP3 Track</span>
                  <Disc className="w-3.5 h-3.5 text-[#8B6E28]" />
                </h4>
                <p className="text-[11px] font-medium text-stone-500 truncate">
                  Upload custom audio file
                </p>
              </div>
            </div>

            {customAudioUrl && (
              <button
                type="button"
                onClick={(e) => handleTogglePlay(e, 'custom')}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#8B6E28] text-white"
              >
                {selectedSongId === 'custom' && spiritualAudio.getStatus() ? 'Playing' : 'Listen'}
              </button>
            )}
          </div>

          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveUrlInputSongId(activeUrlInputSongId === 'custom' ? null : 'custom');
                setTempUrlInput(customAudioUrl || '');
              }}
              title="Paste direct MP3 URL"
              className="p-1 rounded bg-stone-100 hover:bg-[#FAF3DF] text-stone-600 hover:text-[#8B6E28] border border-stone-200 text-[10px] flex items-center gap-0.5 cursor-pointer"
            >
              <Link className="w-3 h-3" />
              <span>Paste Custom MP3 Link</span>
            </button>
          </div>
          {/* Show Custom Attached URL Badge */}
          {customAudioUrl && (
            <div className="mt-1.5 p-1 bg-green-50 border border-green-200 rounded text-[10px] text-green-700 flex items-center justify-between">
              <span className="truncate font-medium max-w-[200px]">{customAudioUrl}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onUpdateCustomAudioUrl) onUpdateCustomAudioUrl('');
                }}
                className="text-red-500 font-bold ml-1 hover:underline shrink-0"
              >
                Clear
              </button>
            </div>
          )}
          {/* Inline URL Input */}
          {activeUrlInputSongId === 'custom' && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-2 p-2 bg-stone-50 border border-stone-300 rounded-lg space-y-1.5"
            >
              <input
                type="url"
                value={tempUrlInput}
                onChange={(e) => setTempUrlInput(e.target.value)}
                placeholder="Paste exact MP3 link (https://...)"
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
                  onClick={() => handleSaveUrl('custom')}
                  className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-[#8B6E28] text-white"
                >
                  Save MP3 Link
                </button>
              </div>
            </div>
          )}
        </div>

        {/* OPTION 8: MUTE */}
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
