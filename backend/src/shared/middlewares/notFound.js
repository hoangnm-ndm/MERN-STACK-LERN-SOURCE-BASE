import { notFound as notFoundError } from '../errors/AppError.js';

/**
 * Gắn sau toàn bộ route, trước errorHandler.
 * Nhờ vậy URL sai cũng trả JSON đúng định dạng thay vì trang HTML mặc định của Express.
 *
 * @type {import('express').RequestHandler}
 */
export function notFound(req, res, next) {
  next(notFoundError(`Không tìm thấy endpoint ${req.method} ${req.originalUrl}`));
}
