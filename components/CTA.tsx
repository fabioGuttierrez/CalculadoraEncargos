
import React from 'react';

export const CTA: React.FC = () => (
    <div className="bg-gray-800 rounded-2xl my-24">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Leve a gestão da sua empresa</span>
                <span className="block text-cyan-400">para o próximo nível.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-300">
                A calculadora é apenas o começo. Nossa plataforma completa oferece controle de ponto, gestão de benefícios, relatórios e muito mais.
            </p>
            <a
                href="#"
                className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 sm:w-auto transition-transform transform hover:scale-105"
            >
                Conheça Nossos Planos
            </a>
        </div>
    </div>
);
