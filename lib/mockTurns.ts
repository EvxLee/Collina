// lib/mockTurns.ts — hand-written sample debate so Chester can build the UI
// before the real pipeline exists. Topic: pineapple on pizza.
//   Speaker A = pro-pineapple, Speaker B = anti-pineapple.
// Scores follow CLAUDE.md section 9. Running tally lands A +4, B +1 (A wins),
// with one severity-3 foul (T4) carrying a ref callout to exercise TTS UI.
import type { Turn } from "./types";

export const MOCK_TOPIC = "Pineapple belongs on pizza.";

const BASE = 1_700_000_000_000; // fixed base so timestamps are stable across reloads
const at = (i: number) => BASE + i * 8000;

export const mockTurns: Turn[] = [
  {
    id: "t1",
    speaker: "A",
    text: "Pineapple belongs on pizza because the sweetness balances the salty cured ham and the acidity cuts through the heavy cheese. Sweet and savory is a classic pairing, think prosciutto and melon.",
    timestamp: at(0),
    fallacies: [],
    argumentStrength: 4,
    pointDelta: 2, // substantive, supported, clean
  },
  {
    id: "t2",
    speaker: "B",
    text: "Only someone with absolutely no taste would put fruit on a pizza. People who order Hawaiian clearly just have unsophisticated palates.",
    timestamp: at(1),
    fallacies: [
      {
        type: "Ad hominem",
        severity: 2,
        quote: "Only someone with absolutely no taste",
        explanation: "Attacks the person's character instead of the argument.",
      },
    ],
    argumentStrength: 1,
    pointDelta: -2, // severity-2 foul, no real point made
  },
  {
    id: "t3",
    speaker: "A",
    text: "Attacking my taste isn't an argument. The point stands: flavor contrast is a culinary principle used everywhere, from sweet-and-sour pork to honey-glazed ham. That's reasoning, not just preference.",
    timestamp: at(2),
    fallacies: [],
    argumentStrength: 5,
    pointDelta: 3, // strong supported point + directly rebuts B
  },
  {
    id: "t4",
    speaker: "B",
    text: "If we allow pineapple, what's next? Chocolate? Gummy bears? Soon pizza won't mean anything and Italian cuisine will collapse entirely.",
    timestamp: at(3),
    fallacies: [
      {
        type: "Slippery slope",
        severity: 3,
        quote: "Soon pizza won't mean anything and Italian cuisine will collapse entirely",
        explanation:
          "Assumes one small step inevitably leads to an extreme outcome.",
      },
    ],
    argumentStrength: 1,
    pointDelta: -3, // egregious severity-3 foul
    callout: { text: "Slippery slope! Minus three, Speaker B." },
  },
  {
    id: "t5",
    speaker: "A",
    text: "Honestly, it just tastes good to a lot of people, and pizza is supposed to be fun. There's nothing sacred about the topping list.",
    timestamp: at(4),
    fallacies: [],
    argumentStrength: 2,
    pointDelta: 1, // clean but thin point
  },
  {
    id: "t6",
    speaker: "B",
    text: "Taste aside, there's a real problem: warm pineapple releases water and turns the crust soggy, which wrecks the structural integrity of the slice. That's about the food, not the person eating it.",
    timestamp: at(5),
    fallacies: [],
    argumentStrength: 4,
    pointDelta: 3, // strong supported point + rebuts A's earlier turns
  },
  {
    id: "t7",
    speaker: "A",
    text: "Soggy? What about mushrooms? They release tons of water too and nobody's out here banning mushroom pizza.",
    timestamp: at(6),
    fallacies: [
      {
        type: "Whataboutism",
        severity: 2,
        quote: "What about mushrooms? They release tons of water too",
        explanation:
          "Deflects to a different topping instead of answering the sogginess point.",
      },
    ],
    argumentStrength: 2,
    pointDelta: -2, // deflection rather than a counter
  },
  {
    id: "t8",
    speaker: "B",
    text: "Mushrooms hold far less water and they're savory, so they don't fight the dish the way sweet pineapple does. Pizza is about balance, and pineapple throws it off.",
    timestamp: at(7),
    fallacies: [],
    argumentStrength: 4,
    pointDelta: 3, // clean, supported close that directly answers the deflection
  },
];
