"use client";

/**
 * PolyQuest Audio Engine
 * 1. Background Music: Joyful, playful synthesizer for children
 * 2. Text-To-Speech (TTS): Exclusive, high-definition Neural Kid Voice (en-US-AnaNeural).
 *    Zero overlapping voices, zero adult fallback overlap.
 * 3. Karaoke Word Highlighting: Synchronized word tracking as Pip speaks.
 * 4. Sound Effects: Tactile physics and discovery audio.
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
// 2. EXCLUSIVE NATURAL PIP VOICE ENGINE (Single Flight Only)
// ============================================================

let isTtsEnabled = true;
let isSpeakingNow = false;
let lastSpokenText = "";
let currentAudio: HTMLAudioElement | null = null;
let wordHighlightTimer: ReturnType<typeof setInterval> | null = null;

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

export function stopSpeaking() {
  if (wordHighlightTimer) {
    clearInterval(wordHighlightTimer);
    wordHighlightTimer = null;
  }

  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.src = "";
    } catch {}
    currentAudio = null;
  }

  // Cancel any browser speech synthesis as a failsafe
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }

  isSpeakingNow = false;
  setMusicVolume(0.35);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("polyquest-pip-speaking", { detail: { speaking: false, wordIndex: -1 } }));
  }
}

/**
 * Speak Pip's dialogue exclusively using the Neural Kid Voice.
 * Zero overlap guaranteed. Automatically estimates word timings for karaoke highlighting.
 */
export function speak(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onWordHighlight?: (wordIndex: number) => void;
  }
) {
  if (!getIsVoiceEnabled() || typeof window === "undefined") {
    callbacks?.onEnd?.();
    return;
  }

  // Clean text from emojis, markdown, and arrows
  const cleanText = text
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
    .replace(/[*_#`~➔→✓✗⚠️]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanText) {
    callbacks?.onEnd?.();
    return;
  }

  lastSpokenText = text;

  // 1. Strictly stop any previous audio or synthesis
  stopSpeaking();

  try {
    const ttsUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&voice=child`;
    const audio = new Audio(ttsUrl);
    currentAudio = audio;

    const words = cleanText.split(" ");
    let currentWordIdx = 0;

    audio.onplay = () => {
      isSpeakingNow = true;
      setMusicVolume(0.12);
      callbacks?.onStart?.();
      window.dispatchEvent(new CustomEvent("polyquest-pip-speaking", { detail: { speaking: true, wordIndex: 0 } }));

      // Synchronize Karaoke word highlighting
      if (words.length > 0) {
        callbacks?.onWordHighlight?.(0);
        const estimatedDurationMs = Math.max(1200, words.length * 280);
        const perWordMs = estimatedDurationMs / words.length;

        if (wordHighlightTimer) clearInterval(wordHighlightTimer);
        wordHighlightTimer = setInterval(() => {
          currentWordIdx++;
          if (currentWordIdx < words.length) {
            callbacks?.onWordHighlight?.(currentWordIdx);
            window.dispatchEvent(new CustomEvent("polyquest-pip-speaking", { detail: { speaking: true, wordIndex: currentWordIdx } }));
          } else {
            if (wordHighlightTimer) clearInterval(wordHighlightTimer);
          }
        }, perWordMs);
      }
    };

    audio.onended = () => {
      stopSpeaking();
      callbacks?.onEnd?.();
    };

    audio.onerror = () => {
      stopSpeaking();
      callbacks?.onEnd?.();
    };

    audio.play().catch(() => {
      // If autoplay was blocked by browser, simply reset state without invoking any robot voice
      stopSpeaking();
      callbacks?.onEnd?.();
    });

  } catch {
    stopSpeaking();
    callbacks?.onEnd?.();
  }
}

export function replayLastSpeech() {
  if (lastSpokenText) {
    speak(lastSpokenText);
  }
}

export function isPipSpeaking(): boolean {
  return isSpeakingNow;
}

// Stop speech on page navigation / unmount automatically
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => stopSpeaking());
  window.addEventListener("pagehide", () => stopSpeaking());
  window.addEventListener("popstate", () => stopSpeaking());
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
  // Celebratory chord fanfare
  [440, 554.37, 659.25, 880].forEach((freq, idx) => {
    playPluckNote(ctx, sfxGain!, freq, now + idx * 0.06, 0.45, 0.2);
  });
}

export function playWarningSound() {
  const ctx = getOrCreateAudioContext();
  if (!ctx || !sfxGain) return;
  const now = ctx.currentTime;
  playPluckNote(ctx, sfxGain, 320, now, 0.2, 0.18);
  playPluckNote(ctx, sfxGain, 240, now + 0.12, 0.3, 0.18);
}

export function playClickSound() {
  const ctx = getOrCreateAudioContext();
  if (!ctx || !sfxGain) return;
  const now = ctx.currentTime;
  playPluckNote(ctx, sfxGain, 880, now, 0.06, 0.12);
}

export function setupGlobalAudioUnlock() {
  if (typeof window === "undefined") return;
  const unlock = () => {
    getOrCreateAudioContext();
    window.removeEventListener("click", unlock);
    window.removeEventListener("touchstart", unlock);
  };
  window.addEventListener("click", unlock, { once: true });
  window.addEventListener("touchstart", unlock, { once: true });
}

export function getVoicePersona(): "child" | "educator" | "adventurer" {
  return "child";
}

export function setVoicePersona(_persona: "child" | "educator" | "adventurer") {
  // Always use the friendly kid voice persona
}
