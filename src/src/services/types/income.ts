export interface IncomeEntry {
  id: string;
  platform: string;         // e.g. "Uber", "Fiverr"
  amount: number;
  date: string;             // ISO string YYYY-MM-DD
  paymentFrequency: 'daily' | 'weekly' | 'fortnightly';
  recordedAt: number;       // timestamp for sorting
}

export interface UserProfile {
  name: string;
  hasCompletedOnboarding: boolean;
}