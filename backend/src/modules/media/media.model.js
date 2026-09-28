import mongoose, { Schema } from 'mongoose';

/**
 * Model Media — mỗi file trên R2 là một document.
 *
 * VÌ SAO CẦN TRẠNG THÁI: luồng presigned URL gồm 2 lần gọi backend, giữa hai lần
 * đó FE upload thẳng lên R2 và có thể thất bại (mất mạng, đóng tab). Record được
 * tạo ở bước 1 với status PENDING, chỉ sang READY khi bước 3 xác nhận file đã
 * thực sự nằm trên R2. Record PENDING quá cũ chính là rác cần dọn.
 */
export const MediaStatus = {
  PENDING: 'PENDING', // đã cấp presigned URL, chưa xác nhận upload xong
  READY: 'READY', // đã có file thật trên R2
};

export const MEDIA_STATUS_VALUES = Object.values(MediaStatus);

/** Phân loại để lọc trong thư viện và để biết ảnh thuộc nghiệp vụ nào. */
export const MediaKinds = {
  AVATAR: 'AVATAR',
  LIBRARY: 'LIBRARY', // ảnh do admin tải lên thư viện dùng chung
};

export const MEDIA_KIND_VALUES = Object.values(MediaKinds);

const mediaSchema = new Schema(
  {
    /** Object key trên R2. Unique để không có 2 record trỏ cùng một file. */
    key: { type: String, required: true, unique: true },

    folder: { type: Schema.Types.ObjectId, ref: 'MediaFolder', default: null }, // null = thư mục gốc

    kind: { type: String, enum: MEDIA_KIND_VALUES, default: MediaKinds.LIBRARY, required: true },
    status: { type: String, enum: MEDIA_STATUS_VALUES, default: MediaStatus.PENDING, required: true },

    originalName: { type: String, required: true, trim: true, maxlength: 255 },
    mimeType: { type: String, required: true },

    /** Kích thước THỰC TẾ đọc từ R2 lúc confirm, không tin số FE khai báo. */
    size: { type: Number, required: true, min: 0 },

    width: { type: Number, default: null },
    height: { type: Number, default: null },

    /** Mô tả cho screen reader; nên bắt buộc điền ở ảnh dùng trong nội dung. */
    alt: { type: String, default: '', trim: true, maxlength: 300 },

    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    confirmedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// --- Index ---
mediaSchema.index({ key: 1 }, { unique: true });
mediaSchema.index({ folder: 1, createdAt: -1 }); // duyệt theo thư mục
mediaSchema.index({ status: 1, createdAt: 1 }); // tìm record PENDING cũ để dọn
mediaSchema.index({ kind: 1, createdAt: -1 });
mediaSchema.index({ originalName: 'text' }); // tìm theo tên file

/** @type {import('mongoose').Model<any>} */
export const MediaModel = mongoose.models.Media ?? mongoose.model('Media', mediaSchema);

/**
 * GHI CHÚ VỀ ĐẾM SỐ LẦN SỬ DỤNG: cố tình KHÔNG lưu `usageCount` trong document này.
 * Đếm sẵn thì nhanh nhưng rất dễ lệch (quên tăng/giảm ở một luồng là sai vĩnh viễn,
 * và sai theo hướng nguy hiểm: xoá mất ảnh đang dùng). Thay vào đó `media.usage.js`
 * hỏi trực tiếp các collection tham chiếu tại thời điểm cần biết.
 */
