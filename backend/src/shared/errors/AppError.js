import { ErrorCodes } from './errorCodes.js';

/**
 * Lỗi nghiệp vụ có chủ đích (dự đoán được).
 *
 * Đây là trường hợp dùng class hợp lý: kế thừa `Error` để giữ stack trace và
 * kiểm tra được bằng `instanceof` trong errorHandler.
 *
 * Quy ước: service ném `AppError`; controller KHÔNG tự dựng JSON lỗi;
 * mọi lỗi đi qua `errorHandler` duy nhất.
 */
export class AppError extends Error {
  /**
   * @param {object} params
   * @param {number} params.statusCode HTTP status trả về client
   * @param {string} params.code mã lỗi trong ErrorCodes
   * @param {string} params.message thông điệp tiếng Việt cho người dùng
   * @param {Array<{ field: string, message: string }>} [params.details] lỗi theo field
   */
  constructor({ statusCode, code, message, details }) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true; // phân biệt với lỗi lập trình (bug) → 500
    Error.captureStackTrace?.(this, AppError);
  }
}

// Các helper dưới đây để service viết ngắn gọn: `throw notFound('Không tìm thấy người dùng')`.

/** @param {string} message @param {Array<{field: string, message: string}>} [details] */
export const badRequest = (message, details) =>
  new AppError({ statusCode: 400, code: ErrorCodes.VALIDATION_ERROR, message, details });

/** @param {string} message @param {string} [code] */
export const unauthorized = (message, code = ErrorCodes.AUTH_TOKEN_INVALID) =>
  new AppError({ statusCode: 401, code, message });

/** @param {string} message @param {string} [code] */
export const forbidden = (message, code = ErrorCodes.FORBIDDEN) =>
  new AppError({ statusCode: 403, code, message });

/** @param {string} message @param {string} [code] */
export const notFound = (message, code = ErrorCodes.RESOURCE_NOT_FOUND) =>
  new AppError({ statusCode: 404, code, message });

/** @param {string} message @param {string} [code] */
export const conflict = (message, code = ErrorCodes.RESOURCE_CONFLICT) =>
  new AppError({ statusCode: 409, code, message });
