/**
 * Index cho `sessions` và `verificationtokens`.
 *
 * Chú ý tên collection: Mongoose tự chuyển model 'Session' → collection
 * 'sessions', 'VerificationToken' → 'verificationtokens' (số nhiều, chữ thường).
 * Viết sai tên ở đây thì index được tạo trên một collection rỗng khác và không
 * có tác dụng gì — đây là lỗi rất khó phát hiện.
 */
module.exports = {
  async up(db) {
    // TODO — sessions:
    // await db.collection('sessions').createIndexes([
    //   { key: { refreshTokenHash: 1 }, name: 'refresh_hash_unique', unique: true },
    //   { key: { user: 1, createdAt: -1 }, name: 'user_sessions' },
    //   { key: { expiresAt: 1 }, name: 'session_ttl', expireAfterSeconds: 0 },
    // ]);
    //
    // TODO — verificationtokens:
    // await db.collection('verificationtokens').createIndexes([
    //   { key: { tokenHash: 1 }, name: 'token_hash_unique', unique: true },
    //   { key: { email: 1, type: 1, createdAt: -1 }, name: 'email_type_lookup' },
    //   { key: { expiresAt: 1 }, name: 'token_ttl', expireAfterSeconds: 86400 },
    // ]);
    //
    // GHI CHÚ VỀ TTL: `expireAfterSeconds: 0` nghĩa là xoá ngay khi thời điểm
    // trong field đã qua. Với token ta để 86400 (giữ thêm 1 ngày) để còn phân
    // biệt "token hết hạn" với "token không tồn tại" mà báo lỗi cho đúng.
    // MongoDB quét TTL mỗi ~60 giây, không tức thì.
  },

  async down(db) {
    // TODO: dropIndex theo tên, mỗi lệnh bọc try/catch.
  },
};
