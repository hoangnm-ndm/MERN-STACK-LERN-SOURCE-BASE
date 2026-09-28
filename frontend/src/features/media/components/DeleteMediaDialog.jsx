import { AlertTriangle } from 'lucide-react';
import { useMediaUsages, useDeleteMedia } from '../hooks/useMediaLibrary';
import { Modal } from '@/shared/components/ui/Modal';
import { Button } from '@/shared/components/ui/Button';

/**
 * Hộp thoại xoá ảnh — trọng tâm của Phase 12: CHẶN xoá ảnh đang dùng.
 *
 * Không dùng ConfirmDialog chung vì hộp này cần gọi API kiểm tra tham chiếu
 * trước và đổi nội dung theo kết quả.
 *
 * @param {object} props
 * @param {object | null} props.media
 * @param {() => void} props.onClose
 */
export function DeleteMediaDialog({ media, onClose }) {
  const { data: usages, isLoading } = useMediaUsages(media?.id ?? null);
  const deleteMutation = useDeleteMedia();

  // TODO — ba trạng thái của hộp thoại:
  //
  // 1. isLoading → "Đang kiểm tra ảnh có đang được sử dụng…"
  //    PHẢI chờ xong mới cho bấm xoá. Cho xoá trước khi biết là bỏ qua cả mục
  //    đích của tính năng.
  //
  // 2. !usages.inUse → xác nhận thường:
  //    "Xoá ảnh {originalName}? Hành động không thể hoàn tác."
  //    Nút "Xoá ảnh" → deleteMutation.mutate({ id: media.id }).
  //
  // 3. usages.inUse → CẢNH BÁO, không chặn cứng:
  //    - Liệt kê rõ từng nơi: "Ảnh đại diện người dùng: 3".
  //    - Giải thích hậu quả: "Xoá sẽ khiến 3 người mất ảnh đại diện."
  //    - Hai lựa chọn: "Huỷ" (mặc định, được focus) và "Vẫn xoá và gỡ tham chiếu"
  //      → mutate({ id, force: true }).
  //    - Nút force nên để tone danger và KHÔNG được focus sẵn.
  //
  // Vì sao cho phép force thay vì chặn hẳn: admin cần xoá được ảnh vi phạm hoặc
  // sai nội dung ngay, kể cả khi đang dùng. Chặn cứng sẽ buộc họ đi sửa từng chỗ
  // tham chiếu trước — bất tiện và họ sẽ tìm cách vào DB sửa tay.
  return null;
}
