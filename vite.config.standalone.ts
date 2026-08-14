import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

/** Build đóng gói toàn bộ ứng dụng vào đúng 1 file HTML, mở trực tiếp bằng trình duyệt (file://), không cần server. */
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-standalone',
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
  },
});
