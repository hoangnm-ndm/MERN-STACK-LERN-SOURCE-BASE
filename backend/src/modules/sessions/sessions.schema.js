import { z } from 'zod';
import { objectIdSchema } from '../../shared/utils/objectId.js';

export const sessionIdParams = z.object({
  id: objectIdSchema,
});
