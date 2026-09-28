import { Loader2, AlertCircle, Inbox } from 'lucide-react';
import { Button } from './Button';

/**
 * Bốn trạng thái của mọi màn hình có dữ liệu: đang tải / lỗi / rỗng / có dữ liệu.
 *
 * VÌ SAO GOM VÀO MỘT COMPONENT: nếu để mỗi page tự viết, chắc chắn sẽ có page
 * thiếu trạng thái rỗng (người dùng thấy bảng trắng không hiểu gì) hoặc thiếu
 * nút thử lại khi lỗi. Component này buộc cả bốn trạng thái phải được xử lý.
 *
 * Cách dùng:
 *   const { data, isLoading, error, refetch } = useUsers(filters);
 *   <DataState isLoading={isLoading} error={error} isEmpty={!data?.length}
 *              onRetry={refetch} emptyMessage="Chưa có người dùng nào">
 *     <UserTable users={data} />
 *   </DataState>
 *
 * @param {object} props
 * @param {boolean} props.isLoading
 * @param {{ message: string } | null} [props.error]
 * @param {boolean} [props.isEmpty]
 * @param {() => void} [props.onRetry]
 * @param {string} [props.emptyMessage]
 * @param {import('react').ReactNode} [props.emptyAction] nút gợi ý hành động, ví dụ "Tải ảnh lên"
 * @param {import('react').ReactNode} [props.skeleton] khung xương thay cho spinner
 * @param {import('react').ReactNode} props.children
 */
export function DataState({
  isLoading,
  error,
  isEmpty,
  onRetry,
  emptyMessage = 'Chưa có dữ liệu',
  emptyAction,
  skeleton,
  children,
}) {
  // TODO — thứ tự kiểm tra BẮT BUỘC như sau:
  // 1. isLoading  → skeleton ?? spinner (kèm role="status")
  // 2. error      → thông điệp + nút "Thử lại" gọi onRetry
  //                 Lỗi mà không có cách thử lại là bắt người dùng F5 — tệ.
  // 3. isEmpty    → icon + emptyMessage + emptyAction
  //                 Trạng thái rỗng phải phân biệt được với "đang tải": bảng
  //                 trắng không nói gì khiến người dùng tưởng hệ thống lỗi.
  // 4. Còn lại    → children
  //
  // Đảo thứ tự 1 và 3 là lỗi hay gặp: lần tải đầu `data` chưa có nên isEmpty
  // đúng, và người dùng thấy "chưa có dữ liệu" nhoáng lên trước khi bảng hiện.
  return children;
}
