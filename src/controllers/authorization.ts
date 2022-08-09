import express from 'express';
import jwt from 'jsonwebtoken';
import Config from '../env';
import UserService from '../services/user';
import argon2 from 'argon2';
import { HttpStatusCode } from '../utils/httpError';
import UserLogin from '../types/userLogin';

/**
 *  Authorization controller
 */
export default class AuthorizationController {
  /**
   * Login
   *
   * @param req - request
   * @param res - response
   */
  public static async login(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const user: UserLogin = req.body;

      const potentialUserWithSameEmail = await UserService.findByEmail(user.login);
      const potentialUserWithSamePhone = await UserService.findByPhone(user.login);

      const potentialUser = potentialUserWithSamePhone || potentialUserWithSameEmail;

      if (!potentialUser) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Wrong login or password`,
        });
      }

      const isTruePassword = await argon2.verify(potentialUser.password, user.password);

      if (!isTruePassword) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Wrong login or password`,
        });
      }

      const token = jwt.sign({
        id: potentialUser.id,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      }, Config.secretKey, { expiresIn: 600000000000000 * 15000000000000000000000 });

      res.json({
        token: `Bearer ${token}`,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatusCode.ServerError).json({
          error: error.message,
        });
      } else {
        return res.status(HttpStatusCode.BadRequest).json({
          error: 'unknown error',
        });
      }
    }
  }
}

/**
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2NjU3MWU3LTJiMWEtNDg0MC04ZTcwLTU5ZGQ0YTI0MTg4MSIsImlhdCI6MTYzMTEyNDEzOSwiZXhwIjo5ZSszNn0.eJRTgRL5Se9CQ5akCKLEQdEPHE_rc68y4QUahVTXDfw
 */