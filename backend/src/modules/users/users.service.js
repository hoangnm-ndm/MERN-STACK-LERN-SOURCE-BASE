import { UserModel, USER_PUBLIC_FIELDS } from './users.model.js';
import { Roles, UserStatus } from '../../shared/constants/roles.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';
import { conflict, forbidden, notFound } from '../../shared/errors/AppError.js';
import { resolvePagination, buildPaginationMeta, resolveSort } from '../../shared/utils/pagination.js';
import { toApi } from '../../shared/utils/serialize.js';

/**
 * Nghiệp vụ người dùng. Chỉ tầng này được truy cập UserModel.
 * Service KHÔNG biết gì về `req`/`res` — nhận tham số thường, ném AppError khi sai.
 *
 * Module khác cần dữ liệu user thì gọi các hàm ở đây, KHÔNG import UserModel.
 */

/**
 * @param {string} email
 * @param {{ withPassword?: boolean }} [options]
 * @returns {Promise<object | null>}
 */
export async function findByEmail(email, options = {}) {
  // TODO:
  // - Luôn chuẩn hoá `email.toLowerCase().trim()` trước khi tìm.
  // - options.withPassword → `.select('+passwordHash')` (chỉ luồng đăng nhập dùng).
  // - Dùng `.lean()` rồi `toApi()` nếu chỉ đọc; luồng đăng nhập cần document thật
  //   để so sánh mật khẩu thì đừng lean.
  //
  // BẢO MẬT: tham số `email` phải là string đã qua Zod. Nếu ai đó truyền
  // `{ $ne: null }` vào đây thì filter thành `{ email: { $ne: null } }` và trả về
  // user đầu tiên trong DB → bypass đăng nhập. `sanitizeFilter` là lưới thứ hai.
  throw new Error('findByEmail() chưa được triển khai');
}

/**
 * @param {string} id
 * @returns {Promise<object>} ném 404 nếu không có
 */
export async function getById(id) {
  // TODO: findById + select(USER_PUBLIC_FIELDS) + lean + toApi; null → throw notFound(...).
  throw new Error('getById() chưa được triển khai');
}

/**
 * Tạo user mới. Dùng bởi luồng đăng ký, magic link và Google OAuth.
 *
 * @param {object} params
 * @param {string} params.email
 * @param {string} params.name
 * @param {string | null} [params.passwordHash] null với tài khoản OAuth/magic link
 * @param {boolean} [params.emailVerified] true khi provider đã xác minh email (Google)
 * @param {string} [params.role] chỉ seed/Super Admin được truyền
 * @returns {Promise<object>}
 */
export async function createUser({ email, name, passwordHash = null, emailVerified = false, role }) {
  // TODO:
  // - Chỉ truyền ĐÚNG các field liệt kê ở trên vào UserModel.create.
  //   TUYỆT ĐỐI không `UserModel.create(req.body)` — người dùng sẽ tự gửi
  //   `role: 'ADMIN'` và tự lên quyền (mass assignment).
  // - emailVerifiedAt = emailVerified ? new Date() : null.
  // - Bắt lỗi trùng unique (code 11000) → throw conflict(..., AUTH_EMAIL_ALREADY_EXISTS).
  //   Dựa vào index thay vì "tìm trước rồi tạo": hai request đồng thời đều thấy
  //   "chưa tồn tại" và cùng tạo được (race condition).
  throw new Error('createUser() chưa được triển khai');
}

/**
 * Danh sách user có phân trang, tìm kiếm, lọc (khu quản trị).
 *
 * @param {import('./users.schema.js').ListUsersQuery} query
 * @returns {Promise<{ items: object[], meta: import('../../shared/utils/pagination.js').PaginationMeta }>}
 */
export async function listUsers(query) {
  // TODO:
  // - resolvePagination(query) → { page, limit, skip }
  // - Dựng filter: role/status nếu có; `q` tìm theo name hoặc email.
  //   Regex từ input PHẢI escape (`q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`),
  //   nếu không người dùng gửi `(a+)+$` sẽ gây ReDoS treo server.
  // - Chạy song song `find(...).sort(resolveSort(query.sort, ['createdAt','name','email']))`
  //   và `countDocuments(filter)` bằng Promise.all.
  // - select(USER_PUBLIC_FIELDS).skip(skip).limit(limit).lean() rồi map toApi.
  throw new Error('listUsers() chưa được triển khai');
}

/**
 * Cập nhật thông tin của chính mình.
 *
 * @param {string} userId
 * @param {import('./users.schema.js').UpdateProfileInput} input
 * @returns {Promise<object>}
 */
export async function updateProfile(userId, input) {
  // TODO:
  // - Chỉ gán các field có trong input (name, avatarMedia).
  // - Nếu có avatarMediaId: kiểm tra media tồn tại, status READY và thuộc về
  //   user này (hoặc là media hệ thống) — gọi media.service, KHÔNG import MediaModel.
  // - Dùng findByIdAndUpdate với `{ new: true, runValidators: true }`.
  //   `runValidators` BẮT BUỘC: mặc định update KHÔNG chạy validator của schema,
  //   nên maxlength/enum sẽ bị bỏ qua.
  throw new Error('updateProfile() chưa được triển khai');
}

/**
 * Đổi role của user khác (Phase 5).
 *
 * @param {object} params
 * @param {import('../../shared/middlewares/authenticate.js').AuthUser} params.actor người thực hiện
 * @param {string} params.targetUserId
 * @param {string} params.role
 * @returns {Promise<object>}
 */
export async function changeRole({ actor, targetUserId, role }) {
  // TODO — thứ tự kiểm tra (quan trọng, xem docs/04-phan-quyen.md):
  // 1. target tồn tại? không → 404.
  // 2. actor.id === targetUserId → throw forbidden(..., CANNOT_MODIFY_SELF).
  //    Vì sao: admin tự hạ quyền mình sẽ tự khoá mình khỏi khu quản trị.
  // 3. target.role === SUPER_ADMIN → throw forbidden(..., SUPER_ADMIN_PROTECTED).
  //    Super Admin không thể bị người khác hạ quyền, kể cả bởi Super Admin khác.
  // 4. Chỉ SUPER_ADMIN được cấp quyền ADMIN; ADMIN chỉ được đổi trong nhóm USER.
  // 5. findByIdAndUpdate với { new: true, runValidators: true }.
  throw new Error('changeRole() chưa được triển khai');
}

/**
 * Chặn / mở chặn tài khoản (Phase 5).
 *
 * @param {object} params
 * @param {import('../../shared/middlewares/authenticate.js').AuthUser} params.actor
 * @param {string} params.targetUserId
 * @param {boolean} params.blocked
 * @param {string} [params.reason]
 * @returns {Promise<object>}
 */
export async function setBlocked({ actor, targetUserId, blocked, reason }) {
  // TODO:
  // - Cùng bộ kiểm tra như changeRole (không tự chặn mình, không chặn Super Admin).
  // - Cập nhật status, blockedAt, blockedBy.
  // - KHI CHẶN phải thu hồi toàn bộ session của user đó: gọi
  //   sessions.service.revokeAllSessions(targetUserId). Không làm bước này thì
  //   access token đang có hiệu lực vẫn dùng được tới khi hết hạn — chặn mà như không.
  throw new Error('setBlocked() chưa được triển khai');
}

/**
 * Đếm số Super Admin đang hoạt động. Dùng để chặn thao tác làm hệ thống không
 * còn Super Admin nào (tự khoá cửa).
 * @returns {Promise<number>}
 */
export async function countActiveSuperAdmins() {
  // TODO: countDocuments({ role: SUPER_ADMIN, status: ACTIVE })
  throw new Error('countActiveSuperAdmins() chưa được triển khai');
}

/**
 * Đánh dấu email đã xác minh (gọi từ auth service).
 * @param {string} userId
 * @returns {Promise<void>}
 */
export async function markEmailVerified(userId) {
  // TODO: findByIdAndUpdate(userId, { emailVerifiedAt: new Date() }, { runValidators: true })
  throw new Error('markEmailVerified() chưa được triển khai');
}

/**
 * Cập nhật mật khẩu (gọi từ auth service sau khi đã hash).
 * @param {string} userId
 * @param {string} passwordHash
 * @returns {Promise<void>}
 */
export async function updatePasswordHash(userId, passwordHash) {
  // TODO: findByIdAndUpdate. Nhận vào HASH, không nhận mật khẩu thô —
  // để trách nhiệm hash nằm gọn ở utils/password.js.
  throw new Error('updatePasswordHash() chưa được triển khai');
}

/**
 * Liên kết tài khoản Google vào user (Phase 4).
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.providerUserId
 * @param {string} params.email
 * @returns {Promise<void>}
 */
export async function linkGoogleIdentity({ userId, providerUserId, email }) {
  // TODO: dùng `$addToSet` để gọi nhiều lần không tạo bản ghi trùng.
  throw new Error('linkGoogleIdentity() chưa được triển khai');
}

/**
 * Tìm user theo tài khoản Google đã liên kết.
 * @param {string} providerUserId
 * @returns {Promise<object | null>}
 */
export async function findByGoogleId(providerUserId) {
  // TODO: findOne({ 'identities.provider': 'GOOGLE', 'identities.providerUserId': providerUserId })
  throw new Error('findByGoogleId() chưa được triển khai');
}

/**
 * Danh sách email theo nhóm đối tượng — dùng cho job gửi email theo lịch (Phase 13).
 *
 * @param {{ role?: string, status?: string, emailVerifiedOnly?: boolean }} filter
 * @returns {Promise<Array<{ id: string, email: string, name: string }>>}
 */
export async function findRecipients(filter) {
  // TODO:
  // - Mặc định chỉ lấy status ACTIVE (đừng gửi mail cho tài khoản đã bị chặn).
  // - emailVerifiedOnly → thêm điều kiện emailVerifiedAt != null.
  // - select('name email').lean() — chỉ lấy field cần, danh sách có thể rất lớn.
  // - Với dữ liệu lớn nên dùng cursor (`.cursor()`) thay vì nạp hết vào RAM.
  throw new Error('findRecipients() chưa được triển khai');
}

/**
 * Dùng bởi media service để biết ảnh có đang được dùng làm avatar hay không
 * (Phase 12: chặn xoá ảnh đang dùng).
 * @param {string} mediaId
 * @returns {Promise<number>}
 */
export async function countUsersUsingAvatar(mediaId) {
  // TODO: countDocuments({ avatarMedia: mediaId })
  throw new Error('countUsersUsingAvatar() chưa được triển khai');
}

/**
 * Gỡ avatar khỏi mọi user đang dùng media này (dùng khi buộc phải xoá media).
 * @param {string} mediaId
 * @returns {Promise<number>} số user bị ảnh hưởng
 */
export async function clearAvatarByMediaId(mediaId) {
  // TODO: updateMany({ avatarMedia: mediaId }, { avatarMedia: null }) → trả modifiedCount.
  throw new Error('clearAvatarByMediaId() chưa được triển khai');
}
