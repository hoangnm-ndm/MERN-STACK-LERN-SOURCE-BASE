import { Trash2, Pencil, AlertTriangle } from 'lucide-react';
import { Badge } from '@/shared/components/ui/Badge';
import { formatFileSize, formatDate } from '@/shared/lib/utils';

/**
 * Hiển thị media dạng lưới hoặc dạng danh sách (Phase 12).
 *
 * Gộp hai chế độ vào MỘT component vì dữ liệu và hành động giống nhau, chỉ khác
 * cách bày. Tách thành hai component sẽ phải sửa hai chỗ mỗi khi thêm hành động.
 *
 * @param {object} props
 * @param {object[]} props.items
 * @param {'grid' | 'list'} props.view
 * @param {(media: object) => void} props.onSelect
 * @param {(media: object) => void} props.onDelete
 * @param {(media: object) => void} props.onEdit
 * @param {string[]} [props.selectedIds] cho chế độ chọn nhiều
 */
export function MediaGrid({ items, view, onSelect, onDelete, onEdit, selectedIds = [] }) {
  // TODO:
  // - view === 'grid' → <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
  //   view === 'list' → <table> với các cột: Ảnh | Tên | Kích thước | Ngày tải | Hành động
  //
  // - Mỗi ảnh: <img src={media.url} alt={media.alt || media.originalName}
  //     loading="lazy" width={media.width} height={media.height} />
  //   + `loading="lazy"`: thư viện có thể hàng trăm ảnh, tải hết cùng lúc là treo trang.
  //   + `width`/`height` giúp trình duyệt đặt sẵn khung, tránh trang nhảy khi ảnh
  //     tải xong (layout shift).
  //   + `alt` lấy media.alt, lùi về tên file — đừng để alt rỗng.
  //
  // - Ảnh có status PENDING → <Badge tone="warning">Chưa hoàn tất</Badge>:
  //   đây là upload dở, file có thể không tồn tại trên R2.
  //
  // - `key` là media.id, KHÔNG dùng index.
  //
  // - Ô ảnh bấm được phải là <button> bọc ngoài, không phải <div onClick>.
  return null;
}
