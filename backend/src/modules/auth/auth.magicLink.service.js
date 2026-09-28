import * as usersService from '../users/users.service.js';
import * as sessionsService from '../sessions/sessions.service.js';
import * as settingsService from '../settings/settings.service.js';
import * as tokensService from './auth.tokens.service.js';
import { TokenTypes } from './verificationToken.model.js';
import { signAccessToken } from '../../shared/utils/token.js';
import { AuthProviders, UserStatus } from '../../shared/constants/roles.js';
import { sendEmail } from '../../shared/lib/mailer.js';
import { forbidden } from '../../shared/errors/AppError.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';

/**
 * Đăng nhập bằng magic link (Phase 4): người dùng nhập email, nhận link, bấm vào
 * là vào được — không cần mật khẩu.
 *
 * Đánh đổi cần biết: bảo mật của cách này phụ thuộc hoàn toàn vào hộp thư của
 * người dùng, nên thời hạn token phải ngắn (MAGIC_LINK_TTL_MINUTES = 15 phút)
 * và mỗi link chỉ dùng được một lần.
 */

/**
 * Bước 1: gửi link đăng nhập.
 *
 * @param {object} params
 * @param {string} params.email
 * @param {string} [params.ip]
 * @returns {Promise<void>}
 */
export async function requestMagicLink({ email, ip }) {
  // TODO:
  // 1. settingsService.assertMagicLinkAllowed() — Super Admin có thể tắt.
  // 2. Tìm user theo email.
  //    - Có user và bị BLOCKED → không gửi (trả về thành công im lặng).
  //    - Không có user → QUYẾT ĐỊNH CẦN CHỐT: cho phép magic link tự tạo tài khoản
  //      hay không? Mặc định của base này: KHÔNG tạo (chỉ gửi cho email đã đăng ký),
  //      vì tự tạo tài khoản sẽ bỏ qua bước đồng ý điều khoản và nhập tên.
  //      Dù chọn hướng nào, PHẢI trả response giống nhau cho cả hai trường hợp
  //      để không tiết lộ email nào đã có tài khoản.
  // 3. issueToken({ type: MAGIC_LINK, email, userId }) + gửi emails/MagicLink.jsx.
  throw new Error('requestMagicLink() chưa được triển khai');
}

/**
 * Bước 2: đổi token trong link thành phiên đăng nhập.
 *
 * @param {object} params
 * @param {string} params.token
 * @param {string} [params.userAgent]
 * @param {string} [params.ip]
 * @returns {Promise<{ user: object, accessToken: string, refreshToken: string, refreshTokenMaxAgeMs: number }>}
 */
export async function consumeMagicLink({ token, userAgent, ip }) {
  // TODO:
  // 1. { userId, email } = await tokensService.consumeToken({ token, type: MAGIC_LINK })
  // 2. Lấy user; kiểm tra status BLOCKED → 403.
  // 3. Bấm được link trong email cũng chứng minh sở hữu email → nếu
  //    emailVerifiedAt còn null thì đánh dấu đã xác minh luôn.
  // 4. createSession({ provider: MAGIC_LINK }) + signAccessToken.
  throw new Error('consumeMagicLink() chưa được triển khai');
}
