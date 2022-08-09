import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import UserProjectService from '../services/userProject';
import ProjectService from '../services/project';
import UserService from '../services/user';
import prisma from '../prismaClient';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * UserProject controller
 */
export default class UserProjectController {
  /**
   * Create userProject
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('userProjectCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${userId} do not have authority`,
        });
      }

      const projectCheck = await ProjectService.findById(req.body.userProject.idProject);

      if (!projectCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Project with id ${req.body.userProject.idProject} not exists`,
        });
      }

      const userCheck = await UserService.findById(req.body.userProject.idUser);

      if (!userCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${req.body.userProject.idUser} not exists`,
        });
      }

      const userProjectCheck = await prisma.userProject.findMany({
        where: {
          idUser:req.body.userProject.idUser,
          idProject:req.body.userProject.idProject,
        },
      });

      if (!userProjectCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `UserProject already exist`,
        });
      }

      const userProject = await UserProjectService.create(req.body.userProject.idProject, req.body.userProject.idUser, String(userId));

      if (!userProject) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `UserProject was not created`,
        });
      }

      return res.json({
        userProjectId: userProject.id,
        success: true,
        message: 'UserProject was created',
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
   * Get all userProjects
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('userProjectGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const userProjects = await prisma.userProject.findMany();

      return res.json(userProjects);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get userProject by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('userProjectGetById', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const userProject = await UserProjectService.findById(String(req.params.id));

      console.log(userProject, !userProject);
      if (!userProject) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `UserProject with id ${req.params.id} was not found`,
        });
      }

      return res.json(userProject);
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
   * Delete userProject by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('userProjectDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const userProject = await UserProjectService.findById(String(req.params.id));

      console.log(userProject, !userProject);
      if (!userProject) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `UserProject with id ${req.params.id} was not found`,
        });
      }

      UserProjectService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'UserProject was deleted successfully',
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
   * Get userProject by idUser
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdUser(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userProject = await UserProjectService.findByIdUser(req.params.idUser);

      console.log(userProject, !userProject);
      if (!userProject) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `UserProject with idUser ${req.params.idUser} was not found`,
        });
      }

      return res.json(userProject);
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
   * Get userProject by idProject
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdProjecrt(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userProject = await UserProjectService.findByIdProject(req.params.idProject);

      console.log(userProject, !userProject);
      if (!userProject) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `UserProject with idProject ${req.params.idProject} was not found`,
        });
      }

      return res.json(userProject);
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