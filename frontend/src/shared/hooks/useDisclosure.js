import { useCallback, useState } from 'react';

/**
 * Quản lý trạng thái mở/đóng của modal, dropdown, drawer.
 *
 * Gom lại vì mẫu `const [isOpen, setIsOpen] = useState(false)` kèm ba hàm
 * open/close/toggle lặp ở hầu hết component có modal.
 *
 * @param {boolean} [initial]
 * @returns {{ isOpen: boolean, open: () => void, close: () => void, toggle: () => void }}
 */
export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);

  // `useCallback` để các hàm này không tạo mới mỗi lần render — quan trọng khi
  // truyền xuống component đã memo hoặc dùng làm dependency của useEffect.
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((value) => !value), []);

  return { isOpen, open, close, toggle };
}
