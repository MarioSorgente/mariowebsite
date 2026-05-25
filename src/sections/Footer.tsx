import { capabilitiesConfig, footerConfig } from '../config';

export default function Footer() {
  const capabilityLinksByTitle = new Map(
    capabilitiesConfig.items.map((item) => [item.title, `/capability/${item.slug}`])
  );

  if (!footerConfig.heading && footerConfig.columns.length === 0) {
    return null;
  }

  return (
    <footer
      id="footer"
      style={{
        padding: '150px 5vw 60px',
        background: '#0e131b',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(167, 186, 223, 0.14)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {footerConfig.heading && (
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontWeight: 400,
              fontSize: 'clamp(40px, 5vw, 80px)',
              lineHeight: 1.1,
              letterSpacing: '-1.44px',
              color: '#e6edff',
              marginBottom: 80,
            }}
          >
            {footerConfig.heading}
          </h2>
        )}

        {footerConfig.columns.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 60, marginBottom: 120 }}
          >
            {footerConfig.columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col" style={{ gap: 16 }}>
                {column.title && (
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 300,
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: '#a5b3cc',
                      opacity: 0.4,
                      marginBottom: 8,
                    }}
                  >
                    {column.title}
                  </span>
                )}
                {column.links.map((link) => {
                  const href = capabilityLinksByTitle.get(link) || '#';
                  return (
                    <a
                      key={link}
                      href={href}
                      className="nav-link"
                      style={{ width: 'fit-content' }}
                    >
                      {link}
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between"
          style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(167, 186, 223, 0.14)',
            gap: 16,
          }}
        >
          {footerConfig.copyright && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 200,
                fontSize: 12,
                color: '#a5b3cc',
                opacity: 0.4,
              }}
            >
              {footerConfig.copyright}
            </span>
          )}
          {footerConfig.bottomLinks.length > 0 && (
            <div className="flex items-center" style={{ gap: 24 }}>
              {footerConfig.bottomLinks.map((bottomLink) => (
                <a
                  key={bottomLink.label}
                  href={bottomLink.href || '#'}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 200,
                    fontSize: 12,
                    color: '#a5b3cc',
                    opacity: 0.4,
                    textDecoration: 'none',
                    transition: 'opacity 0.3s',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.8'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.4'; }}
                >
                  {bottomLink.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
