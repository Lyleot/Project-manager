import express from 'express';
import { HttpStatusCode } from '../utils/httpError';
import EventService from '../services/event';
import prisma from '../prismaClient';
import EventInputUpdate from '../types/event/eventInputUpdate';
import { AccessByRole } from '../utils/AccessByRole';

/**
 * Event controller
 */
export default class EventController {
  /**
   * Create event
   *
   * @param req - request data
   * @param res - response data
   */
  public static async create(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const userId = req.body.jwtData.userId;

      const authority: boolean = await AccessByRole('EventCreate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }

      const eventCreat: any = req.body.event;

      eventCreat.idCreator = String(userId);

      const event = await EventService.create(eventCreat);

      if (!event) {
        return res.status(HttpStatusCode.NotFound).send({
          success: false,
          message: 'Event not found',
        });
      }

      return res.json({
        eventId: event.id,
        success: true,
        message: 'Event was created',
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
   * Get all events
   *
   * @param req - request data
   * @param res - response data
   */
  public static async getAll(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('EventGetAll', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }
      const events = await prisma.event.findMany();

      return res.json(events);
    } catch (error) {
      return res.status(HttpStatusCode.ServerError).json({
        error,
      });
    }
  }

  /**
   * Get event by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async get(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('EventGetById', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }
      const event = await EventService.findById(req.params.id);

      console.log(event, !event);
      if (!event) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Event with id ${req.params.id} was not found`,
        });
      }

      return res.json(event);
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
   * Update event
   *
   * @param req - request data
   * @param res - response data
   */
  public static async update(req: express.Request, res: express.Response): Promise<express.Response | void> {
    try {
      const authority: boolean = await AccessByRole('EventUpdate', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }
      const eventCheck = await EventService.findById(req.params.id);

      console.log(eventCheck, !eventCheck);
      if (!eventCheck) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Event with id ${req.params.id} was not found`,
        });
      }

      const eventUpdate: EventInputUpdate = req.body.event;

      const now = new Date();

      eventUpdate.updatedAt = now;

      const event = await EventService.update(req.params.id, eventUpdate);

      if (!event) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Event with id ${req.params.id} was not found`,
        });
      }

      return res.json({
        success: true,
        message: 'Event was updated',
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
   * Delete event by id
   *
   * @param req - request data
   * @param res - response data
   */
  public static async delete(req: express.Request, res: express.Response): Promise<express.Response> {
    try {
      const authority: boolean = await AccessByRole('EventDelete', req.body.jwtData.userId);

      if (!authority) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `User do not have authority`,
        });
      }
      const event = await EventService.findById(req.params.id);

      console.log(event, !event);
      if (!event) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: `Event with id ${req.params.id} was not found`,
        });
      }

      EventService.deleteById(req.params.id);

      return res.json({
        status: 200,
        message: 'Event was deleted successfully',
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