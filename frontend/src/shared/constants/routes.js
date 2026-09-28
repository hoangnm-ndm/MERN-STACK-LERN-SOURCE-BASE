/**
 * Toàn bộ đường dẫn của ứng dụng, khai báo MỘT NƠI.
 *
 * Vì sao không gõ chuỗi '/admin/users' rải rác trong code: đổi đường dẫn sẽ phải
 * tìm-thay khắp dự án và chắc chắn sót chỗ nào đó; sai chính tả thì không có gì
 * báo lỗi, chỉ ra trang 404 lúc chạy.
 *
 * Các path trong nhóm AUTH phải KHỚP với `buildActionUrl()` ở
 * backend/src/modules/auth/auth.tokens.service.js — link trong email trỏ vào đây.
 */
export const ROUTES = {
  HOME: '/',

  AUTH: {
    LOGIN: '/dang-nhap',
    REGISTER: '/dang-ky',
    VERIFY_EMAIL: '/xac-minh-email',
    MAGIC_LINK: '/dang-nhap/magic',
    FORGOT_PASSWORD: '/quen-mat-khau',
    RESET_PASSWORD: '/dat-lai-mat-khau',
    OAUTH_CALLBACK: '/oauth/callback',
  },

  SETTINGS: {
    ROOT: '/cai-dat',
    PROFILE: '/cai-dat/ho-so',
    SECURITY: '/cai-dat/bao-mat',
    SESSIONS: '/cai-dat/thiet-bi',
  },

  ADMIN: {
    ROOT: '/quan-tri',
    DASHBOARD: '/quan-tri',
    USERS: '/quan-tri/nguoi-dung',
    MEDIA: '/quan-tri/thu-vien',
    SCHEDULER: '/quan-tri/lich-tu-dong',
    SYSTEM_SETTINGS: '/quan-tri/cau-hinh',
  },

  FORBIDDEN: '/khong-co-quyen',
  NOT_FOUND: '*',
};

/** Hàm dựng path có tham số — thêm vào đây khi có route dạng /:id. */
export const buildRoute = {
  /** @param {string} id */
  adminUserDetail: (id) => `${ROUTES.ADMIN.USERS}/${id}`,
  /** @param {string} id */
  adminJobRuns: (id) => `${ROUTES.ADMIN.SCHEDULER}/${id}/lich-su`,
};
