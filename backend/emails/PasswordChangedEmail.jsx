import { Text } from '@react-email/components';
import { EmailLayout, styles } from './components/EmailLayout.jsx';

/**
 * Thông báo mật khẩu vừa được đổi.
 *
 * Đây là email BẢO MẬT, không phải email marketing: nếu không phải chủ tài khoản
 * thực hiện, đây là tín hiệu duy nhất họ nhận được để kịp phản ứng.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.changedAt thời điểm đã format sẵn theo múi giờ Việt Nam
 * @param {string} [props.ip]
 * @param {string} props.supportUrl trang liên hệ khi không phải mình đổi
 */
export default function PasswordChangedEmail({ name = 'bạn', changedAt, ip, supportUrl = '#' }) {
  // TODO:
  // - Thông báo mật khẩu đã đổi lúc {changedAt}, kèm {ip} nếu có.
  // - Nói rõ: mọi thiết bị khác đã bị đăng xuất (vì resetPassword/changePassword
  //   có gọi revokeAllSessions).
  // - Hướng dẫn hành động nếu không phải họ đổi: đặt lại mật khẩu ngay + liên hệ
  //   hỗ trợ ({supportUrl}).
  return <EmailLayout preview="Mật khẩu của bạn đã được thay đổi">{null}</EmailLayout>;
}

PasswordChangedEmail.PreviewProps = {
  name: 'Tuấn Anh',
  changedAt: '28/09/2026 14:05 (GMT+7)',
  ip: '203.0.113.10',
  supportUrl: 'https://example.com/ho-tro',
};
