import { http } from '@/shared/lib/http';

/** Hàm gọi API quản lý phiên đăng nhập (Phase 3). */

/**
 * @returns {Promise<Array<{ id: string, provider: string, userAgent: string, ip: string, lastUsedAt: string, createdAt: string, isCurrent: boolean }>>}
 */
export async function getSessions() {
  // TODO: http.get('/sessions') → res.data.data
  throw new Error('getSessions() chưa được triển khai');
}

/** @param {string} sessionId @returns {Promise<void>} */
export async function revokeSession(sessionId) {
  // TODO: http.delete(`/sessions/${sessionId}`)
  throw new Error('revokeSession() chưa được triển khai');
}

/** @returns {Promise<{ revoked: number }>} */
export async function revokeOtherSessions() {
  // TODO: http.post('/sessions/revoke-others')
  throw new Error('revokeOtherSessions() chưa được triển khai');
}
