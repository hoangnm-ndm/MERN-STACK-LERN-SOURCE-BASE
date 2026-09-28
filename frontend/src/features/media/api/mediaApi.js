import axios from 'axios';
import { http } from '@/shared/lib/http';

/** Hàm gọi API media (Phase 7, 11, 12). */

/**
 * Bước 1: xin URL upload.
 *
 * @param {{ originalName: string, mimeType: string, size: number, kind?: string, folderId?: string | null }} input
 * @returns {Promise<{ media: object, uploadUrl: string, expiresIn: number }>}
 */
export async function createUploadUrl(input) {
  // TODO: http.post('/media/upload-url', input)
  throw new Error('createUploadUrl() chưa được triển khai');
}

/**
 * Bước 2: PUT file thẳng lên R2.
 *
 * DÙNG `axios` GỐC, KHÔNG dùng instance `http`. Ba lý do:
 * - `http` có baseURL trỏ tới API của mình, còn đây là URL của Cloudflare.
 * - Interceptor sẽ gắn `Authorization` — R2 sẽ TỪ CHỐI vì header đó không nằm
 *   trong chữ ký presigned.
 * - `withCredentials: true` khiến request gửi cookie sang domain lạ, cũng bị chặn.
 *
 * @param {object} params
 * @param {string} params.uploadUrl
 * @param {File} params.file
 * @param {(percent: number) => void} [params.onProgress]
 * @returns {Promise<void>}
 */
export async function uploadFileToR2({ uploadUrl, file, onProgress }) {
  // TODO:
  // await axios.put(uploadUrl, file, {
  //   headers: { 'Content-Type': file.type },   ← PHẢI khớp mimeType đã ký ở bước 1
  //   onUploadProgress: (event) => {
  //     if (event.total) onProgress?.(Math.round((event.loaded / event.total) * 100));
  //   },
  // });
  //
  // Không truyền đúng Content-Type sẽ nhận lỗi 403 SignatureDoesNotMatch —
  // đây là lỗi hay gặp nhất khi làm presigned upload.
  throw new Error('uploadFileToR2() chưa được triển khai');
}

/**
 * Bước 3: xác nhận đã upload xong.
 *
 * @param {{ mediaId: string, alt?: string, width?: number, height?: number }} params
 * @returns {Promise<object>}
 */
export async function confirmUpload({ mediaId, ...input }) {
  // TODO: http.post(`/media/${mediaId}/confirm`, input)
  throw new Error('confirmUpload() chưa được triển khai');
}

/**
 * @param {object} params bộ lọc thư viện
 * @returns {Promise<{ items: object[], meta: object }>}
 */
export async function getMediaList(params) {
  // TODO: http.get('/media', { params }) → { items: res.data.data, meta: res.data.meta }
  throw new Error('getMediaList() chưa được triển khai');
}

/** @param {string} id @returns {Promise<object>} */
export async function getMedia(id) {
  // TODO: http.get(`/media/${id}`)
  throw new Error('getMedia() chưa được triển khai');
}

/**
 * Ảnh đang được dùng ở đâu — gọi TRƯỚC khi hỏi xác nhận xoá.
 * @param {string} id
 * @returns {Promise<{ inUse: boolean, usages: Array<{ label: string, count: number }> }>}
 */
export async function getMediaUsages(id) {
  // TODO: http.get(`/media/${id}/usages`)
  throw new Error('getMediaUsages() chưa được triển khai');
}

/** @param {{ id: string, alt?: string, folderId?: string | null }} params @returns {Promise<object>} */
export async function updateMedia({ id, ...input }) {
  // TODO: http.patch(`/media/${id}`, input)
  throw new Error('updateMedia() chưa được triển khai');
}

/** @param {{ id: string, force?: boolean }} params @returns {Promise<void>} */
export async function deleteMedia({ id, force }) {
  // TODO: http.delete(`/media/${id}`, { params: { force } })
  throw new Error('deleteMedia() chưa được triển khai');
}

// --- Thư mục ---

/** @returns {Promise<object[]>} cây thư mục */
export async function getFolders() {
  // TODO: http.get('/media/folders')
  throw new Error('getFolders() chưa được triển khai');
}

/** @param {{ name: string, parentId?: string | null }} input @returns {Promise<object>} */
export async function createFolder(input) {
  // TODO: http.post('/media/folders', input)
  throw new Error('createFolder() chưa được triển khai');
}

/** @param {{ id: string, name: string }} params @returns {Promise<object>} */
export async function renameFolder({ id, name }) {
  // TODO: http.patch(`/media/folders/${id}`, { name })
  throw new Error('renameFolder() chưa được triển khai');
}

/** @param {string} id @returns {Promise<void>} */
export async function deleteFolder(id) {
  // TODO: http.delete(`/media/folders/${id}`)
  throw new Error('deleteFolder() chưa được triển khai');
}
