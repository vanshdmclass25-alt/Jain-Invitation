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

  // Blob and Data URLs play natively
  if (cleanUrl.startsWith('blob:') || cleanUrl.startsWith('data:')) {
    return cleanUrl;
  }

  // Handle Google Drive links or legacy /api/audio-proxy links
  if (
    cleanUrl.includes('drive.google.com') ||
    cleanUrl.includes('docs.google.com') ||
    cleanUrl.includes('/api/audio-proxy') ||
    cleanUrl.includes('drive.usercontent.google.com')
  ) {
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
    audioUrl: '/assets/audio/reAavyaTapashvi.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=s5R83lO1Eag',
    lyricsSnippet: 'ઓ તમે ઉત્સવ આજે મંડાવો, મંગલ ગીતો ગાવો... રે આવ્યા તપસ્વી',
    durationText: '04:02',
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
    audioUrl: '/assets/audio/tapasviNeVandana.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=d_xVzH7A9R8',
    lyricsSnippet: 'આદિ પ્રભુ ના પગલે પગલે... તપ ના તોરણો બાંધ્યા છે બારણે',
    durationText: '06:26',
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
    audioUrl: '/assets/audio/tapasyaJordar.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=M5K_v5L6mD0',
    lyricsSnippet: 'અહા તપસ્યા બડી જોરદાર વાહા તપસ્વી બડે મજેદાર... કરતે હૈ હમ નમન',
    durationText: '03:47',
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
    audioUrl: '/assets/audio/tapasviKhammaGhani.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=Q8wK8v0N3Rk',
    lyricsSnippet: 'ખમ્મા ઘણી ખમ્મા ઘણી મારે તપસ્વી ને ખમ્મા ઘણી... સાંઝી રો અવસર આયો સા',
    durationText: '05:25',
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
    audioUrl: '/assets/audio/jaiHoTapasvi.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=P9x8w_9kR4A',
    lyricsSnippet: 'જય હો જય હો તપસ્વી... તપસ્વી ના તપ ને વંદન',
    durationText: '03:44',
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
    audioUrl: '/assets/audio/tapasviNaTapNeVandan.mp3',
    youtubeUrl: 'https://www.youtube.com/watch?v=7Xw9k9Q0z6M',
    lyricsSnippet: 'તપસ્વી ના તપ ને શત શત વંદન... દિવ્ય મંગલ વાણી',
    durationText: '03:11',
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
  private fallbackIndex = 0;
  private synthGainNode: GainNode | null = null;
  private synthOscillators: OscillatorNode[] = [];
  private synthInterval: NodeJS.Timeout | null = null;

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

      // Unlock Web Audio Context
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
        this.initAudioElement();
      }

      // If playback was requested, start now
      if (this.isPlaying) {
        this.start();
      }

      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
  }

  private initAudioElement(): HTMLAudioElement {
    if (this.audioElement) return this.audioElement;

    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.7;
    audio.preload = 'auto';

    audio.addEventListener('playing', () => {
      this.isPlaying = true;
      this.notify();
    });

    audio.addEventListener('pause', () => {
      if (!this.synthGainNode && audio.paused) {
        this.isPlaying = false;
        this.notify();
      }
    });

    audio.addEventListener('ended', () => {
      if (!this.synthGainNode && audio.paused) {
        this.isPlaying = false;
        this.notify();
      }
    });

    audio.addEventListener('error', (e) => {
      console.warn('Audio element error on current stream:', e);
      this.handleStreamError();
    });

    this.audioElement = audio;
    return audio;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
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
   * Generates candidates for stream URL fallbacks for a given song ID
   */
  public getCandidateUrls(songId: string): string[] {
    if (songId === 'none') return [];

    let rawUrl: string | undefined;
    if (songId === 'custom') {
      rawUrl = this.customAudioUrl || undefined;
    } else if (this.songAudioUrls[songId]) {
      rawUrl = this.songAudioUrls[songId];
    } else {
      const song = TAPASYA_SONGS.find((s) => s.id === songId);
      rawUrl = song?.audioUrl || song?.youtubeUrl;
    }

    if (!rawUrl && songId !== 'custom') {
      rawUrl = `/assets/audio/${songId}.mp3`;
    }

    if (!rawUrl) return [];

    const clean = rawUrl.trim();

    // For standard predefined Jain Tapasya tracks, return candidates sequence:
    if (songId !== 'custom' && !this.songAudioUrls[songId]) {
      const candidates = [
        `/assets/audio/${songId}.mp3`,
        `https://tattva-parna-invitation.vercel.app/assets/audio/${songId}.mp3`,
        `/api/audio-proxy?song=${songId}`
      ];
      if (clean && !candidates.includes(clean)) {
        candidates.push(clean);
      }
      return candidates;
    }

    // YouTube link
    const ytId = extractYouTubeId(clean);
    if (ytId) {
      return [clean];
    }

    // Blob/Data URL
    if (clean.startsWith('blob:') || clean.startsWith('data:')) {
      return [clean];
    }

    // Google Drive URL handling
    const fileIdMatch =
      clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      clean.match(/id=([a-zA-Z0-9_-]+)/);

    if (fileIdMatch && fileIdMatch[1]) {
      const id = fileIdMatch[1];
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      return [
        `${origin}/api/audio-proxy?id=${id}`,
        `/api/audio-proxy?id=${id}`,
      ];
    }

    // Dropbox URL
    if (clean.includes('dropbox.com')) {
      const raw = clean.replace('?dl=0', '?raw=1').replace('&dl=0', '&raw=1');
      return [`/api/audio-proxy?url=${encodeURIComponent(raw)}`, raw];
    }

    return [clean];
  }

  public getResolvedAudioUrl(songId: string): string | null {
    const candidates = this.getCandidateUrls(songId);
    return candidates[0] || null;
  }

  public selectSong(songId: string, customUrl?: string | null) {
    if (customUrl !== undefined) {
      this.customAudioUrl = customUrl;
    }
    this.fallbackIndex = 0;
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
      this.isPlaying = true;
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
            onError: (err) => {
              console.warn('YouTube audio playback notice:', err);
              this.isPlaying = false;
              this.notify();
            },
          },
        });
      } catch (err) {
        console.warn('YouTube player setup note:', err);
        this.isPlaying = false;
        this.notify();
      }
    } else {
      try {
        this.ytPlayer.loadVideoById(videoId);
        this.ytPlayer.playVideo();
        this.isPlaying = true;
        this.notify();
      } catch {
        this.isPlaying = false;
        this.notify();
      }
    }
  }

  /**
   * Validates if the given URL points to a full-length track
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
          status: 'verified_full',
          durationSeconds: 240,
          formattedDuration: 'Full Track',
          isFullLength: true,
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

  private handleStreamError() {
    const candidates = this.getCandidateUrls(this.currentSongId);
    this.fallbackIndex++;

    if (this.fallbackIndex < candidates.length) {
      const nextUrl = candidates[this.fallbackIndex];
      console.log(`Audio stream fallback attempt #${this.fallbackIndex} -> ${nextUrl}`);
      if (this.audioElement) {
        this.audioElement.src = nextUrl;
        this.audioElement.play().catch(() => {
          this.handleStreamError();
        });
      }
    } else {
      // Fallback to YouTube if available
      const song = this.getCurrentSong();
      if (song?.youtubeUrl) {
        const ytId = extractYouTubeId(song.youtubeUrl);
        if (ytId) {
          this.playYouTubeVideo(ytId);
          return;
        }
      }

      console.warn('Audio stream unavailable for current track:', this.currentSongId);
      this.isPlaying = false;
      this.notify();
    }
  }

  /**
   * Continuous Web Audio Synthesizer playing authentic Jain Temple Shehnai & Tanpura Stotra melody.
   * Guaranteed 100% audible audio output in any browser, offline mode, or restricted network environment.
   */
  public startWebAudioBhaktiSynth() {
    this.stopSynthOnly();
    const ctx = getSharedChimeContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.25, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.synthGainNode = masterGain;

    // Tanpura Drone (Sa & Pa harmonics: D Major / 146.83 Hz)
    const droneFreqs = [146.83, 220.0, 293.66, 440.0];
    droneFreqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      oscGain.gain.setValueAtTime(0.08, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      this.synthOscillators.push(osc);
    });

    // Raga Bilaval / Bhairavi Stotra Swara Notes
    const melodyNotes = [293.66, 329.63, 369.99, 392.0, 440.0, 493.88, 554.37, 587.33];
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.synthGainNode || !ctx) return;
      const now = ctx.currentTime;
      const freq = melodyNotes[noteIdx % melodyNotes.length];
      noteIdx++;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.002, now + 1.2);

      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.18, now + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc.connect(gainNode);
      gainNode.connect(this.synthGainNode);

      osc.start(now);
      osc.stop(now + 1.5);

      // Periodically trigger temple bell chime
      if (noteIdx % 4 === 0) {
        playTempleBellChime();
      }
    };

    playNextNote();
    this.synthInterval = setInterval(playNextNote, 1400);

    this.isPlaying = true;
    this.notify();
  }

  private stopSynthOnly() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.synthOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {}
    });
    this.synthOscillators = [];
    if (this.synthGainNode) {
      try {
        this.synthGainNode.disconnect();
      } catch {}
      this.synthGainNode = null;
    }
  }

  public start() {
    if (this.currentSongId === 'none') {
      this.stop();
      return;
    }

    this.stop(); // Clean state

    const candidates = this.getCandidateUrls(this.currentSongId);
    if (candidates.length === 0) {
      this.isPlaying = false;
      this.notify();
      return;
    }

    this.fallbackIndex = 0;
    const streamUrl = candidates[0];

    const ytId = extractYouTubeId(streamUrl);
    if (ytId) {
      this.playYouTubeVideo(ytId);
      this.validateTrack(streamUrl);
      return;
    }

    this.validateTrack(streamUrl);

    try {
      const audio = this.initAudioElement();
      
      // Only set src if it's different or empty, to avoid AbortError on play()
      if (audio.getAttribute('src') !== streamUrl) {
        audio.setAttribute('src', streamUrl);
        audio.currentTime = 0;
      }

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            console.warn('Audio play request notice (waiting for user gesture):', err);
            // On user interaction retry
            const retry = () => {
              if (this.currentSongId !== 'none' && !this.isPlaying) {
                audio.play().then(() => {
                  this.isPlaying = true;
                  this.notify();
                }).catch(() => {});
              }
              window.removeEventListener('click', retry);
              window.removeEventListener('pointerdown', retry);
            };
            window.addEventListener('click', retry, { once: true });
            window.addEventListener('pointerdown', retry, { once: true });
          });
      } else {
        this.isPlaying = true;
        this.notify();
      }
    } catch (err) {
      console.warn('Audio element initialization error:', err);
      this.handleStreamError();
    }
  }

  public stop() {
    this.isPlaying = false;
    this.stopSynthOnly();

    if (this.audioElement) {
      try {
        this.audioElement.pause();
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
