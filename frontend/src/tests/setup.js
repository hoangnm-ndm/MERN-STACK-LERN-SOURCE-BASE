import '@testing-library/jest-dom/vitest';
import { afterEach, afterAll, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/server';

/**
 * Thiết lập môi trường test frontend: jsdom + Testing Library + MSW.
 *
 * MSW (Mock Service Worker) chặn ở tầng NETWORK, không phải mock module axios.
 * Nhờ vậy test chạy qua đúng interceptor thật trong http.js — kể cả luồng
 * 401 → refresh → retry. Mock axios thì luồng đó không bao giờ được kiểm tra.
 */

beforeAll(() => {
  // TODO: server.listen({ onUnhandledRequest: 'error' })
  // 'error' là lựa chọn có chủ ý: test gọi tới endpoint chưa khai báo handler sẽ
  // FAIL thay vì im lặng gọi ra mạng thật. Nhờ vậy không có test nào âm thầm phụ
  // thuộc vào server đang chạy.
});

afterEach(() => {
  // TODO: cleanup() (dọn DOM) + server.resetHandlers() (bỏ handler ghi đè trong
  // từng test, tránh test này ảnh hưởng test kia).
});

afterAll(() => {
  // TODO: server.close()
});
