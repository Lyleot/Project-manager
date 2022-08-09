import prisma from '../prismaClient';
import { Sprint } from '@prisma/client';
import SprintInputCreate from '../types/sprint/sprintInputCreate';
import SprintInputUpdate from '../types/sprint/sprintInputUpdate';

/**
 *
 */
export default class SprintService {
  /**
   * Create new sprint
   *
   * @param data - incoming data
   */
  public static async create(data: SprintInputCreate): Promise<Sprint> {
    return prisma.sprint.create({
      data,
    });
  }

  /**
   * Find sprint by id
   *
   * @param id - sprint id
   */
  public static async findById(id: string): Promise<Sprint | null> {
    return prisma.sprint.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find sprint by idProject
   *
   * @param idProject - project id
   */
  public static async findByIdProject(idProject: string): Promise<Sprint[] | null> {
    return prisma.sprint.findMany({
      where: {
        idProject,
      },
    });
  }

  /**
   * Update sprint by id
   *
   * @param id - sprint id
   * @param data - incoming data
   */
  public static async update(id: string, data: SprintInputUpdate): Promise<Sprint> {
    return prisma.sprint.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Delete sprint by id
   *
   * @param id - sprint id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.sprint.delete({
      where: {
        id,
      },
    });
  }
}