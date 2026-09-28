import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema } from '@/features/auth/schemas/authSchemas';
import { useForgotPassword } from '@/features/auth';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { ROUTES } from '@/shared/constants/routes';

/** Trang quên mật khẩu — nhập email để nhận link đặt lại. */
export function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);

  // TODO:
  // - Form một field email (forgotPasswordSchema).
  // - Gửi xong → setIsSent(true), hiện thông điệp TRUNG TÍNH:
  //   'Nếu email tồn tại trong hệ thống, chúng tôi đã gửi liên kết đặt lại mật khẩu.'
  //
  //   VÌ SAO PHẢI TRUNG TÍNH: backend cố tình trả thành công cả khi email không
  //   tồn tại. Nếu frontend hiện 'Email không tồn tại' thì trang này thành công
  //   cụ dò xem ai đã đăng ký — phá vỡ đúng thứ backend đang bảo vệ.
  //
  // - Nhắc link sống 30 phút.
  // - Link quay lại trang đăng nhập.
  return null;
}
