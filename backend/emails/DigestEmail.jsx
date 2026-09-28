import { Text } from '@react-email/components';
import { EmailLayout, styles } from './components/EmailLayout.jsx';

/**
 * Email tổng hợp định kỳ (bản tin) — lựa chọn thứ hai cho job SEND_EMAIL_TO_GROUP.
 *
 * Khác AnnouncementEmail ở chỗ: có danh sách mục thay vì một khối nội dung.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.heading
 * @param {string} props.body đoạn mở đầu
 * @param {Array<{ title: string, description?: string, url?: string }>} [props.items]
 * @param {string} [props.ctaLabel]
 * @param {string} [props.ctaUrl]
 */
export default function DigestEmail({ name = 'bạn', heading, body, items = [], ctaLabel, ctaUrl }) {
  // TODO:
  // - Heading + đoạn mở đầu.
  // - Render {items}: mỗi mục là title (link nếu có url) + description.
  //   Dùng `key` là url hoặc title, KHÔNG dùng index nếu danh sách có thể đổi thứ tự.
  // - Nút CTA ở cuối nếu có đủ label và url.
  return <EmailLayout preview={heading ?? 'Bản tin của bạn'}>{null}</EmailLayout>;
}

DigestEmail.PreviewProps = {
  name: 'Tuấn Anh',
  heading: 'Bản tin tuần này',
  body: 'Dưới đây là những nội dung đáng chú ý.',
  items: [
    { title: 'Tính năng thư viện media', description: 'Quản lý ảnh theo thư mục.', url: 'https://example.com/a' },
    { title: 'Đăng nhập bằng magic link', description: 'Không cần nhớ mật khẩu.' },
  ],
};
