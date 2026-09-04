import { Fragment } from 'react';
import SilkFlow from './SilkFlow';

interface StatementProps {
  text: string;
  /** Words rendered in the accent colour, matched case-insensitively. */
  accent?: string[];
  caption?: string;
}

/**
 * A pinned line that lights up word by word as the section scrolls past, over
 * a slow field of drifting contour lines. Each word carries its index so CSS
 * can give it its own slice of the section's scroll range; see `statement` in
 * styles/scroll.css.
 */
export default function Statement({ text, accent = [], caption }: StatementProps) {
  const words = text.split(' ');
  const accentSet = new Set(accent.map((word) => word.toLowerCase()));

  return (
    <section className="statement" aria-label="Statement">
      <div className="statement__inner">
        <SilkFlow />

        <div className="statement__shell shell">
          <p className="statement__text" style={{ '--n': words.length } as React.CSSProperties}>
            {words.map((word, index) => {
              const bare = word.replace(/[^a-z0-9]/gi, '').toLowerCase();
              return (
                // The trailing space is a real text node, so the sentence still
                // reads correctly to a screen reader and copies as prose.
                <Fragment key={`${word}-${index}`}>
                  <span
                    className={`statement__word${accentSet.has(bare) ? ' statement__word--accent' : ''}`}
                    style={{ '--i': index } as React.CSSProperties}
                  >
                    {word}
                  </span>{' '}
                </Fragment>
              );
            })}
          </p>

          {caption && <p className="statement__cap">{caption}</p>}
        </div>
      </div>
    </section>
  );
}
