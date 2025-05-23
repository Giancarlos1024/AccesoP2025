import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })



export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // Escuchar en todas las interfaces de red
    port: 3000,        // Puerto en el que se ejecutará el servidor
  }
})
