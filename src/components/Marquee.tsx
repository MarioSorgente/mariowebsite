import { marqueeItems } from '../config';

/**
 * An endless ticker of capability keywords. The list is rendered twice so the
 * track can loop by translating exactly half its width with no visible seam.
 */
export default function Marquee() {
  if (marqueeItems.length === 0) return null;

  const group = (
    <div className="marquee__group" aria-hidden="true">
      {marqueeItems.map((item) => (
        <span key={item} className="marquee__item">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        {group}
        {group}
      </div>
    </div>
  );
}
