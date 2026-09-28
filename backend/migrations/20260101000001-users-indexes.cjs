/**
 * Index cho collection `users`.
 *
 * VÌ SAO TẠO INDEX BẰNG MIGRATION thay vì để Mongoose `autoIndex` tự làm:
 * - Ở production `autoIndex` bị tắt (tạo index lúc khởi động làm chậm và có thể
 *   khoá collection lớn).
 * - Index unique KHÔNG tạo được nếu dữ liệu đã có bản trùng — migration sẽ báo
 *   lỗi ngay và rõ ràng, thay vì âm thầm không có index.
 * - Mọi thay đổi trên DB đều được version hoá và review được như code.
 *
 * Quy ước: mỗi file có đủ `up` và `down`. `down` phải thực sự hoàn tác được.
 */
module.exports = {
  async up(db) {
    // TODO:
    // await db.collection('users').createIndexes([
    //   { key: { email: 1 }, name: 'email_unique', unique: true },
    //   { key: { role: 1, status: 1 }, name: 'role_status' },
    //   { key: { 'identities.provider': 1, 'identities.providerUserId': 1 },
    //     name: 'identity_lookup', sparse: true },
    //   { key: { createdAt: -1 }, name: 'createdAt_desc' },
    // ]);
    //
    // Nếu lỗi E11000 khi tạo email_unique: DB đang có email trùng. Phải dọn dữ
    // liệu trước (viết migration riêng để gộp/xoá bản trùng), đừng bỏ unique.
  },

  async down(db) {
    // TODO: dropIndex theo đúng các `name` ở trên.
    // Bọc từng lệnh trong try/catch: index không tồn tại thì bỏ qua, để `down`
    // chạy được cả khi `up` mới thực hiện được một nửa.
  },
};
