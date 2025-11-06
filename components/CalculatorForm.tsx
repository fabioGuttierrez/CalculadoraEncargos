import React, { useState } from 'react';
import type { PayrollInputs } from '../types';
import { CurrencyInput } from './CurrencyInput';
import { Toggle } from './Toggle';
import { CalculatorIcon } from './Icons';

interface CalculatorFormProps {
  onCalculate: (inputs: PayrollInputs) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [grossSalary, setGrossSalary] = useState(3000);
  const [contractType, setContractType] = useState<'clt' | 'apprentice'>('clt');
  const [dependents, setDependents] = useState(0);
  const [transportationVoucherValue, setTransportationVoucherValue] = useState(8.8);
  const [mealVoucherValue, setMealVoucherValue] = useState(25);
  const [workingDays, setWorkingDays] = useState(22);
  const [hasTransportationVoucher, setHasTransportationVoucher] = useState(true);
  const [hasMealVoucher, setHasMealVoucher] = useState(true);

  // New states for calculation options
  const [includeThirteenth, setIncludeThirteenth] = useState(true);
  const [includeVacation, setIncludeVacation] = useState(true);
  const [includeFgtsFine, setIncludeFgtsFine] = useState(true);
  const [includeEmployerTaxes, setIncludeEmployerTaxes] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      grossSalary,
      contractType,
      dependents,
      transportationVoucherValue,
      mealVoucherValue,
      workingDays,
      hasTransportationVoucher,
      hasMealVoucher,
      includeThirteenth,
      includeVacation,
      includeFgtsFine,
      includeEmployerTaxes
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Simulador de Custos</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="grossSalary" className="block text-sm font-medium text-gray-300 mb-1">
            Salário Bruto Mensal
          </label>
          <CurrencyInput value={grossSalary} onValueChange={setGrossSalary} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tipo de Contrato
          </label>
          <div className="flex w-full bg-gray-700 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setContractType('clt')}
              className={`w-1/2 rounded-md py-2 text-sm font-semibold transition-colors duration-200 ${
                contractType === 'clt' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              CLT
            </button>
            <button
              type="button"
              onClick={() => setContractType('apprentice')}
              className={`w-1/2 rounded-md py-2 text-sm font-semibold transition-colors duration-200 ${
                contractType === 'apprentice' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-600'
              }`}
            >
              Aprendiz
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="dependents" className="block text-sm font-medium text-gray-300 mb-1">
                    Dependentes (IRRF)
                </label>
                <input
                    id="dependents"
                    type="number"
                    value={dependents}
                    onChange={(e) => setDependents(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
                    min="0"
                />
            </div>
            <div>
                <label htmlFor="workingDays" className="block text-sm font-medium text-gray-300 mb-1">
                    Dias Trabalhados/Mês
                </label>
                <input
                    id="workingDays"
                    type="number"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
                    min="0"
                />
            </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-700">
            <Toggle label="Incluir Vale-Transporte" enabled={hasTransportationVoucher} setEnabled={setHasTransportationVoucher} />
            {hasTransportationVoucher && (
                <div>
                    <label htmlFor="transportationVoucher" className="block text-sm font-medium text-gray-300 mb-1">
                        Custo Diário do VT
                    </label>
                    <CurrencyInput value={transportationVoucherValue} onValueChange={setTransportationVoucherValue} />
                </div>
            )}
        </div>
        
        <div className="space-y-4">
            <Toggle label="Incluir Vale-Refeição/Alimentação" enabled={hasMealVoucher} setEnabled={setHasMealVoucher} />
            {hasMealVoucher && (
                <div>
                    <label htmlFor="mealVoucher" className="block text-sm font-medium text-gray-300 mb-1">
                        Valor Diário do VR/VA
                    </label>
                    <CurrencyInput value={mealVoucherValue} onValueChange={setMealVoucherValue} />
                </div>
            )}
        </div>
        
        <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Opções de Cálculo</h3>
            <div className="space-y-4">
                <Toggle label="Provisão de 13º Salário" enabled={includeThirteenth} setEnabled={setIncludeThirteenth} />
                <Toggle label="Provisão de Férias + 1/3" enabled={includeVacation} setEnabled={setIncludeVacation} />
                <Toggle label="Provisão Multa FGTS (40%)" enabled={includeFgtsFine} setEnabled={setIncludeFgtsFine} />
                <div>
                  <Toggle label="Encargos Patronais" enabled={includeEmployerTaxes} setEnabled={setIncludeEmployerTaxes} />
                  <p className="text-xs text-gray-500 ml-16 mt-1">INSS Patronal, RAT e Terceiros (~28.8%). Ative para Lucro Real/Presumido.</p>
                </div>
            </div>
        </div>


        <button
          type="submit"
          className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
        >
          <CalculatorIcon className="h-5 w-5 mr-2" />
          Calcular
        </button>
      </form>
    </div>
  );
};