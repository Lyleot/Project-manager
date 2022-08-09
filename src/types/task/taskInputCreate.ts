import {Status} from "@prisma/client";

interface TaskInputCreate {
    name: string,
    idDeveloper?: string,
    idTester?: string,
    idSprint: string,
    status: Status,
    idCreator: string,
}

export default TaskInputCreate;