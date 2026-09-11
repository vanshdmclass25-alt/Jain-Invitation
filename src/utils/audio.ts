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
  },
];

class AmbientSpiritualAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private currentSongId = 'reAavyaTapashvi';
  private loopInterval: number | null = null;
  private activeNodes: (OscillatorNode | GainNode | BiquadFilterNode)[] = [];

  public getSongId(): string {
    return this.currentSongId;
  }

  public getCurrentSong(): TapasyaSong {
    return (
      TAPASYA_SONGS.find((s) => s.id === this.currentSongId) || TAPASYA_SONGS[0]
    );
  }

  public selectSong(songId: string) {
    if (this.currentSongId === songId && this.isPlaying) return;
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

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.stopNodes();

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      // Fade in over 1.5s
      this.masterGain.gain.exponentialRampToValueAtTime(0.22, now + 1.5);
      this.masterGain.connect(this.ctx.destination);

      this.isPlaying = true;

      // Render song specific arrangement
      this.playSongArrangement(this.currentSongId);
    } catch (err) {
      console.warn('Audio start notice:', err);
    }
  }

  private playSongArrangement(songId: string) {
    if (!this.ctx || !this.masterGain) return;

    // Clear any active loop timer
    if (this.loopInterval) {
      window.clearInterval(this.loopInterval);
      this.loopInterval = null;
    }

    switch (songId) {
      case 'reAavyaTapashvi':
        this.arrangeReAavyaTapashvi();
        break;
      case 'tapasviNeVandana':
        this.arrangeTapasviNeVandana();
        break;
      case 'tapasyaJordar':
        this.arrangeTapasyaJordar();
        break;
      case 'tapasviKhammaGhani':
        this.arrangeTapasviKhammaGhani();
        break;
      case 'jaiHoTapasvi':
        this.arrangeJaiHoTapasvi();
        break;
      case 'tapasviNaTapNeVandan':
        this.arrangeTapasviNaTapNeVandan();
        break;
      default:
        this.arrangeReAavyaTapashvi();
    }
  }

  /* 1. Re Aavya Tapashvi (D Major - Upbeat Garba/Dholak & Flute) */
  private arrangeReAavyaTapashvi() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // D Major triad drone
    const droneFreqs = [146.83, 220.0, 293.66, 369.99]; // D3, A3, D4, F#4
    droneFreqs.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, now);

      gain.gain.setValueAtTime(0.12, now);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      this.activeNodes.push(osc, gain);
    });

    // Melodic Flute sequence loop: "Re Aavya Tapashvi" refrain
    // Notes: D4, F#4, A4, B4, D5, C#5, B4, A4, F#4, D4
    const notes = [
      { f: 293.66, d: 0.4 },
      { f: 369.99, d: 0.4 },
      { f: 440.0, d: 0.6 },
      { f: 493.88, d: 0.6 },
      { f: 587.33, d: 0.8 },
      { f: 554.37, d: 0.4 },
      { f: 493.88, d: 0.4 },
      { f: 440.0, d: 0.8 },
      { f: 369.99, d: 0.6 },
      { f: 293.66, d: 0.8 },
    ];

    const playCycle = () => {
      if (!this.ctx || !this.isPlaying || this.currentSongId !== 'reAavyaTapashvi') return;
      let t = this.ctx.currentTime;
      notes.forEach((note) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, t);

        g.gain.setValueAtTime(0.001, t);
        g.gain.linearRampToValueAtTime(0.18, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t + note.d);

        osc.connect(g);
        g.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + note.d);
        this.activeNodes.push(osc, g);

        // Percussive Dholak pulse
        const kick = this.ctx!.createOscillator();
        const kickG = this.ctx!.createGain();
        kick.frequency.setValueAtTime(110, t);
        kick.frequency.exponentialRampToValueAtTime(40, t + 0.15);
        kickG.gain.setValueAtTime(0.2, t);
        kickG.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        kick.connect(kickG);
        kickG.connect(this.masterGain!);
        kick.start(t);
        kick.stop(t + 0.15);

        t += note.d;
      });
    };

    playCycle();
    this.loopInterval = window.setInterval(playCycle, 5800);
  }

  /* 2. Tapasvi Ne Vandana (A Minor - Soulful Santoor & Flute Bhairavi) */
  private arrangeTapasviNeVandana() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Low Tanpura A Minor
    const freqs = [110.0, 164.81, 220.0, 261.63]; // A2, E3, A3, C4
    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.1, now);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now);
      this.activeNodes.push(osc, gain);
    });

    // Santoor Arpeggio & Devotional Flute refrain
    const SantoorNotes = [220.0, 261.63, 329.63, 392.0, 440.0, 523.25, 440.0, 329.63];
    const playCycle = () => {
      if (!this.ctx || !this.isPlaying || this.currentSongId !== 'tapasviNeVandana') return;
      let t = this.ctx.currentTime;
      SantoorNotes.forEach((f) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t);

        g.gain.setValueAtTime(0.18, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

        osc.connect(g);
        g.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + 0.6);
        this.activeNodes.push(osc, g);

        t += 0.45;
      });
    };

    playCycle();
    this.loopInterval = window.setInterval(playCycle, 4200);
  }

  /* 3. Tapasya Jordar (G Major - Upbeat Celebration Anthem) */
  private arrangeTapasyaJordar() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // G Major Base
    const freqs = [196.0, 246.94, 293.66, 392.0]; // G3, B3, D4, G4
    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.14, now);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now);
      this.activeNodes.push(osc, gain);
    });

    // Catchy "Tapasya Jordar" Brass/Harmonium motif
    const motif = [
      { f: 392.0, d: 0.35 },
      { f: 493.88, d: 0.35 },
      { f: 587.33, d: 0.5 },
      { f: 659.25, d: 0.5 },
      { f: 587.33, d: 0.4 },
      { f: 523.25, d: 0.4 },
      { f: 493.88, d: 0.4 },
      { f: 440.0, d: 0.4 },
      { f: 392.0, d: 0.7 },
    ];

    const playCycle = () => {
      if (!this.ctx || !this.isPlaying || this.currentSongId !== 'tapasyaJordar') return;
      let t = this.ctx.currentTime;
      motif.forEach((item) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(item.f, t);

        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, t);

        g.gain.setValueAtTime(0.001, t);
        g.gain.linearRampToValueAtTime(0.14, t + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, t + item.d);

        osc.connect(filter);
        filter.connect(g);
        g.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + item.d);
        this.activeNodes.push(osc, g);

        t += item.d;
      });
    };

    playCycle();
    this.loopInterval = window.setInterval(playCycle, 4000);
  }

  /* 4. Tapasvi Ne Khamma Ghani (2.0) (E Minor - Royal Marwari Shehnai) */
  private arrangeTapasviKhammaGhani() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Low E Minor Sitar drone
    const freqs = [164.81, 246.94, 329.63, 392.0]; // E3, B3, E4, G4
    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.1, now);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now);
      this.activeNodes.push(osc, gain);
    });

    // Shehnai Pitch-bend melody
    const shehnaiNotes = [
      { f: 329.63, d: 0.5 },
      { f: 392.0, d: 0.5 },
      { f: 493.88, d: 0.7 },
      { f: 523.25, d: 0.4 },
      { f: 493.88, d: 0.4 },
      { f: 440.0, d: 0.5 },
      { f: 392.0, d: 0.5 },
      { f: 329.63, d: 0.8 },
    ];

    const playCycle = () => {
      if (!this.ctx || !this.isPlaying || this.currentSongId !== 'tapasviKhammaGhani') return;
      let t = this.ctx.currentTime;
      shehnaiNotes.forEach((n) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, t);
        osc.frequency.exponentialRampToValueAtTime(n.f * 1.01, t + n.d); // subtle pitch bend

        g.gain.setValueAtTime(0.001, t);
        g.gain.linearRampToValueAtTime(0.16, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t + n.d);

        osc.connect(g);
        g.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + n.d);
        this.activeNodes.push(osc, g);

        t += n.d;
      });
    };

    playCycle();
    this.loopInterval = window.setInterval(playCycle, 4800);
  }

  /* 5. Jai Ho Tapasvi (F Major - Melodious Bhakti Anthem) */
  private arrangeJaiHoTapasvi() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // F Major arpeggiated pad
    const freqs = [174.61, 220.0, 261.63, 349.23]; // F3, A3, C4, F4
    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now);
      this.activeNodes.push(osc, gain);
    });

    // "Jai Ho Tapasvi" Anthem refrain
    const anthem = [
      { f: 349.23, d: 0.4 },
      { f: 392.0, d: 0.4 },
      { f: 440.0, d: 0.6 },
      { f: 523.25, d: 0.7 },
      { f: 466.16, d: 0.4 },
      { f: 440.0, d: 0.4 },
      { f: 392.0, d: 0.5 },
      { f: 349.23, d: 0.8 },
    ];

    const playCycle = () => {
      if (!this.ctx || !this.isPlaying || this.currentSongId !== 'jaiHoTapasvi') return;
      let t = this.ctx.currentTime;
      anthem.forEach((n) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, t);

        g.gain.setValueAtTime(0.001, t);
        g.gain.linearRampToValueAtTime(0.17, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t + n.d);

        osc.connect(g);
        g.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + n.d);
        this.activeNodes.push(osc, g);

        t += n.d;
      });
    };

    playCycle();
    this.loopInterval = window.setInterval(playCycle, 4500);
  }

  /* 6. Tapasvi Na Tap Ne Vandan (C Major - Sacred Temple Stotra Bhoopali) */
  private arrangeTapasviNaTapNeVandan() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Deep Tanpura C2, G2, C3
    const freqs = [130.81, 196.0, 261.63, 329.63]; // C3, G3, C4, E4
    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12, now);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now);
      this.activeNodes.push(osc, gain);
    });

    // Sacred Bhoopali Stotra melody + Periodic Bell chime
    const bhoopali = [
      { f: 261.63, d: 0.6 },
      { f: 293.66, d: 0.6 },
      { f: 329.63, d: 0.8 },
      { f: 392.0, d: 0.8 },
      { f: 440.0, d: 0.8 },
      { f: 523.25, d: 1.0 },
      { f: 440.0, d: 0.6 },
      { f: 392.0, d: 0.6 },
      { f: 329.63, d: 0.8 },
      { f: 293.66, d: 0.6 },
      { f: 261.63, d: 1.2 },
    ];

    const playCycle = () => {
      if (!this.ctx || !this.isPlaying || this.currentSongId !== 'tapasviNaTapNeVandan') return;
      let t = this.ctx.currentTime;

      // Resonant Temple Ghanti Bell Strike
      playTempleBellChime();

      bhoopali.forEach((n) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, t);

        g.gain.setValueAtTime(0.001, t);
        g.gain.linearRampToValueAtTime(0.18, t + 0.1);
        g.gain.exponentialRampToValueAtTime(0.0001, t + n.d);

        osc.connect(g);
        g.connect(this.masterGain!);

        osc.start(t);
        osc.stop(t + n.d);
        this.activeNodes.push(osc, g);

        t += n.d;
      });
    };

    playCycle();
    this.loopInterval = window.setInterval(playCycle, 8500);
  }

  public stop() {
    this.isPlaying = false;
    if (this.loopInterval) {
      window.clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      } catch {
        /* noop */
      }
    }
    setTimeout(() => {
      this.stopNodes();
    }, 600);
  }

  private stopNodes() {
    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node) {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      } catch {
        /* noop */
      }
    });
    this.activeNodes = [];
  }
}

export const spiritualAudio = new AmbientSpiritualAudio();

// Global shared AudioContext singleton for bells and chimes
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
      { freq: 528, gain: 0.42, decay: 2.8 },
      { freq: 1056, gain: 0.26, decay: 2.2 },
      { freq: 1584, gain: 0.16, decay: 1.6 },
      { freq: 2112, gain: 0.09, decay: 1.2 },
      { freq: 2740, gain: 0.05, decay: 0.9 },
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
