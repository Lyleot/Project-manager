import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import WastedHourService from '../services/wastedHour';
import SprintService from '../services/sprint';
import TaskService from '../services/task';
import TimeTaskService from '../services/timeTask';
import prisma from '../prismaClient';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * WastedHour controller
 */
export default class WastedHourController {
  /**
   * Create wastedHour
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const wastedHourCreat: any = {};

      const task = await TaskService.findById(req.params.id);

      console.log(wastedHourCreat);

      console.log(task);

      if (!task) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with id ${req.params.id} not exists`,
        });
      }

      wastedHourCreat.idTask = req.params.id;

      wastedHourCreat.idSprint = task.idSprint;

      wastedHourCreat.idDeveloper = task.idDeveloper;

      const timeTask = await TimeTaskService.findByIdTask(req.params.id);

      if (timeTask) {
        wastedHourCreat.loss = timeTask.timeLead - timeTask.currentState;
      }

      const sprint = await SprintService.findById(task.idSprint);

      wastedHourCreat.idProject = sprint?.idProject;

      const wastedHour = await WastedHourService.create(wastedHourCreat);

      if (!wastedHour) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `WastedHour was not created`,
        });
      }

      return res.json({
        wastedHourId: wastedHour.id,
        success: true,
        message: 'WastedHour was created',
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
   * Get all wastedHours
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const wastedHours = await prisma.wastedHour.findMany();

      return res.json(wastedHours);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get wastedHour by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetById', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const wastedHour = await WastedHourService.findById(req.params.id);

      console.log(wastedHour, !wastedHour);
      if (!wastedHour) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `WastedHour with id ${req.params.id} was not found`,
        });
      }

      return res.json(wastedHour);
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
   * Get wastedHour by idSprint
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdSprint(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetByIdSprint', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const wastedHour = await WastedHourService.findByIdSprint(req.params.idSprint);

      console.log(wastedHour, !wastedHour);
      if (!wastedHour) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `WastedHour with idSprint ${req.params.idSprint} was not found`,
        });
      }

      return res.json(wastedHour);
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
   * Get wastedHour by idProject
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdProject(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetByIdProject', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const wastedHour = await WastedHourService.findByIdProject(req.params.idProject);

      console.log(wastedHour, !wastedHour);
      if (!wastedHour) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `WastedHour with idSprint ${req.params.idProject} was not found`,
        });
      }

      return res.json(wastedHour);
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
   * Get wastedHour by idTask
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdTask(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetByIdTask', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const wastedHour = await WastedHourService.findByIdTask(req.params.idTask);

      console.log(wastedHour, !wastedHour);
      if (!wastedHour) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `WastedHour with idTask ${req.params.idTask} was not found`,
        });
      }

      return res.json(wastedHour);
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
   * Get wastedHour by idUser
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdUser(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetByIdUser', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const wastedHour = await WastedHourService.findByIdUser(req.params.idUser);

      console.log(wastedHour, !wastedHour);
      if (!wastedHour) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `WastedHour with idUser ${req.params.idUser} was not found`,
        });
      }

      return res.json(wastedHour);
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
   * Delete wastedHour by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('CommentDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const wastedHour = await WastedHourService.findById(req.params.id);

      console.log(wastedHour, !wastedHour);
      if (!wastedHour) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `WastedHour with id ${req.params.id} was not found`,
        });
      }

      WastedHourService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'WastedHour was deleted successfully',
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