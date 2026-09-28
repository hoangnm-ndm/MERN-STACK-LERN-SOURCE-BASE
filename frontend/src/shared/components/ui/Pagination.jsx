import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

/**
 * Phân trang, nhận trực tiếp `meta` từ response chuẩn của backend.
 *
 * @param {object} props
 * @param {{ page: number, limit: number, total: number, totalPages: number }} props.meta
 * @param {(page: number) => void} props.onPageChange
 */
export function Pagination({ meta, onPageChange }) {
  // TODO:
  // - totalPages <= 1 → return null (đừng hiện phân trang cho 1 trang).
  // - Bọc trong <nav aria-label="Phân trang">.
  // - Nút Trước/Sau: disabled ở trang đầu/cuối.
  // - Hiện "Trang X / Y" và "Tổng N bản ghi" — người dùng cần biết mình đang ở đâu.
  // - Nút số trang có rút gọn (1 … 4 5 6 … 20) nếu nhiều trang.
  // - Trang đang xem đánh dấu aria-current="page".
  //
  // LƯU Ý QUAN TRỌNG VỀ NƠI LƯU `page`: trang hiện tại nên nằm trên URL
  // (useSearchParams), KHÔNG nằm trong useState. Lý do: người dùng chia sẻ link
  // hay F5 thì vẫn đúng trang, và nút Back hoạt động như họ mong đợi.
  // `onPageChange` vì vậy thường được page cha nối vào setSearchParams.
  return null;
}
