import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

/** Trang 403 — RoleGuard chuyển tới đây khi role không đủ. */
export function ForbiddenPage() {
  // TODO: <h1>Bạn không có quyền truy cập</h1> + <Link> về trang chủ.
  //
  // KHÔNG nói "hãy liên hệ admin để được cấp quyền" một cách vô điều kiện, và
  // KHÔNG tiết lộ trang đó làm gì — người dùng không có quyền thì cũng không cần
  // biết bên trong có gì.
  return null;
}
