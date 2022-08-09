import express from 'express';
import jwt from 'jsonwebtoken';
import Config from '../../env';
import HttpError, { HttpStatusCode } from '../../utils/httpError';

/**
 * Jwt validation
 *
 * @param req - request data
 * @param res - response data
 * @param next - next function
 */
export async function jwtValidator(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  const token = req.headers.authorization?.slice('Bearer '.length);

  let userId;

  if (token) {
    jwt.verify(token, Config.secretKey, (err, decodedToken) => {
      if (err) {
        return next(new HttpError(HttpStatusCode.BadRequest, `${err}`));
      } else if (!decodedToken) {
        return next(new HttpError(HttpStatusCode.BadRequest, `Unable to decode a token`));
      } else {
        userId = decodedToken.id;
      }
    });
  } else {
    return next(new HttpError(HttpStatusCode.BadRequest, 'Missing authorization token'));
  }

  /*
  const user = await UserService.findByUserId(String(userId));

  if (user) {
    userId = user.id;
  }
  */

  const jwtData = {
    userId,
  };

  req.body.jwtData = jwtData;

  return next();
}