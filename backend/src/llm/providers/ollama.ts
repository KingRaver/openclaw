import { getLlmConfig } from '../config'
import type { LlmProvider, LlmRequest, LlmResponse } from '../types'

export class OllamaProvider implements LlmProvider {
  async generate(request: LlmRequest): Promise<LlmResponse> {
    const config = getLlmConfig()

    const response = await fetch(`${config.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.internalKey ? { 'X-Internal-LLM-Key': config.internalKey } : {}),
      },
      body: JSON.stringify({
        model: request.model || config.primaryModel,
        messages: request.messages,
        stream: request.stream ?? false,
        options: request.options ?? {},
      }),
      signal: AbortSignal.timeout(config.timeoutMs),
    })

    if (!response.ok) {
      throw new Error(`Ollama request failed with status ${response.status}`)
    }

    const payload = (await response.json()) as {
      model?: string
      message?: { content?: string }
    }

    return {
      text: payload.message?.content ?? '',
      model: payload.model ?? request.model,
      raw: payload,
    }
  }
}
