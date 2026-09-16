import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';

/**
 * Build-time rendering of the home page. Without it the first paint waits for
 * React to build the whole page in the browser, which cost about 600ms of
 * blank screen even though every file had already arrived.
 *
 * Only routes whose components are imported eagerly are worth rendering here:
 * the lazy routes would render their Suspense fallback and gain nothing. See
 * scripts/prerender.mjs, which serves those from an empty shell instead.
 */
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
