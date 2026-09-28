import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';
import { FullPageSpinner } from '@/shared/components/ui/FullPageSpinner';

/**
 * Trang người dùng quay về sau khi đăng nhập Google.
 *
 * LUỒNG Ở ĐÂY KHÁC CÁC TRANG KHÁC: backend đã set cookie refresh token TRƯỚC KHI
 * redirect về đây. Trang này không nhận token qua URL — nó chỉ cần gọi
 * /auth/refresh (cookie tự đi kèm) để lấy access token.
 *
 * Vì sao không truyền access token qua URL: URL nằm trong history trình duyệt,
 * bị gửi kèm trong header Referer, và hay bị copy-paste vào chat — token sẽ lộ.
 */
export function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bootstrap = useAuthStore((state) => state.bootstrap);
  const hasRun = useRef(false);

  useEffect(() => {
    // TODO:
    // if (hasRun.current) return;
    // hasRun.current = true;
    //
    // const error = searchParams.get('error');
    // if (error) {
    //   navigate(`${ROUTES.AUTH.LOGIN}?error=${error}`, { replace: true });
    //   return;
    // }
    //
    // bootstrap().then(() => {
    //   const user = useAuthStore.getState().user;
    //   navigate(user ? ROUTES.HOME : ROUTES.AUTH.LOGIN, { replace: true });
    // });
    //
    // `replace: true` ở mọi lần điều hướng: không để trang callback nằm trong
    // history, nếu không người dùng bấm Back sẽ quay lại đây và chạy lại luồng.
  }, []);

  // TODO: hiện <FullPageSpinner /> — trang này chỉ tồn tại trong khoảnh khắc.
  // Trang đăng nhập nên đọc `?error=` và hiện thông điệp tương ứng:
  //   oauth_cancelled       → 'Bạn đã huỷ đăng nhập bằng Google'
  //   oauth_state_mismatch  → 'Yêu cầu không hợp lệ, vui lòng thử lại'
  return <FullPageSpinner />;
}
