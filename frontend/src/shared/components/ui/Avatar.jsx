import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { getInitials } from '@/shared/lib/utils';

/**
 * Ảnh đại diện, tự lùi về chữ cái đầu của tên khi không có ảnh hoặc ảnh lỗi.
 *
 * @param {object} props
 * @param {string} [props.src] URL ảnh (media.url từ backend)
 * @param {string} props.name dùng cho alt và chữ cái đầu
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size]
 */
export function Avatar({ src, name, size = 'md', className }) {
  const [hasError, setHasError] = useState(false);

  // TODO:
  // - Không có src hoặc hasError → hiện vòng tròn với getInitials(name).
  //   Vòng tròn chữ cái KHÔNG cần alt (nó là trang trí), nhưng nên có
  //   aria-label={name} hoặc title để biết là của ai.
  // - Có src → <img src={src} alt={name} onError={() => setHasError(true)}
  //     loading="lazy" className={...} />
  //   `alt` là TÊN NGƯỜI, không phải "avatar" hay "ảnh đại diện" — screen reader
  //   cần biết đây là ai.
  // - `onError` là điểm quan trọng: ảnh trên R2 có thể bị xoá, không có fallback
  //   thì giao diện hiện icon ảnh vỡ.
  return null;
}
