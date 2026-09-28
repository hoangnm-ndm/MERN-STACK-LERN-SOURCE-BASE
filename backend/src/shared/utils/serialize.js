/**
 * Chuẩn hoá document thành dạng trả về API.
 *
 * VÌ SAO CẦN FILE NÀY: `mongoose.set('toJSON', ...)` trong config/db.js chỉ áp
 * dụng cho document đã hydrate. Query dùng `.lean()` trả object thuần, KHÔNG đi
 * qua toJSON, nên vẫn còn `_id` và `__v`. Mọi endpoint dùng `.lean()` phải map
 * qua đây, nếu không API sẽ lúc trả `id`, lúc trả `_id` — frontend lãnh đủ.
 */

/**
 * Đổi `_id` thành `id` (string), bỏ `__v`. Xử lý cả object lồng nhau và mảng
 * (subdocument, kết quả populate).
 *
 * @template T
 * @param {T} doc kết quả từ `.lean()`
 * @returns {T} object mới đã chuẩn hoá
 */
export function toApi(doc) {
  // TODO:
  // - null/undefined → trả nguyên giá trị.
  // - Array → map từng phần tử qua toApi.
  // - ObjectId (kiểm tra bằng `doc instanceof mongoose.Types.ObjectId` hoặc
  //   `doc?._bsontype === 'ObjectId'`) → trả String(doc).
  // - Date → giữ nguyên (đừng đệ quy vào Date, nó sẽ thành {}).
  // - Object thuần → tạo object mới: id = String(_id), bỏ _id và __v,
  //   các field còn lại đệ quy qua toApi.
  // - Kiểu nguyên thủy → trả nguyên giá trị.
  throw new Error('toApi() chưa được triển khai');
}

/**
 * Loại bỏ field nhạy cảm trước khi trả ra ngoài.
 * Dùng như lưới an toàn thứ hai: lớp một là `select: false` trong schema và
 * `select`/`populate` chỉ chọn field cần.
 *
 * @template {Record<string, unknown>} T
 * @param {T} doc
 * @param {string[]} [fields]
 * @returns {Partial<T>}
 */
export function omitSensitive(doc, fields = ['passwordHash', 'refreshTokenHash', 'tokenHash']) {
  // TODO: trả object mới không chứa các field trong `fields` (kể cả ở cấp lồng nhau).
  throw new Error('omitSensitive() chưa được triển khai');
}
