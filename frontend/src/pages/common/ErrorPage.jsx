import { useRouteError, Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

/**
 * `errorElement` của route gốc — bắt mọi lỗi render không được xử lý ở dưới.
 * Không có trang này, một lỗi JavaScript sẽ cho người dùng trang trắng hoàn toàn.
 */
export function ErrorPage() {
  const error = useRouteError();

  // TODO:
  // - <h1>Đã có lỗi xảy ra</h1> + thông điệp chung + nút "Tải lại trang"
  //   (window.location.reload()) và <Link> về trang chủ.
  //
  // - CHỈ hiện chi tiết lỗi khi `import.meta.env.DEV`:
  //     {import.meta.env.DEV && <pre>{error?.stack ?? String(error)}</pre>}
  //   Ở production, stack trace lộ cấu trúc source và đôi khi cả dữ liệu trong
  //   biến — đừng in ra cho người dùng.
  //
  // - Nên log lỗi về dịch vụ theo dõi (Sentry...) nếu dự án dùng. Lỗi không được
  //   báo về là lỗi bạn sẽ không bao giờ biết mình có.
  return null;
}
