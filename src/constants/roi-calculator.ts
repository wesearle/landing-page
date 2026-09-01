export interface RoiAgent {
  id: string;
  name: string;
  cpuLessPct: number;
}

export interface InfrastructureInputs {
  nodes: number;
  cpusPerNode: number;
  pctInstrumented: number;
  cpuCost: number;
}

export interface MttrInputs {
  majorIncidents: number;
  hoursPerIncident: number;
  engineersPerIncident: number;
  costPerEngineerHour: number;
}

export interface OperationalInputs {
  instrumentationHoursWeek: number;
  collectorHoursWeek: number;
  samplingHoursWeek: number;
  costPerEngineerHour: number;
}

export interface LicenseInputs {
  monitoredHosts: number;
  licensePerHostMonth: number;
  billedClusters: number;
  licensePerClusterMonth: number;
}

export interface CategorySavings {
  monthly: number;
  annual: number;
  detail?: string;
}

export interface InfrastructureResult extends CategorySavings {
  coresSaved: number;
  cpuWithOdigos: number;
  fraction: number;
}

export const ROI_AGENTS: RoiAgent[] = [
  { id: 'datadog', name: 'DataDog', cpuLessPct: 22.0 },
  { id: 'dynatrace', name: 'Dynatrace', cpuLessPct: 20.7 },
  { id: 'newrelic', name: 'New Relic', cpuLessPct: 36.9 },
  { id: 'otel', name: 'Otel Agent', cpuLessPct: 51.4 },
];

/** Share of incident investigation time lost to missing or incomplete telemetry. */
export const MTTR_TELEMETRY_GAP_PCT = 35;

/** Share of manual OpenTelemetry ops Odigos can automate away. */
export const OTEL_MAINTENANCE_REDUCTION_PCT = 75;

export const ROI_DEFAULTS = {
  agentId: 'datadog',
  infrastructure: {
    nodes: 20,
    cpusPerNode: 8,
    pctInstrumented: 100,
    cpuCost: 30,
  },
  mttr: {
    majorIncidents: 12,
    hoursPerIncident: 4,
    engineersPerIncident: 3,
    costPerEngineerHour: 95,
  },
  operational: {
    instrumentationHoursWeek: 6,
    collectorHoursWeek: 4,
    samplingHoursWeek: 3,
    costPerEngineerHour: 95,
  },
  license: {
    monitoredHosts: 20,
    licensePerHostMonth: 31,
    billedClusters: 2,
    licensePerClusterMonth: 0,
  },
} as const;

export function getInstrumentedCpus(inputs: InfrastructureInputs) {
  const clusterCpu = inputs.nodes * inputs.cpusPerNode;
  return {
    clusterCpu,
    totalCpu: clusterCpu * (inputs.pctInstrumented / 100),
  };
}

export function calculateInfrastructureSavings(
  agent: RoiAgent,
  totalCpu: number,
  cpuCost: number,
): InfrastructureResult {
  const fraction = agent.cpuLessPct / 100;
  const coresSaved = totalCpu * fraction;
  const cpuWithOdigos = totalCpu - coresSaved;
  const monthly = coresSaved * cpuCost;

  return {
    coresSaved,
    cpuWithOdigos,
    monthly,
    annual: monthly * 12,
    fraction,
    detail: `Odigos uses ${agent.cpuLessPct}% less CPU than ${agent.name}`,
  };
}

export function calculateMttrSavings(inputs: MttrInputs): CategorySavings {
  const annualInvestigationCost =
    inputs.majorIncidents * inputs.hoursPerIncident * inputs.engineersPerIncident * inputs.costPerEngineerHour;
  const annual = annualInvestigationCost * (MTTR_TELEMETRY_GAP_PCT / 100);

  return {
    monthly: annual / 12,
    annual,
    detail: `${MTTR_TELEMETRY_GAP_PCT}% of investigation time recovered with full coverage`,
  };
}

export function calculateOperationalSavings(inputs: OperationalInputs): CategorySavings {
  const weeklyHours =
    inputs.instrumentationHoursWeek + inputs.collectorHoursWeek + inputs.samplingHoursWeek;
  const annualManualCost = weeklyHours * 52 * inputs.costPerEngineerHour;
  const annual = annualManualCost * (OTEL_MAINTENANCE_REDUCTION_PCT / 100);

  return {
    monthly: annual / 12,
    annual,
    detail: `${OTEL_MAINTENANCE_REDUCTION_PCT}% less manual OTel pipeline work`,
  };
}

export function calculateLicenseSavings(inputs: LicenseInputs): CategorySavings {
  const monthly =
    inputs.monitoredHosts * inputs.licensePerHostMonth +
    inputs.billedClusters * inputs.licensePerClusterMonth;

  return {
    monthly,
    annual: monthly * 12,
    detail: 'Vendor agent licenses replaced by Odigos',
  };
}

export function formatCurrency(value: number) {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  });
}

export function formatCores(value: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

export function formatHours(value: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  });
}
