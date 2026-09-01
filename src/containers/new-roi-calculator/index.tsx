'use client';

import { useMemo, useState, type ReactNode } from 'react';
import styled from 'styled-components';
import {
  MTTR_TELEMETRY_GAP_PCT,
  OTEL_MAINTENANCE_REDUCTION_PCT,
  ROI_AGENTS,
  ROI_DEFAULTS,
  calculateInfrastructureSavings,
  calculateLicenseSavings,
  calculateMttrSavings,
  calculateOperationalSavings,
  formatCores,
  formatCurrency,
  formatHours,
  getInstrumentedCpus,
  type CategorySavings,
} from '@/constants/roi-calculator';
import { AgentSelect } from '@/containers/new-roi-calculator/agent-select';

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 88px 0 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding: 60px 0 72px;
  }
`;

const Hero = styled.div`
  margin-bottom: 48px;
`;

const Eyebrow = styled.div`
  margin-bottom: 20px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 550;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--nd-text-strong);
  font-size: clamp(48px, 6vw, 84px);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.06em;
  white-space: nowrap;

  @media (max-width: 800px) {
    white-space: normal;
  }
`;

const Description = styled.p`
  max-width: 740px;
  margin: 32px 0 0;
  color: var(--nd-text-secondary);
  font-size: clamp(18px, 1.65vw, 22px);
  line-height: 1.48;
  letter-spacing: -0.02em;
`;

const GlobalPanel = styled.section`
  min-width: 0;
  padding: 28px;
  margin-bottom: 32px;
  border: 1px solid var(--nd-border);
  border-radius: 16px;
  background: var(--nd-surface);

  @media (max-width: 800px) {
    padding: 22px;
  }
`;

const SummaryBanner = styled.div`
  display: grid;
  gap: 20px;
  padding: 28px;
  margin-bottom: 32px;
  border: 1px solid color-mix(in srgb, var(--nd-accent) 28%, var(--nd-border));
  border-radius: 16px;
  background: color-mix(in srgb, var(--nd-accent) 8%, var(--nd-page));

  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
  }
`;

const SummaryTitle = styled.h2`
  margin: 0 0 8px;
  color: var(--nd-text-strong);
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 500;
  letter-spacing: -0.04em;
`;

const SummarySub = styled.p`
  margin: 0;
  color: var(--nd-text-secondary);
  font-size: 15px;
  line-height: 1.5;
`;

const SummaryValue = styled.div`
  color: var(--nd-accent);
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 600;
  letter-spacing: -0.05em;
`;

const SummaryBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BreakdownRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid color-mix(in srgb, var(--nd-accent) 16%, var(--nd-border));
  color: var(--nd-text-secondary);
  font-size: 14px;

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  strong {
    color: var(--nd-text-strong);
    font-weight: 600;
  }
`;

const CategoryBlock = styled.section`
  margin-bottom: 32px;
`;

const CategoryHeader = styled.div`
  max-width: 760px;
  margin-bottom: 20px;
`;

const CategoryEyebrow = styled.div`
  margin-bottom: 10px;
  color: var(--nd-accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const CategoryTitle = styled.h2`
  margin: 0;
  color: var(--nd-text-strong);
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 500;
  letter-spacing: -0.04em;
`;

const CategoryDescription = styled.p`
  margin: 12px 0 0;
  color: var(--nd-text-secondary);
  font-size: 16px;
  line-height: 1.5;
`;

const Layout = styled.div`
  display: grid;
  gap: 24px;
  min-width: 0;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
  }
`;

const Panel = styled.section`
  min-width: 0;
  padding: 28px;
  border: 1px solid var(--nd-border);
  border-radius: 16px;
  background: var(--nd-surface);

  @media (max-width: 800px) {
    padding: 22px;
  }
`;

const PanelTitle = styled.h3`
  margin: 0 0 24px;
  color: var(--nd-text-strong);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  color: var(--nd-text-secondary);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const Hint = styled.p`
  margin: 0;
  color: var(--nd-text-muted);
  font-size: 13px;
  line-height: 1.45;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid var(--nd-border);
  border-radius: 12px;
  background: var(--nd-page);
  color: var(--nd-text-strong);
  font-size: 15px;
  line-height: 1.2;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &:focus {
    border-color: var(--nd-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--nd-accent) 18%, transparent);
  }
`;

const DerivedBanner = styled.div`
  margin-top: 24px;
  padding: 18px 20px;
  border: 1px solid color-mix(in srgb, var(--nd-accent) 28%, var(--nd-border));
  border-radius: 12px;
  background: color-mix(in srgb, var(--nd-accent) 8%, var(--nd-page));
`;

const DerivedLabel = styled.div`
  color: var(--nd-text-secondary);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const DerivedValue = styled.div`
  margin-top: 6px;
  color: var(--nd-accent);
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 600;
  letter-spacing: -0.04em;
`;

const DerivedSub = styled.div`
  margin-top: 6px;
  color: var(--nd-text-muted);
  font-size: 13px;
`;

const Metric = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid var(--nd-border);

  &:last-child {
    border-bottom: 0;
  }
`;

const MetricLabel = styled.div`
  margin-bottom: 8px;
  color: var(--nd-text-secondary);
  font-size: 13px;
`;

const MetricValue = styled.div<{ $highlight?: boolean }>`
  color: ${({ $highlight }) => ($highlight ? 'var(--nd-accent)' : 'var(--nd-text-strong)')};
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 600;
  letter-spacing: -0.04em;
`;

const MetricSub = styled.div`
  margin-top: 6px;
  color: var(--nd-text-muted);
  font-size: 13px;
`;

const TableScroll = styled.div`
  overflow-x: auto;
  margin-top: 24px;
`;

const Table = styled.table`
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 14px 12px;
  border-bottom: 1px solid var(--nd-border);
  color: var(--nd-text-secondary);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-align: left;
  text-transform: uppercase;
`;

const Td = styled.td`
  padding: 16px 12px;
  border-bottom: 1px solid var(--nd-border);
  color: var(--nd-text);
  font-size: 14px;
`;

const AgentName = styled.td`
  padding: 16px 12px;
  border-bottom: 1px solid var(--nd-border);
  color: var(--nd-text-strong);
  font-size: 15px;
  font-weight: 600;
`;

const ActiveRow = styled.tr`
  background: color-mix(in srgb, var(--nd-accent) 6%, var(--nd-page));

  ${AgentName}, ${Td} {
    color: var(--nd-accent);
  }

  ${AgentName} {
    box-shadow: inset 3px 0 0 var(--nd-accent);
  }
`;

const Footnote = styled.p`
  max-width: 760px;
  margin: 8px 0 0;
  color: var(--nd-text-muted);
  font-size: 13px;
  line-height: 1.55;
`;

interface NumberFieldProps {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
}

const NumberField = ({ id, label, hint, value, onChange, min, max, step }: NumberFieldProps) => (
  <Field>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type='number'
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
    {hint ? <Hint>{hint}</Hint> : null}
  </Field>
);

interface SavingsPanelProps {
  title: string;
  savings: CategorySavings;
  children: ReactNode;
}

const SavingsPanel = ({ title, savings, children }: SavingsPanelProps) => (
  <Panel aria-live='polite'>
    <PanelTitle>{title}</PanelTitle>
    {children}
    <Metric>
      <MetricLabel>Monthly savings</MetricLabel>
      <MetricValue>{formatCurrency(savings.monthly)}</MetricValue>
      {savings.detail ? <MetricSub>{savings.detail}</MetricSub> : null}
    </Metric>
    <Metric>
      <MetricLabel>Annual savings</MetricLabel>
      <MetricValue $highlight>{formatCurrency(savings.annual)}</MetricValue>
    </Metric>
  </Panel>
);

const parseNumber = (value: string, fallback = 0) => Math.max(0, Number(value) || fallback);

const parsePercent = (value: string) => Math.min(100, Math.max(0, Number(value) || 0));

export const NewRoiCalculator = () => {
  const [agentId, setAgentId] = useState<string>(ROI_DEFAULTS.agentId);

  const [nodes, setNodes] = useState(String(ROI_DEFAULTS.infrastructure.nodes));
  const [cpusPerNode, setCpusPerNode] = useState(String(ROI_DEFAULTS.infrastructure.cpusPerNode));
  const [pctInstrumented, setPctInstrumented] = useState(String(ROI_DEFAULTS.infrastructure.pctInstrumented));
  const [cpuCost, setCpuCost] = useState(String(ROI_DEFAULTS.infrastructure.cpuCost));

  const [majorIncidents, setMajorIncidents] = useState(String(ROI_DEFAULTS.mttr.majorIncidents));
  const [hoursPerIncident, setHoursPerIncident] = useState(String(ROI_DEFAULTS.mttr.hoursPerIncident));
  const [engineersPerIncident, setEngineersPerIncident] = useState(String(ROI_DEFAULTS.mttr.engineersPerIncident));
  const [mttrCostPerHour, setMttrCostPerHour] = useState(String(ROI_DEFAULTS.mttr.costPerEngineerHour));

  const [instrumentationHoursWeek, setInstrumentationHoursWeek] = useState(
    String(ROI_DEFAULTS.operational.instrumentationHoursWeek),
  );
  const [collectorHoursWeek, setCollectorHoursWeek] = useState(String(ROI_DEFAULTS.operational.collectorHoursWeek));
  const [samplingHoursWeek, setSamplingHoursWeek] = useState(String(ROI_DEFAULTS.operational.samplingHoursWeek));
  const [operationalCostPerHour, setOperationalCostPerHour] = useState(
    String(ROI_DEFAULTS.operational.costPerEngineerHour),
  );

  const [monitoredHosts, setMonitoredHosts] = useState(String(ROI_DEFAULTS.license.monitoredHosts));
  const [licensePerHostMonth, setLicensePerHostMonth] = useState(String(ROI_DEFAULTS.license.licensePerHostMonth));
  const [billedClusters, setBilledClusters] = useState(String(ROI_DEFAULTS.license.billedClusters));
  const [licensePerClusterMonth, setLicensePerClusterMonth] = useState(
    String(ROI_DEFAULTS.license.licensePerClusterMonth),
  );

  const agent = useMemo(
    () => ROI_AGENTS.find((item) => item.id === agentId) ?? ROI_AGENTS[0],
    [agentId],
  );

  const isOtelAgent = agent.id === 'otel';

  const infrastructureInputs = useMemo(
    () => ({
      nodes: parseNumber(nodes),
      cpusPerNode: parseNumber(cpusPerNode),
      pctInstrumented: parsePercent(pctInstrumented),
      cpuCost: parseNumber(cpuCost),
    }),
    [nodes, cpusPerNode, pctInstrumented, cpuCost],
  );

  const mttrInputs = useMemo(
    () => ({
      majorIncidents: parseNumber(majorIncidents),
      hoursPerIncident: parseNumber(hoursPerIncident),
      engineersPerIncident: parseNumber(engineersPerIncident),
      costPerEngineerHour: parseNumber(mttrCostPerHour),
    }),
    [majorIncidents, hoursPerIncident, engineersPerIncident, mttrCostPerHour],
  );

  const operationalInputs = useMemo(
    () => ({
      instrumentationHoursWeek: parseNumber(instrumentationHoursWeek),
      collectorHoursWeek: parseNumber(collectorHoursWeek),
      samplingHoursWeek: parseNumber(samplingHoursWeek),
      costPerEngineerHour: parseNumber(operationalCostPerHour),
    }),
    [instrumentationHoursWeek, collectorHoursWeek, samplingHoursWeek, operationalCostPerHour],
  );

  const licenseInputs = useMemo(
    () => ({
      monitoredHosts: parseNumber(monitoredHosts),
      licensePerHostMonth: parseNumber(licensePerHostMonth),
      billedClusters: parseNumber(billedClusters),
      licensePerClusterMonth: parseNumber(licensePerClusterMonth),
    }),
    [monitoredHosts, licensePerHostMonth, billedClusters, licensePerClusterMonth],
  );

  const { clusterCpu, totalCpu } = useMemo(
    () => getInstrumentedCpus(infrastructureInputs),
    [infrastructureInputs],
  );

  const infrastructureSavings = useMemo(
    () => calculateInfrastructureSavings(agent, totalCpu, infrastructureInputs.cpuCost),
    [agent, totalCpu, infrastructureInputs.cpuCost],
  );

  const mttrSavings = useMemo(() => calculateMttrSavings(mttrInputs), [mttrInputs]);
  const operationalSavings = useMemo(() => calculateOperationalSavings(operationalInputs), [operationalInputs]);
  const licenseSavings = useMemo(() => calculateLicenseSavings(licenseInputs), [licenseInputs]);

  const comparisonRows = useMemo(
    () =>
      ROI_AGENTS.map((item) => ({
        agent: item,
        result: calculateInfrastructureSavings(item, totalCpu, infrastructureInputs.cpuCost),
      })),
    [totalCpu, infrastructureInputs.cpuCost],
  );

  const totalAnnualSavings = useMemo(() => {
    let total = infrastructureSavings.annual + mttrSavings.annual;
    if (isOtelAgent) total += operationalSavings.annual;
    else total += licenseSavings.annual;
    return total;
  }, [infrastructureSavings.annual, mttrSavings.annual, operationalSavings.annual, licenseSavings.annual, isOtelAgent]);

  const totalCpuMath =
    `${infrastructureInputs.nodes.toLocaleString()} × ${infrastructureInputs.cpusPerNode.toLocaleString()} × ${infrastructureInputs.pctInstrumented}%` +
    (infrastructureInputs.pctInstrumented < 100 ? ` (${formatCores(clusterCpu)} cluster CPUs)` : '');

  const extraPerCpu = infrastructureInputs.cpuCost * infrastructureSavings.fraction;
  const weeklyOperationalHours =
    operationalInputs.instrumentationHoursWeek +
    operationalInputs.collectorHoursWeek +
    operationalInputs.samplingHoursWeek;
  const annualInvestigationCost =
    mttrInputs.majorIncidents *
    mttrInputs.hoursPerIncident *
    mttrInputs.engineersPerIncident *
    mttrInputs.costPerEngineerHour;

  const breakdownItems = [
    { label: 'Infrastructure costs', value: infrastructureSavings.annual },
    { label: 'Incident resolution', value: mttrSavings.annual },
    ...(isOtelAgent
      ? [{ label: 'OTel pipeline maintenance', value: operationalSavings.annual }]
      : [{ label: 'Agent license fees', value: licenseSavings.annual }]),
  ];

  return (
    <Section>
      <Hero>
        <Eyebrow>ROI Calculator</Eyebrow>
        <Title>Estimate your savings with Odigos</Title>
        <Description>
          Model savings across infrastructure, incident response, vendor license fees or OpenTelemetry pipeline
          maintenance depending on what you run today.
        </Description>
      </Hero>

      <GlobalPanel>
        <AgentSelect
          id='roi-agent'
          label='Current observability agent'
          agents={ROI_AGENTS}
          value={agentId}
          onChange={setAgentId}
        />
      </GlobalPanel>

      <SummaryBanner aria-live='polite'>
        <div>
          <SummaryTitle>Total estimated annual ROI</SummaryTitle>
          <SummarySub>Combined savings across all categories that apply to {agent.name}.</SummarySub>
          <SummaryValue>{formatCurrency(totalAnnualSavings)}</SummaryValue>
        </div>
        <SummaryBreakdown>
          {breakdownItems.map((item) => (
            <BreakdownRow key={item.label}>
              <span>{item.label}</span>
              <strong>{formatCurrency(item.value)}</strong>
            </BreakdownRow>
          ))}
        </SummaryBreakdown>
      </SummaryBanner>

      <CategoryBlock>
        <CategoryHeader>
          <CategoryEyebrow>Section 1</CategoryEyebrow>
          <CategoryTitle>Infrastructure costs</CategoryTitle>
          <CategoryDescription>
            CPU overhead from your current agent vs Odigos on the nodes and cores you instrument today.
          </CategoryDescription>
        </CategoryHeader>

        <Layout>
          <Panel>
            <PanelTitle>Environment sizing</PanelTitle>
            <NumberField id='roi-nodes' label='Number of nodes' value={nodes} onChange={setNodes} min={1} step={1} />
            <NumberField
              id='roi-cpus-per-node'
              label='CPUs per node'
              hint='vCPUs / cores on each node (instance size).'
              value={cpusPerNode}
              onChange={setCpusPerNode}
              min={1}
              step={1}
            />
            <NumberField
              id='roi-pct-instrumented'
              label='Percent instrumented'
              hint='Share of cluster CPU running instrumented workloads (100% = all of it).'
              value={pctInstrumented}
              onChange={setPctInstrumented}
              min={0}
              max={100}
              step={1}
            />
            <NumberField
              id='roi-cpu-cost'
              label='Cost per CPU'
              hint='$/vCPU per month. Savings = instrumented CPUs × agent overhead % × this rate.'
              value={cpuCost}
              onChange={setCpuCost}
              min={0}
              step={0.01}
            />
            <DerivedBanner>
              <DerivedLabel>CPUs in instrumented scope</DerivedLabel>
              <DerivedValue>{formatCores(totalCpu)}</DerivedValue>
              <DerivedSub>{totalCpuMath}</DerivedSub>
            </DerivedBanner>
          </Panel>

          <SavingsPanel title='Infrastructure savings' savings={infrastructureSavings}>
            <Metric>
              <MetricLabel>CPU today</MetricLabel>
              <MetricValue>{formatCores(totalCpu)} cores</MetricValue>
              <MetricSub>{formatCurrency(extraPerCpu)} extra per CPU vs Odigos</MetricSub>
            </Metric>
            <Metric>
              <MetricLabel>CPU with Odigos</MetricLabel>
              <MetricValue>{formatCores(infrastructureSavings.cpuWithOdigos)} cores</MetricValue>
              <MetricSub>{agent.cpuLessPct}% reduction vs {agent.name}</MetricSub>
            </Metric>
            <Metric>
              <MetricLabel>CPU cores saved</MetricLabel>
              <MetricValue $highlight>{formatCores(infrastructureSavings.coresSaved)} cores</MetricValue>
            </Metric>
          </SavingsPanel>
        </Layout>

        <Panel style={{ marginTop: 24 }}>
          <PanelTitle>Compare infrastructure savings across agents</PanelTitle>
          <TableScroll>
            <Table>
              <thead>
                <tr>
                  <Th>Agent</Th>
                  <Th>CPU saved vs Odigos</Th>
                  <Th>Cores saved</Th>
                  <Th>Annual $</Th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(({ agent: rowAgent, result: rowResult }) => {
                  const Row = rowAgent.id === agent.id ? ActiveRow : 'tr';

                  return (
                    <Row key={rowAgent.id}>
                      <AgentName>{rowAgent.name}</AgentName>
                      <Td>{rowAgent.cpuLessPct}%</Td>
                      <Td>{formatCores(rowResult.coresSaved)}</Td>
                      <Td>{formatCurrency(rowResult.annual)}</Td>
                    </Row>
                  );
                })}
              </tbody>
            </Table>
          </TableScroll>
        </Panel>
      </CategoryBlock>

      <CategoryBlock>
        <CategoryHeader>
          <CategoryEyebrow>Section 2</CategoryEyebrow>
          <CategoryTitle>Incident resolution</CategoryTitle>
          <CategoryDescription>
            Odigos delivers broader zero-code coverage, reducing time spent hunting root cause when telemetry was never
            there in the first place.
          </CategoryDescription>
        </CategoryHeader>

        <Layout>
          <Panel>
            <PanelTitle>Incident response inputs</PanelTitle>
            <NumberField
              id='roi-major-incidents'
              label='Major incidents per year'
              value={majorIncidents}
              onChange={setMajorIncidents}
              min={0}
              step={1}
            />
            <NumberField
              id='roi-hours-per-incident'
              label='Avg investigation hours per incident'
              hint='Time spent diagnosing each major incident.'
              value={hoursPerIncident}
              onChange={setHoursPerIncident}
              min={0}
              step={0.5}
            />
            <NumberField
              id='roi-engineers-per-incident'
              label='Engineers per incident'
              value={engineersPerIncident}
              onChange={setEngineersPerIncident}
              min={0}
              step={1}
            />
            <NumberField
              id='roi-mttr-cost'
              label='Fully loaded cost per engineer hour'
              hint='Salary, benefits, and on-call burden combined.'
              value={mttrCostPerHour}
              onChange={setMttrCostPerHour}
              min={0}
              step={1}
            />
            <DerivedBanner>
              <DerivedLabel>Annual investigation cost</DerivedLabel>
              <DerivedValue>{formatCurrency(annualInvestigationCost)}</DerivedValue>
              <DerivedSub>
                {mttrInputs.majorIncidents} incidents × {formatHours(mttrInputs.hoursPerIncident)} hrs ×{' '}
                {mttrInputs.engineersPerIncident} engineers
              </DerivedSub>
            </DerivedBanner>
          </Panel>

          <SavingsPanel title='MTTR savings' savings={mttrSavings}>
            <Metric>
              <MetricLabel>Time recovered from coverage gaps</MetricLabel>
              <MetricValue $highlight>{MTTR_TELEMETRY_GAP_PCT}%</MetricValue>
              <MetricSub>
                We estimate {MTTR_TELEMETRY_GAP_PCT}% of investigation time is lost to missing or incomplete telemetry
                that Odigos would have captured automatically.
              </MetricSub>
            </Metric>
            <Metric>
              <MetricLabel>Investigation hours saved per year</MetricLabel>
              <MetricValue>
                {formatHours(
                  mttrInputs.majorIncidents *
                    mttrInputs.hoursPerIncident *
                    mttrInputs.engineersPerIncident *
                    (MTTR_TELEMETRY_GAP_PCT / 100),
                )}{' '}
                hrs
              </MetricValue>
            </Metric>
          </SavingsPanel>
        </Layout>
      </CategoryBlock>

      {isOtelAgent ? (
        <CategoryBlock>
          <CategoryHeader>
            <CategoryEyebrow>Section 3</CategoryEyebrow>
            <CategoryTitle>OTel pipeline maintenance</CategoryTitle>
            <CategoryDescription>
              Time your team spends building and maintaining OpenTelemetry instrumentation, collectors, pipelines, and
              sampling — work Odigos automates with zero-code delivery.
            </CategoryDescription>
          </CategoryHeader>

          <Layout>
            <Panel>
              <PanelTitle>Operational maintenance inputs</PanelTitle>
              <NumberField
                id='roi-instrumentation-hours'
                label='Instrumentation maintenance (hours/week)'
                hint='Manual SDK changes, rollouts, and service onboarding.'
                value={instrumentationHoursWeek}
                onChange={setInstrumentationHoursWeek}
                min={0}
                step={0.5}
              />
              <NumberField
                id='roi-collector-hours'
                label='Collector & pipeline ops (hours/week)'
                hint='OpenTelemetry Collector config, exporters, and routing.'
                value={collectorHoursWeek}
                onChange={setCollectorHoursWeek}
                min={0}
                step={0.5}
              />
              <NumberField
                id='roi-sampling-hours'
                label='Sampling & tuning (hours/week)'
                hint='Head/tail sampling rules, cardinality control, and pipeline tuning.'
                value={samplingHoursWeek}
                onChange={setSamplingHoursWeek}
                min={0}
                step={0.5}
              />
              <NumberField
                id='roi-operational-cost'
                label='Fully loaded cost per engineer hour'
                value={operationalCostPerHour}
                onChange={setOperationalCostPerHour}
                min={0}
                step={1}
              />
              <DerivedBanner>
                <DerivedLabel>Weekly OTel maintenance</DerivedLabel>
                <DerivedValue>{formatHours(weeklyOperationalHours)} hrs</DerivedValue>
                <DerivedSub>{formatHours(weeklyOperationalHours * 52)} hours per year at current pace</DerivedSub>
              </DerivedBanner>
            </Panel>

            <SavingsPanel title='Operational savings' savings={operationalSavings}>
              <Metric>
                <MetricLabel>Manual work Odigos can remove</MetricLabel>
                <MetricValue $highlight>{OTEL_MAINTENANCE_REDUCTION_PCT}%</MetricValue>
                <MetricSub>
                  Instrumentation, collector config, and sampling pipelines largely run automatically with Odigos.
                </MetricSub>
              </Metric>
              <Metric>
                <MetricLabel>Engineering hours saved per year</MetricLabel>
                <MetricValue>{formatHours(weeklyOperationalHours * 52 * (OTEL_MAINTENANCE_REDUCTION_PCT / 100))} hrs</MetricValue>
              </Metric>
            </SavingsPanel>
          </Layout>
        </CategoryBlock>
      ) : (
        <CategoryBlock>
          <CategoryHeader>
            <CategoryEyebrow>Section 3</CategoryEyebrow>
            <CategoryTitle>Agent license fees</CategoryTitle>
            <CategoryDescription>
              License spend for {agent.name} across the hosts and clusters you would replace with Odigos.
            </CategoryDescription>
          </CategoryHeader>

          <Layout>
            <Panel>
              <PanelTitle>License inputs</PanelTitle>
              <NumberField
                id='roi-monitored-hosts'
                label='Monitored hosts / nodes'
                hint='Servers, VMs, or Kubernetes nodes billed for the agent.'
                value={monitoredHosts}
                onChange={setMonitoredHosts}
                min={0}
                step={1}
              />
              <NumberField
                id='roi-license-per-host'
                label='Agent license cost per host / month'
                hint={`Per-host fee for ${agent.name} (e.g. infrastructure monitoring).`}
                value={licensePerHostMonth}
                onChange={setLicensePerHostMonth}
                min={0}
                step={0.01}
              />
              <NumberField
                id='roi-billed-clusters'
                label='Kubernetes clusters billed separately'
                hint='Leave at 0 if cluster fees are not part of your contract.'
                value={billedClusters}
                onChange={setBilledClusters}
                min={0}
                step={1}
              />
              <NumberField
                id='roi-license-per-cluster'
                label='License fee per cluster / month'
                value={licensePerClusterMonth}
                onChange={setLicensePerClusterMonth}
                min={0}
                step={0.01}
              />
              <DerivedBanner>
                <DerivedLabel>Current monthly license spend</DerivedLabel>
                <DerivedValue>{formatCurrency(licenseSavings.monthly)}</DerivedValue>
                <DerivedSub>
                  {licenseInputs.monitoredHosts} hosts × {formatCurrency(licenseInputs.licensePerHostMonth)}
                  {licenseInputs.billedClusters > 0
                    ? ` + ${licenseInputs.billedClusters} clusters × ${formatCurrency(licenseInputs.licensePerClusterMonth)}`
                    : ''}
                </DerivedSub>
              </DerivedBanner>
            </Panel>

            <SavingsPanel title='License savings' savings={licenseSavings}>
              <Metric>
                <MetricLabel>Hosts removed from {agent.name} billing</MetricLabel>
                <MetricValue>{licenseInputs.monitoredHosts.toLocaleString()}</MetricValue>
              </Metric>
              {licenseInputs.billedClusters > 0 ? (
                <Metric>
                  <MetricLabel>Clusters removed from billing</MetricLabel>
                  <MetricValue>{licenseInputs.billedClusters.toLocaleString()}</MetricValue>
                </Metric>
              ) : null}
            </SavingsPanel>
          </Layout>
        </CategoryBlock>
      )}

      <Footnote>
        Infrastructure: instrumented CPUs × agent overhead % × cost per CPU. Incident resolution: assumes{' '}
        {MTTR_TELEMETRY_GAP_PCT}% of investigation time is lost to telemetry gaps Odigos would close. OTel maintenance: assumes{' '}
        {OTEL_MAINTENANCE_REDUCTION_PCT}% of manual pipeline work is eliminated. License: full agent license spend on listed
        hosts and clusters.
      </Footnote>
    </Section>
  );
};
