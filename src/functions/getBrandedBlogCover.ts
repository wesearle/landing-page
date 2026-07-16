import type { BlogPost } from '@/types';

const COVERS = {
  cpp: '/assets/blogs/odigos-blog-cpp-ebpf.png',
  engines: '/assets/blogs/odigos-blog-instrumentation-engine.png',
  profiling: '/assets/blogs/odigos-blog-continuous-profiling.png',
  ai: '/assets/blogs/odigos-blog-ai-observability.png',
  tracing: '/assets/blogs/odigos-blog-distributed-tracing.png',
  database: '/assets/blogs/odigos-blog-database-debugging.png',
  pipelines: '/assets/blogs/odigos-blog-otel-pipelines.png',
  kubernetes: '/assets/blogs/odigos-blog-kubernetes-fleet.png',
  debugging: '/assets/blogs/odigos-blog-debugging-signals.png',
  runtimes: '/assets/blogs/odigos-blog-language-runtimes.png',
  community: '/assets/blogs/odigos-blog-open-source-community.png',
  cloud: '/assets/blogs/odigos-blog-cloud-destinations.png',
  performance: '/assets/blogs/odigos-blog-performance-overhead.png',
  security: '/assets/blogs/odigos-blog-security-privacy.png',
  signals: '/assets/blogs/odigos-blog-telemetry-signals.png',
};

export const BLOG_COVER_FALLBACK = COVERS.debugging;

export const getBrandedBlogCover = (blog: BlogPost, index = 0) => {
  const value = `${blog.title} ${blog.slug} ${blog.tags?.join(' ') ?? ''}`.toLowerCase();
  if (value.includes('c++') || value.includes('cplusplus')) return COVERS.cpp;
  if (value.includes('instrumentation-engine')) return COVERS.engines;
  if (value.includes('profil')) return COVERS.profiling;

  let covers: string[];

  if (/(benchmark|overhead|performance|latency|faster|scale)/.test(value)) {
    covers = [COVERS.performance, COVERS.runtimes, COVERS.signals];
  } else if (/(\bai\b|\bllm|model|token|copilot)/.test(value)) {
    covers = [COVERS.ai, COVERS.debugging, COVERS.signals, COVERS.runtimes];
  } else if (/(security|privacy|pii|mask|sensitive|credential)/.test(value)) {
    covers = [COVERS.security, COVERS.debugging, COVERS.database];
  } else if (/(database|mysql|postgres|oracle|query|lock)/.test(value)) {
    covers = [COVERS.database, COVERS.tracing, COVERS.debugging];
  } else if (/(s3|gcs|cloud|storage|export|destination)/.test(value)) {
    covers = [COVERS.cloud, COVERS.pipelines, COVERS.signals];
  } else if (/(open source|\boss\b|community|contributor)/.test(value)) {
    covers = [COVERS.community, COVERS.runtimes, COVERS.kubernetes];
  } else if (/(\bgo\b|\bjava\b|\bpython\b|nodejs|node\.js|\bruby\b|\bphp\b|\.net|\brust\b|runtime|language)/.test(value)) {
    covers = [COVERS.runtimes, COVERS.engines, COVERS.performance];
  } else if (/(pipeline|opentelemetry|otel|collector|connector|routing|data stream|grafana)/.test(value)) {
    covers = [COVERS.pipelines, COVERS.cloud, COVERS.signals, COVERS.kubernetes];
  } else if (/(kubernetes|k8s|cluster|central|fleet|bare metal|\bvm\b)/.test(value)) {
    covers = [COVERS.kubernetes, COVERS.pipelines, COVERS.community];
  } else if (/(trace|tracing|kafka|messag|microservice|span)/.test(value)) {
    covers = [COVERS.tracing, COVERS.signals, COVERS.database, COVERS.debugging];
  } else if (/(metric|\blogs?\b|telemetry|signal|observability)/.test(value)) {
    covers = [COVERS.signals, COVERS.debugging, COVERS.ai, COVERS.tracing];
  } else {
    covers = [COVERS.debugging, COVERS.community, COVERS.signals, COVERS.performance];
  }

  return covers[index % covers.length];
};
