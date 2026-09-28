import { createBrowserRouter } from 'react-router-dom';
import { clientRoutes } from './client.routes';
import { adminRoutes } from './admin.routes';
import { authRoutes } from './auth.routes';
import { ErrorPage } from '@/pages/common/ErrorPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';

/**
 * Router của ứng dụng — dùng Data Router (`createBrowserRouter`) thay vì
 * `<BrowserRouter><Routes>`, vì Data Router có `errorElement`, `lazy` và loader.
 *
 * File này CHỈ hợp nhất. Mỗi nhóm route lớn nằm ở file riêng để không thành một
 * file 300 dòng khó đọc.
 */
export const router = createBrowserRouter([
  {
    /**
     * `errorElement` ở route gốc bắt mọi lỗi render không được xử lý ở dưới.
     * Không có nó, một lỗi JavaScript sẽ cho người dùng trang trắng.
     */
    errorElement: <ErrorPage />,
    children: [
      ...authRoutes,
      ...clientRoutes,
      ...adminRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
