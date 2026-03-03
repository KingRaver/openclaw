export interface LlmConfig {
  provider: 'ollama'
  baseUrl: string
  timeoutMs: number
  primaryModel: string
  fallbackModel: string
  internalKey?: string
}

export function getLlmConfig(env: NodeJS.ProcessEnv = process.env): LlmConfig {
  return {
    provider: 'ollama',
    baseUrl: env.OLLAMA_BASE_URL ?? 'http://nodramallama-runtime:11434',
    timeoutMs: Number(env.OLLAMA_TIMEOUT_MS ?? 150000),
    primaryModel: env.OLLAMA_PRIMARY_MODEL ?? 'qwen2.5-coder:14b-instruct-q4_K_M',
    fallbackModel: env.OLLAMA_FALLBACK_MODEL ?? 'llama3.1:8b-instruct-q4_K_M',
    internalKey: env.INTERNAL_LLM_KEY,
  }
}
