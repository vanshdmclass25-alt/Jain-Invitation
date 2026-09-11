import { TapasyaSong } from '../types';

export interface SongValidationInfo {
  status: 'unverified' | 'validating' | 'verified_full' | 'error';
  durationSeconds: number;
  formattedDuration: string;
  isFullLength: boolean;
  error?: string;
}

/**
 * 6 Authentic Jain Tapasya Stotra / Bhakti Songs
 * Selected as optional background audio for all invitation templates.
 */
export const TAPASYA_SONGS: TapasyaSong[] = [
  {
    id: 'reAavyaTapashvi',
    titleGu: 'રે આવ્યા તપસ્વી',
    titleEn: 'Re Aavya Tapashvi',
    singer: 'Gautam Baria',
    lyricistMusic: 'Pu. Sa. Bhavyagnarekha Shriji M.S.',
    tag: 'Festive Dholak & Flute',
    key: 'D Major',
    ragaStyle: 'Bilaval / Garba Utsav',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  },
  {
    id: 'tapasviNeVandana',
    titleGu: 'તપસ્વી ને વંદના',
    titleEn: 'Tapasvi Ne Vandana',
    singer: 'Vansh Jodhavat',
    lyricistMusic: 'Pu. Sa. RiddhiRekha Shriji M.S.',
    tag: 'Soulful Santoor & Flute',
    key: 'A Minor',
    ragaStyle: 'Bhairavi',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  },
  {
    id: 'tapasyaJordar',
    titleGu: 'તપસ્યા જોરદાર',
    titleEn: 'Tapasya Jordar',
    singer: 'Vaibhav Bagmar & Jagrati Vadera',
    lyricistMusic: 'Mohit Soni',
    tag: 'Upbeat Celebration',
    key: 'G Major',
    ragaStyle: 'Yaman / Utsav',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73562.mp3',
  },
  {
    id: 'tapasviKhammaGhani',
    titleGu: 'તપસ્વી ને ખમ્મા ઘણી (Khamma Ghani 2.0)',
    titleEn: 'Tapasvi Ne Khamma Ghani (2.0)',
    singer: 'Neha Oswal',
    lyricistMusic: 'Mohit Soni (VM Music)',
    tag: 'Royal Marwari Shehnai',
    key: 'E Minor',
    ragaStyle: 'Desh / Rajwada',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_993f3c11ec.mp3',
  },
  {
    id: 'jaiHoTapasvi',
    titleGu: 'જય હો તપસ્વી',
    titleEn: 'Jai Ho Tapasvi',
    singer: 'Vicky D Parekh',
    lyricistMusic: 'Vicky D Parekh',
    tag: 'Melodious Bhakti Anthem',
    key: 'F Major',
    ragaStyle: 'Khamaj',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/07/audio_4a682a20b7.mp3',
  },
  {
    id: 'tapasviNaTapNeVandan',
    titleGu: 'તપસ્વી ના તપ ને વંદન',
    titleEn: 'Tapasvi Na Tap Ne Vandan',
    singer: 'Rajsundar Vijayji',
    lyricistMusic: 'Raj Vihar',
    tag: 'Sacred Temple Stotra',
    key: 'C Major',
    ragaStyle: 'Bhoopali',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_a43878b76c.mp3',
  },
];

class AmbientSpiritualAudio {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying = false;
  private currentSongId = 'reAavyaTapashvi';
  private customAudioUrl: string | null = null;
  private songAudioUrls: Record<string, string> = {};
  private songValidationCache: Map<string, SongValidationInfo> = new Map();
  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public getSongId(): string {
    return this.currentSongId;
  }

  public setSongAudioUrls(map: Record<string, string>) {
    this.songAudioUrls = map || {};
    this.notify();
  }

  public setCustomAudioUrl(url: string | null) {
    this.customAudioUrl = url;
    if (this.isPlaying) {
      this.stop();
      this.start();
    } else {
      this.notify();
    }
  }

  public getCurrentSong(): TapasyaSong {
    return (
      TAPASYA_SONGS.find((s) => s.id === this.currentSongId) || TAPASYA_SONGS[0]
    );
  }

  /**
   * Resolves the direct, verified audio URL for any given song ID.
   */
  public getResolvedAudioUrl(songId: string): string | null {
    if (songId === 'none') return null;
    if (songId === 'custom') return this.customAudioUrl;
    if (this.songAudioUrls[songId]) return this.songAudioUrls[songId];
    const defaultSong = TAPASYA_SONGS.find((s) => s.id === songId);
    return defaultSong?.audioUrl || null;
  }

  public selectSong(songId: string, customUrl?: string | null) {
    if (customUrl !== undefined) {
      this.customAudioUrl = customUrl;
    }
    if (this.currentSongId === songId && this.isPlaying && customUrl === undefined) return;
    this.currentSongId = songId;
    if (this.isPlaying) {
      this.stop();
      this.start();
    } else {
      this.notify();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  /**
   * Validates if the given URL points to a full-length audio track (> 30s)
   */
  public async validateTrack(url: string): Promise<SongValidationInfo> {
    if (!url) {
      return {
        status: 'error',
        durationSeconds: 0,
        formattedDuration: '0:00',
        isFullLength: false,
        error: 'No audio URL provided',
      };
    }

    if (this.songValidationCache.has(url)) {
      return this.songValidationCache.get(url)!;
    }

    return new Promise((resolve) => {
      const tempAudio = new Audio();
      tempAudio.preload = 'metadata';

      const cleanup = () => {
        tempAudio.removeEventListener('loadedmetadata', onLoaded);
        tempAudio.removeEventListener('error', onError);
      };

      const onLoaded = () => {
        cleanup();
        const dur = tempAudio.duration || 0;
        const mins = Math.floor(dur / 60);
        const secs = Math.floor(dur % 60);
        const formatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        const isFullLength = dur > 30; // Must be full track (> 30 sec)

        const result: SongValidationInfo = {
          status: isFullLength ? 'verified_full' : 'unverified',
          durationSeconds: dur,
          formattedDuration: formatted,
          isFullLength,
        };

        this.songValidationCache.set(url, result);
        this.notify();
        resolve(result);
      };

      const onError = () => {
        cleanup();
        const result: SongValidationInfo = {
          status: 'error',
          durationSeconds: 0,
          formattedDuration: '0:00',
          isFullLength: false,
          error: 'Failed to load audio metadata',
        };
        this.songValidationCache.set(url, result);
        this.notify();
        resolve(result);
      };

      tempAudio.addEventListener('loadedmetadata', onLoaded);
      tempAudio.addEventListener('error', onError);
      tempAudio.src = url;
    });
  }

  public getValidationInfo(url: string | null): SongValidationInfo | null {
    if (!url) return null;
    return this.songValidationCache.get(url) || null;
  }

  public start() {
    if (this.currentSongId === 'none') {
      this.stop();
      return;
    }

    this.stop(); // Clean slate

    const streamUrl = this.getResolvedAudioUrl(this.currentSongId);

    if (!streamUrl) {
      this.isPlaying = false;
      this.notify();
      return;
    }

    // Trigger metadata duration validation in background
    this.validateTrack(streamUrl);

    try {
      if (!this.audioElement) {
        this.audioElement = new Audio();
        this.audioElement.loop = true;
        this.audioElement.volume = 0.6;
      }

      this.audioElement.src = streamUrl;

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            console.warn('Audio playback requires user interaction or stream failed:', err);
            this.isPlaying = false;
            this.notify();
          });
      } else {
        this.isPlaying = true;
        this.notify();
      }
    } catch (err) {
      console.warn('Audio start error:', err);
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    this.isPlaying = false;

    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch {
        /* noop */
      }
    }
    this.notify();
  }
}

export const spiritualAudio = new AmbientSpiritualAudio();

// Shared AudioContext singleton for authentic temple bell chime (Ghanti)
let sharedChimeCtx: AudioContext | null = null;

function getSharedChimeContext(): AudioContext | null {
  try {
    if (!sharedChimeCtx || sharedChimeCtx.state === 'closed') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return null;
      sharedChimeCtx = new AudioCtx();
    }
    if (sharedChimeCtx.state === 'suspended') {
      sharedChimeCtx.resume();
    }
    return sharedChimeCtx;
  } catch {
    return null;
  }
}

/**
 * Plays a sacred temple bell (Ghanti) chime with realistic bronze resonance.
 */
export function playTempleBellChime() {
  try {
    const ctx = getSharedChimeContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const partials = [
      { freq: 528, gain: 0.38, decay: 2.6 },
      { freq: 1056, gain: 0.22, decay: 2.0 },
      { freq: 1584, gain: 0.14, decay: 1.5 },
      { freq: 2112, gain: 0.08, decay: 1.1 },
    ];

    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.998, now + decay);

      gainNode.gain.setValueAtTime(gain, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch (err) {
    console.warn('Temple chime play notice:', err);
  }
}
