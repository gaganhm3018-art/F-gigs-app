import { IncomeEntry } from '../types/income';

export function getPlatformSuggestions(entries: IncomeEntry[]): string[] {
  const freq = new Map<string, number>();
  entries.forEach(entry => {
    freq.set(entry.platform, (freq.get(entry.platform) || 0) + 1);
  });
  // Return most used platforms, up to 3
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([platform]) => platform);
}