import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { IncomeEntry } from '../types/income';
import { loadIncomes, saveIncomes } from '../services/storage';

interface IncomeContextType {
  entries: IncomeEntry[];
  addEntry: (entry: IncomeEntry) => void;
  removeEntry: (id: string) => void;
}

export const IncomeContext = createContext<IncomeContextType>({
  entries: [],
  addEntry: () => {},
  removeEntry: () => {},
});

export const IncomeProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<IncomeEntry[]>([]);

  useEffect(() => {
    loadIncomes().then(setEntries);
  }, []);

  useEffect(() => {
    saveIncomes(entries);
  }, [entries]);

  const addEntry = (entry: IncomeEntry) => {
    setEntries(prev => [entry, ...prev]);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <IncomeContext.Provider value={{ entries, addEntry, removeEntry }}>
      {children}
    </IncomeContext.Provider>
  );
};