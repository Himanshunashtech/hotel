// Procedural Palace Ambient Soundscape via Web Audio API
// Generates a meditative, royal ambient aura with soft resonance and harmonic overtones

class PalaceSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.timer = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  play() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(0.35, now + 2);

    // Warm base drone (Sa note, D2 / A2 harmonic drone)
    const frequencies = [73.42, 110.0, 146.83, 220.0];
    this.oscillators = frequencies.map((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for soft velvety warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + i * 40, now);

      const amp = 0.08 / (i + 1);
      gain.gain.setValueAtTime(amp, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      return { osc, gain, filter };
    });

    // Periodic soft royal chime / singing bowl overtones
    this.scheduleGentleChime();
  }

  scheduleGentleChime() {
    if (!this.isPlaying) return;

    const playChime = () => {
      if (!this.isPlaying || !this.ctx) return;
      const chimeFreqs = [587.33, 880.0, 659.25, 1046.5]; // D5, A5, E5, C6
      const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.04, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.6);

      const nextInterval = 4000 + Math.random() * 5000;
      this.timer = setTimeout(playChime, nextInterval);
    };

    this.timer = setTimeout(playChime, 2500);
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;
    this.isPlaying = false;
    clearTimeout(this.timer);

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.linearRampToValueAtTime(0.001, now + 1.2);

    setTimeout(() => {
      this.oscillators.forEach(({ osc }) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      this.oscillators = [];
    }, 1300);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const soundscape = new PalaceSoundscape();
