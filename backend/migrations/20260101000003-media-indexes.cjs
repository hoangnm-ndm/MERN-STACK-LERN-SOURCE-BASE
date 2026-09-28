/**
 * Index cho `media` và `mediafolders`.
 */
module.exports = {
  async up(db) {
    // TODO — media:
    // await db.collection('media').createIndexes([
    //   { key: { key: 1 }, name: 'object_key_unique', unique: true },
    //   { key: { folder: 1, createdAt: -1 }, name: 'folder_browse' },
    //   { key: { status: 1, createdAt: 1 }, name: 'status_cleanup' },   // job dọn rác dùng
    //   { key: { kind: 1, createdAt: -1 }, name: 'kind_browse' },
    //   { key: { originalName: 'text' }, name: 'name_text' },
    // ]);
    //
    // TODO — mediafolders:
    // await db.collection('mediafolders').createIndexes([
    //   { key: { parent: 1, name: 1 }, name: 'folder_name_unique', unique: true },
    //   { key: { path: 1 }, name: 'folder_path' },
    // ]);
    //
    // LƯU Ý về `folder_name_unique`: MongoDB coi mỗi giá trị null là một giá trị
    // riêng biệt trong index thường, NHƯNG với unique index thì hai document cùng
    // có parent = null và name giống nhau sẽ vi phạm unique — đây đúng là điều ta
    // muốn (không hai thư mục trùng tên ở gốc).
  },

  async down(db) {
    // TODO: dropIndex theo tên.
  },
};
