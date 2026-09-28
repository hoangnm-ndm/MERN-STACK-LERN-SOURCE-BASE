import { http, HttpResponse } from 'msw';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

/**
 * Handler MSW mặc định — mô phỏng backend ở trạng thái "bình thường".
 *
 * Test nào cần trường hợp khác (lỗi 401, danh sách rỗng, validation error) thì
 * ghi đè trong chính test đó bằng `server.use(...)`, đừng sửa file này — sửa ở
 * đây sẽ ảnh hưởng mọi test khác.
 *
 * Response PHẢI đúng hình dạng chuẩn của backend: { success, message?, data }
 * và { success, data, meta } cho danh sách. Mock sai hình dạng thì test xanh
 * nhưng code thật vẫn vỡ.
 */
export const handlers = [
  // TODO: khai báo các handler cần dùng, ví dụ:
  //
  // http.post(`${API}/auth/login`, async ({ request }) => {
  //   const body = await request.json();
  //   if (body.password !== 'Password123') {
  //     return HttpResponse.json(
  //       { success: false, error: { code: 'AUTH_INVALID_CREDENTIALS',
  //         message: 'Email hoặc mật khẩu không đúng' } },
  //       { status: 401 },
  //     );
  //   }
  //   return HttpResponse.json({ success: true, data: {
  //     user: { id: '1', name: 'Test', email: body.email, role: 'USER', status: 'ACTIVE' },
  //     accessToken: 'fake-token',
  //   } });
  // }),
  //
  // http.get(`${API}/users/me`, () => HttpResponse.json({ success: true, data: {...} })),
  // http.post(`${API}/auth/refresh`, () => HttpResponse.json({ success: true, data: {...} })),
  // http.get(`${API}/sessions`, () => HttpResponse.json({ success: true, data: [] })),
  // http.get(`${API}/settings/public`, () => HttpResponse.json({ success: true, data: {
  //   allowRegistration: true, allowPasswordLogin: true, allowMagicLink: true,
  //   allowGoogleLogin: true, maintenanceMode: false,
  // } })),
];
