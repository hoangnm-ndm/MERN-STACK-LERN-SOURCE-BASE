import { forwardRef, useId } from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * Select dùng thẻ `<select>` gốc — dùng cho bộ lọc role/status và chọn template email.
 *
 * Cố tình KHÔNG làm dropdown tuỳ biến bằng div: select gốc đã có sẵn điều khiển
 * bằng bàn phím, tìm theo chữ gõ, và trên mobile hiện bộ chọn của hệ điều hành.
 * Dropdown tự viết gần như luôn thiếu những thứ đó (YAGNI).
 *
 * @param {object} props
 * @param {string} props.label
 * @param {Array<{ value: string, label: string }>} props.options
 * @param {string} [props.placeholder] hiện thành option rỗng ở đầu
 * @param {string} [props.error]
 */
export const Select = forwardRef(function Select(
  { label, options, placeholder, error, className, ...rest },
  ref,
) {
  const id = useId();

  // TODO:
  // <label htmlFor={id}>{label}</label>
  // <select id={id} ref={ref} aria-invalid={!!error} {...rest}>
  //   {placeholder && <option value="">{placeholder}</option>}
  //   {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  // </select>
  // {error && <p role="alert">{error}</p>}
  //
  // `key` dùng o.value, KHÔNG dùng index: danh sách lọc có thể đổi thứ tự và
  // React sẽ tái sử dụng sai DOM node.
  return null;
});
