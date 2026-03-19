
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

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CustoReal
            </span>
            <span className="text-gray-600 text-xs">por</span>
            <a href="https://bildee.com.br" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-xs font-semibold hover:text-cyan-400 transition-colors">
              Bildee
            </a>
          </div>
          <button
            onClick={scrollToCalculator}
            className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Simular agora →
          </button>
        </div>
      </nav>

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

        <footer className="text-center py-8 border-t border-gray-800">
          <span className="inline-block font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-xl">CustoReal</span>
          <p className="text-gray-600 text-xs mt-1">
            por{' '}
            <a href="https://bildee.com.br" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors font-semibold">Bildee</a>
            {' '}— Sua Visão, Nossa Missão.
          </p>
          <p className="text-gray-700 text-xs mt-3">© {new Date().getFullYear()} Bildee. Todos os direitos reservados. Valores de 2024 — simulação para fins educacionais.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
