export type LlmRole = 'system' | 'user' | 'assistant'

export interface LlmMessage {
  role: LlmRole
  content: string
}

export interface LlmGenerateOptions {
  temperature?: number
  top_p?: number
  num_ctx?: number
  num_predict?: number
}

export interface LlmRequest {
  model: string
  messages: LlmMessage[]
  stream?: boolean
  options?: LlmGenerateOptions
}

export interface LlmResponse {
  text: string
  model: string
  raw?: unknown
}

export interface LlmProvider {
  generate(request: LlmRequest): Promise<LlmResponse>
}
