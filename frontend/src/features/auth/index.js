/**
 * API công khai của feature auth.
 *
 * Feature khác và các page CHỈ import từ file này, không chọc vào đường dẫn nội
 * bộ (`features/auth/api/authApi`). Nhờ vậy sắp xếp lại bên trong feature không
 * làm hỏng chỗ khác.
 */
export { useAuthStore } from './store/authStore';
export {
  useLogin,
  useLogout,
  useRegister,
  useVerifyEmail,
  useRequestMagicLink,
  useConsumeMagicLink,
  useForgotPassword,
  useResetPassword,
  useChangePassword,
} from './hooks/useAuthMutations';
export { getGoogleAuthUrl } from './api/authApi';
export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';
export { GoogleLoginButton } from './components/GoogleLoginButton';
export { MagicLinkForm } from './components/MagicLinkForm';
export { ChangePasswordForm } from './components/ChangePasswordForm';
