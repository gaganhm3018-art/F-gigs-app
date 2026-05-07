import { IncomeEntry } from '../types/income';

export const exportEntriesToCsv = (entries: IncomeEntry[]): string => {
  const header = ['id', 'platform', 'amount', 'date', 'status', 'paymentFrequency', 'recordedAt'];
  const rows = entries.map(entry => [
    entry.id,
    entry.platform,
    entry.amount.toFixed(2),
    entry.date,
    entry.status,
    entry.paymentFrequency,
    `${entry.recordedAt}`,
  ]);

  return [header, ...rows]
    .map(cols => cols.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n');
};
