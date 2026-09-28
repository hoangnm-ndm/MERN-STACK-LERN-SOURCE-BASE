import { z } from 'zod';

/**
 * Schema form job — phải khớp với backend/src/modules/scheduler/scheduler.schema.js.
 */

const cronField = z
  .string()
  .trim()
  .regex(/^(\S+\s+){4}\S+$/, 'Biểu thức cron phải có 5 trường, ví dụ: 0 3 * * *');

const cleanupPayload = z.object({
  batchLimit: z.coerce.number().int().positive().max(2000),
  graceHours: z.coerce.number().int().nonnegative().max(720).optional(),
  dryRun: z.boolean(),
});

const emailPayload = z.object({
  template: z.enum(['Announcement', 'Digest']),
  subject: z.string().trim().min(1, 'Nhập tiêu đề email').max(200),
  heading: z.string().trim().min(1, 'Nhập tiêu đề nội dung').max(200),
  body: z.string().trim().min(1, 'Nhập nội dung').max(5000),
  ctaLabel: z.string().trim().max(60).optional(),
  ctaUrl: z.string().url('Đường dẫn không hợp lệ').optional().or(z.literal('')),
  audience: z.object({
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'USER']).optional(),
    emailVerifiedOnly: z.boolean(),
  }),
});

/**
 * Union theo `type` — mỗi loại job chỉ nhận đúng payload của nó.
 * react-hook-form + zodResolver hiểu được discriminatedUnion, nhưng nhớ reset
 * phần payload khi người dùng đổi `type`.
 */
export const jobFormSchema = z.discriminatedUnion('type', [
  z.object({
    name: z.string().trim().min(3, 'Tên tối thiểu 3 ký tự').max(120),
    cronExpression: cronField,
    enabled: z.boolean(),
    type: z.literal('CLEANUP_ORPHAN_MEDIA'),
    payload: cleanupPayload,
  }),
  z.object({
    name: z.string().trim().min(3, 'Tên tối thiểu 3 ký tự').max(120),
    cronExpression: cronField,
    enabled: z.boolean(),
    type: z.literal('SEND_EMAIL_TO_GROUP'),
    payload: emailPayload,
  }),
]);

/** Giá trị mặc định theo loại job — dùng khi tạo mới và khi đổi `type`. */
export const JOB_DEFAULTS = {
  CLEANUP_ORPHAN_MEDIA: {
    name: '',
    cronExpression: '0 3 * * *',
    enabled: true,
    type: 'CLEANUP_ORPHAN_MEDIA',
    /** dryRun bật sẵn: job này xoá file không hoàn tác được. */
    payload: { batchLimit: 500, graceHours: 24, dryRun: true },
  },
  SEND_EMAIL_TO_GROUP: {
    name: '',
    cronExpression: '0 8 * * 1',
    enabled: true,
    type: 'SEND_EMAIL_TO_GROUP',
    payload: {
      template: 'Announcement',
      subject: '',
      heading: '',
      body: '',
      ctaLabel: '',
      ctaUrl: '',
      audience: { emailVerifiedOnly: true },
    },
  },
};

/** @typedef {z.infer<typeof jobFormSchema>} JobFormValues */
