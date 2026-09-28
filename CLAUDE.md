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

*(Chưa có code — sẽ cập nhật khi khởi tạo client/server: package manager, cấu trúc thư mục, DB, biến môi trường...)*
