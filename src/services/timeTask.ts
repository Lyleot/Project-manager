import prisma from '../prismaClient';
import { TimeTask } from '@prisma/client';
import TimeTaskInputCreate from '../types/timeTask/TimeTaskInputCreate';
import TimeTaskInputUpdate from '../types/timeTask/timeTaskInputUpdate';

/**
 *
 */
export default class TimeTaskService {
  /**
   * Create new timeTask
   *
   * @param data - incoming data
   */
  public static async create(data: TimeTaskInputCreate): Promise<TimeTask> {
    return prisma.timeTask.create({
      data,
    });
  }

  /**
   * Find timeTask by id
   *
   * @param id - timeTask id
   */
  public static async findById(id: string): Promise<TimeTask | null> {
    return prisma.timeTask.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find timeTask by idTask
   *
   * @param idTask - task id
   */
  public static async findByIdTask(idTask: string): Promise<TimeTask | null> {
    return prisma.timeTask.findUnique({
      where: {
        idTask,
      },
    });
  }

  /**
   * Update timeTask by id
   *
   * @param id - ttimeTask id
   * @param data - incoming data
   */
  public static async update(id: string, data: TimeTaskInputUpdate): Promise<TimeTask> {
    return prisma.timeTask.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Push time in timeTask by id
   *
   * @param id - timeTask id
   * @param time - incoming time
   */
  public static async pushTime(id: string, time: number): Promise<TimeTask> {
    return prisma.timeTask.update({
      where: {
        id,
      },
      data: {
        currentState: time,
      },
    });
  }

  /**
   * Delete timeTask by id
   *
   * @param id - timeTask id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.timeTask.delete({
      where: {
        id,
      },
    });
  }
}