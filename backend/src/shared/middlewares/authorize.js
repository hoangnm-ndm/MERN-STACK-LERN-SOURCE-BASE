import { Roles } from '../constants/roles.js';

/**
 * Kiểm tra quyền theo role. Luôn dùng SAU `authenticate`.
 *
 * Cách dùng:
 *   router.get('/users', authenticate, authorize(Roles.ADMIN, Roles.SUPER_ADMIN), ...)
 *
 * Quy ước phân quyền của dự án: KHÔNG kiểm tra role rải rác bằng `if` trong
 * controller/service. Quyền theo role đặt ở route; quyền theo *sở hữu tài nguyên*
 * đặt ở service (vì chỉ service mới biết ai là chủ của record).
 */

/**
 * @param {...string} allowedRoles
 * @returns {import('express').RequestHandler}
 */
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    // TODO:
    // - Chưa có req.user → 401 (dấu hiệu quên gắn authenticate trước đó).
    // - req.user.role không nằm trong allowedRoles → 403 FORBIDDEN.
    // - Hợp lệ → next().
    next(new Error('authorize() chưa được triển khai'));
  };
}

/** Chỉ Super Admin — dùng cho khu cấu hình hệ thống (Phase 4, 5). */
export const authorizeSuperAdmin = authorize(Roles.SUPER_ADMIN);

/** Admin hoặc Super Admin — dùng cho khu quản trị. */
export const authorizeAdmin = authorize(Roles.ADMIN, Roles.SUPER_ADMIN);

/**
 * Cho qua nếu là chính chủ tài nguyên HOẶC là admin.
 * Đây là lưới chặn IDOR (user A sửa dữ liệu user B) ở tầng route cho các route
 * dạng `/users/:id/...`.
 *
 * @param {(req: import('express').Request) => string} getOwnerId lấy id chủ sở hữu từ req
 * @returns {import('express').RequestHandler}
 */
export function authorizeOwnerOrAdmin(getOwnerId) {
  return (req, res, next) => {
    // TODO:
    // - So sánh String(getOwnerId(req)) với String(req.user.id).
    // - Không khớp và role không phải ADMIN/SUPER_ADMIN → 403 FORBIDDEN.
    next(new Error('authorizeOwnerOrAdmin() chưa được triển khai'));
  };
}
