import React, { createContext, useContext, useState } from 'react';

interface TransactionContextType {
  recorderName: string;
  purpose: string;
  setRecorderName: (name: string) => void;
  setPurpose: (purpose: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recorderName, setRecorderName] = useState('');
  const [purpose, setPurpose] = useState('');

  return (
    <TransactionContext.Provider value={{
      recorderName,
      purpose,
      setRecorderName,
      setPurpose,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
};