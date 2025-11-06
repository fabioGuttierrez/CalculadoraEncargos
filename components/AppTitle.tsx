
import React from 'react';
import { CalculatorIcon } from './Icons';

export const AppTitle: React.FC = () => (
  <header className="text-center">
    <div className="inline-flex items-center justify-center bg-gray-800 border border-cyan-500/30 p-4 rounded-full mb-4">
        <CalculatorIcon className="h-10 w-10 text-cyan-400"/>
    </div>
    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
      Calculadora de Encargos e Benefícios
    </h1>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
      Simule o salário líquido do colaborador e o custo total para a empresa de forma rápida e detalhada.
    </p>
  </header>
);
