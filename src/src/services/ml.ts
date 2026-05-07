import { IncomeEntry } from '../types/income';

// Mock ML functions for demonstration
// In a real app, these would use TensorFlow.js or similar

export async function trainAndSaveModel(entries: IncomeEntry[]): Promise<void> {
  // Mock training - in reality, this would train a model
  console.log('Training ML model with', entries.length, 'entries');
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));
}

export async function loadAndPredict(entries: IncomeEntry[]): Promise<number> {
  // Mock prediction - in reality, this would load a trained model and predict
  console.log('Making prediction based on', entries.length, 'entries');
  return predictNextIncome(entries);
}

export function predictNextIncome(entries: IncomeEntry[]): number {
  if (entries.length === 0) return 0;

  // Simple moving average prediction
  const recentEntries = entries
    .sort((a, b) => b.recordedAt - a.recordedAt)
    .slice(0, 5);

  const average = recentEntries.reduce((sum, entry) => sum + entry.amount, 0) / recentEntries.length;

  // Add some variance based on platform
  const platformMultiplier = getPlatformMultiplier(entries);

  return average * platformMultiplier;
}

function getPlatformMultiplier(entries: IncomeEntry[]): number {
  const platformCounts = entries.reduce((acc, entry) => {
    acc[entry.platform] = (acc[entry.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonPlatform = Object.keys(platformCounts).reduce((a, b) =>
    platformCounts[a] > platformCounts[b] ? a : b
  );

  // Different platforms have different volatility
  const multipliers: Record<string, number> = {
    'Uber': 1.05,
    'DoorDash': 1.08,
    'TaskRabbit': 1.02,
    'Upwork': 1.1,
    'Fiverr': 1.15,
    'default': 1.0
  };

  return multipliers[mostCommonPlatform] || multipliers.default;
}

export function getIncomeTrend(entries: IncomeEntry[]): 'up' | 'down' | 'stable' {
  if (entries.length < 2) return 'stable';

  const sortedEntries = entries.sort((a, b) => b.recordedAt - a.recordedAt);
  const recent = sortedEntries.slice(0, 3);
  const older = sortedEntries.slice(3, 6);

  if (older.length === 0) return 'stable';

  const recentAvg = recent.reduce((sum, entry) => sum + entry.amount, 0) / recent.length;
  const olderAvg = older.reduce((sum, entry) => sum + entry.amount, 0) / older.length;

  const change = (recentAvg - olderAvg) / olderAvg;

  if (change > 0.1) return 'up';
  if (change < -0.1) return 'down';
  return 'stable';
}

export function aggregateWeekly(entries: IncomeEntry[]): number[] {
  const weeklyMap = new Map<string, number>();

  entries.forEach(entry => {
    const date = new Date(entry.recordedAt);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
    const weekKey = weekStart.toISOString().slice(0, 10);

    weeklyMap.set(weekKey, (weeklyMap.get(weekKey) || 0) + entry.amount);
  });

  return Array.from(weeklyMap.values()).sort((a, b) => a - b);
}