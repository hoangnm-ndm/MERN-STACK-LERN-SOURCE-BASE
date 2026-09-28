import { z } from 'zod';

/**
 * Zod schema cho form phía frontend.
 *
 * PHẢI KHỚP với backend/src/modules/auth/auth.schema.js. Lệch nhau là lỗi thật
 * (skill xếp vào `[NGUYÊN TẮC]` VAL Medium): form báo hợp lệ rồi server từ chối,
 * người dùng không hiểu mình sai ở đâu.
 *
 * Validate ở đây CHỈ để trải nghiệm tốt hơn (báo lỗi ngay khi gõ), KHÔNG thay
 * thế validate ở backend — người ta bỏ qua frontend gọi API trực tiếp được.
 */

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Email là bắt buộc')
  .email('Email không hợp lệ');

/** Giống hệt ràng buộc bên backend. */
const passwordField = z
  .string()
  .min(8, 'Mật khẩu tối thiểu 8 ký tự')
  .max(72, 'Mật khẩu tối đa 72 ký tự')
  .regex(/[a-z]/, 'Mật khẩu phải có chữ thường')
  .regex(/[A-Z]/, 'Mật khẩu phải có chữ in hoa')
  .regex(/\d/, 'Mật khẩu phải có số');

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Mật khẩu là bắt buộc'),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Tên tối thiểu 2 ký tự').max(120),
    email: emailField,
    password: passwordField,
    /** Chỉ có ở frontend — backend không cần trường này. */
    confirmPassword: z.string().min(1, 'Nhập lại mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp',
    /** `path` quyết định lỗi hiện dưới field nào — thiếu nó lỗi sẽ nằm ở cấp form. */
    path: ['confirmPassword'],
  });

export const magicLinkSchema = z.object({
  email: emailField,
});

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string().min(1, 'Nhập lại mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp',
    path: ['confirmPassword'],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Nhập mật khẩu hiện tại'),
    newPassword: passwordField,
    confirmPassword: z.string().min(1, 'Nhập lại mật khẩu mới'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu hiện tại',
    path: ['newPassword'],
  });

/**
 * Kiểu dữ liệu form suy ra TỪ schema, không khai báo tay.
 * Khai báo tay là có hai nguồn sự thật, sửa schema mà quên sửa kiểu → lệch.
 *
 * @typedef {z.infer<typeof loginSchema>} LoginFormValues
 * @typedef {z.infer<typeof registerSchema>} RegisterFormValues
 * @typedef {z.infer<typeof resetPasswordSchema>} ResetPasswordFormValues
 * @typedef {z.infer<typeof changePasswordSchema>} ChangePasswordFormValues
 */
