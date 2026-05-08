import { create } from 'zustand'

interface IncomeState {
  totalIncome: number
  setTotalIncome: (amount: number) => void
}

export const useIncomeStore = create<IncomeState>((set) => ({
  totalIncome: 0,
  setTotalIncome: (amount) => set({ totalIncome: amount })
}))