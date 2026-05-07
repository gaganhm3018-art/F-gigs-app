import React, { useEffect, useState } from 'react';
import { IncomeProvider } from './src/context/IncomeContext';
import { loadProfile } from './src/services/storage';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    loadProfile().then(profile => setIsOnboarded(profile?.hasOnboarded || false));
  }, []);

  if (isOnboarded === null) return null;

  return (
    <IncomeProvider>
      {isOnboarded ? <AppNavigator /> : <WelcomeScreen />}
    </IncomeProvider>
  );
}