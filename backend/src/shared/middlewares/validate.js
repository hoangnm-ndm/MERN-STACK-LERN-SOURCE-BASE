/**
 * Middleware validate bằng Zod, gắn ở tầng route.
 *
 * Sau khi qua middleware này, controller chỉ nhận dữ liệu ĐÃ parse: đúng kiểu,
 * đã loại field thừa. Đây cũng là lớp chặn chính cho NoSQL operator injection —
 * `z.string()` biến `{ $ne: null }` thành lỗi validate thay vì để nó chạy vào filter.
 *
 * Cách dùng:
 *   router.post('/', validate({ body: createUserBody }), usersController.create);
 *   router.get('/:id', validate({ params: userIdParams }), usersController.getById);
 */

/**
 * @param {object} schemas
 * @param {import('zod').ZodTypeAny} [schemas.body]
 * @param {import('zod').ZodTypeAny} [schemas.params]
 * @param {import('zod').ZodTypeAny} [schemas.query]
 * @returns {import('express').RequestHandler}
 */
export function validate(schemas) {
  return (req, res, next) => {
    // TODO:
    // - Với từng phần có schema: parse rồi GHI ĐÈ req.body/req.params/req.query
    //   bằng dữ liệu đã parse. Không ghi đè thì controller vẫn đọc dữ liệu thô
    //   và mọi lợi ích của validate mất sạch.
    // - Lỗi: gọi `next(error)` để errorHandler map ZodError → VALIDATION_ERROR.
    //   KHÔNG tự trả res.status(400) ở đây (sẽ có 2 định dạng lỗi trong dự án).
    // - Lưu ý Express 5: req.query là getter chỉ đọc → gán lại bằng
    //   Object.defineProperty(req, 'query', { value: parsed }) hoặc lưu vào
    //   req.validatedQuery theo quy ước thống nhất toàn dự án.
    next(new Error('validate() chưa được triển khai'));
  };
}
