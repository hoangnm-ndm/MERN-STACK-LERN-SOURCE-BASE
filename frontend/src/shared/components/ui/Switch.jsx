import { forwardRef, useId } from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * Công tắc bật/tắt — dùng ở trang Cấu hình hệ thống (Phase 4) và bật/tắt job.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.description] giải thích hệ quả khi tắt
 * @param {boolean} [props.disabled]
 */
export const Switch = forwardRef(function Switch({ label, description, className, ...rest }, ref) {
  const id = useId();

  // TODO:
  // - Dựng trên <input type="checkbox" role="switch" /> THẬT (ẩn bằng class
  //   sr-only hoặc opacity-0), phần nhìn thấy là div được style theo trạng thái.
  //   Vì sao không dùng div + onClick: checkbox thật có sẵn Space để bật/tắt,
  //   trạng thái được screen reader đọc đúng, và react-hook-form đọc được qua ref.
  // - `role="switch"` để screen reader đọc "bật/tắt" thay vì "đã chọn/chưa chọn".
  // - Bọc trong <label htmlFor={id}> để bấm vào chữ cũng đổi được trạng thái.
  // - `description` hiển thị dưới label và trỏ aria-describedby vào nó — đây là
  //   chỗ để cảnh báo, ví dụ "Tắt mục này sẽ khiến người dùng mới không đăng ký được".
  return null;
});
