/**
 * Ambient Spiritual Audio Synthesizer
 * Uses Web Audio API to produce a soft meditative Tanpura/Bansuri harmony.
 * - Does NOT autoplay
 * - Only triggered upon user toggle
 * - Safe for all browsers
 */

class AmbientSpiritualAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying = false;

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
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.stop(); // Clear any existing

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      // Gentle fade in over 2 seconds
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, now + 2);
      this.masterGain.connect(this.ctx.destination);

      // Frequencies tuned to meditative Indian Sa (C# / 138.59 Hz), Pa (207.65 Hz), and gentle octaves
      const droneFrequencies = [
        138.59,          // Sa (Root)
        207.65,          // Pa (Fifth)
        277.18,          // High Sa
        138.59 * 0.5,    // Sub Sa
      ];

      this.oscillators = droneFrequencies.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();

        // Warm harmonic tone (sine + gentle detune)
        osc.type = idx === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime((idx - 1.5) * 3, now); // Gentle chorus/shimmer

        // Low pass filter for warmth
        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + idx * 80, now);

        oscGain.gain.setValueAtTime(idx === 0 ? 0.35 : 0.2, now);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.masterGain!);

        osc.start(now);
        return osc;
      });

      this.isPlaying = true;
    } catch (err) {
      console.warn('Spiritual audio init notice:', err);
    }
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
      }
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch { /* noop */ }
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1000);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const spiritualAudio = new AmbientSpiritualAudio();

// Global shared AudioContext singleton for bells and chimes to prevent hitting browser limit
let sharedChimeCtx: AudioContext | null = null;

function getSharedChimeContext(): AudioContext | null {
  try {
    if (!sharedChimeCtx || sharedChimeCtx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

    // Harmonic bell partials: fundamental + bell overtones
    const partials = [
      { freq: 528, gain: 0.42, decay: 2.8 },     // Fundamental (Solfeggio Love/Miracle frequency)
      { freq: 1056, gain: 0.26, decay: 2.2 },    // Octave
      { freq: 1584, gain: 0.16, decay: 1.6 },    // Fifth
      { freq: 2112, gain: 0.09, decay: 1.2 },    // Double octave
      { freq: 2740, gain: 0.05, decay: 0.9 },    // High shimmer
    ];

    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      // Subtle natural bell frequency drift
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
