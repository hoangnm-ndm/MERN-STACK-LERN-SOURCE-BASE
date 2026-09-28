import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import { ROLE_LABELS, STATUS_LABELS } from '@/shared/constants/roles';
import { useDebounce } from '@/shared/hooks/useDebounce';

/**
 * Bộ lọc danh sách người dùng: tìm kiếm, role, trạng thái.
 *
 * @param {object} props
 * @param {{ q?: string, role?: string, status?: string }} props.value
 * @param {(patch: object) => void} props.onChange
 */
export function UserFilters({ value, onChange }) {
  // TODO:
  // - Ô tìm kiếm: state cục bộ cho giá trị đang gõ, rồi useDebounce(300ms) mới
  //   gọi onChange. Không debounce thì mỗi ký tự là một request API.
  // - Select role và status: đổi là gọi onChange ngay (không cần debounce).
  // - Mỗi Select có option rỗng "Tất cả".
  // - Đổi bộ lọc phải RESET về trang 1 — việc này page cha lo, nhưng đừng quên:
  //   đang ở trang 5 mà lọc lại thì trang 5 của kết quả mới thường rỗng.
  //
  // NƠI LƯU BỘ LỌC: URL search params (useSearchParams), không phải useState.
  // Nhờ vậy link chia sẻ được, F5 không mất bộ lọc, nút Back hoạt động đúng.
  return null;
}
