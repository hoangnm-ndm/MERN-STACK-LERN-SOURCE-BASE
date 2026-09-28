# MERN Stack Base

Source base cho dự án MERN Stack điển hình: xác thực nhiều phương thức, quản lý
phiên, quản lý người dùng, thư viện media trên Cloudflare R2, email giao dịch và
lịch chạy job tự động.

> **Trạng thái:** đây là **bộ khung** (scaffold). Cấu trúc thư mục, file, chữ ký
> hàm và component đã được khai báo sẵn; phần thân hàm để trống kèm gợi ý `TODO`
> để người học tự hoàn thiện. Xem thứ tự nên làm ở
> [docs/07-huong-dan-hoan-thien.md](docs/07-huong-dan-hoan-thien.md).

## Stack

| Hạng mục | Lựa chọn |
|---|---|
| Ngôn ngữ | JavaScript (ESM) + JSDoc |
| Backend | Express 5 |
| Database | MongoDB + Mongoose |
| Migration | migrate-mongo |
| Frontend | React + Vite (SPA) |
| Router | react-router (`createBrowserRouter`) |
| Server state | TanStack Query |
| Client state | Zustand |
| Form | react-hook-form + Zod |
| Validation | Zod (cả hai phía) |
| Email | Resend + React Email |
| Storage | Cloudflare R2 (presigned URL, S3-compatible) |
| Scheduler | node-cron (in-process) |
| Test | Vitest + Supertest (backend) · Vitest + RTL + MSW (frontend) |
| Monorepo | npm workspaces |

## Yêu cầu môi trường

- Node.js `>= 20.11` (xem `.nvmrc`) — cần `import.meta.dirname`.
- Docker (để chạy MongoDB replica set ở local).

## Cài đặt và chạy

```bash
nvm use                                    # Node theo .nvmrc
npm install                                # cài cho cả backend và frontend

docker compose up -d                       # MongoDB replica set 1 node
cp backend/.env.example backend/.env       # rồi điền giá trị thật
cp frontend/.env.example frontend/.env

npm run db:migrate                         # tạo index và dữ liệu khởi tạo
npm run db:seed                            # tạo Super Admin đầu tiên

npm run dev                                # chạy song song api + web
```

- API: `http://localhost:5000/api/v1`
- Web: `http://localhost:5173`
- Health check: `GET http://localhost:5000/api/v1/health`

## Các script ở gốc

| Script | Tác dụng |
|---|---|
| `npm run dev` | Chạy đồng thời backend và frontend |
| `npm run build` | Build frontend |
| `npm run lint` | ESLint cho cả hai workspace |
| `npm test` | Test cho cả hai workspace |
| `npm run format` | Prettier toàn repo |
| `npm run db:migrate` | Chạy migration (migrate-mongo) |
| `npm run db:seed` | Seed dữ liệu khởi tạo |
| `npm run email:dev` | Mở trình xem trước template email (React Email) |

## Cấu trúc repo

```text
.
├── backend/          # Express + Mongoose (xem backend/README hoặc docs/01)
├── frontend/         # React + Vite
├── docs/             # tài liệu đánh số theo thứ tự đọc
├── CHECKLIST.md      # file sống: trạng thái, công việc, quyết định
└── CLAUDE.md         # quy ước làm việc cho Claude Code
```

## Tài liệu

| File | Nội dung |
|---|---|
| [01-kien-truc-tong-the.md](docs/01-kien-truc-tong-the.md) | Sơ đồ module, luồng dữ liệu, ranh giới tầng |
| [02-mo-hinh-du-lieu.md](docs/02-mo-hinh-du-lieu.md) | Collection, quan hệ, index, migration |
| [03-luong-xac-thuc.md](docs/03-luong-xac-thuc.md) | Password, verify email, refresh rotation, magic link, Google OAuth |
| [04-phan-quyen.md](docs/04-phan-quyen.md) | Role, bảo vệ Super Admin, chặn IDOR |
| [05-media-va-storage.md](docs/05-media-va-storage.md) | Presigned URL, thư viện media, ảnh mồ côi |
| [06-email-va-scheduler.md](docs/06-email-va-scheduler.md) | Template email, job định kỳ, gửi email theo lịch |
| [07-huong-dan-hoan-thien.md](docs/07-huong-dan-hoan-thien.md) | Thứ tự điền code cho người học |
| [08-quy-uoc-code.md](docs/08-quy-uoc-code.md) | Quy ước đặt tên, response chuẩn, mã lỗi |
| [09-van-hanh-va-deploy.md](docs/09-van-hanh-va-deploy.md) | Biến môi trường production, deploy, backup |
