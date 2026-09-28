import { create } from 'zustand';
import { setAccessToken, setUnauthorizedHandler } from '@/shared/lib/http';

/**
 * Store phiên đăng nhập (Zustand).
 *
 * VÌ SAO DÙNG ZUSTAND CHO CHỖ NÀY mà không dùng TanStack Query: đây là client
 * state (ai đang đăng nhập, token nào) chứ không phải dữ liệu server có thể
 * refetch. Ngược lại, KHÔNG được copy danh sách user/media vào store — đó là
 * server state, để Query lo.
 *
 * Access token KHÔNG lưu trong store persist/localStorage. Nó nằm trong bộ nhớ
 * của module http.js. Store chỉ giữ thông tin user để giao diện hiển thị.
 *
 * @typedef {object} AuthState
 * @property {object | null} user
 * @property {boolean} isBootstrapping đang thử phục hồi phiên lúc mở app
 * @property {(user: object, accessToken: string) => void} setSession
 * @property {(user: object) => void} setUser
 * @property {() => void} clearSession
 * @property {() => Promise<void>} bootstrap
 */

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<AuthState>>} */
export const useAuthStore = create((set, get) => ({
  user: null,

  /**
   * Khởi đầu là `true`: lúc app vừa mở, ta CHƯA biết người dùng đã đăng nhập hay
   * chưa (token ở bộ nhớ đã mất sau khi F5). Nếu để `false`, ProtectedRoute sẽ
   * thấy user = null và đẩy người dùng ra trang đăng nhập mỗi lần F5.
   */
  isBootstrapping: true,

  setSession: (user, accessToken) => {
    // TODO: setAccessToken(accessToken) rồi set({ user, isBootstrapping: false })
  },

  setUser: (user) => set({ user }),

  clearSession: () => {
    // TODO: setAccessToken(null) + set({ user: null, isBootstrapping: false })
  },

  /**
   * Phục hồi phiên lúc mở app: gọi /auth/refresh bằng cookie httpOnly.
   * Gọi MỘT LẦN ở providers.jsx hoặc main.jsx.
   */
  bootstrap: async () => {
    // TODO:
    // - Gọi authApi.refresh() (dùng trực tiếp api, KHÔNG qua hook — đây không
    //   phải trong component).
    // - Thành công → setSession(user, accessToken).
    // - Thất bại (chưa đăng nhập, cookie hết hạn) → clearSession().
    //   Đây là trường hợp BÌNH THƯỜNG, không phải lỗi: đừng hiện toast lỗi,
    //   người dùng chưa đăng nhập mở trang chủ là chuyện thường.
    // - finally: set({ isBootstrapping: false }) — bắt buộc, nếu không app treo
    //   ở spinner vĩnh viễn.
  },
}));

/**
 * Nối http.js với store: khi refresh token thất bại giữa phiên, dọn store để
 * giao diện chuyển về trạng thái chưa đăng nhập.
 *
 * Đặt ở đây (ngoài component) vì chỉ cần chạy một lần khi module được nạp.
 */
setUnauthorizedHandler(() => {
  useAuthStore.getState().clearSession();
});
