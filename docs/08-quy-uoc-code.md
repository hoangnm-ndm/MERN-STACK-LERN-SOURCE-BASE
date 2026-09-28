# 08 — Quy ước code

## Đặt tên file

| Loại | Quy ước | Ví dụ |
|---|---|---|
| Module backend | `<tên>.<vai trò>.js` | `users.service.js`, `auth.routes.js` |
| Mongoose model | `<tên>.model.js` | `users.model.js` |
| Zod schema (request) | `<tên>.schema.js` | `users.schema.js` |
| Job | `<tên>.job.js` | `cleanupOrphanMedia.job.js` |
| Component React | `PascalCase.jsx` | `LoginForm.jsx` |
| Hook | `use<Tên>.js` | `useMediaUpload.js` |
| Còn lại | `camelCase.js` | `authApi.js`, `describeCron.js` |

> **Phân biệt rõ `.model.js` và `.schema.js`** — hai thứ hoàn toàn khác nhau:
> `.model.js` là Mongoose (giữ toàn vẹn dữ liệu trong DB), `.schema.js` là Zod
> (validate dữ liệu người dùng gửi lên). Lẫn lộn hai cái này là nguồn nhầm lẫn lớn.

## Import

**Backend:** đường dẫn tương đối, **có đuôi `.js`** (bắt buộc với ESM).

```js
import { env } from '../../shared/config/env.js';   // đúng
import { env } from '../../shared/config/env';      // sai — ESM đòi đuôi file
```

**Frontend:** alias `@/` trỏ tới `src/`, không cần đuôi (Vite lo).

```js
import { Button } from '@/shared/components/ui/Button';
```

**Feature chỉ import qua `index.js` của feature khác:**

```js
import { useAuthStore } from '@/features/auth';                  // đúng
import { useAuthStore } from '@/features/auth/store/authStore';   // sai
```

Ngoại lệ: trong cùng một feature thì dùng đường dẫn tương đối (`../api/authApi`).

## Response chuẩn

```jsonc
// Thành công
{ "success": true, "message": "Lấy danh sách thành công", "data": { } }

// Thành công có phân trang
{ "success": true, "data": [ ], "meta": { "page": 1, "limit": 20, "total": 135, "totalPages": 7 } }

// Lỗi
{ "success": false,
  "error": { "code": "VALIDATION_ERROR", "message": "Dữ liệu không hợp lệ",
             "details": [ { "field": "email", "message": "Email không hợp lệ" } ] } }
```

Controller **chỉ** dùng helper trong `shared/utils/response.js`. Lỗi **luôn** đi qua
`errorHandler`, không tự dựng JSON lỗi.

## Mã lỗi

Mã lỗi (`code`) tách khỏi HTTP status. Frontend xử lý theo `code` vì nó bền vững,
còn `message` có thể đổi text bất cứ lúc nào.

Thêm mã mới vào `shared/errors/errorCodes.js`, đừng viết chuỗi rải rác trong service.

Service ném lỗi bằng helper:

```js
throw notFound('Không tìm thấy người dùng');
throw forbidden('Không thể sửa Super Admin', ErrorCodes.SUPER_ADMIN_PROTECTED);
throw conflict('Email đã tồn tại', ErrorCodes.AUTH_EMAIL_ALREADY_EXISTS);
```

## Không dùng `asyncHandler`

Dự án dùng **Express 5**, đã tự bắt lỗi của async handler và chuyển sang
`errorHandler`. Không cần bọc controller, không cần `try/catch` trong controller.

Đây là điểm khác với hầu hết tutorial Express 4 — đừng thêm lại `asyncHandler`.

## Validation

**Hai lớp, hai mục đích khác nhau** (không phải trùng lặp DRY):

| Lớp | Mục đích |
|---|---|
| Zod ở biên API | Nguồn sự thật, bảo mật, chặn NoSQL injection |
| Mongoose schema | Giữ toàn vẹn dữ liệu trong DB |

Ràng buộc giữa hai lớp **phải khớp** (maxlength 120 ở cả hai nơi).

**Frontend cũng có Zod**, nhưng chỉ để trải nghiệm. Thông điệp và ràng buộc phải
trùng với backend — FE cho 6 ký tự mà BE đòi 8 là lỗi thật.

Luôn validate cả `params` (ObjectId đúng định dạng) và `query` (page, limit có giới
hạn, sort theo whitelist).

## Mass assignment — tuyệt đối không

```js
// SAI — người dùng tự gửi role: 'ADMIN' và tự lên quyền
await UserModel.create(req.body);
await UserModel.findByIdAndUpdate(id, req.body);

// ĐÚNG — chỉ truyền đúng field đã định
await UserModel.create({ email, name, passwordHash, role: Roles.USER });
```

## `runValidators` khi update

```js
await UserModel.findByIdAndUpdate(id, patch, { new: true, runValidators: true });
```

Mongoose **mặc định không chạy validator** khi update. Thiếu `runValidators` thì
`maxlength`, `enum`, `match` trong schema bị bỏ qua hoàn toàn.

`new: true` để nhận document **sau** khi cập nhật (mặc định trả bản cũ).

## `.lean()` và chuẩn hoá `id`

```js
const users = await UserModel.find(filter).lean();
return users.map(toApi);   // BẮT BUỘC
```

`mongoose.set('toJSON', ...)` chỉ áp dụng cho document đã hydrate. Kết quả `.lean()`
là object thuần, **không đi qua `toJSON`**, nên vẫn còn `_id` và `__v`.

Quên `toApi()` → API lúc trả `id`, lúc trả `_id` → frontend lãnh đủ.

**Entity ra API luôn dùng `id`.** Nếu thấy `_id` ở frontend, đó là bug backend.

## Không dùng class cho service/controller

```js
// ĐÚNG — module export hàm
export async function createUser(input) { }

// SAI — class chỉ để gom static method
export class UserService { static async create() { } }
```

Class hợp lý khi có trạng thái và vòng đời rõ ràng. Trong base này chỉ có một chỗ:
`AppError extends Error` (để giữ stack trace và dùng được `instanceof`).

## Regex từ input phải escape

```js
const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const filter = { name: { $regex: safe, $options: 'i' } };
```

Không escape thì người dùng gửi `(a+)+$` gây **ReDoS** treo server.

## Frontend: chuỗi gọi API

```
component → hook (features/*/hooks) → api (features/*/api) → shared/lib/http
```

Component **không** gọi `axios` hay `fetch` trực tiếp. Hook không tự gọi HTTP.

## Frontend: state đặt đúng chỗ

| Loại | Công cụ |
|---|---|
| Dữ liệu API | TanStack Query |
| Phiên đăng nhập | Zustand (`authStore`) |
| Modal mở/đóng, ẩn/hiện mật khẩu | `useState` |
| Giá trị form | react-hook-form |
| Bộ lọc, trang hiện tại | URL search params |
| Sở thích cá nhân (chế độ xem) | localStorage |

**Không copy dữ liệu API vào Zustand.** Query đã lo cache, refetch, loading, error.

## Frontend: query key factory

```js
export const userKeys = {
  all: ['users'],
  list: (filters) => [...userKeys.all, 'list', filters],
  detail: (id) => [...userKeys.all, 'detail', id],
};
```

Không gõ `['users']` rải rác. Chỉ cần một chỗ viết `['user']` (thiếu s) là
`invalidateQueries` không khớp — dữ liệu không được làm mới và **không có lỗi nào
báo cho bạn biết**.

**Sau mọi mutation phải `invalidateQueries`.** Quên là dữ liệu hiển thị cũ.

## Frontend: HTML đúng nghĩa

| Việc | Dùng | Không dùng |
|---|---|---|
| Điều hướng nội bộ | `<Link>` / `<NavLink>` | `<a href>`, `<li onClick>`, `<div onClick>` |
| Link ra ngoài | `<a target="_blank" rel="noopener noreferrer">` | — |
| Hành động | `<button type="button">` | `<div onClick>`, `<span onClick>` |
| Danh sách điều hướng | `<nav><ul><li><Link/></li></ul></nav>` | `<li>` chứa text thuần |
| Bảng dữ liệu | `<table>` + `<th scope="col">` | div xếp thành cột |
| Nút trong form không submit | `<button type="button">` | `<button>` (mặc định là submit!) |

Ảnh có `alt` (là nội dung, không phải "ảnh"). Input có `<label htmlFor>`. Heading
đúng thứ tự `h1 → h2 → h3`. `key` không dùng index nếu danh sách đổi thứ tự được.

## Frontend: mọi màn hình có dữ liệu cần 4 trạng thái

Dùng `<DataState>`: loading → error (có nút thử lại) → empty (có hành động gợi ý) →
dữ liệu. Component đó buộc bạn xử lý cả bốn.

Thứ tự kiểm tra: **loading trước empty**. Đảo lại thì lần tải đầu người dùng thấy
"chưa có dữ liệu" nhoáng lên trước khi bảng hiện.

## Comment

Chỉ viết comment giải thích **vì sao**, không giải thích **cái gì**:

```js
// Tệ — code đã nói rồi
// Lặp qua danh sách user
users.forEach(...)

// Tốt — giải thích quyết định
// Dựa vào unique index thay vì "tìm trước rồi tạo": hai request đồng thời
// đều thấy "chưa tồn tại" và cùng tạo được (race condition).
```

Trong base này nhiều comment dài hơn bình thường vì đây là tài liệu học. Khi bạn đã
điền code và hiểu rõ, có thể rút gọn những comment không còn cần.

## Log

Dùng `logger` từ `shared/lib/logger.js`, không dùng `console.log`.

**Không bao giờ log:** mật khẩu, token, chuỗi kết nối DB, nội dung email (có thể
chứa token trong link). `logger` đã cấu hình `redact` cho các field phổ biến.

## Git

Commit sau mỗi task/milestone hoàn thành. **Không tự push** — người dùng review rồi
push.

Không commit `.env` (`.gitignore` đã chặn). Nếu vô tình commit rồi thì phải **đổi
toàn bộ secret**, không chỉ xoá file — nó vẫn nằm trong history.
