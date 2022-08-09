import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import TimeTaskService from '../services/timeTask';
import TaskService from '../services/task';
import prisma from '../prismaClient';
import TimeTaskInputUpdate from '../types/timeTask/timeTaskInputUpdate';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * TimeTask controller
 */
export default class TimeTaskController {
  /**
   * Create timeTask
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('TimeTaskCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${userId} do not have authority`,
        });
      }

      const taskCheck = await TaskService.findById(req.body.timeTask.idTask);

      if (!taskCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with id ${req.body.timeTask.idTask} not exists`,
        });
      }

      const timeTaskCreat: any = req.body.timeTask;

      timeTaskCreat.idCreator = String(userId);

      const timeTask = await TimeTaskService.create(timeTaskCreat);

      if (!timeTask) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `TimeTask was not created`,
        });
      }

      return res.json({
        timeTaskId: timeTask.id,
        success: true,
        message: 'TimeTask was created',
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
   * Get all timeTasks
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TimeTaskGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const timeTasks = await prisma.timeTask.findMany();

      return res.json(timeTasks);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get timeTask by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TimeTaskGetById', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const timeTask = await TimeTaskService.findById(req.params.id);

      console.log(timeTask, !timeTask);
      if (!timeTask) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `TimeTask with id ${req.params.id} was not found`,
        });
      }

      return res.json(timeTask);
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
   * Get timeTask by idTask
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdTask(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TimeTaskGetByIdTask', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const timeTask = await TimeTaskService.findByIdTask(req.params.idTask);

      console.log(timeTask, !timeTask);
      if (!timeTask) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `TimeTask with idTask ${req.params.idTask} was not found`,
        });
      }

      return res.json(timeTask);
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
   * Update timeTask
   *
   * @param req - request data
   * @param res - response data
   */
  public static async update(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TimeTaskUpdate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const timeTaskCheck = await TimeTaskService.findById(req.params.id);

      console.log(timeTaskCheck, !timeTaskCheck);
      if (!timeTaskCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `timeTask with id ${req.params.id} was not found`,
        });
      }

      const timeTaskUpdate: TimeTaskInputUpdate = req.body.timeTask;

      const now = new Date();

      timeTaskUpdate.updatedAt = now;

      const timeTask = await TimeTaskService.update(req.params.id, timeTaskUpdate);

      if (!timeTask) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `TimeTask with id ${req.params.id} was not found`,
        });
      }

      return res.json({
        success: true,
        message: 'TimeTask was updated',
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
   * Delete timeTask by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('TimeTaskDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const timeTask = await TimeTaskService.findById(req.params.id);

      console.log(timeTask, !timeTask);
      if (!timeTask) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `TimeTask with id ${req.params.id} was not found`,
        });
      }

      TimeTaskService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'TimeTask was deleted successfully',
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