import prisma from '../prismaClient';
import { UserProject } from '@prisma/client';

/**
 *
 */
export default class UserProjectService {
  /**
   * Create new project
   *
   * @param idProject - project id
   * @param idUser - user id
   * @param idCreator - creator id
   */
  public static async create(idProject: string, idUser: string, idCreator: string): Promise<UserProject> {
    return prisma.userProject.create({
      data: {
        idProject,
        idUser,
        idCreator,
      },
    });
  }

  /**
   * Find userProject by id
   *
   * @param id - userProject id
   */
  public static async findById(id: string): Promise<UserProject | null> {
    return prisma.userProject.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Delete userProject by id
   *
   * @param id - userProject id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.userProject.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Find userProject by idUser
   *
   * @param idUser - user id
   */
  public static async findByIdUser(idUser: string): Promise<UserProject[] | null> {
    return prisma.userProject.findMany({
      where: {
        idUser,
      },
    });
  }

  /**
   * Find userProject by idProject
   *
   * @param idProject - project id
   */
  public static async findByIdProject(idProject: string): Promise<UserProject[] | null> {
    return prisma.userProject.findMany({
      where: {
        idProject,
      },
    });
  }
}