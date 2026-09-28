import { z } from 'zod';

/**
 * Zod schema cho request của module auth.
 *
 * QUY TẮC KHỚP VỚI FRONTEND: thông điệp và ràng buộc ở đây phải trùng với
 * `frontend/src/features/auth/schemas/`. Nếu FE cho 6 ký tự mà BE đòi 8, người
 * dùng sẽ bị từ chối sau khi form đã báo hợp lệ.
 */

/** Dùng lại ở nhiều schema. `z.string()` cũng là lớp chặn NoSQL injection. */
const emailField = z
  .string({ required_error: 'Email là bắt buộc' })
  .trim()
  .toLowerCase()
  .email('Email không hợp lệ');

const passwordField = z
  .string({ required_error: 'Mật khẩu là bắt buộc' })
  .min(8, 'Mật khẩu tối thiểu 8 ký tự')
  .max(72, 'Mật khẩu tối đa 72 ký tự') // giới hạn của bcrypt: byte thứ 73 trở đi bị bỏ qua
  .regex(/[a-z]/, 'Mật khẩu phải có chữ thường')
  .regex(/[A-Z]/, 'Mật khẩu phải có chữ in hoa')
  .regex(/\d/, 'Mật khẩu phải có số');

export const registerBody = z.object({
  name: z.string().trim().min(2, 'Tên tối thiểu 2 ký tự').max(120),
  email: emailField,
  password: passwordField,
});

export const loginBody = z.object({
  email: emailField,
  /** Đăng nhập KHÔNG áp ràng buộc độ mạnh: mật khẩu cũ có thể không đạt chuẩn mới. */
  password: z.string().min(1, 'Mật khẩu là bắt buộc'),
});

export const verifyEmailBody = z.object({
  token: z.string().min(1, 'Token là bắt buộc'),
});

export const resendVerificationBody = z.object({
  email: emailField,
});

export const magicLinkRequestBody = z.object({
  email: emailField,
});

export const magicLinkConsumeBody = z.object({
  token: z.string().min(1, 'Token là bắt buộc'),
});

export const forgotPasswordBody = z.object({
  email: emailField,
});

export const resetPasswordBody = z.object({
  token: z.string().min(1, 'Token là bắt buộc'),
  password: passwordField,
});

export const changePasswordBody = z
  .object({
    currentPassword: z.string().min(1, 'Nhập mật khẩu hiện tại'),
    newPassword: passwordField,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu hiện tại',
    path: ['newPassword'],
  });

/** Query của callback Google OAuth. */
export const googleCallbackQuery = z.object({
  code: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  error: z.string().optional(), // Google trả về khi người dùng bấm "Huỷ"
});

/** @typedef {z.infer<typeof registerBody>} RegisterInput */
/** @typedef {z.infer<typeof loginBody>} LoginInput */
