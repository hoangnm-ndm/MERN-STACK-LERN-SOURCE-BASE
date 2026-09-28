import mongoose, { Schema } from 'mongoose';

/**
 * Cấu hình hệ thống (Phase 4) — chỉ Super Admin được sửa.
 *
 * MÔ HÌNH SINGLETON: collection này luôn chỉ có ĐÚNG MỘT document, chốt bằng
 * field `key` với giá trị cố định 'GLOBAL' + unique index.
 *
 * Vì sao singleton mà không phải bảng key-value mỗi setting một dòng:
 * - Schema có kiểu rõ ràng cho từng field → Mongoose validate được, không phải
 *   ép kiểu thủ công từ `value: Mixed`.
 * - Đọc cấu hình chỉ cần 1 truy vấn, dễ cache.
 * Đánh đổi: thêm setting mới phải viết migration để thêm field (đúng ra là ưu
 * điểm — thay đổi cấu hình hệ thống nên được version hoá).
 */
export const SETTINGS_SINGLETON_KEY = 'GLOBAL';

const systemSettingsSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: SETTINGS_SINGLETON_KEY,
      enum: [SETTINGS_SINGLETON_KEY],
    },

    /** Cho phép người mới tự đăng ký tài khoản. Tắt = chỉ admin tạo tài khoản. */
    allowRegistration: { type: Boolean, default: true },

    /** Bật/tắt từng phương thức đăng nhập. */
    allowPasswordLogin: { type: Boolean, default: true },
    allowMagicLink: { type: Boolean, default: true },
    allowGoogleLogin: { type: Boolean, default: true },

    /** Buộc xác minh email trước khi đăng nhập được. */
    requireEmailVerification: { type: Boolean, default: true },

    /** Chặn toàn bộ truy cập trừ admin — dùng khi bảo trì. */
    maintenanceMode: { type: Boolean, default: false },
    maintenanceMessage: { type: String, default: '', maxlength: 500 },

    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

systemSettingsSchema.index({ key: 1 }, { unique: true });

/** @type {import('mongoose').Model<any>} */
export const SystemSettingsModel =
  mongoose.models.SystemSettings ?? mongoose.model('SystemSettings', systemSettingsSchema);

/**
 * GHI CHÚ AN TOÀN: không được để hệ thống tự khoá cửa.
 * Nếu tắt CẢ allowPasswordLogin, allowMagicLink và allowGoogleLogin thì không ai
 * đăng nhập được nữa, kể cả Super Admin. Service phải chặn trường hợp này —
 * xem `settings.service.js`.
 */
