import { Router } from 'express';
import * as settingsController from './settings.controller.js';
import { validate } from '../../shared/middlewares/validate.js';
import { authenticate } from '../../shared/middlewares/authenticate.js';
import { authorizeSuperAdmin } from '../../shared/middlewares/authorize.js';
import { updateSettingsBody } from './settings.schema.js';

/**
 * Route settings. Chú ý sự khác biệt: `/public` là công khai (trang đăng nhập cần
 * biết bật/tắt phương thức nào), còn lại CHỈ Super Admin.
 */
export const settingsRouter = Router();

settingsRouter.get('/public', settingsController.getPublic);

settingsRouter.get('/', authenticate, authorizeSuperAdmin, settingsController.get);

settingsRouter.patch(
  '/',
  authenticate,
  authorizeSuperAdmin,
  validate({ body: updateSettingsBody }),
  settingsController.update,
);
