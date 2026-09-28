import { createApp } from './app.js';
import { env } from './shared/config/env.js';
import { connectDB, disconnectDB } from './shared/config/db.js';
import { logger } from './shared/lib/logger.js';
import { stopAllTasks } from './shared/lib/scheduler.js';
import { bootstrapScheduler } from './modules/scheduler/scheduler.bootstrap.js';

/**
 * Điểm khởi động duy nhất. File này chỉ làm 4 việc, tổng cộng vài chục dòng:
 * kết nối DB → listen → nạp scheduler → dọn dẹp khi tắt.
 *
 * KHÔNG định nghĩa route, không logic nghiệp vụ, không cấu hình mail ở đây.
 */

async function main() {
  // TODO:
  // - `await connectDB()` — phải xong TRƯỚC listen, nếu không Mongoose sẽ buffer
  //   query và request đầu tiên treo im lặng khi DB lỗi.
  // - `const app = createApp()`
  // - `const server = app.listen(env.PORT, ...)` + log port và NODE_ENV.
  // - `if (env.SCHEDULER_ENABLED) await bootstrapScheduler()` — nạp job từ DB.
  // - Gọi registerShutdown(server).
}

/**
 * Graceful shutdown: ngừng nhận request mới, chờ request đang chạy xong, rồi
 * mới đóng DB. Thiếu bước này, deploy giữa lúc có request sẽ làm dở dang
 * transaction và client nhận lỗi kết nối.
 *
 * @param {import('node:http').Server} server
 */
function registerShutdown(server) {
  // TODO:
  // - Với cả 'SIGINT' và 'SIGTERM': log, stopAllTasks(), server.close(),
  //   await disconnectDB(), process.exit(0).
  // - Đặt cờ để tín hiệu thứ hai không chạy shutdown hai lần.
  // - Đặt timeout (ví dụ 10s) buộc thoát nếu có kết nối treo.
  //
  // - process.on('unhandledRejection') và ('uncaughtException'):
  //   log ĐẦY ĐỦ rồi thoát với code 1. Đừng "log rồi chạy tiếp" — process đã ở
  //   trạng thái không xác định, chạy tiếp dễ làm hỏng dữ liệu.
}

main().catch((error) => {
  logger.error({ err: error }, 'Khởi động server thất bại');
  process.exit(1);
});
