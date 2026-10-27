export interface Application {
  id: number;
  company: string;
  jobTitle: string;
  status: string;
  applyDate: string;
}

export const STATUSES: Record<string, string> = {
  sent: 'Envoyée',
  waiting: 'En attente',
  to_follow_up: 'À relancer',
  interview: 'Entretien',
  accepted: 'Acceptée',
  refused: 'Refusée',
};