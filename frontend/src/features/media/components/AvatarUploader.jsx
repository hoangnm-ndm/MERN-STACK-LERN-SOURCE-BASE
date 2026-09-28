import { useRef } from 'react';
import { Camera } from 'lucide-react';
import { useMediaUpload } from '../hooks/useMediaUpload';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Button } from '@/shared/components/ui/Button';

/**
 * Đổi ảnh đại diện (Phase 11).
 *
 * @param {object} props
 * @param {object | null} props.currentAvatar media hiện tại (có `url`)
 * @param {string} props.userName để hiện chữ cái đầu khi chưa có ảnh
 * @param {(mediaId: string | null) => void} props.onChange gọi khi upload xong hoặc xoá ảnh
 */
export function AvatarUploader({ currentAvatar, userName, onChange }) {
  const inputRef = useRef(null);
  const { upload, isUploading, progress } = useMediaUpload({
    kind: 'AVATAR',
    onSuccess: (media) => onChange(media.id),
  });

  // TODO:
  // - <Avatar src={currentAvatar?.url} name={userName} size="xl" /> + nút camera
  //   đè lên góc.
  // - <input type="file" accept="image/*" ref={inputRef} className="sr-only"
  //     onChange={(e) => { const file = e.target.files?.[0]; if (file) upload(file); }} />
  //   Input file gốc ẩn bằng `sr-only` (KHÔNG dùng display:none — sẽ không focus
  //   được bằng bàn phím), nút bấm gọi inputRef.current.click().
  // - SAU KHI CHỌN FILE phải reset `e.target.value = ''`. Nếu không, chọn lại
  //   đúng file vừa chọn sẽ không kích hoạt onChange (giá trị không đổi) —
  //   người dùng tưởng nút hỏng.
  // - isUploading → hiện vòng tiến độ theo `progress`.
  // - Có ảnh rồi → thêm nút "Xoá ảnh" gọi onChange(null).
  //
  // GỢI Ý NÂNG CAO (không bắt buộc): cắt ảnh vuông ở client trước khi upload.
  // Ảnh đại diện luôn hiển thị trong hình tròn nên ảnh chữ nhật sẽ bị cắt lệch.
  return null;
}
