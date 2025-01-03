import React from 'react';
import { Wallet } from 'lucide-react';

export const WithdrawHeader: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="p-3 bg-red-100 rounded-lg">
        <Wallet className="w-8 h-8 text-red-600" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Withdraw Uang Brangkas</h1>
        <p className="text-sm text-gray-600 mt-1">
          Record new withdrawals with complete transaction details
        </p>
      </div>
    </div>
  );
};