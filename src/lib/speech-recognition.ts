"use client";

/**
 * PolyQuest Speech Recognition (STT) Engine
 * Uses the Web Speech Recognition API (SpeechRecognition / webkitSpeechRecognition)
 * completely free and local in the browser.
 */

export interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
  confidence: number;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
}

export class MagicVoiceListener {
  private recognition: any = null;
  private isListening = false;
  private targetWords: string[] = [];
  private onMatchCallback: ((matchedWord: string, transcript: string) => void) | null = null;
  private onTranscriptCallback: ((transcript: string, isFinal: boolean) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const SpeechRecognitionClass = 
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognitionClass) {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = "en-US";

        this.recognition.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const result = event.results[i];
            const text = result[0].transcript;
            if (result.isFinal) {
              finalTranscript += text;
            } else {
              interimTranscript += text;
            }
          }

          const currentText = (finalTranscript || interimTranscript).toLowerCase().trim();
          this.onTranscriptCallback?.(currentText, !!finalTranscript);

          // Check if any target magic word is spoken
          for (const target of this.targetWords) {
            const normalizedTarget = target.toLowerCase().trim();
            if (currentText.includes(normalizedTarget)) {
              this.onMatchCallback?.(target, currentText);
              this.stop();
              return;
            }
          }
        };

        this.recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          this.onErrorCallback?.(event.error);
        };

        this.recognition.onend = () => {
          this.isListening = false;
          this.onEndCallback?.();
        };
      }
    }
  }

  public start({
    targetWords,
    onMatch,
    onTranscript,
    onError,
    onEnd,
  }: {
    targetWords: string[];
    onMatch: (matchedWord: string, transcript: string) => void;
    onTranscript?: (transcript: string, isFinal: boolean) => void;
    onError?: (error: string) => void;
    onEnd?: () => void;
  }) {
    if (!this.recognition) {
      onError?.("Speech recognition not supported in this browser");
      return;
    }

    this.targetWords = targetWords;
    this.onMatchCallback = onMatch;
    this.onTranscriptCallback = onTranscript || null;
    this.onErrorCallback = onError || null;
    this.onEndCallback = onEnd || null;

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      console.warn("Could not start recognition:", err);
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListening = false;
    }
  }

  public getIsListening(): boolean {
    return this.isListening;
  }
}
