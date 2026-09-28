import * as mediaService from '../../media/media.service.js';
import { deleteObjects } from '../../../shared/lib/storage.js';
import { createLogger } from '../../../shared/lib/logger.js';

const log = createLogger('job:cleanup-orphan-media');

/**
 * Job dọn ảnh mồ côi (Phase 13).
 *
 * Dọn hai loại rác khác nhau:
 * 1. Record PENDING quá cũ — người dùng xin URL upload rồi bỏ dở. Có thể có
 *    hoặc không có file trên R2.
 * 2. Media READY nhưng không nghiệp vụ nào tham chiếu và đã quá thời gian chờ.
 *
 * Hàm này là một hàm THUẦN NGHIỆP VỤ, không biết gì về cron — nhờ vậy test được
 * bằng cách gọi trực tiếp, và admin bấm "Chạy ngay" cũng dùng chung đường này.
 *
 * @param {object} payload đã được Zod validate
 * @param {number} payload.batchLimit
 * @param {number} [payload.graceHours]
 * @param {boolean} payload.dryRun
 * @returns {Promise<{ pendingDeleted: number, orphanDeleted: number, r2Deleted: number, freedBytes: number, dryRun: boolean }>}
 */
export async function runCleanupOrphanMedia({ batchLimit, graceHours, dryRun }) {
  // TODO:
  // 1. stale = await mediaService.findStalePendingMedia()
  // 2. orphans = await mediaService.findOrphanMedia({ graceHours, limit: batchLimit })
  // 3. dryRun === true → CHỈ log và trả về số đếm, KHÔNG xoá gì.
  //    Luôn chạy dryRun trước lần thật đầu tiên: job này xoá file vĩnh viễn.
  // 4. Xoá trong DB trước, rồi gom key gọi deleteObjects (theo lô 1000).
  //    Thứ tự này giống deleteMedia() — sai thứ tự sẽ để lại record trỏ tới file
  //    đã mất, tức ảnh vỡ trên giao diện.
  // 5. Trả số liệu để scheduler.service ghi vào JobRun.stats.
  // 6. Log ở mức info kèm số lượng; một key xoá lỗi thì log warning và tiếp tục,
  //    KHÔNG để cả job dừng vì một file.
  throw new Error('runCleanupOrphanMedia() chưa được triển khai');
}
