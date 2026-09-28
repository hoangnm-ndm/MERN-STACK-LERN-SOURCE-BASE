import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

/**
 * Nút dùng chung.
 *
 * @param {object} props
 * @param {'primary' | 'secondary' | 'danger' | 'ghost'} [props.variant]
 * @param {'sm' | 'md' | 'lg'} [props.size]
 * @param {boolean} [props.isLoading] hiện spinner và tự khoá nút
 */
export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', isLoading, disabled, children, className, ...rest },
  ref,
) {
  // TODO:
  // - Map variant/size sang class Tailwind qua object tra cứu (VARIANTS, SIZES)
  //   thay vì chuỗi if/else — thêm variant mới chỉ cần thêm một dòng.
  // - <button ref={ref} disabled={disabled || isLoading} ...>
  //   `disabled || isLoading` là điểm quan trọng: đang gửi request thì phải khoá,
  //   nếu không người dùng bấm nhiều lần sẽ tạo trùng dữ liệu.
  // - isLoading → hiện <Loader2 className="animate-spin" aria-hidden="true" /> và
  //   thêm aria-busy="true".
  // - Giữ nguyên text khi loading (đừng đổi thành "Đang xử lý..."): text đổi làm
  //   nút thay đổi chiều rộng, giao diện giật.
  // - KHÔNG đặt mặc định type="submit"; để người dùng component truyền tường minh.
  return null;
});
