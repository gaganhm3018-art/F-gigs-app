import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import AddIncomeScreen from '../screens/AddIncomeScreen';
import ReportsScreen from '../screens/ReportsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Add Income" component={AddIncomeScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}