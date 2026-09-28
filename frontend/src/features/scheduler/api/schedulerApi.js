import { http } from '@/shared/lib/http';

/** Hàm gọi API lịch tự động (Phase 13). */

/** @returns {Promise<object[]>} */
export async function getJobs() {
  // TODO: http.get('/scheduler/jobs')
  throw new Error('getJobs() chưa được triển khai');
}

/** @param {string} id @returns {Promise<object>} */
export async function getJob(id) {
  // TODO: http.get(`/scheduler/jobs/${id}`)
  throw new Error('getJob() chưa được triển khai');
}

/**
 * @param {{ name: string, type: string, cronExpression: string, enabled: boolean, payload: object }} input
 * @returns {Promise<object>}
 */
export async function createJob(input) {
  // TODO: http.post('/scheduler/jobs', input)
  throw new Error('createJob() chưa được triển khai');
}

/** @param {{ id: string } & object} params @returns {Promise<object>} */
export async function updateJob({ id, ...input }) {
  // TODO: http.patch(`/scheduler/jobs/${id}`, input)
  throw new Error('updateJob() chưa được triển khai');
}

/** @param {string} id @returns {Promise<void>} */
export async function deleteJob(id) {
  // TODO: http.delete(`/scheduler/jobs/${id}`)
  throw new Error('deleteJob() chưa được triển khai');
}

/**
 * Chạy job ngay, không chờ tới giờ.
 * @param {string} id
 * @returns {Promise<object>} bản ghi JobRun
 */
export async function runJobNow(id) {
  // TODO: http.post(`/scheduler/jobs/${id}/run`, null, { timeout: 120_000 })
  // Tăng timeout: job có thể chạy lâu hơn 15 giây mặc định của instance http.
  throw new Error('runJobNow() chưa được triển khai');
}

/**
 * @param {{ jobId: string, page?: number, limit?: number, status?: string }} params
 * @returns {Promise<{ items: object[], meta: object }>}
 */
export async function getJobRuns({ jobId, ...params }) {
  // TODO: http.get(`/scheduler/jobs/${jobId}/runs`, { params })
  throw new Error('getJobRuns() chưa được triển khai');
}
