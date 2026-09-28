import { Grid3x3, List, Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import { useDebounce } from '@/shared/hooks/useDebounce';

/**
 * Thanh công cụ thư viện media: tìm kiếm, lọc, đổi chế độ xem (Phase 12).
 *
 * @param {object} props
 * @param {{ q?: string, kind?: string, status?: string, orphanOnly?: boolean }} props.value
 * @param {(patch: object) => void} props.onChange
 * @param {'grid' | 'list'} props.view
 * @param {(view: 'grid' | 'list') => void} props.onViewChange
 */
export function MediaFilters({ value, onChange, view, onViewChange }) {
  // TODO:
  // - Ô tìm theo tên file (debounce 300ms).
  // - Select "Loại": Tất cả / Ảnh đại diện / Thư viện.
  // - Select "Trạng thái": Tất cả / Đã hoàn tất / Chưa hoàn tất.
  // - Checkbox "Chỉ ảnh mồ côi" — bộ lọc quan trọng để admin dọn dẹp.
  //   Nên có tooltip giải thích: "Ảnh không được dùng ở đâu trong hệ thống".
  //   Người dùng không tự hiểu "mồ côi" nghĩa là gì.
  // - Nhóm hai nút lưới/danh sách: dùng <button aria-pressed={view === 'grid'}>.
  //   `aria-pressed` là cách đúng để nói "nút này đang ở trạng thái bật" —
  //   tô màu không thôi thì screen reader không biết.
  //
  // - Chế độ xem (grid/list) là sở thích cá nhân → lưu localStorage để lần sau
  //   mở lại vẫn như cũ. Còn bộ lọc thì lưu trên URL.
  return null;
}
