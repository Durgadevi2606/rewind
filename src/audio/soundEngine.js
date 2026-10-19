/**
 * REWIND - Procedural Web Audio Sound Synthesizer
 * 
 * Cheerful, bright, candy-puzzle audio procedurally generated
 * using the Web Audio API. Bubbly, satisfying sound effects.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.7;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setSettings({ soundEnabled, volume }) {
    if (typeof soundEnabled === 'boolean') this.enabled = soundEnabled;
    if (typeof volume === 'number') this.volume = Math.max(0, Math.min(1, volume));
  }

  createMasterGain(duration) {
    if (!this.ctx || !this.enabled || this.volume <= 0) return null;
    const now = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volume, now);
    gain.connect(this.ctx.destination);
    return { gain, now };
  }

  /**
   * Footstep: Bright bubbly tap
   */
  playStep() {
    this.init();
    const master = this.createMasterGain(0.1);
    if (!master) return;
    const { gain, now } = master;

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.06);

    env.gain.setValueAtTime(0.1, now);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(env);
    env.connect(gain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Push: Satisfying chunky slide
   */
  playPush() {
    this.init();
    const master = this.createMasterGain(0.2);
    if (!master) return;
    const { gain, now } = master;

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.15);

    env.gain.setValueAtTime(0.2, now);
    env.gain.exponentialRampToValueAtTime(0.005, now + 0.16);

    osc.connect(env);
    env.connect(gain);

    osc.start(now);
    osc.stop(now + 0.17);
  }

  /**
   * Collect: Sparkling crystal chime arpeggio — bright & cheerful
   */
  playCollect() {
    this.init();
    const master = this.createMasterGain(0.5);
    if (!master) return;
    const { gain, now } = master;

    // Bright major arpeggio: C6, E6, G6, C7
    const notes = [1046.50, 1318.51, 1567.98, 2093.00];
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.06;
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      env.gain.setValueAtTime(0.18, startTime);
      env.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(env);
      env.connect(gain);

      osc.start(startTime);
      osc.stop(startTime + 0.32);
    });
  }

  /**
   * Rewind: Magical reverse shimmer — whimsical swoosh
   */
  playRewind() {
    this.init();
    const master = this.createMasterGain(0.4);
    if (!master) return;
    const { gain, now } = master;

    // Descending then ascending shimmer
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.exponentialRampToValueAtTime(440, now + 0.15);
    osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.3);

    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.exponentialRampToValueAtTime(220, now + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(660, now + 0.3);

    env.gain.setValueAtTime(0.02, now);
    env.gain.linearRampToValueAtTime(0.2, now + 0.08);
    env.gain.linearRampToValueAtTime(0.15, now + 0.2);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(env);
    osc2.connect(env);
    env.connect(gain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.36);
    osc2.stop(now + 0.36);
  }

  /**
   * Switch: Bright click-pop
   */
  playSwitch() {
    this.init();
    const master = this.createMasterGain(0.15);
    if (!master) return;
    const { gain, now } = master;

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.06);

    env.gain.setValueAtTime(0.2, now);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(env);
    env.connect(gain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Bump: Soft bouncy deny
   */
  playBump() {
    this.init();
    const master = this.createMasterGain(0.1);
    if (!master) return;
    const { gain, now } = master;

    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.06);

    env.gain.setValueAtTime(0.1, now);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(env);
    env.connect(gain);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  /**
   * Victory: Triumphant cheerful fanfare
   */
  playWin() {
    this.init();
    const master = this.createMasterGain(0.7);
    if (!master) return;
    const { gain, now } = master;

    // Major chord fanfare: C5, E5, G5, C6
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      env.gain.setValueAtTime(0.18, now + idx * 0.06);
      env.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      osc.connect(env);
      env.connect(gain);

      osc.start(now + idx * 0.06);
      osc.stop(now + 1.05);
    });

    // Extra sparkle note at the end
    const sparkle = this.ctx.createOscillator();
    const sparkleEnv = this.ctx.createGain();
    sparkle.type = 'sine';
    sparkle.frequency.setValueAtTime(2093.00, now + 0.4);
    sparkleEnv.gain.setValueAtTime(0.1, now + 0.4);
    sparkleEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    sparkle.connect(sparkleEnv);
    sparkleEnv.connect(gain);
    sparkle.start(now + 0.4);
    sparkle.stop(now + 0.85);
  }
}

export const sound = new SoundEngine();
