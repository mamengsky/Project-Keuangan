export interface DatabaseSchema {
  transactions: {
    Row: {
      id: string;
      type: 'deposit' | 'withdrawal';
      amount: number;
      recorder_name: string;
      purpose: string;
      notes: string | null;
      date: string;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<DatabaseSchema['transactions']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<DatabaseSchema['transactions']['Insert']>;
  };
}