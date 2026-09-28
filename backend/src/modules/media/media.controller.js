import * as mediaService from './media.service.js';
import * as foldersService from './mediaFolder.service.js';
import { findMediaUsages } from './media.usage.js';
import { sendSuccess, sendCreated, sendPaginated, sendNoContent } from '../../shared/utils/response.js';

/** Controller media. */

// --- Upload ---

/** `POST /media/upload-url` */
export async function createUploadUrl(req, res) {
  // TODO: mediaService.createUploadUrl({ input: req.body, userId: req.user.id })
  // → sendCreated(res, { media, uploadUrl, expiresIn })
}

/** `POST /media/:id/confirm` */
export async function confirmUpload(req, res) {
  // TODO: mediaService.confirmUpload({ mediaId: req.params.id, userId: req.user.id, input: req.body })
}

// --- Thư viện ---

/** `GET /media` */
export async function list(req, res) {
  // TODO: mediaService.listMedia(req.query) → sendPaginated.
}

/** `GET /media/:id` */
export async function getById(req, res) {
  // TODO: mediaService.getById(req.params.id) → sendSuccess.
}

/** `GET /media/:id/usages` — admin xem ảnh đang dùng ở đâu trước khi xoá. */
export async function getUsages(req, res) {
  // TODO: findMediaUsages(req.params.id) → sendSuccess.
}

/** `PATCH /media/:id` */
export async function update(req, res) {
  // TODO: mediaService.updateMedia({ mediaId: req.params.id, input: req.body }).
}

/** `DELETE /media/:id?force=true` */
export async function remove(req, res) {
  // TODO: mediaService.deleteMedia({ mediaId: req.params.id, force: req.query.force })
  // → sendNoContent(res)
}

// --- Thư mục ---

/** `GET /media/folders` */
export async function listFolders(req, res) {
  // TODO: foldersService.listFolderTree() → sendSuccess.
}

/** `POST /media/folders` */
export async function createFolder(req, res) {
  // TODO: foldersService.createFolder({ ...req.body, userId: req.user.id }) → sendCreated.
}

/** `PATCH /media/folders/:id` */
export async function renameFolder(req, res) {
  // TODO: foldersService.renameFolder({ folderId: req.params.id, name: req.body.name }).
}

/** `DELETE /media/folders/:id` */
export async function removeFolder(req, res) {
  // TODO: foldersService.deleteFolder(req.params.id) → sendNoContent.
}
