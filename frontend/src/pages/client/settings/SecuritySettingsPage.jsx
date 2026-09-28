import { ChangePasswordForm } from '@/features/auth';
import { useMe } from '@/features/users';
import { SettingsTabs } from './SettingsTabs';

/** Cài đặt > Bảo mật. */
export function SecuritySettingsPage() {
  const { data: user } = useMe();

  // TODO:
  // - <h1>Cài đặt</h1> + <SettingsTabs />
  // - <h2>Đổi mật khẩu</h2> + <ChangePasswordForm />
  //
  // - Tài khoản chưa có mật khẩu (đăng ký bằng Google) → thay vì form đổi mật
  //   khẩu, hiện nút "Đặt mật khẩu" gửi email đặt lại (dùng luồng forgot-password).
  //   Cách nhận biết: backend cần trả thêm cờ `hasPassword` trong /users/me.
  //   ĐÂY LÀ VIỆC CÒN THIẾU — xem CHECKLIST, mục [BE-02].
  //
  // - <h2>Tài khoản đã liên kết</h2>: liệt kê user.identities (Google), cho phép
  //   gỡ liên kết. CHẶN gỡ nếu đó là cách đăng nhập duy nhất (không có mật khẩu
  //   và chỉ có một identity) — nếu không người dùng tự khoá mình khỏi tài khoản.
  return null;
}
