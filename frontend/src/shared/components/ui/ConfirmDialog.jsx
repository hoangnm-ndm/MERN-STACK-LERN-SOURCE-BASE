import { Modal } from './Modal';
import { Button } from './Button';

/**
 * Hộp xác nhận cho hành động phá huỷ: chặn user, xoá ảnh, xoá thư mục, xoá job.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {() => void} props.onConfirm
 * @param {string} props.title
 * @param {import('react').ReactNode} props.description nói rõ hậu quả
 * @param {string} [props.confirmLabel]
 * @param {boolean} [props.isLoading]
 * @param {'danger' | 'primary'} [props.variant]
 */
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Xác nhận',
  isLoading,
  variant = 'danger',
}) {
  // TODO: <Modal> + description + hai nút (Huỷ / confirmLabel).
  //
  // NGUYÊN TẮC VIẾT NỘI DUNG XÁC NHẬN — phần quan trọng hơn cả code:
  // - `description` phải nói HẬU QUẢ CỤ THỂ, không nói chung chung.
  //   Tệ:  "Bạn có chắc không?"
  //   Tốt: "Ảnh này đang được dùng làm ảnh đại diện của 3 người. Xoá sẽ khiến họ
  //         mất ảnh đại diện. Hành động không thể hoàn tác."
  // - Nhãn nút là ĐỘNG TỪ của hành động ("Xoá ảnh", "Chặn tài khoản"), không phải
  //   "OK" — người dùng đọc nhanh vẫn biết mình đang làm gì.
  // - Nút huỷ để mặc định được focus, nút phá huỷ thì không: bấm Enter theo phản
  //   xạ sẽ là huỷ, không phải xoá.
  return null;
}
