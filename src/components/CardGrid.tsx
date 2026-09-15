import type { TitledCard } from '../config';
import { trackSpotlight } from '../lib/pointer';

interface CardGridProps {
  cards: TitledCard[];
  /** Stagger group for useReveal, so each grid animates as its own run. */
  group: string;
  numbered?: boolean;
}

/** Two columns of short titled cards on wide screens, one on small ones. */
export default function CardGrid({ cards, group, numbered = false }: CardGridProps) {
  return (
    <ul className="card-grid">
      {cards.map((card, index) => (
        <li
          key={card.title}
          className="info-card spotlight"
          onPointerMove={trackSpotlight}
          data-reveal="up"
          data-reveal-group={group}
        >
          {numbered && <span className="info-card__index">{String(index + 1).padStart(2, '0')}</span>}
          <h3 className="info-card__title">{card.title}</h3>
          <p className="info-card__body">{card.body}</p>
        </li>
      ))}
    </ul>
  );
}
