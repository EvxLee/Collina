// Placeholder landing page. Chester (chester.md) owns the real UI shell,
// scoreboard, transcript, flags, and winner card. This just proves the
// scaffold runs and points at the shared contract in lib/debate-client.ts.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Debate Referee</h1>
      <p className="max-w-md text-neutral-400">
        Scaffold is live. Frontend UI lands here (Chester). Backend pipeline
        lives in <code className="text-neutral-200">lib/</code> and{" "}
        <code className="text-neutral-200">app/api/</code> (Evan).
      </p>
    </main>
  );
}
