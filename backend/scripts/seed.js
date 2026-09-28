import { env } from '../src/shared/config/env.js';
import { connectDB, disconnectDB } from '../src/shared/config/db.js';
import { logger } from '../src/shared/lib/logger.js';
import { hashPassword } from '../src/shared/utils/password.js';
import { UserModel } from '../src/modules/users/users.model.js';
import { Roles, UserStatus } from '../src/shared/constants/roles.js';

/**
 * Seed dữ liệu khởi tạo: tài khoản Super Admin đầu tiên.
 *
 * Chạy bằng `npm run db:seed`, TÁCH KHỎI code khởi động server. Nhúng seed vào
 * server.js sẽ khiến mỗi lần restart lại ghi dữ liệu — rất dễ ghi đè thay đổi
 * thật trên production.
 *
 * Con gà và quả trứng: Super Admin không thể tạo qua API (API đòi phải đã là
 * Super Admin), nên phải tạo bằng script chạy trực tiếp trên server.
 */
async function seed() {
  // TODO:
  // 1. Kiểm tra SEED_SUPER_ADMIN_EMAIL và SEED_SUPER_ADMIN_PASSWORD có trong
  //    process.env (hai biến này KHÔNG bắt buộc trong env.js vì chỉ script này
  //    dùng). Thiếu → log hướng dẫn rồi exit(1).
  // 2. await connectDB()
  // 3. Đã có Super Admin nào chưa? countDocuments({ role: SUPER_ADMIN })
  //    - Có rồi → log "đã tồn tại, bỏ qua" và KHÔNG tạo thêm (chạy lại script
  //      nhiều lần phải an toàn — tính idempotent).
  // 4. passwordHash = await hashPassword(process.env.SEED_SUPER_ADMIN_PASSWORD)
  // 5. Tạo user: role SUPER_ADMIN, status ACTIVE, emailVerifiedAt = new Date()
  //    (đánh dấu đã xác minh luôn để đăng nhập được ngay, không cần gửi email).
  // 6. Log email đã tạo. TUYỆT ĐỐI KHÔNG log mật khẩu.
  // 7. finally: await disconnectDB()
  //
  // GỢI Ý MỞ RỘNG: thêm cờ `--demo` để seed thêm vài user thường và thư mục media
  // mẫu, phục vụ phát triển giao diện. Chỉ cho phép khi NODE_ENV !== 'production'.
  throw new Error('seed() chưa được triển khai');
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error({ err: error }, 'Seed thất bại');
    process.exit(1);
  });
