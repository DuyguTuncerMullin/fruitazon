import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // wrangler pages dev spins up on 127.0.0.1 without a host config override
    // which causes the HMR websocket proxy to fail when vite has it at localhost:3000
    // host: "127.0.0.1",
    strictPort: true,
    open: true,
    port: 3000,
    hmr: {
      clientPort: 3000,
    },
  },
});
