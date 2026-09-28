import { VerificationTokenModel, TokenTypes } from './verificationToken.model.js';
import { createOneTimeToken, hashToken } from '../../shared/utils/token.js';
import { env } from '../../shared/config/env.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';
import { badRequest } from '../../shared/errors/AppError.js';

/**
 * Nghiệp vụ token dùng một lần, dùng chung cho verify email / magic link /
 * reset password. Tách riêng file này để ba luồng không copy cùng một đoạn
 * "sinh token → lưu hash → kiểm tra → đánh dấu đã dùng".
 */

/** Thời hạn theo từng loại, lấy từ env. */
const TTL_MINUTES = {
  [TokenTypes.EMAIL_VERIFY]: () => env.VERIFY_EMAIL_TTL_MINUTES,
  [TokenTypes.MAGIC_LINK]: () => env.MAGIC_LINK_TTL_MINUTES,
  [TokenTypes.PASSWORD_RESET]: () => env.RESET_PASSWORD_TTL_MINUTES,
};

/**
 * Sinh token mới và lưu hash vào DB.
 *
 * @param {object} params
 * @param {string} params.type một trong TokenTypes
 * @param {string} params.email
 * @param {string | null} [params.userId]
 * @param {string} [params.requestIp]
 * @returns {Promise<string>} token THÔ để nhúng vào link email (không lưu ở đâu khác)
 */
export async function issueToken({ type, email, userId = null, requestIp = '' }) {
  // TODO:
  // - Vô hiệu các token cùng loại còn hiệu lực của email này (updateMany đặt
  //   consumedAt = now). Vì sao: người dùng bấm "gửi lại" 3 lần thì chỉ link mới
  //   nhất nên dùng được, tránh nhiều link sống song song.
  // - { token, tokenHash } = createOneTimeToken()
  // - expiresAt = now + TTL_MINUTES[type]() phút
  // - create({ tokenHash, type, user: userId, email, expiresAt, requestIp })
  // - Trả về `token` thô.
  throw new Error('issueToken() chưa được triển khai');
}

/**
 * Kiểm tra và TIÊU THỤ token (chỉ dùng được một lần).
 *
 * @param {object} params
 * @param {string} params.token token thô từ link
 * @param {string} params.type loại mong đợi
 * @returns {Promise<{ email: string, userId: string | null }>}
 */
export async function consumeToken({ token, type }) {
  // TODO:
  // - tokenHash = hashToken(token)
  // - Dùng MỘT lệnh nguyên tử để tìm và đánh dấu đã dùng cùng lúc:
  //     findOneAndUpdate(
  //       { tokenHash, type, consumedAt: null, expiresAt: { $gt: new Date() } },
  //       { $set: { consumedAt: new Date() } },
  //       { new: false }
  //     )
  //   VÌ SAO NGUYÊN TỬ: nếu "tìm → kiểm tra → cập nhật" thành 3 bước riêng, hai
  //   request bấm link cùng lúc đều qua được và token dùng được 2 lần.
  // - Kết quả null → phân biệt lý do để báo lỗi rõ ràng: tìm lại theo tokenHash,
  //   nếu có mà consumedAt != null → TOKEN_ALREADY_USED;
  //   nếu có mà hết hạn → TOKEN_EXPIRED; không có → TOKEN_INVALID.
  // - Trả { email, userId }.
  throw new Error('consumeToken() chưa được triển khai');
}

/**
 * Dựng link gửi trong email. Tập trung ở đây để tất cả link trỏ đúng domain
 * frontend (env.WEB_ORIGIN), không hard-code localhost trong template.
 *
 * @param {object} params
 * @param {string} params.type
 * @param {string} params.token
 * @returns {string}
 */
export function buildActionUrl({ type, token }) {
  // TODO: map type → path ở frontend:
  //   EMAIL_VERIFY   → `${env.WEB_ORIGIN}/xac-minh-email?token=...`
  //   MAGIC_LINK     → `${env.WEB_ORIGIN}/dang-nhap/magic?token=...`
  //   PASSWORD_RESET → `${env.WEB_ORIGIN}/dat-lai-mat-khau?token=...`
  // Nhớ encodeURIComponent(token).
  // Các path này phải khớp với ROUTES trong frontend/src/shared/constants/routes.js.
  throw new Error('buildActionUrl() chưa được triển khai');
}
