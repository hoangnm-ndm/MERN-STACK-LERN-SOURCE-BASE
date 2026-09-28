import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore, useLogout } from '@/features/auth';
import { Avatar } from '@/shared/components/ui/Avatar';
import { ROUTES } from '@/shared/constants/routes';
import { isAdminRole, ROLE_LABELS } from '@/shared/constants/roles';

/**
 * Menu bật ra khi bấm ảnh đại diện (Phase 10).
 *
 * Nội dung menu:
 *   - Tên + email + nhãn role
 *   - Hồ sơ / Bảo mật / Thiết bị đăng nhập
 *   - "Khu quản trị" — CHỈ hiện với ADMIN và SUPER_ADMIN
 *   - Đăng xuất
 */
export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // TODO — hành vi bắt buộc để menu dùng được bằng bàn phím:
  // 1. Nút mở là <button aria-haspopup="menu" aria-expanded={isOpen}>,
  //    KHÔNG dùng <div onClick>.
  // 2. Bấm ra ngoài thì đóng: useEffect gắn listener 'mousedown' trên document,
  //    kiểm tra !menuRef.current.contains(event.target).
  //    NHỚ cleanup trong hàm return của useEffect, nếu không listener tích tụ mỗi
  //    lần component mount lại.
  // 3. Nhấn Escape thì đóng và focus quay về nút mở.
  // 4. Menu là <ul role="menu">, mỗi mục <li role="none"><Link role="menuitem">.
  //
  // - Mục "Khu quản trị" bọc trong điều kiện isAdminRole(user.role).
  //   Đây chỉ là ẩn giao diện; backend vẫn phải tự kiểm quyền.
  // - Đăng xuất dùng useLogout() — mutation của TanStack Query, có trạng thái
  //   isPending để khoá nút tránh bấm hai lần.
  return null;
}
