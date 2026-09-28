import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Ghép class Tailwind, tự xử lý xung đột.
 * `cn('px-2', 'px-4')` → 'px-4' (twMerge bỏ class bị ghi đè).
 *
 * @param {...any} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format ngày giờ theo tiếng Việt.
 * @param {string | Date | null | undefined} value
 * @param {{ withTime?: boolean }} [options]
 * @returns {string} '—' nếu không có giá trị
 */
export function formatDate(value, options = {}) {
  // TODO: dùng Intl.DateTimeFormat('vi-VN', { dateStyle: 'short',
  //   timeStyle: options.withTime ? 'short' : undefined, timeZone: 'Asia/Ho_Chi_Minh' }).
  // Giá trị rỗng/không parse được → trả '—' thay vì 'Invalid Date' trên giao diện.
  throw new Error('formatDate() chưa được triển khai');
}

/**
 * Khoảng thời gian tương đối: '3 phút trước', '2 ngày trước'.
 * Dùng cho danh sách thiết bị đăng nhập và lịch sử chạy job.
 *
 * @param {string | Date} value
 * @returns {string}
 */
export function formatRelativeTime(value) {
  // TODO: dùng Intl.RelativeTimeFormat('vi'), chọn đơn vị lớn nhất phù hợp
  // (giây → phút → giờ → ngày → tháng).
  throw new Error('formatRelativeTime() chưa được triển khai');
}

/**
 * Đổi số byte thành chuỗi dễ đọc: 1536 → '1,5 KB'. Dùng ở thư viện media.
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  // TODO: chia theo 1024, đơn vị B/KB/MB/GB, giữ 1 chữ số thập phân.
  throw new Error('formatFileSize() chưa được triển khai');
}

/**
 * Lấy chữ cái đầu của tên để làm ảnh đại diện mặc định: 'Nguyễn Tuấn Anh' → 'NA'.
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  // TODO: tách theo khoảng trắng, lấy chữ đầu của từ đầu và từ cuối, in hoa.
  // Xử lý cả tên một từ và chuỗi rỗng.
  throw new Error('getInitials() chưa được triển khai');
}
