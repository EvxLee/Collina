// lib/debate-client.ts — THE SHARED CONTRACT surface. Chester's UI imports ONLY
// from this file and never needs to know how a Turn was produced.
//
//   startDebate(source, onTurn, onComplete) -> { stop }
//   getVerdict(session) -> { winner, verdict }
//
// MOCK replays mockTurns with zero backend; REAL (lib/realDebateClient.ts) runs
// the live pipeline (Deepgram -> turns -> Claude analysis -> TTS -> verdict) via
// API routes. Same signatures, so the UI is identical either way.
//
// Default is MOCK so the UI works with no keys. Set
// NEXT_PUBLIC_USE_REAL_PIPELINE=true (and provide a demo clip + keys) to go live.
import * as mock from "./mockDebateClient";
import * as real from "./realDebateClient";

// "demo" / "Start the chaos" ALWAYS plays the scripted mock — bulletproof, no
// keys, no clip, can't fail. "mic" / "Go live" ALWAYS uses the real streaming
// pipeline. (No env flag — clearer and avoids breaking the safe demo.)
export const startDebate: typeof real.startDebate = (source, onTurn, onComplete, onInterim) => {
  const impl = source === "mic" ? real : mock;
  return impl.startDebate(source, onTurn, onComplete, onInterim);
};

// Use the real Claude verdict when the API is reachable; fall back to the mock
// verdict so the offline demo never breaks.
export const getVerdict: typeof real.getVerdict = async (session) => {
  try {
    return await real.getVerdict(session);
  } catch {
    return mock.getVerdict(session);
  }
};
