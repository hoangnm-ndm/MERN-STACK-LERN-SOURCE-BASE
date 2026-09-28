import { describe, it, expect } from 'vitest';
import request from 'supertest';

/**
 * Test luồng auth — nhóm rủi ro cao nhất nên viết test trước.
 *
 * Supertest gọi thẳng vào `app` export từ app.js, không cần mở port.
 *
 * Thứ tự ưu tiên (theo mức rủi ro, không theo thứ tự code):
 *   1. Đăng ký / đăng nhập / xác minh email
 *   2. Phân quyền (user thường không vào được route admin)
 *   3. Refresh token rotation + phát hiện dùng lại token
 *   4. Validation trả đúng định dạng lỗi
 */

describe('POST /api/v1/auth/register', () => {
  it.todo('tạo user mới và gửi email xác minh');
  it.todo('trả 409 khi email đã tồn tại');
  it.todo('trả 400 VALIDATION_ERROR với details theo field khi mật khẩu yếu');
  it.todo('KHÔNG trả passwordHash trong response');
  it.todo('trả 403 khi Super Admin đã tắt cho phép đăng ký');
});

describe('POST /api/v1/auth/login', () => {
  it.todo('trả accessToken và set cookie refresh_token httpOnly');
  it.todo('KHÔNG trả refreshToken trong body');
  it.todo('trả cùng một mã lỗi cho email không tồn tại và sai mật khẩu');
  it.todo('trả 403 AUTH_EMAIL_NOT_VERIFIED khi chưa xác minh email');
  it.todo('trả 403 AUTH_ACCOUNT_BLOCKED khi tài khoản bị chặn');
  // Test bảo mật quan trọng: gửi { email: { $ne: null } } phải bị Zod chặn,
  // KHÔNG được trả về user đầu tiên trong DB.
  it.todo('chặn NoSQL operator injection ở trường email');
});

describe('POST /api/v1/auth/refresh', () => {
  it.todo('cấp access token mới và xoay vòng refresh token');
  it.todo('thu hồi toàn bộ phiên khi refresh token cũ được dùng lại');
  it.todo('trả 401 khi không có cookie');
});

describe('Phân quyền', () => {
  it.todo('user thường gọi GET /users nhận 403');
  it.todo('admin thường gọi GET /settings nhận 403 (chỉ Super Admin)');
  it.todo('không ai hạ quyền được Super Admin');
  it.todo('admin không tự chặn được chính mình');
});

describe('Phiên đăng nhập', () => {
  it.todo('user chỉ thấy phiên của chính mình trong GET /sessions');
  it.todo('user không thu hồi được phiên của user khác (chống IDOR)');
  it.todo('phiên đã thu hồi thì access token của nó không dùng được nữa');
});
