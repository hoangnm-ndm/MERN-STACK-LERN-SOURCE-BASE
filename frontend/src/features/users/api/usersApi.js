import { http } from '@/shared/lib/http';

/** Hàm gọi API quản lý người dùng (Phase 5) và cập nhật hồ sơ cá nhân. */

/**
 * @param {{ page?: number, limit?: number, q?: string, role?: string, status?: string, sort?: string }} params
 * @returns {Promise<{ items: object[], meta: { page: number, limit: number, total: number, totalPages: number } }>}
 */
export async function getUsers(params) {
  // TODO: const res = await http.get('/users', { params });
  // Endpoint này trả { success, data, meta } → phải lấy CẢ `meta` cho phân trang:
  //   return { items: res.data.data, meta: res.data.meta };
  throw new Error('getUsers() chưa được triển khai');
}

/** @param {string} id @returns {Promise<object>} */
export async function getUser(id) {
  // TODO: http.get(`/users/${id}`)
  throw new Error('getUser() chưa được triển khai');
}

/** @returns {Promise<object>} */
export async function getMe() {
  // TODO: http.get('/users/me')
  throw new Error('getMe() chưa được triển khai');
}

/**
 * @param {{ name?: string, avatarMediaId?: string | null }} input
 * @returns {Promise<object>}
 */
export async function updateMe(input) {
  // TODO: http.patch('/users/me', input)
  throw new Error('updateMe() chưa được triển khai');
}

/** @param {{ id: string, role: string }} params @returns {Promise<object>} */
export async function changeUserRole({ id, role }) {
  // TODO: http.patch(`/users/${id}/role`, { role })
  throw new Error('changeUserRole() chưa được triển khai');
}

/** @param {{ id: string, reason?: string }} params @returns {Promise<object>} */
export async function blockUser({ id, reason }) {
  // TODO: http.post(`/users/${id}/block`, { reason })
  throw new Error('blockUser() chưa được triển khai');
}

/** @param {string} id @returns {Promise<object>} */
export async function unblockUser(id) {
  // TODO: http.post(`/users/${id}/unblock`)
  throw new Error('unblockUser() chưa được triển khai');
}
