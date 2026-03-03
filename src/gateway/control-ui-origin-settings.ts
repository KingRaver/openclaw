import type { OpenClawConfig } from "../config/config.js";

function normalizeOrigins(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) {
      continue;
    }
    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

export function readControlUiOriginsFromEnv(env: NodeJS.ProcessEnv = process.env): string[] {
  const raw = env.OPENCLAW_CONTROL_UI_ORIGINS ?? "";
  if (!raw.trim()) {
    return [];
  }
  return normalizeOrigins(raw.split(","));
}

export function resolveControlUiAllowedOrigins(params: {
  config?: OpenClawConfig;
  env?: NodeJS.ProcessEnv;
}): string[] {
  const configOrigins = (params.config?.gateway?.controlUi?.allowedOrigins ?? []).filter(
    (value): value is string => typeof value === "string",
  );
  const envOrigins = readControlUiOriginsFromEnv(params.env);
  return normalizeOrigins([...configOrigins, ...envOrigins]);
}

export function resolveControlUiHostHeaderOriginFallback(params: {
  config?: OpenClawConfig;
  env?: NodeJS.ProcessEnv;
}): boolean {
  return (
    params.config?.gateway?.controlUi?.dangerouslyAllowHostHeaderOriginFallback === true ||
    params.env?.OPENCLAW_DANGEROUSLY_ALLOW_HOST_HEADER_ORIGIN === "1"
  );
}
