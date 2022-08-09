import express from 'express';
import HttpError from '../utils/httpError';

/**
 * Sending error
 *
 * @param error - error data
 * @param req - request data
 * @param res - response data
 * @param next - next function
 */
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-vars-experimental
export default (error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void  => {
  res.status(error.status);

  res.json({
    error: error.message,
  });
};
