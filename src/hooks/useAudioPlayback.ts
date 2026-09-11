import { useState, useEffect } from 'react';
import { spiritualAudio, TAPASYA_SONGS, SongValidationInfo } from '../utils/audio';

export function useAudioPlayback(
  selectedSongId: string = 'reAavyaTapashvi',
  customAudioUrl?: string,
  songAudioUrls?: Record<string, string>
) {
  const [isPlaying, setIsPlaying] = useState(spiritualAudio.getStatus());
  const [currentSongId, setCurrentSongId] = useState(spiritualAudio.getSongId());
  const [validationInfo, setValidationInfo] = useState<SongValidationInfo | null>(null);

  // Synchronize audio configuration
  useEffect(() => {
    if (songAudioUrls) {
      spiritualAudio.setSongAudioUrls(songAudioUrls);
    }
    if (customAudioUrl !== undefined) {
      spiritualAudio.setCustomAudioUrl(customAudioUrl || null);
    }
  }, [songAudioUrls, customAudioUrl]);

  // Subscribe to audio engine status changes
  useEffect(() => {
    const update = () => {
      setIsPlaying(spiritualAudio.getStatus());
      setCurrentSongId(spiritualAudio.getSongId());

      const url = spiritualAudio.getResolvedAudioUrl(spiritualAudio.getSongId());
      if (url) {
        const info = spiritualAudio.getValidationInfo(url);
        setValidationInfo(info);
      } else {
        setValidationInfo(null);
      }
    };

    update();
    const unsubscribe = spiritualAudio.subscribe(update);
    return unsubscribe;
  }, [selectedSongId]);

  // Trigger track validation whenever current song changes
  useEffect(() => {
    const url = spiritualAudio.getResolvedAudioUrl(selectedSongId);
    if (url) {
      spiritualAudio.validateTrack(url).then((info) => {
        setValidationInfo(info);
      });
    }
  }, [selectedSongId, customAudioUrl, songAudioUrls]);

  const toggleSound = () => {
    spiritualAudio.selectSong(selectedSongId, customAudioUrl);
    const active = spiritualAudio.toggle();
    setIsPlaying(active);
    return active;
  };

  const selectSong = (songId: string) => {
    spiritualAudio.selectSong(songId, customAudioUrl);
    if (!spiritualAudio.getStatus() && songId !== 'none') {
      spiritualAudio.start();
      setIsPlaying(true);
    } else if (songId === 'none') {
      spiritualAudio.stop();
      setIsPlaying(false);
    }
  };

  const currentSong =
    TAPASYA_SONGS.find((s) => s.id === currentSongId) || TAPASYA_SONGS[0];

  return {
    isPlaying,
    currentSongId,
    currentSong,
    validationInfo,
    toggleSound,
    selectSong,
  };
}
