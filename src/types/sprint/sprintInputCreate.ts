import {Status} from "@prisma/client";

interface SprintInputCreate {
    number: number,
    idProject: string,
    dateStart: Date,
    dateFinish: Date,
    status: Status,
    idCreator: string,
}

export default SprintInputCreate;