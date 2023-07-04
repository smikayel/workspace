import { DEFAULT_PAGE_SIZE } from '@src/constants/constants';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../AuthMiddleware';

export interface PaginationRequest extends AuthenticatedRequest {
	pageNumber?: number,
	skip?: number
}

export const getPageAndSkipValues = (
	req: AuthenticatedRequest,
	defaultPageSize: number
) => {
	const pageNumber = Number(req.query.pageNumber) || 1
	const skip = (pageNumber - 1) * defaultPageSize
	return { pageNumber, skip }
}

export const getTotalPages = (count: number, pageSize: number) => Math.ceil(count / pageSize)

export const WithPagination = (
	req: PaginationRequest,
	res: Response,
	next: NextFunction
) => {
	try {
        const { pageNumber, skip } = getPageAndSkipValues(req, DEFAULT_PAGE_SIZE)
		req.pageNumber = pageNumber
        req.skip = skip
        next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};
