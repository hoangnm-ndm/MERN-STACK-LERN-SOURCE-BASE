import * as usersService from '../users/users.service.js';

/**
 * Nơi duy nhất biết "ảnh đang được dùng ở đâu" (Phase 12).
 *
 * MongoDB không có khoá ngoại, nên không có cơ chế nào tự chặn việc xoá một ảnh
 * đang được tham chiếu. Trách nhiệm đó nằm ở đây.
 *
 * KHI THÊM NGHIỆP VỤ MỚI CÓ THAM CHIẾU MEDIA (bài viết có ảnh bìa, sản phẩm có
 * ảnh...), BẮT BUỘC thêm một entry vào `MEDIA_CONSUMERS`. Quên bước này là xoá
 * mất ảnh đang hiển thị trên trang.
 *
 * @type {Array<{ label: string, count: (mediaId: string) => Promise<number>, release: (mediaId: string) => Promise<number> }>}
 */
const MEDIA_CONSUMERS = [
  {
    label: 'Ảnh đại diện người dùng',
    count: (mediaId) => usersService.countUsersUsingAvatar(mediaId),
    release: (mediaId) => usersService.clearAvatarByMediaId(mediaId),
  },
  // TODO: thêm consumer mới ở đây khi có nghiệp vụ mới dùng media.
];

/**
 * Ảnh đang được dùng ở những đâu.
 *
 * @param {string} mediaId
 * @returns {Promise<{ inUse: boolean, usages: Array<{ label: string, count: number }> }>}
 */
export async function findMediaUsages(mediaId) {
  // TODO:
  // - Chạy song song tất cả `count` bằng Promise.all (đừng chạy tuần tự trong for).
  // - Chỉ giữ những consumer có count > 0.
  // - inUse = tổng count > 0.
  throw new Error('findMediaUsages() chưa được triển khai');
}

/**
 * Gỡ mọi tham chiếu tới media (dùng khi admin chọn "xoá kèm gỡ tham chiếu").
 *
 * @param {string} mediaId
 * @returns {Promise<number>} tổng số document bị ảnh hưởng
 */
export async function releaseMediaReferences(mediaId) {
  // TODO: gọi `release` của từng consumer, cộng dồn kết quả.
  // Cân nhắc bọc trong transaction nếu có nhiều consumer — để không rơi vào
  // trạng thái nửa vời (gỡ được chỗ này, lỗi ở chỗ kia).
  throw new Error('releaseMediaReferences() chưa được triển khai');
}
