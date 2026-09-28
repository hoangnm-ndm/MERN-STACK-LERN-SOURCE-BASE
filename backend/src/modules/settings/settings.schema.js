import { z } from 'zod';

/**
 * Chỉ liệt kê các field ĐƯỢC PHÉP sửa. `key`, `updatedBy`, `createdAt` không có
 * ở đây nên request gửi kèm chúng cũng bị Zod loại bỏ (chống mass assignment).
 */
export const updateSettingsBody = z
  .object({
    allowRegistration: z.boolean().optional(),
    allowPasswordLogin: z.boolean().optional(),
    allowMagicLink: z.boolean().optional(),
    allowGoogleLogin: z.boolean().optional(),
    requireEmailVerification: z.boolean().optional(),
    maintenanceMode: z.boolean().optional(),
    maintenanceMessage: z.string().trim().max(500).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Cần ít nhất một trường để cập nhật',
  });

/** @typedef {z.infer<typeof updateSettingsBody>} UpdateSettingsInput */
