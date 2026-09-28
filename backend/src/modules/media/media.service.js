import { MediaModel, MediaStatus, MediaKinds } from './media.model.js';
import { findMediaUsages, releaseMediaReferences } from './media.usage.js';
import * as foldersService from './mediaFolder.service.js';
import {
  buildObjectKey,
  createPresignedUploadUrl,
  headObject,
  deleteObject,
  buildPublicUrl,
  ALLOWED_IMAGE_MIME_TYPES,
} from '../../shared/lib/storage.js';
import { env } from '../../shared/config/env.js';
import { badRequest, conflict, forbidden, notFound } from '../../shared/errors/AppError.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';
import { resolvePagination, buildPaginationMeta, resolveSort } from '../../shared/utils/pagination.js';
import { toApi } from '../../shared/utils/serialize.js';

/**
 * Nghiệp vụ media (Phase 7, 11, 12).
 *
 * LUỒNG UPLOAD 3 BƯỚC — xem sơ đồ ở docs/05-media-va-storage.md:
 *   1. createUploadUrl()  → record PENDING + presigned PUT URL
 *   2. (FE PUT file thẳng lên R2, backend không tham gia)
 *   3. confirmUpload()    → kiểm tra file có thật trên R2 → READY
 */

/**
 * Bước 1: cấp URL upload.
 *
 * @param {object} params
 * @param {import('./media.schema.js').CreateUploadUrlInput} params.input
 * @param {string} params.userId
 * @returns {Promise<{ media: object, uploadUrl: string, expiresIn: number }>}
 */
export async function createUploadUrl({ input, userId }) {
  // TODO:
  // 1. Kiểm tra size <= env.UPLOAD_MAX_SIZE_MB * 1024 * 1024 → vượt thì
  //    throw badRequest(..., MEDIA_TOO_LARGE). (Zod đã chặn thô, đây là giới hạn thật.)
  // 2. mimeType không nằm trong ALLOWED_IMAGE_MIME_TYPES → MEDIA_TYPE_NOT_ALLOWED.
  //    Lưu ý: mimeType do client khai báo nên không đáng tin tuyệt đối; nó được ký
  //    vào presigned URL nên R2 sẽ từ chối nếu client đổi lúc PUT.
  // 3. folderId có → kiểm tra thư mục tồn tại (foldersService.getById).
  // 4. key = buildObjectKey({ folder: input.kind === 'AVATAR' ? 'avatars' : 'library', originalName })
  // 5. Tạo record status PENDING (size = số FE khai báo, sẽ ghi lại số thật ở bước confirm).
  // 6. uploadUrl = await createPresignedUploadUrl({ key, contentType, contentLength: size })
  // 7. Trả record + uploadUrl.
  throw new Error('createUploadUrl() chưa được triển khai');
}

/**
 * Bước 3: xác nhận upload xong.
 *
 * @param {object} params
 * @param {string} params.mediaId
 * @param {string} params.userId
 * @param {{ alt?: string, width?: number, height?: number }} params.input
 * @returns {Promise<object>}
 */
export async function confirmUpload({ mediaId, userId, input }) {
  // TODO:
  // 1. Lấy record; không có → 404.
  // 2. Kiểm tra sở hữu: record.uploadedBy !== userId và không phải admin → 403.
  //    Thiếu bước này, user A confirm được record của user B.
  // 3. Đã READY rồi → trả luôn (idempotent: FE gọi lại do mạng chập chờn thì
  //    không nên báo lỗi).
  // 4. result = await headObject(record.key)
  //    - !exists → throw badRequest(..., MEDIA_UPLOAD_NOT_CONFIRMED): FE báo xong
  //      nhưng R2 không có file.
  // 5. Cập nhật: status READY, size = result.size (SỐ THẬT từ R2, không tin FE),
  //    mimeType = result.contentType, confirmedAt = now, alt/width/height từ input.
  //    Dùng { new: true, runValidators: true }.
  throw new Error('confirmUpload() chưa được triển khai');
}

/**
 * Danh sách media cho thư viện (Phase 12): lưới/danh sách, lọc, tìm kiếm.
 *
 * @param {import('./media.schema.js').ListMediaQuery} query
 * @returns {Promise<{ items: object[], meta: import('../../shared/utils/pagination.js').PaginationMeta }>}
 */
export async function listMedia(query) {
  // TODO:
  // - Dựng filter: kind, status, folder (query.folderId === 'root' → folder: null).
  // - `q` → tìm theo originalName; escape regex trước khi dùng (chống ReDoS).
  // - orphanOnly → xem findOrphanMedia(): cần lọc theo tham chiếu nên KHÔNG làm
  //   được bằng một filter Mongo thuần; xử lý riêng nhánh này.
  // - Promise.all([find..., countDocuments...]).
  // - Mỗi item bổ sung `url: buildPublicUrl(item.key)` để FE không phải tự ghép.
  // - Đã .lean() nên PHẢI map qua toApi().
  throw new Error('listMedia() chưa được triển khai');
}

/**
 * @param {string} mediaId
 * @returns {Promise<object>}
 */
export async function getById(mediaId) {
  // TODO: findById + lean + toApi + gắn url; null → 404.
  throw new Error('getById() chưa được triển khai');
}

/**
 * Sửa alt / di chuyển thư mục.
 *
 * @param {object} params
 * @param {string} params.mediaId
 * @param {{ alt?: string, folderId?: string | null }} params.input
 * @returns {Promise<object>}
 */
export async function updateMedia({ mediaId, input }) {
  // TODO: kiểm tra folder đích tồn tại nếu có folderId; update với runValidators.
  throw new Error('updateMedia() chưa được triển khai');
}

/**
 * Xoá media — CHẶN nếu đang được sử dụng (Phase 12).
 *
 * @param {object} params
 * @param {string} params.mediaId
 * @param {boolean} [params.force] true = gỡ tham chiếu rồi xoá
 * @returns {Promise<void>}
 */
export async function deleteMedia({ mediaId, force = false }) {
  // TODO — thứ tự rất quan trọng:
  // 1. Lấy record; không có → 404.
  // 2. usages = await findMediaUsages(mediaId)
  // 3. usages.inUse && !force → throw conflict(
  //      `Ảnh đang được dùng: ${danh sách}`, MEDIA_IN_USE)
  //    Đây là yêu cầu cốt lõi của Phase 12: không cho xoá ảnh đang hiển thị.
  // 4. force → await releaseMediaReferences(mediaId)
  // 5. Xoá document trong DB TRƯỚC, rồi mới xoá object trên R2.
  //    VÌ SAO THỨ TỰ NÀY: nếu xoá R2 trước mà xoá DB lỗi, ta có record trỏ tới
  //    file không tồn tại → ảnh vỡ trên giao diện. Ngược lại, xoá DB trước mà
  //    xoá R2 lỗi thì chỉ còn file rác trên R2 — và job dọn ảnh mồ côi sẽ xử lý.
  //    Luôn chọn hướng lỗi ít gây hại hơn.
  // 6. deleteObject lỗi → log warning, KHÔNG ném lỗi ra ngoài (với người dùng
  //    thao tác đã thành công).
  throw new Error('deleteMedia() chưa được triển khai');
}

/**
 * Tìm ảnh mồ côi: đã READY nhưng không được nghiệp vụ nào tham chiếu, và đủ cũ.
 *
 * @param {object} [params]
 * @param {number} [params.graceHours] mặc định env.ORPHAN_MEDIA_GRACE_HOURS
 * @param {number} [params.limit] giới hạn mỗi lượt quét
 * @returns {Promise<object[]>}
 */
export async function findOrphanMedia({ graceHours, limit = 500 } = {}) {
  // TODO:
  // - cutoff = now - (graceHours ?? env.ORPHAN_MEDIA_GRACE_HOURS) giờ.
  //   VÌ SAO CẦN KHOẢNG CHỜ: ảnh vừa upload xong nhưng người dùng chưa bấm Lưu
  //   thì chưa ai tham chiếu — dọn ngay là xoá mất ảnh họ đang soạn.
  // - Lấy ứng viên: { status: READY, createdAt: { $lt: cutoff } } giới hạn `limit`.
  // - Với từng ứng viên gọi findMediaUsages, giữ lại cái nào inUse === false.
  //   Đây là N+1 query có chủ ý, chấp nhận được vì job chạy nền theo lô nhỏ.
  //   Nếu về sau chậm, cách tối ưu là gom tất cả mediaId đang được dùng bằng một
  //   truy vấn `distinct` cho mỗi consumer rồi trừ tập hợp.
  throw new Error('findOrphanMedia() chưa được triển khai');
}

/**
 * Tìm record PENDING quá cũ — upload bỏ dở, cần dọn cả DB lẫn R2.
 *
 * @param {number} [olderThanHours]
 * @returns {Promise<object[]>}
 */
export async function findStalePendingMedia(olderThanHours = 24) {
  // TODO: find({ status: PENDING, createdAt: { $lt: cutoff } }).lean()
  throw new Error('findStalePendingMedia() chưa được triển khai');
}

/**
 * Dùng bởi users.service để xác nhận một media hợp lệ khi đặt làm ảnh đại diện.
 *
 * @param {object} params
 * @param {string} params.mediaId
 * @param {string} params.userId
 * @returns {Promise<object>}
 */
export async function assertUsableAsAvatar({ mediaId, userId }) {
  // TODO:
  // - Media tồn tại, status === READY (chưa confirm thì không được dùng).
  // - Thuộc về userId HOẶC kind === LIBRARY (ảnh thư viện dùng chung được).
  //   Không kiểm tra thì user A đặt ảnh riêng của user B làm avatar của mình.
  throw new Error('assertUsableAsAvatar() chưa được triển khai');
}
