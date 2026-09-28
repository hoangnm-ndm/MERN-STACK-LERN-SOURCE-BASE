import mongoose from 'mongoose';
import { env, isProduction } from './env.js';
import { logger } from '../lib/logger.js';

/**
 * Kết nối MongoDB. Chỉ file này được gọi `mongoose.connect` — module/route
 * không tự kết nối. `server.js` gọi `connectDB()` TRƯỚC `app.listen`.
 *
 * Lưu ý quan trọng: Mongoose mặc định buffer query khi chưa kết nối, nên nếu
 * nuốt lỗi kết nối thì request sẽ treo im lặng thay vì báo lỗi.
 */

/**
 * Cấu hình toàn cục cho Mongoose.
 * BẮT BUỘC gọi trước khi bất kỳ schema/model nào được định nghĩa, nếu không
 * các option này không áp dụng cho model đã tạo.
 *
 * TODO:
 * - `mongoose.set('sanitizeFilter', true)` — chặn NoSQL operator injection
 *   (ví dụ body `{ email: { $ne: null } }` lọt vào filter).
 * - `mongoose.set('strictQuery', true)`.
 * - `mongoose.set('toJSON', { virtuals: true, versionKey: false, transform })`
 *   với transform xoá `_id` — để API luôn trả `id`, không trả `_id`/`__v`.
 *   (Bẫy: `.lean()` KHÔNG đi qua toJSON — xem shared/utils/serialize.js.)
 * - `mongoose.set('autoIndex', !isProduction())` — index ở production tạo bằng
 *   migration, không để Mongoose tự tạo lúc chạy.
 */
export function configureMongoose() {
  // TODO: triển khai theo mô tả ở trên.
}

/**
 * Mở kết nối tới MongoDB.
 *
 * TODO:
 * - Gọi `configureMongoose()` trước.
 * - `await mongoose.connect(env.MONGODB_URI)`.
 * - Log thành công (chỉ log tên database, KHÔNG log cả URI vì có credential).
 * - Gắn listener `mongoose.connection.on('error', ...)` để log lỗi phát sinh sau khi đã kết nối.
 * - Nếu connect thất bại: log rồi `process.exit(1)`.
 * @returns {Promise<void>}
 */
export async function connectDB() {
  // TODO: triển khai theo mô tả ở trên.
}

/**
 * Ngắt kết nối khi graceful shutdown.
 * @returns {Promise<void>}
 */
export async function disconnectDB() {
  // TODO: `await mongoose.disconnect()` + log.
}

/**
 * Dùng cho endpoint `GET /health`.
 * @returns {boolean} true khi readyState === 1 (connected)
 */
export function isDBConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * Chạy một khối thao tác trong transaction.
 * Cần replica set (docker-compose.yml đã dựng rs0). Nhớ truyền `{ session }`
 * vào MỌI thao tác bên trong — quên là lỗi hay gặp nhất, thao tác đó sẽ nằm
 * ngoài transaction và không được rollback.
 *
 * @template T
 * @param {(session: import('mongoose').ClientSession) => Promise<T>} work
 * @returns {Promise<T>}
 */
export async function withTransaction(work) {
  // TODO: dùng `mongoose.connection.transaction(work)` hoặc
  // startSession + session.withTransaction(work), đảm bảo endSession ở finally.
  throw new Error('withTransaction() chưa được triển khai');
}
