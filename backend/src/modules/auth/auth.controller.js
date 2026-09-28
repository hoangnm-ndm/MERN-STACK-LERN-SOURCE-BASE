import * as authService from './auth.service.js';
import * as passwordService from './auth.password.service.js';
import * as magicLinkService from './auth.magicLink.service.js';
import * as googleService from './auth.google.service.js';
import { sendSuccess, sendCreated } from '../../shared/utils/response.js';
import { REFRESH_COOKIE_NAME, refreshCookieOptions } from '../../shared/config/cookies.js';
import { env } from '../../shared/config/env.js';
import { unauthorized } from '../../shared/errors/AppError.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';

/**
 * Controller auth. Đây là tầng DUY NHẤT được biết đến cookie và redirect —
 * service không đụng tới `req`/`res`.
 */

/** Gom một chỗ việc set cookie refresh token để 4 luồng đăng nhập không lặp code. */
function setRefreshCookie(res, refreshToken, maxAgeMs) {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions(maxAgeMs));
}

/** `POST /auth/register` */
export async function register(req, res) {
  // TODO: authService.register({ input: req.body, ip: req.ip })
  // → sendCreated(res, { user }, 'Đăng ký thành công, vui lòng kiểm tra email để xác minh')
}

/** `POST /auth/login` */
export async function login(req, res) {
  // TODO:
  // - result = await authService.login({ input: req.body, userAgent: req.get('user-agent'), ip: req.ip })
  // - setRefreshCookie(res, result.refreshToken, result.refreshTokenMaxAgeMs)
  // - sendSuccess(res, { user: result.user, accessToken: result.accessToken }, 'Đăng nhập thành công')
  //   CHÚ Ý: refreshToken KHÔNG nằm trong body response — nó chỉ đi qua cookie
  //   httpOnly. Trả ra body là mất hết ý nghĩa của httpOnly.
}

/** `POST /auth/logout` */
export async function logout(req, res) {
  // TODO: authService.logout(...) → res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions(0))
  // → sendSuccess(res, null, 'Đã đăng xuất').
  // clearCookie phải dùng CÙNG `path` với lúc set, nếu không trình duyệt không xoá.
}

/** `POST /auth/refresh` */
export async function refresh(req, res) {
  // TODO:
  // - token = req.cookies[REFRESH_COOKIE_NAME]; không có → throw unauthorized(..., AUTH_TOKEN_MISSING)
  // - result = await authService.refresh({ refreshToken: token, ... })
  // - set lại cookie (token đã xoay vòng) + trả accessToken mới.
}

/** `POST /auth/verify-email` */
export async function verifyEmail(req, res) {
  // TODO: authService.verifyEmail(req.body.token) → sendSuccess(res, null, 'Xác minh email thành công')
}

/** `POST /auth/resend-verification` */
export async function resendVerification(req, res) {
  // TODO: luôn trả thông điệp trung tính: 'Nếu email tồn tại, chúng tôi đã gửi lại liên kết xác minh'
}

/** `POST /auth/forgot-password` */
export async function forgotPassword(req, res) {
  // TODO: thông điệp trung tính tương tự.
}

/** `POST /auth/reset-password` */
export async function resetPassword(req, res) {
  // TODO: passwordService.resetPassword(req.body) → sendSuccess(res, null, 'Đặt lại mật khẩu thành công')
}

/** `POST /auth/change-password` (cần đăng nhập) */
export async function changePassword(req, res) {
  // TODO: passwordService.changePassword({ userId: req.user.id, sessionId: req.user.sessionId, ...req.body })
}

/** `POST /auth/magic-link` */
export async function requestMagicLink(req, res) {
  // TODO: magicLinkService.requestMagicLink({ email: req.body.email, ip: req.ip }) + thông điệp trung tính.
}

/** `POST /auth/magic-link/consume` */
export async function consumeMagicLink(req, res) {
  // TODO: như login — set cookie + trả accessToken.
}

/** `GET /auth/google` — chuyển sang trang đồng ý của Google. */
export async function googleRedirect(req, res) {
  // TODO:
  // - { url, state } = googleService.createAuthUrl()
  // - res.cookie('oauth_state', state, { httpOnly: true, sameSite: 'lax', maxAge: 10 * 60 * 1000 })
  //   sameSite phải là 'lax' (không phải 'strict'), nếu không cookie sẽ không được
  //   gửi kèm khi Google redirect người dùng quay lại.
  // - res.redirect(url)
}

/** `GET /auth/google/callback` */
export async function googleCallback(req, res) {
  // TODO:
  // 1. req.query.error (người dùng bấm Huỷ) → redirect về
  //    `${env.WEB_ORIGIN}/dang-nhap?error=oauth_cancelled`.
  // 2. So sánh req.query.state với cookie oauth_state; không khớp → redirect kèm
  //    error=oauth_state_mismatch. Xoá cookie state sau khi dùng.
  // 3. profile = await googleService.exchangeCodeForProfile(req.query.code)
  // 4. result = await googleService.loginWithGoogleProfile({ profile, ... })
  // 5. setRefreshCookie(...) rồi redirect về `${env.WEB_ORIGIN}/oauth/callback`.
  //    Access token KHÔNG nên nhét vào URL (nó nằm trong history trình duyệt và
  //    referer header) — FE tới trang callback sẽ gọi /auth/refresh để lấy
  //    access token bằng cookie vừa set.
  // 6. Lỗi ở giữa luồng: redirect về trang đăng nhập kèm mã lỗi, ĐỪNG trả JSON —
  //    người dùng đang ở trên một tab điều hướng, không phải trong fetch.
}
