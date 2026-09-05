/**
 * Scrolls a section into view, honouring a reduced-motion preference.
 *
 * `scroll-behavior: smooth` in CSS is already switched off for reduced motion,
 * but an explicit `scrollIntoView({ behavior: 'smooth' })` overrides that, so
 * the preference has to be checked here too.
 */
export function scrollToSection(target: Element | null | undefined) {
  if (!target) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}
