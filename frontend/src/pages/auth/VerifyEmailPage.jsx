import { useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useVerifyEmail } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Trang người dùng tới khi bấm link trong email xác minh.
 * URL: /xac-minh-email?token=...
 */
export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const verifyMutation = useVerifyEmail();
  const hasRun = useRef(false);

  useEffect(() => {
    // TODO:
    // if (!token || hasRun.current) return;
    // hasRun.current = true;
    // verifyMutation.mutate(token);
    //
    // VÌ SAO CẦN `hasRun`: ở chế độ StrictMode của React 18, useEffect chạy HAI
    // LẦN khi phát triển. Không chặn thì lần gọi thứ hai sẽ nhận lỗi
    // TOKEN_ALREADY_USED (vì lần một đã tiêu thụ token) và người dùng thấy báo
    // lỗi dù xác minh đã thành công. Đây là bẫy rất hay gặp với các trang "tiêu
    // thụ token một lần".
  }, [token]);

  // TODO — bốn trạng thái:
  // 1. !token                    → "Liên kết không hợp lệ" + link gửi lại.
  // 2. verifyMutation.isPending  → spinner "Đang xác minh…"
  // 3. isSuccess                 → "Xác minh thành công" + nút Đăng nhập.
  // 4. isError                   → phân biệt theo error.code:
  //    - TOKEN_EXPIRED      → "Liên kết đã hết hạn" + form nhập email gửi lại.
  //    - TOKEN_ALREADY_USED → "Email đã được xác minh trước đó" — đây KHÔNG phải
  //      lỗi với người dùng, hãy dẫn họ sang trang đăng nhập.
  //    - Còn lại           → thông điệp chung + nút thử lại.
  return null;
}
