import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ROUTES } from '@/shared/constants/routes';
import { FullPageSpinner } from '@/shared/components/ui/FullPageSpinner';

/**
 * Ngược với ProtectedRoute: chỉ cho người CHƯA đăng nhập vào.
 * Dùng cho trang đăng nhập/đăng ký — người đã đăng nhập vào đó là vô nghĩa.
 */
export function GuestOnly() {
  // TODO:
  // - isBootstrapping → <FullPageSpinner />
  // - Đã có user → <Navigate to={ROUTES.HOME} replace />
  // - Chưa có → <Outlet />
  return null;
}
