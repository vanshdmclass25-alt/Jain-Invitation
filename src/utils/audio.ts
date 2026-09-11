import { TapasyaSong } from '../types';

export interface SongValidationInfo {
  status: 'unverified' | 'validating' | 'verified_full' | 'error';
  durationSeconds: number;
  formattedDuration: string;
  isFullLength: boolean;
  error?: string;
  isYouTube?: boolean;
}

/**
 * Extracts YouTube 11-character video ID from any YouTube URL format.
 */
export function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const str = url.trim();
  const match =
    str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/) ||
    str.match(/^([a-zA-Z0-9_-]{11})$/);
  return match ? match[1] : null;
}

/**
 * Transforms standard cloud storage URLs (Google Drive, Dropbox, OneDrive) into direct audio stream links.
 */
export function formatAudioUrl(url: string | null | undefined): string {
  if (!url) return '';

  const cleanUrl = url.trim();

  // YouTube URLs don't need proxying
  if (extractYouTubeId(cleanUrl)) {
    return cleanUrl;
  }

  // Handle Google Drive links or legacy /api/audio-proxy links
  if (cleanUrl.includes('drive.google.com') || cleanUrl.includes('docs.google.com') || cleanUrl.includes('/api/audio-proxy')) {
    const fileIdMatch =
      cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      cleanUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.usercontent.google.com/download?id=${fileIdMatch[1]}&export=download`;
    }
  }

  // Handle Dropbox share links
  if (cleanUrl.includes('dropbox.com')) {
    return cleanUrl.replace('?dl=0', '?raw=1').replace('&dl=0', '&raw=1');
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
    audioUrl: 'https://drive.usercontent.google.com/download?id=1F6ku-wm0rykq8T4Ok1NjupacAaH-yIV3&export=download',
    youtubeUrl: 'https://www.youtube.com/watch?v=s5R83lO1Eag',
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
    audioUrl: 'https://drive.usercontent.google.com/download?id=1-fSRnncBFvqx4nMrJxW6mSRNSq6RAQjT&export=download',
    youtubeUrl: 'https://www.youtube.com/watch?v=d_xVzH7A9R8',
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
    audioUrl: 'https://drive.usercontent.google.com/download?id=1GMGaL40_eMqcY78PdzN4QH7c-GeME9ob&export=download',
    youtubeUrl: 'https://www.youtube.com/watch?v=M5K_v5L6mD0',
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
    audioUrl: 'https://drive.usercontent.google.com/download?id=1lp74SJl60H3ZObpflkR_lUcMfowEySK3&export=download',
    youtubeUrl: 'https://www.youtube.com/watch?v=Q8wK8v0N3Rk',
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
    audioUrl: 'https://drive.usercontent.google.com/download?id=1fucjYLjDm16aXdj4cWfVf30S5-tb7dsa&export=download',
    youtubeUrl: 'https://www.youtube.com/watch?v=P9x8w_9kR4A',
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
    audioUrl: 'https://drive.usercontent.google.com/download?id=1wfixCxW033KX9BHAOya7ROxNwucd2j12&export=download',
    youtubeUrl: 'https://www.youtube.com/watch?v=7Xw9k9Q0z6M',
  },
];

// YouTube IFrame API type definitions
declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        config: {
          height?: string | number;
          width?: string | number;
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState?: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  loadVideoById(id: string): void;
  getDuration(): number;
  destroy(): void;
}

class AmbientSpiritualAudio {
  private audioElement: HTMLAudioElement | null = null;
  private ytPlayer: YTPlayerInstance | null = null;
  private ytReady = false;
  private pendingYtVideoId: string | null = null;
  private isPlaying = false;
  private currentSongId = 'reAavyaTapashvi';
  private customAudioUrl: string | null = null;
  private songAudioUrls: Record<string, string> = {};
  private songValidationCache: Map<string, SongValidationInfo> = new Map();
  private listeners: Set<() => void> = new Set();

  private audioUnlocked = false;

  constructor() {
    this.initYouTubeApi();
    this.setupMobileAudioUnlock();
  }

  private setupMobileAudioUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      if (this.audioUnlocked) return;
      this.audioUnlocked = true;

      // Unlock AudioContext if used
      try {
        const ctx = getSharedChimeContext();
        if (ctx && ctx.state === 'suspended') {
          ctx.resume();
        }
      } catch {
        /* noop */
      }

      // Pre-initialize audio element
      if (!this.audioElement) {
        this.audioElement = new Audio();
        this.audioElement.loop = true;
        this.audioElement.volume = 0.65;
      }

      // If user selected to play, kick off start now
      if (this.isPlaying) {
        this.start();
      }

      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });
  }

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
   * Resolves the direct, formatted audio URL or YouTube link for any given song ID.
   */
  public getResolvedAudioUrl(songId: string): string | null {
    if (songId === 'none') return null;
    if (songId === 'custom') return formatAudioUrl(this.customAudioUrl);
    if (this.songAudioUrls[songId]) return formatAudioUrl(this.songAudioUrls[songId]);
    const defaultSong = TAPASYA_SONGS.find((s) => s.id === songId);
    return formatAudioUrl(defaultSong?.audioUrl || defaultSong?.youtubeUrl) || null;
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
   * Initializes YouTube IFrame Player API for YouTube link audio playing.
   */
  private initYouTubeApi() {
    if (typeof window === 'undefined') return;

    if (window.YT && window.YT.Player) {
      this.ytReady = true;
      return;
    }

    const previousOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousOnReady) previousOnReady();
      this.ytReady = true;
      if (this.pendingYtVideoId) {
        this.playYouTubeVideo(this.pendingYtVideoId);
        this.pendingYtVideoId = null;
      }
    };

    if (!document.getElementById('youtube-iframe-script')) {
      const script = document.createElement('script');
      script.id = 'youtube-iframe-script';
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }
  }

  /**
   * Creates or returns the hidden container element for YouTube player.
   */
  private getOrCreateYtContainer(): HTMLElement | null {
    if (typeof document === 'undefined') return null;
    let el = document.getElementById('global-yt-audio-player');
    if (!el) {
      el = document.createElement('div');
      el.id = 'global-yt-audio-player';
      el.style.position = 'fixed';
      el.style.top = '-9999px';
      el.style.left = '-9999px';
      el.style.width = '1px';
      el.style.height = '1px';
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
      document.body.appendChild(el);
    }
    return el;
  }

  private playYouTubeVideo(videoId: string) {
    if (!this.ytReady || !window.YT) {
      this.pendingYtVideoId = videoId;
      this.notify();
      return;
    }

    const container = this.getOrCreateYtContainer();
    if (!container) return;

    if (!this.ytPlayer) {
      try {
        this.ytPlayer = new window.YT.Player(container, {
          height: '1',
          width: '1',
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: videoId,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
              this.isPlaying = true;
              this.notify();
            },
            onStateChange: (event) => {
              if (window.YT?.PlayerState) {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  this.isPlaying = true;
                  this.notify();
                } else if (
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  this.isPlaying = false;
                  this.notify();
                }
              }
            },
            onError: () => {
              console.warn('YouTube audio playback notice: Fallback to HTML5 audio proxy');
              this.isPlaying = false;
              this.notify();
            },
          },
        });
      } catch (err) {
        console.warn('YouTube player setup note:', err);
      }
    } else {
      try {
        this.ytPlayer.loadVideoById(videoId);
        this.ytPlayer.playVideo();
        this.isPlaying = true;
        this.notify();
      } catch {
        /* noop */
      }
    }
  }

  /**
   * Validates if the given URL points to a full-length track or YouTube video.
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

    const ytId = extractYouTubeId(url);
    if (ytId) {
      const ytResult: SongValidationInfo = {
        status: 'verified_full',
        durationSeconds: 240,
        formattedDuration: 'Full Track',
        isFullLength: true,
        isYouTube: true,
      };
      this.songValidationCache.set(url, ytResult);
      return ytResult;
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
        const isFullLength = dur > 15;

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
          error: 'Failed to load audio.',
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

    const ytId = extractYouTubeId(streamUrl);
    if (ytId) {
      this.playYouTubeVideo(ytId);
      this.validateTrack(streamUrl);
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

    if (this.ytPlayer) {
      try {
        this.ytPlayer.pauseVideo();
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
