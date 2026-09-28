import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './components/AdminSidebar';
import { AppHeader } from './components/AppHeader';

/**
 * Khung khu quản trị (Phase 10): sidebar trái + nội dung phải.
 *
 * Khu quản trị có bố cục RIÊNG, không dùng chung ClientLayout — đó là chủ ý của
 * bố cục SaaS: người dùng nhận ra ngay mình đang ở vùng quản trị.
 */
export function AdminLayout() {
  // TODO:
  // <div className="min-h-screen flex">
  //   <AdminSidebar />                        ← bên trong dùng <nav>
  //   <div className="flex-1 flex flex-col">
  //     <AppHeader variant="admin" />
  //     <main className="flex-1 p-6 bg-gray-50"><Outlet /></main>
  //   </div>
  // </div>
  //
  // Trên mobile: sidebar nên ẩn thành drawer mở bằng nút. Trạng thái mở/đóng là
  // state CỤC BỘ (useState) hoặc Zustand nếu header ở ngoài cần điều khiển nó —
  // đừng nhồi vào store khi chỉ layout này dùng.
  return null;
}
