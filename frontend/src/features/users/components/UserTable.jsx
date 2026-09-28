import { Avatar } from '@/shared/components/ui/Avatar';
import { Badge } from '@/shared/components/ui/Badge';
import { Roles, ROLE_LABELS, STATUS_LABELS, UserStatus } from '@/shared/constants/roles';
import { formatDate } from '@/shared/lib/utils';

/**
 * Bảng danh sách người dùng (Phase 5, 8).
 *
 * Component này CHỈ render. Mọi hành động đều gọi callback lên page cha — nhờ vậy
 * nó không cần biết gì về TanStack Query và test được dễ dàng.
 *
 * @param {object} props
 * @param {object[]} props.users
 * @param {object} props.currentUser để biết dòng nào là chính mình
 * @param {(user: object) => void} props.onChangeRole
 * @param {(user: object) => void} props.onToggleBlock
 */
export function UserTable({ users, currentUser, onChangeRole, onToggleBlock }) {
  // TODO: dùng bảng THẬT (<table>), không phải div xếp thành cột:
  // <table>
  //   <thead><tr><th scope="col">Người dùng</th>...</tr></thead>
  //   <tbody>{users.map(user => <tr key={user.id}>...</tr>)}</tbody>
  // </table>
  //
  // `<th scope="col">` giúp screen reader đọc "Vai trò: Quản trị viên" khi di
  // chuyển trong bảng. Div thì chỉ đọc ra một chuỗi rời rạc không rõ cột nào.
  //
  // Cột: Người dùng (Avatar + tên + email) | Vai trò (Badge) | Trạng thái (Badge)
  //      | Ngày tạo | Hành động
  //
  // QUY TẮC HIỂN THỊ NÚT HÀNH ĐỘNG — khớp với kiểm tra ở backend, để người dùng
  // không bấm vào thứ chắc chắn bị từ chối:
  // - user.id === currentUser.id       → không hiện nút nào (không tự chặn/tự hạ quyền).
  // - user.role === SUPER_ADMIN        → không hiện nút nào (được bảo vệ).
  // - currentUser.role === ADMIN       → chỉ đổi được trong nhóm USER.
  // - currentUser.role === SUPER_ADMIN → đổi được ADMIN/USER.
  //
  // Nhớ: đây chỉ là ẩn giao diện cho gọn. Backend vẫn là nơi quyết định.
  return null;
}
