import { Router } from 'express';
import * as schedulerController from './scheduler.controller.js';
import { validate } from '../../shared/middlewares/validate.js';
import { authenticate } from '../../shared/middlewares/authenticate.js';
import { authorizeSuperAdmin } from '../../shared/middlewares/authorize.js';
import { jobIdParams, createJobBody, updateJobBody, listJobRunsQuery } from './scheduler.schema.js';

/**
 * Route scheduler — CHỈ Super Admin.
 * Lý do siết chặt hơn cả khu admin thường: job có thể xoá file hàng loạt và gửi
 * email tới toàn bộ người dùng.
 */
export const schedulerRouter = Router();

schedulerRouter.use(authenticate, authorizeSuperAdmin);

schedulerRouter.get('/jobs', schedulerController.listJobs);

schedulerRouter.post('/jobs', validate({ body: createJobBody }), schedulerController.createJob);

schedulerRouter.get('/jobs/:id', validate({ params: jobIdParams }), schedulerController.getJob);

schedulerRouter.patch(
  '/jobs/:id',
  validate({ params: jobIdParams, body: updateJobBody }),
  schedulerController.updateJob,
);

schedulerRouter.delete(
  '/jobs/:id',
  validate({ params: jobIdParams }),
  schedulerController.deleteJob,
);

schedulerRouter.post(
  '/jobs/:id/run',
  validate({ params: jobIdParams }),
  schedulerController.runNow,
);

schedulerRouter.get(
  '/jobs/:id/runs',
  validate({ params: jobIdParams, query: listJobRunsQuery }),
  schedulerController.listRuns,
);
