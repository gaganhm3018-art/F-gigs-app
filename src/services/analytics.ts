import { IncomeEntry, IncomeProjection } from '../types/income';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const getMonthlySummary = (entries: IncomeEntry[], month: Date = new Date()) => {
  const monthKey = month.toISOString().slice(0, 7);
  const monthEntries = entries.filter(entry => entry.date.startsWith(monthKey));

  const received = monthEntries
    .filter(entry => entry.status === 'received')
    .reduce((sum, entry) => sum + entry.amount, 0);
  const pending = monthEntries
    .filter(entry => entry.status === 'pending')
    .reduce((sum, entry) => sum + entry.amount, 0);

  return {
    monthKey,
    total: Number((received + pending).toFixed(2)),
    received: Number(received.toFixed(2)),
    pending: Number(pending.toFixed(2)),
    count: monthEntries.length,
  };
};

export const buildWeeklyBuckets = (entries: IncomeEntry[]) => {
  const now = new Date();
  const weeks = new Map<number, number>();

  entries
    .filter(entry => entry.status === 'received')
    .forEach(entry => {
      const entryDate = new Date(entry.date);
      const diffDays = Math.floor((now.getTime() - entryDate.getTime()) / MS_PER_DAY);
      const weekIndex = Math.max(0, Math.floor(diffDays / 7));
      weeks.set(weekIndex, (weeks.get(weekIndex) ?? 0) + entry.amount);
    });

  return weeks;
};

export const projectAnnualIncome = (entries: IncomeEntry[]): IncomeProjection => {
  const buckets = buildWeeklyBuckets(entries);
  const maxWeek = Math.max(0, ...Array.from(buckets.keys()));
  const values = Array.from({ length: Math.min(maxWeek + 1, 12) }, (_, idx) => buckets.get(idx) ?? 0);

  const weightedTotal = values.reduce((sum, value, idx) => sum + value * (values.length - idx), 0);
  const weights = values.reduce((sum, _, idx) => sum + (values.length - idx), 0) || 1;
  const weeklyAverage = weightedTotal / weights;

  let confidence: IncomeProjection['confidence'] = 'low';
  if (values.length >= 8) confidence = 'high';
  else if (values.length >= 4) confidence = 'medium';

  return {
    weeklyAverage: Number(weeklyAverage.toFixed(2)),
    projectedAnnualIncome: Number((weeklyAverage * 52).toFixed(2)),
    method: 'weighted_moving_average',
    confidence,
  };
};
