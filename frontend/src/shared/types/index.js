/**
 * Kiểu dữ liệu dùng chung, khai báo bằng JSDoc `@typedef`.
 *
 * File này không có code chạy — nó là TÀI LIỆU mà editor đọc được. Nhờ vậy khi
 * viết `user.` trong VS Code sẽ có gợi ý field, dù dự án dùng JavaScript.
 *
 * Cách dùng ở file khác:
 *   /** @type {import('@/shared/types').User} *\/
 *
 * QUY TẮC ĐỊNH DANH: entity luôn dùng `id` (string), KHÔNG dùng `_id`.
 * Backend đã chuẩn hoá `_id` → `id` (xem backend shared/utils/serialize.js), nên
 * frontend không bao giờ phải biết tới `_id` hay `__v`. Nếu thấy `_id` lọt ra
 * frontend, đó là bug ở backend — đừng vá ở đây.
 */

/**
 * Bọc response thành công của API.
 * @template T
 * @typedef {{ success: true, message?: string, data: T }} ApiResponse
 */

/**
 * Response có phân trang.
 * @template T
 * @typedef {{ success: true, data: T[], meta: PaginationMeta }} PaginatedResponse
 */

/** @typedef {{ page: number, limit: number, total: number, totalPages: number }} PaginationMeta */

/**
 * Lỗi đã được normalizeError() chuẩn hoá.
 * @typedef {{ code: string, message: string, details?: Array<{ field: string, message: string }>, status?: number }} ApiError
 */

/**
 * @typedef {object} Media
 * @property {string} id
 * @property {string} url URL công khai để hiển thị
 * @property {string} originalName
 * @property {string} mimeType
 * @property {number} size byte
 * @property {number | null} width
 * @property {number | null} height
 * @property {string} alt
 * @property {'AVATAR' | 'LIBRARY'} kind
 * @property {'PENDING' | 'READY'} status
 * @property {string | null} folder id thư mục, null = gốc
 * @property {string} createdAt
 */

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'SUPER_ADMIN' | 'ADMIN' | 'USER'} role
 * @property {'ACTIVE' | 'BLOCKED'} status
 * @property {Media | string | null} avatarMedia object khi được populate, id khi không
 * @property {string | null} emailVerifiedAt
 * @property {string | null} lastLoginAt
 * @property {Array<{ provider: string, email: string, linkedAt: string }>} [identities]
 * @property {string} createdAt
 */

/**
 * @typedef {object} Session
 * @property {string} id
 * @property {'PASSWORD' | 'GOOGLE' | 'MAGIC_LINK'} provider
 * @property {string} userAgent
 * @property {string} ip
 * @property {string} lastUsedAt
 * @property {string} createdAt
 * @property {boolean} isCurrent
 */

/**
 * @typedef {object} SystemSettings
 * @property {boolean} allowRegistration
 * @property {boolean} allowPasswordLogin
 * @property {boolean} allowMagicLink
 * @property {boolean} allowGoogleLogin
 * @property {boolean} requireEmailVerification
 * @property {boolean} maintenanceMode
 * @property {string} maintenanceMessage
 * @property {string} updatedAt
 */

/**
 * @typedef {object} ScheduledJob
 * @property {string} id
 * @property {string} name
 * @property {'CLEANUP_ORPHAN_MEDIA' | 'SEND_EMAIL_TO_GROUP'} type
 * @property {string} cronExpression
 * @property {boolean} enabled
 * @property {object} payload cấu trúc tuỳ theo `type`
 * @property {string | null} lastRunAt
 * @property {'RUNNING' | 'SUCCESS' | 'FAILED' | null} lastStatus
 * @property {boolean} isRunning
 * @property {boolean} [isRegistered] đang thực sự được hẹn giờ trong process
 */

/**
 * @typedef {object} JobRun
 * @property {string} id
 * @property {string} job
 * @property {'RUNNING' | 'SUCCESS' | 'FAILED'} status
 * @property {string} startedAt
 * @property {string | null} finishedAt
 * @property {number | null} durationMs
 * @property {object} stats
 * @property {string | null} errorMessage
 * @property {'CRON' | 'MANUAL'} triggeredBy
 */

export {};
