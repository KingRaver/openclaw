import { describe, expect, it } from "vitest";
import type { OpenClawConfig } from "../config/config.js";
import {
  readControlUiOriginsFromEnv,
  resolveControlUiAllowedOrigins,
  resolveControlUiHostHeaderOriginFallback,
} from "./control-ui-origin-settings.js";

describe("control-ui-origin-settings", () => {
  it("reads comma-separated OPENCLAW_CONTROL_UI_ORIGINS values", () => {
    const env = {
      OPENCLAW_CONTROL_UI_ORIGINS:
        " https://control-ui.example.com,https://control.example.com ,,https://CONTROL.example.com ",
    } as NodeJS.ProcessEnv;
    expect(readControlUiOriginsFromEnv(env)).toEqual([
      "https://control-ui.example.com",
      "https://control.example.com",
    ]);
  });

  it("merges config + env origins with case-insensitive dedupe", () => {
    const config = {
      gateway: {
        controlUi: {
          allowedOrigins: [
            "https://control.example.com",
            "https://control-ui.example.com",
          ],
        },
      },
    } as OpenClawConfig;
    const env = {
      OPENCLAW_CONTROL_UI_ORIGINS:
        "https://CONTROL-UI.EXAMPLE.COM,https://preview.example.com",
    } as NodeJS.ProcessEnv;
    expect(resolveControlUiAllowedOrigins({ config, env })).toEqual([
      "https://control.example.com",
      "https://control-ui.example.com",
      "https://preview.example.com",
    ]);
  });

  it("enables host-header origin fallback from env", () => {
    const env = {
      OPENCLAW_DANGEROUSLY_ALLOW_HOST_HEADER_ORIGIN: "1",
    } as NodeJS.ProcessEnv;
    expect(resolveControlUiHostHeaderOriginFallback({ env })).toBe(true);
  });
});
