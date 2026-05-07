// src/screens/DashboardScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { loadIncomes

  useEffect(() => {
    // Load data from storage
    const loadData = async () => {
      const stored = await loadIncomes();
      dispatch(setEntries(stored));
    };
    loadData();
  }, []);

  useEffect(() => {
    // Auto-save whenever entries change
    saveIncomes(entries);
    // Retrain ML model and get new prediction
    const updateML = async () => {
      if (entries.length > 10) {
        await trainAndSaveModel(entries);
        const pred = await loadAndPredict(entries);
        setPrediction(pred);
      }
    };
    updateML();
  }, [entries]);

  const totalEarnings = entries.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>GigLedger Dashboard</Text>
      <Text style={styles.total}>💰 Total earned: ${totalEarnings.toFixed(2)}</Text>

      {prediction !== null && <PredictionCard amount={prediction} />}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddIncome')}>
        <Text style={styles.addButtonText}>+ Add Income</Text>
      </TouchableOpacity>

      <RecentIncomeList entries={entries} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  total: { fontSize: 20, textAlign: 'center', marginBottom: 12 },
  addButton: { backgroundColor: '#6200ee', padding: 14, borderRadius: 8, alignItems: 'center', marginVertical: 16 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
});