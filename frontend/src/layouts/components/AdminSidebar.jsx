import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Images, Clock, Settings } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { ROUTES } from '@/shared/constants/routes';
import { Roles } from '@/shared/constants/roles';

/**
 * Sidebar khu quản trị (Phase 10).
 *
 * Danh sách mục khai báo dạng DỮ LIỆU rồi map ra JSX — thêm mục mới chỉ cần thêm
 * một object, không phải copy khối JSX.
 */
const NAV_ITEMS = [
  { to: ROUTES.ADMIN.DASHBOARD, label: 'Tổng quan', icon: LayoutDashboard, end: true },
  { to: ROUTES.ADMIN.USERS, label: 'Người dùng', icon: Users },
  { to: ROUTES.ADMIN.MEDIA, label: 'Thư viện media', icon: Images },
  /** Hai mục dưới chỉ Super Admin thấy. */
  { to: ROUTES.ADMIN.SCHEDULER, label: 'Lịch tự động', icon: Clock, superAdminOnly: true },
  { to: ROUTES.ADMIN.SYSTEM_SETTINGS, label: 'Cấu hình hệ thống', icon: Settings, superAdminOnly: true },
];

export function AdminSidebar() {
  // TODO:
  // - user = useAuthStore(state => state.user)
  // - items = NAV_ITEMS.filter(item => !item.superAdminOnly || user.role === Roles.SUPER_ADMIN)
  // - <aside><nav><ul>{items.map(...)}</ul></nav></aside>
  //   Mỗi mục: <li key={item.to}><NavLink to={item.to} end={item.end}
  //     className={({ isActive }) => cn(base, isActive && active)}>
  //     <item.icon aria-hidden="true" /> {item.label}
  //   </NavLink></li>
  //
  // - `end: true` cho mục Tổng quan: không có nó, '/quan-tri' sẽ luôn được coi là
  //   active vì mọi path admin đều bắt đầu bằng nó.
  // - Icon phải có aria-hidden="true": nhãn chữ đã mô tả rồi, screen reader đọc
  //   thêm icon là gây nhiễu.
  return null;
}
