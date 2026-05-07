// src/screens/ReportsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { aggregateWeekly } from '../services/ml';

export default function ReportsScreen() {
  const entries = useSelector((state: RootState) => state.income.entries);

  // Prepare weekly data for line chart
  const weeklyTotals = aggregateWeekly(entries);
  const lineData = weeklyTotals.map((total, idx) => ({ value: total, label: `W${idx+1}` }));

  // Prepare platform totals for bar chart
  const platformMap = new Map<string, number>();
  entries.forEach(e => {
    platformMap.set(e.platform, (platformMap.get(e.platform) || 0) + e.amount);
  });
  const barData = Array.from(platformMap.entries()).map(([platform, total]) => ({
    value: total,
    label: platform.slice(0, 8),
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Earnings Analytics</Text>

      {lineData.length > 0 && (
        <>
          <Text style={styles.subtitle}>Weekly Earnings Trend</Text>
          <LineChart data={lineData} height={250} width={300} spacing={40} />
        </>
      )}

      {barData.length > 0 && (
        <>
          <Text style={styles.subtitle}>Earnings by Platform</Text>
          <BarChart data={barData} height={250} width={300} barWidth={30} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 12 },
});