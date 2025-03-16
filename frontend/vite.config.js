import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
        env.VITE_GEMINI_API_KEY
      ),
    },
  };
});
