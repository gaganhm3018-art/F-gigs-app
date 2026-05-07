import { IncomeEntry } from '../types/income';

export const getPlatformSuggestions = (entries: IncomeEntry[]): string[] => {
  const counts = entries.reduce<Record<string, number>>((acc, entry) => {
    const key = entry.platform.trim();
    if (!key) return acc;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name);
};

export const suggestIncomeByPlatformAverage = (
  entries: IncomeEntry[],
  platform: string,
): number | null => {
  const normalized = platform.trim().toLowerCase();
  if (!normalized) return null;

  const platformEntries = entries.filter(
    entry => entry.platform.trim().toLowerCase() === normalized,
  );

  if (!platformEntries.length) return null;

  const total = platformEntries.reduce((sum, entry) => sum + entry.amount, 0);
  return Number((total / platformEntries.length).toFixed(2));
};
