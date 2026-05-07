import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { IncomeEntry } from '../types/income';

interface RecentIncomeListProps {
  entries: IncomeEntry[];
}

export default function RecentIncomeList({ entries }: RecentIncomeListProps) {
  const recentEntries = entries
    .sort((a, b) => b.recordedAt - a.recordedAt)
    .slice(0, 5);

  const renderItem = ({ item }: { item: IncomeEntry }) => (
    <View style={styles.item}>
      <View style={styles.left}>
        <Text style={styles.platform}>{item.platform}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Income</Text>
      <FlatList
        data={recentEntries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  left: { flex: 1 },
  platform: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 12, color: '#666', marginTop: 2 },
  amount: { fontSize: 16, fontWeight: 'bold', color: '#0047ab' },
});