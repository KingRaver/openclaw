import { describe, expect, it } from 'vitest'
import { OllamaProvider } from '../../src/llm/providers/ollama'

describe('OllamaProvider (scaffold)', () => {
  it('constructs provider', () => {
    const provider = new OllamaProvider()
    expect(provider).toBeTruthy()
  })
})
