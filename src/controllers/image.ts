import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import ImageService from '../services/image';
import { AccessByRole } from '../utils/AccessByRole';
import prisma from '../prismaClient';
import { Image } from '.prisma/client';
import TaskService from '../services/task';
import fs from 'fs';

/**
 * Image controller
 */
export default class ImageController {
  /**
   * Create image
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('ImageCreate', req.body.jwtData.userId);

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
          message: `Image not found`,
        });
      }

      if (!(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/gif' || req.file.mimetype === 'image/pjpeg' || req.file.mimetype === 'image/svd+xml' || req.file.mimetype === 'image/tiff')) {
        const filePath = process.cwd() + '/uploads/file/' + req.file.filename;

        fs.unlinkSync(filePath);

        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `It is not image`,
        });
      }

      const rename: Image | null = await ImageService.findByName(req.file.filename);

      if (rename) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Image with name ${req.file.filename} already exist`,
        });
      }

      const image = await ImageService.create(req.file.filename, req.params.idTask, String(userId));

      if (!image) {
        return res.status(HttpStatusCode.NotFound).send({
          success: false,
          message: 'Image was not created',
        });
      }

      return res.json({
        imageId: image.id,
        success: true,
        message: 'Image was created',
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
    const authority: boolean = await AccessByRole('ImageDownload', req.body.jwtData.userId);

    if (!authority) {
      return res.status(HttpStatusCode.BadRequest).json({
        success: false,
        message: `User do not have authority`,
      });
    }
    const fields = await ImageService.findById(req.params.id);

    if (!fields) {
      return res.status(HttpStatusCode.BadRequest).json({
        success: false,
        message: `Image with id ${req.params.idProject} was not found`,
      });
    }

    const filePath = process.cwd() + '/uploads/image/' + fields.name;

    // return res.send('123');
    return res.download(filePath); // Set disposition and send it.
  }
  /**
   * Get all images
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ImageGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const images = await prisma.image.findMany();

      return res.json(images);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }
  /**
   * Get image by idTask
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getByIdTask(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('ImageGetByIdTask', req.body.jwtData.userId);

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

      const image = await ImageService.findByIdTask(req.params.idTask);

      console.log(image, !image);
      if (!image) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Image with idTask ${req.params.idTask} was not found`,
        });
      }

      return res.json(image);
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
   * Delete image by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('ImageDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }
      const image = await ImageService.findById(req.params.id);

      console.log(image, !image);
      if (!image) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Image with id ${req.params.id} was not found`,
        });
      }

      ImageService.deleteById(req.params.id, image.name);

      return res.json({
        status: 200,
        message: 'Image was deleted successfully',
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