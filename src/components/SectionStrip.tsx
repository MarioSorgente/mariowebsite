import { useEffect, useState } from 'react';
import { useActiveSection } from '../hooks/useReveal';
import { scrollToSection } from '../lib/scroll';

export interface StripItem {
  label: string;
  id: string;
}

/**
 * An index of the sections on a long sub-page, sitting under the site
 * navigation. It stays deliberately quieter than the nav so it reads as part of
 * the page rather than a second navigation, and it only appears once the hero
 * has scrolled away, so arriving on the page shows a single bar.
 *
 * Links scroll the current page directly and never touch the router, so they
 * cannot navigate away from the page they belong to.
 */
export default function SectionStrip({ items }: { items: StripItem[] }) {
  const [visible, setVisible] = useState(false);
  const activeId = useActiveSection(items.map((item) => item.id));

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (items.length === 0) return null;

  const go = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToSection(document.getElementById(id));
  };

  return (
    <div
      className={`section-strip${visible ? ' is-visible' : ''}`}
      aria-label="Sections on this page"
      aria-hidden={!visible}
    >
      <div className="shell section-strip__inner">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => go(event, item.id)}
              className={`section-strip__link${isActive ? ' is-active' : ''}`}
              aria-current={isActive ? 'true' : undefined}
              tabIndex={visible ? undefined : -1}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
