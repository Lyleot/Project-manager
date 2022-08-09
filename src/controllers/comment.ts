import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import WastedHourService from '../services/wastedHour';
import SprintService from '../services/sprint';
import TaskService from '../services/task';
import ProjectService from '../services/project';
import ReturnService from '../services/return';
import CommentService from '../services/comment';
import PushTimeService from '../services/pushTime';
import EventService from '../services/event';
import prisma from '../prismaClient';
import CommentInputUpdate from '../types/comment/commentInputUpdate';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * Comment controller
 */
export default class CommentController {
  /**
   * Create comment
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('CommentCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User with id ${userId} do not have authority`,
        });
      }


      const commentCreat: any = req.body.comment;

      switch (commentCreat.typeComment) {
        case 'PROJECT':
          const projectCheck = await ProjectService.findById(req.body.comment.idProject);

          if (!projectCheck) {
            return res.status(HttpStatusCode.BadRequest).json({
              success: false,
              message: `Project with id ${req.body.comment.idProject} not exists`,
            });
          }
          commentCreat.idProject = req.body.comment.idProject;
          break;
        case 'SPRINT':
          const sprintCheck = await SprintService.findById(req.body.comment.idSprint);

          if (!sprintCheck) {
            return res.status(HttpStatusCode.BadRequest).json({
              success: false,
              message: `Sprint with id ${req.body.comment.idSprint} not exists`,
            });
          }
          commentCreat.idSprint = req.body.comment.idSprint;
          break;
        case 'TASK':
          const taskCheck = await TaskService.findById(req.body.comment.idTask);

          if (!taskCheck) {
            return res.status(HttpStatusCode.BadRequest).json({
              success: false,
              message: `Task with id ${req.body.comment.idTask} not exists`,
            });
          }
          commentCreat.idTask = req.body.comment.idTask;
          break;
        case 'RETURN':
          const returnCheck = await ReturnService.findById(req.body.comment.idReturn);

          if (!returnCheck) {
            return res.status(HttpStatusCode.BadRequest).json({
              success: false,
              message: `Return with id ${req.body.comment.idReturn} not exists`,
            });
          }
          commentCreat.idReturn = req.body.comment.idReturn;
          break;
        case 'WASTEDHOUR':
          const wastedHourCheck = await WastedHourService.findById(req.body.comment.idWastedHour);

          if (!wastedHourCheck) {
            return res.status(HttpStatusCode.BadRequest).json({
              success: false,
              message: `WastedHour with id ${req.body.comment.idWastedHour} not exists`,
            });
          }
          commentCreat.idWastedHour = req.body.comment.idWastedHour;
          break;
        case 'PUSHTIME':
          const pushTimeCheck = await PushTimeService.findById(req.body.comment.idPushTime);

          if (!pushTimeCheck) {
            return res.status(HttpStatusCode.BadRequest).json({
              success: false,
              message: `PushTime with id ${req.body.comment.idPushTime} not exists`,
            });
          }
          commentCreat.idPushTime = req.body.comment.idPushTime;
          break;
        case 'EVENT':
          const eventCheck = await EventService.findById(req.body.comment.idEvent);

          if (!eventCheck) {
            return res.status(HttpStatusCode.BadRequest).json({
              success: false,
              message: `Event with id ${req.body.comment.idEvent} not exists`,
            });
          }
          commentCreat.idEvent = req.body.comment.idEvent;
          break;
        default:
          return res.status(HttpStatusCode.BadRequest).json({
            success: false,
            message: `Comment type ${commentCreat.type} not exist`,
          });
      }

      commentCreat.idCreator = userId;

      console.log(commentCreat);

      const comment = await CommentService.create(commentCreat);

      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment was not created`,
        });
      }

      return res.json({
        commentId: comment.id,
        success: true,
        message: 'Comment was created',
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
   * Get all comments
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

      const comments = await prisma.comment.findMany();

      return res.json(comments);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get comment by id
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

      const comment = await CommentService.findById(req.params.id);

      console.log(comment, !comment);
      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with id ${req.params.id} was not found`,
        });
      }

      return res.json(comment);
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
   * Get comment by idSprint
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
      const comment = await CommentService.findByIdSprint(req.params.idSprint);

      console.log(comment, !comment);
      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with idSprint ${req.params.idSprint} was not found`,
        });
      }

      return res.json(comment);
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
   * Get comment by idProject
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

      const comment = await CommentService.findByIdProject(req.params.idProject);

      console.log(comment, !comment);
      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with idSprint ${req.params.idProject} was not found`,
        });
      }

      return res.json(comment);
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
   * Get comment by idTask
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

      const comment = await CommentService.findByIdTask(req.params.idTask);

      console.log(comment, !comment);
      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with idTask ${req.params.idTask} was not found`,
        });
      }

      return res.json(comment);
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
   * Get comment by idReturn
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdReturn(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetByIdReturn', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const comment = await CommentService.findByIdReturn(req.params.idReturn);

      console.log(comment, !comment);
      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with idReturn ${req.params.idReturn} was not found`,
        });
      }

      return res.json(comment);
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
   * Get comment by idWastedHour
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdWastedHour(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetByIdWastedTime', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const comment = await CommentService.findByIdWastedHour(req.params.idWastedHour);

      console.log(comment, !comment);
      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with idWastedHour ${req.params.idWastedHour} was not found`,
        });
      }

      return res.json(comment);
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
   * Get comment by idPushTime
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdPushTime(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetByIdPushTime', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const comment = await CommentService.findByIdPushTime(req.params.idPushTime);

      console.log(comment, !comment);
      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with idPushTime ${req.params.idPushTime} was not found`,
        });
      }

      return res.json(comment);
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
   * Get comment by idEvent
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdEvent(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentGetByIdEvent', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const comment = await CommentService.findByIdEvent(req.params.idEvent);

      console.log(comment, !comment);
      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with idEvent ${req.params.idEvent} was not found`,
        });
      }

      return res.json(comment);
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
   * Update comment
   *
   * @param req - request data
   * @param res - response data
   */
  public static async update(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('CommentUpdate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const commentCheck = await CommentService.findById(req.params.id);

      console.log(commentCheck, !commentCheck);
      if (!commentCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with id ${req.params.id} was not found`,
        });
      }

      const commentUpdate: CommentInputUpdate = req.body.comment;

      const now = new Date();

      commentUpdate.updatedAt = now;

      const comment = await CommentService.update(req.params.id, commentUpdate);

      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with id ${req.params.id} was not found`,
        });
      }

      return res.json({
        success: true,
        message: 'Comment was updated',
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
   * Delete comment by id
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

      const comment = await CommentService.findById(req.params.id);

      console.log(comment, !comment);
      if (!comment) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Comment with id ${req.params.id} was not found`,
        });
      }

      CommentService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'Comment was deleted successfully',
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