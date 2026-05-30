import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// base: "./" keeps asset paths relative so the static build works on any
// host (GitHub Pages project sites, Netlify, etc.) without knowing the path.
export default defineConfig({
  base: "./",
  plugins: [react()],
  test: {
    globals: true,
    environment: "node",
  },
});
