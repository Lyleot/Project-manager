import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import PushTimeService from '../services/pushTime';
import TaskService from '../services/task';
import prisma from '../prismaClient';
import TimeTaskService from '../services/timeTask';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * PushTime controller
 */
export default class PushTimeController {
  /**
   * Create pushTime
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('ProjectCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${userId} do not have authority`,
        });
      }

      const idtimeTask = await TimeTaskService.findByIdTask(req.body.pushTime.idTask);

      if (!idtimeTask) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `TimeTask with id ${req.body.pushTime.idTask} was not found`,
        });
      }

      const time: number = req.body.pushTime.time + idtimeTask.currentState;

      const timeTask = await TimeTaskService.pushTime(idtimeTask.id, time);

      if (!timeTask) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `TimeTask with id ${idtimeTask.id} was not found`,
        });
      }

      const pushTimeCreat: any = req.body.pushTime;

      const taskCheck = await TaskService.findById(req.body.pushTime.idTask);

      if (!taskCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with id ${req.body.pushTime.idTask} not exists`,
        });
      }

      pushTimeCreat.idUser = String(userId);

      const pushTime = await PushTimeService.create(pushTimeCreat);

      if (!pushTime) {
        return res.status(HttpStatusCode.NotFound).send({
          success: false,
          message: 'PushTime not found',
        });
      }

      return res.json({
        pushTimeId: pushTime.id,
        success: true,
        message: 'PushTime was created',
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
   * Get all pushTimes
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ProjectGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const pushTimes = await prisma.pushTime.findMany();

      return res.json(pushTimes);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get pushTime by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ProjectGetById', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const pushTime = await PushTimeService.findById(req.params.id);

      console.log(pushTime, !pushTime);
      if (!pushTime) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `PushTime with id ${req.params.id} was not found`,
        });
      }

      return res.json(pushTime);
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
   * Get pushTime by idTask
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdTask(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ProjectGetByIdTask', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const pushTime = await PushTimeService.findByIdTask(req.params.idTask);

      console.log(pushTime, !pushTime);
      if (!pushTime) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `PushTime with idTask ${req.params.idTask} was not found`,
        });
      }

      return res.json(pushTime);
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
   * Get pushTime by idUser
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdUser(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ProjectGetByIdUser', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const pushTime = await PushTimeService.findByIdUser(req.params.idUser);

      console.log(pushTime, !pushTime);
      if (!pushTime) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `PushTime with idUser ${req.params.idUser} was not found`,
        });
      }

      return res.json(pushTime);
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
   * Delete pushTime by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('ProjectDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const pushTime = await PushTimeService.findById(req.params.id);

      console.log(pushTime, !pushTime);
      if (!pushTime) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `PushTime with id ${req.params.id} was not found`,
        });
      }

      PushTimeService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'PushTime was deleted successfully',
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