import bcrypt from 'bcryptjs';

/**
 * Băm và so sánh mật khẩu. Tập trung ở đây để không lặp `bcrypt.hash` khắp nơi
 * và để đổi thuật toán (ví dụ sang argon2) chỉ sửa một chỗ.
 */
const SALT_ROUNDS = 12; // cost >= 10; 12 là mức cân bằng phổ biến

/**
 * @param {string} plainPassword
 * @returns {Promise<string>} hash để lưu vào users.passwordHash
 */
export async function hashPassword(plainPassword) {
  // TODO: return bcrypt.hash(plainPassword, SALT_ROUNDS)
  throw new Error('hashPassword() chưa được triển khai');
}

/**
 * @param {string} plainPassword
 * @param {string} passwordHash
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(plainPassword, passwordHash) {
  // TODO: return bcrypt.compare(plainPassword, passwordHash)
  // Lưu ý: tài khoản đăng ký bằng Google có thể không có passwordHash →
  // phải xử lý trường hợp hash rỗng/null TRƯỚC khi gọi compare.
  throw new Error('verifyPassword() chưa được triển khai');
}
