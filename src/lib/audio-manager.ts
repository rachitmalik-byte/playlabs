"use client";

/**
 * PolyQuest Audio Engine
 * 1. Background Music: Joyful, playful, gentle melodic synth for children
 * 2. Text-To-Speech (TTS): Natural, expressive voice using Web Speech API with smart voice picker
 * 3. Sound Effects: Tactile, pleasant physics and discovery audio
 */

// ============================================================
// 1. BACKGROUND MUSIC ENGINE (Web Audio API Synthesizer)
// ============================================================

let audioCtx: AudioContext | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let isMusicPlaying = false;
let musicTimer: ReturnType<typeof setInterval> | null = null;
let currentBar = 0;

// Upbeat, warm pentatonic & major scale frequencies for kids (C, D, E, G, A, B, C5, D5, E5, G5)
const CHORD_PROGRESSION = [
  // Bar 1: C Major (Warm, home feeling)
  { root: 261.63, melody: [523.25, 659.25, 783.99, 659.25, 523.25, 587.33, 659.25, 783.99], bass: 130.81 },
  // Bar 2: F Major (Uplifting, playful)
  { root: 349.23, melody: [698.46, 880.00, 698.46, 659.25, 587.33, 523.25, 587.33, 659.25], bass: 174.61 },
  // Bar 3: G Major (Curious, expectant)
  { root: 392.00, melody: [783.99, 880.00, 987.77, 783.99, 659.25, 783.99, 880.00, 987.77], bass: 196.00 },
  // Bar 4: A Minor / C Resolution (Playful science mystery)
  { root: 220.00, melody: [880.00, 783.99, 659.25, 587.33, 523.25, 659.25, 783.99, 1046.50], bass: 110.00 },
];

function getOrCreateAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
      
      // Master music gain node
      musicGain = audioCtx.createGain();
      musicGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      musicGain.connect(audioCtx.destination);

      // Master SFX gain node
      sfxGain = audioCtx.createGain();
      sfxGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      sfxGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/** Play a warm marimba/celesta pluck note */
function playPluckNote(
  ctx: AudioContext,
  dest: GainNode,
  freq: number,
  time: number,
  duration = 0.35,
  vol = 0.15
) {
  const osc = ctx.createOscillator();
  const noteGain = ctx.createGain();

  // Pure bell-like chime
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, time);

  // Soft envelope: instantaneous attack, exponential chime decay
  noteGain.gain.setValueAtTime(0.001, time);
  noteGain.gain.linearRampToValueAtTime(vol, time + 0.02);
  noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  osc.connect(noteGain);
  noteGain.connect(dest);

  osc.start(time);
  osc.stop(time + duration);

  // Add subtle warm harmonic (2nd harmonic)
  const harmOsc = ctx.createOscillator();
  const harmGain = ctx.createGain();
  harmOsc.type = "triangle";
  harmOsc.frequency.setValueAtTime(freq * 2, time);
  harmGain.gain.setValueAtTime(0.001, time);
  harmGain.gain.linearRampToValueAtTime(vol * 0.35, time + 0.015);
  harmGain.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.6);

  harmOsc.connect(harmGain);
  harmGain.connect(dest);

  harmOsc.start(time);
  harmOsc.stop(time + duration * 0.6);
}

/** Play soft bass note */
function playBassNote(
  ctx: AudioContext,
  dest: GainNode,
  freq: number,
  time: number,
  duration = 1.2
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, time);

  gain.gain.setValueAtTime(0.001, time);
  gain.gain.linearRampToValueAtTime(0.12, time + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(time);
  osc.stop(time + duration);
}

/** Schedule one full bar of joyful music */
function scheduleMusicBar(barIndex: number) {
  const ctx = getOrCreateAudioContext();
  if (!ctx || !musicGain || !isMusicPlaying) return;

  const barData = CHORD_PROGRESSION[barIndex % CHORD_PROGRESSION.length];
  const stepDuration = 0.28; // ~107 BPM bouncy kid tempo
  const now = ctx.currentTime + 0.05;

  // 1. Play warm bass on beats 1 and 3
  playBassNote(ctx, musicGain, barData.bass, now, stepDuration * 3.5);
  playBassNote(ctx, musicGain, barData.bass * 1.5, now + stepDuration * 4, stepDuration * 3.5);

  // 2. Play 8-step melody sequence
  barData.melody.forEach((freq, idx) => {
    const noteVol = (idx === 0 || idx === 4) ? 0.18 : 0.12;
    playPluckNote(ctx, musicGain!, freq, now + idx * stepDuration, stepDuration * 1.2, noteVol);
  });
}

export function startBackgroundMusic() {
  if (typeof window === "undefined") return;
  if (isMusicPlaying) return;

  const ctx = getOrCreateAudioContext();
  if (!ctx || !musicGain) return;

  isMusicPlaying = true;
  currentBar = 0;
  scheduleMusicBar(currentBar);
  currentBar++;

  const barDurationMs = 0.28 * 8 * 1000; // ~2.24s per bar
  musicTimer = setInterval(() => {
    if (isMusicPlaying) {
      scheduleMusicBar(currentBar);
      currentBar++;
    }
  }, barDurationMs);

  localStorage.setItem("polyquest-music-enabled", "true");
  window.dispatchEvent(new CustomEvent("polyquest-audio-state", { detail: { music: true } }));
}

export function stopBackgroundMusic() {
  isMusicPlaying = false;
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("polyquest-music-enabled", "false");
    window.dispatchEvent(new CustomEvent("polyquest-audio-state", { detail: { music: false } }));
  }
}

export function toggleBackgroundMusic(): boolean {
  if (isMusicPlaying) {
    stopBackgroundMusic();
    return false;
  } else {
    startBackgroundMusic();
    return true;
  }
}

export function getIsMusicPlaying(): boolean {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("polyquest-music-enabled");
    if (saved === "false") return false;
  }
  return isMusicPlaying;
}

export function setMusicVolume(targetVol: number) {
  if (!musicGain || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, targetVol)), now + 0.2);
  } catch {}
}

// ============================================================
// 2. NATURAL PIP TEXT-TO-SPEECH (TTS) ENGINE
// ============================================================

let isTtsEnabled = true;
let isSpeakingNow = false;
let lastSpokenText = "";
let currentNeuralAudio: HTMLAudioElement | null = null;
let currentVoicePersona: "child" | "educator" | "adventurer" = "child";

export function setVoicePersona(persona: "child" | "educator" | "adventurer") {
  currentVoicePersona = persona;
  if (typeof window !== "undefined") {
    localStorage.setItem("polyquest-voice-persona", persona);
  }
}

export function getVoicePersona(): "child" | "educator" | "adventurer" {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("polyquest-voice-persona");
    if (saved === "child" || saved === "educator" || saved === "adventurer") return saved;
  }
  return "child";
}

export function setVoiceEnabled(enabled: boolean) {
  isTtsEnabled = enabled;
  if (!enabled) {
    stopSpeaking();
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("polyquest-voice-enabled", enabled ? "true" : "false");
    window.dispatchEvent(new CustomEvent("polyquest-audio-state", { detail: { voice: enabled } }));
  }
}

export function getIsVoiceEnabled(): boolean {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("polyquest-voice-enabled");
    if (saved !== null) return saved === "true";
  }
  return true;
}

/** Get best natural sounding voice available in client browser as fallback */
export function getBestNaturalVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Look for modern natural neural voices
  const naturalNeural = voices.find((v) => 
    v.lang.startsWith("en") && 
    (v.name.includes("Natural") || v.name.includes("Neural") || v.name.includes("Online"))
  );
  if (naturalNeural) return naturalNeural;

  // 2. High-grade platform voices
  const premiumNamed = voices.find((v) => 
    v.lang.startsWith("en") && 
    (v.name.includes("Jenny") || 
     v.name.includes("Aria") || 
     v.name.includes("Samantha") || 
     v.name.includes("Google US English") || 
     v.name.includes("Google UK English Female") || 
     v.name.includes("Microsoft Zira") || 
     v.name.includes("Victoria") || 
     v.name.includes("Karen") || 
     v.name.includes("Moira"))
  );
  if (premiumNamed) return premiumNamed;

  const englishFemale = voices.find((v) => 
    v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
  );
  if (englishFemale) return englishFemale;

  const anyEnglish = voices.find((v) => v.lang.startsWith("en"));
  if (anyEnglish) return anyEnglish;

  return voices[0] || null;
}

/** Fallback to local browser speech synthesis only if neural audio fails */
function speakBrowserFallback(cleanText: string, callbacks?: { onStart?: () => void; onEnd?: () => void }) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    callbacks?.onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const naturalVoice = getBestNaturalVoice();

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }
    utterance.lang = "en-US";
    utterance.rate = 0.94;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      isSpeakingNow = true;
      setMusicVolume(0.12);
      callbacks?.onStart?.();
      window.dispatchEvent(new CustomEvent("polyquest-pip-speaking", { detail: { speaking: true } }));
    };

    utterance.onend = () => {
      isSpeakingNow = false;
      setMusicVolume(0.35);
      callbacks?.onEnd?.();
      window.dispatchEvent(new CustomEvent("polyquest-pip-speaking", { detail: { speaking: false } }));
    };

    utterance.onerror = () => {
      isSpeakingNow = false;
      setMusicVolume(0.35);
      callbacks?.onEnd?.();
      window.dispatchEvent(new CustomEvent("polyquest-pip-speaking", { detail: { speaking: false } }));
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    callbacks?.onEnd?.();
  }
}

/** Speak Pip's dialogue exclusively with Natural Neural Audio */
export function speak(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
  }
) {
  if (!getIsVoiceEnabled() || typeof window === "undefined") {
    callbacks?.onEnd?.();
    return;
  }

  // Clean text from emojis, markdown, and arrows
  const cleanText = text
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
    .replace(/[*_#`~➔→]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanText) {
    callbacks?.onEnd?.();
    return;
  }

  lastSpokenText = text;
  
  // Stop any currently playing audio or speech synthesis immediately
  stopSpeaking();

  try {
    const persona = getVoicePersona();
    const ttsUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&voice=${persona}`;

    const audio = new Audio(ttsUrl);
    currentNeuralAudio = audio;

    audio.onplay = () => {
      isSpeakingNow = true;
      setMusicVolume(0.12);
      callbacks?.onStart?.();
      window.dispatchEvent(new CustomEvent("polyquest-pip-speaking", { detail: { speaking: true } }));
    };

    audio.onended = () => {
      isSpeakingNow = false;
      setMusicVolume(0.35);
      currentNeuralAudio = null;
      callbacks?.onEnd?.();
      window.dispatchEvent(new CustomEvent("polyquest-pip-speaking", { detail: { speaking: false } }));
    };

    audio.onerror = () => {
      currentNeuralAudio = null;
      speakBrowserFallback(cleanText, callbacks);
    };

    audio.play().catch(() => {
      speakBrowserFallback(cleanText, callbacks);
    });

  } catch {
    speakBrowserFallback(cleanText, callbacks);
  }
}

export function replayLastSpeech() {
  if (lastSpokenText) {
    speak(lastSpokenText);
  }
}

export function stopSpeaking() {
  if (currentNeuralAudio) {
    currentNeuralAudio.pause();
    currentNeuralAudio.currentTime = 0;
    currentNeuralAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  isSpeakingNow = false;
  setMusicVolume(0.35);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("polyquest-pip-speaking", { detail: { speaking: false } }));
  }
}

export function isPipSpeaking(): boolean {
  return isSpeakingNow;
}

// ============================================================
// 3. SOUND EFFECTS ENGINE
// ============================================================

export function playPopSound() {
  const ctx = getOrCreateAudioContext();
  if (!ctx || !sfxGain) return;
  const now = ctx.currentTime;
  playPluckNote(ctx, sfxGain, 650, now, 0.12, 0.2);
  playPluckNote(ctx, sfxGain, 980, now + 0.04, 0.15, 0.25);
}

export function playDiscoverySound() {
  const ctx = getOrCreateAudioContext();
  if (!ctx || !sfxGain) return;
  const now = ctx.currentTime;
  // Joyful ascending triad: C5, E5, G5, C6
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
    playPluckNote(ctx, sfxGain!, freq, now + idx * 0.08, 0.35, 0.22);
  });
}

export function playSuccessSound() {
  const ctx = getOrCreateAudioContext();
  if (!ctx || !sfxGain) return;
  const now = ctx.currentTime;
  // Triumph fanfare
  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, idx) => {
    playPluckNote(ctx, sfxGain!, freq, now + idx * 0.07, 0.45, 0.25);
  });
}

export function playWarningSound() {
  const ctx = getOrCreateAudioContext();
  if (!ctx || !sfxGain) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.linearRampToValueAtTime(220, now + 0.3);
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.connect(gain);
  gain.connect(sfxGain);
  osc.start(now);
  osc.stop(now + 0.3);
}

export function playClickSound() {
  const ctx = getOrCreateAudioContext();
  if (!ctx || !sfxGain) return;
  const now = ctx.currentTime;
  playPluckNote(ctx, sfxGain, 900, now, 0.06, 0.12);
}

// User-gesture audio unlocker: unlocks AudioContext and starts background music on first tap anywhere
export function setupGlobalAudioUnlock() {
  if (typeof window === "undefined") return;

  const unlock = () => {
    const ctx = getOrCreateAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    // If music is set to enabled (or default first visit), start it!
    const saved = localStorage.getItem("polyquest-music-enabled");
    if (saved !== "false") {
      startBackgroundMusic();
    }
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };

  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
}

// Preload voices
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
