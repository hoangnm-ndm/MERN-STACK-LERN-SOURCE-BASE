import axios from 'axios';

/**
 * Instance axios DUY NHẤT của ứng dụng.
 *
 * Mọi lời gọi API đều đi qua đây, nhờ vậy 3 việc sau chỉ viết một lần:
 *   1. Gắn access token vào header.
 *   2. Gặp 401 → tự refresh token → gọi lại request cũ.
 *   3. Chuẩn hoá lỗi từ backend thành một hình dạng cố định.
 *
 * Component KHÔNG gọi axios trực tiếp. Thứ tự đúng:
 *   component → hook (features/<tên>/hooks) → hàm api (features/<tên>/api) → http
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  /** BẮT BUỘC: không có cờ này trình duyệt sẽ không gửi cookie refresh token. */
  withCredentials: true,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Access token giữ trong BỘ NHỚ (biến module), không phải localStorage.
 *
 * Vì sao: localStorage đọc được bằng JavaScript, nên một lỗ hổng XSS là lấy được
 * token. Giữ trong bộ nhớ thì tải lại trang sẽ mất token — bù lại bằng cách gọi
 * /auth/refresh lúc khởi động app (cookie httpOnly vẫn còn).
 *
 * @type {string | null}
 */
let accessToken = null;

/** @param {string | null} token */
export function setAccessToken(token) {
  accessToken = token;
}

/** @returns {string | null} */
export function getAccessToken() {
  return accessToken;
}

/** Hàm được gọi khi refresh thất bại — authStore gán vào để dọn phiên và chuyển về trang đăng nhập. */
let onUnauthorized = null;

/** @param {() => void} handler */
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

// --- Interceptor request ---
http.interceptors.request.use((config) => {
  // TODO: có accessToken → config.headers.Authorization = `Bearer ${accessToken}`
  return config;
});

// --- Interceptor response ---

/**
 * Trạng thái chống refresh nhiều lần cùng lúc.
 *
 * TÌNH HUỐNG: 3 request song song đều nhận 401. Không xử lý thì cả 3 cùng gọi
 * /auth/refresh, và vì backend xoay vòng refresh token, request thứ 2 và 3 sẽ
 * dùng token đã bị vô hiệu → bị coi là "dùng lại token" → thu hồi hết phiên,
 * người dùng bị đăng xuất oan.
 *
 * CÁCH XỬ LÝ: request đầu tiên gọi refresh, các request sau xếp vào hàng đợi và
 * cùng chờ đúng promise đó.
 *
 * @type {Promise<string> | null}
 */
// eslint-disable-next-line prefer-const -- sẽ được gán lại trong interceptor bên dưới
let refreshPromise = null;

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO:
    // 1. Không phải 401 → chuẩn hoá lỗi (normalizeError) rồi Promise.reject.
    //
    // 2. Là 401 nhưng chính request refresh bị 401, HOẶC request đã thử lại rồi
    //    (config._retried === true) → gọi onUnauthorized?.() và reject.
    //    Thiếu điều kiện này sẽ thành vòng lặp refresh vô hạn.
    //
    // 3. Là 401 lần đầu:
    //    - refreshPromise chưa có → refreshPromise = http.post('/auth/refresh')
    //        .then(res => res.data.data.accessToken)
    //        .finally(() => { refreshPromise = null })
    //    - await refreshPromise → setAccessToken(newToken)
    //    - Đánh dấu config._retried = true rồi `return http(config)`.
    //    - refresh thất bại → onUnauthorized?.() và reject.
    //
    // 4. KHÔNG thử refresh cho các route auth công khai (login, register):
    //    401 ở đó nghĩa là sai mật khẩu, không phải token hết hạn.
    return Promise.reject(normalizeError(error));
  },
);

/**
 * Chuẩn hoá lỗi thành một hình dạng cố định, khớp với response chuẩn của backend:
 *   { success: false, error: { code, message, details } }
 *
 * Nhờ vậy component chỉ cần đọc `error.code` và `error.message`, không phải
 * lần mò `error.response?.data?.error?.message` ở từng chỗ.
 *
 * @param {unknown} error
 * @returns {{ code: string, message: string, details?: Array<{ field: string, message: string }>, status?: number }}
 */
export function normalizeError(error) {
  // TODO:
  // - Có error.response → lấy response.data.error; thiếu thì dùng message chung.
  // - Lỗi mạng (không có response) → { code: 'NETWORK_ERROR',
  //     message: 'Không kết nối được tới server. Kiểm tra lại đường truyền.' }
  // - Timeout (error.code === 'ECONNABORTED') → thông điệp riêng.
  // - Luôn trả về ĐÚNG hình dạng trên, kể cả khi lỗi không rõ nguồn gốc — code
  //   phía trên tin vào hình dạng này.
  throw new Error('normalizeError() chưa được triển khai');
}
