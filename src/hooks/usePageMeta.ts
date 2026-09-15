import { useEffect } from 'react';

export const SITE_URL = 'https://www.mariosorgente.io';

interface PageMeta {
  title: string;
  description: string;
  /** Absolute URL, without query parameters. */
  canonical: string;
}

/**
 * Gives a route its own title, description and canonical URL, then puts back
 * what was there before when the route unmounts.
 *
 * index.html deliberately ships no canonical: the SPA serves that one file for
 * every path, so a static tag would declare /background a copy of the home
 * page. Routes that want one declare it here, and the tag is removed again on
 * the way out.
 */
export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    const descriptionTag = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    let canonicalTag = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonicalTag;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }

    const previous = {
      title: document.title,
      description: descriptionTag?.content,
      canonical: canonicalTag.getAttribute('href'),
    };

    document.title = title;
    if (descriptionTag) descriptionTag.content = description;
    canonicalTag.href = canonical;

    return () => {
      document.title = previous.title;
      if (descriptionTag && previous.description !== undefined) descriptionTag.content = previous.description;
      if (createdCanonical) canonicalTag.remove();
      else if (previous.canonical) canonicalTag.setAttribute('href', previous.canonical);
    };
  }, [title, description, canonical]);
}
