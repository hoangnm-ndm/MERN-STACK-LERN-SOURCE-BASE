import { env } from './env.js';

/**
 * CORS whitelist theo env.
 * KHÔNG dùng `origin: '*'` kèm `credentials: true` — trình duyệt sẽ chặn, và về
 * bản chất là mở cửa cho mọi site gửi cookie refresh token.
 *
 * @type {import('cors').CorsOptions}
 */
export const corsOptions = {
  origin: [env.WEB_ORIGIN],
  credentials: true, // cần thiết để trình duyệt gửi cookie refresh token
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
};
