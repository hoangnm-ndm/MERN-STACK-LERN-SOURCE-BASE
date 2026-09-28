import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/authSchemas';
import { useRegister } from '../hooks/useAuthMutations';
import { Input } from '@/shared/components/ui/Input';
import { PasswordInput } from '@/shared/components/ui/PasswordInput';
import { Button } from '@/shared/components/ui/Button';

/**
 * Form đăng ký.
 *
 * @param {object} props
 * @param {(email: string) => void} props.onRegistered gọi khi thành công, để page
 *   chuyển sang màn "kiểm tra hộp thư"
 */
export function RegisterForm({ onRegistered }) {
  // TODO:
  // - useForm với zodResolver(registerSchema), defaultValues đủ 4 field.
  // - Field: name, email, password, confirmPassword (dùng PasswordInput cho 2 field mật khẩu).
  // - autoComplete: 'name', 'email', 'new-password', 'new-password'.
  // - onSubmit: bỏ `confirmPassword` trước khi gửi (backend không nhận field này;
  //   gửi thêm cũng bị Zod loại, nhưng gửi đúng thứ cần là thói quen tốt).
  // - onSuccess → onRegistered(values.email).
  // - onError → map error.details vào field như LoginForm; lỗi 409
  //   (AUTH_EMAIL_ALREADY_EXISTS) nên setError('email', ...) để hiện đúng chỗ.
  //
  // GỢI Ý TRẢI NGHIỆM: hiện chỉ báo độ mạnh mật khẩu theo từng tiêu chí của
  // registerSchema (đủ 8 ký tự / có chữ thường / chữ hoa / số), đánh dấu xanh dần
  // khi người dùng gõ — tốt hơn nhiều so với báo lỗi sau khi bấm submit.
  return null;
}
