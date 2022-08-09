import prisma from '../prismaClient';
import { Return } from '@prisma/client';
import ReturnInputCreate from '../types/return/returnInputCreate';

/**
 *
 */
export default class ReturnService {
  /**
   * Create new return
   *
   * @param data - incoming data
   */
  public static async create(data: ReturnInputCreate): Promise<Return> {
    return prisma.return.create({
      data,
    });
  }
  /**
   * Find return by id
   *
   * @param id - return id
   */
  public static async findById(id: string): Promise<Return | null> {
    return prisma.return.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find return by idSprint
   *
   * @param idSprint - return idSprint
   */
  public static async findByIdSprint(idSprint: string): Promise<Return[] | null> {
    return prisma.return.findMany({
      where: {
        idSprint,
      },
    });
  }
  /**
   * Find return by idSprint
   *
   * @param idUser - return idUser
   */
  public static async findByIdUser(idUser: string): Promise<Return[] | null> {
    return prisma.return.findMany({
      where: {
        idUser,
      },
    });
  }
  /**
   * Find return by idProject
   *
   * @param idProject - - return idProject
   */
  public static async findByIdProject(idProject: string): Promise<Return[] | null> {
    return prisma.return.findMany({
      where: {
        idProject,
      },
    });
  }
  /**
   * Find return by idTask
   *
   * @param idTask - return idTask
   */
  public static async findByIdTask(idTask: string): Promise<Return[] | null> {
    return prisma.return.findMany({
      where: {
        idTask,
      },
    });
  }
  /**
   * Delete return by id
   *
   * @param id - return id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.return.delete({
      where: {
        id,
      },
    });
  }
}