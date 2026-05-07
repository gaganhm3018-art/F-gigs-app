import { View, Text, StyleSheet } from 'react-native';
export default function PredictionCard({ amount }: { amount: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>📈 ML Forecast: Next week's income</Text>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: '#e6f0ff', borderRadius: 16, padding: 16, marginVertical: 12 },
  label: { fontSize: 14, color: '#333' },
  amount: { fontSize: 28, fontWeight: 'bold', color: '#0047ab' },
});