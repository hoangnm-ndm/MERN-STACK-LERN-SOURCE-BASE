import { Button, Text } from '@react-email/components';
import { EmailLayout, styles } from './components/EmailLayout.jsx';

/**
 * Email chào mừng, gửi sau khi xác minh email thành công.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.appUrl link vào ứng dụng
 */
export default function WelcomeEmail({ name = 'bạn', appUrl = '#' }) {
  // TODO: lời chào, 2-3 gạch đầu dòng gợi ý việc nên làm đầu tiên
  // (hoàn thiện hồ sơ, đổi ảnh đại diện), rồi nút "Bắt đầu".
  return <EmailLayout preview="Chào mừng bạn!">{null}</EmailLayout>;
}

WelcomeEmail.PreviewProps = {
  name: 'Tuấn Anh',
  appUrl: 'https://example.com',
};
