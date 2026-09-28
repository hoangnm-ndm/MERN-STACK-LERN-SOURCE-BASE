/**
 * Xác thực người gọi bằng access token trong header `Authorization: Bearer <token>`.
 *
 * Gắn `req.user = { id, role, sessionId }` cho các middleware/controller sau dùng.
 * Middleware này CHỈ trả lời câu hỏi "anh là ai" — câu "anh được làm gì" thuộc
 * về `authorize.js`. Tách hai việc để không phải sửa cả hai khi đổi một.
 */

/** @typedef {{ id: string, role: string, sessionId: string }} AuthUser */

/**
 * Bắt buộc phải đăng nhập.
 * @type {import('express').RequestHandler}
 */
export function authenticate(req, res, next) {
  // TODO:
  // - Đọc header Authorization, tách 'Bearer '. Không có → next(unauthorized(..., AUTH_TOKEN_MISSING)).
  // - verifyAccessToken(token) → payload { sub, sessionId, role }.
  //   Lỗi JWT cứ để ném ra, errorHandler đã phân biệt hết hạn / không hợp lệ.
  // - Kiểm tra session còn sống: gọi sessions.service.assertSessionActive(sessionId).
  //   VÌ SAO: access token là JWT stateless, thu hồi session ở Phase 3 sẽ vô nghĩa
  //   nếu không kiểm tra lại ở đây. Đánh đổi: thêm 1 truy vấn mỗi request —
  //   chấp nhận được, và có thể cache về sau.
  // - Kiểm tra user chưa bị block: nếu status === BLOCKED → 403 AUTH_ACCOUNT_BLOCKED.
  // - Gán req.user rồi next().
  next(new Error('authenticate() chưa được triển khai'));
}

/**
 * Xác thực nếu có token, không có thì vẫn cho qua (`req.user = undefined`).
 * Dùng cho route công khai nhưng hiển thị khác khi đã đăng nhập.
 * @type {import('express').RequestHandler}
 */
export function optionalAuthenticate(req, res, next) {
  // TODO: không có header → next() luôn; có header → xử lý như authenticate.
  next(new Error('optionalAuthenticate() chưa được triển khai'));
}
