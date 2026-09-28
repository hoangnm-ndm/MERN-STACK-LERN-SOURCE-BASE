import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, Link } from 'react-router-dom';
import { resetPasswordSchema } from '@/features/auth/schemas/authSchemas';
import { useResetPassword } from '@/features/auth';
import { PasswordInput } from '@/shared/components/ui/PasswordInput';
import { Button } from '@/shared/components/ui/Button';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Đặt mật khẩu mới từ link trong email.
 * URL: /dat-lai-mat-khau?token=...
 */
export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // TODO:
  // - !token → thông báo link không hợp lệ + link sang trang quên mật khẩu.
  // - Form: password + confirmPassword (resetPasswordSchema).
  //   KHÁC với VerifyEmailPage: ở đây KHÔNG tự gọi API trong useEffect. Token chỉ
  //   được tiêu thụ khi người dùng bấm submit — vì nếu tiêu thụ ngay lúc mở trang,
  //   người dùng đóng tab giữa đường là mất link mà chưa đổi được mật khẩu.
  // - onSubmit: mutate({ token, password }).
  // - Lỗi TOKEN_EXPIRED / TOKEN_INVALID → hiện rõ và dẫn sang xin link mới.
  // - Thành công → hook tự điều hướng sang trang đăng nhập; nhắc người dùng rằng
  //   mọi thiết bị đã bị đăng xuất (backend thu hồi hết phiên).
  return null;
}
