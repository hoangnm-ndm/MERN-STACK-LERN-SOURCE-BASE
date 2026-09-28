# CHECKLIST — MERN Stack Base

## Trạng thái hiện tại

- Cập nhật lần cuối: 2026-09-28
- Giai đoạn đang thực hiện: **P2 — Điền code backend nền tảng**
- Bộ khung (scaffold) đã dựng xong: **215 file** (88 backend · 108 frontend · 9 docs ·
  10 cấu hình gốc) — cấu trúc thư mục, chữ ký hàm/component và gợi ý `TODO`.
  **Thân hàm để trống** để người học tự viết.
- Điểm review gần nhất: chưa review (source chưa có code thật để đánh giá)
- Ghi chú cho người làm tiếp: đọc `docs/07-huong-dan-hoan-thien.md` trước khi bắt
  đầu — nó là thứ tự điền code sao cho sau mỗi bước có thứ chạy được và kiểm tra
  được. Đừng viết nhiều file rồi mới chạy.

## Công việc

### P0 — Khởi tạo (xong)

- [x] Khởi tạo git repository
- [x] Tạo `CLAUDE.md` (quy tắc làm việc)
- [x] Tạo `CHECKLIST.md`
- [x] Khởi tạo cấu trúc project (monorepo npm workspaces: `backend/` + `frontend/`)
- [x] [OPS-01] Cấu hình gốc: `.gitignore`, `.prettierrc`, `.editorconfig`, `.nvmrc`, `docker-compose.yml`
- [x] ESLint riêng cho từng workspace (Node vs React + a11y)
- [x] `docs/` đánh số 01–09

### P1 — Dựng khung (xong)

- [x] Khung backend: `app.js`, `server.js`, `routes/index.js`, `shared/` (config, errors, utils, middlewares, lib, constants)
- [x] Khung 7 module backend: health, users, auth, sessions, settings, media, scheduler
- [x] Khung 4 file migration + `scripts/seed.js`
- [x] Khung 7 template email (React Email)
- [x] Khung frontend: router + guards, 3 layout, 20 page, 6 feature, 10 component UI dùng chung
- [x] Khung test: Vitest + mongodb-memory-server (BE), Vitest + RTL + MSW (FE)

### P2 — Điền code backend nền tảng

Theo `docs/07` giai đoạn 1–2.

- [ ] [BE-01] `shared/config/env.js` → `loadEnv()` — Hoàn thành khi: thiếu biến bắt buộc thì server in lỗi rõ ràng rồi thoát code 1
- [ ] `shared/lib/logger.js` — Hoàn thành khi: log màu ở dev, JSON ở production, redact password/token
- [ ] `shared/utils/response.js` — Hoàn thành khi: 3 helper trả đúng định dạng chuẩn
- [ ] `shared/middlewares/errorHandler.js` — Hoàn thành khi: ZodError → 400 có `details`, lỗi 11000 → 409, lỗi lạ → 500 không lộ stack ở production
- [ ] `shared/config/db.js` → `configureMongoose`, `connectDB`, `disconnectDB` — Hoàn thành khi: `GET /health` trả `db: connected`
- [ ] `app.js` + `server.js` — Hoàn thành khi: `npm run dev -w backend` chạy, URL sai trả JSON lỗi (không phải HTML)
- [ ] 4 file `migrations/*.cjs` — Hoàn thành khi: `npm run db:migrate` chạy được trên DB trống, `db.users.getIndexes()` có `email_unique`
- [ ] `shared/utils/password.js` + `scripts/seed.js` — Hoàn thành khi: `npm run db:seed` tạo 1 Super Admin, chạy lần hai không tạo thêm

### P3 — Auth backend

Theo `docs/07` giai đoạn 3–4. Phần khó nhất, test bằng curl sau mỗi bước.

- [ ] `shared/utils/token.js`, `serialize.js`, `pagination.js` — Hoàn thành khi: unit test `durationToMs` và `toApi` pass
- [ ] `shared/middlewares/validate.js` — Hoàn thành khi: body sai trả 400 với `details` theo từng field
- [ ] `settings.service.js` → `getSettings` + các `assert*` — Hoàn thành khi: `GET /settings/public` trả đủ 5 cờ
- [ ] `users.service.js` → `findByEmail`, `createUser`, `getById`
- [ ] `sessions.service.js` → `createSession`, `assertSessionActive`
- [ ] `auth.tokens.service.js` — Hoàn thành khi: `consumeToken` dùng findOneAndUpdate nguyên tử, gọi hai lần thì lần hai báo TOKEN_ALREADY_USED
- [ ] `shared/lib/mailer.js` — Hoàn thành khi: nhận được email thật, và lỗi từ Resend không bị nuốt
- [ ] `auth.service.js` → `register`, `verifyEmail` — Hoàn thành khi: đăng ký xong nhận email, bấm link thì `emailVerifiedAt` được set
- [ ] `auth.service.js` → `login` — Hoàn thành khi: trả accessToken + Set-Cookie, và email-không-tồn-tại với sai-mật-khẩu trả CÙNG mã lỗi
- [ ] [SEC-01] Chặn NoSQL operator injection — Hoàn thành khi: `POST /auth/login` với `{"email":{"$ne":null}}` trả **400 VALIDATION_ERROR** (không phải 401/200)
- [ ] `shared/middlewares/authenticate.js` + `authorize.js` — Hoàn thành khi: user thường gọi `GET /users` nhận 403
- [ ] [SEC-02] `sessions.service.js` → `rotateRefreshToken` — Hoàn thành khi: dùng lại cookie cũ trả 401 `AUTH_REFRESH_REUSED` **và** mọi phiên của user đó bị thu hồi
- [ ] `auth.service.js` → `refresh`, `logout`
- [ ] `auth.password.service.js` — Hoàn thành khi: đặt lại mật khẩu thu hồi toàn bộ phiên; đổi mật khẩu giữ lại phiên hiện tại
- [ ] `auth.magicLink.service.js` — Hoàn thành khi: link dùng được đúng một lần
- [ ] [SEC-03] `auth.google.service.js` — Hoàn thành khi: `state` được kiểm (lệch → từ chối), `id_token` được verify chữ ký + audience, `email_verified: false` bị từ chối
- [ ] `auth.controller.js`

### P4 — Các module backend còn lại

Theo `docs/07` giai đoạn 5–7.

- [ ] `users.service.js` → `listUsers`, `updateProfile` — Hoàn thành khi: regex từ input được escape (gửi `(a+)+$` không treo server)
- [ ] [SEC-04] `users.service.js` → `changeRole`, `setBlocked` — Hoàn thành khi: cả 4 tình huống trong `docs/04` trả đúng mã lỗi (tự sửa mình, sửa Super Admin, admin cấp quyền admin, chặn thì cắt phiên)
- [ ] `users.controller.js`, `sessions.controller.js`
- [ ] [SEC-05] Chống IDOR ở `revokeSession` — Hoàn thành khi: user A gọi `DELETE /sessions/:id` với id phiên của user B nhận 404
- [ ] `settings.service.js` → `updateSettings` — Hoàn thành khi: tắt cả 3 phương thức đăng nhập bị chặn với thông điệp rõ ràng
- [ ] `shared/lib/storage.js` — Hoàn thành khi: presigned URL PUT được file lên R2
- [ ] `media.service.js` → `createUploadUrl`, `confirmUpload` — Hoàn thành khi: luồng 3 bước chạy bằng curl, `size` lưu là số thật từ R2
- [ ] [DB-01] `media.usage.js` — Hoàn thành khi: ảnh đang làm avatar thì `DELETE /media/:id` trả 409 `MEDIA_IN_USE` kèm danh sách; `?force=true` trả 204
- [ ] `mediaFolder.service.js` — Hoàn thành khi: đổi tên thư mục cập nhật `path` cho cả cây con; xoá thư mục chưa rỗng bị chặn
- [ ] `media.service.js` phần còn lại + `media.controller.js`
- [ ] `shared/lib/scheduler.js` + `jobs/*.job.js`
- [ ] [BE-05] `scheduler.service.js` → `executeJob` — Hoàn thành khi: bấm "Chạy ngay" hai lần liên tiếp thì lần hai nhận 409 `JOB_ALREADY_RUNNING`, và cờ `isRunning` luôn được nhả (kể cả khi job lỗi)
- [ ] `scheduler.bootstrap.js` + bỏ comment trong `server.js` — Hoàn thành khi: job cron `* * * * *` tự chạy và ghi `JobRun`
- [ ] `scheduler.controller.js`

### P5 — Frontend

Theo `docs/07` giai đoạn 8–10.

- [ ] `shared/lib/utils.js`, `queryClient.js`
- [ ] `shared/lib/http.js` → `normalizeError` — Hoàn thành khi: mọi lỗi trả về đúng hình dạng `{ code, message, details? }`
- [ ] `shared/components/ui/` (Button, Input, PasswordInput trước) — Hoàn thành khi: nút ẩn/hiện mật khẩu có `type="button"` và `aria-label` đổi theo trạng thái
- [ ] `shared/components/ui/` phần còn lại
- [ ] [FE-01] `features/auth/store/authStore.js` + gọi `bootstrap()` — Hoàn thành khi: F5 giữa phiên **không** bị đẩy ra trang đăng nhập (`isBootstrapping` chờ xong mới quyết định)
- [ ] `features/auth/api` + `hooks`
- [ ] `app/router/guards/` + `layouts/` + `pages/common/`
- [ ] `features/auth/components/` + các page auth
- [ ] [FE-02] Interceptor refresh trong `http.js` — Hoàn thành khi: đặt `JWT_ACCESS_TTL=10s`, mở trang gọi nhiều API cùng lúc sau khi token hết hạn → DevTools thấy **đúng một** request `/auth/refresh`, không bị đăng xuất
- [ ] `features/sessions/` + `SessionsSettingsPage`
- [ ] `features/users/` + `ProfileSettingsPage`, `SecuritySettingsPage`, `UserManagePage`
- [ ] `features/settings/` + `SystemSettingsPage`
- [ ] `features/media/` + `MediaLibraryPage`
- [ ] `features/scheduler/` + `SchedulerPage`
- [ ] `pages/admin/DashboardPage`

### P6 — Còn thiếu ở backend (phát hiện khi dựng frontend)

Những chỗ frontend cần mà backend chưa có. Ghi lại để không quên.

- [ ] [BE-02] Thêm cờ `hasPassword` vào `GET /users/me` — Hoàn thành khi: `SecuritySettingsPage` phân biệt được tài khoản Google (hiện "Đặt mật khẩu") với tài khoản có mật khẩu (hiện "Đổi mật khẩu")
- [ ] [BE-03] Thêm `GET /admin/stats` — Hoàn thành khi: `DashboardPage` lấy đủ số liệu bằng **một** request
- [ ] [BE-04] Populate `updatedBy` thành tên người trong `GET /settings` — Hoàn thành khi: trang cấu hình hiện "Cập nhật lần cuối bởi \<tên\>"
- [ ] [BE-06] Endpoint gỡ liên kết tài khoản Google — Hoàn thành khi: chặn gỡ nếu đó là cách đăng nhập duy nhất
- [ ] [BE-07] Endpoint ước lượng số người nhận cho job gửi email — Hoàn thành khi: form job hiện "Sẽ gửi cho N người" trước khi lưu

### P7 — Test và hoàn thiện

- [ ] [TEST-01] `backend/tests/setup.js` — Hoàn thành khi: `npm test -w backend` chạy được với MongoMemoryReplSet, dữ liệu được dọn giữa các test
- [ ] [TEST-02] `auth.test.js` — chuyển `it.todo` thành test thật. Hoàn thành khi: phủ đủ 4 nhóm rủi ro cao (auth, phân quyền, refresh rotation, IDOR)
- [ ] [TEST-03] `frontend/src/tests/` + MSW handlers — Hoàn thành khi: test form đăng nhập và route guard pass
- [ ] [DOC-01] Bổ sung API docs (Swagger/OpenAPI hoặc Postman collection) — Hoàn thành khi: có bảng endpoint + mã lỗi
- [ ] [OPS-03] CI chạy lint + test trên mỗi push
- [ ] [OPS-04] Tích hợp theo dõi lỗi runtime (Sentry hoặc tương đương)

### Không nên làm lúc này

- **Tách microservice, thêm message queue** — quy mô hiện tại chưa cần (YAGNI).
- **BullMQ + Redis cho scheduler** — chỉ cần khi scale nhiều instance. Trước đó dùng
  cách tách worker (`SCHEDULER_ENABLED` khác nhau giữa 2 service), không cần sửa code.
  Xem `docs/09`.
- **`packages/shared` dùng chung schema giữa BE và FE** — cố tình không làm. Hai app
  độc lập về code, chỉ giao tiếp qua hợp đồng API.
- **Chuyển sang TypeScript** — đã chốt dùng JS + JSDoc cho dự án học tập này. Nếu về
  sau muốn đổi thì làm từng file, bắt đầu từ `shared/`.
- **[OPS-02] Bỏ `tsx` ở production** (build `emails/*.jsx` bằng esbuild rồi chạy
  `node`) — chỉ làm khi hiệu năng khởi động thành vấn đề thật.
- **Dropdown/modal tự viết bằng div** — đã dùng `<select>` và `<dialog>` gốc.
- **Cắt ảnh avatar ở client** — tính năng phụ, làm sau khi luồng chính chạy.

## Quyết định đã chốt

- 2026-09-28 — Đây là source code ứng dụng MERN thực tế (không phải giáo trình/tài liệu học).
- 2026-09-28 — Git repo được init tại gốc project.
- 2026-09-28 — **Database: MongoDB + Mongoose** (giữ đúng chữ M trong MERN). Phase 1
  trong yêu cầu ban đầu ghi "Prisma" nhưng Prisma là khuyến nghị cho PostgreSQL;
  với MongoDB thì Mongoose là chuẩn, và Prisma+Mongo không hỗ trợ `prisma migrate`.
  Migration dùng **migrate-mongo**.
- 2026-09-28 — **Frontend: React + Vite (SPA)**, `createBrowserRouter`, TanStack
  Query cho server state, Zustand cho client state.
- 2026-09-28 — **Ngôn ngữ: JavaScript (ESM) + JSDoc** cho cả hai phía, không dùng
  TypeScript. Đánh đổi: signature không tự mô tả, bù lại bằng JSDoc đầy đủ.
- 2026-09-28 — **Scheduler: node-cron in-process**. Giới hạn đã biết: nhiều instance
  sẽ chạy trùng job. Cách xử lý ở `docs/09`.
- 2026-09-28 — Monorepo **npm workspaces**, không tạo `packages/shared`.
- 2026-09-28 — Validation bằng **Zod ở cả hai phía**, mỗi phía tự khai báo schema.
- 2026-09-28 — Dùng **Express 5** nên **không** dùng `asyncHandler` (Express 5 đã tự
  bắt lỗi async handler).
- 2026-09-28 — Access token giữ trong **bộ nhớ** frontend, refresh token trong
  **cookie httpOnly** có xoay vòng. Không dùng localStorage cho token.
- 2026-09-28 — Media **không lưu `usageCount`**; đếm tham chiếu tại thời điểm cần
  qua registry `MEDIA_CONSUMERS`. Lý do: đếm sẵn dễ lệch theo hướng nguy hiểm.
- 2026-09-28 — Xoá media: **xoá DB trước, R2 sau**. Lỗi ở bước sau chỉ để lại file
  rác (job dọn được), ngược lại sẽ làm ảnh vỡ trên giao diện.
- 2026-09-28 — Cấu hình hệ thống dùng mô hình **singleton** (`key: 'GLOBAL'`), không
  dùng bảng key-value.
- 2026-09-28 — Backend chạy bằng `tsx` (kể cả production) vì template email là `.jsx`
  và Node không tự transform JSX. Đánh đổi có ý thức, xem `docs/09`.

## Lịch sử

- 2026-09-28 — Chạy skill `setup`: tạo `CLAUDE.md` và `CHECKLIST.md`, git init.
- 2026-09-28 — Chạy skill `review-fullstack-js` ở chế độ **dựng kiến trúc** (không
  phải review): dựng bộ khung 215 file theo bộ chuẩn của skill, thân hàm để trống
  kèm gợi ý. Chưa có báo cáo trong `review-source/` vì chưa có code thật để đánh giá.
