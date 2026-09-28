import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Khung cho các trang xác thực: thẻ nội dung căn giữa, không header/sidebar.
 * Bỏ điều hướng đi là có chủ ý — giữ người dùng tập trung vào form.
 */
export function AuthLayout() {
  // TODO:
  // <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
  //   <div className="w-full max-w-md">
  //     <Link to={ROUTES.HOME}>logo / tên app</Link>
  //     <div className="bg-white rounded-lg shadow p-6 mt-6"><Outlet /></div>
  //   </div>
  // </div>
  //
  // Dùng <Link> chứ KHÔNG <a href="/">: <a> tải lại toàn bộ trang, mất hết state.
  return null;
}
