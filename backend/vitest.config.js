import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    /** Nạp mongodb-memory-server trước mọi test file. */
    setupFiles: ['./tests/setup.js'],
    /**
     * Chạy tuần tự trong cùng một process: các test file dùng chung một DB
     * in-memory, chạy song song sẽ tranh nhau dữ liệu và fail ngẫu nhiên.
     */
    fileParallelism: false,
    testTimeout: 20_000, // khởi động MongoDB in-memory lần đầu khá lâu
    include: ['src/**/*.test.js', 'tests/**/*.test.js'],
    coverage: {
      include: ['src/**/*.js'],
      exclude: ['src/**/*.test.js', 'src/server.js'],
    },
  },
});
