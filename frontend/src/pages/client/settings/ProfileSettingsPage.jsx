import { ProfileForm, useMe } from '@/features/users';
import { SettingsTabs } from './SettingsTabs';
import { DataState } from '@/shared/components/ui/DataState';

/** Cài đặt > Hồ sơ (Phase 10, 11). */
export function ProfileSettingsPage() {
  const { data: user, isLoading, error, refetch } = useMe();

  // TODO:
  // <div>
  //   <h1>Cài đặt</h1>
  //   <SettingsTabs />
  //   <DataState isLoading={isLoading} error={error} onRetry={refetch}>
  //     <ProfileForm user={user} />
  //   </DataState>
  // </div>
  //
  // Dùng useMe() (gọi /users/me) thay vì lấy `user` từ authStore: store chỉ giữ
  // bản chụp lúc đăng nhập, còn trang hồ sơ cần dữ liệu mới nhất — ví dụ admin
  // vừa đổi role của người này.
  return null;
}
