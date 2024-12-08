import React, { useState, useEffect } from 'react';
import { Copy, Calculator } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface TaxCalculatorProps {
  balance: number;
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ balance }) => {
  const TAX_RATE = 0.005; // 0.5%
  const [taxAmount, setTaxAmount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTaxAmount(balance * TAX_RATE);
  }, [balance]);

  const handleCopy = () => {
    navigator.clipboard.writeText(taxAmount.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-fit sticky top-4">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Tax Calculator</h2>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Current Balance</p>
          <p className="text-lg font-semibold text-gray-800">{formatCurrency(balance)}</p>
        </div>
        
        <div className="border-t pt-3">
          <p className="text-sm text-gray-600">Tax Amount (0.5%)</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-lg font-semibold text-blue-600">{formatCurrency(taxAmount)}</p>
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              title="Copy amount"
            >
              <Copy className="w-4 h-4 text-gray-500" />
            </button>
            {copied && (
              <span className="text-sm text-green-600">Copied!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};