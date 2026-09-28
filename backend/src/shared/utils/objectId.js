import { z } from 'zod';
import mongoose from 'mongoose';

/**
 * Validate ObjectId ở biên API.
 *
 * Chặn sớm ở đây để tránh `CastError` bắn ra từ tầng DB (thông điệp lỗi của
 * Mongoose lộ chi tiết nội bộ và khó hiểu với người dùng).
 *
 * Dùng trong Zod schema của params:
 *   export const getUserParams = z.object({ id: objectIdSchema });
 */
export const objectIdSchema = z
  .string()
  .refine((value) => mongoose.isValidObjectId(value), { message: 'ID không hợp lệ' });

/**
 * @param {string} value
 * @returns {import('mongoose').Types.ObjectId}
 */
export function toObjectId(value) {
  // TODO: new mongoose.Types.ObjectId(value)
  throw new Error('toObjectId() chưa được triển khai');
}
