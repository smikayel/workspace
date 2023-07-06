import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import { userRepository } from '@src/index';
import PwdUtil from '../../util/PwdUtil'
import { Request, Response } from 'express';
import { tick } from '@src/util/misc';
import jwt from 'jsonwebtoken';
import EnvVars from '@src/constants/EnvVars';
import logger from 'jet-logger';

// Errors
export const AUTHENTICATION_FAILED_ERR = 'Email or password wrong!';
export const SOMETHING_WENT_WRONG_ERR = 'Something went wrong!'

export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;

export const login = async (req: Request, res: Response) => {

  const email = req.body.email
  const password = req.body.password

  // Fetch user
  const user = await userRepository.findOne({where: { email }});
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.EmailNotFound(email),
    );
  }
  // Check password
  const hash = (user.password ?? ''),
  pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED, 
      Errors.Unauth,
    );
  }
  try {
    const AuthToken = jwt.sign({ email, role: user.role, id: user.id }, EnvVars.Jwt.Secret, { expiresIn: EnvVars.Jwt.Exp });
    res.status(HttpStatusCodes.OK).json({AuthToken, user});
  } catch (err) {
    logger.err(err)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: SOMETHING_WENT_WRONG_ERR });
  }
}


// **** Export default **** //
export default {
  login,
} as const;
