import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.label}>Platform</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Uber, Fiverr, DoorDash"
        value={platform}
        onChangeText={setPlatform}
      />
      {suggestions.length > 0 && (
        <View style={styles.suggestions}>
          {suggestions.map(s => (
            <Text key={s} style={styles.suggestion} onPress={() => setPlatform(s)}>
              {s}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.label}>Amount ($)</Text>
      <TextInput style={styles.input} placeholder="0.00" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      {averageSuggestion !== null && (
        <Text style={styles.helper} onPress={() => setAmount(String(averageSuggestion))}>
          Tap to autofill average: ${averageSuggestion}
        </Text>
      )}

      <Text style={styles.label}>Date</Text>
      <Button title={date.toLocaleDateString()} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Status</Text>
      <Picker selectedValue={status} onValueChange={(v) => setStatus(v)}>
        <Picker.Item label="Received" value="received" />
        <Picker.Item label="Pending" value="pending" />
      </Picker>

      <Text style={styles.label}>Frequency</Text>
      <Picker selectedValue={frequency} onValueChange={(v) => setFrequency(v)}>
        <Picker.Item label="One time" value="one_time" />
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Fortnightly" value="fortnightly" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>

      <Button title="Save Income" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 8 },
  helper: { color: '#2e7d32', marginBottom: 10 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  suggestion: { backgroundColor: '#e0e0e0', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4, marginRight: 8, marginBottom: 4 },
});
