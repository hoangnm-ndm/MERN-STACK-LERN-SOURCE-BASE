/**
 * Khu quản trị > Tổng quan.
 *
 * `export default` vì trang này được nạp bằng `lazy(() => import(...))` trong
 * admin.routes.jsx — lazy cần default export.
 */
export default function DashboardPage() {
  // TODO:
  // - <h1>Tổng quan</h1>
  // - Vài thẻ số liệu: tổng người dùng, số bị chặn, số ảnh trong thư viện,
  //   job lỗi gần đây.
  //
  // - CÒN THIẾU Ở BACKEND: chưa có endpoint thống kê. Hai hướng:
  //   a) Thêm `GET /admin/stats` trả sẵn các số (một request, nhanh) — khuyến nghị.
  //   b) Gọi các endpoint list với limit=1 rồi đọc `meta.total` (không cần code
  //      backend mới, nhưng tốn nhiều request và hơi khiên cưỡng).
  //   Xem CHECKLIST mục [BE-03].
  //
  // - Đây cũng là chỗ để bạn đặt nội dung riêng của dự án.
  return null;
}
