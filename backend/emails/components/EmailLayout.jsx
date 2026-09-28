import { Body, Container, Head, Hr, Html, Preview, Section, Text } from '@react-email/components';

/**
 * Khung chung cho mọi email: head, body, container, footer.
 *
 * Vì sao dùng React Email thay vì tự viết chuỗi HTML: email client (Outlook,
 * Gmail) hỗ trợ CSS rất hạn chế và cần layout bằng table. React Email lo phần đó.
 *
 * QUY TẮC VIẾT EMAIL:
 * - Style viết inline (object style), KHÔNG dùng class hay file CSS ngoài.
 * - Không dùng Flexbox/Grid — Outlook không hiểu.
 * - Mọi link phải là URL tuyệt đối (email không có "trang hiện tại").
 * - Luôn có `Preview` — đó là dòng chữ xám hiện cạnh tiêu đề trong hộp thư.
 *
 * @param {object} props
 * @param {string} props.preview dòng xem trước trong hộp thư
 * @param {import('react').ReactNode} props.children
 */
export function EmailLayout({ preview, children }) {
  // TODO: dựng khung:
  // <Html lang="vi"><Head /><Preview>{preview}</Preview>
  //   <Body style={styles.body}>
  //     <Container style={styles.container}>
  //       {children}
  //       <Hr />
  //       <Text style={styles.footer}>Email tự động, vui lòng không trả lời.</Text>
  //     </Container>
  //   </Body>
  // </Html>
  return null;
}

/** Style dùng chung — khai báo một nơi để các template trông giống nhau. */
export const styles = {
  body: { backgroundColor: '#f6f7f9', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0 },
  container: { backgroundColor: '#ffffff', padding: '32px', maxWidth: '560px', margin: '24px auto' },
  heading: { fontSize: '22px', fontWeight: 'bold', color: '#111827', margin: '0 0 16px' },
  text: { fontSize: '15px', lineHeight: '24px', color: '#374151', margin: '0 0 16px' },
  muted: { fontSize: '13px', lineHeight: '20px', color: '#6b7280', margin: '0 0 8px' },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '15px',
    display: 'inline-block',
  },
  footer: { fontSize: '12px', color: '#9ca3af', margin: '16px 0 0' },
};
