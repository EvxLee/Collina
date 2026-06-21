// scripts/seed-redis.ts — embed the fallacy taxonomy and load it into Redis.
//   run: npm run seed:redis
// First run downloads the embedding model (~90MB), then seeds in a second or two.
import "./_env";
import { seedFallacies } from "../lib/fallacyStore";
import { closeRedis } from "../lib/redis";

async function main() {
  console.log("Embedding + seeding fallacy taxonomy into Redis...");
  const start = Date.now();
  const n = await seedFallacies();
  console.log(`Seeded ${n} fallacies in ${((Date.now() - start) / 1000).toFixed(1)}s.`);
  await closeRedis();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
