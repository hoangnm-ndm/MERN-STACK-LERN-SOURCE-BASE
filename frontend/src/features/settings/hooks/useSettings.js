import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as settingsApi from '../api/settingsApi';

export const settingsKeys = {
  all: ['settings'],
  public: () => [...settingsKeys.all, 'public'],
  admin: () => [...settingsKeys.all, 'admin'],
};

/**
 * Cấu hình công khai. Trang đăng nhập dùng để biết nên hiện phương thức nào.
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export function usePublicSettings() {
  return useQuery({
    queryKey: settingsKeys.public(),
    queryFn: settingsApi.getPublicSettings,
    /** Cấu hình rất ít đổi, cache 5 phút để trang đăng nhập không gọi lại liên tục. */
    staleTime: 5 * 60_000,
    /**
     * Lỗi ở đây KHÔNG được làm trang đăng nhập không dùng được.
     * Xem cách xử lý ở LoginPage: mất cấu hình thì hiện đủ mọi phương thức, để
     * backend từ chối nếu phương thức đó đang tắt.
     */
    retry: 1,
  });
}

/** @returns {import('@tanstack/react-query').UseQueryResult} */
export function useAdminSettings() {
  return useQuery({
    queryKey: settingsKeys.admin(),
    queryFn: settingsApi.getSettings,
    /** Trang quản trị phải thấy giá trị thật, không lấy từ cache. */
    staleTime: 0,
  });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsApi.updateSettings,
    // TODO:
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: settingsKeys.all });
    //   ↑ invalidate CẢ `public`: tắt Google login ở trang quản trị thì trang
    //     đăng nhập phải ẩn nút ngay, không chờ cache hết hạn.
    //   toast.success('Đã cập nhật cấu hình');
    // }
    // onError: (error) => toast.error(error.message)
    //   Lỗi hay gặp: "Phải giữ ít nhất một phương thức đăng nhập" — backend chặn
    //   để hệ thống không tự khoá cửa. Hiện nguyên văn thông điệp đó.
  });
}
