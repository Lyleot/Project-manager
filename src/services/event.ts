import prisma from '../prismaClient';
import { Event } from '@prisma/client';
import EventInputCreate from '../types/event/eventInputCreate';
import EventInputUpdate from '../types/event/eventInputUpdate';

/**
 *
 */
export default class EventService {
  /**
   * Create new event
   *
   * @param data - incoming data
   */
  public static async create(data: EventInputCreate): Promise<Event> {
    return prisma.event.create({
      data,
    });
  }
  /**
   * Find event by id
   *
   * @param id - event id
   */
  public static async findById(id: string): Promise<Event | null> {
    return prisma.event.findUnique({
      where: {
        id,
      },
    });
  }
  /**
   * Find event by date
   *
   * @param gte - date
   * @param lt - date
   */
  public static async findByDate(gte: Date, lt: Date): Promise<Event[] | null> {
    return prisma.event.findMany({
      where: {
        date: {
          gte,
          lt,
        },
      },
    });
  }
  /**
   * Update event by id
   *
   * @param id - event id
   * @param data - incoming data
   */
  public static async update(id: string, data: EventInputUpdate): Promise<Event> {
    return prisma.event.update({
      where: {
        id,
      },
      data,
    });
  }
  /**
   * Delete event by id
   *
   * @param id - event id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.event.delete({
      where: {
        id,
      },
    });
  }
}