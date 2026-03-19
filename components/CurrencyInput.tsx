
import React, { useState, useRef } from 'react';

interface CurrencyInputProps {
  value: number;
  onValueChange: (value: number) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onValueChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [rawInput, setRawInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(value);

  const handleFocus = () => {
    const raw = value === 0 ? '' : String(value).replace('.', ',');
    setRawInput(raw);
    setIsFocused(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^0-9,.]/g, '');

    // Permite apenas um separador decimal
    const separatorIndex = raw.search(/[,.]/);
    if (separatorIndex !== -1) {
      const intPart = raw.slice(0, separatorIndex).replace(/[,.]/g, '');
      const decPart = raw.slice(separatorIndex + 1).replace(/[,.]/g, '').slice(0, 2);
      raw = intPart + ',' + decPart;
    }

    setRawInput(raw);

    const normalized = raw.replace(',', '.');
    const num = parseFloat(normalized);
    onValueChange(isNaN(num) ? 0 : num);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const normalized = rawInput.replace(',', '.');
    const num = parseFloat(normalized);
    onValueChange(isNaN(num) ? 0 : num);
  };

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">R$</span>
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={isFocused ? rawInput : formattedValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full bg-gray-700 border border-gray-600 rounded-md pl-10 pr-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
      />
    </div>
  );
};
