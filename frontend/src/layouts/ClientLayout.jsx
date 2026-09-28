import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';

/**
 * Khung trang cho khu người dùng thường.
 *
 * Layout CHỈ dựng khung: header, vùng nội dung, footer. Không gọi API, không
 * logic nghiệp vụ — page con lo phần đó.
 */
export function ClientLayout() {
  // TODO: dựng khung bằng thẻ semantic:
  // <div className="min-h-screen flex flex-col">
  //   <AppHeader />
  //   <main className="flex-1">   ← <main>, không phải <div>: screen reader dùng
  //     <Outlet />                   nó để nhảy tới nội dung chính
  //   </main>
  //   <AppFooter />
  // </div>
  return null;
}
