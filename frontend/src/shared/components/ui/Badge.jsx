import { cn } from '@/shared/lib/utils';

/**
 * Nhãn nhỏ hiển thị trạng thái: role của user, ACTIVE/BLOCKED, SUCCESS/FAILED.
 *
 * @param {object} props
 * @param {'neutral' | 'success' | 'warning' | 'danger' | 'info'} [props.tone]
 * @param {import('react').ReactNode} props.children
 */
export function Badge({ tone = 'neutral', children, className }) {
  // TODO: map tone sang class Tailwind qua object tra cứu.
  //
  // KHÔNG dùng MÀU làm thông tin duy nhất: người mù màu không phân biệt được
  // xanh/đỏ. Badge luôn phải có CHỮ ('Đã bị chặn', 'Thất bại'), màu chỉ là nhấn
  // mạnh thêm. Vì vậy `children` là bắt buộc, không có badge chỉ toàn màu.
  return null;
}
