import * as usersService from './users.service.js';
import { sendSuccess, sendPaginated } from '../../shared/utils/response.js';

/**
 * Controller users. Nhiệm vụ duy nhất: lấy dữ liệu ĐÃ validate từ `req`,
 * gọi service, trả response qua helper.
 *
 * KHÔNG truy vấn DB ở đây. KHÔNG logic nghiệp vụ (kiểm tra quyền, so sánh role).
 * KHÔNG try/catch: Express 5 tự bắt lỗi của async handler và đẩy sang errorHandler.
 */

/** `GET /users/me` — thông tin của chính mình. */
export async function getMe(req, res) {
  // TODO: usersService.getById(req.user.id) → sendSuccess.
}

/** `PATCH /users/me` */
export async function updateMe(req, res) {
  // TODO: usersService.updateProfile(req.user.id, req.body) → sendSuccess(..., 'Cập nhật thành công').
}

/** `GET /users` — khu quản trị, có phân trang. */
export async function list(req, res) {
  // TODO: const { items, meta } = await usersService.listUsers(req.query) → sendPaginated(res, items, meta).
}

/** `GET /users/:id` */
export async function getById(req, res) {
  // TODO: usersService.getById(req.params.id) → sendSuccess.
}

/** `PATCH /users/:id/role` */
export async function changeRole(req, res) {
  // TODO: usersService.changeRole({ actor: req.user, targetUserId: req.params.id, role: req.body.role }).
}

/** `POST /users/:id/block` */
export async function block(req, res) {
  // TODO: usersService.setBlocked({ actor: req.user, targetUserId: req.params.id, blocked: true, reason: req.body.reason }).
}

/** `POST /users/:id/unblock` */
export async function unblock(req, res) {
  // TODO: usersService.setBlocked({ ..., blocked: false }).
}
