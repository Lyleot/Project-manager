import prisma from '../prismaClient';
import { PositionUser } from '@prisma/client';
import PositionUserInputCreate from '../types/positionUser/positionUserInputCreate';
import PositionUserInputUpdate from '../types/positionUser/positionUserInputUpdate';

/**
 *
 */
export default class PositionUserService {
  /**
   * Create new positionUser
   *
   * @param data - incoming data
   */
  public static async create(data: PositionUserInputCreate): Promise<PositionUser> {
    return prisma.positionUser.create({
      data,
    });
  }
  /**
   * Find positionUser by id
   *
   * @param id - positionUser id
   */
  public static async findById(id: string): Promise<PositionUser | null> {
    return prisma.positionUser.findUnique({
      where: {
        id,
      },
    });
  }
  /**
   * Find positionUser by idUser
   *
   * @param idUser - user id
   */
  public static async findByIdUser(idUser: string): Promise<PositionUser | null> {
    return prisma.positionUser.findUnique({
      where: {
        idUser,
      },
    });
  }
  /**
   * Update positionUser by id
   *
   * @param id - positionUser id
   * @param data - incoming data
   */
  public static async update(id: string, data: PositionUserInputUpdate): Promise<PositionUser> {
    return prisma.positionUser.update({
      where: {
        id,
      },
      data,
    });
  }
  /**
   * Delete positionUser by id
   *
   * @param id - positionUser id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.positionUser.delete({
      where: {
        id,
      },
    });
  }
}