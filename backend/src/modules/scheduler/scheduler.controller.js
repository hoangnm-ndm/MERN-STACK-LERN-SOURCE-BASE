import * as schedulerService from './scheduler.service.js';
import { sendSuccess, sendCreated, sendPaginated, sendNoContent } from '../../shared/utils/response.js';

/** Controller scheduler — toàn bộ chỉ dành cho Super Admin (kiểm tra ở route). */

/** `GET /scheduler/jobs` */
export async function listJobs(req, res) {
  // TODO: schedulerService.listJobs() → sendSuccess.
}

/** `GET /scheduler/jobs/:id` */
export async function getJob(req, res) {
  // TODO: schedulerService.getJobById(req.params.id) → sendSuccess.
}

/** `POST /scheduler/jobs` */
export async function createJob(req, res) {
  // TODO: schedulerService.createJob({ input: req.body, actorId: req.user.id }) → sendCreated.
}

/** `PATCH /scheduler/jobs/:id` */
export async function updateJob(req, res) {
  // TODO: schedulerService.updateJob({ jobId: req.params.id, input: req.body }).
}

/** `DELETE /scheduler/jobs/:id` */
export async function deleteJob(req, res) {
  // TODO: schedulerService.deleteJob(req.params.id) → sendNoContent.
}

/** `POST /scheduler/jobs/:id/run` — chạy ngay, không chờ tới giờ. */
export async function runNow(req, res) {
  // TODO: schedulerService.executeJob({ jobId: req.params.id, triggeredBy: 'MANUAL' })
  // → sendSuccess(res, jobRun, 'Job đã chạy xong').
  //
  // CÂN NHẮC: job dài (gửi hàng nghìn email) sẽ làm request timeout. Với job dài
  // nên trả 202 Accepted ngay và để FE poll lịch sử chạy, thay vì chờ kết quả.
}

/** `GET /scheduler/jobs/:id/runs` — lịch sử chạy. */
export async function listRuns(req, res) {
  // TODO: schedulerService.listJobRuns({ jobId: req.params.id, query: req.query }) → sendPaginated.
}
