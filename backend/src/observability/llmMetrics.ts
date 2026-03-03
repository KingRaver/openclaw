export interface LlmMetricEvent {
  requestId: string
  model: string
  latencyMs: number
  status: 'ok' | 'error'
}

export function recordLlmMetric(event: LlmMetricEvent): void {
  // First-pass scaffold: replace with OpenTelemetry/metrics sink implementation.
  // eslint-disable-next-line no-console
  console.log('[llm-metric]', JSON.stringify(event))
}
