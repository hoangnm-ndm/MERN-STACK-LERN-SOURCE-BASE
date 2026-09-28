import * as settingsService from './settings.service.js';
import { sendSuccess } from '../../shared/utils/response.js';

/** `GET /settings/public` — không cần đăng nhập, trang login dùng để biết hiện nút nào. */
export async function getPublic(req, res) {
  // TODO: settingsService.getPublicSettings() → sendSuccess.
}

/** `GET /settings` — Super Admin, trả toàn bộ cấu hình. */
export async function get(req, res) {
  // TODO: settingsService.getSettings({ skipCache: true }) → sendSuccess.
  // skipCache vì trang quản trị phải thấy giá trị thật, không phải bản cache.
}

/** `PATCH /settings` — Super Admin. */
export async function update(req, res) {
  // TODO: settingsService.updateSettings({ patch: req.body, actorId: req.user.id })
  // → sendSuccess(res, settings, 'Cập nhật cấu hình thành công')
}
