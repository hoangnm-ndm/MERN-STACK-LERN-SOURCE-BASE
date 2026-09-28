import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      /** `@/features/auth` thay cho `../../../features/auth`. Khai báo kèm ở jsconfig.json để editor hiểu. */
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5173,
    /**
     * KHÔNG dùng proxy sang backend. Frontend gọi API qua `VITE_API_URL` tuyệt đối,
     * nhờ vậy môi trường dev giống production (nơi hai bên khác domain) và CORS
     * cùng cookie được kiểm tra thật ngay từ khi phát triển.
     */
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.js'],
    css: false,
  },
});
