import { useState } from 'react';
import {
  JobTable,
  JobFormDialog,
  JobRunsTable,
  useJobs,
  useDeleteJob,
  useRunJobNow,
  useUpdateJob,
} from '@/features/scheduler';
import { DataState } from '@/shared/components/ui/DataState';
import { Modal } from '@/shared/components/ui/Modal';
import { ConfirmDialog } from '@/shared/components/ui/ConfirmDialog';
import { Button } from '@/shared/components/ui/Button';

/** Khu quản trị > Lịch tự động (Phase 13). Chỉ Super Admin. */
export default function SchedulerPage() {
  const [editingJob, setEditingJob] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [jobForRuns, setJobForRuns] = useState(null);

  const { data: jobs, isLoading, error, refetch } = useJobs();

  // TODO:
  // - <h1>Lịch tự động</h1> + nút "Tạo job".
  //
  // - Một đoạn giải thích giới hạn của hệ thống, để người vận hành không kỳ vọng sai:
  //   "Job chạy trong cùng tiến trình với API. Nếu server khởi động lại đúng lúc
  //   job đang chạy, lượt đó bị bỏ qua và sẽ chạy vào lần hẹn giờ tiếp theo."
  //
  // - <DataState> + <JobTable jobs={jobs} onEdit={setEditingJob}
  //     onDelete={setJobToDelete} onRunNow={...} onToggle={...}
  //     onViewRuns={setJobForRuns} />
  //
  // - <JobFormDialog isOpen={isCreating || !!editingJob} job={editingJob}
  //     onClose={() => { setIsCreating(false); setEditingJob(null); }} />
  //
  // - <Modal> bọc <JobRunsTable jobId={jobForRuns?.id} /> khi xem lịch sử.
  //
  // - ConfirmDialog xoá job: nói rõ lịch sử chạy cũng sẽ mất theo.
  //
  // - Nút bật/tắt gọi useUpdateJob({ id, enabled: !job.enabled }) — không cần mở
  //   form chỉ để bật/tắt.
  return null;
}
