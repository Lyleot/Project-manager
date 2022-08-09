import prisma from '../prismaClient';
import { Task } from '@prisma/client';
import TaskInputCreate from '../types/task/taskInputCreate';
import TaskInputUpdate from '../types/task/taskInputUpdate';

/**
 *
 */
export default class TaskService {
  /**
   * Create new task
   *
   * @param data - incoming data
   */
  public static async create(data: TaskInputCreate): Promise<Task> {
    return prisma.task.create({
      data,
    });
  }
  /**
   * Find task by id
   *
   * @param id - task id
   */
  public static async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find task by idtask
   *
   * @param idSprint - sprint id
   */
  public static async findByIdSprint(idSprint: string): Promise<Task[] | null> {
    return prisma.task.findMany({
      where: {
        idSprint,
      },
    });
  }
  /**
   * Find task by idDeveloper
   *
   * @param idDeveloper - user id
   */
  public static async findByIdDeveloper(idDeveloper: string): Promise<Task[] | null> {
    return prisma.task.findMany({
      where: {
        idDeveloper,
      },
    });
  }
  /**
   * Find task by idTester
   *
   * @param idTester - tester id
   */
  public static async findByIdTester(idTester: string): Promise<Task[] | null> {
    return prisma.task.findMany({
      where: {
        idTester,
      },
    });
  }

  /**
   * Update task by id
   *
   * @param id - task id
   * @param data - incoming data
   */
  public static async update(id: string, data: TaskInputUpdate): Promise<Task> {
    return prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }
  /**
   * Delete task by id
   *
   * @param id - task id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  }
}