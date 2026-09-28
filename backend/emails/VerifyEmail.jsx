import { Button, Link, Text } from '@react-email/components';
import { EmailLayout, styles } from './components/EmailLayout.jsx';

/**
 * Email xác minh địa chỉ email sau khi đăng ký (Phase 2).
 *
 * @param {object} props
 * @param {string} props.name tên người nhận
 * @param {string} props.verifyUrl link xác minh (tokensService.buildActionUrl)
 * @param {number} props.expiresInMinutes để người dùng biết link sống bao lâu
 */
export default function VerifyEmail({ name = 'bạn', verifyUrl = '#', expiresInMinutes = 60 }) {
  // TODO: nội dung gồm:
  // - Lời chào kèm {name}.
  // - Câu giải thích ngắn vì sao nhận được email này.
  // - <Button href={verifyUrl}>Xác minh email</Button>
  // - Dán link dạng chữ bên dưới: một số email client chặn nút, người dùng cần
  //   copy được link thủ công.
  // - Ghi rõ link hết hạn sau {expiresInMinutes} phút.
  // - Câu trấn an: "Nếu không phải bạn đăng ký, hãy bỏ qua email này."
  return <EmailLayout preview="Xác minh địa chỉ email của bạn">{null}</EmailLayout>;
}

/**
 * Props mẫu cho trình xem trước (`npm run email:dev`).
 * React Email đọc export này để render bản nháp, nhờ vậy xem được giao diện mà
 * không cần gửi email thật.
 */
VerifyEmail.PreviewProps = {
  name: 'Tuấn Anh',
  verifyUrl: 'https://example.com/xac-minh-email?token=demo',
  expiresInMinutes: 60,
};
