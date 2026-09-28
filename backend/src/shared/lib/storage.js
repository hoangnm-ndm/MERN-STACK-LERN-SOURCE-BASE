import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '../config/env.js';

/**
 * Lớp bọc Cloudflare R2 (S3-compatible).
 *
 * VÌ SAO DÙNG PRESIGNED URL: file đi trực tiếp từ trình duyệt lên R2, không qua
 * backend. Backend nhẹ hơn và không bị giới hạn body size, đổi lại phải kiểm
 * soát chặt ở bước tạo URL (loại file, kích thước, người tạo) vì sau đó không
 * còn chặn được nữa.
 *
 * Luồng 3 bước (xem docs/05-media-va-storage.md):
 *   1. FE gọi POST /media/upload-url  → BE tạo record PENDING + presigned PUT URL
 *   2. FE PUT file thẳng lên R2
 *   3. FE gọi POST /media/:id/confirm → BE kiểm tra file tồn tại → READY
 */

/** TODO: khởi tạo MỘT client duy nhất.
 * new S3Client({
 *   region: 'auto',                                        // R2 luôn dùng 'auto'
 *   endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
 *   credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
 * })
 */
const s3 = null;

export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Sinh object key cho file. Không dùng tên gốc làm key vì tên gốc có thể trùng,
 * chứa ký tự lạ, hoặc chứa `../` (path traversal).
 *
 * @param {object} params
 * @param {string} params.folder tiền tố thư mục logic, ví dụ 'avatars' | 'library'
 * @param {string} params.originalName để lấy phần mở rộng
 * @returns {string} ví dụ 'avatars/2026/09/uuid.webp'
 */
export function buildObjectKey({ folder, originalName }) {
  // TODO:
  // - Lấy extension từ originalName, chỉ giữ [a-z0-9] và giới hạn độ dài.
  // - Tên file = crypto.randomUUID().
  // - Chèn năm/tháng để một "thư mục" trên R2 không chứa quá nhiều object.
  throw new Error('buildObjectKey() chưa được triển khai');
}

/**
 * Tạo URL có chữ ký để trình duyệt PUT file lên.
 *
 * @param {object} params
 * @param {string} params.key
 * @param {string} params.contentType
 * @param {number} params.contentLength bắt buộc — để R2 từ chối file lớn hơn khai báo
 * @returns {Promise<{ url: string, expiresIn: number }>}
 */
export async function createPresignedUploadUrl({ key, contentType, contentLength }) {
  // TODO:
  // - command = new PutObjectCommand({ Bucket: env.R2_BUCKET, Key: key,
  //     ContentType: contentType, ContentLength: contentLength })
  // - url = await getSignedUrl(s3, command, { expiresIn: env.R2_PRESIGN_TTL_SECONDS })
  // - Ràng buộc ContentType/ContentLength vào chữ ký khiến FE không thể đổi
  //   loại hoặc kích thước file sau khi đã nhận URL.
  throw new Error('createPresignedUploadUrl() chưa được triển khai');
}

/**
 * Kiểm tra object đã thực sự nằm trên R2 (dùng ở bước confirm).
 * @param {string} key
 * @returns {Promise<{ exists: boolean, size?: number, contentType?: string }>}
 */
export async function headObject(key) {
  // TODO: HeadObjectCommand; bắt lỗi NotFound/404 → { exists: false } thay vì ném.
  throw new Error('headObject() chưa được triển khai');
}

/**
 * Xoá object trên R2.
 * @param {string} key
 * @returns {Promise<void>}
 */
export async function deleteObject(key) {
  // TODO: DeleteObjectCommand. S3 coi xoá object không tồn tại là thành công —
  // đừng dựa vào lỗi ở đây để biết file có tồn tại hay không.
  throw new Error('deleteObject() chưa được triển khai');
}

/**
 * Xoá nhiều object (job dọn ảnh mồ côi).
 * @param {string[]} keys
 * @returns {Promise<{ deleted: number, failed: string[] }>}
 */
export async function deleteObjects(keys) {
  // TODO: dùng DeleteObjectsCommand (tối đa 1000 key/lần) → chia lô.
  throw new Error('deleteObjects() chưa được triển khai');
}

/**
 * Ghép URL public để hiển thị ảnh.
 * @param {string} key
 * @returns {string}
 */
export function buildPublicUrl(key) {
  // TODO: `${env.R2_PUBLIC_BASE_URL}/${key}` (chú ý không để lặp dấu '/').
  throw new Error('buildPublicUrl() chưa được triển khai');
}
