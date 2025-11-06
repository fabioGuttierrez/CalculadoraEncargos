
import React from 'react';

interface CurrencyInputProps {
  value: number;
  onValueChange: (value: number) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onValueChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numberValue = parseFloat(rawValue.replace(/[^0-9,]/g, '').replace(',', '.'));
    if (!isNaN(numberValue)) {
      onValueChange(numberValue);
    } else {
      onValueChange(0);
    }
  };

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(value);

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">R$</span>
      <input
        type="text"
        value={formattedValue}
        onChange={handleChange}
        className="w-full bg-gray-700 border border-gray-600 rounded-md pl-10 pr-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
      />
    </div>
  );
};
