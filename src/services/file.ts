import prisma from '../prismaClient';
import { File } from '@prisma/client';
import fs from 'fs';

/**
 *
 */
export default class FileService {
  /**
   * Create new file
   *
   * @param name - name file
   * @param idTask - id task
   * @param idCreator - id user
   */
  public static async create(name:  string, idTask: string, idCreator: string): Promise<File> {
    return prisma.file.create({
      data: {
        name,
        idTask,
        idCreator,
      },
    });
  }

  /**
   * Get file by id Task
   *
   * @param idTask - id task
   */
  public static async findByIdTask(idTask: string): Promise<File[]> {
    return prisma.file.findMany({
      where: {
        idTask,
      },
    });
  }
  /**
   * Get file by id
   *
   * @param id - id file
   */
  public static async findById(id: string): Promise<File | null> {
    return prisma.file.findUnique({
      where: {
        id,
      },
    });
  }
  /**
   * Get file by name
   *
   * @param name - name file
   */
  public static async findByName(name: string): Promise<File | null> {
    return prisma.file.findUnique({
      where: {
        name,
      },
    });
  }
  /**
   * Delete file by id
   *
   * @param id - file id
   * @param name - file name
   */
  public static async deleteById(id: string, name: string): Promise<void> {
    const filePath = process.cwd() + '/uploads/file/' + name;

    fs.unlinkSync(filePath);

    await prisma.file.delete({
      where: {
        id,
      },
    });
  }
}