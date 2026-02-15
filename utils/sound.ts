// Sound Effects Engine using Web Audio API

export const playBellSound = () => {
  if (typeof window === 'undefined') return;
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const t = ctx.currentTime;

  // Realistic Temple Bell Synthesis
  const fundamental = 523.25; // C5
  const partials = [
    { ratio: 1.0, gain: 0.4, decay: 2.5 },
    { ratio: 2.0, gain: 0.1, decay: 1.5 },
    { ratio: 3.0, gain: 0.05, decay: 1.0 },
    { ratio: 4.1, gain: 0.05, decay: 0.8 },
    { ratio: 5.8, gain: 0.03, decay: 0.6 }
  ];

  partials.forEach(p => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(fundamental * p.ratio, t);
    
    // Envelope
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(p.gain, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + p.decay);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + p.decay + 0.1);
  });
};

export const playDamruSound = () => {
  if (typeof window === 'undefined') return;
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();

  // Create two distinct beats for "Dug-Dug"
  [0, 0.15].forEach((startTime) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime + startTime);
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + startTime + 0.1);

    gain.gain.setValueAtTime(0.5, ctx.currentTime + startTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + startTime + 0.1);

    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + 0.1);
  });
};