import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchemas';
import { useLogin } from '../hooks/useAuthMutations';
import { Input } from '@/shared/components/ui/Input';
import { PasswordInput } from '@/shared/components/ui/PasswordInput';
import { Button } from '@/shared/components/ui/Button';

/**
 * Form đăng nhập bằng email + mật khẩu.
 *
 * Mẫu form CHUẨN của dự án — các form khác làm theo đúng cấu trúc này.
 */
export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useLogin();

  /**
   * @param {import('../schemas/authSchemas').LoginFormValues} values
   */
  const onSubmit = (values) => {
    // TODO:
    // loginMutation.mutate(values, {
    //   onError: (error) => {
    //     1. error.details có (VALIDATION_ERROR từ backend) → map từng field:
    //        error.details.forEach(d => setError(d.field, { message: d.message }))
    //        Nhờ vậy lỗi server hiện ĐÚNG dưới field, không phải một dòng đỏ chung.
    //     2. Lỗi không thuộc field nào (sai mật khẩu, tài khoản bị chặn) →
    //        setError('root', { message: error.message }) rồi hiện ở đầu form.
    //     3. Riêng AUTH_EMAIL_NOT_VERIFIED → nên hiện thêm nút "Gửi lại email
    //        xác minh" thay vì chỉ báo lỗi.
    //   },
    // });
  };

  // TODO: dựng JSX:
  // <form onSubmit={handleSubmit(onSubmit)} noValidate>
  //   {errors.root && <p role="alert">{errors.root.message}</p>}
  //   <Input label="Email" type="email" autoComplete="email"
  //     error={errors.email?.message} {...register('email')} />
  //   <PasswordInput label="Mật khẩu" autoComplete="current-password"
  //     error={errors.password?.message} {...register('password')} />
  //   <Button type="submit" isLoading={loginMutation.isPending}>Đăng nhập</Button>
  // </form>
  //
  // - `noValidate` để tắt thông báo mặc định của trình duyệt (tiếng Anh, không
  //   khớp thông điệp của mình).
  // - `autoComplete` đúng chuẩn giúp trình quản lý mật khẩu điền được.
  // - Nút submit phải khoá khi isPending — tránh gửi hai lần.
  // - Thông báo lỗi cần `role="alert"` để screen reader đọc ngay khi xuất hiện.
  return null;
}
