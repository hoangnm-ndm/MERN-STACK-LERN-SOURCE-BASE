import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as schedulerApi from '../api/schedulerApi';

export const schedulerKeys = {
  all: ['scheduler'],
  jobs: () => [...schedulerKeys.all, 'jobs'],
  job: (id) => [...schedulerKeys.all, 'job', id],
  runs: (id, filters) => [...schedulerKeys.all, 'runs', id, filters],
};

/** @returns {import('@tanstack/react-query').UseQueryResult} */
export function useJobs() {
  return useQuery({ queryKey: schedulerKeys.jobs(), queryFn: schedulerApi.getJobs });
}

/**
 * @param {string} jobId
 * @param {object} [filters]
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export function useJobRuns(jobId, filters = {}) {
  return useQuery({
    queryKey: schedulerKeys.runs(jobId, filters),
    queryFn: () => schedulerApi.getJobRuns({ jobId, ...filters }),
    enabled: !!jobId,
    // TODO: nếu có run đang ở trạng thái RUNNING thì bật `refetchInterval: 5000`
    // để bảng tự cập nhật; không có thì để `false` (đừng poll vô ích).
    // Dạng hàm: refetchInterval: (query) => hasRunning ? 5000 : false
  });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useCreateJob() {
  // TODO: invalidate schedulerKeys.jobs(); lỗi JOB_INVALID_CRON → setError trên
  // field cronExpression của form.
  return useMutation({ mutationFn: schedulerApi.createJob });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useUpdateJob() {
  // TODO: invalidate jobs. Dùng cho cả việc bật/tắt nhanh bằng Switch trong bảng.
  return useMutation({ mutationFn: schedulerApi.updateJob });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useDeleteJob() {
  return useMutation({ mutationFn: schedulerApi.deleteJob });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useRunJobNow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: schedulerApi.runJobNow,
    // TODO:
    // onSuccess: (jobRun) => {
    //   invalidate jobs + runs của job đó.
    //   toast hiện kết quả từ jobRun.stats, ví dụ "Đã dọn 12 ảnh" hoặc
    //   "Đã gửi 40 email, 2 lỗi" — số liệu cụ thể hữu ích hơn "Thành công".
    // }
    // onError: (error) => {
    //   error.code === 'JOB_ALREADY_RUNNING' → toast.warning('Job đang chạy,
    //   vui lòng chờ' ) chứ không phải toast.error — đây không phải lỗi hệ thống.
    // }
  });
}
