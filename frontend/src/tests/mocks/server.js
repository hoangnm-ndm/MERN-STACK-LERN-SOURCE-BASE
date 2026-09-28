import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/** Server MSW dùng cho toàn bộ test. Cấu hình vòng đời ở tests/setup.js. */
export const server = setupServer(...handlers);
