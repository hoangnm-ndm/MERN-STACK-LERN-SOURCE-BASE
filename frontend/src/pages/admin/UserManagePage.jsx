import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  UserTable,
  UserFilters,
  useUsers,
  useChangeUserRole,
  useBlockUser,
  useUnblockUser,
} from '@/features/users';
import { useAuthStore } from '@/features/auth';
import { DataState } from '@/shared/components/ui/DataState';
import { Pagination } from '@/shared/components/ui/Pagination';
import { ConfirmDialog } from '@/shared/components/ui/ConfirmDialog';

/** Khu quản trị > Người dùng (Phase 5, 8). */
export default function UserManagePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userToBlock, setUserToBlock] = useState(null);
  const currentUser = useAuthStore((state) => state.user);

  // TODO:
  // 1. ĐỌC BỘ LỌC TỪ URL, không từ useState:
  //    const filters = {
  //      page: Number(searchParams.get('page')) || 1,
  //      q: searchParams.get('q') ?? '',
  //      role: searchParams.get('role') ?? '',
  //      status: searchParams.get('status') ?? '',
  //    };
  //    Lợi ích: link chia sẻ được, F5 giữ bộ lọc, nút Back hoạt động đúng.
  //
  // 2. Hàm cập nhật bộ lọc:
  //    const updateFilters = (patch) => setSearchParams(prev => {
  //      const next = new URLSearchParams(prev);
  //      Object.entries(patch).forEach(([k, v]) => v ? next.set(k, v) : next.delete(k));
  //      if (!('page' in patch)) next.delete('page');   ← RESET về trang 1 khi đổi
  //      return next;                                      bộ lọc, nếu không đang
  //    });                                                 ở trang 5 sẽ thấy rỗng
  //
  // 3. const { data, isLoading, error, refetch } = useUsers(filters)
  //
  // 4. <h1>Quản lý người dùng</h1>
  //    <UserFilters value={filters} onChange={updateFilters} />
  //    <DataState isLoading={isLoading} error={error} isEmpty={!data?.items.length}
  //               onRetry={refetch} emptyMessage="Không tìm thấy người dùng nào">
  //      <UserTable users={data.items} currentUser={currentUser}
  //        onChangeRole={...} onToggleBlock={setUserToBlock} />
  //      <Pagination meta={data.meta} onPageChange={(page) => updateFilters({ page })} />
  //    </DataState>
  //
  // 5. ConfirmDialog cho hành động chặn. Nội dung phải nói rõ hậu quả:
  //    "Chặn {tên}? Người này sẽ bị đăng xuất khỏi mọi thiết bị và không đăng nhập
  //    lại được cho tới khi bạn mở chặn."
  return null;
}
