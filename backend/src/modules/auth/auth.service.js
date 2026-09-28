import * as usersService from '../users/users.service.js';
import * as sessionsService from '../sessions/sessions.service.js';
import * as settingsService from '../settings/settings.service.js';
import * as tokensService from './auth.tokens.service.js';
import { TokenTypes } from './verificationToken.model.js';
import { hashPassword, verifyPassword } from '../../shared/utils/password.js';
import { signAccessToken } from '../../shared/utils/token.js';
import { AuthProviders, UserStatus } from '../../shared/constants/roles.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';
import { unauthorized, forbidden, badRequest } from '../../shared/errors/AppError.js';
import { sendEmail } from '../../shared/lib/mailer.js';

/**
 * Xác thực bằng email + mật khẩu (Phase 2).
 *
 * Module này KHÔNG import UserModel hay SessionModel — chỉ gọi service của
 * module sở hữu. Nhờ vậy sửa cấu trúc dữ liệu user không lan sang auth.
 */

/**
 * Đăng ký tài khoản mới.
 *
 * @param {object} params
 * @param {import('./auth.schema.js').RegisterInput} params.input
 * @param {string} [params.ip]
 * @returns {Promise<{ user: object }>} chưa trả token — phải xác minh email trước
 */
export async function register({ input, ip }) {
  // TODO:
  // 1. Kiểm tra system settings: settingsService.assertRegistrationAllowed()
  //    (Super Admin có thể tắt đăng ký — Phase 4).
  // 2. passwordHash = await hashPassword(input.password)
  // 3. user = await usersService.createUser({ email, name, passwordHash })
  //    Lỗi trùng email đã được createUser map sang 409.
  // 4. token = await tokensService.issueToken({ type: EMAIL_VERIFY, email, userId: user.id, requestIp: ip })
  // 5. Gửi email xác minh (template emails/VerifyEmail.jsx).
  //    Gửi mail lỗi thì KHÔNG nên làm đăng ký thất bại theo — user đã tạo rồi.
  //    Hãy log lỗi và vẫn trả thành công, kèm hướng dẫn "gửi lại email".
  // 6. Trả về user (không có token): buộc xác minh email trước khi đăng nhập.
  throw new Error('register() chưa được triển khai');
}

/**
 * Đăng nhập bằng mật khẩu.
 *
 * @param {object} params
 * @param {import('./auth.schema.js').LoginInput} params.input
 * @param {string} [params.userAgent]
 * @param {string} [params.ip]
 * @returns {Promise<{ user: object, accessToken: string, refreshToken: string, refreshTokenMaxAgeMs: number }>}
 */
export async function login({ input, userAgent, ip }) {
  // TODO — thứ tự kiểm tra:
  // 1. settingsService.assertPasswordLoginAllowed()
  // 2. user = await usersService.findByEmail(input.email, { withPassword: true })
  // 3. QUAN TRỌNG — thông điệp lỗi phải GIỐNG NHAU cho "email không tồn tại" và
  //    "sai mật khẩu": dùng AUTH_INVALID_CREDENTIALS cho cả hai. Nếu báo khác
  //    nhau, kẻ tấn công dò được email nào đã đăng ký (user enumeration).
  // 4. user.passwordHash == null → tài khoản này đăng ký bằng Google/magic link.
  //    Vẫn trả AUTH_INVALID_CREDENTIALS (không tiết lộ), nhưng có thể gợi ý
  //    chung chung "thử phương thức đăng nhập khác".
  // 5. await verifyPassword(input.password, user.passwordHash) — sai → như bước 3.
  // 6. user.status === BLOCKED → 403 AUTH_ACCOUNT_BLOCKED (chỗ này báo rõ được,
  //    vì đã qua bước xác thực mật khẩu nên không lộ thêm gì).
  // 7. user.emailVerifiedAt == null → 403 AUTH_EMAIL_NOT_VERIFIED.
  // 8. Tạo session: sessionsService.createSession({ userId, provider: PASSWORD, userAgent, ip })
  // 9. accessToken = signAccessToken({ sub: user.id, sessionId, role: user.role })
  // 10. Cập nhật lastLoginAt (không cần await chặn response).
  throw new Error('login() chưa được triển khai');
}

/**
 * Đăng xuất thiết bị hiện tại.
 *
 * @param {object} params
 * @param {string} params.sessionId
 * @param {string} params.userId
 * @returns {Promise<void>}
 */
export async function logout({ sessionId, userId }) {
  // TODO: sessionsService.revokeSession({ sessionId, userId, reason: 'LOGOUT' }).
  // Controller chịu trách nhiệm xoá cookie refresh token.
  throw new Error('logout() chưa được triển khai');
}

/**
 * Cấp access token mới từ refresh token trong cookie.
 *
 * @param {object} params
 * @param {string} params.refreshToken
 * @param {string} [params.userAgent]
 * @param {string} [params.ip]
 * @returns {Promise<{ accessToken: string, refreshToken: string, refreshTokenMaxAgeMs: number, user: object }>}
 */
export async function refresh({ refreshToken, userAgent, ip }) {
  // TODO:
  // 1. rotated = await sessionsService.rotateRefreshToken({ refreshToken, userAgent, ip })
  // 2. user = await usersService.getById(rotated.userId)
  // 3. Kiểm tra lại status: user bị chặn giữa hai lần refresh thì cắt ngay.
  // 4. accessToken mới = signAccessToken({ sub, sessionId, role })
  //    Ký lại role ở đây để user vừa bị hạ quyền không giữ quyền cũ đến hết TTL.
  throw new Error('refresh() chưa được triển khai');
}

/**
 * Xác minh email từ token trong link.
 *
 * @param {string} token
 * @returns {Promise<void>}
 */
export async function verifyEmail(token) {
  // TODO:
  // 1. { userId } = await tokensService.consumeToken({ token, type: EMAIL_VERIFY })
  // 2. usersService.markEmailVerified(userId)
  // 3. (tuỳ chọn) gửi email chào mừng.
  throw new Error('verifyEmail() chưa được triển khai');
}

/**
 * Gửi lại email xác minh.
 *
 * @param {object} params
 * @param {string} params.email
 * @param {string} [params.ip]
 * @returns {Promise<void>}
 */
export async function resendVerification({ email, ip }) {
  // TODO:
  // - Tìm user; KHÔNG tồn tại hoặc đã xác minh rồi → vẫn trả thành công (không
  //   tiết lộ email nào có trong hệ thống), chỉ đơn giản là không gửi gì.
  // - Còn lại: issueToken + sendEmail như bước 4-5 của register().
  throw new Error('resendVerification() chưa được triển khai');
}
