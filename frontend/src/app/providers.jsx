import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from '@/shared/lib/queryClient';

/**
 * Gom mọi provider toàn cục vào một chỗ.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 */
export function AppProviders({ children }) {
  // TODO:
  // <QueryClientProvider client={queryClient}>
  //   {children}
  //   <Toaster position="top-right" richColors />
  //   {import.meta.env.DEV && <ReactQueryDevtools />}   ← chỉ ở chế độ dev
  // </QueryClientProvider>
  //
  // LƯU Ý: KHÔNG đặt provider của Zustand ở đây — Zustand không cần provider,
  // store là module import trực tiếp. Đó là một lý do nó gọn hơn Redux.
  return children;
}
