// scripts/test-scoring.ts — validates the scoring rules with no keys required.
//   run: npx tsx scripts/test-scoring.ts   (or: npm run test:scoring)
import assert from "node:assert";
import { computePointDelta, decideWinner } from "../lib/scoring";

interface Case {
  name: string;
  strength: number;
  isRebuttal: boolean;
  severities: (1 | 2 | 3)[];
  expected: number;
}

const cases: Case[] = [
  { name: "clean strong point", strength: 4, isRebuttal: false, severities: [], expected: 3 },
  { name: "strong rebuttal", strength: 5, isRebuttal: true, severities: [], expected: 4 },
  { name: "solid point", strength: 3, isRebuttal: false, severities: [], expected: 2 },
  { name: "thin point", strength: 2, isRebuttal: false, severities: [], expected: 1 },
  { name: "weak, nothing to reward", strength: 1, isRebuttal: false, severities: [], expected: 0 },
  { name: "pure ad hominem", strength: 1, isRebuttal: false, severities: [2], expected: -2 },
  { name: "egregious slippery slope", strength: 1, isRebuttal: false, severities: [3], expected: -3 },
  { name: "rebuttal but no point made", strength: 1, isRebuttal: true, severities: [], expected: 0 },
  { name: "solid rebuttal with a minor foul", strength: 3, isRebuttal: true, severities: [1], expected: 2 },
  { name: "strong point that still fouls twice", strength: 4, isRebuttal: false, severities: [2, 1], expected: 0 },
];

let passed = 0;
for (const c of cases) {
  const delta = computePointDelta({
    argumentStrength: c.strength,
    isRebuttal: c.isRebuttal,
    fallacies: c.severities.map((severity) => ({ severity })),
  });
  const ok = delta === c.expected;
  console.log(`${ok ? "PASS" : "FAIL"}  ${String(delta).padStart(3)}  (want ${c.expected})  ${c.name}`);
  assert.strictEqual(delta, c.expected, `${c.name}: got ${delta}, want ${c.expected}`);
  passed++;
}

assert.strictEqual(decideWinner(4, 1), "A");
assert.strictEqual(decideWinner(1, 4), "B");
assert.strictEqual(decideWinner(2, 2), "draw");

console.log(`\nAll ${passed} scoring cases + winner logic passed.`);
