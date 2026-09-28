import 'dotenv/config';
import { z } from 'zod';

/**
 * Nguồn sự thật duy nhất cho biến môi trường.
 * Nguyên tắc: validate một lần lúc khởi động, sai thì thoát ngay (fail fast).
 * Nơi khác trong code chỉ `import { env }`, KHÔNG đọc `process.env` trực tiếp.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  API_PREFIX: z.string().startsWith('/').default('/api/v1'),
  WEB_ORIGIN: z.string().url(),

  MONGODB_URI: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('30d'),

  VERIFY_EMAIL_TTL_MINUTES: z.coerce.number().int().positive().default(60),
  MAGIC_LINK_TTL_MINUTES: z.coerce.number().int().positive().default(15),
  RESET_PASSWORD_TTL_MINUTES: z.coerce.number().int().positive().default(30),

  RESEND_API_KEY: z.string().min(1),
  MAIL_FROM: z.string().min(1),

  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().url(),

  R2_ACCOUNT_ID: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET: z.string().min(1),
  R2_PUBLIC_BASE_URL: z.string().url(),
  R2_PRESIGN_TTL_SECONDS: z.coerce.number().int().positive().default(300),
  UPLOAD_MAX_SIZE_MB: z.coerce.number().int().positive().default(5),

  SCHEDULER_ENABLED: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  SCHEDULER_TIMEZONE: z.string().default('Asia/Ho_Chi_Minh'),
  ORPHAN_MEDIA_GRACE_HOURS: z.coerce.number().int().nonnegative().default(24),
});

/**
 * Parse `process.env` theo schema, in lỗi dễ đọc rồi `process.exit(1)` nếu sai.
 *
 * TODO:
 * - `envSchema.safeParse(process.env)`.
 * - Nếu `!success`: log từng `issue.path` + `issue.message` (KHÔNG log giá trị
 *   vì có thể là secret), rồi `process.exit(1)`.
 * - Trả về `data`.
 * @returns {z.infer<typeof envSchema>}
 */
function loadEnv() {
  // TODO: triển khai theo mô tả ở trên.
  throw new Error('loadEnv() chưa được triển khai');
}

export const env = loadEnv();

export const isProduction = () => env.NODE_ENV === 'production';
export const isTest = () => env.NODE_ENV === 'test';
