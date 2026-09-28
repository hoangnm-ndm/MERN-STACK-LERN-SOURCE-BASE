import { forwardRef, useId } from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * Input có label và thông báo lỗi.
 *
 * `forwardRef` là BẮT BUỘC: react-hook-form dùng `ref` từ `register()` để đọc giá
 * trị. Thiếu forwardRef thì form luôn rỗng mà không báo lỗi gì.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.error]
 * @param {string} [props.hint] mô tả thêm dưới input
 */
export const Input = forwardRef(function Input({ label, error, hint, className, ...rest }, ref) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  // TODO:
  // <div>
  //   <label htmlFor={id}>{label}</label>          ← htmlFor BẮT BUỘC: bấm vào
  //   <input                                          label sẽ focus vào input,
  //     id={id}                                       và screen reader đọc đúng
  //     ref={ref}
  //     aria-invalid={!!error}
  //     aria-describedby={cn(error && errorId, hint && hintId)}
  //     className={cn(base, error && 'border-red-500', className)}
  //     {...rest}
  //   />
  //   {hint && <p id={hintId}>{hint}</p>}
  //   {error && <p id={errorId} role="alert">{error}</p>}
  // </div>
  //
  // `{...rest}` phải đặt SAU các prop mặc định để người dùng component ghi đè được,
  // nhưng TRƯỚC `ref` thì không quan trọng (ref truyền riêng).
  return null;
});
