import { lazy, Suspense } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { RoleGuard } from './guards/RoleGuard';
import { ROUTES } from '@/shared/constants/routes';
import { Roles } from '@/shared/constants/roles';
import { FullPageSpinner } from '@/shared/components/ui/FullPageSpinner';

/**
 * Nhóm route khu quản trị.
 *
 * DÙNG `lazy()` CHO KHU NÀY: phần lớn người dùng không phải admin, tách bundle
 * để họ không phải tải code họ không bao giờ dùng.
 *
 * Hai tầng guard: ProtectedRoute (phải đăng nhập) → RoleGuard (phải đúng role).
 * Nhóm `/cau-hinh` và `/lich-tu-dong` siết thêm: chỉ SUPER_ADMIN.
 */
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const UserManagePage = lazy(() => import('@/pages/admin/UserManagePage'));
const MediaLibraryPage = lazy(() => import('@/pages/admin/MediaLibraryPage'));
const SchedulerPage = lazy(() => import('@/pages/admin/SchedulerPage'));
const SystemSettingsPage = lazy(() => import('@/pages/admin/SystemSettingsPage'));

/** @param {{ children: import('react').ReactNode }} props */
function LazyPage({ children }) {
  return <Suspense fallback={<FullPageSpinner />}>{children}</Suspense>;
}

export const adminRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGuard allowedRoles={[Roles.ADMIN, Roles.SUPER_ADMIN]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: ROUTES.ADMIN.DASHBOARD,
                element: (
                  <LazyPage>
                    <DashboardPage />
                  </LazyPage>
                ),
              },
              {
                path: ROUTES.ADMIN.USERS,
                element: (
                  <LazyPage>
                    <UserManagePage />
                  </LazyPage>
                ),
              },
              {
                path: ROUTES.ADMIN.MEDIA,
                element: (
                  <LazyPage>
                    <MediaLibraryPage />
                  </LazyPage>
                ),
              },

              // --- Chỉ Super Admin ---
              {
                element: <RoleGuard allowedRoles={[Roles.SUPER_ADMIN]} />,
                children: [
                  {
                    path: ROUTES.ADMIN.SYSTEM_SETTINGS,
                    element: (
                      <LazyPage>
                        <SystemSettingsPage />
                      </LazyPage>
                    ),
                  },
                  {
                    path: ROUTES.ADMIN.SCHEDULER,
                    element: (
                      <LazyPage>
                        <SchedulerPage />
                      </LazyPage>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
