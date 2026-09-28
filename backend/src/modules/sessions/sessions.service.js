import { SessionModel } from './sessions.model.js';
import { env } from '../../shared/config/env.js';
import { hashToken, signRefreshToken, durationToMs } from '../../shared/utils/token.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';
import { unauthorized, notFound, forbidden } from '../../shared/errors/AppError.js';
import { toApi } from '../../shared/utils/serialize.js';

/**
 * Nghiệp vụ phiên đăng nhập. Module auth gọi các hàm ở đây thay vì tự truy vấn
 * SessionModel — đó là ranh giới giữa hai module.
 */

/**
 * Tạo phiên mới khi đăng nhập thành công.
 *
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.provider PASSWORD | GOOGLE | MAGIC_LINK
 * @param {string} [params.userAgent]
 * @param {string} [params.ip]
 * @returns {Promise<{ sessionId: string, refreshToken: string, refreshTokenMaxAgeMs: number }>}
 */
export async function createSession({ userId, provider, userAgent, ip }) {
  // TODO:
  // 1. Tạo document session trước (cần _id để nhúng vào payload token).
  //    expiresAt = new Date(Date.now() + durationToMs(env.JWT_REFRESH_TTL))
  //    refreshTokenHash tạm để chuỗi placeholder rồi cập nhật ở bước 3,
  //    HOẶC sinh id trước bằng `new mongoose.Types.ObjectId()` rồi create một lần.
  //    Cách thứ hai gọn hơn, nên dùng.
  // 2. refreshToken = signRefreshToken({ sub: userId, sessionId })
  // 3. Lưu refreshTokenHash = hashToken(refreshToken).
  // 4. Trả cả maxAge để controller set cookie cho khớp thời hạn JWT.
  throw new Error('createSession() chưa được triển khai');
}

/**
 * Kiểm tra phiên còn sống — gọi ở middleware `authenticate` mỗi request.
 *
 * @param {string} sessionId
 * @returns {Promise<object>} session, ném 401 nếu không hợp lệ
 */
export async function assertSessionActive(sessionId) {
  // TODO:
  // - findById(sessionId).lean()
  // - Không tồn tại → unauthorized(..., AUTH_SESSION_REVOKED)
  // - revokedAt != null → unauthorized(..., AUTH_SESSION_REVOKED)
  // - expiresAt <= now → unauthorized(..., AUTH_TOKEN_EXPIRED)
  //   (tự kiểm tra vì TTL của MongoDB không xoá tức thì)
  throw new Error('assertSessionActive() chưa được triển khai');
}

/**
 * XOAY VÒNG refresh token (refresh token rotation).
 *
 * Mỗi lần refresh sẽ phát token mới VÀ vô hiệu token cũ. Nếu token cũ được dùng
 * lại (dấu hiệu bị đánh cắp), thu hồi TOÀN BỘ phiên của user đó.
 *
 * @param {object} params
 * @param {string} params.refreshToken token lấy từ cookie
 * @param {string} [params.userAgent]
 * @param {string} [params.ip]
 * @returns {Promise<{ sessionId: string, userId: string, refreshToken: string, refreshTokenMaxAgeMs: number }>}
 */
export async function rotateRefreshToken({ refreshToken, userAgent, ip }) {
  // TODO:
  // 1. verifyRefreshToken(refreshToken) → { sub, sessionId }. Hết hạn/sai → 401.
  // 2. Tìm session theo sessionId.
  // 3. So sánh hashToken(refreshToken) với session.refreshTokenHash:
  //    - KHÔNG khớp và session còn sống → đây là token CŨ đã bị xoay vòng, tức
  //      có người giữ bản copy → gọi revokeAllSessions(session.user, 'REFRESH_REUSED')
  //      rồi throw unauthorized(..., AUTH_REFRESH_REUSED).
  // 4. Session đã revoke / hết hạn → 401.
  // 5. Sinh refresh token mới, cập nhật refreshTokenHash + lastUsedAt + expiresAt.
  //    Dùng update CÓ ĐIỀU KIỆN trên hash cũ:
  //      updateOne({ _id, refreshTokenHash: oldHash }, { $set: { refreshTokenHash: newHash, ... } })
  //    và kiểm tra modifiedCount === 1. Nếu 0 nghĩa là có request khác vừa xoay
  //    trước → coi như reuse. Đây là cách chặn race condition khi client gửi
  //    hai request refresh cùng lúc.
  throw new Error('rotateRefreshToken() chưa được triển khai');
}

/**
 * Danh sách phiên của một user để hiển thị ở trang "Thiết bị đăng nhập".
 *
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.currentSessionId để FE đánh dấu "thiết bị này"
 * @returns {Promise<Array<object & { isCurrent: boolean }>>}
 */
export async function listUserSessions({ userId, currentSessionId }) {
  // TODO:
  // - find({ user: userId, revokedAt: null, expiresAt: { $gt: new Date() } })
  //   .sort({ lastUsedAt: -1 }).select('-refreshTokenHash').lean()
  // - TUYỆT ĐỐI không trả refreshTokenHash ra API.
  // - Gắn isCurrent = String(session._id) === currentSessionId.
  // - Map qua toApi() vì đã dùng .lean() (nếu không sẽ trả _id).
  throw new Error('listUserSessions() chưa được triển khai');
}

/**
 * Thu hồi một phiên cụ thể (người dùng bấm "Đăng xuất thiết bị này").
 *
 * @param {object} params
 * @param {string} params.sessionId phiên cần thu hồi
 * @param {string} params.userId người thực hiện
 * @param {string} [params.reason]
 * @returns {Promise<void>}
 */
export async function revokeSession({ sessionId, userId, reason = 'REVOKED_BY_USER' }) {
  // TODO:
  // - Cập nhật CÓ ĐIỀU KIỆN cả `user: userId`:
  //     updateOne({ _id: sessionId, user: userId, revokedAt: null }, { $set: { revokedAt, revokedReason } })
  //   Điều kiện `user` là lớp chặn IDOR: không có nó, user A gửi id phiên của
  //   user B là đăng xuất được người khác.
  // - matchedCount === 0 → throw notFound('Không tìm thấy phiên').
  throw new Error('revokeSession() chưa được triển khai');
}

/**
 * Thu hồi toàn bộ phiên của một user.
 * Gọi khi: đổi mật khẩu, bị chặn, phát hiện refresh token bị dùng lại.
 *
 * @param {string} userId
 * @param {string} reason
 * @param {string} [exceptSessionId] giữ lại phiên hiện tại (dùng cho "đăng xuất thiết bị khác")
 * @returns {Promise<number>} số phiên bị thu hồi
 */
export async function revokeAllSessions(userId, reason, exceptSessionId) {
  // TODO: updateMany với filter { user, revokedAt: null, _id: { $ne: exceptSessionId } }
  // (chỉ thêm điều kiện $ne khi exceptSessionId có giá trị) → trả modifiedCount.
  throw new Error('revokeAllSessions() chưa được triển khai');
}

/**
 * Cập nhật `lastUsedAt` để người dùng biết phiên nào còn hoạt động.
 * Gọi ở luồng refresh, KHÔNG gọi mỗi request (sẽ thành một lệnh ghi cho mỗi
 * request, rất tốn).
 *
 * @param {string} sessionId
 * @returns {Promise<void>}
 */
export async function touchSession(sessionId) {
  // TODO: updateOne({ _id: sessionId }, { $set: { lastUsedAt: new Date() } })
  throw new Error('touchSession() chưa được triển khai');
}
