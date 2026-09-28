import { Router } from 'express';
import * as authController from './auth.controller.js';
import { validate } from '../../shared/middlewares/validate.js';
import { authenticate } from '../../shared/middlewares/authenticate.js';
import { authLimiter, emailLimiter } from '../../shared/middlewares/rateLimit.js';
import {
  registerBody,
  loginBody,
  verifyEmailBody,
  resendVerificationBody,
  magicLinkRequestBody,
  magicLinkConsumeBody,
  forgotPasswordBody,
  resetPasswordBody,
  changePasswordBody,
  googleCallbackQuery,
} from './auth.schema.js';

/**
 * Route auth.
 *
 * Quy tắc rate limit ở nhóm này:
 * - `authLimiter`  cho các route đoán được bằng brute-force (login, register, reset).
 * - `emailLimiter` cho các route gây GỬI EMAIL — không giới hạn thì thành công cụ
 *   spam hộp thư người khác và làm cạn hạn mức Resend.
 */
export const authRouter = Router();

// --- Mật khẩu (Phase 2) ---
authRouter.post('/register', authLimiter, validate({ body: registerBody }), authController.register);
authRouter.post('/login', authLimiter, validate({ body: loginBody }), authController.login);
authRouter.post('/refresh', authController.refresh); // token nằm trong cookie, không cần validate body
authRouter.post('/logout', authenticate, authController.logout);

// --- Xác minh email (Phase 2) ---
authRouter.post('/verify-email', validate({ body: verifyEmailBody }), authController.verifyEmail);
authRouter.post(
  '/resend-verification',
  emailLimiter,
  validate({ body: resendVerificationBody }),
  authController.resendVerification,
);

// --- Quên / đặt lại / đổi mật khẩu ---
authRouter.post(
  '/forgot-password',
  emailLimiter,
  validate({ body: forgotPasswordBody }),
  authController.forgotPassword,
);
authRouter.post(
  '/reset-password',
  authLimiter,
  validate({ body: resetPasswordBody }),
  authController.resetPassword,
);
authRouter.post(
  '/change-password',
  authenticate,
  validate({ body: changePasswordBody }),
  authController.changePassword,
);

// --- Magic link (Phase 4) ---
authRouter.post(
  '/magic-link',
  emailLimiter,
  validate({ body: magicLinkRequestBody }),
  authController.requestMagicLink,
);
authRouter.post(
  '/magic-link/consume',
  authLimiter,
  validate({ body: magicLinkConsumeBody }),
  authController.consumeMagicLink,
);

// --- Google OAuth (Phase 4) ---
authRouter.get('/google', authController.googleRedirect);
authRouter.get(
  '/google/callback',
  validate({ query: googleCallbackQuery }),
  authController.googleCallback,
);
