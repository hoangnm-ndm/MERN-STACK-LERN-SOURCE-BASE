import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { magicLinkSchema } from '../schemas/authSchemas';
import { useRequestMagicLink } from '../hooks/useAuthMutations';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';

/**
 * Form xin link đăng nhập qua email.
 *
 * @param {object} props
 * @param {boolean} [props.disabled] tắt khi magic link bị Super Admin tắt
 */
export function MagicLinkForm({ disabled }) {
  // TODO:
  // - useForm với magicLinkSchema (chỉ một field email).
  // - Sau khi gửi thành công: chuyển sang trạng thái "đã gửi" — hiện hướng dẫn
  //   kiểm tra hộp thư, KHÔNG hiện lại form. Dùng useState cục bộ cho việc này
  //   (không cần Zustand, chỉ component này quan tâm).
  // - Thông điệp trung tính: 'Nếu email tồn tại trong hệ thống, chúng tôi đã gửi
  //   liên kết đăng nhập.' Khớp với backend — cố tình không tiết lộ email nào đã
  //   có tài khoản.
  // - Nhắc rõ link sống 15 phút và chỉ dùng được một lần.
  // - Nên có nút "Gửi lại" có khoá thời gian (ví dụ 60 giây) — backend đã giới
  //   hạn 5 email/giờ, khoá ở giao diện giúp người dùng không đâm vào giới hạn đó.
  return null;
}
