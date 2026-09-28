import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import * as authApi from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Các mutation của feature auth. Mỗi endpoint một hook.
 *
 * Component chỉ gọi `const { mutate, isPending } = useLogin()` — không tự quản lý
 * loading/error bằng useState, không gọi api trực tiếp.
 */

/**
 * Đăng nhập bằng mật khẩu.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: authApi.login,
    // TODO:
    // onSuccess: ({ user, accessToken }) => {
    //   setSession(user, accessToken);
    //   toast.success('Đăng nhập thành công');
    //   navigate(location.state?.from?.pathname ?? ROUTES.HOME, { replace: true });
    //   ↑ quay lại đúng trang người dùng định vào (ProtectedRoute đã lưu vào state)
    // }
    // KHÔNG cần onError hiện toast nếu form đã map lỗi vào field — hiện cả hai
    // là thông báo trùng lặp, gây rối.
  });
}

/**
 * Đăng ký. Sau khi thành công KHÔNG tự đăng nhập — phải xác minh email trước.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export function useRegister() {
  // TODO: mutationFn: authApi.register
  // onSuccess: chuyển sang trang "kiểm tra hộp thư của bạn" (có thể là state của
  // RegisterPage) kèm email vừa đăng ký để hiện nút "gửi lại".
  return useMutation({ mutationFn: authApi.register });
}

/**
 * Đăng xuất.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: authApi.logout,
    // TODO:
    // onSettled: () => {
    //   clearSession();
    //   queryClient.clear();   ← BẮT BUỘC: không xoá cache thì người đăng nhập
    //   navigate(ROUTES.AUTH.LOGIN)   tiếp theo trên cùng máy sẽ thấy dữ liệu
    // }                              của người trước trong khoảnh khắc đầu.
    //
    // Dùng `onSettled` chứ không `onSuccess`: request logout lỗi (mất mạng) thì
    // vẫn phải dọn phiên ở máy người dùng.
  });
}

/**
 * Gửi link đăng nhập không cần mật khẩu.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export function useRequestMagicLink() {
  // TODO: mutationFn: authApi.requestMagicLink
  // onSuccess: toast + chuyển giao diện sang trạng thái "đã gửi, kiểm tra email".
  // Thông điệp phải trung tính ('Nếu email tồn tại, chúng tôi đã gửi link') —
  // khớp với cách backend cố tình không tiết lộ email nào đã đăng ký.
  return useMutation({ mutationFn: authApi.requestMagicLink });
}

/**
 * Đổi token magic link thành phiên đăng nhập.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export function useConsumeMagicLink() {
  // TODO: giống useLogin — setSession + điều hướng về trang chủ.
  return useMutation({ mutationFn: authApi.consumeMagicLink });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useVerifyEmail() {
  // TODO: mutationFn: authApi.verifyEmail; onSuccess → toast + chuyển sang trang đăng nhập.
  return useMutation({ mutationFn: authApi.verifyEmail });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useForgotPassword() {
  return useMutation({ mutationFn: authApi.forgotPassword });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useResetPassword() {
  // TODO: onSuccess → toast('Đặt lại mật khẩu thành công') + navigate tới trang đăng nhập.
  // Nhắc người dùng: mọi thiết bị khác đã bị đăng xuất.
  return useMutation({ mutationFn: authApi.resetPassword });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useChangePassword() {
  // TODO: onSuccess → toast + reset form.
  // Phiên hiện tại được giữ (backend có truyền exceptSessionId), nên KHÔNG
  // đăng xuất người dùng ở đây.
  return useMutation({ mutationFn: authApi.changePassword });
}
