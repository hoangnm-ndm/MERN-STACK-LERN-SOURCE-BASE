import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateProfile } from '../hooks/useUsers';
import { AvatarUploader } from '@/features/media';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';

/**
 * Form cập nhật hồ sơ cá nhân (Phase 11: có đổi ảnh đại diện).
 *
 * Schema đặt ngay tại đây vì chỉ form này dùng — schema dùng ở nhiều nơi mới nên
 * tách ra `schemas/`.
 */
const profileSchema = z.object({
  name: z.string().trim().min(2, 'Tên tối thiểu 2 ký tự').max(120),
});

/**
 * @param {object} props
 * @param {object} props.user
 */
export function ProfileForm({ user }) {
  // TODO:
  // - useForm với profileSchema, defaultValues lấy từ `user`.
  // - Email hiện dạng CHỈ ĐỌC (disabled) kèm ghi chú "Không thể thay đổi email".
  //   Đổi email là luồng riêng cần xác minh lại địa chỉ mới — không nhồi vào đây.
  // - <AvatarUploader currentMediaId={user.avatarMedia} onUploaded={mediaId => ...}>
  //   Ảnh đại diện KHÔNG nằm trong form values: nó lưu ngay khi upload xong,
  //   không chờ bấm "Lưu thay đổi". Lý do: upload đã là một hành động rõ ràng
  //   của người dùng, bắt họ bấm thêm một nút nữa là gây nhầm lẫn.
  // - Nút Lưu: `disabled={!isDirty}` — không có gì thay đổi thì không cho bấm.
  return null;
}
