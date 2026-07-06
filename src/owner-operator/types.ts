export type BlockCostModel = {
  ownerModelVersion: number;
  blockPrice: number;
  blockDays: number;
  blocksPerWeek: number;
  maintenancePerBlock: number;
  insuranceMonthly: number;
  registrationMonthly: number;
  parkingMonthly: number;
  adminMonthly: number;
  daysPerWeek: number;
  weeksPerYear: number;
  workHoursPerWeek: number;
  truckPrice: number;
  financingTermMonths: number;
  financingApr: number;
  authorityLeaseAnnual: number;
  taxReservePercent: number;
  downPayment: number;
  startupRepairs: number;
  startupSetup: number;
  workingCapital: number;
  carrierFeePercent: number;
  carrierInsuranceMonthly: number;
  physicalDamageMonthly: number;
  bobtailMonthly: number;
  leaseAdminMonthly: number;
};

export type ModelVersion = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  blockCostModel: BlockCostModel;
};

export type ModelState = {
  activeModelId: string;
  modelVersions: ModelVersion[];
  blockCostModel: BlockCostModel;
  updatedAt?: string;
};

export type PeriodValues = {
  daily: number;
  weekly: number;
  monthly: number;
  annual: number;
};

export type StatementRow = {
  label: string;
  values: PeriodValues;
  type?: "section" | "subtotal" | "total";
};

export type SettlementRow = {
  label: string;
  annual: number;
  type?: "subtotal" | "total";
};

export type DecisionCard = {
  label: string;
  value: string;
  note: string;
};

export type ModelOutput = {
  blockPrice: number;
  blockDays: number;
  blocksPerWeek: number;
  weeksPerYear: number;
  workHoursPerWeek: number;
  grossPerDay: number;
  grossPerWeek: number;
  annualGross: number;
  carrierFeeAnnual: number;
  leaseInsuranceAnnual: number;
  leaseAdminAnnual: number;
  settlementBeforeOwnerCosts: number;
  annualMaintenance: number;
  annualParking: number;
  truckPaymentMonthly: number;
  annualTruckPayment: number;
  amountFinanced: number;
  leaseNetBeforeTax: number;
  leaseTaxReserve: number;
  leaseAnnualNet: number;
  leaseMonthlyNet: number;
  leaseNetPerHour: number;
  startupCash: number;
  leasePaybackMonths: number | null;
  decisionCards: DecisionCard[];
  settlementRows: SettlementRow[];
  privateStatementRows: StatementRow[];
};
