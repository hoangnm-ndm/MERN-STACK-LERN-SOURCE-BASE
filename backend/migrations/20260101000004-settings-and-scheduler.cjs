/**
 * Index cho `systemsettings`, `scheduledjobs`, `jobruns` và tạo document cấu hình
 * mặc định.
 *
 * Đây là migration DUY NHẤT trong bộ này có ghi DỮ LIỆU (không chỉ index): nó tạo
 * document singleton cho system settings.
 */
module.exports = {
  async up(db) {
    // TODO — index:
    // await db.collection('systemsettings').createIndex({ key: 1 }, { name: 'settings_key_unique', unique: true });
    // await db.collection('scheduledjobs').createIndexes([
    //   { key: { name: 1 }, name: 'job_name_unique', unique: true },
    //   { key: { enabled: 1, type: 1 }, name: 'job_enabled_type' },
    // ]);
    // await db.collection('jobruns').createIndexes([
    //   { key: { job: 1, startedAt: -1 }, name: 'job_runs' },
    //   { key: { startedAt: 1 }, name: 'job_runs_ttl', expireAfterSeconds: 7776000 }, // 90 ngày
    // ]);
    //
    // TODO — dữ liệu cấu hình mặc định:
    // await db.collection('systemsettings').updateOne(
    //   { key: 'GLOBAL' },
    //   { $setOnInsert: {
    //       key: 'GLOBAL',
    //       allowRegistration: true,
    //       allowPasswordLogin: true,
    //       allowMagicLink: true,
    //       allowGoogleLogin: true,
    //       requireEmailVerification: true,
    //       maintenanceMode: false,
    //       maintenanceMessage: '',
    //       updatedBy: null,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //   } },
    //   { upsert: true },
    // );
    //
    // Dùng `$setOnInsert` + upsert thay vì insertOne: chạy lại migration trên DB
    // đã có cấu hình sẽ KHÔNG ghi đè lựa chọn mà admin đã đổi.
  },

  async down(db) {
    // TODO: dropIndex theo tên.
    // CÂN NHẮC: có nên xoá document settings trong `down` không? Khuyến nghị là
    // KHÔNG — rollback một migration index không nên làm mất cấu hình hệ thống.
  },
};
