import { useId } from 'react';
import { Check } from 'lucide-react';
import { engagementSelectorConfig } from '../config';
import { track } from '../lib/analytics';
import { useEngagement, type EngagementMode } from '../lib/engagement';

const OPTIONS: EngagementMode[] = ['fractional', 'full-time'];

/**
 * The only engagement selector on the site: a native radio group, styled as a
 * two-option segmented control. Tab enters the group and the arrow keys move
 * between options, exactly as the browser provides. Changing the value never
 * scrolls, moves focus or opens anything; it only rewrites the URL parameter.
 */
export default function EngagementSelector() {
  const { mode, setMode } = useEngagement();
  const helpId = useId();
  const { legend, options } = engagementSelectorConfig;

  const choose = (next: EngagementMode) => {
    if (next === mode) return;
    track('engagement_selected', { mode: next, previous_mode: mode });
    setMode(next);
  };

  return (
    <fieldset className="engagement-selector" aria-describedby={helpId}>
      <legend className="engagement-selector__legend">{legend}</legend>
      <div className="engagement-selector__options">
        {OPTIONS.map((value) => (
          <label key={value} className="engagement-option">
            <input
              type="radio"
              name="engagement"
              value={value}
              checked={mode === value}
              onChange={() => choose(value)}
            />
            <span className="engagement-option__face">
              <Check size={15} strokeWidth={2.4} className="engagement-option__check" aria-hidden="true" />
              {options[value].label}
              {options[value].badge && (
                <small className="engagement-option__badge">{options[value].badge}</small>
              )}
            </span>
          </label>
        ))}
      </div>
      {/* Announced on change, but off the page: the modes are self-evident
          on screen, and the line was crowding the headline. */}
      <p id={helpId} className="visually-hidden" aria-live="polite" aria-atomic="true">
        {options[mode].helper}
      </p>
    </fieldset>
  );
}
