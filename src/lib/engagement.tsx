import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type EngagementMode = 'fractional' | 'full-time';

export type ContactIntent = {
  mode: EngagementMode;
  serviceId: string | null;
};

export const defaultMode: EngagementMode = 'fractional';

export const ENGAGEMENT_PARAM = 'engagement';

/** Anything other than an explicit full-time request falls back to fractional. */
export function parseMode(search: string): EngagementMode {
  return new URLSearchParams(search).get(ENGAGEMENT_PARAM) === 'full-time' ? 'full-time' : defaultMode;
}

interface EngagementContextValue extends ContactIntent {
  setMode: (next: EngagementMode) => void;
  selectService: (id: string) => void;
  /** Carries full-time mode onto an internal link, so coming back home keeps it. */
  withEngagement: (path: string) => string;
}

const EngagementContext = createContext<EngagementContextValue | null>(null);

/**
 * The URL is the only store for the mode: a reload keeps it, a clean URL
 * defaults to fractional, and Back/Forward resynchronise because the router
 * re-renders on popstate. The service a visitor picked is session state only,
 * and never survives a switch to full-time.
 */
export function EngagementProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const mode = parseMode(location.search);
  const serviceId = mode === 'full-time' ? null : selectedService;

  const setMode = useCallback(
    (next: EngagementMode) => {
      const params = new URLSearchParams(location.search);
      params.set(ENGAGEMENT_PARAM, next);
      if (next === 'full-time') setSelectedService(null);
      // Replace, not push: switching modes is a view setting, not a page. The
      // pathname and hash are unchanged, so RouteBehaviour does not scroll.
      navigate(
        { pathname: location.pathname, search: `?${params.toString()}`, hash: location.hash },
        { replace: true, state: location.state }
      );
    },
    [location.search, location.pathname, location.hash, location.state, navigate]
  );

  const withEngagement = useCallback(
    (path: string) => {
      if (mode !== 'full-time') return path;
      const [beforeHash, hash = ''] = path.split('#');
      const [pathname, query = ''] = beforeHash.split('?');
      const params = new URLSearchParams(query);
      params.set(ENGAGEMENT_PARAM, 'full-time');
      return `${pathname}?${params.toString()}${hash ? `#${hash}` : ''}`;
    },
    [mode]
  );

  const value = useMemo<EngagementContextValue>(
    () => ({ mode, serviceId, setMode, selectService: setSelectedService, withEngagement }),
    [mode, serviceId, setMode, withEngagement]
  );

  return <EngagementContext.Provider value={value}>{children}</EngagementContext.Provider>;
}

export function useEngagement() {
  const value = useContext(EngagementContext);
  if (!value) throw new Error('useEngagement must be used inside EngagementProvider');
  return value;
}
