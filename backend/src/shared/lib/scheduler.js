import cron from 'node-cron';
import { env } from '../config/env.js';
import { createLogger } from './logger.js';

/**
 * Lớp bọc node-cron: đăng ký, huỷ, liệt kê cron task đang chạy trong process.
 *
 * GIỚI HẠN ĐÃ BIẾT (chấp nhận cho dự án học tập):
 * - Job chạy trong cùng process với API. Nếu deploy nhiều instance, mỗi instance
 *   sẽ chạy job một lần → job bị chạy trùng. Muốn giải quyết đúng cần queue
 *   (BullMQ + Redis) hoặc khoá phân tán trong DB.
 * - Job bị bỏ qua khi process không chạy (không có cơ chế "bù" như cron thật).
 *
 * File này chỉ quản lý *cơ chế hẹn giờ*. Nội dung công việc nằm ở
 * `modules/scheduler/jobs/*.job.js` — tách ra để test được không cần chờ tới giờ.
 */
const log = createLogger('scheduler');

/**
 * Registry các task đang chạy, key là id của ScheduledJob trong DB.
 * @type {Map<string, import('node-cron').ScheduledTask>}
 */
const tasks = new Map();

/**
 * @param {string} expression ví dụ '0 3 * * *'
 * @returns {boolean}
 */
export function isValidCronExpression(expression) {
  // TODO: cron.validate(expression)
  throw new Error('isValidCronExpression() chưa được triển khai');
}

/**
 * Đăng ký (hoặc đăng ký lại) một cron task.
 *
 * @param {object} params
 * @param {string} params.jobId id của ScheduledJob trong DB
 * @param {string} params.expression biểu thức cron
 * @param {() => Promise<void>} params.handler
 * @returns {void}
 */
export function registerTask({ jobId, expression, handler }) {
  // TODO:
  // - Nếu jobId đã có trong `tasks`: gọi unregisterTask trước (tránh chạy 2 lần
  //   khi người dùng sửa cron expression).
  // - task = cron.schedule(expression, handler, { timezone: env.SCHEDULER_TIMEZONE })
  // - Bọc handler để mọi lỗi được log: cron KHÔNG có cơ chế báo lỗi, handler
  //   reject mà không bắt sẽ thành unhandledRejection và có thể sập process.
  // - tasks.set(jobId, task)
}

/**
 * @param {string} jobId
 * @returns {boolean} true nếu có task bị huỷ
 */
export function unregisterTask(jobId) {
  // TODO: task.stop() rồi tasks.delete(jobId).
  throw new Error('unregisterTask() chưa được triển khai');
}

/** @returns {string[]} danh sách jobId đang được hẹn giờ */
export function listRegisteredTaskIds() {
  return [...tasks.keys()];
}

/** Dừng toàn bộ task — gọi khi graceful shutdown. */
export function stopAllTasks() {
  // TODO: duyệt tasks, gọi stop(), clear map, log số task đã dừng.
}
