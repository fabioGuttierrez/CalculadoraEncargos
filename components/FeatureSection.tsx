
import React from 'react';
import { BriefcaseIcon, PiggyBankIcon, ShieldCheckIcon } from './Icons';

const Feature: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-900/50 text-cyan-400 mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{children}</p>
    </div>
);

export const FeatureSection: React.FC = () => (
    <div className="py-16 sm:py-24 bg-gray-900/50 rounded-2xl border border-gray-800">
        <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Por que calcular o custo de um funcionário?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
                Uma contratação vai muito além do salário. Entender o custo total é vital para a saúde financeira e o planejamento estratégico do seu negócio.
            </p>
        </div>
        <div className="mt-12 max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
            <Feature title="Planejamento Financeiro" icon={<PiggyBankIcon className="w-6 h-6" />}>
                Evite surpresas no fluxo de caixa. Saiba exatamente quanto sua empresa investe por colaborador, incluindo provisões para 13º e férias.
            </Feature>
            <Feature title="Contratações Estratégicas" icon={<BriefcaseIcon className="w-6 h-6" />}>
                Tome decisões de contratação baseadas em dados precisos. Compare o custo entre diferentes salários e regimes tributários.
            </Feature>
            <Feature title="Conformidade e Transparência" icon={<ShieldCheckIcon className="w-6 h-6" />}>
                Garanta que sua empresa está ciente de todos os encargos legais, fortalecendo a segurança jurídica e a transparência com a equipe.
            </Feature>
        </div>
    </div>
);
