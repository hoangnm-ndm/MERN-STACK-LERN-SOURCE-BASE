import { useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { useSessions, useRevokeSession, useRevokeOtherSessions } from '../hooks/useSessions';
import { DataState } from '@/shared/components/ui/DataState';
import { ConfirmDialog } from '@/shared/components/ui/ConfirmDialog';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { formatRelativeTime } from '@/shared/lib/utils';
import { AUTH_PROVIDER_LABELS } from '@/shared/constants/roles';

/**
 * Danh sách thiết bị đang đăng nhập (Phase 3, 8).
 *
 * Người dùng cần trả lời được: "Có ai lạ đang dùng tài khoản của tôi không?"
 * Vì vậy mỗi dòng phải hiện đủ: thiết bị, IP, lần dùng gần nhất, cách đăng nhập.
 */
export function SessionList() {
  const [sessionToRevoke, setSessionToRevoke] = useState(null);
  const { data: sessions, isLoading, error, refetch } = useSessions();
  const revokeMutation = useRevokeSession();
  const revokeOthersMutation = useRevokeOtherSessions();

  // TODO:
  // <DataState isLoading={isLoading} error={error} isEmpty={!sessions?.length}
  //            onRetry={refetch} emptyMessage="Không có phiên nào">
  //   - Nút "Đăng xuất mọi thiết bị khác" ở đầu, chỉ hiện khi sessions.length > 1.
  //   - <ul> mỗi phiên một <li key={session.id}>:
  //       + Icon theo userAgent (điện thoại/máy tính) — parse thô cũng được,
  //         nhớ aria-hidden.
  //       + Phiên hiện tại: <Badge tone="success">Thiết bị này</Badge> và KHÔNG
  //         có nút đăng xuất (muốn thoát thì dùng nút Đăng xuất ở menu avatar).
  //       + formatRelativeTime(session.lastUsedAt) — '5 phút trước' dễ hiểu hơn
  //         dấu thời gian đầy đủ.
  //       + Nút "Đăng xuất" mở ConfirmDialog.
  // </DataState>
  //
  // GỢI Ý: parse userAgent chỉ để đoán loại thiết bị cho dễ nhìn. Đừng dựa vào nó
  // cho bất cứ quyết định bảo mật nào — client tự khai báo được giá trị này.
  return null;
}
