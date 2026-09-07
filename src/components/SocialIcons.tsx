import { Download, Github, Linkedin, Mail } from 'lucide-react';

interface SocialLink {
  label: string;
  href: string;
  external: boolean;
  icon: typeof Linkedin;
}

const links: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mario-sorgente/',
    external: true,
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/MarioSorgente',
    external: true,
    icon: Github,
  },
  {
    label: 'AI Product Guide',
    href: 'https://drive.google.com/file/d/1gg7k9FqsffFs76-sqRhtFPANLHX0sU5Y/view?usp=sharing',
    external: true,
    icon: Download,
  },
  {
    label: 'Email',
    href: 'mailto:mario.sorgente@gmail.com',
    external: false,
    icon: Mail,
  },
];

export default function SocialIcons({ variant }: { variant: 'vertical' | 'inline' }) {
  return (
    <div className={`social-rail social-rail--${variant}`}>
      {links.map(({ label, href, external, icon: Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="social-btn"
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          <Icon strokeWidth={1.6} aria-hidden="true" />
          <span className="social-btn__label" aria-hidden="true">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
