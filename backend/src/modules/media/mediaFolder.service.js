import { MediaFolderModel } from './mediaFolder.model.js';
import { MediaModel } from './media.model.js';
import { badRequest, conflict, notFound } from '../../shared/errors/AppError.js';
import { ErrorCodes } from '../../shared/errors/errorCodes.js';
import { toApi } from '../../shared/utils/serialize.js';

/** Nghiệp vụ thư mục thư viện media (Phase 12). */

/**
 * Cây thư mục để hiển thị sidebar.
 * @returns {Promise<Array<object & { children: object[] }>>}
 */
export async function listFolderTree() {
  // TODO:
  // - Lấy TẤT CẢ thư mục một lần: find().sort({ path: 1 }).lean()
  //   (Số thư mục nhỏ, lấy hết rồi dựng cây trong bộ nhớ nhanh hơn nhiều so với
  //   truy vấn đệ quy từng cấp.)
  // - Dựng cây bằng Map<id, node> rồi gắn con vào cha theo `parent`.
  // - Kèm số file mỗi thư mục: một truy vấn aggregate
  //   `$group: { _id: '$folder', count: { $sum: 1 } }` rồi map vào — KHÔNG đếm
  //   trong vòng lặp (N+1).
  throw new Error('listFolderTree() chưa được triển khai');
}

/**
 * @param {string} folderId
 * @returns {Promise<object>} ném 404 nếu không có
 */
export async function getById(folderId) {
  // TODO: findById + lean + toApi; null → notFound('Không tìm thấy thư mục').
  throw new Error('getById() chưa được triển khai');
}

/**
 * @param {object} params
 * @param {string} params.name
 * @param {string | null} [params.parentId]
 * @param {string} params.userId
 * @returns {Promise<object>}
 */
export async function createFolder({ name, parentId = null, userId }) {
  // TODO:
  // 1. parentId có → lấy thư mục cha (404 nếu không có) để biết `path` của nó.
  // 2. path = parent ? `${parent.path}/${slug(name)}` : `/${slug(name)}`.
  //    Giới hạn độ sâu (ví dụ tối đa 5 cấp) để cây không thành vô hạn.
  // 3. create(...). Bắt lỗi 11000 từ unique index { parent, name } →
  //    throw conflict('Thư mục cùng tên đã tồn tại').
  //    Dựa vào index thay vì kiểm tra trước: hai request đồng thời đều thấy
  //    "chưa tồn tại" rồi cùng tạo.
  throw new Error('createFolder() chưa được triển khai');
}

/**
 * @param {object} params
 * @param {string} params.folderId
 * @param {string} params.name
 * @returns {Promise<object>}
 */
export async function renameFolder({ folderId, name }) {
  // TODO:
  // - Cập nhật name và path của CHÍNH nó.
  // - QUAN TRỌNG: phải cập nhật `path` cho TOÀN BỘ cây con, vì path của con chứa
  //   path của cha. Bỏ bước này thì breadcrumb và lọc theo prefix sẽ sai.
  //   Cách làm: find({ path: { $regex: `^${escapeRegex(oldPath)}/` } }) rồi
  //   updateMany/bulkWrite thay tiền tố. Bọc trong transaction để không đứt giữa chừng.
  throw new Error('renameFolder() chưa được triển khai');
}

/**
 * Xoá thư mục. CHẶN nếu còn file hoặc thư mục con.
 *
 * @param {string} folderId
 * @returns {Promise<void>}
 */
export async function deleteFolder(folderId) {
  // TODO:
  // 1. Đếm file trong thư mục: MediaModel.countDocuments({ folder: folderId }).
  // 2. Đếm thư mục con: countDocuments({ parent: folderId }).
  // 3. Còn nội dung → throw conflict('Thư mục không rỗng', FOLDER_NOT_EMPTY).
  //    Cố tình KHÔNG xoá đệ quy: xoá cả cây bằng một cú bấm là hành động phá huỷ
  //    quá dễ xảy ra do nhầm. Người dùng phải dọn hoặc di chuyển nội dung trước.
  // 4. Rỗng → deleteOne.
  throw new Error('deleteFolder() chưa được triển khai');
}
