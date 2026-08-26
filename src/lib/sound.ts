class SoundManager {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;

  private init() {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContext();
    }
  }

  setSoundEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  isSoundEnabled(): boolean {
    return this.isEnabled;
  }

  private playTone(frequency: number, type: OscillatorType, duration: number, volume: number = 0.1) {
    if (!this.isEnabled) return;
    this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playDiscovery() {
    this.playTone(523.25, 'sine', 0.5, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.8, 0.2), 100); // E5
  }

  playSuccess() {
    this.playTone(440, 'triangle', 0.3, 0.1); // A4
    setTimeout(() => this.playTone(554.37, 'triangle', 0.3, 0.1), 150); // C#5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.6, 0.1), 300); // E5
  }

  playWarning() {
    this.playTone(300, 'sawtooth', 0.3, 0.1);
    setTimeout(() => this.playTone(250, 'sawtooth', 0.4, 0.1), 150);
  }

  playClick() {
    this.playTone(800, 'sine', 0.05, 0.05);
  }

  playExperiment() {
    if (!this.isEnabled) return;
    this.init();
    if (!this.audioContext) return;
    
    // Noise/whoosh for experiment
    const bufferSize = this.audioContext.sampleRate * 0.5; // 0.5 seconds
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
    
    noise.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    noise.start();
  }
}

export const soundManager = new SoundManager();
