import { Navigate } from 'react-router-dom';
import { ClientLayout } from '@/layouts/ClientLayout';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { ROUTES } from '@/shared/constants/routes';
import { HomePage } from '@/pages/client/HomePage';
import { ProfileSettingsPage } from '@/pages/client/settings/ProfileSettingsPage';
import { SecuritySettingsPage } from '@/pages/client/settings/SecuritySettingsPage';
import { SessionsSettingsPage } from '@/pages/client/settings/SessionsSettingsPage';
import { ForbiddenPage } from '@/pages/common/ForbiddenPage';

/**
 * Nhóm route cho người dùng thường (khu vực "client").
 *
 * Bố cục SaaS (Phase 10): khu cài đặt cá nhân nằm dưới `/cai-dat` với menu con
 * riêng, tách biệt hoàn toàn với khu quản trị `/quan-tri`.
 */
export const clientRoutes = [
  {
    element: <ClientLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.FORBIDDEN, element: <ForbiddenPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          /** Vào `/cai-dat` thì chuyển thẳng sang tab đầu tiên. */
          { path: ROUTES.SETTINGS.ROOT, element: <Navigate to={ROUTES.SETTINGS.PROFILE} replace /> },
          { path: ROUTES.SETTINGS.PROFILE, element: <ProfileSettingsPage /> },
          { path: ROUTES.SETTINGS.SECURITY, element: <SecuritySettingsPage /> },
          { path: ROUTES.SETTINGS.SESSIONS, element: <SessionsSettingsPage /> },
        ],
      },
    ],
  },
];
