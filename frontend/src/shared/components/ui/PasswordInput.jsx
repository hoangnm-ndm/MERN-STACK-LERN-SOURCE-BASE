import { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

/**
 * Input mật khẩu có nút ẩn/hiện (Phase 10).
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.error]
 */
export const PasswordInput = forwardRef(function PasswordInput(
  { label, error, className, ...rest },
  ref,
) {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();

  // TODO:
  // - <input type={isVisible ? 'text' : 'password'} ... /> bọc trong div relative.
  // - Nút toggle nằm bên phải, TRONG cùng div:
  //     <button
  //       type="button"              ← BẮT BUỘC: mặc định button trong form là
  //                                     type="submit", bấm vào mắt sẽ gửi form
  //       onClick={() => setIsVisible(v => !v)}
  //       aria-label={isVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
  //       tabIndex={-1}              ← bỏ khỏi luồng Tab để người dùng bàn phím
  //                                     đi thẳng từ mật khẩu sang nút submit
  //     >
  //       {isVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
  //     </button>
  //
  // - `aria-label` phải ĐỔI theo trạng thái, nếu không screen reader luôn đọc
  //   "hiện mật khẩu" kể cả khi đang hiện.
  // - Icon để aria-hidden vì aria-label của nút đã mô tả.
  // - Trạng thái isVisible là state CỤC BỘ: mỗi input tự quản lý, không nhấc lên
  //   store (YAGNI).
  // - KHÔNG tự reset isVisible về false khi component re-render — người dùng đã
  //   chủ động bấm hiện thì đừng tự tắt của họ.
  return null;
});
