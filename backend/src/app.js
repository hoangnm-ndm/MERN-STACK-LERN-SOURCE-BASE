import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './shared/config/env.js';
import { corsOptions } from './shared/config/cors.js';
import { globalLimiter } from './shared/middlewares/rateLimit.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import { notFound } from './shared/middlewares/notFound.js';
import { apiRouter } from './routes/index.js';

/**
 * Tạo Express app: middleware + routes + error handler.
 *
 * File này KHÔNG gọi `listen` và KHÔNG kết nối DB — đó là việc của server.js.
 * Nhờ tách vậy, Supertest import được `app` để test HTTP mà không cần mở port.
 *
 * @returns {import('express').Express}
 */
export function createApp() {
  const app = express();

  // TODO: gắn theo đúng thứ tự dưới đây (thứ tự middleware quyết định hành vi):
  //
  // 1. app.set('trust proxy', 1) — chỉ khi deploy sau reverse proxy, để rate
  //    limit và req.ip đọc đúng IP thật từ X-Forwarded-For.
  // 2. helmet()
  // 3. cors(corsOptions)
  // 4. express.json({ limit: '100kb' }) — giới hạn body; upload file KHÔNG đi
  //    qua đây mà dùng presigned URL lên R2.
  // 5. express.urlencoded({ extended: true, limit: '100kb' })
  // 6. cookieParser() — cần để đọc cookie refresh token
  // 7. globalLimiter
  // 8. app.use(env.API_PREFIX, apiRouter)
  // 9. app.use(notFound)      ← sau toàn bộ route
  // 10. app.use(errorHandler) ← BẮT BUỘC cuối cùng, nếu không lỗi sẽ không được xử lý

  return app;
}
