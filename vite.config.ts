import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   base: ".",
//   plugins: [react()],
// });

export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/Ticketshop/" : "/",
    plugins: [react()],
  };
});
