import type { CSSProperties, MouseEvent } from 'react';

export default function SocialIcons() {
  const iconStyle: CSSProperties = {
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const svgStyle: CSSProperties = {
    width: 22,
    height: 22,
    fill: 'none',
    stroke: '#8fb7c0',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'rgba(143, 183, 192, 0.16)';
    e.currentTarget.style.borderColor = 'rgba(143, 183, 192, 0.45)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const links = [
    {
      href: 'https://www.linkedin.com/in/mario-sorgente/',
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" style={svgStyle}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      href: 'https://github.com/MarioSorgente',
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" style={svgStyle}>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      href: 'https://www.instagram.com/extravag.art/',
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" style={svgStyle}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      href: 'https://drive.google.com/file/d/1gg7k9FqsffFs76-sqRhtFPANLHX0sU5Y/view?usp=sharing',
      external: true,
      icon: (
        <svg viewBox="0 0 24 24" style={svgStyle}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
    },
    {
      href: 'mailto:mario.sorgente@gmail.com',
      external: false,
      icon: (
        <svg viewBox="0 0 24 24" style={svgStyle}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  const renderIcons = () =>
    links.map((link) => (
      <a
        key={link.href}
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        style={iconStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {link.icon}
      </a>
    ));

  return (
    <>
      <div
        className="pointer-events-auto absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 2xl:flex"
      >
        {renderIcons()}
      </div>

      <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3 md:hidden">
        {renderIcons()}
      </div>
    </>
  );
}
