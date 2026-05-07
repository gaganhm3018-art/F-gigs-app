// src/screens/WelcomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
      <Text style={styles.title}>Welcome, Gig Worker 👋</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Start Tracking" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 12, marginBottom: 20, borderRadius: 8 },
});