// scripts/test-retrieval.ts — prove vector search returns the right fallacy for
// obvious example sentences. Run after seeding: npm run test:retrieval
import "./_env";
import { retrieveFallacies } from "../lib/fallacyStore";
import { closeRedis } from "../lib/redis";

const tests: { text: string; expect: string }[] = [
  { text: "You'd only believe that because you're a clueless idiot with no taste.", expect: "Ad hominem" },
  { text: "If we allow this one exception, soon the entire system will collapse.", expect: "Slippery slope" },
  { text: "Everyone is doing it, so it's clearly the right choice.", expect: "Bandwagon" },
  { text: "What about the other side? They cheat way more than we do.", expect: "Whataboutism" },
  { text: "Either you fully support this or you're our enemy.", expect: "False dilemma" },
  { text: "So basically you want total chaos with no rules at all.", expect: "Strawman" },
];

async function main() {
  // The real pipeline retrieves top-k candidates and lets Claude pick, so the
  // metric that matters is "expected fallacy is in the retrieved set".
  const K = 4;
  let inSet = 0;
  let topOne = 0;
  for (const t of tests) {
    const hits = await retrieveFallacies(t.text, K);
    const rank = hits.findIndex((h) => h.name === t.expect); // 0-based, -1 if absent
    if (rank === 0) topOne++;
    if (rank >= 0) inSet++;
    const ranked = hits.map((h) => `${h.name} ${h.score.toFixed(2)}`).join(" | ");
    const status = rank === 0 ? "TOP " : rank > 0 ? "IN-K" : "MISS";
    console.log(`${status}  want=${t.expect.padEnd(16)} rank=${rank < 0 ? "-" : rank + 1}  [${ranked}]`);
  }
  console.log(
    `\n${inSet}/${tests.length} had the expected fallacy in top-${K} (${topOne}/${tests.length} ranked it #1).`
  );
  await closeRedis();
}

main().catch((err) => {
  console.error("Retrieval test failed:", err);
  process.exit(1);
});
