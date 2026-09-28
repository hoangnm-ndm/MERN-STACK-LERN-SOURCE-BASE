import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Hai loại token khác nhau, đừng lẫn:
 *
 * 1. JWT (access/refresh) — có payload, tự xác thực bằng secret.
 * 2. Token dùng một lần (verify email, magic link, reset password) — chuỗi
 *    random, chỉ lưu HASH trong DB. Nếu lưu token thô, người đọc được DB có thể
 *    dùng luôn link của người khác.
 */

/** @typedef {{ sub: string, sessionId: string, role: string }} AccessTokenPayload */
/** @typedef {{ sub: string, sessionId: string }} RefreshTokenPayload */

/**
 * @param {AccessTokenPayload} payload
 * @returns {string}
 */
export function signAccessToken(payload) {
  // TODO: jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_TTL })
  throw new Error('signAccessToken() chưa được triển khai');
}

/**
 * @param {RefreshTokenPayload} payload
 * @returns {string}
 */
export function signRefreshToken(payload) {
  // TODO: jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_TTL })
  throw new Error('signRefreshToken() chưa được triển khai');
}

/**
 * @param {string} token
 * @returns {AccessTokenPayload}
 * @throws {import('jsonwebtoken').JsonWebTokenError} errorHandler sẽ map sang 401
 */
export function verifyAccessToken(token) {
  // TODO: jwt.verify(token, env.JWT_ACCESS_SECRET)
  // KHÔNG bắt lỗi ở đây — để errorHandler phân biệt TokenExpiredError với
  // JsonWebTokenError và trả mã lỗi tương ứng.
  throw new Error('verifyAccessToken() chưa được triển khai');
}

/**
 * @param {string} token
 * @returns {RefreshTokenPayload}
 */
export function verifyRefreshToken(token) {
  // TODO: jwt.verify(token, env.JWT_REFRESH_SECRET)
  throw new Error('verifyRefreshToken() chưa được triển khai');
}

/**
 * Sinh token dùng một lần để gửi qua email.
 * @returns {{ token: string, tokenHash: string }} `token` gửi cho người dùng, `tokenHash` lưu DB
 */
export function createOneTimeToken() {
  // TODO:
  // - token = crypto.randomBytes(32).toString('base64url')
  // - tokenHash = hashToken(token)
  throw new Error('createOneTimeToken() chưa được triển khai');
}

/**
 * Băm token bằng SHA-256 (không cần bcrypt vì token đã đủ entropy và ngắn hạn).
 * @param {string} token
 * @returns {string}
 */
export function hashToken(token) {
  // TODO: crypto.createHash('sha256').update(token).digest('hex')
  throw new Error('hashToken() chưa được triển khai');
}

/**
 * Chuyển '15m' / '30d' thành milliseconds — dùng để tính `expiresAt` trong DB
 * và `maxAge` của cookie cho khớp với thời hạn JWT.
 * @param {string} duration ví dụ '15m', '7d', '30s', '2h'
 * @returns {number}
 */
export function durationToMs(duration) {
  // TODO: parse bằng regex /^(\d+)([smhd])$/, nhân với { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }.
  // Sai định dạng thì ném Error để phát hiện ngay lúc khởi động.
  throw new Error('durationToMs() chưa được triển khai');
}

/**
 * So sánh chuỗi chống timing attack. Dùng khi đối chiếu token/hash.
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
export function safeEqual(a, b) {
  // TODO: crypto.timingSafeEqual với Buffer cùng độ dài; khác độ dài → false.
  throw new Error('safeEqual() chưa được triển khai');
}
