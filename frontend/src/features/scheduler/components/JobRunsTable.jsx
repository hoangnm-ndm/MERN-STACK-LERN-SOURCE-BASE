import { Badge } from '@/shared/components/ui/Badge';
import { DataState } from '@/shared/components/ui/DataState';
import { Pagination } from '@/shared/components/ui/Pagination';
import { useJobRuns } from '../hooks/useScheduler';
import { formatDate } from '@/shared/lib/utils';

/**
 * Lịch sử chạy của một job (Phase 13).
 *
 * @param {object} props
 * @param {string} props.jobId
 */
export function JobRunsTable({ jobId }) {
  // TODO:
  // - useJobRuns(jobId, { page }) với `page` lưu state cục bộ (bảng này nằm
  //   trong modal nên không cần đưa lên URL).
  // - Cột: Bắt đầu | Thời lượng | Kích hoạt bởi | Trạng thái | Kết quả.
  //
  // - Cột "Kết quả" hiển thị `run.stats` — mỗi loại job có số liệu khác nhau:
  //   + CLEANUP_ORPHAN_MEDIA: 'Đã xoá 12 ảnh, giải phóng 3,4 MB'
  //   + SEND_EMAIL_TO_GROUP:  'Đã gửi 40/42 email'
  //   Viết một hàm nhỏ `formatStats(type, stats)` thay vì in JSON thô ra bảng.
  //
  // - status FAILED → hiện run.errorMessage. Đây là thông tin quan trọng nhất của
  //   cả bảng: admin vào đây chính vì muốn biết job lỗi vì sao.
  //   Message có thể dài → cho phép mở rộng hoặc hiện tooltip, đừng cắt mất.
  //
  // - stats có dryRun: true → Badge "Chạy thử" để không ai nhầm là đã xoá thật.
  return null;
}
