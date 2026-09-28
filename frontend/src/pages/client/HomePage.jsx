import { Link } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Trang chủ. Đây là chỗ để bạn xây nghiệp vụ riêng của dự án — base này chỉ đặt
 * sẵn khung.
 */
export function HomePage() {
  const user = useAuthStore((state) => state.user);

  // TODO:
  // - Chưa đăng nhập → giới thiệu ngắn + nút Đăng nhập / Đăng ký.
  // - Đã đăng nhập  → lời chào kèm tên + lối vào Cài đặt (và Khu quản trị nếu là admin).
  // - <h1> duy nhất trên trang, các mục dưới dùng <h2> — thứ tự heading đúng giúp
  //   screen reader và SEO đọc được cấu trúc trang.
  return null;
}
