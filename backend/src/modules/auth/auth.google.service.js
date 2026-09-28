import crypto from 'node:crypto';
import { OAuth2Client } from 'google-auth-library';
import * as usersService from '../users/users.service.js';
import * as sessionsService from '../sessions/sessions.service.js';
import * as settingsService from '../settings/settings.service.js';
import { signAccessToken } from '../../shared/utils/token.js';
import { AuthProviders, UserStatus } from '../../shared/constants/roles.js';
import { env } from '../../shared/config/env.js';
import { badRequest, forbidden } from '../../shared/errors/AppError.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';

/**
 * Đăng nhập Google OAuth 2.0 (Phase 4) — luồng Authorization Code.
 *
 * Trình tự:
 *   1. FE mở `GET /auth/google` → BE redirect sang trang đồng ý của Google.
 *   2. Google gọi lại `GET /auth/google/callback?code=...&state=...`.
 *   3. BE đổi `code` lấy thông tin người dùng, tạo/liên kết tài khoản, tạo phiên,
 *      rồi redirect về frontend.
 *
 * Vì sao redirect chứ không trả JSON ở bước 3: người dùng đang ở trên tab của
 * Google, không phải trong lời gọi fetch của app.
 */

/** TODO: khởi tạo một OAuth2Client dùng chung:
 * new OAuth2Client({ clientId: env.GOOGLE_CLIENT_ID,
 *                    clientSecret: env.GOOGLE_CLIENT_SECRET,
 *                    redirectUri: env.GOOGLE_REDIRECT_URI })
 */
const oauthClient = null;

/**
 * Sinh URL để chuyển người dùng sang Google.
 *
 * @returns {{ url: string, state: string }} `state` phải được lưu vào cookie ngắn hạn
 */
export function createAuthUrl() {
  // TODO:
  // - state = crypto.randomBytes(16).toString('hex')
  //   VÌ SAO CẦN STATE: đây là chống CSRF cho OAuth. Không có state, kẻ tấn công
  //   dụ được người dùng hoàn tất luồng đăng nhập bằng tài khoản Google của kẻ đó.
  //   Controller lưu state vào cookie httpOnly, callback so lại.
  // - url = oauthClient.generateAuthUrl({
  //     scope: ['openid', 'email', 'profile'],
  //     state,
  //     prompt: 'select_account',
  //     access_type: 'online',   // không cần refresh token của Google
  //   })
  throw new Error('createAuthUrl() chưa được triển khai');
}

/**
 * Xử lý callback: đổi code lấy thông tin user Google.
 *
 * @param {string} code
 * @returns {Promise<{ providerUserId: string, email: string, name: string, emailVerified: boolean }>}
 */
export async function exchangeCodeForProfile(code) {
  // TODO:
  // - { tokens } = await oauthClient.getToken(code)
  // - ticket = await oauthClient.verifyIdToken({ idToken: tokens.id_token, audience: env.GOOGLE_CLIENT_ID })
  //   BẮT BUỘC verify id_token (kiểm tra chữ ký và `audience`), đừng chỉ decode:
  //   token không được xác thực thì ai cũng tự dựng được.
  // - payload = ticket.getPayload() → { sub, email, name, email_verified, picture }
  // - payload.email_verified === false → từ chối (badRequest): email chưa xác minh
  //   ở Google thì không thể dùng để nhận dạng tài khoản.
  throw new Error('exchangeCodeForProfile() chưa được triển khai');
}

/**
 * Tạo hoặc liên kết tài khoản rồi mở phiên đăng nhập.
 *
 * @param {object} params
 * @param {{ providerUserId: string, email: string, name: string, emailVerified: boolean }} params.profile
 * @param {string} [params.userAgent]
 * @param {string} [params.ip]
 * @returns {Promise<{ user: object, accessToken: string, refreshToken: string, refreshTokenMaxAgeMs: number }>}
 */
export async function loginWithGoogleProfile({ profile, userAgent, ip }) {
  // TODO — thứ tự xử lý:
  // 1. settingsService.assertGoogleLoginAllowed()
  // 2. Tìm theo providerUserId trước: usersService.findByGoogleId(profile.providerUserId).
  //    Tìm theo `sub` của Google chứ không theo email, vì người dùng có thể đổi
  //    email trên tài khoản Google nhưng `sub` thì không đổi.
  // 3. Không thấy → tìm theo email:
  //    - Có user cùng email → LIÊN KẾT: usersService.linkGoogleIdentity(...).
  //      An toàn vì Google đã xác minh email (đã kiểm tra email_verified ở bước
  //      trước). Nếu bỏ qua bước kiểm tra đó, đây sẽ là lỗ hổng chiếm tài khoản.
  //    - Không có → tạo user mới: createUser({ passwordHash: null, emailVerified: true })
  //      rồi liên kết identity.
  // 4. status === BLOCKED → 403 AUTH_ACCOUNT_BLOCKED.
  // 5. createSession({ provider: GOOGLE }) + signAccessToken.
  throw new Error('loginWithGoogleProfile() chưa được triển khai');
}
