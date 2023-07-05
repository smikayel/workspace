import { WithAuth } from '@src/middleware/AuthMiddleware';
import { WithPagination } from '@src/middleware/PaginationMiddleware';
import validator, { RequestPart } from '@src/middleware/validator';
import { Router } from 'express';
import workspaceSchema from './workspace.schema';
import { createWorkspace, getAllWorkspaces, _delete as deleteWorkspace, checkWorkspaceAvalability } from './workspace.api.handlers';

const router = Router();

router.get('/', WithAuth, WithPagination, getAllWorkspaces);
router.post('/', WithAuth, validator(workspaceSchema.create, RequestPart.BODY), createWorkspace);
router.delete('/:workspaceId', WithAuth, validator(workspaceSchema.delete, RequestPart.PARAMS), deleteWorkspace);
router.get('/:workspaceSlug', WithAuth, validator(workspaceSchema.checkAvalability, RequestPart.PARAMS), checkWorkspaceAvalability);

export default router;
