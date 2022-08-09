import { TypeDepartment, Level } from '.prisma/client';

interface PositionUserInputUpdate {
    department: TypeDepartment,
    level: Level,
    position?: string,
    updatedAt: Date
}

export default PositionUserInputUpdate;