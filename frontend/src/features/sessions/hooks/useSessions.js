import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as sessionsApi from '../api/sessionsApi';

/**
 * Query key factory — khai báo key một nơi.
 *
 * Vì sao không gõ `['sessions']` rải rác: chỉ cần một chỗ viết `['session']`
 * (thiếu s) là `invalidateQueries` không khớp, dữ liệu không được làm mới và
 * không có lỗi nào báo cho bạn biết.
 */
export const sessionKeys = {
  all: ['sessions'],
  list: () => [...sessionKeys.all, 'list'],
};

/** @returns {import('@tanstack/react-query').UseQueryResult} */
export function useSessions() {
  return useQuery({
    queryKey: sessionKeys.list(),
    queryFn: sessionsApi.getSessions,
  });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sessionsApi.revokeSession,
    // TODO:
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    //   toast.success('Đã đăng xuất thiết bị');
    // }
    //
    // `invalidateQueries` là bước KHÔNG ĐƯỢC QUÊN sau mutation: thiếu nó thì
    // thiết bị vừa xoá vẫn nằm trong danh sách cho tới khi người dùng F5.
  });
}

/** @returns {import('@tanstack/react-query').UseMutationResult} */
export function useRevokeOtherSessions() {
  // TODO: giống trên, toast hiện số thiết bị đã đăng xuất (`data.revoked`).
  return useMutation({ mutationFn: sessionsApi.revokeOtherSessions });
}
