import { getGoogleAuthUrl } from '../api/authApi';

/**
 * Nút đăng nhập bằng Google.
 *
 * @param {object} props
 * @param {boolean} [props.disabled] tắt khi Super Admin đã tắt Google login
 */
export function GoogleLoginButton({ disabled }) {
  // TODO:
  // - <button type="button" onClick={() => { window.location.href = getGoogleAuthUrl() }}>
  //   + icon Google + chữ "Tiếp tục với Google".
  //
  // VÌ SAO GÁN window.location.href CHỨ KHÔNG navigate() hay fetch():
  // - `navigate()` của react-router chỉ đổi route trong ứng dụng, không đi ra
  //   domain khác được.
  // - `fetch()` sẽ bị CORS chặn, và kể cả không chặn thì người dùng vẫn ở lại
  //   trang này, không thấy màn hình đồng ý của Google.
  // Đây là điều hướng RỜI KHỎI ứng dụng, phải dùng location.
  //
  // - `disabled` → khoá nút kèm tooltip giải thích, đừng ẩn hẳn (người dùng sẽ
  //   tưởng hệ thống lỗi).
  return null;
}
