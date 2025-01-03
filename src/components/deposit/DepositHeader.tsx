import React from 'react';
import { PiggyBank } from 'lucide-react';

export const DepositHeader: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="p-3 bg-blue-100 rounded-lg">
        <PiggyBank className="w-8 h-8 text-blue-600" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Deposit Uang Brangkas</h1>
        <p className="text-sm text-gray-600 mt-1">
          Record new deposits with complete transaction details
        </p>
      </div>
    </div>
  );
};