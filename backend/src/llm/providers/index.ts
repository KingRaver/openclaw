import { OllamaProvider } from './ollama'
import type { LlmProvider } from '../types'

export function createProvider(): LlmProvider {
  return new OllamaProvider()
}
