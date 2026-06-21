# evan.md — Backend / The Brain

Read `CLAUDE.md` first for the full product context. This file is only your half of the build. Chester has `chester.md` for the frontend.

## Your mission

Turn audio into fully analyzed, scored `Turn` objects, fast and accurate. You own everything from the microphone to the moment a scored turn is ready for the UI. You also own the final verdict. You do NOT touch UI components.

The one thing that decides whether we win: **fallacy detection has to be sharp.** A false flag breaks the illusion. This is your job and your strength. Spend your quality time here.

## What you own

- Deepgram: streaming speech-to-text + speaker diarization
- Deepgram: text-to-speech for the ref's voice callouts
- Redis: the fallacy taxonomy vector store and per-turn retrieval
- Claude: the per-turn analysis call and the final verdict call
- Scoring logic (point deltas, running totals)
- All `/api` routes and all of `lib/` except the UI

## The contract (agree on this with Chester FIRST)

Before splitting, the two of you create these together in the shared kickoff (see bottom). This is the only thing that lets you work in parallel:

1. `lib/types.ts` — the `Turn`, `Fallacy`, `DebateSession` types from CLAUDE.md section 7.
2. `lib/mockTurns.ts` — 6 to 8 hand-written sample `Turn` objects so Chester can build the UI before your pipeline exists.
3. `lib/debate-client.ts` — the interface both halves agree on. You implement the REAL version, Chester uses a MOCK version. Signature:

```ts
export function startDebate(
  audioSource: File | "mic" | "demo",
  onTurn: (turn: Turn) => void,
  onComplete: (session: DebateSession) => void
): { stop: () => void };

export async function getVerdict(
  session: DebateSession
): Promise<{ winner: "A" | "B" | "draw"; verdict: string }>;
```

Your real `startDebate` runs audio through Deepgram, segments into turns, analyzes each, computes the score, and calls `onTurn` with a fully populated `Turn`. Chester just renders whatever you hand him. Keep this signature stable. If it has to change, tell Chester immediately.

## Build order

1. Confirm Deepgram streaming STT + diarization works on the demo clip. Log transcript with speaker labels. (Hit their workshop, it ships a starter app.)
2. Build turn segmentation: buffer the stream into discrete turns, split on speaker change or pause.
3. Seed the Redis fallacy taxonomy (CLAUDE.md section 8). Embed definitions once, confirm vector search returns sensible matches for a test sentence.
4. Build the Claude analysis route: turn text in, retrieve relevant fallacies from Redis, return the JSON from CLAUDE.md section 10. Test on hand-written turns until the calls are accurate and not trigger-happy.
5. Add scoring (CLAUDE.md section 9). Attach `pointDelta` to each turn.
6. Wire it all into the real `startDebate`. Emit fully scored turns via `onTurn`.
7. Build `getVerdict` using the final-verdict prompt.
8. Add Deepgram TTS: generate a short audio callout for high-severity fouls, return it so the frontend can play it.

## How to test without the frontend

You never need the UI to validate your work. Write a tiny script or test route that:
- feeds a hand-written turn into the analyze route and prints the JSON
- runs the demo clip through `startDebate` and logs each emitted `Turn`
- checks Redis vector search returns the right fallacy for an obvious example

If the logged turns look right, the UI will look right.

## Cut order if you run low on time

Cut in this exact order, never past the line:
1. Drop TTS callouts (frontend can show the callout as text instead).
2. Replace Redis with a hardcoded fallacy list passed inline to Claude. (You lose the Redis prize, not the demo.)
3. Drop live mic entirely. The demo runs on the recorded clip regardless.

Never cut: STT + diarization, fallacy detection, scoring. Those are the core loop.

## Models and keys

- Analysis: `claude-sonnet-4-6` for the latency/quality balance. Drop to `claude-haiku-4-5` for fast foul callouts if needed.
- Put `DEEPGRAM_API_KEY`, `ANTHROPIC_API_KEY`, `REDIS_URL` in `.env`. You own getting these working.

## Sync points with Chester

- After kickoff: contract committed and pushed.
- Around T+6h: hand Chester your real `analyzeTurn` so he can swap one piece off mock.
- Around T+10h: full `startDebate` live, integrate end to end.
- Keep `lib/types.ts` as the single source of truth. Any contract change is a two-person decision.
