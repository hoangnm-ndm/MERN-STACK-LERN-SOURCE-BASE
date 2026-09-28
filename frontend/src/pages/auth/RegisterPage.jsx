import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm, GoogleLoginButton } from '@/features/auth';
import { usePublicSettings } from '@/features/settings';
import { ROUTES } from '@/shared/constants/routes';

/** Trang đăng ký. */
export function RegisterPage() {
  /** Email vừa đăng ký — có giá trị nghĩa là đã gửi email xác minh. */
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const { data: settings } = usePublicSettings();

  // TODO:
  // - settings?.allowRegistration === false → hiện thông báo "Hệ thống đang tạm
  //   ngừng nhận đăng ký mới" + link về trang đăng nhập. KHÔNG hiện form.
  //   (Đây là chỗ dùng `=== false` hợp lý, ngược với LoginPage: mặc định cứ cho
  //   thấy form, chỉ ẩn khi CHẮC CHẮN là đã tắt.)
  //
  // - registeredEmail có giá trị → hiện màn "Kiểm tra hộp thư":
  //   + Nói rõ đã gửi tới {registeredEmail}.
  //   + Nhắc kiểm tra cả thư mục spam.
  //   + Nút "Gửi lại email" (gọi authApi.resendVerification) có khoá 60 giây.
  //   + Link về trang đăng nhập.
  //   KHÔNG tự đăng nhập người dùng ở bước này — họ phải xác minh email trước.
  //
  // - Chưa đăng ký → <RegisterForm onRegistered={setRegisteredEmail} /> +
  //   GoogleLoginButton (đăng ký bằng Google không cần xác minh email vì Google
  //   đã xác minh).
  return null;
}
