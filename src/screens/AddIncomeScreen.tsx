import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../store/incomeSlice';
import { RootState } from '../store/store';
import { IncomeEntry, IncomeStatus, PaymentFrequency } from '../types/income';
import {
  getPlatformSuggestions,
  suggestIncomeByPlatformAverage,
} from '../services/autofill';

export default function AddIncomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const existingEntries = useSelector((state: RootState) => state.income.entries);

  const [platform, setPlatform] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [frequency, setFrequency] = useState<PaymentFrequency>('weekly');
  const [status, setStatus] = useState<IncomeStatus>('received');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const averageSuggestion = useMemo(
    () => suggestIncomeByPlatformAverage(existingEntries, platform),
    [existingEntries, platform],
  );

  useEffect(() => {
    setSuggestions(getPlatformSuggestions(existingEntries));
  }, [existingEntries]);

  const handleSave = () => {
    const parsedAmount = parseFloat(amount);
    if (!platform.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Error', 'Please fill platform and valid amount');
      return;
    }

    const newEntry: IncomeEntry = {
      id: Date.now().toString(),
      platform: platform.trim(),
      amount: parsedAmount,
      date: date.toISOString().slice(0, 10),
      status,
      paymentFrequency: frequency,
      recordedAt: Date.now(),
    };

    dispatch(addEntry(newEntry));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <View style={styles.card}>
        <Text style={styles.label}>Platform</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Uber, Fiverr, DoorDash"
          placeholderTextColor="#aaa"
          value={platform}
          onChangeText={setPlatform}
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestions}>
            {suggestions.map(s => (
              <TouchableOpacity key={s} style={styles.suggestion} onPress={() => setPlatform(s)}>
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Amount ($)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="0.00" 
          placeholderTextColor="#aaa"
          keyboardType="numeric" 
          value={amount} 
          onChangeText={setAmount} 
        />
        {averageSuggestion !== null && (
          <TouchableOpacity onPress={() => setAmount(String(averageSuggestion))}>
            <Text style={styles.helper}>
              Tap to autofill average: <Text style={{fontWeight: '700'}}>${averageSuggestion.toFixed(2)}</Text>
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selectedDate) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={status} onValueChange={(v) => setStatus(v)}>
            <Picker.Item label="Received" value="received" />
            <Picker.Item label="Pending" value="pending" />
          </Picker>
        </View>

        <Text style={styles.label}>Frequency</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={frequency} onValueChange={(v) => setFrequency(v)}>
            <Picker.Item label="One time" value="one_time" />
            <Picker.Item label="Daily" value="daily" />
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Fortnightly" value="fortnightly" />
            <Picker.Item label="Monthly" value="monthly" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Income</Text>
      </TouchableOpacity>

      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  label: { fontSize: 16, fontWeight: '700', color: '#333', marginTop: 12, marginBottom: 8 },
  input: { 
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    backgroundColor: '#fafafa',
    borderRadius: 12, 
    padding: 14, 
    fontSize: 16,
    marginBottom: 8 
  },
  helper: { color: '#0066cc', marginBottom: 12, fontSize: 14 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  suggestion: { backgroundColor: '#e3f2fd', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, marginBottom: 8 },
  suggestionText: { color: '#0066cc', fontWeight: '600' },
  dateButton: {
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    backgroundColor: '#fafafa',
    borderRadius: 12, 
    padding: 14, 
    marginBottom: 8,
    alignItems: 'center'
  },
  dateButtonText: { fontSize: 16, color: '#333' },
  pickerContainer: {
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    backgroundColor: '#fafafa',
    borderRadius: 12, 
    marginBottom: 8,
    overflow: 'hidden'
  },
  saveButton: { 
    backgroundColor: '#0066cc', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center',
    shadowColor: '#0066cc', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5
  },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' }
});
