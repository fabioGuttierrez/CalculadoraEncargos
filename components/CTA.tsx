
import React from 'react';

export const CTA: React.FC = () => (
  <div className="space-y-6 my-24">

    {/* Banner FGTS */}
    <div className="bg-indigo-900/40 border border-indigo-700/50 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1">Bildee — Outra ferramenta gratuita</p>
        <p className="text-white font-bold text-lg">Calculadora de FGTS em Atraso</p>
        <p className="text-gray-400 text-sm mt-1">Descubra quanto a empresa deve de FGTS não recolhido, com correção e juros.</p>
      </div>
      <a
        href="https://fgts.bildee.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 border border-indigo-500 rounded-lg text-sm font-semibold text-indigo-300 hover:bg-indigo-800/50 transition-colors whitespace-nowrap"
      >
        Calcular FGTS →
      </a>
    </div>

    {/* CTA principal */}
    <div className="bg-gray-800 rounded-2xl">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <p className="text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-3">Bildee</p>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Esta ferramenta é gratuita.</span>
          <span className="block text-cyan-400 mt-1">Porque acreditamos em decisões bem informadas.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-400">
          A Bildee desenvolve soluções que simplificam a gestão do seu negócio. Se este simulador te ajudou, conheça nosso trabalho.
        </p>
        <a
          href="https://bildee.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-transform transform hover:scale-105"
        >
          Conheça a Bildee
        </a>
      </div>
    </div>
  </div>
);
