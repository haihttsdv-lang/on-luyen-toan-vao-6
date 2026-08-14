import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages phục vụ dự án dạng project page ở đường dẫn con /on-luyen-toan-vao-6/,
  // không phải gốc domain — cần đặt base tương ứng khi build cho Pages (workflow set biến này).
  base: process.env.GITHUB_PAGES ? '/on-luyen-toan-vao-6/' : '/',
  plugins: [react()],
  server: {
    port: 5588,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
});
