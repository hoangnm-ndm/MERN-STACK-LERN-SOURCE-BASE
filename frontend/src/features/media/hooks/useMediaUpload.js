import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as mediaApi from '../api/mediaApi';
import { mediaKeys } from './useMediaLibrary';

/**
 * Gói cả ba bước upload vào MỘT hook, để component chỉ cần gọi `upload(file)`.
 *
 * Ba bước: xin URL → PUT lên R2 → confirm. Nếu để component tự gọi ba hàm, mỗi
 * chỗ upload sẽ tự xử lý lỗi một kiểu và chắc chắn có chỗ quên bước confirm
 * (ảnh mắc kẹt ở trạng thái PENDING và bị job dọn rác xoá mất).
 *
 * @param {object} [options]
 * @param {'AVATAR' | 'LIBRARY'} [options.kind]
 * @param {string | null} [options.folderId]
 * @param {(media: object) => void} [options.onSuccess]
 */
export function useMediaUpload({ kind = 'LIBRARY', folderId = null, onSuccess } = {}) {
  const [progress, setProgress] = useState(0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    /**
     * @param {File} file
     * @returns {Promise<object>} media đã confirm
     */
    mutationFn: async (file) => {
      // TODO:
      // 1. Kiểm tra ở CLIENT trước khi gọi API (để báo lỗi tức thì, không chờ
      //    round-trip): file.type nằm trong danh sách cho phép, file.size <= giới hạn.
      //    Đây chỉ là trải nghiệm — backend vẫn kiểm lại, đừng coi là bảo mật.
      //
      // 2. setProgress(0)
      //
      // 3. const { media, uploadUrl } = await mediaApi.createUploadUrl({
      //      originalName: file.name, mimeType: file.type, size: file.size, kind, folderId,
      //    })
      //
      // 4. await mediaApi.uploadFileToR2({ uploadUrl, file, onProgress: setProgress })
      //
      // 5. Đọc kích thước ảnh để lưu kèm (giúp giao diện đặt sẵn khung ảnh, tránh
      //    layout giật): dùng createImageBitmap(file) hoặc new Image() + onload.
      //
      // 6. return await mediaApi.confirmUpload({ mediaId: media.id, width, height })
      //
      // XỬ LÝ LỖI GIỮA ĐƯỜNG: nếu bước 4 hoặc 5 lỗi, record đã tạo ở bước 3 sẽ
      // nằm lại ở trạng thái PENDING. Không cần dọn ở client — job
      // CLEANUP_ORPHAN_MEDIA sẽ xử lý. Đây là lý do job đó tồn tại.
      throw new Error('useMediaUpload.mutationFn chưa được triển khai');
    },
    // TODO:
    // onSuccess: (media) => {
    //   queryClient.invalidateQueries({ queryKey: mediaKeys.all });
    //   onSuccess?.(media);
    // },
    // onError: (error) => toast.error(error.message),
    // onSettled: () => setProgress(0),
  });

  return {
    upload: mutation.mutate,
    uploadAsync: mutation.mutateAsync,
    isUploading: mutation.isPending,
    progress,
    error: mutation.error,
  };
}
