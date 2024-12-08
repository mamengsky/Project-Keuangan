import { utils, writeFile } from 'xlsx';
import { Transaction } from '../types/transaction';
import { formatCurrency, formatDate } from './formatters';

export const exportToExcel = (transactions: Transaction[], fileName: string = 'transactions') => {
  const data = transactions.map(transaction => ({
    'Type': transaction.type === 'deposit' ? 'Pemasukan' : 'Pengeluaran',
    'Recorder': transaction.recorderName,
    'Purpose': transaction.purpose,
    'Amount': transaction.amount,
    'Notes': transaction.notes,
    'Date': formatDate(transaction.date),
    'Formatted Amount': formatCurrency(transaction.amount)
  }));

  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Transactions');

  // Auto-size columns
  const maxWidth = data.reduce((w, r) => Math.max(w, r.Purpose.length), 10);
  const colWidths = {
    A: 12, // Type
    B: 30, // Recorder
    C: maxWidth, // Purpose
    D: 15, // Amount
    E: 30, // Notes
    F: 20, // Date
    G: 20, // Formatted Amount
  };

  worksheet['!cols'] = Object.entries(colWidths).map(([, width]) => ({ width }));

  writeFile(workbook, `${fileName}-${formatDate(new Date().toISOString())}.xlsx`);
};