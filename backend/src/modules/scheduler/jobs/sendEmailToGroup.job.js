import * as usersService from '../../users/users.service.js';
import { sendBulkEmail } from '../../../shared/lib/mailer.js';
import { createLogger } from '../../../shared/lib/logger.js';

const log = createLogger('job:send-email-to-group');

/**
 * Job gửi email theo lịch cho một nhóm user (Phase 13).
 *
 * @param {object} payload đã được Zod validate
 * @param {'Announcement' | 'Digest'} payload.template
 * @param {string} payload.subject
 * @param {string} payload.heading
 * @param {string} payload.body
 * @param {string} [payload.ctaLabel]
 * @param {string} [payload.ctaUrl]
 * @param {{ role?: string, emailVerifiedOnly: boolean }} payload.audience
 * @returns {Promise<{ recipients: number, sent: number, failed: number }>}
 */
export async function runSendEmailToGroup(payload) {
  // TODO:
  // 1. recipients = await usersService.findRecipients(payload.audience)
  //    Hàm đó đã tự loại user bị chặn — đừng gửi mail cho tài khoản đã khoá.
  // 2. Không có người nhận → trả { recipients: 0, sent: 0, failed: 0 } và log info.
  //    Đây KHÔNG phải lỗi, đừng ném exception (job sẽ bị đánh dấu FAILED oan).
  // 3. Nạp template tương ứng từ `../../../../emails/` theo payload.template.
  //    Dùng map tường minh { Announcement: AnnouncementEmail, Digest: DigestEmail },
  //    KHÔNG dùng import động theo chuỗi từ DB (mở đường nạp file tuỳ ý).
  // 4. Dựng danh sách message, mỗi người một bản (để chèn được tên riêng).
  // 5. result = await sendBulkEmail(messages)
  // 6. Trả số liệu cho JobRun.stats. Log số gửi được / lỗi.
  //
  // LƯU Ý VỀ QUY MÔ: cách này nạp toàn bộ người nhận vào RAM. Với vài nghìn user
  // thì ổn; hàng trăm nghìn thì phải dùng cursor và gửi theo lô, hoặc chuyển
  // sang queue để job không chiếm process quá lâu.
  throw new Error('runSendEmailToGroup() chưa được triển khai');
}
