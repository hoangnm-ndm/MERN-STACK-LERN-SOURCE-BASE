import { Button, Text } from '@react-email/components';
import { EmailLayout, styles } from './components/EmailLayout.jsx';

/**
 * Email thông báo gửi theo lịch cho một nhóm user (Phase 13).
 *
 * Nội dung do admin nhập ở giao diện scheduler và lưu trong `payload` của job.
 *
 * @param {object} props
 * @param {string} props.name tên người nhận, để cá nhân hoá
 * @param {string} props.heading
 * @param {string} props.body nội dung chính (nhiều đoạn, ngăn bằng '\n\n')
 * @param {string} [props.ctaLabel]
 * @param {string} [props.ctaUrl]
 */
export default function AnnouncementEmail({ name = 'bạn', heading, body, ctaLabel, ctaUrl }) {
  // TODO:
  // - Hiện {heading} làm tiêu đề.
  // - Tách {body} theo '\n\n' rồi render mỗi đoạn một <Text>.
  //   TUYỆT ĐỐI không nhét body vào dangerouslySetInnerHTML: nội dung do người
  //   dùng (admin) nhập, chèn HTML thô là mở đường cho script lạ vào email.
  // - Chỉ render nút khi có ĐỦ cả ctaLabel và ctaUrl.
  return <EmailLayout preview={heading ?? 'Thông báo mới'}>{null}</EmailLayout>;
}

AnnouncementEmail.PreviewProps = {
  name: 'Tuấn Anh',
  heading: 'Bảo trì hệ thống cuối tuần này',
  body: 'Hệ thống sẽ tạm ngừng từ 23h ngày 30/09.\n\nMong bạn thông cảm cho sự bất tiện này.',
  ctaLabel: 'Xem chi tiết',
  ctaUrl: 'https://example.com/thong-bao',
};
