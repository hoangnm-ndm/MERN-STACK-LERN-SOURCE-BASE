import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes.js';
import { sessionsRouter } from '../modules/sessions/sessions.routes.js';
import { usersRouter } from '../modules/users/users.routes.js';
import { mediaRouter } from '../modules/media/media.routes.js';
import { settingsRouter } from '../modules/settings/settings.routes.js';
import { schedulerRouter } from '../modules/scheduler/scheduler.routes.js';
import { healthRouter } from '../modules/health/health.routes.js';

/**
 * Hợp nhất router của các module, mount tại `env.API_PREFIX` (/api/v1) trong app.js.
 *
 * File này CHỈ ghép router — không middleware nghiệp vụ, không xử lý request.
 * Thêm module mới = thêm một dòng ở đây.
 */
export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/sessions', sessionsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/media', mediaRouter);
apiRouter.use('/settings', settingsRouter);
apiRouter.use('/scheduler', schedulerRouter);
