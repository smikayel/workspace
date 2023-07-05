import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { Roles } from '@src/repos/entities/User';
import { SOMETHING_WENT_WRONG_ERR } from '@src/routes/AuthRouts/auth.api.handlers';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../AuthMiddleware';

const FORBIDDEN_ERR = 'Access denied!';

export const isAdmin = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.user;
		console.log(user)
		if (!user || user?.role !== Roles.Admin) {
			return res
				.status(HttpStatusCodes.FORBIDDEN)
				.json({ message: FORBIDDEN_ERR });
		}
		next();
	} catch (err) {
		return res
			.status(HttpStatusCodes.FORBIDDEN)
			.json({ message: SOMETHING_WENT_WRONG_ERR });
	}
};
