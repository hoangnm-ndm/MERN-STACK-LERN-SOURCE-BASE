/**
 * Helper trả response theo một định dạng duy nhất cho toàn API.
 * Controller CHỈ dùng các hàm này, không tự viết `res.status().json()` —
 * nhờ vậy frontend chỉ cần viết một lớp xử lý response.
 *
 * Thành công:            { success: true, message?, data }
 * Thành công + phân trang: { success: true, data: [...], meta: {...} }
 * Lỗi: do errorHandler dựng, xem shared/middlewares/errorHandler.js
 */

/**
 * @param {import('express').Response} res
 * @param {unknown} data
 * @param {string} [message]
 * @param {number} [status]
 */
export function sendSuccess(res, data, message, status = 200) {
  // TODO: res.status(status).json({ success: true, message, data })
  // Lưu ý: bỏ hẳn key `message` khi không truyền, đừng trả `message: undefined`.
}

/**
 * @param {import('express').Response} res
 * @param {unknown} data
 * @param {string} [message]
 */
export function sendCreated(res, data, message) {
  // TODO: gọi sendSuccess với status 201.
}

/**
 * @param {import('express').Response} res
 * @param {unknown[]} items
 * @param {import('./pagination.js').PaginationMeta} meta
 */
export function sendPaginated(res, items, meta) {
  // TODO: res.status(200).json({ success: true, data: items, meta })
}

/**
 * Dùng cho DELETE hoặc hành động không có dữ liệu trả về.
 * @param {import('express').Response} res
 */
export function sendNoContent(res) {
  // TODO: res.status(204).end()
}
