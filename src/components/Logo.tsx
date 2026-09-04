/**
 * Zero2Hero brand assets.
 *
 * These are generated from the master artwork (`logo_zero.png`) for use on a
 * dark ground: the white matte is removed, the navy ink is remapped to the
 * page's light text colour and the orange to the ember accent. Regenerate them
 * from the master if the logo ever changes; see README.
 */

/** Icon only. Use where the name is already present, or at small sizes. */
export function LogoMark({ size = 34, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/images/zero2hero-mark.png"
      alt=""
      width={size}
      height={size}
      className={`logo-mark ${className}`.trim()}
      style={{ height: size }}
      aria-hidden="true"
    />
  );
}

/** Horizontal lockup: icon plus wordmark. The default brand signature. */
export default function Logo({ height = 34 }: { height?: number }) {
  return (
    <img
      src="/images/zero2hero-lockup.png"
      alt="Zero2Hero"
      className="logo"
      style={{ height }}
    />
  );
}

/** Stacked lockup with the tagline. Used large, as a closing signature. */
export function LogoStacked({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/zero2hero-logo.png"
      alt=""
      className={`logo-stacked ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
