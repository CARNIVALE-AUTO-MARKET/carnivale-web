/**
 * Confetti for the "sold" / registration-complete moment.
 * Brand colors only; no-ops under prefers-reduced-motion. Client-only.
 */
const BRAND_COLORS = ["#E0A800", "#F4C75A", "#C0392B", "#1E7B45", "#FBF6EC"];

export async function fireConfetti(origin?: { x?: number; y?: number }) {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const confetti = (await import("canvas-confetti")).default;
  const o = { x: origin?.x ?? 0.5, y: origin?.y ?? 0.55 };

  confetti({ particleCount: 90, spread: 70, startVelocity: 42, origin: o, colors: BRAND_COLORS });
  setTimeout(
    () =>
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: BRAND_COLORS,
      }),
    120,
  );
  setTimeout(
    () =>
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: BRAND_COLORS,
      }),
    240,
  );
}
