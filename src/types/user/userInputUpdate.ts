import { Role } from '@prisma/client';

interface UserInputUpdate {
    name?: string,
    surname?: string,
    middleName?: string,
    email?: string,
    password?: string,
    role?: Role,
    dateOfBirth?: Date,
    phone?: string,
    telegram?: string,
    slack?: string,
    github?: string,
    idSupervisor?: string,
    updatedAt: Date
}

export default UserInputUpdate;