import { ScheduledJobModel } from './scheduledJob.model.js';
import { releaseStuckJobs, syncJobTask } from './scheduler.service.js';
import { createLogger } from '../../shared/lib/logger.js';

const log = createLogger('scheduler-bootstrap');

/**
 * Nạp toàn bộ job đang bật từ DB và hẹn giờ cho chúng.
 * `server.js` gọi hàm này SAU khi đã kết nối DB và listen thành công.
 *
 * @returns {Promise<{ registered: number, released: number }>}
 */
export async function bootstrapScheduler() {
  // TODO:
  // 1. released = await releaseStuckJobs() — dọn cờ isRunning còn sót từ lần
  //    process bị kill giữa lúc job đang chạy.
  // 2. jobs = await ScheduledJobModel.find({ enabled: true }).lean()
  // 3. Với từng job: syncJobTask(job). Một job có cron sai KHÔNG được làm cả
  //    bootstrap thất bại → bọc try/catch từng job, log rồi tiếp tục.
  // 4. Log tổng số job đã hẹn giờ.
  //
  // LƯU Ý: chỉ gọi khi env.SCHEDULER_ENABLED === true. Ở môi trường test phải
  // tắt, nếu không job chạy thật giữa lúc test và làm thay đổi dữ liệu.
  throw new Error('bootstrapScheduler() chưa được triển khai');
}
