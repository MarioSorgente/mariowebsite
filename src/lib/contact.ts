import type { EngagementMode } from './engagement';

export const CONTACT_EMAIL = 'mario.sorgente@gmail.com';

/**
 * No booking page exists yet. "Book an intro call" renders only once this holds
 * a real URL, so the site never shows a calendar link that goes nowhere.
 */
export const BOOKING_URL: string | null = null;

/**
 * A prefilled email for the visitor's current intent. Opening it means the
 * visitor started an enquiry, not that anything was sent, so no caller should
 * ever show a sent confirmation.
 */
export function buildContactHref(mode: EngagementMode, serviceTitle = '') {
  const subject =
    mode === 'full-time'
      ? 'Product role enquiry'
      : `Product support enquiry${serviceTitle ? ': ' + serviceTitle : ''}`;
  const body =
    mode === 'full-time'
      ? 'Company:\nRole description or link:\nRemote working model:\nLocation requirements:\nCompensation range:\n'
      : `Company:\nProduct challenge:\nTeam size:\n${serviceTitle ? 'Service: ' + serviceTitle + '\n' : 'Support needed:\n'}Timeline:\n`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
