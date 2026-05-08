import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { getMonthlySummary, projectAnnualIncome, buildWeeklyBuckets } from '../services/analytics';
import { addEntry } from '../store/incomeSlice';
import { LineChart, BarChart } from 'react-native-chart-kit';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { IncomeEntry } from '../types/income';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.income.entries);

  const monthly = useMemo(() => getMonthlySummary(entries), [entries]);
  const projection = useMemo(() => projectAnnualIncome(entries), [entries]);
  
  // Chart Data preparation
  const chartData = useMemo(() => {
    const buckets = buildWeeklyBuckets(entries);
    // Let's show the last 6 weeks (week 5 to week 0)
    const labels = [];
    const data = [];
    for (let i = 5; i >= 0; i--) {
      labels.push(i === 0 ? 'This Wk' : `-${i}W`);
      data.push(buckets.get(i) ?? 0);
    }
    return {
      labels,
      datasets: [{ data: data.length ? data : [0] }]
    };
  }, [entries]);

  const handleImportCSV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'application/vnd.ms-excel'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;
        const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        
        Papa.parse(fileContent, {
          header: true,
          skipEmptyLines: true,
          complete: (parsed: any) => {
            let importedCount = 0;
            parsed.data.forEach((row: any) => {
              if (row.amount && row.date && row.platform) {
                const newEntry: IncomeEntry = {
                  id: Date.now().toString() + Math.random().toString(),
                  platform: row.platform,
                  amount: parseFloat(row.amount),
                  date: row.date, // format YYYY-MM-DD
                  status: row.status === 'pending' ? 'pending' : 'received',
                  paymentFrequency: row.paymentFrequency || 'one_time',
                  recordedAt: Date.now(),
                };
                dispatch(addEntry(newEntry));
                importedCount++;
              }
            });
            Alert.alert("Success", `Imported ${importedCount} income entries from CSV!`);
          },
          error: (error: any) => {
            Alert.alert("Error parsing CSV", error.message);
          }
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not read the file.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Earner!</Text>
        <Text style={styles.subtitle}>Here is your income overview for {monthly.monthKey}</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('AddIncome')}>
          <Text style={styles.primaryButtonText}>+ Log Payout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleImportCSV}>
          <Text style={styles.secondaryButtonText}>Import CSV</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <View style={[styles.summaryBox, { backgroundColor: '#e3f2fd' }]}>
          <Text style={styles.summaryLabel}>Received</Text>
          <Text style={[styles.summaryValue, { color: '#1565c0' }]}>${monthly.received.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryBox, { backgroundColor: '#fff3e0' }]}>
          <Text style={styles.summaryLabel}>Pending</Text>
          <Text style={[styles.summaryValue, { color: '#e65100' }]}>${monthly.pending.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryBox, { backgroundColor: '#e8f5e9' }]}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={[styles.summaryValue, { color: '#2e7d32' }]}>${monthly.total.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Weekly Trend</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            barPercentage: 0.6,
          }}
          style={styles.chartStyle}
          showValuesOnTopOfBars
        />
      </View>

      <Text style={styles.sectionTitle}>Tax Planning & Projection</Text>
      <View style={styles.taxCard}>
        <Text style={styles.taxTitle}>Projected Annual Income</Text>
        <Text style={styles.taxValue}>${projection.projectedAnnualIncome.toFixed(2)}</Text>
        <Text style={styles.taxSubtitle}>
          Use this figure for estimating your annual tax liabilities. Based on a weekly average of ${projection.weeklyAverage.toFixed(2)} (Confidence: {projection.confidence}).
        </Text>
      </View>
      
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 16 },
  header: { marginBottom: 20 },
  greeting: { fontSize: 28, fontWeight: '800', color: '#1a1a1a' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 4 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 12 },
  primaryButton: { 
    flex: 1, 
    backgroundColor: '#0066cc', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center',
    shadowColor: '#0066cc', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryButton: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2
  },
  secondaryButtonText: { color: '#333', fontSize: 16, fontWeight: '600' },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 8 },
  summaryBox: { 
    flex: 1, 
    padding: 16, 
    borderRadius: 16, 
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2
  },
  summaryLabel: { fontSize: 14, color: '#555', fontWeight: '500', marginBottom: 4 },
  summaryValue: { fontSize: 18, fontWeight: '800' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginBottom: 12 },
  chartContainer: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 8, 
    marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3
  },
  chartStyle: { borderRadius: 16 },
  taxCard: { 
    backgroundColor: '#2c3e50', 
    padding: 20, 
    borderRadius: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5
  },
  taxTitle: { color: '#95a5a6', fontSize: 14, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  taxValue: { color: '#2ecc71', fontSize: 36, fontWeight: '800', marginVertical: 8 },
  taxSubtitle: { color: '#ecf0f1', fontSize: 14, lineHeight: 20, opacity: 0.9 },
});

