import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

/**
 * Modal dựng trên thẻ `<dialog>` của HTML.
 *
 * VÌ SAO DÙNG `<dialog>` thay vì div + position fixed: trình duyệt lo sẵn phần
 * khó — bẫy focus trong modal, đóng bằng Escape, lớp nền mờ (::backdrop), và
 * chặn tương tác với nội dung phía sau. Tự làm bằng div thì phải viết lại hết và
 * gần như luôn thiếu một phần.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {import('react').ReactNode} props.children
 * @param {import('react').ReactNode} [props.footer]
 */
export function Modal({ isOpen, onClose, title, children, footer }) {
  const dialogRef = useRef(null);

  // TODO:
  // useEffect(() => {
  //   const dialog = dialogRef.current;
  //   if (!dialog) return;
  //   if (isOpen) dialog.showModal();   ← showModal() (không phải show()) mới
  //   else dialog.close();                 tạo backdrop và bẫy focus
  // }, [isOpen]);
  //
  // - Gắn onClose của dialog vào prop onClose: người dùng nhấn Escape thì trình
  //   duyệt tự đóng dialog, state `isOpen` của React sẽ LỆCH nếu không đồng bộ lại.
  //     <dialog ref={dialogRef} onClose={onClose} onClick={handleBackdropClick}>
  // - Bấm ra ngoài để đóng: trong onClick kiểm tra `event.target === dialogRef.current`
  //   (backdrop chính là thẻ dialog), rồi gọi onClose.
  // - Nội dung bọc trong một div riêng để click bên trong không bị coi là backdrop.
  // - Nút đóng: <button type="button" aria-label="Đóng"><X aria-hidden="true" /></button>
  // - <h2> cho title và trỏ aria-labelledby của dialog vào nó.
  return null;
}
