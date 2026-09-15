import type { ReactNode } from 'react';
import { useEngagement, type EngagementMode } from '../lib/engagement';

interface ModePanelsProps {
  fractional: ReactNode;
  fullTime: ReactNode;
  className?: string;
}

/**
 * Renders both versions of a fragment and hides the one that does not match
 * the mode. `hidden` takes the inactive copy out of the tab order and the
 * accessibility tree. Keeping both mounted matters for useReveal, which only
 * collects `[data-reveal]` elements on mount: the hidden copy is already being
 * observed, so it animates in when it is shown.
 */
export default function ModePanels({ fractional, fullTime, className }: ModePanelsProps) {
  const { mode } = useEngagement();

  const panel = (panelMode: EngagementMode, content: ReactNode) => (
    <div className={className} data-engagement-mode={panelMode} hidden={mode !== panelMode}>
      {content}
    </div>
  );

  return (
    <>
      {panel('fractional', fractional)}
      {panel('full-time', fullTime)}
    </>
  );
}
