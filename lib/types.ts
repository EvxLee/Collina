// lib/types.ts — THE SHARED CONTRACT (single source of truth).
// From CLAUDE.md section 7. Any change here is a two-person decision (Evan + Chester).

export type Speaker = "A" | "B";
export type DebateStatus = "setup" | "live" | "finished";

export interface Fallacy {
  type: string; // e.g. "Strawman"
  severity: 1 | 2 | 3; // 1 minor, 3 egregious
  quote: string; // the exact phrase that triggered it
  explanation: string; // one line, plain English
}

// Optional ref voice-line attached to a turn (TTS, Batch 6). Non-breaking add-on:
// the frontend can show `text` and play `audioBase64` if present.
export interface Callout {
  text: string; // e.g. "Strawman! Minus two, Speaker B."
  audioBase64?: string; // Deepgram TTS (mp3) as base64; played on the client
}

export interface Turn {
  id: string;
  speaker: Speaker;
  text: string;
  timestamp: number; // ms epoch
  fallacies: Fallacy[];
  argumentStrength: number; // 0 to 5
  pointDelta: number; // can be negative
  callout?: Callout; // present for high-severity fouls (optional)
}

export interface DebateSession {
  id: string;
  topic: string;
  status: DebateStatus;
  turns: Turn[];
  scoreA: number;
  scoreB: number;
  winner?: Speaker | "draw";
  verdict?: string;
}

// Fallacy definitions live in Redis, not on a Turn. Embedding is set at seed time.
export interface FallacyDef {
  name: string;
  definition: string;
  examples: string[];
  embedding?: number[];
}
