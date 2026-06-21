// lib/fallacies.ts — the fallacy taxonomy (CLAUDE.md section 8).
// Used two ways:
//   1. Seed source for Redis vector search (Batch 2).
//   2. Inline fallback passed straight to Claude if Redis is unavailable
//      (CLAUDE.md cut-order item 2 — we lose the Redis prize, not the demo).
import type { FallacyDef } from "./types";

export const FALLACIES: FallacyDef[] = [
  {
    name: "Strawman",
    definition:
      "Misrepresenting or exaggerating someone's argument to make it easier to attack.",
    examples: [
      "So you're saying we should just let anyone do whatever they want?",
      "You want no rules at all, basically chaos.",
    ],
  },
  {
    name: "Ad hominem",
    definition:
      "Attacking the person making the argument instead of the argument itself.",
    examples: [
      "You'd only think that because you're clueless.",
      "Why would I listen to someone with no taste?",
    ],
  },
  {
    name: "Slippery slope",
    definition:
      "Claiming one small step will inevitably lead to an extreme outcome without justification.",
    examples: [
      "If we allow this, soon everything will fall apart.",
      "First it's one exception, then the whole system collapses.",
    ],
  },
  {
    name: "False dilemma",
    definition:
      "Presenting only two options as if they are the only possibilities when more exist.",
    examples: [
      "Either you're with us or against us.",
      "We either ban it completely or accept total disaster.",
    ],
  },
  {
    name: "Appeal to authority",
    definition:
      "Claiming something is true simply because an authority or expert says so.",
    examples: [
      "A famous chef said it, so it must be right.",
      "Experts agree, so the debate is over.",
    ],
  },
  {
    name: "Circular reasoning",
    definition:
      "Using the conclusion as one of the premises, so the argument assumes what it tries to prove.",
    examples: [
      "It's the best because nothing is better.",
      "We know it's true because it says so right here.",
    ],
  },
  {
    name: "Red herring",
    definition:
      "Introducing an irrelevant point to distract from the actual issue.",
    examples: [
      "Why worry about this when there are bigger problems?",
      "That's not important, let's talk about something else.",
    ],
  },
  {
    name: "Moving the goalposts",
    definition:
      "Changing the criteria for proof after the original demand has been met.",
    examples: [
      "Okay, but that doesn't count, show me something better.",
      "Sure you proved that, but now prove this other thing too.",
    ],
  },
  {
    name: "Whataboutism",
    definition:
      "Deflecting criticism by pointing to someone else's wrongdoing instead of answering.",
    examples: [
      "What about the other side, they do it too.",
      "Why pick on me when everyone else is worse?",
    ],
  },
  {
    name: "Hasty generalization",
    definition:
      "Drawing a broad conclusion from a small or unrepresentative sample.",
    examples: [
      "I met two of them and they were rude, so they all are.",
      "It happened once, so it always happens.",
    ],
  },
  {
    name: "Appeal to emotion",
    definition:
      "Using feelings such as fear or pity to win the argument instead of reasons.",
    examples: [
      "Think of how much this would hurt people.",
      "If you cared at all, you'd agree with me.",
    ],
  },
  {
    name: "No true Scotsman",
    definition:
      "Dismissing a counterexample by redefining the group to exclude it.",
    examples: [
      "No real fan would ever say that.",
      "Anyone who disagrees isn't a true expert.",
    ],
  },
  {
    name: "False equivalence",
    definition:
      "Treating two things as the same when they differ in important ways.",
    examples: [
      "That's basically the same as this completely different thing.",
      "Both sides are equally bad, so it's a wash.",
    ],
  },
  {
    name: "Gish gallop",
    definition:
      "Overwhelming an opponent with many weak claims at once so none can be answered.",
    examples: [
      "There are a dozen reasons and you can't refute a single one.",
      "Point after point after point, too many to address.",
    ],
  },
  {
    name: "Appeal to ignorance",
    definition:
      "Claiming something is true because it has not been proven false, or vice versa.",
    examples: [
      "No one has proven it wrong, so it must be right.",
      "You can't disprove it, therefore it's true.",
    ],
  },
  {
    name: "Loaded question",
    definition:
      "Asking a question that contains an unproven assumption, trapping any answer.",
    examples: [
      "Why do you always ruin everything?",
      "When did you stop making bad arguments?",
    ],
  },
  {
    name: "Bandwagon",
    definition:
      "Arguing something is correct or good because many people believe or do it.",
    examples: [
      "Everyone loves it, so it must be the best.",
      "It's the most popular choice, so it clearly wins.",
    ],
  },
];

// Compact reference block for prompting Claude (used as the inline fallback,
// and as the shape we hand retrieved matches to in Batch 3).
export function formatFallaciesForPrompt(defs: FallacyDef[]): string {
  return defs
    .map((f) => `- ${f.name}: ${f.definition}`)
    .join("\n");
}
