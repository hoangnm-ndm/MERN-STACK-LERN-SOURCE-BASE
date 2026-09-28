import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Thanh tab dùng chung cho ba trang trong khu Cài đặt (Phase 10).
 *
 * Đặt ở `pages/client/settings/` chứ không ở `shared/` vì chỉ khu này dùng —
 * nhấc lên shared khi và chỉ khi có nơi thứ hai cần (YAGNI).
 */
const TABS = [
  { to: ROUTES.SETTINGS.PROFILE, label: 'Hồ sơ' },
  { to: ROUTES.SETTINGS.SECURITY, label: 'Bảo mật' },
  { to: ROUTES.SETTINGS.SESSIONS, label: 'Thiết bị đăng nhập' },
];

export function SettingsTabs() {
  // TODO: <nav aria-label="Cài đặt"><ul>{TABS.map(...)}</ul></nav>
  // Mỗi tab là <NavLink> — tab điều hướng phải là LINK, không phải button:
  // người dùng cần mở được tab mới và URL phải phản ánh đúng tab đang xem.
  // NavLink tự gắn class active, thêm aria-current="page" cho tab đang mở.
  return null;
}
