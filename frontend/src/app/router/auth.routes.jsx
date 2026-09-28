import { AuthLayout } from '@/layouts/AuthLayout';
import { GuestOnly } from './guards/GuestOnly';
import { ROUTES } from '@/shared/constants/routes';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage';
import { MagicLinkPage } from '@/pages/auth/MagicLinkPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { OAuthCallbackPage } from '@/pages/auth/OAuthCallbackPage';

/**
 * Nhóm route xác thực.
 *
 * Chú ý cách đặt guard: LoginPage/RegisterPage bọc trong `GuestOnly`, nhưng
 * VerifyEmailPage và ResetPasswordPage thì KHÔNG — người dùng có thể đang đăng
 * nhập ở tab khác mà vẫn cần bấm link trong email.
 */
export const authRoutes = [
  {
    element: <AuthLayout />,
    children: [
      {
        element: <GuestOnly />,
        children: [
          { path: ROUTES.AUTH.LOGIN, element: <LoginPage /> },
          { path: ROUTES.AUTH.REGISTER, element: <RegisterPage /> },
          { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
        ],
      },
      // Các trang mở từ link trong email — không chặn theo trạng thái đăng nhập.
      { path: ROUTES.AUTH.VERIFY_EMAIL, element: <VerifyEmailPage /> },
      { path: ROUTES.AUTH.MAGIC_LINK, element: <MagicLinkPage /> },
      { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPasswordPage /> },
      { path: ROUTES.AUTH.OAUTH_CALLBACK, element: <OAuthCallbackPage /> },
    ],
  },
];
