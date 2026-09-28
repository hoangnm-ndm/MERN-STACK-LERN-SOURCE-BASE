import { useAdminSettings, useUpdateSettings } from '../hooks/useSettings';
import { Switch } from '@/shared/components/ui/Switch';
import { DataState } from '@/shared/components/ui/DataState';

/**
 * Bảng bật/tắt phương thức đăng nhập và cấu hình hệ thống (Phase 4, 8).
 *
 * Mỗi mục khai báo dạng dữ liệu để thêm cấu hình mới chỉ cần thêm một object.
 */
const SETTING_ITEMS = [
  {
    key: 'allowRegistration',
    label: 'Cho phép đăng ký',
    description: 'Tắt để chỉ admin được tạo tài khoản mới.',
  },
  {
    key: 'allowPasswordLogin',
    label: 'Đăng nhập bằng mật khẩu',
    description: 'Phương thức đăng nhập cơ bản.',
    isLoginMethod: true,
  },
  {
    key: 'allowMagicLink',
    label: 'Đăng nhập bằng magic link',
    description: 'Người dùng nhận liên kết qua email, không cần mật khẩu.',
    isLoginMethod: true,
  },
  {
    key: 'allowGoogleLogin',
    label: 'Đăng nhập bằng Google',
    description: 'Yêu cầu đã cấu hình Google OAuth ở biến môi trường.',
    isLoginMethod: true,
  },
  {
    key: 'requireEmailVerification',
    label: 'Buộc xác minh email',
    description: 'Tắt sẽ cho phép đăng nhập ngay sau khi đăng ký — không khuyến nghị.',
  },
  {
    key: 'maintenanceMode',
    label: 'Chế độ bảo trì',
    description: 'Chặn truy cập của người dùng thường, admin vẫn vào được.',
  },
];

export function AuthMethodSettings() {
  const { data: settings, isLoading, error, refetch } = useAdminSettings();
  const updateMutation = useUpdateSettings();

  // TODO:
  // - Bọc trong <DataState>.
  // - Render SETTING_ITEMS thành danh sách <Switch checked={settings[item.key]}
  //     onChange={() => updateMutation.mutate({ [item.key]: !settings[item.key] })} />
  //
  // - CHẶN Ở GIAO DIỆN cho mục isLoginMethod: nếu đây là phương thức đăng nhập
  //   DUY NHẤT còn bật thì `disabled` nút đó, kèm chú thích "Phải giữ ít nhất
  //   một phương thức đăng nhập".
  //   Backend đã chặn rồi, nhưng chặn sớm ở đây tốt hơn: người dùng không phải
  //   bấm rồi mới nhận lỗi.
  //
  // - maintenanceMode bật → hiện thêm textarea nhập maintenanceMessage.
  //
  // - Mỗi Switch nên khoá riêng khi đang lưu (theo dõi key đang cập nhật bằng
  //   useState) chứ đừng khoá cả bảng — bật một mục mà cả trang đông cứng là
  //   cảm giác rất tệ.
  return null;
}
