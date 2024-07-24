import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
// base: mode === 'production' ? 'https://codearchivesu.github.io/Ticketshop/' : '/',
//   plugins: [react()],
// });

export default defineConfig(({ mode }) => {
  return {
    base:
      mode === "production"
        ? "https://codearchivesu.github.io/Ticketshop/"
        : "/",
    plugins: [react()],
  };
});
