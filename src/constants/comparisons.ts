export interface ComparisonPillar {
  name: string;
  tagline: string;
  description: string;
  docsUrl?: string;
  docsLabel?: string;
  points: { title: string; body: string; icon: string }[];
}

export interface ComparisonMatrixRow {
  feature: string;
  odigos: boolean | string;
  competitor: boolean | string;
}

export interface ComparisonPage {
  slug: string;
  href: string;
  competitorName: string;
  competitorShort: string;
  title: string;
  subtitle: string;
  description: string;
  logos: { src: string; alt: string }[];
  odigos: ComparisonPillar;
  competitor: ComparisonPillar;
  matrixIntro: string;
  matrix: ComparisonMatrixRow[];
}

export const COMPARISONS: ComparisonPage[] = [
  {
    slug: 'odigos-vs-obi',
    href: '/comparisons/odigos-vs-obi',
    competitorName: 'OpenTelemetry eBPF Instrumentation (OBI)',
    competitorShort: 'OBI',
    title: 'Odigos vs OBI',
    subtitle: 'Application-level eBPF instrumentation vs network level visibility',
    description:
      'Compare Odigos userspace eBPF instrumentation with OpenTelemetry eBPF Instrumentation (OBI). See how library-level probes, encrypted traffic, pipeline management, and dynamic instrumentation differ.',
    logos: [
      { src: '/assets/odigos/logo_white.svg', alt: 'Odigos' },
      { src: '/assets/opentelemetry.svg', alt: 'OpenTelemetry' },
    ],
    odigos: {
      name: 'Odigos',
      tagline: 'Application-level eBPF platform',
      description: 'Instrument real application functions at runtime. No code changes or restarts required.',
      points: [
        {
          title: 'Library-level probes',
          body: 'Uprobes on all application and library functions, not just syscalls.',
          icon: '/assets/icons/comparisons/probe.svg',
        },
        {
          title: 'OSS and Custom Code Support',
          body: 'Instrument custom code live, no redeploys or importing SDKs.',
          icon: '/assets/icons/comparisons/code.svg',
        },
        {
          title: 'Encrypted Traffic & mesh-aware',
          body: 'TLS context propgation and service-mesh context.',
          icon: '/assets/icons/comparisons/lock.svg',
        },
        {
          title: 'Automated OpenTelemetry Pipeline + AI Native',
          body: 'Managed OTEL collectors, RBAC, SSO, built-in MCP Server, and live OTTL.',
          icon: '/assets/icons/comparisons/pipeline.svg',
        },
      ],
    },
    competitor: {
      name: 'OBI',
      tagline: 'Syscall & network eBPF',
      description: 'Language-agnostic tracing via syscalls for broad but shallow coverage.',
      docsUrl: 'https://opentelemetry.io/docs/zero-code/obi/',
      docsLabel: 'OpenTelemetry OBI docs',
      points: [
        {
          title: 'Syscall / network only',
          body: 'Kernel-level visibility without library context.',
          icon: '/assets/icons/comparisons/network.svg',
        },
        {
          title: 'No encrypted traffic',
          body: 'Broken trace context propagation across load-balancers and encrypted traffic.',
          icon: '/assets/icons/comparisons/lock-off.svg',
        },
        {
          title: 'Limited app depth',
          body: 'No stack traces, HTTP payloads, JVM metrics, or internal DB spans.',
          icon: '/assets/icons/comparisons/shallow.svg',
        },
        {
          title: 'Instrumentation only',
          body: 'No pipeline management, RBAC/SSO, or MCP Server.',
          icon: '/assets/icons/comparisons/agent.svg',
        },
      ],
    },
    matrixIntro: 'Detailed capability comparison for production observability',
    matrix: [
      {
        feature: 'Library-level instrumentation (vs syscalls)',
        odigos: true,
        competitor: 'Syscalls / network only',
      },
      {
        feature: 'Custom code instrumentation without code changes',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'CPU and memory profiling',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'MCP server & dynamic instrumentation / sampling',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Load-balancer / service mesh context propagation',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Encrypted traffic visibility',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Kafka message payloads',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Code attributes (stack traces, line numbers)',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Custom HTTP headers, requests & responses',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Internal DB spans (locks, unlocks, etc.)',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Full RBAC and SSO through a UI',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Automatic OpenTelemetry pipeline management',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'JVM Metrics',
        odigos: true,
        competitor: false,
      },
      {
        feature: 'Log Capture',
        odigos: true,
        competitor: false,
      },
    ],
  },
];

export const getComparisonBySlug = (slug: string) => COMPARISONS.find((c) => c.slug === slug);
