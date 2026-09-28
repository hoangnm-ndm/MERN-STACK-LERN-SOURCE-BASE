# CLAUDE.md

## Quy tắc làm việc

- Luôn tạo và duy trì `CHECKLIST.md` tại gốc project, gồm: Trạng thái hiện tại / Công việc ([x] xong, [~] đang dở, [ ] chưa làm) / Quyết định đã chốt.
- Tài liệu và báo cáo viết bằng tiếng Việt; thuật ngữ chuyên ngành giữ nguyên tiếng Anh, giải thích nghĩa khi cần.
- Sơ đồ trong documentation dùng Mermaid.
- File documentation đặt số thứ tự đọc rõ ràng (`01-...`, `02-...`).
- Có thể commit sau mỗi task/milestone hoàn thành, nhưng không tự push — người dùng review và push.
- Sau mỗi turn: dừng và dọn các process/background task do Claude tự khởi chạy trong turn đó (dev server, watch script...) — chỉ dọn process tự khởi chạy, không đụng process khác.
- Luôn inspect trước khi modify: đọc và hiểu code/config liên quan trước khi thay đổi.
- Không tự ý mở rộng scope, refactor lớn, đổi kiến trúc hoặc thêm dependency nếu không thực sự cần thiết.
- Không đoán khi thiếu thông tin quan trọng: inspect project trước, chỉ hỏi khi thực sự cần.
- Trước khi báo hoàn thành: tự test/kiểm tra phù hợp và review git diff.
- Không tự ý làm thao tác nguy hiểm: xóa dữ liệu, `git reset`/`git clean`, force push, đổi cấu hình production.
- Có convention/architecture decision/workflow mới → cập nhật CLAUDE.md ngắn gọn; tài liệu chi tiết để trong `docs/`.
- Sau mỗi task, báo cáo ngắn gọn bằng tiếng Việt: đã làm gì → kiểm tra gì → commit gì → còn vấn đề gì → bước tiếp theo.

## Stack & cấu trúc project

Monorepo npm workspaces: `backend/` (Express 5 + Mongoose) + `frontend/` (React + Vite).
JavaScript ESM + JSDoc, **không** TypeScript. Chi tiết trong `docs/` (01–09).

- Backend: modular theo feature (`src/modules/<tên>/` gồm `.routes/.controller/.service/.schema/.model`), dùng chung ở `src/shared/`.
- Frontend: `features/<tên>/{api,hooks,components,schemas,store,index.js}`, `pages/` mỏng, `layouts/`, `shared/`.
- DB: MongoDB + Mongoose; migration bằng migrate-mongo; transaction cần replica set (docker-compose đã dựng `rs0`).
- Frontend state: TanStack Query (dữ liệu API) · Zustand (phiên đăng nhập) · URL params (bộ lọc, trang) · react-hook-form + Zod (form).
- Email: Resend + React Email (`backend/emails/*.jsx`). Storage: Cloudflare R2 presigned URL. Scheduler: node-cron in-process.

## Quy ước bắt buộc khi sửa code

Chi tiết và lý do trong `docs/08-quy-uoc-code.md`. Những điểm không được vi phạm:

- Ranh giới tầng: route khai báo path + middleware · controller gọi service + trả response · service chứa logic và truy vấn DB · model chỉ định nghĩa dữ liệu. Controller **không** truy vấn DB.
- Module **không** import model của module khác — gọi qua service được export.
- Response luôn qua helper trong `shared/utils/response.js`; lỗi luôn qua `errorHandler` duy nhất; mã lỗi khai báo ở `shared/errors/errorCodes.js`.
- Dùng Express 5 → **không** thêm `asyncHandler`, không `try/catch` trong controller.
- Validate bằng Zod ở tầng route (`validate()`), controller chỉ nhận dữ liệu đã parse. Đây cũng là lớp chặn NoSQL operator injection.
- **Không mass assignment**: không `create(req.body)` / `findByIdAndUpdate(id, req.body)`.
- Update phải có `{ new: true, runValidators: true }` — Mongoose mặc định không chạy validator khi update.
- Query dùng `.lean()` **bắt buộc** map qua `toApi()`; API luôn trả `id`, không trả `_id`/`__v`.
- Regex tạo từ input phải escape (chống ReDoS).
- Frontend: `component → hook → api → shared/lib/http`. Component không gọi axios trực tiếp. Sau mutation phải `invalidateQueries`.
- Frontend HTML: điều hướng dùng `<Link>`, hành động dùng `<button type="...">`, không `div/li onClick`. Mọi màn hình có dữ liệu phải đủ 4 trạng thái (dùng `<DataState>`).
- Index tạo bằng migration, không dựa vào `autoIndex`. Mọi thay đổi DB đều có migration.
- Dùng `logger`, không `console.log`. Không log mật khẩu, token, chuỗi kết nối.

## Trạng thái hiện tại của source

Đây là **bộ khung**: cấu trúc, chữ ký hàm và component đã khai báo, **thân hàm để
trống** kèm gợi ý `TODO` để người học tự viết. Hàm chưa triển khai ném
`new Error('... chưa được triển khai')` — đó là cố ý.

Khi được nhờ điền code: làm theo thứ tự trong `docs/07-huong-dan-hoan-thien.md` và
cập nhật `CHECKLIST.md` sau mỗi bước.
