import prisma from '../prismaClient';
import { PushTime } from '@prisma/client';
import PushTimeInputCreate from '../types/pushTime/pushTimeInputCreate';

/**
 *
 */
export default class PushTimeService {
  /**
   * Create new pushTime
   *
   * @param data - incoming data
   */
  public static async create(data: PushTimeInputCreate): Promise<PushTime> {
    return prisma.pushTime.create({
      data,
    });
  }
  /**
   * Find pushTime by id
   *
   * @param id - pushTime id
   */
  public static async findById(id: string): Promise<PushTime | null> {
    return prisma.pushTime.findUnique({
      where: {
        id,
      },
    });
  }
  /**
   * Find pushTime by idTask
   *
   * @param idTask - task id
   */
  public static async findByIdTask(idTask: string): Promise<PushTime[] | null> {
    return prisma.pushTime.findMany({
      where: {
        idTask,
      },
    });
  }
  /**
   * Find pushTime by idTask
   *
   * @param idUser - user id
   */
  public static async findByIdUser(idUser: string): Promise<PushTime[] | null> {
    return prisma.pushTime.findMany({
      where: {
        idUser,
      },
    });
  }
  /**
   * Delete pushTime by id
   *
   * @param id - pushTime id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.pushTime.delete({
      where: {
        id,
      },
    });
  }
}
