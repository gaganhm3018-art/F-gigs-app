// src/screens/WelcomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { saveProfile } from '../services/storage';

export default function WelcomeScreen({ navigation }: any) {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (name.trim()) {
      await saveProfile({ name: name.trim(), hasCompletedOnboarding: true });
      navigation.replace('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>IKYA Gig Workers App</Text>
        <Text style={styles.subtitle}>Welcome! Let's optimize your earnings.</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your name to start"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Start Tracking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', justifyContent: 'center' },
  content: { padding: 24, backgroundColor: '#fff', margin: 20, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 },
  title: { fontSize: 28, fontWeight: '800', color: '#1a1a1a', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fafafa', padding: 16, fontSize: 16, marginBottom: 24, borderRadius: 12 },
  button: { backgroundColor: '#0066cc', paddingVertical: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#0066cc', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' }
});