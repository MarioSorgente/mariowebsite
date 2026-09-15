import type { EngagementMode } from './engagement';

/**
 * Website conversion events. The site has no analytics provider, and adding
 * one is a separate decision, so `track` records nothing in production. The
 * call sites and the allowed properties are fixed here so a provider can be
 * connected in one place later.
 *
 * Never add names, email addresses, message text or raw query strings.
 * A contact click is intent, not a confirmed enquiry.
 */
type EventMap = {
  engagement_selected: { mode: EngagementMode; previous_mode: EngagementMode };
  service_viewed: { service_id: string; mode: EngagementMode };
  contact_clicked: {
    mode: EngagementMode;
    service_id: string | null;
    location: 'contact' | 'service-page' | 'role-scope';
    channel: 'email' | 'booking';
  };
  case_study_opened: { case_study_id: string; mode: EngagementMode };
  /** Reserved for a future form backend that confirms acceptance. */
  enquiry_submitted: { mode: EngagementMode; service_id: string | null };
};

export type AnalyticsEvent = keyof EventMap;

export function track<E extends AnalyticsEvent>(event: E, props: EventMap[E]) {
  if (import.meta.env.DEV) console.debug('[analytics]', event, props);
}
