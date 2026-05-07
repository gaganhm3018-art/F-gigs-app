import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AddIncomeScreen from './src/screens/AddIncomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { store } from './src/store/store';

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
