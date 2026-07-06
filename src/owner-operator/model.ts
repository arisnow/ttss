import type { BlockCostModel, ModelOutput, ModelState, ModelVersion, StatementRow } from "./types";

export const DEFAULT_MODEL_VERSION_ID = "base-case";

export const DEFAULT_BLOCK_COST_MODEL: BlockCostModel = {
  ownerModelVersion: 8,
  blockPrice: 1800,
  blockDays: 2,
  blocksPerWeek: 2.5,
  maintenancePerBlock: 200,
  insuranceMonthly: 1400,
  registrationMonthly: 250,
  parkingMonthly: 500,
  adminMonthly: 850,
  daysPerWeek: 5,
  weeksPerYear: 50,
  workHoursPerWeek: 50,
  truckPrice: 200000,
  financingTermMonths: 60,
  financingApr: 10,
  authorityLeaseAnnual: 0,
  taxReservePercent: 0,
  downPayment: 35000,
  startupRepairs: 7500,
  startupSetup: 5000,
  workingCapital: 10000,
  carrierFeePercent: 15,
  carrierInsuranceMonthly: 2000,
  physicalDamageMonthly: 0,
  bobtailMonthly: 0,
  leaseAdminMonthly: 350
};

export function normalizeBlockCostModel(value?: Partial<BlockCostModel> | null): BlockCostModel {
  const incoming = value && typeof value === "object" ? value : {};
  if (incoming.ownerModelVersion !== DEFAULT_BLOCK_COST_MODEL.ownerModelVersion) {
    return { ...DEFAULT_BLOCK_COST_MODEL };
  }
  return {
    ...DEFAULT_BLOCK_COST_MODEL,
    ...Object.fromEntries(
      Object.entries(incoming).filter(([, entry]) => typeof entry === "number" && Number.isFinite(entry))
    )
  };
}

export function normalizeModelState(value?: Partial<ModelState> | null): ModelState {
  const now = new Date().toISOString();
  const fallbackModel = normalizeBlockCostModel(value?.blockCostModel);
  const versions = Array.isArray(value?.modelVersions)
    ? value.modelVersions.slice(0, 20).map((version, index) => normalizeVersion(version, index, fallbackModel, now))
    : [];
  const deduped = dedupeVersions(versions);
  const modelVersions = deduped.length > 0
    ? deduped
    : [{
      id: DEFAULT_MODEL_VERSION_ID,
      name: "Base case",
      createdAt: now,
      updatedAt: now,
      blockCostModel: fallbackModel
    }];
  const activeModelId = modelVersions.some((version) => version.id === value?.activeModelId)
    ? String(value?.activeModelId)
    : modelVersions[0].id;
  const activeModel = modelVersions.find((version) => version.id === activeModelId) ?? modelVersions[0];

  return {
    activeModelId,
    modelVersions,
    blockCostModel: normalizeBlockCostModel(activeModel.blockCostModel),
    updatedAt: typeof value?.updatedAt === "string" ? value.updatedAt : ""
  };
}

export function saveVersion(state: ModelState, nameValue: string, model: BlockCostModel): ModelState {
  const now = new Date().toISOString();
  const name = normalizeVersionName(nameValue) || state.modelVersions.find((version) => version.id === state.activeModelId)?.name || "Untitled model";
  const key = versionNameKey(name);
  const existing = state.modelVersions.find((version) => versionNameKey(version.name) === key);
  const blockCostModel = normalizeBlockCostModel(model);
  const modelVersions = existing
    ? state.modelVersions.map((version) => version.id === existing.id
      ? { ...version, name, blockCostModel, updatedAt: now }
      : version)
    : [
      ...state.modelVersions,
      {
        id: uniqueModelId(name, state.modelVersions),
        name,
        createdAt: now,
        updatedAt: now,
        blockCostModel
      }
    ];
  const active = existing?.id ?? modelVersions[modelVersions.length - 1].id;
  return normalizeModelState({
    ...state,
    activeModelId: active,
    modelVersions,
    blockCostModel,
    updatedAt: now
  });
}

export function calculateOwnerOperatorModel(model: BlockCostModel): ModelOutput {
  const blockPrice = positive(model.blockPrice);
  const blockDays = Math.max(0.1, positive(model.blockDays));
  const maintenance = positive(model.maintenancePerBlock);
  const blocksPerWeek = positive(model.blocksPerWeek);
  const operatingDaysPerWeek = blocksPerWeek * blockDays;
  const weeksPerYear = positive(model.weeksPerYear);
  const workHoursPerWeek = positive(model.workHoursPerWeek);
  const truckPrice = positive(model.truckPrice);
  const financingTermMonths = positive(model.financingTermMonths);
  const financingApr = positive(model.financingApr);
  const authorityLeaseAnnual = positive(model.authorityLeaseAnnual);
  const taxReservePercent = positive(model.taxReservePercent);
  const downPayment = positive(model.downPayment);
  const startupRepairs = positive(model.startupRepairs);
  const startupSetup = positive(model.startupSetup);
  const workingCapital = positive(model.workingCapital);
  const carrierFeePercent = positive(model.carrierFeePercent);
  const carrierInsuranceMonthly = positive(model.carrierInsuranceMonthly);
  const physicalDamageMonthly = positive(model.physicalDamageMonthly);
  const bobtailMonthly = positive(model.bobtailMonthly);
  const leaseAdminMonthly = positive(model.leaseAdminMonthly);
  const parkingMonthly = positive(model.parkingMonthly);
  const insuranceMonthly = positive(model.insuranceMonthly);
  const registrationMonthly = positive(model.registrationMonthly);
  const adminMonthly = positive(model.adminMonthly);

  const grossPerDay = blockPrice / blockDays;
  const grossPerWeek = blockPrice * blocksPerWeek;
  const annualGross = grossPerWeek * weeksPerYear;
  const operatingDaysPerYear = operatingDaysPerWeek * weeksPerYear;
  const annualMaintenance = maintenance * blocksPerWeek * weeksPerYear;
  const annualParking = parkingMonthly * 12;
  const annualInsurance = insuranceMonthly * 12;
  const annualRegistration = registrationMonthly * 12;
  const annualAdmin = adminMonthly * 12;
  const amountFinanced = Math.max(0, truckPrice - downPayment);
  const truckPaymentMonthly = monthlyLoanPayment(amountFinanced, financingApr, financingTermMonths);
  const annualTruckPayment = truckPaymentMonthly * 12;
  const annualNetBeforeTax = annualGross
    - annualMaintenance
    - annualInsurance
    - annualRegistration
    - annualParking
    - annualAdmin
    - annualTruckPayment
    - authorityLeaseAnnual;
  const annualTaxReserve = Math.max(0, annualNetBeforeTax) * (taxReservePercent / 100);
  const annualNet = annualNetBeforeTax - annualTaxReserve;

  const carrierFeeAnnual = annualGross * (carrierFeePercent / 100);
  const leaseInsuranceAnnual = (carrierInsuranceMonthly + physicalDamageMonthly + bobtailMonthly) * 12;
  const leaseAdminAnnual = leaseAdminMonthly * 12;
  const leaseNetBeforeTax = annualGross
    - annualMaintenance
    - annualParking
    - annualTruckPayment
    - carrierFeeAnnual
    - leaseInsuranceAnnual
    - leaseAdminAnnual;
  const leaseTaxReserve = Math.max(0, leaseNetBeforeTax) * (taxReservePercent / 100);
  const leaseAnnualNet = leaseNetBeforeTax - leaseTaxReserve;
  const leaseMonthlyNet = leaseAnnualNet / 12;
  const leaseNetPerHour = workHoursPerWeek ? leaseAnnualNet / Math.max(1, weeksPerYear) / workHoursPerWeek : 0;
  const startupCash = downPayment + startupRepairs + startupSetup + workingCapital;
  const leasePaybackMonths = leaseMonthlyNet > 0 && startupCash > 0 ? startupCash / leaseMonthlyNet : null;
  const settlementBeforeOwnerCosts = annualGross - carrierFeeAnnual - leaseInsuranceAnnual - leaseAdminAnnual;

  const privateStatementRows: StatementRow[] = [
    row("Revenue", grossPerDay, grossPerWeek, annualGross / 12, annualGross),
    { label: "Costs", values: zeroPeriod(), type: "section" },
    row("Maintenance reserve", -(maintenance / blockDays), -(maintenance * blocksPerWeek), -annualMaintenance / 12, -annualMaintenance),
    row("Insurance", -(annualInsurance / Math.max(1, operatingDaysPerYear)), -(annualInsurance / Math.max(1, weeksPerYear)), -insuranceMonthly, -annualInsurance),
    row("Registration & permits", -(annualRegistration / Math.max(1, operatingDaysPerYear)), -(annualRegistration / Math.max(1, weeksPerYear)), -registrationMonthly, -annualRegistration),
    row("Truck parking", -(annualParking / Math.max(1, operatingDaysPerYear)), -(annualParking / Math.max(1, weeksPerYear)), -parkingMonthly, -annualParking),
    row("Admin & compliance", -(annualAdmin / Math.max(1, operatingDaysPerYear)), -(annualAdmin / Math.max(1, weeksPerYear)), -adminMonthly, -annualAdmin),
    row("Truck payment", -(annualTruckPayment / Math.max(1, operatingDaysPerYear)), -(annualTruckPayment / Math.max(1, weeksPerYear)), -truckPaymentMonthly, -annualTruckPayment),
    row("Authority / lease cost", -(authorityLeaseAnnual / Math.max(1, operatingDaysPerYear)), -(authorityLeaseAnnual / Math.max(1, weeksPerYear)), -authorityLeaseAnnual / 12, -authorityLeaseAnnual),
    row("Net before tax reserve", annualNetBeforeTax / Math.max(1, operatingDaysPerYear), annualNetBeforeTax / Math.max(1, weeksPerYear), annualNetBeforeTax / 12, annualNetBeforeTax, "subtotal"),
    row(`Tax reserve (${formatNumber(taxReservePercent, "%")})`, -(annualTaxReserve / Math.max(1, operatingDaysPerYear)), -(annualTaxReserve / Math.max(1, weeksPerYear)), -annualTaxReserve / 12, -annualTaxReserve),
    row("Projected net income", annualNet / Math.max(1, operatingDaysPerYear), annualNet / Math.max(1, weeksPerYear), annualNet / 12, annualNet, "total")
  ];

  return {
    blockPrice,
    blockDays,
    blocksPerWeek,
    weeksPerYear,
    workHoursPerWeek,
    grossPerDay,
    grossPerWeek,
    annualGross,
    carrierFeeAnnual,
    leaseInsuranceAnnual,
    leaseAdminAnnual,
    settlementBeforeOwnerCosts,
    annualMaintenance,
    annualParking,
    truckPaymentMonthly,
    annualTruckPayment,
    amountFinanced,
    leaseNetBeforeTax,
    leaseTaxReserve,
    leaseAnnualNet,
    leaseMonthlyNet,
    leaseNetPerHour,
    startupCash,
    leasePaybackMonths,
    decisionCards: [
      { label: "Modeled Relay revenue", value: formatUsd(annualGross), note: `${formatUsd(grossPerWeek)}/week target workload` },
      { label: "Carrier fee", value: formatUsd(carrierFeeAnnual), note: `${formatNumber(carrierFeePercent, "%")} of modeled revenue` },
      { label: "Settlement deductions", value: formatUsd(leaseInsuranceAnnual + leaseAdminAnnual), note: "Insurance and admin/compliance/plates" },
      { label: "Projected owner income", value: formatUsd(leaseAnnualNet), note: `${formatUsd(leaseMonthlyNet)}/mo - ${formatUsd(leaseNetPerHour)}/hr` }
    ],
    settlementRows: [
      { label: "Modeled Relay revenue", annual: annualGross },
      { label: `Carrier fee (${formatNumber(carrierFeePercent, "%")} of modeled revenue)`, annual: -carrierFeeAnnual },
      { label: "Insurance deductions", annual: -leaseInsuranceAnnual },
      { label: "Admin/compliance/plates deductions", annual: -leaseAdminAnnual },
      { label: "Net settlement before owner-paid costs", annual: settlementBeforeOwnerCosts, type: "subtotal" },
      { label: "Owner-paid truck payment", annual: -annualTruckPayment },
      { label: "Owner-paid maintenance reserve", annual: -annualMaintenance },
      { label: "Owner-paid parking", annual: -annualParking },
      { label: "Net owner income", annual: leaseAnnualNet, type: "total" }
    ],
    privateStatementRows
  };
}

export function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return "-";
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Math.abs(value) >= 1000 ? 0 : 2
  });
}

export function formatStatementMoney(value: number): string {
  if (!Number.isFinite(value)) return "-";
  if (Math.abs(value) < 0.005) return formatUsd(0);
  return value < 0 ? `(${formatUsd(Math.abs(value))})` : formatUsd(value);
}

export function formatNumber(value: number, suffix = ""): string {
  if (!Number.isFinite(value)) return "-";
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}${suffix}`;
}

export function normalizeVersionName(value: string): string {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 80);
}

export function versionNameKey(value: string): string {
  return normalizeVersionName(value).toLowerCase();
}

export function sanitizeId(value: unknown): string {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeVersion(version: Partial<ModelVersion>, index: number, fallbackModel: BlockCostModel, now: string): ModelVersion {
  return {
    id: sanitizeId(version?.id) || `model-${index + 1}`,
    name: String(version?.name || `Model ${index + 1}`).slice(0, 80),
    createdAt: typeof version?.createdAt === "string" ? version.createdAt : now,
    updatedAt: typeof version?.updatedAt === "string" ? version.updatedAt : now,
    blockCostModel: normalizeBlockCostModel(version?.blockCostModel || fallbackModel)
  };
}

function dedupeVersions(versions: ModelVersion[]): ModelVersion[] {
  const seen = new Set<string>();
  return versions.filter((version) => {
    if (seen.has(version.id)) return false;
    seen.add(version.id);
    return true;
  });
}

function uniqueModelId(name: string, versions: ModelVersion[]): string {
  const root = sanitizeId(name) || "model";
  const existing = new Set(versions.map((version) => version.id));
  if (!existing.has(root)) return root;
  for (let index = 2; index < 100; index += 1) {
    const candidate = `${root}-${index}`;
    if (!existing.has(candidate)) return candidate;
  }
  return `${root}-${Date.now()}`;
}

function positive(value: number): number {
  return Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
}

function monthlyLoanPayment(principal: number, aprPercent: number, termMonths: number): number {
  if (!Number.isFinite(principal) || principal <= 0) return 0;
  if (!Number.isFinite(termMonths) || termMonths <= 0) return 0;
  const monthlyRate = (Number(aprPercent) || 0) / 100 / 12;
  if (monthlyRate <= 0) return principal / termMonths;
  return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -termMonths));
}

function row(label: string, daily: number, weekly: number, monthly: number, annual: number, type?: "subtotal" | "total"): StatementRow {
  return { label, values: { daily, weekly, monthly, annual }, type };
}

function zeroPeriod() {
  return { daily: 0, weekly: 0, monthly: 0, annual: 0 };
}
