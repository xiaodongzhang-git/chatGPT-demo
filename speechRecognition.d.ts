// speechRecognition.d.ts

declare global {
  class SpeechRecognition {
    lang: string;
    maxAlternatives: number;
    continuous: boolean;
    interimResults: boolean;

    start(): void;
    stop(): void;

    addEventListener<K extends keyof SpeechRecognitionEventMap>(
      type: K,
      listener: (
        this: SpeechRecognition,
        ev: SpeechRecognitionEventMap[K]
      ) => any,
      options?: boolean | AddEventListenerOptions
    ): void;

    removeEventListener<K extends keyof SpeechRecognitionEventMap>(
      type: K,
      listener: (
        this: SpeechRecognition,
        ev: SpeechRecognitionEventMap[K]
      ) => any,
      options?: boolean | EventListenerOptions
    ): void;
  }

  interface SpeechRecognitionEventMap {
    error: SpeechRecognitionError;
    end: Event;
    result: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionError {
    error: string;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly length: number;
    readonly isFinal: boolean;
    item(index: number): SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }

  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export {};
