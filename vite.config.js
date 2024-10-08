import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from '@rollup/plugin-replace';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    replace({
    preventAssignment: true,
    values: {
      'process.env.VITE_KEY': JSON.stringify(process.env.VITE_KEY),
      'process.env.VITE_IV': JSON.stringify(process.env.VITE_IV),
    },
  }),],
  build: {
    sourcemap: true, // Générer des source maps
  },
});
