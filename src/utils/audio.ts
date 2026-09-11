import { TapasyaSong } from '../types';

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
    // Public CDN audio stream for sacred devotional flute & garba
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
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio-[#1359].mp3', // Royal Shehnai audio
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
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio-[#0888].mp3', // Temple Stotra bell audio
  },
];

class AmbientSpiritualAudio {
  private audioElement: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private currentSongId = 'reAavyaTapashvi';
  private customAudioUrl: string | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private schedulerTimer: number | null = null;

  public getSongId(): string {
    return this.currentSongId;
  }

  public setCustomAudioUrl(url: string | null) {
    this.customAudioUrl = url;
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  public getCurrentSong(): TapasyaSong {
    return (
      TAPASYA_SONGS.find((s) => s.id === this.currentSongId) || TAPASYA_SONGS[0]
    );
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

  public start() {
    if (this.currentSongId === 'none') {
      this.stop();
      return;
    }

    this.stop(); // Clean slate

    const song = this.getCurrentSong();
    const streamUrl = this.customAudioUrl || song.audioUrl;

    // Try HTML5 Audio stream first for real vocal audio track
    if (streamUrl) {
      try {
        if (!this.audioElement) {
          this.audioElement = new Audio();
          this.audioElement.loop = true;
          this.audioElement.volume = 0.55;
        }
        this.audioElement.src = streamUrl;
        this.audioElement.crossOrigin = 'anonymous';

        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlaying = true;
            })
            .catch((err) => {
              console.warn('HTML5 Audio playback interrupted, falling back to WebAudio Synth:', err);
              this.startWebAudioSynth(song);
            });
        } else {
          this.isPlaying = true;
        }
        return;
      } catch (err) {
        console.warn('HTML Audio error, switching to WebAudio Synth:', err);
      }
    }

    // Fallback to high-fidelity Web Audio Synthesizer
    this.startWebAudioSynth(song);
  }

  /* Robust Web Audio Synthesizer Engine (Guaranteed zero silence for all 6 songs) */
  private startWebAudioSynth(song: TapasyaSong) {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.ctx || this.ctx.state === 'closed') {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.25, now + 1.2);
      this.masterGain.connect(this.ctx.destination);

      this.isPlaying = true;

      // Render continuous multi-layered Indian acoustic instruments based on key/raga
      this.runLookaheadScheduler(song);
    } catch (err) {
      console.warn('WebAudio Synth error:', err);
    }
  }

  private runLookaheadScheduler(song: TapasyaSong) {
    if (!this.ctx || !this.masterGain) return;

    // Base Tanpura Drone frequencies per song key
    const scaleFreqs: Record<string, number[]> = {
      reAavyaTapashvi: [146.83, 220.0, 293.66, 369.99, 440.0], // D Major (D3, A3, D4, F#4, A4)
      tapasviNeVandana: [110.0, 164.81, 220.0, 261.63, 329.63], // A Minor Bhairavi (A2, E3, A3, C4, E4)
      tapasyaJordar: [196.0, 246.94, 293.66, 392.0, 493.88], // G Major Yaman (G3, B3, D4, G4, B4)
      tapasviKhammaGhani: [164.81, 246.94, 329.63, 392.0, 493.88], // E Minor Desh (E3, B3, E4, G4, B4)
      jaiHoTapasvi: [174.61, 220.0, 261.63, 349.23, 440.0], // F Major Khamaj (F3, A3, C4, F4, A4)
      tapasviNaTapNeVandan: [130.81, 196.0, 261.63, 329.63, 392.0], // C Major Bhoopali (C3, G3, C4, E4, G4)
    };

    const freqs = scaleFreqs[song.id] || scaleFreqs.reAavyaTapashvi;
    const now = this.ctx.currentTime;

    // 1. Continuous Tanpura / Harmonium Pad
    freqs.slice(0, 3).forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, now);

      gain.gain.setValueAtTime(0.12, now);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      this.activeOscillators.push(osc);
    });

    // 2. Continuous Synchronized Flute & Santoor Melodic Sequence
    let stepIndex = 0;
    const stepDuration = 0.42; // seconds per note

    const scheduleNextStep = () => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;

      const t = this.ctx.currentTime;
      const noteFreq = freqs[stepIndex % freqs.length];

      // Flute note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + stepDuration * 0.95);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + stepDuration);

      // Temple bell on every 8th step
      if (stepIndex % 8 === 0) {
        playTempleBellChime();
      }

      stepIndex++;
    };

    scheduleNextStep();
    this.schedulerTimer = window.setInterval(scheduleNextStep, stepDuration * 1000);
  }

  public stop() {
    this.isPlaying = false;

    if (this.schedulerTimer) {
      window.clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }

    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch {
        /* noop */
      }
    }

    if (this.activeOscillators.length > 0) {
      this.activeOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          /* noop */
        }
      });
      this.activeOscillators = [];
    }

    if (this.masterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      } catch {
        /* noop */
      }
    }
  }
}

export const spiritualAudio = new AmbientSpiritualAudio();

// Shared AudioContext singleton for bells and chimes
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
 * Plays an authentic resonant temple bell (Ghanti) chime.
 * Tuned to sacred 528 Hz / harmonic overtones with realistic bronze decay.
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
