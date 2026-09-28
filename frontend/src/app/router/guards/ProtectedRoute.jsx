import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ROUTES } from '@/shared/constants/routes';
import { FullPageSpinner } from '@/shared/components/ui/FullPageSpinner';

/**
 * Chặn route với người chưa đăng nhập.
 *
 * Kiểm tra quyền TẬP TRUNG ở đây, không rải `if (!user) navigate(...)` trong từng
 * page — sót một page là lộ dữ liệu.
 *
 * LƯU Ý QUAN TRỌNG VỀ `isBootstrapping`: access token giữ trong bộ nhớ nên sau
 * khi F5 app chưa biết người dùng là ai, phải gọi /auth/refresh trước. Trong lúc
 * chờ, nếu coi như "chưa đăng nhập" thì mỗi lần F5 người dùng bị đẩy ra trang
 * đăng nhập — lỗi rất hay gặp. Vì vậy phải hiện spinner cho tới khi biết chắc.
 */
export function ProtectedRoute() {
  const location = useLocation();
  // TODO:
  // - Lấy { user, isBootstrapping } từ useAuthStore.
  // - isBootstrapping → return <FullPageSpinner />
  // - !user → <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />
  //   Truyền `from` để sau khi đăng nhập quay lại đúng trang đang muốn vào.
  //   `replace` để nút Back không quay lại trang bị chặn.
  // - Hợp lệ → <Outlet />
  return null;
}
