import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  base: import.meta.env.MODE === "production" ? '/alestorm' : '/',
  plugins: [vue(), glsl()],
})
