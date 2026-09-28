import { z } from 'zod';
import { objectIdSchema } from '../../shared/utils/objectId.js';
import { ASSIGNABLE_ROLES, USER_STATUS_VALUES } from '../../shared/constants/roles.js';

/**
 * Zod schema cho REQUEST của module users.
 *
 * Phân biệt rõ hai loại schema trong dự án:
 * - `*.schema.js` = Zod, validate dữ liệu người dùng gửi lên (file này).
 * - `*.model.js`  = Mongoose, giữ toàn vẹn dữ liệu trong DB.
 * Không phải vi phạm DRY: hai lớp có mục đích khác nhau, nhưng ràng buộc phải khớp
 * (ví dụ maxlength tên 120 ở cả hai nơi).
 */

export const userIdParams = z.object({
  id: objectIdSchema,
});

/** Query cho danh sách user ở khu quản trị (Phase 5). */
export const listUsersQuery = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  /** Từ khoá tìm theo tên/email. Phải escape trước khi đưa vào regex — xem service. */
  q: z.string().trim().max(120).optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'USER']).optional(),
  status: z.enum(USER_STATUS_VALUES).optional(),
  sort: z.string().max(40).optional(),
});

/** Người dùng tự cập nhật thông tin của mình. */
export const updateProfileBody = z.object({
  name: z.string().trim().min(2, 'Tên tối thiểu 2 ký tự').max(120).optional(),
  /** null = xoá ảnh đại diện, về ảnh mặc định. */
  avatarMediaId: objectIdSchema.nullable().optional(),
});

/**
 * Admin đổi role của user khác.
 * CHỈ nhận role trong ASSIGNABLE_ROLES — không có SUPER_ADMIN ở đây, nên request
 * tự gửi `role: 'SUPER_ADMIN'` sẽ bị chặn ngay từ tầng validate.
 */
export const changeRoleBody = z.object({
  role: z.enum(ASSIGNABLE_ROLES),
});

export const blockUserBody = z.object({
  reason: z.string().trim().max(500).optional(),
});

/** @typedef {z.infer<typeof listUsersQuery>} ListUsersQuery */
/** @typedef {z.infer<typeof updateProfileBody>} UpdateProfileInput */
