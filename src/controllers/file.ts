import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import FileService from '../services/file';
import { AccessByRole } from '../utils/AccessByRole';
import prisma from '../prismaClient';
import { File } from '.prisma/client';
import TaskService from '../services/task';
import fs from 'fs';

/**
 * File controller
 */
export default class FileController {
  /**
   * Create file
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('FileCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      console.log(req.file);

      if (!req.file) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `File not found`,
        });
      }

      if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/gif' || req.file.mimetype === 'image/pjpeg' || req.file.mimetype === 'image/svd+xml' || req.file.mimetype === 'image/tiff') {
        const filePath = process.cwd() + '/uploads/image/' + req.file.filename;

        fs.unlinkSync(filePath);

        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `It is image`,
        });
      }

      const rename: File | null = await FileService.findByName(req.file.filename);

      if (rename) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `File with name ${req.file.filename} already exist`,
        });
      }

      const file = await FileService.create(req.file.filename, req.params.idTask, String(userId));

      if (!file) {
        return res.status(HttpStatusCode.NotFound).send({
          success: false,
          message: 'File was not created',
        });
      }

      return res.json({
        fileId: file.id,
        success: true,
        message: 'File was created',
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
   * @param req - request data
   * @param res - response data
   */
  public static async download(req: express.Request, res: express.Response): Promise<express.Response | void>  {
    const authority: boolean = await AccessByRole('FileDownload', req.body.jwtData.userId);

    if (!authority) {
      return res.status(HttpStatusCode.BadRequest).json({
        success: false,
        message: `User do not have authority`,
      });
    }
    const fields = await FileService.findById(req.params.id);

    if (!fields) {
      return res.status(HttpStatusCode.BadRequest).json({
        success: false,
        message: `File with id ${req.params.idProject} was not found`,
      });
    }

    const filePath = process.cwd() + '/uploads/file/' + fields.name;

    // return res.send('123');
    return res.download(filePath); // Set disposition and send it.
  }
  /**
   * Get all files
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('FileGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const files = await prisma.file.findMany();

      return res.json(files);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }
  /**
   * Get file by idTask
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdTask(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('FileGetByIdTask', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const checkTask = await TaskService.findById(req.params.idTask);

      if (!checkTask) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Task with id ${req.params.idTask} was not found`,
        });
      }

      const file = await FileService.findByIdTask(req.params.idTask);

      console.log(file, !file);
      if (!file) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `File with idTask ${req.params.idTask} was not found`,
        });
      }

      return res.json(file);
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
   * Delete file by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('FileDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }
      const file = await FileService.findById(req.params.id);

      console.log(file, !file);
      if (!file) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `File with id ${req.params.id} was not found`,
        });
      }

      FileService.deleteById(req.params.id, file.name);

      return res.json({
        status: 200,
        message: 'File was deleted successfully',
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