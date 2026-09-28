import { beforeAll, afterAll, afterEach } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

/**
 * Môi trường test: MongoDB in-memory, KHÔNG dùng DB dev/production.
 *
 * Dùng `MongoMemoryReplSet` (không phải MongoMemoryServer) vì code có
 * `withTransaction` — transaction đòi replica set.
 *
 * @type {MongoMemoryReplSet}
 */
let replSet;

beforeAll(async () => {
  // TODO:
  // - replSet = await MongoMemoryReplSet.create({ replSet: { count: 1 } })
  // - process.env.MONGODB_URI = replSet.getUri()
  //   PHẢI gán TRƯỚC khi import bất cứ module nào gọi loadEnv() — vì vậy file
  //   test nên import app/service bằng `await import()` bên trong test, hoặc đặt
  //   các biến env cần thiết ở đầu file này.
  // - Gán các biến env bắt buộc khác bằng giá trị giả (secret đủ 32 ký tự,
  //   RESEND_API_KEY='test', các URL hợp lệ...) để env.js parse qua được.
  // - process.env.SCHEDULER_ENABLED = 'false' — không cho job chạy thật khi test.
  // - await mongoose.connect(process.env.MONGODB_URI)
});

afterEach(async () => {
  // TODO: xoá dữ liệu MỌI collection giữa các test (deleteMany({}) cho từng
  // collection trong mongoose.connection.collections).
  // Bỏ bước này thì test này ảnh hưởng test kia và kết quả phụ thuộc thứ tự chạy.
  //
  // Lưu ý: xoá dữ liệu thay vì dropDatabase() để giữ lại index đã tạo.
});

afterAll(async () => {
  // TODO: await mongoose.disconnect(); await replSet?.stop();
});
