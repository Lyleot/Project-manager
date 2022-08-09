import config from './config.json';
import UserService from '../services/user';
import { User } from '.prisma/client';
/**
 * get property
 *
 * @param nameMethod - name method
 * @param userId - user id
 */
export async function AccessByRole(nameMethod: string, userId: string | undefined ): Promise< boolean > {
  const user: User | null = await UserService.findById(String(userId));

  if (user) {
    const accessRole = Object.values(config)[Object.keys(config).indexOf(String(user.role))];

    return Object.values(accessRole)[Object.keys(accessRole).indexOf(nameMethod)];
  } else {
    return false;
  }
}
