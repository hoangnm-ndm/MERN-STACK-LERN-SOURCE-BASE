import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as mediaApi from '../api/mediaApi';

/** Query key factory của feature media. */
export const mediaKeys = {
  all: ['media'],
  list: (filters) => [...mediaKeys.all, 'list', filters],
  detail: (id) => [...mediaKeys.all, 'detail', id],
  usages: (id) => [...mediaKeys.all, 'usages', id],
  folders: () => [...mediaKeys.all, 'folders'],
};

/**
 * @param {object} filters
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export function useMediaList(filters) {
  return useQuery({
    queryKey: mediaKeys.list(filters),
    queryFn: () => mediaApi.getMediaList(filters),
    // TODO: placeholderData: (previous) => previous — giữ lưới ảnh cũ khi đổi trang.
  });
}

/** @returns {import('@tanstack/react-query').UseQueryResult} */
export function useFolders() {
  return useQuery({
    queryKey: mediaKeys.folders(),
    queryFn: mediaApi.getFolders,
    // TODO: staleTime dài hơn mặc định (ví dụ 5 phút) — cây thư mục rất ít đổi.
  });
}

/**
 * Chỉ gọi khi người dùng đã bấm xoá và hộp xác nhận đang mở.
 *
 * @param {string | null} mediaId
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export function useMediaUsages(mediaId) {
  return useQuery({
    queryKey: mediaKeys.usages(mediaId),
    queryFn: () => mediaApi.getMediaUsages(mediaId),
    // TODO: `enabled: !!mediaId` — không có id thì đừng gọi.
    // Cũng nên `staleTime: 0`: thông tin "đang được dùng" phải luôn mới nhất,
    // không được lấy từ cache khi người dùng đang định xoá.
  });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mediaApi.deleteMedia,
    // TODO:
    // onSuccess: () => { invalidate mediaKeys.all; toast.success('Đã xoá ảnh') }
    // onError: (error) => {
    //   error.code === 'MEDIA_IN_USE' → KHÔNG hiện toast lỗi chung chung.
    //   Thay vào đó mở lại hộp xác nhận với danh sách nơi đang dùng và lựa chọn
    //   "Vẫn xoá và gỡ tham chiếu" (gọi lại với force: true).
    //   Người dùng cần biết CÁI GÌ chặn họ, không phải chỉ biết là bị chặn.
    // }
  });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useUpdateMedia() {
  return useMutation({ mutationFn: mediaApi.updateMedia });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useCreateFolder() {
  // TODO: invalidate mediaKeys.folders(); lỗi trùng tên (409) → hiện dưới field name.
  return useMutation({ mutationFn: mediaApi.createFolder });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useRenameFolder() {
  return useMutation({ mutationFn: mediaApi.renameFolder });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useDeleteFolder() {
  // TODO: lỗi FOLDER_NOT_EMPTY → thông điệp rõ: "Thư mục còn N ảnh, hãy di chuyển
  // hoặc xoá chúng trước."
  return useMutation({ mutationFn: mediaApi.deleteFolder });
}
