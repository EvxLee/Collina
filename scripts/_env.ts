// scripts/_env.ts — load .env / .env.local the same way Next.js does, so standalone
// scripts (run via tsx) see REDIS_URL, ANTHROPIC_API_KEY, etc. Import this FIRST.
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());
