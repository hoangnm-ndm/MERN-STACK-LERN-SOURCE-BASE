import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

/**
 * Footer khu client.
 *
 * Danh sách link trong footer PHẢI là `<nav><ul><li><Link/></li></ul></nav>`.
 * Rất hay gặp lỗi viết `<li>Giới thiệu</li>` (text thuần) hoặc
 * `<li onClick={navigate}>` — cả hai đều làm người dùng bàn phím và screen reader
 * không dùng được, và Google không thấy link.
 */
export function AppFooter() {
  // TODO: <footer> + <nav> chứa vài link nội bộ (dùng <Link>) và link ngoài
  // (dùng <a target="_blank" rel="noopener noreferrer">) + dòng bản quyền.
  return null;
}
