export type InvitationState = 'closed' | 'scratching' | 'revealed' | 'opening' | 'opened';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
