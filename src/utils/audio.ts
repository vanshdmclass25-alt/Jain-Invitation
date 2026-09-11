import { TapasyaSong } from '../types';

export interface SongValidationInfo {
  status: 'unverified' | 'validating' | 'verified_full' | 'error';
  durationSeconds: number;
  formattedDuration: string;
  isFullLength: boolean;
  error?: string;
}

/**
 * Transforms standard cloud storage URLs (Google Drive, Dropbox, OneDrive) into direct audio proxy stream links.
 */
export function formatAudioUrl(url: string | null | undefined): string {
  if (!url) return '';

  const cleanUrl = url.trim();

  // If already relative audio proxy URL
  if (cleanUrl.startsWith('/api/audio-proxy')) {
    return cleanUrl;
  }

  // Handle Google Drive links
  if (cleanUrl.includes('drive.google.com') || cleanUrl.includes('docs.google.com')) {
    const fileIdMatch =
      cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      cleanUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `/api/audio-proxy?id=${fileIdMatch[1]}`;
    }
  }

  // Handle Dropbox share links
  if (cleanUrl.includes('dropbox.com')) {
    const rawUrl = cleanUrl.replace('?dl=0', '?raw=1').replace('&dl=0', '&raw=1');
    return `/api/audio-proxy?url=${encodeURIComponent(rawUrl)}`;
  }

  return cleanUrl;
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
    audioUrl: '/api/audio-proxy?id=1F6ku-wm0rykq8T4Ok1NjupacAaH-yIV3',
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
    audioUrl: '/api/audio-proxy?id=1-fSRnncBFvqx4nMrJxW6mSRNSq6RAQjT',
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
    audioUrl: '/api/audio-proxy?id=1GMGaL40_eMqcY78PdzN4QH7c-GeME9ob',
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
    audioUrl: '/api/audio-proxy?id=1lp74SJl60H3ZObpflkR_lUcMfowEySK3',
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
    audioUrl: '/api/audio-proxy?id=1fucjYLjDm16aXdj4cWfVf30S5-tb7dsa',
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
    audioUrl: '/api/audio-proxy?id=1wfixCxW033KX9BHAOya7ROxNwucd2j12',
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
   * Resolves the direct, formatted audio URL for any given song ID.
   */
  public getResolvedAudioUrl(songId: string): string | null {
    if (songId === 'none') return null;
    if (songId === 'custom') return formatAudioUrl(this.customAudioUrl);
    if (this.songAudioUrls[songId]) return formatAudioUrl(this.songAudioUrls[songId]);
    const defaultSong = TAPASYA_SONGS.find((s) => s.id === songId);
    return formatAudioUrl(defaultSong?.audioUrl) || null;
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
   * Validates if the given URL points to a full-length audio track
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

    const formattedUrl = formatAudioUrl(url);

    if (this.songValidationCache.has(formattedUrl)) {
      return this.songValidationCache.get(formattedUrl)!;
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
        const isFullLength = dur > 15; // Full track validation

        const result: SongValidationInfo = {
          status: isFullLength ? 'verified_full' : 'unverified',
          durationSeconds: dur,
          formattedDuration: formatted,
          isFullLength,
        };

        this.songValidationCache.set(formattedUrl, result);
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
          error: 'Failed to load audio. Please paste direct MP3 or Google Drive link.',
        };
        this.songValidationCache.set(formattedUrl, result);
        this.notify();
        resolve(result);
      };

      tempAudio.addEventListener('loadedmetadata', onLoaded);
      tempAudio.addEventListener('error', onError);
      tempAudio.src = formattedUrl;
    });
  }

  public getValidationInfo(url: string | null): SongValidationInfo | null {
    if (!url) return null;
    const formattedUrl = formatAudioUrl(url);
    return this.songValidationCache.get(formattedUrl) || null;
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

    // Trigger metadata duration validation
    this.validateTrack(streamUrl);

    try {
      if (!this.audioElement) {
        this.audioElement = new Audio();
        this.audioElement.loop = true;
        this.audioElement.volume = 0.65;
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
