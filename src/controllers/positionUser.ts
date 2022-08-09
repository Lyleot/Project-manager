import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import PositionUserService from '../services/positionUser';
import prisma from '../prismaClient';
import UserService from '../services/user';
import PositionUserInputUpdate from '../types/positionUser/positionUserInputUpdate';

/**
 * PositionUser controller
 */
export default class PositionUserController {
  /**
   * Create positionUser
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const positionUserCreat: any = req.body.positionUser;

      const userCheck = await UserService.findById(req.body.positionUser.idUser);

      if (!userCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${req.body.positionUser.idUser} not exists`,
        });
      }

      const positionUser = await PositionUserService.create(positionUserCreat);

      if (!positionUser) {
        return res.status(HttpStatusCode.NotFound).send({
          success: false,
          message: 'PositionUser not found',
        });
      }

      return res.json({
        positionUserId: positionUser.id,
        success: true,
        message: 'PositionUser was created',
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
   * Get all positionUsers
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const positionUsers = await prisma.positionUser.findMany();

      return res.json(positionUsers);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get positionUser by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const positionUser = await PositionUserService.findById(req.params.id);

      console.log(positionUser, !positionUser);
      if (!positionUser) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `PositionUser with id ${req.params.id} was not found`,
        });
      }

      return res.json(positionUser);
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
   * Get positionUser by idUser
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdUser(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const positionUser = await PositionUserService.findByIdUser(req.params.idUser);

      console.log(positionUser, !positionUser);
      if (!positionUser) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `PositionUser with idUser ${req.params.idUser} was not found`,
        });
      }

      return res.json(positionUser);
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
   * Update positionUser
   *
   * @param req - request data
   * @param res - response data
   */
  public static async update(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const positionUserCheck = await PositionUserService.findById(req.params.id);

      console.log(positionUserCheck, !positionUserCheck);
      if (!positionUserCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `PositionUser with id ${req.params.id} was not found`,
        });
      }

      const positionUserUpdate: PositionUserInputUpdate = req.body.positionUser;

      const now = new Date();

      positionUserUpdate.updatedAt = now;

      const positionUser = await PositionUserService.update(req.params.id, positionUserUpdate);

      if (!positionUser) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `PositionUser with id ${req.params.id} was not found`,
        });
      }

      return res.json({
        success: true,
        message: 'PositionUser was updated',
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
   * Delete positionUser by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const positionUser = await PositionUserService.findById(req.params.id);

      console.log(positionUser, !positionUser);
      if (!positionUser) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `PositionUser with id ${req.params.id} was not found`,
        });
      }

      PositionUserService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'PositionUser was deleted successfully',
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