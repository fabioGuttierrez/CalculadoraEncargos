
import React, { useState, useEffect } from 'react';
import type { PayrollInputs } from '../types';
import { CurrencyInput } from './CurrencyInput';
import { Toggle } from './Toggle';
import { CalculatorIcon, InfoIcon } from './Icons';
import { Tooltip } from './Tooltip';


interface CalculatorFormProps {
  onCalculate: (inputs: PayrollInputs) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [grossSalary, setGrossSalary] = useState(3000);
  const [contractType, setContractType] = useState<'clt' | 'apprentice'>('clt');
  const [taxRegime, setTaxRegime] = useState<'simples' | 'presumido_real'>('simples');
  const [dependents, setDependents] = useState(0);
  const [workingDays, setWorkingDays] = useState(22);
  
  // Benefits
  const [hasTransportationVoucher, setHasTransportationVoucher] = useState(true);
  const [transportationVoucherValue, setTransportationVoucherValue] = useState(8.8);
  const [hasMealVoucher, setHasMealVoucher] = useState(true);
  const [mealVoucherValue, setMealVoucherValue] = useState(25);
  const [hasHealthPlan, setHasHealthPlan] = useState(false);
  const [healthPlanCost, setHealthPlanCost] = useState(350);
  const [hasLifeInsurance, setHasLifeInsurance] = useState(false);
  const [lifeInsuranceCost, setLifeInsuranceCost] = useState(50);

  // Calculation options
  const [includeThirteenth, setIncludeThirteenth] = useState(true);
  const [includeVacation, setIncludeVacation] = useState(true);
  const [includeFgtsFine, setIncludeFgtsFine] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      grossSalary,
      contractType,
      taxRegime,
      dependents,
      workingDays,
      hasTransportationVoucher,
      transportationVoucherValue,
      hasMealVoucher,
      mealVoucherValue,
      hasHealthPlan,
      healthPlanCost,
      hasLifeInsurance,
      lifeInsuranceCost,
      includeThirteenth,
      includeVacation,
      includeFgtsFine,
    });
  };

  useEffect(() => {
    // Auto-calculate on first load
    handleSubmit(new Event('submit') as unknown as React.FormEvent);
  }, []);

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
            Regime Tributário
            <Tooltip text="Simples Nacional: regime simplificado para ME/EPP. Lucro Presumido/Real: regime padrão com encargos patronais (INSS, RAT, Terceiros) de ~28.8% sobre a folha.">
              <InfoIcon className="h-4 w-4 ml-2 inline-block text-gray-500 hover:text-cyan-400" />
            </Tooltip>
          </label>
          <div className="flex w-full bg-gray-700 rounded-lg p-1">
            <button type="button" onClick={() => setTaxRegime('simples')} className={`w-1/2 rounded-md py-2 text-sm font-semibold transition-colors duration-200 ${taxRegime === 'simples' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
              Simples Nacional
            </button>
            <button type="button" onClick={() => setTaxRegime('presumido_real')} className={`w-1/2 rounded-md py-2 text-sm font-semibold transition-colors duration-200 ${taxRegime === 'presumido_real' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
              Lucro Presumido/Real
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tipo de Contrato
          </label>
          <div className="flex w-full bg-gray-700 rounded-lg p-1">
            <button type="button" onClick={() => setContractType('clt')} className={`w-1/2 rounded-md py-2 text-sm font-semibold transition-colors duration-200 ${contractType === 'clt' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
              CLT
            </button>
            <button type="button" onClick={() => setContractType('apprentice')} className={`w-1/2 rounded-md py-2 text-sm font-semibold transition-colors duration-200 ${contractType === 'apprentice' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
              Aprendiz
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="dependents" className="block text-sm font-medium text-gray-300 mb-1">Dependentes</label>
                <input id="dependents" type="number" value={dependents} onChange={(e) => setDependents(Math.max(0, parseInt(e.target.value) || 0))} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition" min="0" />
            </div>
            <div>
                <label htmlFor="workingDays" className="block text-sm font-medium text-gray-300 mb-1">Dias Úteis/Mês</label>
                <input id="workingDays" type="number" value={workingDays} onChange={(e) => setWorkingDays(Math.max(0, parseInt(e.target.value) || 0))} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition" min="0" />
            </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-1">Benefícios</h3>
            <Toggle label="Vale-Transporte" enabled={hasTransportationVoucher} setEnabled={setHasTransportationVoucher} />
            {hasTransportationVoucher && <div className="pl-8"><label className="text-xs text-gray-400">Custo Diário</label><CurrencyInput value={transportationVoucherValue} onValueChange={setTransportationVoucherValue} /></div>}
            
            <Toggle label="Vale-Refeição/Alimentação" enabled={hasMealVoucher} setEnabled={setHasMealVoucher} />
            {hasMealVoucher && <div className="pl-8"><label className="text-xs text-gray-400">Valor Diário</label><CurrencyInput value={mealVoucherValue} onValueChange={setMealVoucherValue} /></div>}

            <Toggle label="Plano de Saúde" enabled={hasHealthPlan} setEnabled={setHasHealthPlan} />
            {hasHealthPlan && <div className="pl-8"><label className="text-xs text-gray-400">Custo Mensal (Empresa)</label><CurrencyInput value={healthPlanCost} onValueChange={setHealthPlanCost} /></div>}
            
            <Toggle label="Seguro de Vida" enabled={hasLifeInsurance} setEnabled={setHasLifeInsurance} />
            {hasLifeInsurance && <div className="pl-8"><label className="text-xs text-gray-400">Custo Mensal (Empresa)</label><CurrencyInput value={lifeInsuranceCost} onValueChange={setLifeInsuranceCost} /></div>}
        </div>
        
        <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Provisões</h3>
            <div className="space-y-4">
                <Toggle label="13º Salário" enabled={includeThirteenth} setEnabled={setIncludeThirteenth} />
                <Toggle label="Férias + 1/3" enabled={includeVacation} setEnabled={setIncludeVacation} />
                <Toggle label="Multa FGTS (40%)" enabled={includeFgtsFine} setEnabled={setIncludeFgtsFine} />
            </div>
        </div>

        <button type="submit" className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500">
          <CalculatorIcon className="h-5 w-5 mr-2" />
          Calcular
        </button>
      </form>
    </div>
  );
};
