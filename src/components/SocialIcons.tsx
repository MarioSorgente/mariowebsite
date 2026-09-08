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

/**
 * Sits in the hero copy, directly above the two calls to action. It used to
 * float in a rail against the right edge, where it read as page furniture and
 * was easy to miss.
 */
export default function SocialIcons() {
  return (
    <div className="social-rail">
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
