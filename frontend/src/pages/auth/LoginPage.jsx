import { Link } from 'react-router-dom';
import { LoginForm, GoogleLoginButton } from '@/features/auth';
import { usePublicSettings } from '@/features/settings';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Trang đăng nhập.
 *
 * Page phải MỎNG: chỉ ghép component từ features và layouts. Không gọi API trực
 * tiếp, không chứa logic nghiệp vụ. Ở đây chỉ có một việc "quyết định": hiện
 * phương thức đăng nhập nào, dựa trên cấu hình công khai.
 */
export function LoginPage() {
  const { data: settings } = usePublicSettings();

  // TODO:
  // - <h1>Đăng nhập</h1>
  // - settings?.allowPasswordLogin !== false → <LoginForm />
  // - settings?.allowMagicLink !== false → link sang ROUTES.AUTH.MAGIC_LINK
  // - settings?.allowGoogleLogin !== false → <GoogleLoginButton />
  // - settings?.allowRegistration !== false → link sang ROUTES.AUTH.REGISTER
  // - Link "Quên mật khẩu?"
  //
  // CHÚ Ý CÁCH VIẾT ĐIỀU KIỆN: dùng `!== false` chứ không phải `=== true`.
  // Lý do: khi API cấu hình lỗi hoặc đang tải, `settings` là undefined. Với
  // `=== true` thì trang đăng nhập TRỐNG KHÔNG — không ai vào được hệ thống chỉ
  // vì một request phụ thất bại. Với `!== false` thì mặc định hiện đủ, và nếu
  // phương thức đó thật sự đang tắt thì backend sẽ từ chối kèm thông điệp rõ ràng.
  // Nguyên tắc: hỏng thì hỏng theo hướng ít gây hại nhất.
  //
  // - settings?.maintenanceMode → hiện banner bảo trì kèm maintenanceMessage,
  //   nhưng VẪN cho đăng nhập (admin cần vào được để tắt chế độ bảo trì).
  return null;
}
