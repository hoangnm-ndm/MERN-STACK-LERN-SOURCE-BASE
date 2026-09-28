import { AuthMethodSettings } from '@/features/settings';

/** Khu quản trị > Cấu hình hệ thống (Phase 4, 8). Chỉ Super Admin. */
export default function SystemSettingsPage() {
  // TODO:
  // - <h1>Cấu hình hệ thống</h1>
  // - Cảnh báo ngay đầu trang: "Các thay đổi ở đây ảnh hưởng tới toàn bộ người
  //   dùng và có hiệu lực ngay."
  // - <AuthMethodSettings />
  //
  // - Hiện "Cập nhật lần cuối bởi ... lúc ..." (settings.updatedBy, updatedAt) —
  //   trong nhóm có nhiều Super Admin, thông tin này giúp truy vết ai đã đổi gì.
  //   Cần backend populate `updatedBy` thành tên người, hiện đang trả về id.
  //   Xem CHECKLIST mục [BE-04].
  return null;
}
