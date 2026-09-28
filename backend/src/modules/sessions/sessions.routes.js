import { Router } from 'express';
import * as sessionsController from './sessions.controller.js';
import { authenticate } from '../../shared/middlewares/authenticate.js';
import { validate } from '../../shared/middlewares/validate.js';
import { sessionIdParams } from './sessions.schema.js';

/**
 * Route sessions — toàn bộ đều yêu cầu đăng nhập và chỉ tác động lên phiên của
 * CHÍNH người gọi (kiểm tra sở hữu nằm trong service).
 */
export const sessionsRouter = Router();

sessionsRouter.get('/', authenticate, sessionsController.list);

sessionsRouter.post('/revoke-others', authenticate, sessionsController.revokeOthers);

sessionsRouter.delete(
  '/:id',
  authenticate,
  validate({ params: sessionIdParams }),
  sessionsController.revoke,
);
