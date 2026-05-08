export type IncomeStatus = 'pending' | 'received';
export type PaymentFrequency = 'daily' | 'weekly' | 'fortnightly' | 'monthly' | 'one_time';

export interface IncomeEntry {
  id: string;
  platform: string;
  amount: number;
  date: string; // ISO YYYY-MM-DD
  status: IncomeStatus;
  paymentFrequency: PaymentFrequency;
  recordedAt: number;
}

export interface UserProfile {
  name: string;
  hasCompletedOnboarding: boolean;
}

export interface IncomeProjection {
  weeklyAverage: number;
  projectedAnnualIncome: number;
  method: 'weighted_moving_average';
  confidence: 'low' | 'medium' | 'high';
}
