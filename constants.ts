import type { TaxBracket } from './types';

// INSS brackets for 2024
export const INSS_BRACKETS: TaxBracket[] = [
  { limit: 1412.00, rate: 0.075 },
  { limit: 2666.68, rate: 0.09 },
  { limit: 4000.03, rate: 0.12 },
  { limit: 7786.02, rate: 0.14 },
];
export const INSS_CEILING = 7786.02;

// IRRF brackets for 2024
export const IRRF_BRACKETS: TaxBracket[] = [
  { limit: 2259.20, rate: 0, deduction: 0 },
  { limit: 2826.65, rate: 0.075, deduction: 169.44 },
  { limit: 3751.05, rate: 0.15, deduction: 381.44 },
  { limit: 4664.68, rate: 0.225, deduction: 662.77 },
  { limit: Infinity, rate: 0.275, deduction: 896.00 },
];

export const DEDUCTION_PER_DEPENDENT = 189.59;

// FGTS Rates
export const FGTS_RATE_CLT = 0.08;
export const FGTS_RATE_APPRENTICE = 0.02;

export const TRANSPORTATION_VOUCHER_DISCOUNT_RATE = 0.06;

// Employer-side taxes (for Lucro Presumido/Real)
export const EMPLOYER_INSS_RATE = 0.20; // 20%
export const RAT_RATE = 0.03; // Risk of Accident at Work (can be 1%, 2%, or 3% - using 3% as a common value)
export const THIRD_PARTY_RATE = 0.058; // Sistema S, Salário Educação etc.