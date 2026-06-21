// lib/embeddings.ts — local sentence embeddings via Transformers.js (no API key).
// Model: all-MiniLM-L6-v2 -> 384-dim normalized vectors. Runs in Node on first use
// after a one-time ~90MB model download (cached under ./node_modules/.../.cache).
import { pipeline } from "@huggingface/transformers";

export const EMBEDDING_MODEL = "Xenova/all-MiniLM-L6-v2";
export const EMBEDDING_DIM = 384;

// Minimal shape of the feature-extraction pipeline for how we call it.
type Extractor = (
  text: string,
  opts: { pooling: "mean"; normalize: boolean }
) => Promise<{ data: Float32Array }>;

let extractorPromise: Promise<Extractor> | null = null;

function getExtractor(): Promise<Extractor> {
  if (!extractorPromise) {
    extractorPromise = pipeline(
      "feature-extraction",
      EMBEDDING_MODEL
    ) as unknown as Promise<Extractor>;
  }
  return extractorPromise;
}

// Embed one string into a normalized 384-dim vector.
export async function embed(text: string): Promise<number[]> {
  const extractor = await getExtractor();
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

// Embed many strings (sequential — the taxonomy is tiny).
export async function embedMany(texts: string[]): Promise<number[][]> {
  const out: number[][] = [];
  for (const t of texts) out.push(await embed(t));
  return out;
}

// Pack a vector as little-endian Float32 bytes for Redis storage / KNN params.
export function toFloat32Buffer(vec: number[]): Buffer {
  return Buffer.from(new Float32Array(vec).buffer);
}

// Cosine similarity. Inputs are already normalized, so this is just a dot product.
export function cosineSim(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}
