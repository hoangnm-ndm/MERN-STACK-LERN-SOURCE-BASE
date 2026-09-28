import { z } from 'zod';
import { objectIdSchema } from '../../shared/utils/objectId.js';
import { MEDIA_KIND_VALUES, MEDIA_STATUS_VALUES } from './media.model.js';
import { ALLOWED_IMAGE_MIME_TYPES } from '../../shared/lib/storage.js';

/** Zod schema cho request của module media. */

export const mediaIdParams = z.object({
  id: objectIdSchema,
});

export const folderIdParams = z.object({
  id: objectIdSchema,
});

/**
 * Xin presigned URL. Đây là chốt kiểm soát DUY NHẤT trước khi file đi thẳng lên R2 —
 * sau khi cấp URL, backend không còn chặn được gì nữa.
 */
export const createUploadUrlBody = z.object({
  originalName: z.string().trim().min(1).max(255),

  /** Whitelist, không dùng blacklist: chỉ cho phép đúng các loại đã liệt kê. */
  mimeType: z.enum(ALLOWED_IMAGE_MIME_TYPES, { message: 'Loại file không được hỗ trợ' }),

  /**
   * Kích thước FE khai báo — dùng để từ chối sớm và để ký vào presigned URL.
   * Vẫn phải kiểm tra lại kích thước THẬT ở bước confirm: giá trị này do client
   * gửi nên không đáng tin.
   */
  size: z.coerce
    .number()
    .int()
    .positive()
    .max(50 * 1024 * 1024, 'File quá lớn'), // chặn thô ở đây, giới hạn thật lấy từ env trong service

  kind: z.enum(MEDIA_KIND_VALUES).default('LIBRARY'),
  folderId: objectIdSchema.nullable().optional(),
});

export const confirmUploadBody = z.object({
  alt: z.string().trim().max(300).optional(),
  width: z.coerce.number().int().positive().optional(),
  height: z.coerce.number().int().positive().optional(),
});

export const listMediaQuery = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  /** null/'root' = thư mục gốc; không truyền = tất cả thư mục. */
  folderId: z.union([objectIdSchema, z.literal('root')]).optional(),
  kind: z.enum(MEDIA_KIND_VALUES).optional(),
  status: z.enum(MEDIA_STATUS_VALUES).optional(),
  q: z.string().trim().max(120).optional(),
  /** Bộ lọc ảnh mồ côi — chỉ admin dùng. */
  orphanOnly: z
    .enum(['true', 'false'])
    .optional()
    .transform((value) => value === 'true'),
  sort: z.string().max(40).optional(),
});

export const updateMediaBody = z.object({
  alt: z.string().trim().max(300).optional(),
  folderId: objectIdSchema.nullable().optional(), // di chuyển sang thư mục khác
});

export const deleteMediaQuery = z.object({
  /**
   * true = gỡ hết tham chiếu rồi xoá. Mặc định false để hành động phá huỷ phải
   * được yêu cầu một cách tường minh, không xảy ra do bấm nhầm.
   */
  force: z
    .enum(['true', 'false'])
    .optional()
    .transform((value) => value === 'true'),
});

// --- Thư mục ---

export const createFolderBody = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Tên thư mục là bắt buộc')
    .max(120)
    /** Chặn ký tự dễ gây rắc rối khi ghép vào `path`. */
    .regex(/^[^/\\<>:"|?*]+$/, 'Tên thư mục chứa ký tự không hợp lệ'),
  parentId: objectIdSchema.nullable().optional(),
});

export const renameFolderBody = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[^/\\<>:"|?*]+$/, 'Tên thư mục chứa ký tự không hợp lệ'),
});

/** @typedef {z.infer<typeof createUploadUrlBody>} CreateUploadUrlInput */
/** @typedef {z.infer<typeof listMediaQuery>} ListMediaQuery */
