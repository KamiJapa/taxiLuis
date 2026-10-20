import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    "name": "taxi-central-rio-preto-ls",
    "compatibilityDate": "2026-10-06",
    "observability": {
      "enabled": true
    }
  }
});
