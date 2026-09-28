import { http } from '@/shared/lib/http';

/** Hàm gọi API cấu hình hệ thống (Phase 4). */

/**
 * Cấu hình công khai — trang đăng nhập gọi để biết hiện nút nào.
 * KHÔNG cần đăng nhập.
 *
 * @returns {Promise<{ allowRegistration: boolean, allowPasswordLogin: boolean, allowMagicLink: boolean, allowGoogleLogin: boolean, maintenanceMode: boolean }>}
 */
export async function getPublicSettings() {
  // TODO: http.get('/settings/public')
  throw new Error('getPublicSettings() chưa được triển khai');
}

/** Toàn bộ cấu hình — chỉ Super Admin. @returns {Promise<object>} */
export async function getSettings() {
  // TODO: http.get('/settings')
  throw new Error('getSettings() chưa được triển khai');
}

/** @param {object} patch @returns {Promise<object>} */
export async function updateSettings(patch) {
  // TODO: http.patch('/settings', patch)
  throw new Error('updateSettings() chưa được triển khai');
}
