import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as usersApi from '../api/usersApi';
import { useAuthStore } from '@/features/auth';

/** Query key factory của feature users. */
export const userKeys = {
  all: ['users'],
  /** Key CHỨA filters: mỗi bộ lọc là một cache riêng, đổi bộ lọc là refetch. */
  list: (filters) => [...userKeys.all, 'list', filters],
  detail: (id) => [...userKeys.all, 'detail', id],
  me: () => [...userKeys.all, 'me'],
};

/**
 * @param {object} filters
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export function useUsers(filters) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => usersApi.getUsers(filters),
    // TODO: thêm `placeholderData: (previous) => previous`
    // Tác dụng: khi đổi trang, bảng cũ vẫn hiện trong lúc tải trang mới thay vì
    // nhoáng về trạng thái loading — cảm giác mượt hơn nhiều.
  });
}

/** @returns {import('@tanstack/react-query').UseQueryResult} */
export function useMe() {
  // TODO: useQuery với userKeys.me() và usersApi.getMe.
  // Chỉ gọi khi đã đăng nhập: thêm `enabled: !!useAuthStore(s => s.user)`.
  return useQuery({ queryKey: userKeys.me(), queryFn: usersApi.getMe });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: usersApi.updateMe,
    // TODO:
    // onSuccess: (updatedUser) => {
    //   setUser(updatedUser);    ← cập nhật store để header/avatar đổi ngay
    //   queryClient.invalidateQueries({ queryKey: userKeys.me() });
    //   toast.success('Cập nhật thông tin thành công');
    // }
  });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useChangeUserRole() {
  // TODO: invalidate userKeys.all sau khi thành công.
  // Lỗi 403 SUPER_ADMIN_PROTECTED / CANNOT_MODIFY_SELF → hiện toast.error với
  // đúng `error.message` từ backend (đã là tiếng Việt, không cần dịch lại).
  return useMutation({ mutationFn: usersApi.changeUserRole });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useBlockUser() {
  // TODO: invalidate userKeys.all; toast cảnh báo rằng user đó đã bị đăng xuất
  // khỏi mọi thiết bị (backend thu hồi hết session khi chặn).
  return useMutation({ mutationFn: usersApi.blockUser });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useUnblockUser() {
  return useMutation({ mutationFn: usersApi.unblockUser });
}
