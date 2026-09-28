import * as sessionsService from './sessions.service.js';
import { sendSuccess } from '../../shared/utils/response.js';

/** `GET /sessions` — các thiết bị đang đăng nhập của chính mình. */
export async function list(req, res) {
  // TODO: sessionsService.listUserSessions({ userId: req.user.id, currentSessionId: req.user.sessionId })
}

/** `DELETE /sessions/:id` — đăng xuất một thiết bị. */
export async function revoke(req, res) {
  // TODO: sessionsService.revokeSession({ sessionId: req.params.id, userId: req.user.id })
  // → sendSuccess(res, null, 'Đã đăng xuất thiết bị')
}

/** `POST /sessions/revoke-others` — đăng xuất mọi thiết bị trừ thiết bị hiện tại. */
export async function revokeOthers(req, res) {
  // TODO: sessionsService.revokeAllSessions(req.user.id, 'REVOKED_BY_USER', req.user.sessionId)
  // → sendSuccess(res, { revoked: count }, `Đã đăng xuất ${count} thiết bị khác`)
}
