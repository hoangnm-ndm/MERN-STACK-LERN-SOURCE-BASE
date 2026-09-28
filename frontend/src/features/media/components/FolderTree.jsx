import { useState } from 'react';
import { Folder, FolderOpen, Plus, ChevronRight } from 'lucide-react';
import { useFolders, useCreateFolder, useDeleteFolder } from '../hooks/useMediaLibrary';
import { Button } from '@/shared/components/ui/Button';

/**
 * Cây thư mục ở sidebar thư viện media (Phase 12).
 *
 * @param {object} props
 * @param {string | null} props.selectedFolderId null = "Tất cả"
 * @param {(folderId: string | null) => void} props.onSelectFolder
 */
export function FolderTree({ selectedFolderId, onSelectFolder }) {
  const [expandedIds, setExpandedIds] = useState(new Set());
  const { data: folders, isLoading } = useFolders();

  // TODO:
  // - Hai mục cố định ở đầu: "Tất cả" (folderId = null) và "Thư mục gốc"
  //   (folderId = 'root' — chỉ ảnh không thuộc thư mục nào).
  //   Backend phân biệt hai cái này: 'root' → filter folder: null.
  // - Đệ quy render cây. Component con tự gọi lại chính nó là cách gọn nhất:
  //     function FolderNode({ folder, depth }) { ... {folder.children.map(c =>
  //       <FolderNode key={c.id} folder={c} depth={depth + 1} />)} }
  //   Dùng `depth` để thụt lề (style padding-left), đừng lồng <ul> quá sâu.
  // - Mỗi thư mục hiện số ảnh bên trong (backend đã trả kèm).
  // - Mở/đóng nhánh: mục có children thì có nút mũi tên, aria-expanded.
  // - Nút "Thư mục mới" mở form nhỏ tạo thư mục trong thư mục đang chọn.
  // - Xoá thư mục: backend CHẶN nếu chưa rỗng. Hiện thông điệp lỗi đúng nguyên
  //   văn từ backend, đừng tự diễn giải lại.
  //
  // - `role="tree"` cho danh sách và `role="treeitem"` cho từng mục là chuẩn ARIA,
  //   nhưng nếu chưa quen thì dùng <nav><ul><li> bình thường cũng dùng được —
  //   miễn là mỗi mục là <button>, không phải <div onClick>.
  return null;
}
