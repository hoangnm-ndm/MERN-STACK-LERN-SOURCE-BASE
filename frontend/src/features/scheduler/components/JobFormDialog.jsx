import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema } from '../schemas/schedulerSchemas';
import { useCreateJob, useUpdateJob } from '../hooks/useScheduler';
import { CRON_PRESETS, describeCron } from '../lib/describeCron';
import { Modal } from '@/shared/components/ui/Modal';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import { Switch } from '@/shared/components/ui/Switch';
import { Button } from '@/shared/components/ui/Button';

/**
 * Form tạo / sửa job (Phase 13).
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {object | null} [props.job] có = chế độ sửa, null = tạo mới
 */
export function JobFormDialog({ isOpen, onClose, job }) {
  const isEditing = !!job;

  // TODO:
  // - useForm với zodResolver(jobFormSchema), defaultValues từ `job` khi sửa.
  // - Field chung: name, type, cronExpression, enabled.
  // - `type` KHÔNG cho đổi khi sửa (payload sẽ không còn khớp) → disabled ở chế
  //   độ sửa. Backend cũng không nhận `type` trong updateJob.
  //
  // - Chọn cron: Select các CRON_PRESETS + lựa chọn "Tuỳ chỉnh" để gõ tay.
  //   Hiện describeCron(giá trị đang gõ) ngay dưới input làm xác nhận trực quan —
  //   đây là cách tốt nhất để admin không đặt sai giờ.
  //
  // - PHẦN PAYLOAD ĐỔI THEO `type` (đây là chỗ dễ sai nhất của form này):
  //   + CLEANUP_ORPHAN_MEDIA → batchLimit (số), graceHours (số), dryRun (Switch).
  //     Nên bật sẵn dryRun khi tạo mới: job này xoá file vĩnh viễn.
  //   + SEND_EMAIL_TO_GROUP → template (Select), subject, heading, body
  //     (textarea), ctaLabel, ctaUrl, audience.role (Select),
  //     audience.emailVerifiedOnly (Switch).
  //
  //   Khi người dùng đổi `type`, phải RESET phần payload về mặc định của loại mới
  //   (dùng `watch('type')` + `resetField('payload')`). Không reset thì form giữ
  //   lại field của loại cũ và backend sẽ từ chối vì payload không khớp.
  //
  // - Với job gửi email: hiện ước lượng số người nhận trước khi lưu, để admin biết
  //   mình đang chuẩn bị gửi cho bao nhiêu người.
  return null;
}
