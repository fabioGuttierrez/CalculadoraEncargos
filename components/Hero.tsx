
import React from 'react';
import { CalculatorIcon } from './Icons';

interface HeroProps {
  onPrimaryActionClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPrimaryActionClick }) => (
  <header className="text-center py-16 sm:py-24">
    <div className="inline-flex items-center justify-center bg-gray-800 border border-cyan-500/30 p-4 rounded-full mb-4 animate-pulse">
        <CalculatorIcon className="h-10 w-10 text-cyan-400"/>
    </div>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
      Desvende o Custo Real de um Colaborador
    </h1>
    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-400">
      Nossa calculadora detalha todos os encargos, benefícios e provisões. Tenha clareza nos números para tomar decisões mais inteligentes e estratégicas para o seu negócio.
    </p>
    <div className="mt-8 flex justify-center gap-4">
        <button 
          onClick={onPrimaryActionClick}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          Simular Agora
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg">
          Conheça a Plataforma
        </button>
    </div>
  </header>
);
