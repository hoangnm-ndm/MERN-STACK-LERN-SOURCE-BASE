import { Resend } from 'resend';
import { render } from '@react-email/render';
import { env } from '../config/env.js';
import { createLogger } from './logger.js';

/**
 * Lớp bọc Resend + React Email.
 *
 * Nguyên tắc: service nghiệp vụ KHÔNG biết đang dùng Resend hay Nodemailer, nó
 * chỉ gọi `sendEmail({ to, subject, template })`. Đổi nhà cung cấp email về sau
 * chỉ cần sửa file này.
 *
 * Template nằm ở `backend/emails/*.jsx` (quy ước của React Email, xem trước
 * bằng `npm run email:dev`).
 */
const log = createLogger('mailer');

/** TODO: khởi tạo MỘT client duy nhất: new Resend(env.RESEND_API_KEY) */
const resend = null;

/**
 * @param {object} params
 * @param {string | string[]} params.to
 * @param {string} params.subject
 * @param {import('react').ReactElement} params.template component email đã truyền props
 * @param {string} [params.replyTo]
 * @returns {Promise<{ id: string }>}
 */
export async function sendEmail({ to, subject, template, replyTo }) {
  // TODO:
  // - html = await render(template)
  // - text = await render(template, { plainText: true })  ← bản text giúp tránh spam filter
  // - gọi resend.emails.send({ from: env.MAIL_FROM, to, subject, html, text, replyTo })
  // - Resend trả { data, error } chứ KHÔNG throw: phải tự kiểm tra `error`,
  //   log rồi ném AppError, nếu không lỗi gửi mail sẽ bị nuốt im lặng.
  // - Log id email đã gửi (không log nội dung, có thể chứa token trong link).
  throw new Error('sendEmail() chưa được triển khai');
}

/**
 * Gửi nhiều email trong một lần gọi (dùng cho job gửi email theo nhóm user).
 *
 * @param {Array<{ to: string, subject: string, template: import('react').ReactElement }>} messages
 * @returns {Promise<{ sent: number, failed: number, errors: Array<{ to: string, message: string }> }>}
 */
export async function sendBulkEmail(messages) {
  // TODO:
  // - Render trước rồi gọi resend.batch.send (Resend giới hạn ~100 email/lần)
  //   → chia messages thành từng lô.
  // - Một email lỗi KHÔNG được làm dừng cả lô: gom lỗi vào `errors` và tiếp tục.
  // - Trả số liệu để scheduler ghi vào lịch sử chạy job.
  throw new Error('sendBulkEmail() chưa được triển khai');
}
