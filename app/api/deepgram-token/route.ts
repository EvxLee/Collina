// app/api/deepgram-token/route.ts — hand the browser what it needs to open the
// Deepgram live socket. Browsers can't set an Authorization header on a
// WebSocket and can't use the JWT temp-token flow there, so the only thing that
// works client-side is subprotocol auth with the API key: new WebSocket(url,
// ["token", key]). We return the key from this same-origin route (it stays out
// of the JS bundle; rotate it after the event).
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  const key = process.env.DEEPGRAM_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "DEEPGRAM_API_KEY is not set." }, { status: 500 });
  }
  return NextResponse.json({ key });
}
