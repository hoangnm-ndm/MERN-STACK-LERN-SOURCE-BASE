import { useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MagicLinkForm, useConsumeMagicLink } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Trang magic link, đảm nhiệm HAI vai:
 *   - Không có `?token=` → hiện form xin link (người dùng chủ động vào).
 *   - Có `?token=`      → tự đổi token thành phiên đăng nhập (đến từ email).
 *
 * Gộp vào một trang vì cùng một nghiệp vụ và cùng một URL trong email.
 */
export function MagicLinkPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const consumeMutation = useConsumeMagicLink();
  const hasRun = useRef(false);

  useEffect(() => {
    // TODO: giống VerifyEmailPage — dùng `hasRun` để StrictMode không gọi hai lần
    // làm token bị tiêu thụ rồi báo lỗi TOKEN_ALREADY_USED.
  }, [token]);

  // TODO:
  // - Không có token → <MagicLinkForm />
  // - Có token, đang xử lý → spinner "Đang đăng nhập…"
  // - Lỗi → phân biệt TOKEN_EXPIRED (link sống 15 phút, hiện lại form để xin link
  //   mới) với TOKEN_ALREADY_USED (link chỉ dùng một lần — nói rõ điều này, vì
  //   một số ứng dụng email tự "xem trước" link và làm nó bị tiêu thụ).
  // - Thành công → hook đã tự điều hướng về trang chủ.
  return null;
}
