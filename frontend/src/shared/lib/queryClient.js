import { QueryClient } from '@tanstack/react-query';

/**
 * Cấu hình TanStack Query tập trung.
 *
 * Phân vai state trong dự án này (rất quan trọng, đừng trộn lẫn):
 * - Dữ liệu từ API        → TanStack Query (file này)
 * - State client toàn cục → Zustand (phiên đăng nhập, sidebar)
 * - State cục bộ          → useState
 * - State của form        → react-hook-form
 * - Bộ lọc, trang hiện tại → URL search params
 *
 * Lỗi hay gặp: copy dữ liệu API vào Zustand rồi tự đồng bộ. Đừng làm vậy —
 * Query đã lo cache, refetch và trạng thái loading/error.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /** 1 phút: trong khoảng này Query không gọi lại API khi component remount. */
      staleTime: 60_000,
      /** Không refetch chỉ vì người dùng chuyển tab — gây gọi API rất nhiều. */
      refetchOnWindowFocus: false,
      /**
       * Không thử lại với lỗi 4xx: sai dữ liệu hay hết quyền thì thử lại cũng
       * vẫn sai, chỉ làm người dùng chờ lâu hơn.
       */
      retry: (failureCount, error) => {
        // TODO: error.status >= 400 && error.status < 500 → false;
        // còn lại thì thử lại tối đa 2 lần.
        return false;
      },
    },
    mutations: {
      retry: 0, // KHÔNG tự thử lại mutation: có thể tạo trùng dữ liệu
    },
  },
});
