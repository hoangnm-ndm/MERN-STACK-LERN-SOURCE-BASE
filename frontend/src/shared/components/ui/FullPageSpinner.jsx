import { Loader2 } from 'lucide-react';

/**
 * Spinner chiếm toàn trang. Dùng cho `Suspense` fallback của route lazy và lúc
 * app đang phục hồi phiên (isBootstrapping).
 */
export function FullPageSpinner() {
  // TODO:
  // <div className="min-h-screen flex items-center justify-center" role="status"
  //      aria-live="polite">
  //   <Loader2 className="animate-spin" aria-hidden="true" />
  //   <span className="sr-only">Đang tải…</span>   ← chữ cho screen reader
  // </div>
  //
  // `sr-only` (ẩn bằng mắt, screen reader vẫn đọc) là cách đúng để thông báo
  // trạng thái tải: icon quay không có nghĩa gì với người dùng screen reader.
  return null;
}
