import {Status} from "@prisma/client";

interface TaskInputUpdate {
    idDeveloper?: string,
    idTester?: string,
    idSprint?: string,
    status?: Status,
    updatedAt: Date,
}

export default TaskInputUpdate;