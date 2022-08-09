import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import SprintService from '../services/sprint';
import ProjectService from '../services/project';
import prisma from '../prismaClient';
import SprintInputUpdate from '../types/sprint/sprintInputUpdate';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * Sprint controller
 */
export default class SprintController {
  /**
   * Create sprint
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('SprintCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${userId} do not have authority`,
        });
      }

      const projectCheck = await ProjectService.findById(req.body.sprint.idProject);

      if (!projectCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Project with id ${req.body.sprint.idProject} not exists`,
        });
      }

      const sprintCreat: any = req.body.sprint;

      sprintCreat.idCreator = String(userId);

      sprintCreat.status = 'OPENED';

      console.log(req.body.sprint);

      const sprint = await SprintService.create(sprintCreat);

      if (!sprint) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Sprint was not created`,
        });
      }

      return res.json({
        sprintId: sprint.id,
        success: true,
        message: 'Sprint was created',
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
   * Get all sprints
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('SprintGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const sprints = await prisma.sprint.findMany();

      return res.json(sprints);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get sprint by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('SprintGetById', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const sprint = await SprintService.findById(req.params.id);

      console.log(sprint, !sprint);
      if (!sprint) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Sprint with id ${req.params.id} was not found`,
        });
      }

      return res.json(sprint);
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
   * Get sprint by idProject
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdProjecrt(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('SprintGetByIdProject', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const sprint = await SprintService.findByIdProject(req.params.idProject);

      console.log(sprint, !sprint);
      if (!sprint) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Sprint with idProject ${req.params.idProject} was not found`,
        });
      }

      return res.json(sprint);
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
   * Update sprint
   *
   * @param req - request data
   * @param res - response data
   */
  public static async update(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('SprintUpdate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const sprintCheck = await SprintService.findById(req.params.id);

      console.log(sprintCheck, !sprintCheck);
      if (!sprintCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Sprint with id ${req.params.id} was not found`,
        });
      }

      if (req.body.sprint.idProject) {
        const projectCheck = await ProjectService.findById(req.body.sprint.idProject);

        if (!projectCheck) {
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `Project with id ${req.body.sprint.idProject} was not found`,
          });
        }
      }

      const sprintUpdate: SprintInputUpdate = req.body.sprint;

      const now = new Date();

      sprintUpdate.updatedAt = now;

      const sprint = await SprintService.update(req.params.id, sprintUpdate);

      if (!sprint) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Sprint with id ${req.params.id} was not found`,
        });
      }

      return res.json({
        success: true,
        message: 'Sprint was updated',
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
   * Delete sprint by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('SprintDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const sprint = await SprintService.findById(req.params.id);

      console.log(sprint, !sprint);
      if (!sprint) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Sprint with id ${req.params.id} was not found`,
        });
      }

      SprintService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'Sprint was deleted successfully',
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