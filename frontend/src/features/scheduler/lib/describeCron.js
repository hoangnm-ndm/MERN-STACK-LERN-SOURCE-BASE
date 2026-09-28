/**
 * Diễn giải biểu thức cron thành tiếng Việt dễ đọc.
 *
 * Vì sao cần: '0 3 * * *' là thứ chỉ lập trình viên đọc được. Admin cấu hình job
 * cần thấy '03:00 mỗi ngày' để biết mình vừa đặt đúng hay chưa.
 */

/** Mẫu cron thông dụng, khai báo sẵn cho người dùng chọn thay vì tự gõ. */
export const CRON_PRESETS = [
  { value: '*/15 * * * *', label: 'Mỗi 15 phút' },
  { value: '0 * * * *', label: 'Mỗi giờ (phút 0)' },
  { value: '0 3 * * *', label: 'Hằng ngày lúc 03:00' },
  { value: '0 8 * * *', label: 'Hằng ngày lúc 08:00' },
  { value: '0 8 * * 1', label: 'Thứ Hai hằng tuần lúc 08:00' },
  { value: '0 3 1 * *', label: 'Ngày 1 mỗi tháng lúc 03:00' },
];

/**
 * @param {string} expression biểu thức cron 5 trường
 * @returns {string} mô tả tiếng Việt, hoặc trả lại nguyên biểu thức nếu không diễn giải được
 */
export function describeCron(expression) {
  // TODO:
  // 1. Trùng với một preset → trả label của preset (nhanh và chính xác nhất).
  // 2. Không trùng → diễn giải các trường hợp đơn giản:
  //    - '0 H * * *'    → `Hằng ngày lúc HH:00`
  //    - 'M H * * *'    → `Hằng ngày lúc HH:MM`
  //    - '*/N * * * *'  → `Mỗi N phút`
  //    - 'M H * * D'    → `Thứ ... hằng tuần lúc HH:MM` (0=Chủ nhật … 6=Thứ Bảy)
  // 3. Không khớp mẫu nào → TRẢ LẠI NGUYÊN biểu thức, đừng đoán bừa.
  //    Diễn giải sai còn tệ hơn không diễn giải: admin sẽ tin vào mô tả sai.
  //
  // GHI CHÚ: đừng cố xử lý mọi cú pháp cron (danh sách 1,15, khoảng 1-5, bước
  // phức hợp). Có thư viện chuyên làm việc này (cronstrue) nếu về sau cần —
  // hiện tại vài mẫu thông dụng là đủ (YAGNI).
  throw new Error('describeCron() chưa được triển khai');
}
