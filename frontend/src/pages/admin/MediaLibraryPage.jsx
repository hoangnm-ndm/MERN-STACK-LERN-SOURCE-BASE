import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MediaGrid,
  MediaFilters,
  MediaUploader,
  FolderTree,
  DeleteMediaDialog,
  useMediaList,
} from '@/features/media';
import { DataState } from '@/shared/components/ui/DataState';
import { Pagination } from '@/shared/components/ui/Pagination';

/** Khu quản trị > Thư viện media (Phase 12). */
export default function MediaLibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  /** Chế độ xem là sở thích cá nhân → localStorage, không phải URL. */
  const [view, setView] = useState(() => localStorage.getItem('media-view') ?? 'grid');
  const [mediaToDelete, setMediaToDelete] = useState(null);

  // TODO:
  // 1. Bộ lọc đọc từ URL như UserManagePage: page, folderId, kind, status, q, orphanOnly.
  //
  // 2. Bố cục hai cột:
  //    <div className="flex gap-6">
  //      <FolderTree selectedFolderId={filters.folderId}
  //        onSelectFolder={(id) => updateFilters({ folderId: id })} />
  //      <div className="flex-1">
  //        <MediaUploader folderId={filters.folderId === 'root' ? null : filters.folderId} />
  //        <MediaFilters value={filters} onChange={updateFilters}
  //          view={view} onViewChange={handleViewChange} />
  //        <DataState ...>
  //          <MediaGrid items={data.items} view={view} onDelete={setMediaToDelete} ... />
  //          <Pagination ... />
  //        </DataState>
  //      </div>
  //    </div>
  //
  // 3. handleViewChange: setView + localStorage.setItem('media-view', next).
  //    Bọc trong try/catch — localStorage ném lỗi ở chế độ riêng tư của một số
  //    trình duyệt, và mất chế độ xem thì không đáng làm sập cả trang.
  //
  // 4. <DeleteMediaDialog media={mediaToDelete} onClose={() => setMediaToDelete(null)} />
  //
  // 5. Trạng thái rỗng nên có hành động: emptyAction = nút "Tải ảnh lên".
  //    Thư mục trống mà chỉ có chữ "Chưa có ảnh" thì người dùng không biết làm gì tiếp.
  return null;
}
