import { useMemo } from 'react';

export const useTransactionPeriod = () => {
  return useMemo(() => {
    const today = new Date();
    let startDate: Date;
    let endDate: Date;
    
    // If current date is before 6th of the month
    if (today.getDate() < 6) {
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 6);
      endDate = new Date(today.getFullYear(), today.getMonth(), 5);
    } else {
      startDate = new Date(today.getFullYear(), today.getMonth(), 6);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 5);
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  }, []);
};