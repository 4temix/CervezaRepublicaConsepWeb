import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// GitHub Pages en subruta: debe coincidir con `basename` en `src/App.tsx`.
// Si renombrás el repo, cambiá ambos a `/nombre-del-repo/`.
export default defineConfig({
  base: "/CervezaRepublicaConsepWeb/",
  plugins: [react(), tailwindcss()],
});
