import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transformers.js (local embeddings, used in Batch 2) ships native/.wasm
  // assets that Next should not try to bundle into server code.
  serverExternalPackages: ["@huggingface/transformers"],
};

export default nextConfig;
