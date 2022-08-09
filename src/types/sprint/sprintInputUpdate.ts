import {Status} from "@prisma/client";

interface SprintInputUpdate {
    number?: number,
    idProject?: string,
    dateStart?: Date,
    dateFinish?: Date,
    status?: Status,
    updatedAt?: Date,
}

export default SprintInputUpdate;