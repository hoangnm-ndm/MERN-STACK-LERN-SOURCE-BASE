import {
  ScheduledJobModel,
  JobRunModel,
  JobTypes,
  JobRunStatus,
} from './scheduledJob.model.js';
import { parsePayloadByType } from './scheduler.schema.js';
import { runCleanupOrphanMedia } from './jobs/cleanupOrphanMedia.job.js';
import { runSendEmailToGroup } from './jobs/sendEmailToGroup.job.js';
import { registerTask, unregisterTask, isValidCronExpression } from '../../shared/lib/scheduler.js';
import { badRequest, conflict, notFound } from '../../shared/errors/AppError.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';
import { resolvePagination, buildPaginationMeta } from '../../shared/utils/pagination.js';
import { toApi } from '../../shared/utils/serialize.js';
import { createLogger } from '../../shared/lib/logger.js';

const log = createLogger('scheduler-service');

/**
 * Nghiệp vụ scheduler: CRUD job + thực thi job + ghi lịch sử.
 *
 * Map từ `type` trong DB sang hàm xử lý. Dùng map tường minh thay vì import động
 * theo chuỗi lấy từ DB — dữ liệu trong DB không nên quyết định file nào được nạp.
 * @type {Record<string, (payload: object) => Promise<object>>}
 */
const JOB_HANDLERS = {
  [JobTypes.CLEANUP_ORPHAN_MEDIA]: runCleanupOrphanMedia,
  [JobTypes.SEND_EMAIL_TO_GROUP]: runSendEmailToGroup,
};

/**
 * @returns {Promise<object[]>}
 */
export async function listJobs() {
  // TODO: find().sort({ createdAt: -1 }).lean() → map toApi.
  // Bổ sung `isRegistered` bằng listRegisteredTaskIds() để admin thấy job nào
  // đang thực sự được hẹn giờ — lệch giữa DB và registry là dấu hiệu cần restart.
  throw new Error('listJobs() chưa được triển khai');
}

/**
 * @param {string} jobId
 * @returns {Promise<object>}
 */
export async function getJobById(jobId) {
  // TODO: findById + lean + toApi; null → notFound('Không tìm thấy job').
  throw new Error('getJobById() chưa được triển khai');
}

/**
 * @param {object} params
 * @param {object} params.input đã qua createJobBody
 * @param {string} params.actorId
 * @returns {Promise<object>}
 */
export async function createJob({ input, actorId }) {
  // TODO:
  // 1. !isValidCronExpression(input.cronExpression) → throw badRequest(..., JOB_INVALID_CRON).
  //    Zod chỉ kiểm được "có 5 trường", đây mới là kiểm tra thật.
  // 2. create(...) — bắt 11000 (trùng name) → conflict.
  // 3. enabled === true → syncJobTask(job) để job có hiệu lực NGAY, không phải
  //    chờ restart server.
  throw new Error('createJob() chưa được triển khai');
}

/**
 * @param {object} params
 * @param {string} params.jobId
 * @param {object} params.input
 * @returns {Promise<object>}
 */
export async function updateJob({ jobId, input }) {
  // TODO:
  // 1. Lấy job hiện tại (404 nếu không có).
  // 2. input.payload có → parsePayloadByType(job.type, input.payload).
  //    Không cho đổi `type`, nên payload luôn validate theo type cũ.
  // 3. input.cronExpression có → isValidCronExpression.
  // 4. Update với { new: true, runValidators: true }.
  // 5. syncJobTask(updated) — enabled → đăng ký lại với cron mới; disabled →
  //    unregisterTask. Bỏ bước này thì DB đổi mà job vẫn chạy theo giờ cũ.
  throw new Error('updateJob() chưa được triển khai');
}

/**
 * @param {string} jobId
 * @returns {Promise<void>}
 */
export async function deleteJob(jobId) {
  // TODO: unregisterTask(jobId) TRƯỚC rồi mới deleteOne — xoá trong DB trước mà
  // task vẫn nằm trong registry thì job tiếp tục chạy với cấu hình đã mất.
  throw new Error('deleteJob() chưa được triển khai');
}

/**
 * Đăng ký / huỷ đăng ký cron task cho khớp với trạng thái trong DB.
 *
 * @param {object} job document job
 * @returns {void}
 */
export function syncJobTask(job) {
  // TODO:
  // - job.enabled === false → unregisterTask(job.id) rồi return.
  // - Ngược lại → registerTask({ jobId: job.id, expression: job.cronExpression,
  //     handler: () => executeJob({ jobId: job.id, triggeredBy: 'CRON' }) })
  //   Truyền jobId thay vì cả object job: handler sẽ đọc lại cấu hình MỚI NHẤT
  //   từ DB mỗi lần chạy, không dùng bản chụp cũ từ lúc đăng ký.
}

/**
 * Thực thi một job: đặt cờ chống chạy trùng, gọi handler, ghi JobRun.
 *
 * @param {object} params
 * @param {string} params.jobId
 * @param {'CRON' | 'MANUAL'} params.triggeredBy
 * @returns {Promise<object>} JobRun đã ghi
 */
export async function executeJob({ jobId, triggeredBy }) {
  // TODO — khung xử lý, để ý phần bảo đảm luôn nhả cờ:
  //
  // 1. KHOÁ NGUYÊN TỬ chống chạy trùng:
  //      job = await ScheduledJobModel.findOneAndUpdate(
  //        { _id: jobId, isRunning: false },
  //        { $set: { isRunning: true, runningSince: new Date() } },
  //        { new: true },
  //      )
  //    null → job đang chạy → throw conflict(..., JOB_ALREADY_RUNNING).
  //    Phải là MỘT lệnh: "đọc rồi kiểm tra rồi ghi" tách rời sẽ để hai lượt cùng vào.
  //
  // 2. Tạo JobRun status RUNNING, startedAt = now.
  //
  // 3. try {
  //      handler = JOB_HANDLERS[job.type]  (không có → ném Error, dữ liệu lệch code)
  //      stats = await handler(job.payload)
  //      → cập nhật JobRun: SUCCESS, finishedAt, durationMs, stats
  //    } catch (error) {
  //      → cập nhật JobRun: FAILED, errorMessage = error.message (KHÔNG lưu stack)
  //      → log.error({ err: error, jobId })
  //      → KHÔNG ném lại nếu là CRON (cron không ai bắt lỗi → unhandledRejection);
  //        nếu là MANUAL thì ném lại để admin thấy lỗi ngay trên giao diện.
  //    } finally {
  //      → BẮT BUỘC nhả cờ: $set { isRunning: false, runningSince: null },
  //        cập nhật lastRunAt + lastStatus.
  //        Thiếu finally là job kẹt cờ vĩnh viễn và không bao giờ chạy lại.
  //    }
  throw new Error('executeJob() chưa được triển khai');
}

/**
 * Lịch sử chạy của một job.
 *
 * @param {object} params
 * @param {string} params.jobId
 * @param {{ page?: number, limit?: number, status?: string }} params.query
 * @returns {Promise<{ items: object[], meta: import('../../shared/utils/pagination.js').PaginationMeta }>}
 */
export async function listJobRuns({ jobId, query }) {
  // TODO: find({ job: jobId, ...status }).sort({ startedAt: -1 }) + phân trang + toApi.
  throw new Error('listJobRuns() chưa được triển khai');
}

/**
 * Giải phóng các job bị kẹt cờ `isRunning` do process bị kill giữa lúc chạy.
 * Gọi lúc khởi động (bootstrap).
 *
 * @param {number} [stuckAfterMinutes]
 * @returns {Promise<number>} số job được giải phóng
 */
export async function releaseStuckJobs(stuckAfterMinutes = 60) {
  // TODO: updateMany({ isRunning: true, runningSince: { $lt: cutoff } },
  //   { isRunning: false, runningSince: null, lastStatus: FAILED })
  // Log warning vì đây là dấu hiệu job bị gián đoạn bất thường.
  throw new Error('releaseStuckJobs() chưa được triển khai');
}
