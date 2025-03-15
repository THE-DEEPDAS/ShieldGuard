import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Ensure this matches the backend server URL and port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    "import.meta.env.VITE_GEMINI_API_KEY": JSON.stringify(
      process.env.VITE_GEMINI_API_KEY
    ),
  },
});
