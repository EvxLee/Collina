// lib/scoring.ts — deterministic scoring (CLAUDE.md section 9).
// Claude returns fallacies + argumentStrength + isRebuttal; WE compute the
// pointDelta here so the scoreboard is consistent and legible (section 13:
// "If a viewer cannot tell why the score changed, the magic breaks").
import type { Fallacy, Speaker } from "./types";

export interface ScoreInput {
  argumentStrength: number; // 0..5 from Claude
  isRebuttal: boolean; // did this turn directly counter the opponent's last point?
  fallacies: Pick<Fallacy, "severity">[];
}

const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

// Base points for the substantive content of a turn.
//   strength 4-5 -> +3 (strong, well supported)
//   strength 3   -> +2 (solid point)
//   strength 2   -> +1 (thin but real)
//   strength 0-1 -> 0  (no substantive point to reward)
export function basePoints(argumentStrength: number): number {
  const s = clamp(Math.round(argumentStrength), 0, 5);
  if (s >= 4) return 3;
  if (s === 3) return 2;
  if (s === 2) return 1;
  return 0;
}

// Each fallacy costs its severity (1..3).
export function fallacyPenalty(fallacies: Pick<Fallacy, "severity">[]): number {
  return fallacies.reduce((sum, f) => sum + clamp(f.severity, 1, 3), 0);
}

// Full point delta for one turn. Rebuttal bonus only applies if the speaker
// actually made a point worth rewarding.
export function computePointDelta(input: ScoreInput): number {
  const base = basePoints(input.argumentStrength);
  const rebuttalBonus = input.isRebuttal && base > 0 ? 1 : 0;
  return base + rebuttalBonus - fallacyPenalty(input.fallacies);
}

export function decideWinner(scoreA: number, scoreB: number): Speaker | "draw" {
  if (scoreA === scoreB) return "draw";
  return scoreA > scoreB ? "A" : "B";
}
