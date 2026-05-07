import AsyncStorage from '@react-native-async-storage/async-storage';
import { IncomeEntry, UserProfile } from '../types/income';

const INCOMES_KEY = '@GigLedger:incomes';
const PROFILE_KEY = '@GigLedger:profile';

export const saveIncomes = async (incomes: IncomeEntry[]) => {
  await AsyncStorage.setItem(INCOMES_KEY, JSON.stringify(incomes));
};

export const loadIncomes = async (): Promise<IncomeEntry[]> => {
  const data = await AsyncStorage.getItem(INCOMES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProfile = async (profile: UserProfile) => {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const loadProfile = async (): Promise<UserProfile | null> => {
  const data = await AsyncStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
};