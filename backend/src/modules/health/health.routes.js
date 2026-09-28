import { Router } from 'express';
import { isDBConnected } from '../../shared/config/db.js';
import { sendSuccess } from '../../shared/utils/response.js';

/**
 * `GET /api/v1/health` — dùng cho uptime monitor và health check của nền tảng deploy.
 *
 * Kiểm tra cả DB, không chỉ "process còn sống": một server không kết nối được DB
 * thì với người dùng là đã chết, nhưng vẫn trả 200 nếu chỉ check process.
 */
export const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  const dbConnected = isDBConnected();
  // TODO: DB chưa kết nối → trả status 503 (kèm cùng cấu trúc body) để load
  // balancer biết ngừng đẩy traffic vào instance này.
  sendSuccess(res, {
    status: dbConnected ? 'ok' : 'degraded',
    db: dbConnected ? 'connected' : 'disconnected',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});
