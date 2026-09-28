import mongoose, { Schema } from 'mongoose';
import { AUTH_PROVIDER_VALUES } from '../../shared/constants/roles.js';

/**
 * Model Session — mỗi lần đăng nhập trên một thiết bị là một document.
 *
 * VÌ SAO CẦN COLLECTION NÀY (Phase 3): JWT là stateless, đã phát ra thì không
 * thu hồi được. Lưu session trong DB cho phép "đăng xuất thiết bị khác" và
 * "chặn user thì cắt mọi phiên ngay" — bằng cách kiểm tra session ở middleware
 * `authenticate` mỗi request.
 */
const sessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    /**
     * CHỈ lưu hash của refresh token (SHA-256), không lưu token thô.
     * Người đọc được DB cũng không thể mạo danh phiên của người khác.
     */
    refreshTokenHash: { type: String, required: true, unique: true },

    /** Cách người dùng đăng nhập vào phiên này — hiển thị trong danh sách thiết bị. */
    provider: { type: String, enum: AUTH_PROVIDER_VALUES, required: true },

    /** Thông tin thiết bị, chỉ để người dùng nhận ra phiên nào là của mình. */
    userAgent: { type: String, default: '', maxlength: 500 },
    ip: { type: String, default: '' },

    lastUsedAt: { type: Date, default: Date.now },

    /**
     * TTL index xoá document khi quá hạn.
     * Lưu ý: MongoDB chỉ chạy tiến trình dọn TTL mỗi ~60 giây, nên document có
     * thể còn tồn tại một lúc sau khi hết hạn → code vẫn phải tự kiểm tra
     * `expiresAt > now`, đừng tin TTL là tức thì.
     */
    expiresAt: { type: Date, required: true },

    /** Null = còn hiệu lực. Có giá trị = đã bị thu hồi (đăng xuất, bị chặn, phát hiện dùng lại token). */
    revokedAt: { type: Date, default: null },
    revokedReason: {
      type: String,
      enum: ['LOGOUT', 'REVOKED_BY_USER', 'USER_BLOCKED', 'PASSWORD_CHANGED', 'REFRESH_REUSED'],
      default: null,
    },
  },
  { timestamps: true },
);

// --- Index ---
sessionSchema.index({ refreshTokenHash: 1 }, { unique: true });
sessionSchema.index({ user: 1, createdAt: -1 }); // danh sách phiên của một user
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL tự dọn

/** @type {import('mongoose').Model<any>} */
export const SessionModel = mongoose.models.Session ?? mongoose.model('Session', sessionSchema);
