# chester.md — Frontend / The Face + Demo

Read `CLAUDE.md` first for the full product context. This file is only your half of the build. Evan has `evan.md` for the backend.

## Your mission

Build the entire experience the judges see, and own the demo. This project lives or dies on the room's reaction, and that reaction is your UI. Your two "wow" moments: the live scoreboard shifting as the argument unfolds, and the foul flags popping on screen. Make both satisfying and readable from across a room.

You build against MOCK data from minute one, so you are never blocked waiting on Evan's pipeline.

## What you own

- The full Next.js app shell and layout
- Topic banner
- Live transcript view, color-coded by speaker (A vs B)
- The always-visible live scoreboard with animated score changes
- The fallacy flag component (name, one-line why, point penalty)
- The final winner / verdict card
- Audio playback of the ref's TTS callouts (Evan hands you the audio)
- The recorded-clip demo harness and the overall demo UX
- Integration: swapping mock data for Evan's real pipeline
- Driving the demo recording and rehearsing the pitch

You do NOT touch Deepgram, Redis, or Claude internals. You consume `Turn` objects and render them.

## The contract (agree on this with Evan FIRST)

In the shared kickoff (see bottom), the two of you create together:

1. `lib/types.ts` — the `Turn`, `Fallacy`, `DebateSession` types (CLAUDE.md section 7).
2. `lib/mockTurns.ts` — 6 to 8 sample turns so you can build immediately.
3. `lib/debate-client.ts` — the interface. Evan implements the real version, you start with a MOCK version that replays `mockTurns` on a timer so the UI feels live. Same signature both ways:

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

Your UI calls `startDebate("demo", onTurn, onComplete)` and renders each `Turn` as it arrives. You never need to know how the turn was produced. When Evan's real version is ready, you flip one import and it just works.

## Build order

1. Scaffold the Next.js + TypeScript + Tailwind app (this happens in the kickoff so Evan has the repo).
2. Build the mock `startDebate` that replays `mockTurns` with a short delay between each, so you have a "live" feed to develop against.
3. Build the transcript view: each turn as a chat-style line, Speaker A and Speaker B in clearly different colors.
4. Build the scoreboard: two big scores, always visible, that animate when a turn's `pointDelta` lands.
5. Build the fallacy flag: when a turn has fallacies, pop a labeled flag on that line with the name, the why, and the penalty. Make the pop feel punchy.
6. Build the winner card: calls `getVerdict`, shows the winner and the verdict text.
7. Add a "ref is thinking" state between turns so any backend delay reads as deliberation, not lag.
8. Add audio playback for TTS callouts once Evan provides them.
9. Polish hard: animation timing, big legible type, clean layout. This is where the demo is won.

## Make it legible from across a room

Judges watch from a distance. Big speaker colors, big scores, big flags. If someone 15 feet away cannot instantly tell who is winning and why the score just moved, keep fixing it. Readability beats density.

## How to test without the backend

Your mock `startDebate` is your whole world until integration. If the demo looks great on mock turns, you are done with the hard part. The only integration work is pointing `debate-client.ts` at Evan's real implementation.

## Cut order if you run low on time

1. Drop TTS audio playback (show the callout as on-screen text).
2. Drop the "ref is thinking" animation.
3. Keep the transcript, scoreboard, flags, and winner card no matter what. Those are the demo.

## Demo ownership (this is on you)

- Record a clean scripted debate clip on Saturday. Two clear voices, a few obvious fallacies planted, one strong point each. This is the audio the demo runs on, so it never depends on a live mic.
- Time the run so it fits inside 4 minutes with room to talk.
- Rehearse the pitch out loud. Treat it as a performance, not a report. The energy in the room is part of the score.

## Sync points with Evan

- After kickoff: contract committed and pushed, you start on mock.
- Around T+6h: swap in Evan's real `analyzeTurn` on the analysis path.
- Around T+10h: integrate the full real `startDebate`, test end to end on the demo clip.
- Keep `lib/types.ts` as the single source of truth. Any contract change is a two-person decision.

---

## Shared kickoff (both of you, first 30 minutes, do this together)

Do not split until these exist and are pushed:

1. Scaffold the Next.js + TypeScript + Tailwind app.
2. Write `lib/types.ts` (the shared types).
3. Write `lib/mockTurns.ts` (6 to 8 realistic sample turns).
4. Write `lib/debate-client.ts` with the agreed signatures and a working MOCK implementation.
5. Commit, push, both pull.

Then Evan goes to `evan.md`, Chester goes to `chester.md`, and you build in parallel.
