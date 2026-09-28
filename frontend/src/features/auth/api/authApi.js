import { http } from '@/shared/lib/http';

/**
 * Hàm gọi API thuần của feature auth.
 *
 * Tầng này CHỈ gọi HTTP và trả dữ liệu — không dùng hook, không quản lý state,
 * không hiện toast. Nhờ vậy test được bằng cách mock http, và hook ở tầng trên
 * mới lo cache/thông báo.
 *
 * Backend luôn trả { success, message, data } nên ở đây bóc `res.data.data`.
 */

/**
 * @param {{ name: string, email: string, password: string }} input
 * @returns {Promise<{ user: object }>}
 */
export async function register(input) {
  // TODO: const res = await http.post('/auth/register', input); return res.data.data;
  throw new Error('register() chưa được triển khai');
}

/**
 * @param {{ email: string, password: string }} input
 * @returns {Promise<{ user: object, accessToken: string }>}
 */
export async function login(input) {
  // TODO: http.post('/auth/login', input)
  // Refresh token nằm trong cookie, KHÔNG có trong response body.
  throw new Error('login() chưa được triển khai');
}

/** @returns {Promise<void>} */
export async function logout() {
  // TODO: http.post('/auth/logout')
  throw new Error('logout() chưa được triển khai');
}

/**
 * Dùng bởi authStore.bootstrap() và bởi interceptor trong http.js.
 * @returns {Promise<{ user: object, accessToken: string }>}
 */
export async function refresh() {
  // TODO: http.post('/auth/refresh')
  throw new Error('refresh() chưa được triển khai');
}

/** @returns {Promise<object>} thông tin user hiện tại */
export async function getMe() {
  // TODO: http.get('/users/me')
  throw new Error('getMe() chưa được triển khai');
}

/** @param {string} token @returns {Promise<void>} */
export async function verifyEmail(token) {
  // TODO: http.post('/auth/verify-email', { token })
  throw new Error('verifyEmail() chưa được triển khai');
}

/** @param {string} email @returns {Promise<void>} */
export async function resendVerification(email) {
  // TODO: http.post('/auth/resend-verification', { email })
  throw new Error('resendVerification() chưa được triển khai');
}

/** @param {string} email @returns {Promise<void>} */
export async function requestMagicLink(email) {
  // TODO: http.post('/auth/magic-link', { email })
  throw new Error('requestMagicLink() chưa được triển khai');
}

/** @param {string} token @returns {Promise<{ user: object, accessToken: string }>} */
export async function consumeMagicLink(token) {
  // TODO: http.post('/auth/magic-link/consume', { token })
  throw new Error('consumeMagicLink() chưa được triển khai');
}

/** @param {string} email @returns {Promise<void>} */
export async function forgotPassword(email) {
  // TODO: http.post('/auth/forgot-password', { email })
  throw new Error('forgotPassword() chưa được triển khai');
}

/** @param {{ token: string, password: string }} input @returns {Promise<void>} */
export async function resetPassword(input) {
  // TODO: http.post('/auth/reset-password', input)
  throw new Error('resetPassword() chưa được triển khai');
}

/** @param {{ currentPassword: string, newPassword: string }} input @returns {Promise<void>} */
export async function changePassword(input) {
  // TODO: http.post('/auth/change-password', input)
  throw new Error('changePassword() chưa được triển khai');
}

/**
 * URL để chuyển người dùng sang Google.
 *
 * KHÔNG dùng axios ở đây: đây là điều hướng cả trang
 * (`window.location.href = getGoogleAuthUrl()`), không phải lời gọi AJAX.
 * Gọi bằng fetch sẽ vướng CORS và người dùng chẳng đi đâu cả.
 *
 * @returns {string}
 */
export function getGoogleAuthUrl() {
  return `${import.meta.env.VITE_API_URL}/auth/google`;
}
