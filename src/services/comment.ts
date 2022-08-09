import prisma from '../prismaClient';
import { Comment } from '@prisma/client';
import CommentInputCreate from '../types/comment/commentInputCreate';
import CommentInputUpdate from '../types/comment/commentInputUpdate';

/**
 *
 */
export default class CommentService {
  /**
   * Create new comment
   *
   * @param data - incoming data
   */
  public static async create(data: CommentInputCreate): Promise<Comment> {
    return prisma.comment.create({
      data,
    });
  }
  /**
   * Find comment by id
   *
   * @param id - comment id
   * @throws HttpError - if comment with this id is not found
   */
  public static async findById(id: string): Promise<Comment | null> {
    return prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find comment by idSprint
   *
   * @param idSprint - sprint id
   */
  public static async findByIdSprint(idSprint: string): Promise<Comment[] | null> {
    return prisma.comment.findMany({
      where: {
        idSprint,
      },
    });
  }
  /**
   * Find comment by idProject
   *
   * @param idProject - project id
   */
  public static async findByIdProject(idProject: string): Promise<Comment[] | null> {
    return prisma.comment.findMany({
      where: {
        idProject,
      },
    });
  }
  /**
   * Find comment by idTask
   *
   * @param idTask - task id
   */
  public static async findByIdTask(idTask: string): Promise<Comment[] | null> {
    return prisma.comment.findMany({
      where: {
        idTask,
      },
    });
  }
  /**
   * Find comment by idReturn
   *
   * @param idReturn - return id
   */
  public static async findByIdReturn(idReturn: string): Promise<Comment[] | null> {
    return prisma.comment.findMany({
      where: {
        idReturn,
      },
    });
  }
  /**
   * Find comment by idWastedHour
   *
   * @param idWastedHour - wastedHour id
   */
  public static async findByIdWastedHour(idWastedHour: string): Promise<Comment[] | null> {
    return prisma.comment.findMany({
      where: {
        idWastedHour,
      },
    });
  }
  /**
   * Find comment by idEvent
   *
   * @param idEvent - Event id
   */
  public static async findByIdEvent(idEvent: string): Promise<Comment[] | null> {
    return prisma.comment.findMany({
      where: {
        idEvent,
      },
    });
  }
  /**
   * Find comment by idPushTime
   *
   * @param idPushTime - PushTime id
   */
  public static async findByIdPushTime(idPushTime: string): Promise<Comment[] | null> {
    return prisma.comment.findMany({
      where: {
        idPushTime,
      },
    });
  }
  /**
   * Update comment by id
   *
   * @param id - comment id
   * @param data - incoming data
   */
  public static async update(id: string, data: CommentInputUpdate): Promise<Comment> {
    return prisma.comment.update({
      where: {
        id,
      },
      data,
    });
  }
  /**
   * Delete comment by id
   *
   * @param id - comment id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}