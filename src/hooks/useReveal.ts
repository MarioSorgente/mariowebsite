import { useEffect, useRef, useState } from 'react';

const READY_CLASS = 'reveal-ready';

/**
 * Reveals every `[data-reveal]` element inside the returned container as it
 * scrolls into view, staggering siblings by their document order.
 *
 * The hidden starting state lives behind a class this hook adds to <html>, so
 * content stays visible if the script never runs. Elements already on screen at
 * mount still animate, which is what makes the first paint feel alive.
 *
 * Revealed elements are marked with `data-in` rather than a class. React owns
 * the `class` attribute and rewrites it wholesale whenever a component's
 * className changes, which would silently wipe an imperative class and leave
 * the element stuck at opacity 0.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options?: {
  stagger?: number;
  threshold?: number;
  rootMargin?: string;
}) {
  const containerRef = useRef<T>(null);
  const { stagger = 90, threshold = 0.16, rootMargin = '0px 0px -8% 0px' } = options ?? {};

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    document.documentElement.classList.add(READY_CLASS);

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (targets.length === 0) return;

    const canObserve = typeof IntersectionObserver !== 'undefined';
    if (!canObserve || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.setAttribute('data-in', ''));
      return;
    }

    // Elements that share a stagger group animate as a run rather than one by one.
    const groupCounters = new Map<string, number>();
    targets.forEach((el) => {
      if (el.dataset.revealDelay) return;
      const group = el.dataset.revealGroup ?? 'root';
      const position = groupCounters.get(group) ?? 0;
      groupCounters.set(group, position + 1);
      el.style.setProperty('--reveal-delay', `${position * stagger}ms`);
    });

    targets.forEach((el) => {
      if (el.dataset.revealDelay) {
        el.style.setProperty('--reveal-delay', `${el.dataset.revealDelay}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-in', '');
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stagger, threshold, rootMargin]);

  return containerRef;
}

/** Tracks how far the window has scrolled, as a 0-1 ratio. */
export function useScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return barRef;
}

/** Reports which of the given section ids currently owns the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  const key = ids.join('|');

  useEffect(() => {
    const sections = key
      .split('|')
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // The section that has crossed a third of the viewport is the one we are in.
      const line = window.scrollY + window.innerHeight * 0.32;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= line) current = section.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
}
