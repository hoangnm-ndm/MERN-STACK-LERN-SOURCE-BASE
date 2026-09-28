import { Link, NavLink } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Header dùng chung cho cả khu client và admin.
 *
 * @param {object} props
 * @param {'client' | 'admin'} [props.variant]
 */
export function AppHeader({ variant = 'client' }) {
  // TODO:
  // - user = useAuthStore(state => state.user)
  // - <header> chứa: logo (<Link to={ROUTES.HOME}>), menu điều hướng, và bên phải:
  //   - Chưa đăng nhập → nút "Đăng nhập" / "Đăng ký".
  //   - Đã đăng nhập  → <UserMenu /> (Phase 10).
  //
  // ĐIỀU HƯỚNG PHẢI ĐÚNG THẺ:
  //   <nav><ul><li><NavLink to="...">Mục</NavLink></li></ul></nav>
  // `li` chỉ là khung chứa, bên trong BẮT BUỘC là NavLink/Link.
  // Nếu đặt onClick lên <li> hoặc <div> thì mất: mở tab mới, Tab bằng bàn phím,
  // screen reader đọc là link, và SEO.
  //
  // - NavLink tự có `isActive` để tô sáng mục đang xem — không cần tự so useLocation.
  return null;
}
