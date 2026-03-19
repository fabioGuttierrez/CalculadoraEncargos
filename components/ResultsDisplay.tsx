
import React, { useState } from 'react';
import type { PayrollResults } from '../types';
import { DownloadIcon, UserIcon, BuildingIcon, ChartPieIcon, InfoIcon } from './Icons';
import { Tooltip } from './Tooltip';
import { PieChart } from './PieChart';
import { calculatePJComparison } from '../services/payrollService';

interface ResultsDisplayProps {
  results: PayrollResults | null;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const ResultRow: React.FC<{ label: string; value: string; isTotal?: boolean; isNegative?: boolean; tooltipText?: string }> = ({ label, value, isTotal = false, isNegative = false, tooltipText }) => (
  <div className={`flex justify-between items-center py-2 ${isTotal ? 'font-bold border-t border-gray-600 mt-2 pt-3' : 'border-b border-gray-700'}`}>
    <span className="text-gray-300 flex items-center">
      {label}
      {tooltipText && (
        <Tooltip text={tooltipText}>
          <InfoIcon className="h-4 w-4 ml-2 text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer" />
        </Tooltip>
      )}
    </span>
    <span className={`${isTotal ? 'text-cyan-400' : 'text-white'} ${isNegative ? 'text-red-400' : ''}`}>{value}</span>
  </div>
);

const ResultCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 h-full">
        <div className="flex items-center mb-4">
            <div className="bg-gray-700 p-2 rounded-full mr-3">{icon}</div>
            <h3 className="text-xl font-bold text-cyan-400">{title}</h3>
        </div>
        <div className="space-y-2">{children}</div>
    </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [pjTaxRate, setPjTaxRate] = useState(0.155);
  const [includePjCounter, setIncludePjCounter] = useState(true);
  const [pjCounterCost, setPjCounterCost] = useState(150);
  const [includePjProLaboreInss, setIncludePjProLaboreInss] = useState(false);

  const handleExportCSV = () => {
    if (!results) return;

    const fgtsRateLabel = results.inputs.contractType === 'apprentice' ? '2%' : '8%';
    const headers = ['Item', 'Valor (R$)'];
    
    const data = [
      { group: '--- COLABORADOR ---' },
      { label: 'Salário Bruto', value: results.employee.grossSalary },
      { label: '(-) INSS', value: -results.employee.inss },
      { label: '(-) IRRF', value: -results.employee.irrf },
      { condition: results.employee.transportationVoucherDiscount > 0, label: '(-) Vale-Transporte (6%)', value: -results.employee.transportationVoucherDiscount },
      { label: '(=) Salário Líquido', value: results.employee.netSalary },
      { group: ''},
      { group: '--- EMPREGADOR ---' },
      { label: 'Salário Bruto', value: results.employer.grossSalary },
      { label: `(+) FGTS (${fgtsRateLabel})`, value: results.employer.fgts },
      { condition: results.employer.employerInss > 0, label: '(+) INSS Patronal', value: results.employer.employerInss },
      { condition: results.employer.thirdPartyContributions > 0, label: '(+) Terceiros (RAT+S)', value: results.employer.thirdPartyContributions },
      { condition: results.employer.transportationVoucherCost > 0, label: '(+) Vale-Transporte', value: results.employer.transportationVoucherCost },
      { condition: results.employer.mealVoucherCost > 0, label: '(+) Vale-Refeição/Alimentação', value: results.employer.mealVoucherCost },
      { condition: results.employer.healthPlanCost > 0, label: '(+) Plano de Saúde', value: results.employer.healthPlanCost },
      { condition: results.employer.lifeInsuranceCost > 0, label: '(+) Seguro de Vida', value: results.employer.lifeInsuranceCost },
      { condition: results.employer.thirteenthSalaryProvision > 0, label: '(+) Provisão de 13º Salário', value: results.employer.thirteenthSalaryProvision },
      { condition: results.employer.vacationProvision > 0, label: '(+) Provisão de Férias', value: results.employer.vacationProvision },
      { condition: results.employer.vacationBonusProvision > 0, label: '(+) Provisão de 1/3 Férias', value: results.employer.vacationBonusProvision },
      { condition: results.employer.fgtsOnProvisions > 0, label: '(+) FGTS s/ Provisões', value: results.employer.fgtsOnProvisions },
      { condition: results.employer.thirteenthProvisionTaxes > 0, label: '(+) Encargos s/ 13º (Provisão)', value: results.employer.thirteenthProvisionTaxes },
      { condition: results.employer.fgtsFineProvision > 0, label: '(+) Provisão Multa Rescisória (40%)', value: results.employer.fgtsFineProvision },
      { label: '(=) Custo Total Mensal', value: results.employer.totalCost },
    ];

    const rows = data
      .filter(item => item.condition !== false)
      .map(row => [
        `"${row.group || row.label}"`,
        typeof row.value === 'number' ? `"${String(row.value.toFixed(2)).replace('.', ',')}"` : ''
      ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(";") + "\n" 
      + rows.map(e => e.join(";")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `calculo_custo_funcionario_${results.inputs.taxRegime}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-dashed border-gray-700 min-h-[300px]">
        <ChartPieIcon className="h-16 w-16 text-gray-600 mb-4"/>
        <h3 className="text-xl font-bold text-gray-400">Aguardando cálculo</h3>
        <p className="text-gray-500 mt-1">Preencha os dados e clique em "Calcular".</p>
      </div>
    );
  }

  const directChargesAndBenefits = results.employer.fgts + results.employer.transportationVoucherCost + results.employer.mealVoucherCost + results.employer.healthPlanCost + results.employer.lifeInsuranceCost + results.employer.employerInss + results.employer.thirdPartyContributions;
  const comparison = calculatePJComparison(results, pjTaxRate);

  const PJ_PROLABORE_INSS_EST = 167;
  const pjHiddenCosts = (includePjCounter ? pjCounterCost : 0) + (includePjProLaboreInss ? PJ_PROLABORE_INSS_EST : 0);
  const adjustedPjMonthlyCost = comparison.pjGrossToMatchNet + pjHiddenCosts;
  const adjustedPjAnnualCost = adjustedPjMonthlyCost * 12;
  const realSavingsVsClt = results.employer.totalCost - adjustedPjMonthlyCost;
  const realAnnualSavingsVsClt = comparison.annualCltCost - adjustedPjAnnualCost;
  const fgtsRateLabel = results.inputs.contractType === 'apprentice' ? '2%' : '8%';
  const fgtsTooltip = `Depósito mensal de ${fgtsRateLabel} sobre o salário bruto em uma conta vinculada ao colaborador, sem desconto do seu salário. A alíquota para aprendizes é de 2%.`;
  const employerTaxesTooltip = "Contribuições para Risco Ambiental de Trabalho (RAT) e outras entidades (Sistema S). Alíquota média de 5.8%. Aplicável apenas em Lucro Presumido/Real.";
  const employerINSSTooltip = "Contribuição previdenciária paga pela empresa, correspondente a 20% sobre a folha de pagamento. Aplicável apenas em Lucro Presumido/Real.";

  const chartData = [
    { label: 'Salário Bruto', value: results.employer.grossSalary, color: '#06b6d4' }, // cyan-500
    { label: 'Encargos e Benefícios', value: directChargesAndBenefits, color: '#6366f1' }, // indigo-500
    { label: 'Provisões Mensais', value: results.employer.totalProvisions, color: '#ec4899' }, // pink-500
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ResultCard title="Resumo do Colaborador" icon={<UserIcon className="h-6 w-6 text-cyan-400"/>}>
            <ResultRow label="Salário Bruto" value={formatCurrency(results.employee.grossSalary)} />
            <ResultRow label="Total de Descontos" value={`- ${formatCurrency(results.employee.totalDeductions)}`} isNegative/>
            <ResultRow label="Salário Líquido" value={formatCurrency(results.employee.netSalary)} isTotal />
        </ResultCard>

        <ResultCard title="Custo Total da Empresa" icon={<BuildingIcon className="h-6 w-6 text-cyan-400"/>}>
            <div className="text-center mb-4">
              <span className="text-gray-400 text-sm">Custo Total Mensal</span>
              <p className="text-3xl font-bold text-cyan-400">{formatCurrency(results.employer.totalCost)}</p>
            </div>
            <PieChart data={chartData} />
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-700">
              <div className="text-center">
                <span className="text-gray-400 text-xs block">Custo Anual</span>
                <p className="text-base font-bold text-indigo-400">{formatCurrency(comparison.annualCltCost)}</p>
              </div>
              <div className="text-center">
                <span className="text-gray-400 text-xs block">Custo por Hora</span>
                <p className="text-base font-bold text-pink-400">{formatCurrency(comparison.costPerHour)}</p>
              </div>
            </div>
        </ResultCard>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-cyan-400">Detalhamento Completo</h3>
            <button onClick={handleExportCSV} className="flex items-center bg-gray-700 hover:bg-gray-600 text-cyan-400 font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm">
                <DownloadIcon className="h-4 w-4 mr-2" /> Exportar .csv
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
                <h4 className="text-lg font-semibold text-white mb-2">Descontos (Colaborador)</h4>
                <ResultRow label="INSS" value={`- ${formatCurrency(results.employee.inss)}`} isNegative tooltipText="Contribuição previdenciária calculada com alíquotas progressivas (7.5% a 14%) sobre o salário, até o teto do INSS." />
                <ResultRow label="IRRF" value={`- ${formatCurrency(results.employee.irrf)}`} isNegative tooltipText="Imposto de Renda retido na fonte. Base de cálculo: Salário Bruto - INSS - Dedução por Dependente. Alíquotas de 0% a 27.5%." />
                {results.employee.transportationVoucherDiscount > 0 && <ResultRow label="Vale-Transporte (6%)" value={`- ${formatCurrency(results.employee.transportationVoucherDiscount)}`} isNegative tooltipText="Desconto limitado a 6% do salário bruto do colaborador para o custeio do vale-transporte." />}
            </div>
            <div>
                <h4 className="text-lg font-semibold text-white mb-2">Custos (Empregador)</h4>
                <ResultRow label={`FGTS (${fgtsRateLabel})`} value={formatCurrency(results.employer.fgts)} tooltipText={fgtsTooltip} />
                {results.employer.employerInss > 0 && <ResultRow label="INSS Patronal (20%)" value={formatCurrency(results.employer.employerInss)} tooltipText={employerINSSTooltip} />}
                {results.employer.thirdPartyContributions > 0 && <ResultRow label="Terceiros (RAT+S)" value={formatCurrency(results.employer.thirdPartyContributions)} tooltipText={employerTaxesTooltip} />}
                {results.employer.transportationVoucherCost > 0 && <ResultRow label="Vale-Transporte" value={formatCurrency(results.employer.transportationVoucherCost)} tooltipText="Custo total do benefício pago pela empresa, já subtraído o desconto de 6% do colaborador." />}
                {results.employer.mealVoucherCost > 0 && <ResultRow label="Vale-Refeição/Alimentação" value={formatCurrency(results.employer.mealVoucherCost)} tooltipText="Benefício opcional. Custo = Valor Diário x Dias Trabalhados." />}
                {results.employer.healthPlanCost > 0 && <ResultRow label="Plano de Saúde" value={formatCurrency(results.employer.healthPlanCost)} tooltipText="Custo mensal do benefício pago pela empresa." />}
                {results.employer.lifeInsuranceCost > 0 && <ResultRow label="Seguro de Vida" value={formatCurrency(results.employer.lifeInsuranceCost)} tooltipText="Custo mensal do benefício pago pela empresa." />}

                {results.employer.totalProvisions > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h5 className="text-md font-semibold text-gray-300 mb-2">Provisões Mensais</h5>
                    {results.employer.thirteenthSalaryProvision > 0 && <ResultRow label="13º Salário (1/12)" value={formatCurrency(results.employer.thirteenthSalaryProvision)} tooltipText="Provisionamento mensal de 1/12 do salário para pagamento do 13º no final do ano." />}
                    {results.employer.vacationProvision > 0 && <ResultRow label="Férias (1/12)" value={formatCurrency(results.employer.vacationProvision)} tooltipText="Provisionamento mensal de 1/12 do salário para o pagamento das férias anuais do colaborador." />}
                    {results.employer.vacationBonusProvision > 0 && <ResultRow label="1/3 Sobre Férias" value={formatCurrency(results.employer.vacationBonusProvision)} tooltipText="Provisionamento mensal do terço constitucional de férias (1/3 do valor provisionado para férias)." />}
                    {results.employer.fgtsOnProvisions > 0 && <ResultRow label="FGTS sobre Provisões" value={formatCurrency(results.employer.fgtsOnProvisions)} tooltipText={`Incidência de ${fgtsRateLabel} de FGTS sobre os valores provisionados para 13º Salário e Férias.`} />}
                    {results.employer.thirteenthProvisionTaxes > 0 && <ResultRow label="Encargos s/ 13º (Prov.)" value={formatCurrency(results.employer.thirteenthProvisionTaxes)} tooltipText="Provisionamento dos encargos patronais (INSS, RAT, Terceiros) que incidem sobre o 13º salário. Apenas para Lucro Presumido/Real." />}
                    {results.employer.fgtsFineProvision > 0 && <ResultRow label="Multa Rescisória (Prov.)" value={formatCurrency(results.employer.fgtsFineProvision)} tooltipText="Provisionamento de 40% sobre o total de FGTS depositado no mês, para cobrir a multa em caso de demissão sem justa causa." />}
                  </div>
                )}
            </div>
        </div>
      </div>

      {/* Comparativo CLT × PJ */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h3 className="text-xl font-bold text-cyan-400">Comparativo CLT × PJ</h3>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400 whitespace-nowrap">Regime PJ:</label>
            <select
              value={pjTaxRate}
              onChange={(e) => setPjTaxRate(parseFloat(e.target.value))}
              className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1.5 text-white text-sm focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option value={0.06}>Simples Nacional ~6%</option>
              <option value={0.1155}>Simples Nacional ~11,55%</option>
              <option value={0.155}>Simples Nacional ~15,5%</option>
            </select>
          </div>
        </div>

        {/* Custos operacionais do PJ */}
        <div className="bg-gray-700/40 rounded-lg p-4 mb-5">
          <p className="text-sm font-semibold text-gray-300 mb-3">Incluir custos operacionais do PJ</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includePjCounter}
                onChange={(e) => setIncludePjCounter(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-500"
              />
              <span className="text-sm text-gray-300">Contador mensal</span>
              {includePjCounter && (
                <input
                  type="number"
                  value={pjCounterCost}
                  onChange={(e) => setPjCounterCost(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-20 bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm text-right"
                  min="0"
                />
              )}
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includePjProLaboreInss}
                onChange={(e) => setIncludePjProLaboreInss(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-500"
              />
              <span className="text-sm text-gray-300">INSS pró-labore <span className="text-gray-500">(est. R$ 167)</span></span>
            </label>
          </div>
        </div>

        {/* Colunas CLT vs PJ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* CLT */}
          <div className="bg-indigo-900/30 border border-indigo-700/50 rounded-lg p-4">
            <h4 className="font-bold text-indigo-300 mb-3 text-center text-sm uppercase tracking-wide">CLT</h4>
            <div className="space-y-1">
              <ResultRow label="Custo mensal empresa" value={formatCurrency(results.employer.totalCost)} />
              <ResultRow label="Custo anual empresa" value={formatCurrency(comparison.annualCltCost)} />
              <ResultRow label="Encargo sobre salário" value={`+${comparison.overheadPercent}%`} />
              <ResultRow label="Líquido colaborador" value={formatCurrency(results.employee.netSalary)} />
            </div>
          </div>

          {/* PJ */}
          <div className="bg-cyan-900/30 border border-cyan-700/50 rounded-lg p-4">
            <h4 className="font-bold text-cyan-300 mb-3 text-center text-sm uppercase tracking-wide">PJ — custo estimado real</h4>
            <div className="space-y-1">
              <ResultRow label="Nota fiscal mensal" value={formatCurrency(comparison.pjGrossToMatchNet)} />
              {includePjCounter && <ResultRow label="(+) Contador est." value={formatCurrency(pjCounterCost)} />}
              {includePjProLaboreInss && <ResultRow label="(+) INSS pró-labore est." value={formatCurrency(PJ_PROLABORE_INSS_EST)} />}
              <ResultRow label="Custo total estimado" value={formatCurrency(adjustedPjMonthlyCost)} isTotal />
              <ResultRow label="Custo anual estimado" value={formatCurrency(adjustedPjAnnualCost)} />
              <ResultRow label="Líquido colaborador" value={formatCurrency(results.employee.netSalary)} />
            </div>
          </div>
        </div>

        {/* Diferença */}
        <div className={`rounded-lg p-4 mb-4 text-center ${realSavingsVsClt > 0 ? 'bg-amber-900/30 border border-amber-700/50' : 'bg-green-900/30 border border-green-700/50'}`}>
          {realSavingsVsClt > 0 ? (
            <p className="font-bold text-amber-300 text-base">
              PJ pode reduzir custos em até{' '}
              <span className="text-white">{formatCurrency(realSavingsVsClt)}/mês</span> —{' '}
              <span className="text-white">{formatCurrency(realAnnualSavingsVsClt)}/ano</span> neste cenário
            </p>
          ) : (
            <p className="font-bold text-green-300 text-base">
              CLT é mais econômico neste cenário:{' '}
              <span className="text-white">{formatCurrency(-realSavingsVsClt)}/mês</span> a menos que PJ
            </p>
          )}
        </div>

        {/* Risco jurídico */}
        <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-lg p-4 mb-4">
          <p className="text-yellow-300 font-semibold text-sm mb-1">⚠ Atenção: risco jurídico</p>
          <p className="text-gray-300 text-sm">
            Esta economia é válida somente se o profissional é genuinamente autônomo. Exclusividade, horários fixos e subordinação direta podem caracterizar vínculo empregatício — gerando multas e passivos trabalhistas que superam anos de economia.
          </p>
        </div>

        {/* Orientação de decisão */}
        <div className="bg-gray-700/40 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-300 mb-3">Orientação de decisão</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-300">
              <span className="text-indigo-300 font-semibold">Prefira CLT</span> quando há exclusividade, horários fixos, supervisão direta ou o papel é de longo prazo na operação.
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-cyan-300 font-semibold">Prefira PJ</span> quando o profissional é autônomo, atende múltiplos clientes e trabalha por projeto ou demanda específica.
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Simulação para fins educacionais. Valores baseados nas tabelas de 2024. Consulte um contador ou advogado trabalhista antes de estruturar contratos PJ.
          </p>
        </div>
      </div>
    </div>
  );
};
