import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IncomeEntry } from '../types/income';

interface IncomeState {
  entries: IncomeEntry[];
}

const initialState: IncomeState = { entries: [] };

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<IncomeEntry[]>) => {
      state.entries = action.payload;
    },
    addEntry: (state, action: PayloadAction<IncomeEntry>) => {
      state.entries.push(action.payload);
    },
    removeEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(e => e.id !== action.payload);
    },
  },
});

export const { setEntries, addEntry, removeEntry } = incomeSlice.actions;
export default incomeSlice.reducer;