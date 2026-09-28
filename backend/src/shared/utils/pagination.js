/**
 * Phân trang dùng chung. Giới hạn `limit` tối đa để một request không thể kéo
 * cả collection về (vừa chậm vừa là cửa cho DoS).
 */
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

/** @typedef {{ page: number, limit: number, total: number, totalPages: number }} PaginationMeta */

/**
 * @param {{ page?: number, limit?: number }} query đã được Zod parse ở tầng route
 * @returns {{ page: number, limit: number, skip: number }}
 */
export function resolvePagination(query) {
  // TODO:
  // - page = max(1, query.page ?? DEFAULT_PAGE)
  // - limit = min(MAX_LIMIT, max(1, query.limit ?? DEFAULT_LIMIT))
  // - skip = (page - 1) * limit
  throw new Error('resolvePagination() chưa được triển khai');
}

/**
 * @param {{ page: number, limit: number, total: number }} params
 * @returns {PaginationMeta}
 */
export function buildPaginationMeta({ page, limit, total }) {
  // TODO: totalPages = Math.ceil(total / limit) (total = 0 → totalPages = 0)
  throw new Error('buildPaginationMeta() chưa được triển khai');
}

/**
 * Chuyển chuỗi sort của client thành object sort của Mongoose, chỉ cho phép
 * các field trong whitelist — nếu không, client có thể sort theo field nhạy cảm
 * hoặc field không có index làm truy vấn rất chậm.
 *
 * @param {string | undefined} sort ví dụ '-createdAt' hoặc 'email'
 * @param {string[]} allowedFields
 * @param {Record<string, 1 | -1>} [fallback]
 * @returns {Record<string, 1 | -1>}
 */
export function resolveSort(sort, allowedFields, fallback = { createdAt: -1 }) {
  // TODO:
  // - Không có sort → trả fallback.
  // - Tiền tố '-' nghĩa là giảm dần.
  // - Field không nằm trong allowedFields → trả fallback (đừng ném lỗi, tránh
  //   làm hỏng UI vì một tham số URL sai).
  throw new Error('resolveSort() chưa được triển khai');
}
