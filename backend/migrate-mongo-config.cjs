// Cấu hình migrate-mongo. Để dạng .cjs vì migrate-mongo nạp file này bằng require.
// Mọi thay đổi cấu trúc/index/dữ liệu trên DB đều phải qua migration, không sửa tay.
require('dotenv/config');

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Thiếu MONGODB_URI — kiểm tra file .env');

// Tên database lấy từ path của URI để không phải khai báo trùng hai nơi.
const databaseName = new URL(uri.replace('mongodb+srv://', 'https://').replace('mongodb://', 'http://'))
  .pathname.replace('/', '');

module.exports = {
  mongodb: {
    url: uri,
    databaseName,
    options: {},
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.cjs',
  useFileHash: false,
  moduleSystem: 'commonjs',
};
