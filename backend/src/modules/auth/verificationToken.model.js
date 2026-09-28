import mongoose, { Schema } from 'mongoose';

/**
 * Token dùng một lần gửi qua email. Một collection dùng chung cho cả ba mục đích,
 * phân biệt bằng `type` — gọn hơn ba collection gần như giống nhau.
 */
export const TokenTypes = {
  EMAIL_VERIFY: 'EMAIL_VERIFY',
  MAGIC_LINK: 'MAGIC_LINK',
  PASSWORD_RESET: 'PASSWORD_RESET',
};

export const TOKEN_TYPE_VALUES = Object.values(TokenTypes);

const verificationTokenSchema = new Schema(
  {
    /**
     * CHỈ lưu hash. Link gửi cho người dùng chứa token thô, DB chỉ có SHA-256 của
     * nó — DB bị đọc cũng không dựng lại được link đăng nhập của người khác.
     */
    tokenHash: { type: String, required: true, unique: true },

    type: { type: String, enum: TOKEN_TYPE_VALUES, required: true },

    /** Null với magic link của email chưa có tài khoản (đăng ký bằng magic link). */
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },

    /** Luôn lưu email để đối chiếu, kể cả khi đã có `user`. */
    email: { type: String, required: true, lowercase: true, trim: true },

    expiresAt: { type: Date, required: true },

    /** Null = chưa dùng. Đánh dấu thay vì xoá để phân biệt "sai token" với "đã dùng rồi". */
    consumedAt: { type: Date, default: null },

    /** Ngữ cảnh yêu cầu — hữu ích khi điều tra nghi vấn lạm dụng. */
    requestIp: { type: String, default: '' },
  },
  { timestamps: true },
);

// --- Index ---
verificationTokenSchema.index({ tokenHash: 1 }, { unique: true });
verificationTokenSchema.index({ email: 1, type: 1, createdAt: -1 });
// TTL: dọn token đã hết hạn. Đặt thời gian sống thêm 1 ngày sau expiresAt để còn
// phân biệt được "token hết hạn" (báo lỗi rõ ràng) với "token không tồn tại".
verificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 });

/** @type {import('mongoose').Model<any>} */
export const VerificationTokenModel =
  mongoose.models.VerificationToken ??
  mongoose.model('VerificationToken', verificationTokenSchema);
