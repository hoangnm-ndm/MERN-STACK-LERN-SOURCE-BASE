import { Play, Pencil, Trash2, History } from 'lucide-react';
import { Badge } from '@/shared/components/ui/Badge';
import { Switch } from '@/shared/components/ui/Switch';
import { Button } from '@/shared/components/ui/Button';
import { formatDate, formatRelativeTime } from '@/shared/lib/utils';
import { describeCron } from '../lib/describeCron';

/**
 * Bảng danh sách job định kỳ (Phase 13).
 *
 * @param {object} props
 * @param {object[]} props.jobs
 * @param {(job: object) => void} props.onEdit
 * @param {(job: object) => void} props.onDelete
 * @param {(job: object) => void} props.onRunNow
 * @param {(job: object) => void} props.onToggle
 * @param {(job: object) => void} props.onViewRuns
 * @param {string | null} props.runningJobId job đang chạy thủ công
 */
export function JobTable({ jobs, onEdit, onDelete, onRunNow, onToggle, onViewRuns, runningJobId }) {
  // TODO: <table> với các cột:
  //
  // | Tên | Loại | Lịch chạy | Lần chạy gần nhất | Trạng thái | Bật/Tắt | Hành động |
  //
  // - Cột "Lịch chạy": hiện describeCron(job.cronExpression) — '3:00 mỗi ngày' dễ
  //   hiểu hơn '0 3 * * *'. Để nguyên biểu thức cron trong title/tooltip cho
  //   người biết đọc.
  // - Cột "Lần chạy gần nhất": formatRelativeTime(job.lastRunAt) + Badge theo
  //   job.lastStatus (SUCCESS → success, FAILED → danger, null → 'Chưa chạy').
  // - job.isRunning → Badge "Đang chạy" và KHOÁ nút "Chạy ngay" (backend cũng
  //   chặn bằng JOB_ALREADY_RUNNING, nhưng khoá sẵn thì rõ ràng hơn).
  // - job.isRegistered === false mà enabled === true → Badge cảnh báo
  //   "Chưa được hẹn giờ": dấu hiệu server khởi động lỗi hoặc cron sai.
  // - Nút "Chạy ngay" với job xoá dữ liệu (CLEANUP_ORPHAN_MEDIA) nên mở hộp xác
  //   nhận trước, kèm gợi ý bật dryRun để chạy thử.
  return null;
}
