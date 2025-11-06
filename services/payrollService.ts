import type { PayrollInputs, PayrollResults } from '../types';
import {
  INSS_BRACKETS,
  INSS_CEILING,
  IRRF_BRACKETS,
  DEDUCTION_PER_DEPENDENT,
  FGTS_RATE_CLT,
  FGTS_RATE_APPRENTICE,
  TRANSPORTATION_VOUCHER_DISCOUNT_RATE,
  EMPLOYER_INSS_RATE,
  RAT_RATE,
  THIRD_PARTY_RATE,
} from '../constants';

function calculateINSS(grossSalary: number): number {
  let inss = 0;
  let salaryForInss = Math.min(grossSalary, INSS_CEILING);
  let lastLimit = 0;

  for (const bracket of INSS_BRACKETS) {
    const taxableAmount = Math.min(salaryForInss, bracket.limit) - lastLimit;
    if (taxableAmount > 0) {
      inss += taxableAmount * bracket.rate;
    }
    lastLimit = bracket.limit;
    if (salaryForInss <= bracket.limit) break;
  }
  
  return parseFloat(inss.toFixed(2));
}

function calculateIRRF(grossSalary: number, inss: number, dependents: number): number {
  const dependentDeduction = dependents * DEDUCTION_PER_DEPENDENT;
  const baseSalary = grossSalary - inss - dependentDeduction;

  if (baseSalary <= IRRF_BRACKETS[0].limit) return 0;
  
  let irrf = 0;
  for (const bracket of IRRF_BRACKETS) {
    if (baseSalary <= bracket.limit) {
      irrf = baseSalary * bracket.rate - (bracket.deduction || 0);
      break;
    }
  }

  return parseFloat(Math.max(0, irrf).toFixed(2));
}

export function calculatePayroll(inputs: PayrollInputs): PayrollResults {
  const {
    grossSalary,
    dependents,
    transportationVoucherValue,
    mealVoucherValue,
    workingDays,
    hasTransportationVoucher,
    hasMealVoucher,
    includeThirteenth,
    includeVacation,
    includeFgtsFine,
    includeEmployerTaxes,
    contractType,
  } = inputs;

  const fgtsRate = contractType === 'apprentice' ? FGTS_RATE_APPRENTICE : FGTS_RATE_CLT;

  // Employee Calculations
  const inss = calculateINSS(grossSalary);
  const irrf = calculateIRRF(grossSalary, inss, dependents);
  const totalTransportationCost = hasTransportationVoucher ? transportationVoucherValue * workingDays : 0;
  const maxTransportationDiscount = grossSalary * TRANSPORTATION_VOUCHER_DISCOUNT_RATE;
  const transportationVoucherDiscount = hasTransportationVoucher ? Math.min(totalTransportationCost, maxTransportationDiscount) : 0;
  const totalDeductions = inss + irrf + transportationVoucherDiscount;
  const netSalary = grossSalary - totalDeductions;

  // Employer Calculations
  // Direct monthly costs
  const fgts = grossSalary * fgtsRate;
  const transportationVoucherCost = totalTransportationCost > 0 ? totalTransportationCost - transportationVoucherDiscount : 0;
  const mealVoucherCost = hasMealVoucher ? mealVoucherValue * workingDays : 0;
  const employerInss = includeEmployerTaxes ? grossSalary * EMPLOYER_INSS_RATE : 0;
  const thirdPartyContributions = includeEmployerTaxes ? grossSalary * (RAT_RATE + THIRD_PARTY_RATE) : 0;

  // Monthly Provisions
  const thirteenthSalaryProvision = includeThirteenth ? grossSalary / 12 : 0;
  const vacationProvision = includeVacation ? grossSalary / 12 : 0;
  const vacationBonusProvision = includeVacation ? vacationProvision / 3 : 0;
  
  const annualProvisionsBase = thirteenthSalaryProvision + vacationProvision + vacationBonusProvision;
  const fgtsOnProvisions = annualProvisionsBase * fgtsRate;
  
  // Employer taxes on 13th salary also need to be provisioned
  const thirteenthProvisionTaxes = includeEmployerTaxes && includeThirteenth 
    ? thirteenthSalaryProvision * (EMPLOYER_INSS_RATE + RAT_RATE + THIRD_PARTY_RATE) 
    : 0;

  const totalMonthlyFgtsDeposit = fgts + fgtsOnProvisions;
  const fgtsFineProvision = includeFgtsFine ? totalMonthlyFgtsDeposit * 0.40 : 0;

  const totalProvisions = annualProvisionsBase + fgtsOnProvisions + fgtsFineProvision + thirteenthProvisionTaxes;
  const totalMonthlyDirectCosts = grossSalary + fgts + transportationVoucherCost + mealVoucherCost + employerInss + thirdPartyContributions;
  const totalCost = totalMonthlyDirectCosts + totalProvisions;

  return {
    inputs,
    employee: {
      grossSalary, inss, irrf, transportationVoucherDiscount, totalDeductions, netSalary,
    },
    employer: {
      grossSalary,
      fgts: parseFloat(fgts.toFixed(2)),
      transportationVoucherCost: parseFloat(transportationVoucherCost.toFixed(2)),
      mealVoucherCost: parseFloat(mealVoucherCost.toFixed(2)),
      employerInss: parseFloat(employerInss.toFixed(2)),
      thirdPartyContributions: parseFloat(thirdPartyContributions.toFixed(2)),
      thirteenthSalaryProvision: parseFloat(thirteenthSalaryProvision.toFixed(2)),
      vacationProvision: parseFloat(vacationProvision.toFixed(2)),
      vacationBonusProvision: parseFloat(vacationBonusProvision.toFixed(2)),
      fgtsOnProvisions: parseFloat(fgtsOnProvisions.toFixed(2)),
      thirteenthProvisionTaxes: parseFloat(thirteenthProvisionTaxes.toFixed(2)),
      fgtsFineProvision: parseFloat(fgtsFineProvision.toFixed(2)),
      totalProvisions: parseFloat(totalProvisions.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
    },
  };
}