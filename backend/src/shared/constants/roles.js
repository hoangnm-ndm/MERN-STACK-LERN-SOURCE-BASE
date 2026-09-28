/**
 * Role và trạng thái tài khoản. Khai báo một nơi, dùng cho cả Mongoose enum,
 * Zod enum và middleware authorize — tránh gõ chuỗi 'admin' rải rác rồi sai chính tả.
 */
export const Roles = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  USER: 'USER',
};

/** @typedef {typeof Roles[keyof typeof Roles]} Role */

export const ROLE_VALUES = Object.values(Roles);

/** Role mà admin thường được phép gán. Super Admin không nằm trong danh sách:
 * chỉ Super Admin hiện tại mới có quyền tạo Super Admin khác (xem docs/04). */
export const ASSIGNABLE_ROLES = [Roles.ADMIN, Roles.USER];

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
};

export const USER_STATUS_VALUES = Object.values(UserStatus);

export const AuthProviders = {
  PASSWORD: 'PASSWORD',
  GOOGLE: 'GOOGLE',
  MAGIC_LINK: 'MAGIC_LINK',
};

export const AUTH_PROVIDER_VALUES = Object.values(AuthProviders);
