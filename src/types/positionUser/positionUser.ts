import { TypeDepartment, Level } from '.prisma/client';

interface PositionUser {
    id: string,
    department: TypeDepartment,
    level: Level,
    position?: string,
    idUser: string,
    createdAt: Date,
    updatedAt: Date
}

export default PositionUser;