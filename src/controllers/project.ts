import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import ProjectService from '../services/project';
import prisma from '../prismaClient';
import ProjectInputUpdate from '../types/project/projectInputUpdate';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * Project controller
 */
export default class ProjectController {
  /**
   * Create project
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

      const projectCreat: any = req.body.project;

      projectCreat.idCreator = String(userId);

      projectCreat.status = 'OPENED';

      const project = await ProjectService.create(projectCreat);

      if (!project) {
        return res.status(HttpStatusCode.NotFound).send({
          success: false,
          message: 'Project not found',
        });
      }

      return res.json({
        projectId: project.id,
        success: true,
        message: 'Project was created',
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
   * Get all projects
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

      const projects = await prisma.project.findMany();

      return res.json(projects);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get project by id
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

      const project = await ProjectService.findById(req.params.id);

      console.log(project, !project);
      if (!project) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Project with id ${req.params.id} was not found`,
        });
      }

      return res.json(project);
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
   * Update project
   *
   * @param req - request data
   * @param res - response data
   */
  public static async update(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ProjectUpdate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const projectCheck = await ProjectService.findById(req.params.id);

      console.log(projectCheck, !projectCheck);
      if (!projectCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Project with id ${req.params.id} was not found`,
        });
      }

      const projectUpdate: ProjectInputUpdate = req.body.project;

      const now = new Date();

      projectUpdate.updatedAt = now;

      const project = await ProjectService.update(req.params.id, projectUpdate);

      if (!project) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Project with id ${req.params.id} was not found`,
        });
      }

      return res.json({
        success: true,
        message: 'Project was updated',
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
   * Delete project by id
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

      const project = await ProjectService.findById(req.params.id);

      console.log(project, !project);
      if (!project) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Project with id ${req.params.id} was not found`,
        });
      }

      ProjectService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'Project was deleted successfully',
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