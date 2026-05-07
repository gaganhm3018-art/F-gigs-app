import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getMonthlySummary, projectAnnualIncome } from '../services/analytics';
import { exportEntriesToCsv } from '../services/csv';

export default function DashboardScreen({ navigation }: any) {
  const entries = useSelector((state: RootState) => state.income.entries);

  const monthly = useMemo(() => getMonthlySummary(entries), [entries]);
  const projection = useMemo(() => projectAnnualIncome(entries), [entries]);
  const csvPreview = useMemo(() => exportEntriesToCsv(entries).split('\n').slice(0, 4).join('\n'), [entries]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Button title="Log New Payout" onPress={() => navigation.navigate('AddIncome')} />
      <Text style={styles.title}>Income Overview ({monthly.monthKey})</Text>
      <Text style={styles.card}>Received: ${monthly.received.toFixed(2)}</Text>
      <Text style={styles.card}>Pending: ${monthly.pending.toFixed(2)}</Text>
      <Text style={styles.card}>Total: ${monthly.total.toFixed(2)}</Text>

      <Text style={styles.title}>ML Projection (Weighted Moving Average)</Text>
      <Text style={styles.card}>Weekly average: ${projection.weeklyAverage.toFixed(2)}</Text>
      <Text style={styles.card}>Projected annual income: ${projection.projectedAnnualIncome.toFixed(2)}</Text>
      <Text style={styles.card}>Confidence: {projection.confidence}</Text>

      <Text style={styles.title}>CSV export preview</Text>
      <Text style={styles.csv}>{csvPreview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, gap: 8 },
  title: { fontSize: 18, fontWeight: '700', marginTop: 12 },
  card: { fontSize: 16, backgroundColor: '#f5f5f5', borderRadius: 10, padding: 10 },
  csv: { fontFamily: 'monospace', backgroundColor: '#111', color: '#d4f8d4', padding: 10, borderRadius: 8 },
});
