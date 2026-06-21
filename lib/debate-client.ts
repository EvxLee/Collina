// lib/debate-client.ts — THE SHARED CONTRACT surface. Chester's UI imports ONLY
// from this file and never needs to know how a Turn was produced.
//
//   startDebate(source, onTurn, onComplete) -> { stop }
//   getVerdict(session) -> { winner, verdict }
//
// Today this points at the MOCK (replays mockTurns). In Batch 5, Evan adds
// lib/realDebateClient.ts (Deepgram -> turns -> Claude analysis -> scored turns)
// and flips the single line below. Same signatures, so the UI is unchanged.
import * as mock from "./mockDebateClient";

const impl = mock; // Batch 5: swap to `real` (lib/realDebateClient.ts)

export const startDebate = impl.startDebate;
export const getVerdict = impl.getVerdict;
