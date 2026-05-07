import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/src/services/screens/WelcomeScreen';
import AddIncomeScreen from './src/src/services/screens/AddIncomeScreen';
import DashboardScreen from './src/src/services/screens/DashboardScreen';
import { store } from './src/src/services/store/store';

export type RootStackParamList = {
  Welcome: undefined;
  Dashboard: undefined;
  AddIncome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: 'Income Dashboard' }}
          />
          <Stack.Screen
            name="AddIncome"
            component={AddIncomeScreen}
            options={{ title: 'Add Income' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
