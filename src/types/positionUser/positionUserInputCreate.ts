import { TypeDepartment, Level } from '.prisma/client';

interface PositionUserInputCreate {
    department: TypeDepartment,
    level: Level,
    position?: string,
    idUser: string,
}

export default PositionUserInputCreate;