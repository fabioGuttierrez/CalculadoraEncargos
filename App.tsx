
import React, { useState } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { calculatePayroll } from './services/payrollService';
import type { PayrollInputs, PayrollResults } from './types';
import { AppTitle } from './components/AppTitle';

const App: React.FC = () => {
  const [results, setResults] = useState<PayrollResults | null>(null);

  const handleCalculate = (inputs: PayrollInputs) => {
    const calculatedResults = calculatePayroll(inputs);
    setResults(calculatedResults);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <AppTitle />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <CalculatorForm onCalculate={handleCalculate} />
          </div>
          <div className="lg:col-span-3">
            <ResultsDisplay results={results} />
          </div>
        </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Valores de 2024. Simulação apenas para fins educacionais.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
