import { z } from 'zod';
import { objectIdSchema } from '../../shared/utils/objectId.js';
import { JobTypes } from './scheduledJob.model.js';
import { ROLE_VALUES } from '../../shared/constants/roles.js';

/**
 * Zod schema cho module scheduler.
 *
 * `payload` trong model là Mixed nên Mongoose không kiểm được gì — đây là nơi
 * DUY NHẤT chặn payload sai. Dùng discriminated union theo `type`.
 */

export const jobIdParams = z.object({
  id: objectIdSchema,
});

/** Payload của job dọn ảnh mồ côi. */
const cleanupOrphanMediaPayload = z.object({
  /** Số ảnh xử lý mỗi lượt — chặn job chạy quá lâu trong một lần. */
  batchLimit: z.coerce.number().int().positive().max(2000).default(500),
  /** Ảnh mới hơn mốc này thì bỏ qua; không truyền thì lấy từ env. */
  graceHours: z.coerce.number().int().nonnegative().max(720).optional(),
  /** true = chỉ báo cáo, không xoá gì. Rất nên bật khi chạy thử lần đầu. */
  dryRun: z.boolean().default(false),
});

/** Payload của job gửi email theo nhóm. */
const sendEmailToGroupPayload = z.object({
  /** Tên file template trong backend/emails/, không phải nội dung HTML. */
  template: z.enum(['Announcement', 'Digest']),
  subject: z.string().trim().min(1).max(200),
  /** Nội dung chính, được truyền vào template dưới dạng props. */
  heading: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(5000),
  ctaLabel: z.string().trim().max(60).optional(),
  ctaUrl: z.string().url().optional(),

  /** Bộ lọc người nhận. */
  audience: z.object({
    role: z.enum(ROLE_VALUES).optional(),
    emailVerifiedOnly: z.boolean().default(true),
  }),
});

/**
 * Cron 5 trường. Kiểm tra sơ bộ bằng regex ở đây; `cron.validate()` trong
 * service mới là chốt cuối (regex không bắt hết mọi trường hợp sai).
 */
const cronExpressionField = z
  .string()
  .trim()
  .regex(/^(\S+\s+){4}\S+$/, 'Biểu thức cron phải có 5 trường, ví dụ: 0 3 * * *');

const baseJobFields = {
  name: z.string().trim().min(3).max(120),
  cronExpression: cronExpressionField,
  enabled: z.boolean().default(true),
};

/**
 * Body tạo job. Union theo `type` để mỗi loại job chỉ nhận đúng payload của nó —
 * gửi payload của loại khác sẽ bị từ chối ngay ở tầng validate.
 */
export const createJobBody = z.discriminatedUnion('type', [
  z.object({
    ...baseJobFields,
    type: z.literal(JobTypes.CLEANUP_ORPHAN_MEDIA),
    payload: cleanupOrphanMediaPayload,
  }),
  z.object({
    ...baseJobFields,
    type: z.literal(JobTypes.SEND_EMAIL_TO_GROUP),
    payload: sendEmailToGroupPayload,
  }),
]);

/** Cập nhật: không cho đổi `type` (payload sẽ không còn khớp). */
export const updateJobBody = z.object({
  name: z.string().trim().min(3).max(120).optional(),
  cronExpression: cronExpressionField.optional(),
  enabled: z.boolean().optional(),
  payload: z.unknown().optional(), // service validate lại theo type thật của job
});

export const listJobRunsQuery = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(50).optional(),
  status: z.enum(['RUNNING', 'SUCCESS', 'FAILED']).optional(),
});

/**
 * Validate payload theo type — service gọi khi cập nhật job đã tồn tại.
 * @param {string} type
 * @param {unknown} payload
 * @returns {object} payload đã parse
 */
export function parsePayloadByType(type, payload) {
  // TODO: switch theo type, gọi đúng schema tương ứng `.parse(payload)`.
  // Type lạ → ném Error (dấu hiệu dữ liệu trong DB không còn khớp với code).
  throw new Error('parsePayloadByType() chưa được triển khai');
}
