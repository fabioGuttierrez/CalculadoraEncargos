
import React from 'react';

interface HeroProps {
  onPrimaryActionClick: () => void;
  simulationCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onPrimaryActionClick, simulationCount }) => {
  const formatted = simulationCount.toLocaleString('pt-BR');

  return (
    <header className="text-center py-16 sm:py-24">
      <div className="mb-6">
        <span className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          CustoReal
        </span>
        <p className="text-gray-500 text-sm mt-2 tracking-wide">
          por{' '}
          <a href="https://bildee.com.br" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors font-semibold">
            Bildee
          </a>
        </p>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
        Quanto custa realmente um funcionário CLT?
      </h1>
      <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">
        Calcule encargos, benefícios e provisões com precisão. Compare CLT × PJ e tome decisões estratégicas com clareza — de graça, sem cadastro.
      </p>

      {/* Social proof stats */}
      <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-lg">+{formatted}</span>
          <span className="text-gray-500">simulações realizadas</span>
        </div>
        <div className="hidden sm:block text-gray-700">|</div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-lg">100%</span>
          <span className="text-gray-500">gratuito</span>
        </div>
        <div className="hidden sm:block text-gray-700">|</div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-lg">0</span>
          <span className="text-gray-500">cadastro necessário</span>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onPrimaryActionClick}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          Simular Agora
        </button>
      </div>
    </header>
  );
};
