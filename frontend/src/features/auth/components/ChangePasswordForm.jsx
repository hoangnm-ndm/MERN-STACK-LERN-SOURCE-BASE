import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '../schemas/authSchemas';
import { useChangePassword } from '../hooks/useAuthMutations';
import { PasswordInput } from '@/shared/components/ui/PasswordInput';
import { Button } from '@/shared/components/ui/Button';

/** Form đổi mật khẩu — dùng ở trang Cài đặt > Bảo mật. */
export function ChangePasswordForm() {
  // TODO:
  // - 3 field: currentPassword, newPassword, confirmPassword (đều PasswordInput).
  // - autoComplete: 'current-password', 'new-password', 'new-password'.
  // - onSubmit: chỉ gửi { currentPassword, newPassword }.
  // - Sai mật khẩu hiện tại (401) → setError('currentPassword', ...).
  // - Thành công → toast + `reset()` form để không còn mật khẩu trong input.
  // - Nhắc người dùng: các thiết bị khác sẽ bị đăng xuất, thiết bị này vẫn giữ.
  return null;
}
