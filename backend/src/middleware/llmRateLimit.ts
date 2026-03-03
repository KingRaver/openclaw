import type { NextFunction, Request, Response } from 'express'

export function llmRateLimit(_req: Request, _res: Response, next: NextFunction): void {
  // First-pass scaffold: wire Redis/token bucket in hardening pass.
  next()
}
