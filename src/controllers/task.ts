import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import TaskService from '../services/task';
import UserService from '../services/user';
import SprintService from '../services/sprint';
import prisma from '../prismaClient';
import TaskInputUpdate from '../types/task/taskInputUpdate';
import { AccessByRole } from '../utils/AccessByRole';
import ImageService from '../services/image';
import FileService from '../services/file';

/**
 * Task controller
 */
export default class TaskController {
  /**
   * Create task
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('TaskCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${userId} do not have authority`,
        });
      }

      if (req.body.task.idDeveloper) {
        const developerCheck = await UserService.findById(req.body.task.idDeveloper);

        if (!developerCheck) {
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `Developer with id ${req.body.task.idDeveloper} not exists`,
          });
        }
      }

      if (req.body.task.idTester) {
        const testerCheck = await UserService.findById(req.body.task.idTester);

        if (!testerCheck) {
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `Tester with id ${req.body.task.idTester} not exists`,
          });
        }
      }

      const sprintCheck = await SprintService.findById(req.body.task.idSprint);

      if (!sprintCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Sprint with id ${req.body.task.idSprint} not exists`,
        });
      }

      const taskCreat: any = req.body.task;

      taskCreat.idCreator = String(userId);

      taskCreat.status = 'OPENED';

      console.log(req.body.task);

      const task = await TaskService.create(taskCreat);

      if (!task) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task was not created`,
        });
      }

      return res.json({
        taskId: task.id,
        success: true,
        message: 'Task was created',
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
   * Get all tasks
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TaskGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const tasks = await prisma.task.findMany();

      return res.json(tasks);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get task by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TaskGetById', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const task = await TaskService.findById(req.params.id);

      console.log(task, !task);
      if (!task) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with id ${req.params.id} was not found`,
        });
      }

      return res.json(task);
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
   * Get task by idSprint
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdSprint(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TaskGetByIdSprint', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const task = await TaskService.findByIdSprint(req.params.idSprint);

      console.log(task, !task);
      if (!task) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with idSprint ${req.params.idSprint} was not found`,
        });
      }

      return res.json(task);
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
   * Get task by idDeveloper
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdDeveloper(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TaskGetByIdDeveloper', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const task = await TaskService.findByIdDeveloper(req.params.idDeveloper);

      console.log(task, !task);
      if (!task) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with idDeveloper ${req.params.idDeveloper} was not found`,
        });
      }

      return res.json(task);
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
   * Get task by idTester
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdTester(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TaskGetByIdTester', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const task = await TaskService.findByIdTester(req.params.idTester);

      console.log(task, !task);
      if (!task) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with idTester ${req.params.idTester} was not found`,
        });
      }

      return res.json(task);
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
   * Update task
   *
   * @param req - request data
   * @param res - response data
   */
  public static async update(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('TaskUpdate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const taskCheck = await TaskService.findById(req.params.id);

      console.log(taskCheck, !taskCheck);
      if (!taskCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with id ${req.params.id} was not found`,
        });
      }

      if (req.body.task.idSprint) {
        const sprintCheck = await SprintService.findById(req.body.task.idSprint);

        if (!sprintCheck) {
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `Sprint with id ${req.body.task.idSprint} was not found`,
          });
        }
      }

      const taskUpdate: TaskInputUpdate = req.body.task;

      if (req.body.task.idDeveloper) {
        const developerCheck = await UserService.findById(req.body.task.idDeveloper);

        if (!developerCheck) {
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `User with id ${req.body.task.idDeveloper} not exists`,
          });
        }
      }

      if (req.body.task.idTester) {
        const testerCheck = await UserService.findById(req.body.task.idTester);

        if (!testerCheck) {
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `User with id ${req.body.task.idTester} not exists`,
          });
        }
      }

      const now = new Date();

      taskUpdate.updatedAt = now;

      if (taskUpdate.status === 'CLOSED') {
        const images = await ImageService.findByIdTask(req.params.id);

        for (const image of images) {
          await ImageService.deleteById(image.id, image.name);
        }

        const files = await FileService.findByIdTask(req.params.id);

        for (const file of files) {
          await FileService.deleteById(file.id, file.name);
        }
      }

      const task = await TaskService.update(req.params.id, taskUpdate);

      if (!task) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with id ${req.params.id} was not found`,
        });
      }

      return res.json({
        success: true,
        message: 'task was updated',
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
   * Delete task by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('TaskDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const task = await TaskService.findById(req.params.id);

      console.log(task, !task);
      if (!task) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with id ${req.params.id} was not found`,
        });
      }

      TaskService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'Task was deleted successfully',
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