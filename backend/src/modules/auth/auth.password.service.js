import * as usersService from '../users/users.service.js';
import * as sessionsService from '../sessions/sessions.service.js';
import * as tokensService from './auth.tokens.service.js';
import { TokenTypes } from './verificationToken.model.js';
import { hashPassword, verifyPassword } from '../../shared/utils/password.js';
import { unauthorized } from '../../shared/errors/AppError.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';
import { sendEmail } from '../../shared/lib/mailer.js';

/** Quên mật khẩu / đặt lại / đổi mật khẩu. Tách khỏi auth.service.js để mỗi file một việc. */

/**
 * Bước 1: người dùng nhập email, hệ thống gửi link đặt lại.
 *
 * @param {object} params
 * @param {string} params.email
 * @param {string} [params.ip]
 * @returns {Promise<void>}
 */
export async function forgotPassword({ email, ip }) {
  // TODO:
  // - Tìm user theo email. KHÔNG tồn tại → trả về thành công như bình thường,
  //   không gửi mail. Đây là chủ ý: nếu báo "email không tồn tại", trang quên
  //   mật khẩu thành công cụ dò danh sách email đã đăng ký.
  // - Có user → issueToken({ type: PASSWORD_RESET }) + gửi emails/ResetPassword.jsx.
  // - Rate limit đã gắn ở tầng route (emailLimiter).
  throw new Error('forgotPassword() chưa được triển khai');
}

/**
 * Bước 2: đặt mật khẩu mới bằng token trong link.
 *
 * @param {object} params
 * @param {string} params.token
 * @param {string} params.password
 * @returns {Promise<void>}
 */
export async function resetPassword({ token, password }) {
  // TODO:
  // 1. { userId } = await tokensService.consumeToken({ token, type: PASSWORD_RESET })
  // 2. passwordHash = await hashPassword(password)
  // 3. usersService.updatePasswordHash(userId, passwordHash)
  // 4. BẮT BUỘC: sessionsService.revokeAllSessions(userId, 'PASSWORD_CHANGED')
  //    Vì sao: người dùng đặt lại mật khẩu thường vì nghi bị chiếm tài khoản.
  //    Không cắt hết phiên thì kẻ kia vẫn đang đăng nhập.
  // 5. Gửi email thông báo "mật khẩu đã được đổi" — để chủ tài khoản biết nếu
  //    không phải mình làm.
  throw new Error('resetPassword() chưa được triển khai');
}

/**
 * Đổi mật khẩu khi đang đăng nhập.
 *
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.sessionId phiên hiện tại — được giữ lại
 * @param {string} params.currentPassword
 * @param {string} params.newPassword
 * @returns {Promise<void>}
 */
export async function changePassword({ userId, sessionId, currentPassword, newPassword }) {
  // TODO:
  // 1. Lấy user kèm passwordHash (usersService.findByEmail(..., { withPassword: true })
  //    hoặc thêm hàm findByIdWithPassword — đừng chọc thẳng vào UserModel từ đây).
  // 2. passwordHash == null (tài khoản Google) → yêu cầu dùng luồng "đặt mật khẩu"
  //    thay vì "đổi mật khẩu".
  // 3. verifyPassword(currentPassword, ...) sai → 401 AUTH_INVALID_CREDENTIALS.
  // 4. Cập nhật hash mới.
  // 5. revokeAllSessions(userId, 'PASSWORD_CHANGED', sessionId) — giữ phiên hiện tại
  //    để người dùng không bị đăng xuất ngay sau khi đổi mật khẩu.
  // 6. Gửi email thông báo.
  throw new Error('changePassword() chưa được triển khai');
}
