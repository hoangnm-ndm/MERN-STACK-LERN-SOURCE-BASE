import { SystemSettingsModel, SETTINGS_SINGLETON_KEY } from './settings.model.js';
import { badRequest, forbidden } from '../../shared/errors/AppError.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';
import { toApi } from '../../shared/utils/serialize.js';

/**
 * Nghiệp vụ cấu hình hệ thống.
 *
 * Cấu hình được ĐỌC ở mỗi lần đăng nhập nên có cache trong bộ nhớ, tránh một
 * truy vấn thừa cho mỗi request auth.
 */

/**
 * Cache đơn giản trong process.
 * Chấp nhận được vì cấu hình rất ít thay đổi. HẠN CHẾ: deploy nhiều instance thì
 * instance khác vẫn dùng cache cũ tới khi hết TTL — đây là lý do TTL phải ngắn.
 * @type {{ value: object | null, expiresAt: number }}
 */
const cache = { value: null, expiresAt: 0 };
const CACHE_TTL_MS = 30_000;

/**
 * Lấy cấu hình hiện tại, tự tạo document mặc định nếu chưa có.
 * @param {{ skipCache?: boolean }} [options]
 * @returns {Promise<object>}
 */
export async function getSettings(options = {}) {
  // TODO:
  // - Còn cache hợp lệ và !skipCache → trả cache.value.
  // - findOneAndUpdate({ key: SETTINGS_SINGLETON_KEY }, { $setOnInsert: {} },
  //     { upsert: true, new: true, runValidators: true }).lean()
  //   `upsert` giúp lần chạy đầu tiên không cần seed riêng, và hai request đồng
  //   thời cũng không tạo ra hai document (unique index chặn).
  // - Lưu cache + trả toApi(doc).
  throw new Error('getSettings() chưa được triển khai');
}

/**
 * Cập nhật cấu hình (chỉ Super Admin — kiểm tra role ở tầng route).
 *
 * @param {object} params
 * @param {object} params.patch chỉ các field có trong Zod schema
 * @param {string} params.actorId
 * @returns {Promise<object>}
 */
export async function updateSettings({ patch, actorId }) {
  // TODO:
  // 1. Lấy cấu hình hiện tại, trộn với patch để biết trạng thái SAU khi đổi.
  // 2. CHẶN TỰ KHOÁ CỬA: nếu sau khi đổi mà cả allowPasswordLogin,
  //    allowMagicLink và allowGoogleLogin đều false → throw badRequest(
  //    'Phải giữ ít nhất một phương thức đăng nhập'). Không có kiểm tra này,
  //    một cú bấm nhầm là mất quyền vào hệ thống, phải sửa tay trong DB.
  // 3. findOneAndUpdate với { new: true, runValidators: true }, set updatedBy.
  // 4. XOÁ CACHE (cache.value = null) — nếu không, thay đổi không có tác dụng
  //    cho tới khi TTL hết, và người dùng sẽ tưởng là bug.
  throw new Error('updateSettings() chưa được triển khai');
}

/**
 * Cấu hình công khai cho frontend ở trang đăng nhập (biết nên hiện nút nào).
 * CHỈ trả các field không nhạy cảm.
 * @returns {Promise<{ allowRegistration: boolean, allowPasswordLogin: boolean, allowMagicLink: boolean, allowGoogleLogin: boolean, maintenanceMode: boolean }>}
 */
export async function getPublicSettings() {
  // TODO: getSettings() rồi CHỌN TƯỜNG MINH các field cần trả.
  // Đừng trả cả object rồi xoá vài field — thêm field nhạy cảm về sau sẽ tự động lộ.
  throw new Error('getPublicSettings() chưa được triển khai');
}

// --- Các hàm "assert" dùng bởi auth service ---
// Gom ở đây để thông điệp lỗi thống nhất, auth service không phải tự đọc cờ rồi
// tự dựng lỗi ở 4 chỗ khác nhau.

/** @returns {Promise<void>} throw 403 AUTH_METHOD_DISABLED nếu đăng ký đang tắt */
export async function assertRegistrationAllowed() {
  // TODO: getSettings() → !allowRegistration → throw forbidden('Hệ thống đang tạm ngừng nhận đăng ký mới', AUTH_METHOD_DISABLED)
  throw new Error('assertRegistrationAllowed() chưa được triển khai');
}

/** @returns {Promise<void>} */
export async function assertPasswordLoginAllowed() {
  // TODO: tương tự với allowPasswordLogin.
  throw new Error('assertPasswordLoginAllowed() chưa được triển khai');
}

/** @returns {Promise<void>} */
export async function assertMagicLinkAllowed() {
  // TODO: tương tự với allowMagicLink.
  throw new Error('assertMagicLinkAllowed() chưa được triển khai');
}

/** @returns {Promise<void>} */
export async function assertGoogleLoginAllowed() {
  // TODO: tương tự với allowGoogleLogin.
  throw new Error('assertGoogleLoginAllowed() chưa được triển khai');
}
