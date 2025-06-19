import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import Font from "vite-plugin-font";

export default defineConfig({
  plugins: [
    react(),
    Font.vite({
      scanFiles: ["src/**/*.{ts,tsx,js,jsx}"],
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
});
