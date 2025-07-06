import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vite.config.js",
    test: {
      include: ["src/**/*.node.test.{js,jsx}"],
      name: "happy-dom",
      environment: "happy-dom",
    },
  },
  {
    extends: "./vite.config.js",
    test: {
      setupFiles: ["vitest-browser-react"],
      include: ["src/**/*.browser.test.{js,jsx}"],
      name: "browser",
      browser: {
        enabled: true,
        provider: "playwright",
        name: "chromium",
      },
    },
  },
]);
