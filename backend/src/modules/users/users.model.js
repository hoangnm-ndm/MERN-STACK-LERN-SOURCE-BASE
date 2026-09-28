import mongoose, { Schema } from 'mongoose';
import { ROLE_VALUES, Roles, USER_STATUS_VALUES, UserStatus } from '../../shared/constants/roles.js';

/**
 * Model User. Đặt trong module sở hữu nó (`modules/users/`), không gom vào
 * `src/models/` — để mỗi nghiệp vụ là một thư mục tự chứa.
 *
 * Model chỉ định nghĩa DỮ LIỆU: field, ràng buộc, index. Logic nghiệp vụ
 * (ai được đổi role của ai, chặn user thế nào) nằm ở `users.service.js`.
 */

/**
 * Tài khoản mạng xã hội đã liên kết.
 * EMBED (nhúng) chứ không tách collection vì: số lượng có giới hạn (mỗi user vài
 * provider), luôn đọc cùng user, và không cần truy vấn độc lập.
 */
const identitySchema = new Schema(
  {
    provider: { type: String, required: true, enum: ['GOOGLE'] },
    providerUserId: { type: String, required: true },
    email: { type: String, required: true },
    linkedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      unique: true, // đây là INDEX, không phải validator — phải tạo bằng migration
      lowercase: true, // chuẩn hoá để 'A@x.com' và 'a@x.com' không thành 2 tài khoản
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không hợp lệ'],
    },

    /**
     * Null với tài khoản chỉ đăng nhập bằng Google/magic link.
     * `select: false` để mọi query mặc định KHÔNG kéo field này về — muốn lấy
     * phải chủ động `.select('+passwordHash')` (chỉ luồng đăng nhập cần).
     */
    passwordHash: { type: String, default: null, select: false },

    name: { type: String, required: [true, 'Tên là bắt buộc'], trim: true, maxlength: 120 },

    /** Ảnh đại diện trỏ tới Media (Phase 11). Null = dùng ảnh mặc định/chữ cái đầu. */
    avatarMedia: { type: Schema.Types.ObjectId, ref: 'Media', default: null },

    role: { type: String, enum: ROLE_VALUES, default: Roles.USER, required: true },
    status: { type: String, enum: USER_STATUS_VALUES, default: UserStatus.ACTIVE, required: true },

    /** Null = chưa xác minh email. Dùng Date thay boolean để biết luôn thời điểm. */
    emailVerifiedAt: { type: Date, default: null },

    identities: { type: [identitySchema], default: [] },

    lastLoginAt: { type: Date, default: null },

    /** Ai chặn/mở chặn tài khoản này lần gần nhất — phục vụ truy vết (Phase 5). */
    blockedAt: { type: Date, default: null },
    blockedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

// --- Index ---
// TODO: khai báo index ở đây để có tài liệu tại chỗ, nhưng ở production index
// được tạo bằng migration (autoIndex tắt). Hai nơi phải khớp nhau.
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1, status: 1 });
userSchema.index({ 'identities.provider': 1, 'identities.providerUserId': 1 }, { sparse: true });
userSchema.index({ createdAt: -1 });

/**
 * GHI CHÚ QUAN TRỌNG — vì sao KHÔNG hash mật khẩu trong `pre('save')`:
 * hook `save` không chạy với `findOneAndUpdate`/`updateOne`. Nếu đặt hash ở hook,
 * một hàm đổi mật khẩu viết bằng `findByIdAndUpdate` sẽ lưu mật khẩu dạng thô mà
 * không báo lỗi gì. Dự án này hash tường minh trong service (`utils/password.js`).
 */

/** @type {import('mongoose').Model<any>} */
export const UserModel = mongoose.models.User ?? mongoose.model('User', userSchema);

/**
 * Field được phép trả ra API. Dùng với `.select()` để không bao giờ lộ
 * passwordHash kể cả khi ai đó quên `select: false`.
 */
export const USER_PUBLIC_FIELDS = [
  'name',
  'email',
  'role',
  'status',
  'avatarMedia',
  'emailVerifiedAt',
  'lastLoginAt',
  'createdAt',
].join(' ');
