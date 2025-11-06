
import React, { useState, useRef } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { calculatePayroll } from './services/payrollService';
import type { PayrollInputs, PayrollResults } from './types';
import { Hero } from './components/Hero';
import { FeatureSection } from './components/FeatureSection';
import { CTA } from './components/CTA';

const App: React.FC = () => {
  const [results, setResults] = useState<PayrollResults | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (inputs: PayrollInputs) => {
    const calculatedResults = calculatePayroll(inputs);
    setResults(calculatedResults);
  };

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero onPrimaryActionClick={scrollToCalculator} />
        
        <FeatureSection />

        <div id="calculator" ref={calculatorRef} className="py-16 sm:py-24">
            <main className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <CalculatorForm onCalculate={handleCalculate} key={results ? 'has-results' : 'no-results'} />
              </div>
              <div className="lg:col-span-3">
                <ResultsDisplay results={results} />
              </div>
            </main>
        </div>

        <CTA />

        <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} Sua Empresa Inc. Todos os direitos reservados.</p>
          <p className="mt-1">Valores de 2024. Simulação apenas para fins educacionais.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
