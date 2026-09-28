import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Chặn route theo role. Dùng LỒNG BÊN TRONG ProtectedRoute (đã chắc chắn có user).
 *
 * @param {object} props
 * @param {string[]} props.allowedRoles ví dụ ['ADMIN', 'SUPER_ADMIN']
 */
export function RoleGuard({ allowedRoles }) {
  // TODO:
  // - user = useAuthStore(state => state.user)
  // - !allowedRoles.includes(user.role) → <Navigate to={ROUTES.FORBIDDEN} replace />
  //   Chuyển sang trang "không có quyền" chứ KHÔNG về trang đăng nhập: người dùng
  //   đã đăng nhập rồi, đẩy họ ra login là gây hiểu nhầm.
  // - Hợp lệ → <Outlet />
  //
  // NHẮC LẠI: đây chỉ là lớp chặn GIAO DIỆN, người dùng vẫn gọi API trực tiếp được.
  // Phân quyền thật nằm ở middleware `authorize` của backend. Guard này chỉ để
  // trải nghiệm tốt hơn, KHÔNG phải cơ chế bảo mật.
  return null;
}
