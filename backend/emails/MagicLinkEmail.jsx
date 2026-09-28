import { Button, Link, Text } from '@react-email/components';
import { EmailLayout, styles } from './components/EmailLayout.jsx';

/**
 * Email chứa link đăng nhập không cần mật khẩu (Phase 4).
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.loginUrl
 * @param {number} props.expiresInMinutes
 * @param {string} [props.requestIp] giúp người dùng nhận ra yêu cầu lạ
 */
export default function MagicLinkEmail({
  name = 'bạn',
  loginUrl = '#',
  expiresInMinutes = 15,
  requestIp,
}) {
  // TODO:
  // - Nhấn mạnh link CHỈ DÙNG ĐƯỢC MỘT LẦN và hết hạn sau {expiresInMinutes} phút.
  // - <Button href={loginUrl}>Đăng nhập</Button> + link dạng chữ.
  // - Cảnh báo bảo mật: "Không chuyển tiếp email này cho ai — bất kỳ ai có link
  //   đều đăng nhập được vào tài khoản của bạn."
  // - Nếu có requestIp thì ghi kèm để người dùng nhận biết yêu cầu không phải của mình.
  return <EmailLayout preview="Liên kết đăng nhập của bạn">{null}</EmailLayout>;
}

MagicLinkEmail.PreviewProps = {
  name: 'Tuấn Anh',
  loginUrl: 'https://example.com/dang-nhap/magic?token=demo',
  expiresInMinutes: 15,
  requestIp: '203.0.113.10',
};
