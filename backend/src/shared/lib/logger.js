import pino from 'pino';
import { isProduction, isTest } from '../config/env.js';

/**
 * Logger dùng chung. Không dùng `console.log` trong code nghiệp vụ:
 * console.log không có level, không có cấu trúc, và không tắt được ở test.
 *
 * TODO:
 * - production: `pino({ level: 'info' })` (JSON, để hệ thống log ngoài đọc).
 * - development: thêm `transport: { target: 'pino-pretty' }` cho dễ đọc.
 * - test: `level: 'silent'` để output test không bị nhiễu.
 * - redact các field nhạy cảm: 'password', 'token', 'authorization',
 *   'req.headers.cookie' — để secret không bao giờ chảy vào log.
 */
export const logger = pino({
  level: isTest() ? 'silent' : isProduction() ? 'info' : 'debug',
  // TODO: bổ sung transport (dev) và redact theo mô tả ở trên.
});

/**
 * Logger con gắn thêm ngữ cảnh, ví dụ `createLogger('scheduler')`.
 * @param {string} scope
 * @returns {import('pino').Logger}
 */
export function createLogger(scope) {
  return logger.child({ scope });
}
