import prisma from '../prismaClient';
import { User } from '@prisma/client';
import argon2 from 'argon2';
import UserInputUpdate from '../types/user/userInputUpdate';
import UserInputCreate from '../types/user/userInputCreate';

/**
 *
 */
export default class UserService {
  /**
   * Create new user
   *
   * @param data - data got after user finishes registration
   *
   * @todo Если уже есть пользователь с такой почтой, номером и так далее
   */
  public static async create(data: UserInputCreate): Promise<User> {
    data.password = await argon2.hash(data.password);

    return prisma.user.create({
      data,
    });
  }

  /**
   * Find user by email
   *
   * @param email - User's mail
   */
  public static async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * Find user by id
   *
   * @param id - user id
   */
  public static async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Find user by phone
   *
   * @param phone - user's phone
   */
  public static async findByPhone(phone: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }

  /**
   * Delete user by id
   *
   * @param id - user id
   */
  public static async deleteById(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Update user by id
   *
   * @param id - user id
   * @param data - incoming data
   */
  public static async update(id: string, data: UserInputUpdate): Promise<User> {
    if (data.password) {
      data.password = await argon2.hash(data.password);
    }

    return prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}