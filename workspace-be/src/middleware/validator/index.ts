import HttpStatusCodes from "@src/constants/HttpStatusCodes"
import logger from "jet-logger"
import * as joi from 'joi'
import { NextFunction, Request, Response } from 'express';

export enum RequestPart {
	BODY = 'body',
	QUERY = 'query',
	PARAMS = 'params',
}

const validator =
	(schema: joi.Schema, key: RequestPart) => (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req[key])
		if (!error) {
			next()
		} else {
			const { details } = error
			const message = details.map((i) => i.message).join(',')
			logger.warn(message)
			return res.status(HttpStatusCodes.BAD_REQUEST).json({message});

		}
	}

export default validator
