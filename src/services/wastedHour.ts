import prisma from '../prismaClient';
import { WastedHour } from '@prisma/client';
import WastedHourInputCreate from '../types/wastedHour/wastedHourInputCreate';

/**
 *
 */
export default class WastedHourService {
  /**
   * Create new wastedHour
   *
   * @param data - incoming data
   */
  public static async create(data: WastedHourInputCreate): Promise<WastedHour> {
    return prisma.wastedHour.create({
      data,
    });
  }
  /**
   * Find wastedHour by id
   *
   * @param id - return id
   */
  public static async findById(id: string): Promise<WastedHour | null> {
    return prisma.wastedHour.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find wastedHour by idwastedHour
   *
   * @param idSprint - sprint id
   */
  public static async findByIdSprint(idSprint: string): Promise<WastedHour[] | null> {
    return prisma.wastedHour.findMany({
      where: {
        idSprint,
      },
    });
  }
  /**
   * Find wastedHour by idUser
   *
   * @param idUser - user id
   */
  public static async findByIdUser(idUser: string): Promise<WastedHour[] | null> {
    return prisma.wastedHour.findMany({
      where: {
        idUser,
      },
    });
  }
  /**
   * Find wastedHour by idProject
   *
   * @param idProject - project id
   */
  public static async findByIdProject(idProject: string): Promise<WastedHour[] | null> {
    return prisma.wastedHour.findMany({
      where: {
        idProject,
      },
    });
  }
  /**
   * Find wastedHour by idTask
   *
   * @param idTask - task id
   */
  public static async findByIdTask(idTask: string): Promise<WastedHour[] | null> {
    return prisma.wastedHour.findMany({
      where: {
        idTask,
      },
    });
  }
  /**
   * Delete wastedHour by id
   *
   * @param id - return id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.wastedHour.delete({
      where: {
        id: id,
      },
    });
  }
}