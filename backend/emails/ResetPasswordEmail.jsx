import { Button, Link, Text } from '@react-email/components';
import { EmailLayout, styles } from './components/EmailLayout.jsx';

/**
 * Email đặt lại mật khẩu (link) — Phase 2/6.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.resetUrl
 * @param {number} props.expiresInMinutes
 */
export default function ResetPasswordEmail({ name = 'bạn', resetUrl = '#', expiresInMinutes = 30 }) {
  // TODO:
  // - Nói rõ: có yêu cầu đặt lại mật khẩu cho tài khoản này.
  // - <Button href={resetUrl}>Đặt lại mật khẩu</Button> + link dạng chữ.
  // - Thời hạn + chỉ dùng một lần.
  // - Câu quan trọng: "Nếu không phải bạn yêu cầu, mật khẩu hiện tại vẫn an toàn
  //   và bạn có thể bỏ qua email này." — trấn an, tránh người dùng hoảng.
  return <EmailLayout preview="Đặt lại mật khẩu của bạn">{null}</EmailLayout>;
}

ResetPasswordEmail.PreviewProps = {
  name: 'Tuấn Anh',
  resetUrl: 'https://example.com/dat-lai-mat-khau?token=demo',
  expiresInMinutes: 30,
};
