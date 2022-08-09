import {Role} from "@prisma/client";

interface UserInputCreate {
    name: string,
    surname?: string,
    middleName?: string,
    email?: string,
    password: string,
    role?: Role,
    dateOfBirth?: Date,
    phone?: string,
    telegram?: string,
    slack?: string,
    github?: string,
}

export default UserInputCreate;