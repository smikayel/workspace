import validator, { RequestPart } from '@src/middleware/validator';
import { Router } from 'express';
import { login } from './auth.api.handlers';
import authSchema from './auth.schema';

const router = Router();

router.post('/login', validator(authSchema.login, RequestPart.BODY), login);

export default router;
