import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Simulates a browser environment (DOM) in Node
    globals: true, // Allows using describe, test, expect without explicit imports
  },
});
