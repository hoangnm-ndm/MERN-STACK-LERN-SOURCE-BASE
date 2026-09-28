import mongoose, { Schema } from 'mongoose';

/**
 * Job định kỳ được cấu hình từ giao diện admin (Phase 13).
 *
 * VÌ SAO LƯU JOB TRONG DB thay vì hard-code cron trong code: admin đổi được giờ
 * chạy, bật/tắt, thêm chiến dịch email mới mà không cần deploy lại.
 */
export const JobTypes = {
  /** Dọn ảnh mồ côi trên R2 + record PENDING bỏ dở. */
  CLEANUP_ORPHAN_MEDIA: 'CLEANUP_ORPHAN_MEDIA',
  /** Gửi email theo lịch cho một nhóm user. */
  SEND_EMAIL_TO_GROUP: 'SEND_EMAIL_TO_GROUP',
};

export const JOB_TYPE_VALUES = Object.values(JobTypes);

export const JobRunStatus = {
  RUNNING: 'RUNNING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

export const JOB_RUN_STATUS_VALUES = Object.values(JobRunStatus);

const scheduledJobSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true, maxlength: 120 },

    type: { type: String, enum: JOB_TYPE_VALUES, required: true },

    /** Biểu thức cron 5 trường, ví dụ '0 3 * * *' = 3h sáng mỗi ngày. */
    cronExpression: { type: String, required: true, maxlength: 100 },

    enabled: { type: Boolean, default: true },

    /**
     * Tham số riêng của từng loại job.
     * Mixed nên Mongoose KHÔNG validate được — bắt buộc validate bằng Zod ở
     * `scheduler.schema.js` theo từng `type` (discriminated union).
     */
    payload: { type: Schema.Types.Mixed, default: {} },

    lastRunAt: { type: Date, default: null },
    lastStatus: { type: String, enum: [...JOB_RUN_STATUS_VALUES, null], default: null },

    /**
     * Cờ chống chạy trùng: job chạy lâu hơn chu kỳ cron thì lượt sau phải bỏ qua.
     * Lưu ý: cờ trong DB chỉ đủ khi chạy MỘT instance. Nhiều instance cần khoá
     * nguyên tử (findOneAndUpdate có điều kiện) hoặc chuyển sang queue.
     */
    isRunning: { type: Boolean, default: false },
    runningSince: { type: Date, default: null },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

scheduledJobSchema.index({ name: 1 }, { unique: true });
scheduledJobSchema.index({ enabled: 1, type: 1 });

/** @type {import('mongoose').Model<any>} */
export const ScheduledJobModel =
  mongoose.models.ScheduledJob ?? mongoose.model('ScheduledJob', scheduledJobSchema);

/** Lịch sử chạy — để admin xem job hôm qua có lỗi gì không. */
const jobRunSchema = new Schema(
  {
    job: { type: Schema.Types.ObjectId, ref: 'ScheduledJob', required: true, index: true },
    status: { type: String, enum: JOB_RUN_STATUS_VALUES, required: true },
    startedAt: { type: Date, required: true },
    finishedAt: { type: Date, default: null },
    durationMs: { type: Number, default: null },

    /** Số liệu tuỳ loại job, ví dụ { deleted: 12, freedBytes: 3456 } hoặc { sent: 40, failed: 2 }. */
    stats: { type: Schema.Types.Mixed, default: {} },

    /** Chỉ lưu message, KHÔNG lưu stack trace (có thể chứa đường dẫn, thông tin nội bộ). */
    errorMessage: { type: String, default: null, maxlength: 1000 },

    /** Chạy tự động theo cron hay do admin bấm "Chạy ngay". */
    triggeredBy: { type: String, enum: ['CRON', 'MANUAL'], default: 'CRON' },
  },
  { timestamps: true },
);

jobRunSchema.index({ job: 1, startedAt: -1 });
// TTL: giữ lịch sử 90 ngày rồi tự dọn, để collection không phình vô hạn.
jobRunSchema.index({ startedAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

/** @type {import('mongoose').Model<any>} */
export const JobRunModel = mongoose.models.JobRun ?? mongoose.model('JobRun', jobRunSchema);
