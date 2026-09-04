import type { ReactNode } from 'react';
import { trackSpotlight } from '../lib/pointer';

interface ButtonProps {
  children: string;
  variant?: 'primary' | 'ghost';
  icon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  'aria-label'?: string;
}

/**
 * The site's one button. Two things make it feel physical: a soft light that
 * tracks the pointer across the surface, and a label that swaps for a copy of
 * itself sliding up from below on hover.
 */
export default function Button({
  children,
  variant = 'primary',
  icon,
  href,
  target,
  rel,
  className = '',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const content = (
    <>
      <span className="btn__sheen" aria-hidden="true" />
      <span className="btn__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  const classes = `btn btn--${variant} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick}
        onPointerMove={trackSpotlight}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      onPointerMove={trackSpotlight}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
