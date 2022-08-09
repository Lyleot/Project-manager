import express from 'express';
import prisma from '../prismaClient';
import UserService from '../services/user';
import { User } from '@prisma/client';
import { HttpStatusCode } from '../utils/httpError';
import UserInputUpdate from '../types/user/userInputUpdate';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * User controller
 */
export default class UserController {
  /**
   * Create user
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      /*
      const authority: boolean = await AccessByRole('UserCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }*/

      const email: string | undefined = req.body.user.email;
      const phone: string | undefined = req.body.user.phone;

      if (email) {
        const userByEmail = await UserService.findByEmail(req.body.user.email);

        if (userByEmail) {
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `User with email ${req.body.user.email} exists`,
          });
        }
      }

      if (phone) {
        const userByPhone = await UserService.findByPhone(req.body.user.phone);

        if (userByPhone) {
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `User with phone ${req.body.user.phone} exists`,
          });
        }
      }

      const user = await UserService.create(req.body.user);

      if (!user) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User was not created`,
        });
      }

      return res.json({
        userId: user.id,
        success: true,
        message: 'User was created',
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

  /**
   * Get all users
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('UserGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const users = await prisma.user.findMany();

      return res.json(users);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get user by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('UserGetById', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const user: User | null = await UserService.findById(req.params.id);

      console.log(user, !user);
      if (!user) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${req.params.id} was not found`,
        });
      }

      return res.json(user);
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

  /**
   * Update user
   *
   * @param req - request data
   * @param res - response data
   */
  public static async update(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('UserUpdate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const userCheck: User | null = await UserService.findById(req.params.id);

      console.log(userCheck, !userCheck);
      if (!userCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${req.params.id} was not found`,
        });
      }

      if (req.body.user.idSupervisor) {
        const supervisorCheck: User | null = await UserService.findById(req.body.user.idSupervisor);

        if (!supervisorCheck) {
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `User with id ${req.params.id} was not found`,
          });
        }
      }

      const userUpdate: UserInputUpdate = req.body.user;

      const now = new Date();

      userUpdate.updatedAt = now;

      const user = await UserService.update(req.params.id, userUpdate);

      if (!user) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${req.params.id} was not found`,
        });
      }

      return res.json({
        success: true,
        message: 'User was updated',
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

  /**
   * Delete user by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('UserDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const user: User | null = await UserService.findById(req.params.id);

      console.log(user, !user);
      if (!user) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${req.params.id} was not found`,
        });
      }

      UserService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'User was deleted successfully',
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