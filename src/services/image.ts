import prisma from '../prismaClient';
import { Image } from '@prisma/client';
import fs from 'fs';

/**
 *
 */
export default class ImageService {
  /**
   * Create new image
   *
   * @param name - name image
   * @param idTask - id task
   * @param idCreator - id user
   */
  public static async create(name:  string, idTask: string, idCreator: string): Promise<Image> {
    return prisma.image.create({
      data: {
        name,
        idTask,
        idCreator,
      },
    });
  }

  /**
   * Get image by id Task
   *
   * @param idTask - id task
   */
  public static async findByIdTask(idTask: string): Promise<Image[]> {
    return prisma.image.findMany({
      where: {
        idTask,
      },
    });
  }
  /**
   * Get image by id
   *
   * @param id - id image
   */
  public static async findById(id: string): Promise<Image | null> {
    return prisma.image.findUnique({
      where: {
        id,
      },
    });
  }
  /**
   * Get image by name
   *
   * @param name - name image
   */
  public static async findByName(name: string): Promise<Image | null> {
    return prisma.image.findUnique({
      where: {
        name,
      },
    });
  }
  /**
   * Delete image by id
   *
   * @param id - image id
   * @param name - image name
   */
  public static async deleteById(id: string, name: string): Promise<void> {
    const filePath = process.cwd() + '/uploads/image/' + name;

    fs.unlinkSync(filePath);

    await prisma.image.delete({
      where: {
        id,
      },
    });
  }
}