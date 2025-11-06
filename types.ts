export interface PayrollInputs {
  grossSalary: number;
  dependents: number;
  transportationVoucherValue: number;
  mealVoucherValue: number;
  workingDays: number;
  hasTransportationVoucher: boolean;
  hasMealVoucher: boolean;
  includeThirteenth: boolean;
  includeVacation: boolean;
  includeFgtsFine: boolean;
  includeEmployerTaxes: boolean;
  contractType: 'clt' | 'apprentice';
}

export interface PayrollResults {
  inputs: PayrollInputs;
  employee: {
    grossSalary: number;
    inss: number;
    irrf: number;
    transportationVoucherDiscount: number;
    totalDeductions: number;
    netSalary: number;
  };
  employer: {
    grossSalary: number;
    fgts: number;
    transportationVoucherCost: number;
    mealVoucherCost: number;
    employerInss: number;
    thirdPartyContributions: number;
    thirteenthSalaryProvision: number;
    vacationProvision: number;
    vacationBonusProvision: number;
    fgtsOnProvisions: number;
    thirteenthProvisionTaxes: number;
    fgtsFineProvision: number;
    totalProvisions: number;
    totalCost: number;
  };
}

export interface TaxBracket {
    limit: number;
    rate: number;
    deduction?: number; // For IRRF
}