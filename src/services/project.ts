import prisma from '../prismaClient';
import { Project } from '@prisma/client';
import ProjectInputCreate from '../types/project/projectInputCreate';
import ProjectInputUpdate from '../types/project/projectInputUpdate';

/**
 *
 */
export default class ProjectService {
  /**
   * Create new project
   *
   * @param data - incoming data
   */
  public static async create(data: ProjectInputCreate): Promise<Project> {
    return prisma.project.create({
      data,
    });
  }

  /**
   * Find project by id
   *
   * @param id - project id
   */
  public static async findById(id: string): Promise<Project | null> {
    return prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Update project by id
   *
   * @param id - project id
   * @param data - incoming data
   */
  public static async update(id: string, data: ProjectInputUpdate): Promise<Project> {
    return prisma.project.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Delete project by id
   *
   * @param id - project id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.project.delete({
      where: {
        id,
      },
    });
  }
}