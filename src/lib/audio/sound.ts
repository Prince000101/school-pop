/* Synthesized sound engine — zero audio assets, everything generated in-browser. */

type Ctx = AudioContext;

function midi(n: number): number {
  return 440 * Math.pow(2, (n - 69) / 12);
}

class SoundEngine {
  private ctx: Ctx | null = null;
  private master: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private musicTimer: ReturnType<typeof setInterval> | null = null;
  private nextNoteTime = 0;
  private step = 0;
  enabled = true;

  private ensure(): Ctx | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.5;
      this.musicGain.connect(this.master);
    }
    if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    return this.ctx;
  }

  unlock() {
    this.ensure();
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    if (!on) this.stopMusic();
    else if (this.musicTimer) this.startMusic();
  }

  isEnabled() {
    return this.enabled;
  }

  /* ---------- low-level voices ---------- */

  private tone(
    freq: number,
    opts: {
      at?: number;
      dur?: number;
      type?: OscillatorType;
      vol?: number;
      glide?: number;
      dest?: AudioNode | null;
    } = {},
  ) {
    const ctx = this.ensure();
    if (!ctx || !this.master || !this.enabled) return;
    const { at = 0, dur = 0.18, type = "triangle", vol = 0.5, glide, dest = null } = opts;
    const t0 = ctx.currentTime + at;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glide) osc.frequency.exponentialRampToValueAtTime(Math.max(1, glide), t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(dest || this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  private noise(opts: { at?: number; dur?: number; vol?: number; freq?: number } = {}) {
    const ctx = this.ensure();
    if (!ctx || !this.master || !this.enabled) return;
    const { at = 0, dur = 0.08, vol = 0.12, freq = 3000 } = opts;
    const t0 = ctx.currentTime + at;
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start(t0);
  }

  /* ---------- UI sounds ---------- */

  click() {
    this.tone(320, { type: "sine", dur: 0.09, vol: 0.35, glide: 200 });
  }

  pop() {
    this.tone(420, { type: "square", dur: 0.1, vol: 0.2, glide: 200 });
    this.noise({ dur: 0.06, vol: 0.06 });
  }

  tick() {
    this.tone(880, { type: "triangle", dur: 0.07, vol: 0.25 });
  }

  correct(streak: number) {
    const base = 60 + Math.min(streak, 5);
    const notes = [base, base + 4, base + 7];
    const extras = streak >= 3 ? [base + 12] : [];
    const seq = [...notes, ...extras];
    seq.forEach((n, i) => this.tone(midi(n), { at: i * 0.08, dur: 0.22, type: "triangle", vol: 0.4 }));
    if (streak >= 3) {
      this.tone(midi(base + 7), { at: seq.length * 0.08, dur: 0.3, type: "sine", vol: 0.25 });
    }
    this.noise({ at: 0.02, dur: 0.15, vol: 0.08, freq: 6000 });
  }

  wrong() {
    this.tone(233, { dur: 0.16, type: "sine", vol: 0.35 });
    this.tone(196, { at: 0.14, dur: 0.2, type: "sine", vol: 0.35 });
  }

  gentleCorrect() {
    this.tone(midi(72), { dur: 0.16, type: "triangle", vol: 0.3 });
    this.tone(midi(76), { at: 0.09, dur: 0.2, type: "triangle", vol: 0.3 });
  }

  reveal() {
    this.tone(midi(67), { dur: 0.16, type: "triangle", vol: 0.35 });
    this.tone(midi(64), { at: 0.14, dur: 0.2, type: "triangle", vol: 0.35 });
  }

  win() {
    const melody = [60, 64, 67, 72, 76, 79, 84, 79, 76, 72];
    melody.forEach((n, i) => this.tone(midi(n), { at: i * 0.11, dur: 0.3, type: "triangle", vol: 0.4 }));
    this.tone(midi(60), { at: 0, dur: 1.4, type: "sine", vol: 0.18 });
    this.tone(midi(64), { at: 0, dur: 1.4, type: "sine", vol: 0.18 });
    this.tone(midi(67), { at: 0, dur: 1.4, type: "sine", vol: 0.18 });
    for (let i = 0; i < 8; i++) {
      this.noise({ at: i * 0.12, dur: 0.1, vol: 0.1, freq: 7000 });
    }
  }

  coin() {
    this.tone(988, { dur: 0.07, type: "square", vol: 0.18 });
    this.tone(1319, { at: 0.06, dur: 0.14, type: "square", vol: 0.18 });
  }

  /* ---------- background music ---------- */

  private static readonly BASS = [48, 48, 55, 55, 57, 57, 55, 55, 53, 53, 48, 48, 50, 50, 55, 55];
  private static readonly MELODY = [
    72, 0, 76, 79, 0, 76, 74, 72, 0, 74, 76, 74, 72, 0, 71, 0,
    72, 0, 76, 79, 0, 76, 81, 79, 0, 76, 74, 72, 71, 0, 69, 0,
  ];
  private static readonly STEP_DUR = 60 / 132 / 2;

  startMusic() {
    const ctx = this.ensure();
    if (!ctx || this.musicTimer) return;
    this.nextNoteTime = ctx.currentTime + 0.1;
    this.step = 0;
    this.musicTimer = setInterval(() => this.schedule(), 90);
  }

  stopMusic() {
    if (this.musicTimer) clearInterval(this.musicTimer);
    this.musicTimer = null;
  }

  private schedule() {
    const ctx = this.ctx;
    if (!ctx || !this.musicGain || !this.enabled) return;
    const stepsAhead = 8;
    while (this.nextNoteTime < ctx.currentTime + 0.22) {
      const s = this.step;
      const at = this.nextNoteTime - ctx.currentTime;
      const bass = SoundEngine.BASS[s % SoundEngine.BASS.length];
      if (bass) this.tone(midi(bass), { at, dur: 0.16, type: "square", vol: 0.1, dest: this.musicGain });
      const mel = SoundEngine.MELODY[s % SoundEngine.MELODY.length];
      if (mel) this.tone(midi(mel), { at, dur: 0.16, type: "triangle", vol: 0.14, dest: this.musicGain });
      if (s % 2 === 1) this.noise({ at, dur: 0.04, vol: 0.04, freq: 8000 });
      if (s % 4 === 3) this.tone(midi(bass + 12), { at, dur: 0.1, type: "sine", vol: 0.06, dest: this.musicGain });
      this.nextNoteTime += SoundEngine.STEP_DUR;
      this.step++;
    }
    void stepsAhead;
  }
}

export const soundEngine = new SoundEngine();
