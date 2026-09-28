import { Router } from 'express';
import * as usersController from './users.controller.js';
import { validate } from '../../shared/middlewares/validate.js';
import { authenticate } from '../../shared/middlewares/authenticate.js';
import { authorizeAdmin } from '../../shared/middlewares/authorize.js';
import {
  userIdParams,
  listUsersQuery,
  updateProfileBody,
  changeRoleBody,
  blockUserBody,
} from './users.schema.js';

/**
 * Route users. Tầng này CHỈ khai báo path và gắn middleware.
 * Đọc từ trên xuống là thấy ngay ai được gọi endpoint nào.
 */
export const usersRouter = Router();

// --- Của chính mình ---
usersRouter.get('/me', authenticate, usersController.getMe);
usersRouter.patch('/me', authenticate, validate({ body: updateProfileBody }), usersController.updateMe);

// --- Khu quản trị ---
usersRouter.get(
  '/',
  authenticate,
  authorizeAdmin,
  validate({ query: listUsersQuery }),
  usersController.list,
);

usersRouter.get(
  '/:id',
  authenticate,
  authorizeAdmin,
  validate({ params: userIdParams }),
  usersController.getById,
);

usersRouter.patch(
  '/:id/role',
  authenticate,
  authorizeAdmin,
  validate({ params: userIdParams, body: changeRoleBody }),
  usersController.changeRole,
);

usersRouter.post(
  '/:id/block',
  authenticate,
  authorizeAdmin,
  validate({ params: userIdParams, body: blockUserBody }),
  usersController.block,
);

usersRouter.post(
  '/:id/unblock',
  authenticate,
  authorizeAdmin,
  validate({ params: userIdParams }),
  usersController.unblock,
);
