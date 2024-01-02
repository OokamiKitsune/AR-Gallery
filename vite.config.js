import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {},
});

// Use for enabling HTTPS in production

// https: {
//   key: "./localhost-key.pem",
//   cert: "./localhost.pem",
// },
