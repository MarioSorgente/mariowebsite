import type { PointerEvent } from 'react';

/**
 * Writes the pointer's position within an element to `--mx` / `--my`, so CSS
 * can paint a light that follows the cursor. Values go straight to the style
 * attribute, which keeps the effect off React's render path entirely.
 */
export function trackSpotlight(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}
