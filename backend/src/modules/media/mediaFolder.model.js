import mongoose, { Schema } from 'mongoose';

/**
 * Thư mục trong thư viện media (Phase 12).
 *
 * MÔ HÌNH CÂY BẰNG `parent` (adjacency list): mỗi thư mục chỉ biết cha trực tiếp.
 * Đơn giản và đủ cho thư viện ảnh vài cấp. Đánh đổi: muốn lấy toàn bộ con cháu
 * phải truy vấn nhiều lần hoặc dùng `$graphLookup`.
 *
 * KHÔNG nhúng danh sách file vào thư mục: số file trong một thư mục tăng không
 * giới hạn, mảng nhúng sẽ chạm giới hạn 16MB/document và làm mọi cập nhật chậm dần.
 */
const mediaFolderSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },

    parent: { type: Schema.Types.ObjectId, ref: 'MediaFolder', default: null },

    /**
     * Đường dẫn dạng '/anh-san-pham/2026' — lưu sẵn để hiển thị breadcrumb và
     * tìm cây con bằng một truy vấn prefix, không phải lần từng cấp.
     * Phải cập nhật lại cho cả cây con khi đổi tên/di chuyển thư mục.
     */
    path: { type: String, required: true, maxlength: 1000 },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

// --- Index ---
// Không cho hai thư mục trùng tên trong cùng thư mục cha.
mediaFolderSchema.index({ parent: 1, name: 1 }, { unique: true });
mediaFolderSchema.index({ path: 1 });

/** @type {import('mongoose').Model<any>} */
export const MediaFolderModel =
  mongoose.models.MediaFolder ?? mongoose.model('MediaFolder', mediaFolderSchema);
