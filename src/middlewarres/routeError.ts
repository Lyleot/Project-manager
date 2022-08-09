import express from 'express';
import HttpError, { HttpStatusCode } from '../utils/httpError';

/**
 * Route error
 *
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export default (req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void  => {
  const error: HttpError = new HttpError(HttpStatusCode.NotFound, 'Not Found');

  next(error);
};
