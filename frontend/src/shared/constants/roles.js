/**
 * Role và trạng thái — phải KHỚP với backend/src/shared/constants/roles.js.
 *
 * Cố tình khai báo lại ở frontend thay vì dùng chung một package: hai app độc lập
 * về code, chỉ giao tiếp qua hợp đồng API. Đánh đổi là phải sửa hai nơi khi thêm
 * role mới — đổi lại frontend build được mà không phụ thuộc backend.
 */
export const Roles = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  USER: 'USER',
};

/** Nhãn tiếng Việt để hiển thị — đừng in thẳng 'SUPER_ADMIN' ra giao diện. */
export const ROLE_LABELS = {
  SUPER_ADMIN: 'Quản trị tối cao',
  ADMIN: 'Quản trị viên',
  USER: 'Thành viên',
};

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
};

export const STATUS_LABELS = {
  ACTIVE: 'Đang hoạt động',
  BLOCKED: 'Đã bị chặn',
};

export const AUTH_PROVIDER_LABELS = {
  PASSWORD: 'Mật khẩu',
  GOOGLE: 'Google',
  MAGIC_LINK: 'Magic link',
};

/** @param {string} role */
export const isAdminRole = (role) => role === Roles.ADMIN || role === Roles.SUPER_ADMIN;
