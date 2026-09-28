# 07 — Hướng dẫn hoàn thiện (thứ tự nên làm)

Toàn bộ thân hàm trong base này để trống kèm `TODO`. Tài liệu này là thứ tự điền
code sao cho **sau mỗi bước bạn có thứ chạy được và kiểm tra được** — thay vì viết
hết rồi mới chạy và không biết lỗi ở đâu.

## Nguyên tắc chung

1. **Mỗi bước phải kiểm tra được.** Đừng viết 10 file rồi mới chạy.
2. **Đọc phần `TODO` và ghi chú trong file trước khi viết.** Nhiều ghi chú giải
   thích *vì sao* làm theo cách đó, và cảnh báo bẫy cụ thể.
3. **Gặp `throw new Error('... chưa được triển khai')`** nghĩa là hàm đó chưa viết.
   Đó là lỗi có chủ ý để bạn không dùng nhầm hàm rỗng.
4. Cập nhật `CHECKLIST.md` sau mỗi bước.

## Giai đoạn 0 — Chuẩn bị (30 phút)

```bash
nvm use && npm install
docker compose up -d
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Điền `backend/.env`:

```bash
# Sinh secret ngẫu nhiên
openssl rand -base64 48   # dùng cho JWT_ACCESS_SECRET
openssl rand -base64 48   # dùng cho JWT_REFRESH_SECRET
```

Tài khoản bên ngoài cần có (có thể để giá trị giả lúc đầu, nhưng env.js sẽ đòi):

| Dịch vụ | Lấy ở đâu | Cần cho |
|---|---|---|
| Resend | resend.com → API Keys | Gửi email |
| Google OAuth | Google Cloud Console → Credentials | Đăng nhập Google |
| Cloudflare R2 | Cloudflare → R2 → Manage API Tokens | Upload ảnh |

**Kiểm tra:** `docker compose ps` thấy mongo healthy.

## Giai đoạn 1 — Backend chạy được (2–3 giờ)

Thứ tự này có lý do: mỗi file sau phụ thuộc file trước.

| # | File | Kiểm tra |
|---|---|---|
| 1 | `shared/config/env.js` → `loadEnv()` | Thiếu biến thì server in lỗi rõ ràng rồi thoát |
| 2 | `shared/lib/logger.js` | Log ra màu, dễ đọc ở dev |
| 3 | `shared/utils/response.js` | — |
| 4 | `shared/errors/` (đã xong, chỉ đọc) | — |
| 5 | `shared/middlewares/errorHandler.js` | — |
| 6 | `shared/middlewares/notFound.js` (đã xong) | — |
| 7 | `shared/config/db.js` → `configureMongoose`, `connectDB` | — |
| 8 | `app.js` → `createApp()` | — |
| 9 | `server.js` → `main()`, `registerShutdown()` | — |

Tạm thời comment dòng `bootstrapScheduler` trong `server.js` (chưa viết).

```bash
npm run db:migrate    # nhưng migration cũng chưa viết → xem bước tiếp
npm run dev -w backend
curl http://localhost:5000/api/v1/health
```

**Kiểm tra:** `/health` trả `{ success: true, data: { status: 'ok', db: 'connected' } }`,
và `curl http://localhost:5000/api/v1/sai` trả JSON lỗi đúng định dạng (không phải
HTML của Express).

> Thứ tự quan trọng ở đây: `configureMongoose()` phải chạy **trước** khi bất kỳ
> model nào được import, nếu không `toJSON` và `sanitizeFilter` không áp dụng.

## Giai đoạn 2 — Migration và seed (1 giờ)

| # | File |
|---|---|
| 10 | 4 file trong `migrations/` |
| 11 | `shared/utils/password.js` |
| 12 | `scripts/seed.js` |

```bash
npm run db:migrate
# Điền SEED_SUPER_ADMIN_EMAIL và SEED_SUPER_ADMIN_PASSWORD vào .env
npm run db:seed
```

**Kiểm tra:** mở MongoDB (Compass hoặc `mongosh`), xác nhận:
- Collection `users` có 1 document role `SUPER_ADMIN`.
- `db.users.getIndexes()` có `email_unique`.
- Collection `systemsettings` có document `key: 'GLOBAL'`.

> Chạy `npm run db:seed` lần hai phải **không** tạo thêm Super Admin (tính idempotent).

## Giai đoạn 3 — Auth backend (4–6 giờ)

Phần khó nhất của cả dự án. Đi từng bước nhỏ và test bằng curl/Postman sau mỗi bước.

| # | File | Test bằng |
|---|---|---|
| 13 | `shared/utils/token.js` | Unit test `durationToMs`, `hashToken` |
| 14 | `shared/utils/serialize.js` → `toApi()` | Unit test với object lồng nhau |
| 15 | `shared/utils/pagination.js` | Unit test |
| 16 | `shared/middlewares/validate.js` | POST body sai → 400 với `details` theo field |
| 17 | `settings.service.js` → `getSettings`, các `assert*` | `GET /settings/public` |
| 18 | `users.service.js` → `findByEmail`, `createUser`, `getById` | — |
| 19 | `sessions.service.js` → `createSession`, `assertSessionActive` | — |
| 20 | `auth.tokens.service.js` | — |
| 21 | `shared/lib/mailer.js` | Đăng ký và kiểm hộp thư thật |
| 22 | `auth.service.js` → `register`, `verifyEmail` | `POST /auth/register` |
| 23 | `auth.service.js` → `login` | `POST /auth/login` trả accessToken + Set-Cookie |
| 24 | `shared/middlewares/authenticate.js` | `GET /users/me` với Bearer token |
| 25 | `shared/middlewares/authorize.js` | `GET /users` với user thường → 403 |
| 26 | `sessions.service.js` → `rotateRefreshToken` | `POST /auth/refresh` hai lần |
| 27 | `auth.service.js` → `refresh`, `logout` | — |

**Kiểm tra quan trọng nhất ở bước 26** — thử đúng ba tình huống:

```bash
# 1. Refresh bình thường → 200, nhận cookie mới
# 2. Refresh lại bằng cookie CŨ → 401 AUTH_REFRESH_REUSED
# 3. Sau đó gọi /users/me bằng access token cũ → 401 (mọi phiên đã bị thu hồi)
```

Nếu tình huống 2 trả 200 thì rotation chưa đúng — đó là lỗ hổng, không phải chi tiết nhỏ.

> **Test bảo mật bắt buộc:** gửi `POST /auth/login` với body
> `{"email": {"$ne": null}, "password": "x"}`. Phải nhận **400 VALIDATION_ERROR**.
> Nếu nhận 401 hoặc 200 thì Zod chưa chặn được NoSQL operator injection.

## Giai đoạn 4 — Các phương thức đăng nhập khác (3–4 giờ)

| # | File |
|---|---|
| 28 | `auth.password.service.js` (quên / đặt lại / đổi mật khẩu) |
| 29 | `auth.magicLink.service.js` |
| 30 | `auth.google.service.js` |
| 31 | `auth.controller.js` (toàn bộ) |

Google OAuth cần cấu hình Redirect URI trong Google Cloud Console khớp **chính xác**
với `GOOGLE_REDIRECT_URI` — sai một dấu `/` là lỗi `redirect_uri_mismatch`.

**Kiểm tra:** mở `http://localhost:5000/api/v1/auth/google` trên trình duyệt, đi hết
luồng, xác nhận có cookie refresh và bị redirect về frontend.

## Giai đoạn 5 — User + Session management (2–3 giờ)

| # | File |
|---|---|
| 32 | `users.service.js` → `listUsers`, `changeRole`, `setBlocked`, `updateProfile` |
| 33 | `users.controller.js` |
| 34 | `sessions.service.js` → phần còn lại |
| 35 | `sessions.controller.js` |
| 36 | `settings.service.js` → `updateSettings`, `getPublicSettings` |
| 37 | `settings.controller.js` |

**Kiểm tra bảo vệ Super Admin** — bốn tình huống trong `docs/04`:

```bash
# 1. Admin tự hạ quyền mình        → 403 CANNOT_MODIFY_SELF
# 2. Admin hạ quyền Super Admin    → 403 SUPER_ADMIN_PROTECTED
# 3. Admin cấp quyền ADMIN cho ai  → 403 FORBIDDEN
# 4. Chặn user → access token của user đó không dùng được nữa
```

**Kiểm tra IDOR:** user A gọi `DELETE /sessions/:id` với id phiên của user B → 404.

## Giai đoạn 6 — Media (3–4 giờ)

| # | File |
|---|---|
| 38 | `shared/lib/storage.js` |
| 39 | `media.service.js` → `createUploadUrl`, `confirmUpload` |
| 40 | `media.usage.js` |
| 41 | `mediaFolder.service.js` |
| 42 | `media.service.js` → phần còn lại |
| 43 | `media.controller.js` |

**Kiểm tra luồng 3 bước bằng curl:**

```bash
# 1. Xin URL
curl -X POST .../media/upload-url -H "Authorization: Bearer ..." \
  -d '{"originalName":"a.png","mimeType":"image/png","size":1234}'

# 2. PUT file (dùng uploadUrl nhận được)
curl -X PUT "<uploadUrl>" --data-binary @a.png -H "Content-Type: image/png"

# 3. Confirm
curl -X POST .../media/<id>/confirm -H "Authorization: Bearer ..."
```

Bước 2 nhận `403 SignatureDoesNotMatch` → thiếu hoặc sai `Content-Type`.

**Kiểm tra chặn xoá:** đặt một ảnh làm avatar → `DELETE /media/:id` → phải nhận
**409 MEDIA_IN_USE** kèm danh sách. Rồi `DELETE /media/:id?force=true` → 204.

## Giai đoạn 7 — Scheduler (2–3 giờ)

| # | File |
|---|---|
| 44 | `shared/lib/scheduler.js` |
| 45 | `scheduler.schema.js` → `parsePayloadByType` |
| 46 | `jobs/cleanupOrphanMedia.job.js` |
| 47 | `jobs/sendEmailToGroup.job.js` |
| 48 | `scheduler.service.js` |
| 49 | `scheduler.bootstrap.js` + bỏ comment trong `server.js` |
| 50 | `scheduler.controller.js` |

**Kiểm tra:** tạo job với cron `* * * * *` (mỗi phút) và `dryRun: true`, chờ 1 phút,
xem `GET /scheduler/jobs/:id/runs` có bản ghi SUCCESS.

Rồi thử `POST /scheduler/jobs/:id/run` **hai lần liên tiếp thật nhanh** → lần hai
phải nhận `409 JOB_ALREADY_RUNNING`.

## Giai đoạn 8 — Frontend nền tảng (3–4 giờ)

| # | File | Kiểm tra |
|---|---|---|
| 51 | `shared/lib/utils.js` | — |
| 52 | `shared/lib/http.js` → `normalizeError` trước | — |
| 53 | `shared/lib/queryClient.js` | — |
| 54 | `shared/components/ui/` (Button, Input, PasswordInput trước) | — |
| 55 | `shared/components/ui/` phần còn lại | — |
| 56 | `features/auth/store/authStore.js` | — |
| 57 | `features/auth/api/authApi.js` | — |
| 58 | `features/auth/hooks/useAuthMutations.js` | — |
| 59 | `app/providers.jsx` + gọi `bootstrap()` | — |
| 60 | `app/router/guards/` | — |
| 61 | `layouts/` + `layouts/components/` | — |
| 62 | `pages/common/` | — |

```bash
npm run dev
```

**Kiểm tra:** mở `http://localhost:5173`, thấy layout, vào URL sai thấy trang 404.

> **Bẫy hay gặp ở bước 56–59:** sau khi F5, `isBootstrapping` phải là `true` cho tới
> khi `/auth/refresh` trả về. Nếu `ProtectedRoute` không chờ, mỗi lần F5 bạn sẽ bị
> đẩy ra trang đăng nhập dù đang đăng nhập.

## Giai đoạn 9 — Frontend auth (3–4 giờ)

| # | File |
|---|---|
| 63 | `features/auth/components/LoginForm.jsx` |
| 64 | `pages/auth/LoginPage.jsx` |
| 65 | `features/auth/components/RegisterForm.jsx` + `RegisterPage.jsx` |
| 66 | `pages/auth/VerifyEmailPage.jsx` |
| 67 | `features/auth/components/MagicLinkForm.jsx` + `MagicLinkPage.jsx` |
| 68 | `features/auth/components/GoogleLoginButton.jsx` + `OAuthCallbackPage.jsx` |
| 69 | `pages/auth/ForgotPasswordPage.jsx` + `ResetPasswordPage.jsx` |
| 70 | Hoàn thiện `http.js` → interceptor refresh + xếp hàng |

**Kiểm tra bước 70 (quan trọng):** mở DevTools, đặt `JWT_ACCESS_TTL=10s` trong
`.env`, đăng nhập, chờ 15 giây, rồi mở một trang gọi nhiều API cùng lúc. Phải thấy
**đúng một** request `/auth/refresh`, và các request khác thành công sau đó. Nếu thấy
nhiều request refresh và bị đăng xuất → chưa xếp hàng đúng.

## Giai đoạn 10 — Frontend các khu còn lại (5–7 giờ)

| # | Nhóm |
|---|---|
| 71 | `features/sessions/` + `SessionsSettingsPage` |
| 72 | `features/users/` + `ProfileSettingsPage`, `SecuritySettingsPage` |
| 73 | `pages/admin/UserManagePage` + `features/users/components/` |
| 74 | `features/settings/` + `SystemSettingsPage` |
| 75 | `features/media/` (upload trước, thư viện sau) |
| 76 | `pages/admin/MediaLibraryPage` |
| 77 | `features/scheduler/` + `SchedulerPage` |
| 78 | `pages/admin/DashboardPage` |

## Giai đoạn 11 — Test (2–3 giờ)

| # | File |
|---|---|
| 79 | `backend/tests/setup.js` |
| 80 | `backend/src/modules/auth/auth.test.js` — chuyển `it.todo` thành test thật |
| 81 | `frontend/src/tests/setup.js` + `mocks/handlers.js` |
| 82 | Test form đăng nhập và route guard |

Thứ tự viết test theo **mức rủi ro**, không theo thứ tự file:

1. Auth: đăng ký, đăng nhập, refresh rotation, token hết hạn.
2. Phân quyền: user thường không vào route admin; không hạ quyền Super Admin.
3. IDOR: không thu hồi được phiên người khác.
4. Validation: input sai trả đúng định dạng lỗi.
5. Utils thuần: `durationToMs`, `toApi`, `formatFileSize`.

Đừng đặt mục tiêu phần trăm coverage. Test đúng luồng rủi ro cao hơn là test nhiều.

## Tổng thời gian ước lượng

| Giai đoạn | Thời gian |
|---|---|
| 0–2: Chuẩn bị + backend chạy được | 4–5 giờ |
| 3–4: Auth backend | 7–10 giờ |
| 5–7: Các module backend còn lại | 7–10 giờ |
| 8–10: Frontend | 11–15 giờ |
| 11: Test | 2–3 giờ |
| **Tổng** | **31–43 giờ** |

Với người mới, cộng thêm thời gian đọc tài liệu và gỡ lỗi — khoảng 60–80 giờ là
thực tế hơn. Đừng cố làm nhanh; mỗi giai đoạn có phần "Kiểm tra" chính là để bạn
biết mình đang đi đúng.

## Khi bị mắc

1. Đọc lại `TODO` trong file — phần lớn bẫy đã được ghi ở đó.
2. Xem tài liệu tương ứng: `docs/03` cho auth, `docs/05` cho media, `docs/06` cho
   email/scheduler.
3. Kiểm tra log backend (`logger` đã cấu hình in đẹp ở dev).
4. Với lỗi từ MongoDB: `errorHandler` đã map các lỗi thường gặp — xem bảng trong
   `errorHandler.js`.
