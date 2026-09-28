import { env, isProduction } from './env.js';

/**
 * Cấu hình cookie chứa refresh token.
 *
 * Vì sao refresh token nằm trong cookie httpOnly mà access token thì không:
 * - `httpOnly` khiến JavaScript (kể cả script XSS) không đọc được refresh token.
 * - Access token giữ trong bộ nhớ ở frontend (Zustand), mất khi refresh trang —
 *   đổi lại không bị đánh cắp qua localStorage.
 */
export const REFRESH_COOKIE_NAME = 'refresh_token';

/**
 * @param {number} maxAgeMs thời hạn cookie, nên khớp với JWT_REFRESH_TTL
 * @returns {import('express').CookieOptions}
 */
export function refreshCookieOptions(maxAgeMs) {
  return {
    httpOnly: true,
    secure: isProduction(), // localhost dùng http nên dev phải để false
    sameSite: 'lax',
    path: `${env.API_PREFIX}/auth`, // chỉ gửi kèm khi gọi nhóm route auth
    maxAge: maxAgeMs,
  };
}
