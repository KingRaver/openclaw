import type { Request, Response } from 'express'
import { createProvider } from '../llm/providers'

export async function agentRoute(req: Request, res: Response): Promise<void> {
  const provider = createProvider()
  const model = (req.body?.model as string | undefined) ?? process.env.OLLAMA_PRIMARY_MODEL ?? 'qwen2.5-coder:14b-instruct-q4_K_M'
  const messages = (req.body?.messages as Array<{ role: 'system' | 'user' | 'assistant'; content: string }> | undefined) ?? []

  const output = await provider.generate({ model, messages, stream: false })
  res.json({ output })
}
