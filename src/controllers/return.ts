import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import ReturnService from '../services/return';
import SprintService from '../services/sprint';
import TaskService from '../services/task';
import prisma from '../prismaClient';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * Return controller
 */
export default class ReturnController {
  /**
   * Create return
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('ReturnCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${userId} do not have authority`,
        });
      }

      const returnCreat: any = {};

      returnCreat.idCreator = String(userId);

      const task = await TaskService.findById(req.params.id);

      if (!task) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with id ${req.params.id} not exists`,
        });
      }

      returnCreat.idTask = req.params.id;

      returnCreat.idSprint = task.idSprint;

      returnCreat.idUser = task.idTester;

      const sprint = await SprintService.findById(task.idSprint);

      returnCreat.idProject = sprint?.idProject;

      const returned = await ReturnService.create(returnCreat);

      if (!returned) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Return was not created`,
        });
      }

      return res.json({
        returnId: returned.id,
        success: true,
        message: 'Return was created',
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
   * Get all returns
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ReturnGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const returns = await prisma.return.findMany();

      return res.json(returns);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get return by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ReturnGetById', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const returned = await ReturnService.findById(req.params.id);

      console.log(returned, !returned);
      if (!returned) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Return with id ${req.params.id} was not found`,
        });
      }

      return res.json(returned);
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
   * Get return by idSprint
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdSprint(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ReturnGetByIdSprint', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const returned = await ReturnService.findByIdSprint(req.params.idSprint);

      console.log(returned, !returned);
      if (!returned) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Return with idSprint ${req.params.idSprint} was not found`,
        });
      }

      return res.json(returned);
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
   * Get return by idProject
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdProject(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ReturnGetByIdProject', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const returned = await ReturnService.findByIdProject(req.params.idProject);

      console.log(returned, !returned);
      if (!returned) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Return with idSprint ${req.params.idProject} was not found`,
        });
      }

      return res.json(returned);
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
   * Get return by idTask
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdTask(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ReturnGetByIdTask', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const returned = await ReturnService.findByIdTask(req.params.idTask);

      console.log(returned, !returned);
      if (!returned) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Return with idTask ${req.params.idTask} was not found`,
        });
      }

      return res.json(returned);
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
   * Get return by idUser
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdUser(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ReturnGetByIdUser', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const returned = await ReturnService.findByIdUser(req.params.idUser);

      console.log(returned, !returned);
      if (!returned) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Return with idUser ${req.params.idUser} was not found`,
        });
      }

      return res.json(returned);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }
  /**
   * Delete return by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('ReturnDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const returned = await ReturnService.findById(req.params.id);

      console.log(returned, !returned);
      if (!returned) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Return with id ${req.params.id} was not found`,
        });
      }

      ReturnService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'Return was deleted successfully',
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