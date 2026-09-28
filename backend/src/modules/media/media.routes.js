import { Router } from 'express';
import * as mediaController from './media.controller.js';
import { validate } from '../../shared/middlewares/validate.js';
import { authenticate } from '../../shared/middlewares/authenticate.js';
import { authorizeAdmin } from '../../shared/middlewares/authorize.js';
import {
  mediaIdParams,
  folderIdParams,
  createUploadUrlBody,
  confirmUploadBody,
  listMediaQuery,
  updateMediaBody,
  deleteMediaQuery,
  createFolderBody,
  renameFolderBody,
} from './media.schema.js';

/**
 * Route media.
 *
 * LƯU Ý THỨ TỰ: nhóm `/folders` phải khai báo TRƯỚC `/:id`, nếu không Express sẽ
 * khớp `/media/folders` vào `/media/:id` và coi 'folders' là một ObjectId.
 *
 * Phân quyền: người dùng thường được upload avatar của mình; quản lý thư viện
 * (thư mục, xoá, xem ảnh mồ côi) chỉ dành cho admin.
 */
export const mediaRouter = Router();

// --- Thư mục (phải đặt trước /:id) ---
mediaRouter.get('/folders', authenticate, authorizeAdmin, mediaController.listFolders);

mediaRouter.post(
  '/folders',
  authenticate,
  authorizeAdmin,
  validate({ body: createFolderBody }),
  mediaController.createFolder,
);

mediaRouter.patch(
  '/folders/:id',
  authenticate,
  authorizeAdmin,
  validate({ params: folderIdParams, body: renameFolderBody }),
  mediaController.renameFolder,
);

mediaRouter.delete(
  '/folders/:id',
  authenticate,
  authorizeAdmin,
  validate({ params: folderIdParams }),
  mediaController.removeFolder,
);

// --- Upload (người dùng đã đăng nhập) ---
mediaRouter.post(
  '/upload-url',
  authenticate,
  validate({ body: createUploadUrlBody }),
  mediaController.createUploadUrl,
);

mediaRouter.post(
  '/:id/confirm',
  authenticate,
  validate({ params: mediaIdParams, body: confirmUploadBody }),
  mediaController.confirmUpload,
);

// --- Thư viện (admin) ---
mediaRouter.get(
  '/',
  authenticate,
  authorizeAdmin,
  validate({ query: listMediaQuery }),
  mediaController.list,
);

mediaRouter.get(
  '/:id',
  authenticate,
  validate({ params: mediaIdParams }),
  mediaController.getById,
);

mediaRouter.get(
  '/:id/usages',
  authenticate,
  authorizeAdmin,
  validate({ params: mediaIdParams }),
  mediaController.getUsages,
);

mediaRouter.patch(
  '/:id',
  authenticate,
  authorizeAdmin,
  validate({ params: mediaIdParams, body: updateMediaBody }),
  mediaController.update,
);

mediaRouter.delete(
  '/:id',
  authenticate,
  authorizeAdmin,
  validate({ params: mediaIdParams, query: deleteMediaQuery }),
  mediaController.remove,
);
