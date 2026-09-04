import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface CaseModalProps {
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: React.ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * The window a case study opens in. Rendered through a portal so no clipped or
 * transformed ancestor on the page can crop it, and so it sits above the fixed
 * navigation and grain overlay.
 */
export default function CaseModal({ title, eyebrow, onClose, children }: CaseModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Keyboard: Escape closes, Tab stays inside the window.
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Hold the page still behind the window. `overflow: hidden` on <body> is not
  // enough here: it turns the body into its own scroll container, the document
  // loses its scroll height, and the page jumps to the top on close. Pinning
  // the body at a negative offset keeps the position exactly.
  useEffect(() => {
    const { body } = document;
    const scrollY = window.scrollY;
    const gap = window.innerWidth - document.documentElement.clientWidth;

    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    closeRef.current?.focus({ preventScroll: true });
    scrollRef.current?.scrollTo({ top: 0 });

    return () => {
      Object.assign(body.style, previous);
      // Reading a layout property forces the document to regain its full
      // height, otherwise the browser clamps the restored scroll position.
      void body.offsetHeight;
      // Instant, because the page has smooth scrolling and this is a restore,
      // not a navigation.
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, []);

  return createPortal(
    <div className="case-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="case-modal__backdrop"
        aria-label="Close case study"
        tabIndex={-1}
        onClick={onClose}
      />

      <div className="case-modal__panel" ref={panelRef}>
        <header className="case-modal__bar">
          <span className="case-modal__label">{eyebrow}</span>
          <p className="case-modal__title">{title}</p>
          <button
            ref={closeRef}
            type="button"
            className="case-modal__close"
            onClick={onClose}
            aria-label="Close case study"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </header>

        <div className="case-modal__scroll" ref={scrollRef}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
