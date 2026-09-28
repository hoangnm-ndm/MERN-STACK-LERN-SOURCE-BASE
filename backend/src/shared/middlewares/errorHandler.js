import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { AppError } from '../errors/AppError.js';
import { ErrorCodes } from '../errors/errorCodes.js';
import { isProduction } from '../config/env.js';
import { logger } from '../lib/logger.js';

/**
 * Error handler DUY NHẤT của ứng dụng. Gắn cuối cùng trong app.js.
 *
 * Mọi lỗi phải đi qua đây để client luôn nhận cùng một định dạng:
 *   { success: false, error: { code, message, details? } }
 *
 * Express nhận ra đây là error handler nhờ ĐỦ 4 tham số — bỏ `next` là
 * middleware thường và lỗi sẽ không bao giờ tới.
 *
 * @type {import('express').ErrorRequestHandler}
 */
export function errorHandler(err, req, res, next) {
  // TODO: map theo thứ tự từ cụ thể đến chung:
  //
  // 1. ZodError → 400 VALIDATION_ERROR
  //    details = err.issues.map(i => ({ field: i.path.join('.'), message: i.message }))
  //
  // 2. AppError (lỗi mình chủ động ném) → dùng nguyên statusCode/code/message/details
  //
  // 3. Lỗi JWT:
  //    - TokenExpiredError      → 401 AUTH_TOKEN_EXPIRED
  //    - JsonWebTokenError      → 401 AUTH_TOKEN_INVALID
  //
  // 4. Lỗi Mongoose/MongoDB:
  //    - mongoose.Error.ValidationError → 400 VALIDATION_ERROR, details từ err.errors
  //    - mongoose.Error.CastError       → 400 VALIDATION_ERROR (nên đã chặn bằng objectIdSchema)
  //    - err.code === 11000             → 409 RESOURCE_CONFLICT, field lấy từ err.keyValue
  //      (dùng cho email trùng — thông điệp nên chung chung ở luồng đăng ký để
  //       không tiết lộ email nào đã tồn tại)
  //    - DocumentNotFoundError          → 404 RESOURCE_NOT_FOUND
  //
  // 5. Còn lại = bug → 500 INTERNAL_ERROR:
  //    - logger.error({ err, url: req.originalUrl, method: req.method }) — log ĐỦ ở server
  //    - Trả client thông điệp chung. KHÔNG trả err.message, KHÔNG trả stack,
  //      KHÔNG trả lỗi DB thô (lộ tên collection, cấu trúc truy vấn).
  //    - Chỉ khi !isProduction() mới kèm stack để dev debug.
  next(err);
}
