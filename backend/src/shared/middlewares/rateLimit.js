import rateLimit from 'express-rate-limit';
import { isTest } from '../config/env.js';

/**
 * Giới hạn tần suất cho các route dễ bị lạm dụng.
 *
 * Vì sao cần: không có giới hạn thì `/auth/login` là cửa cho brute-force mật khẩu,
 * còn `/auth/magic-link` và `/auth/forgot-password` bị dùng để spam email người khác
 * (và làm bay hạn mức Resend).
 *
 * Lưu ý khi deploy sau reverse proxy (nginx, Railway, Render...): phải bật
 * `app.set('trust proxy', 1)` trong app.js, nếu không mọi request trông như đến
 * từ cùng một IP và cả hệ thống bị chặn chung.
 */

/** Giới hạn chung cho toàn bộ /api — lưới an toàn thô. */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => isTest(), // test không bị chặn
  // TODO: handler → next(new AppError({ statusCode: 429, code: RATE_LIMITED, ... }))
  // để lỗi 429 cũng cùng định dạng với các lỗi khác.
});

/** Chặt hơn cho đăng nhập / đăng ký. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true, // chỉ đếm lần thất bại
  skip: () => isTest(),
  // TODO: handler như trên.
});

/** Dành cho route gửi email (magic link, quên mật khẩu, gửi lại email xác minh). */
export const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => isTest(),
  // TODO: keyGenerator nên tính theo email trong body thay vì chỉ theo IP,
  // để kẻ tấn công đổi IP vẫn không spam được một địa chỉ email cụ thể.
});
