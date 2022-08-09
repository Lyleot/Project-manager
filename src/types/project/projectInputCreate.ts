import {Status, TypeProject} from "@prisma/client";

interface ProjectInputCreate {
    name: string,
    dateStart: Date,
    dateFinih: Date,
    status: Status,
    type: TypeProject,
    idCreator: string,
}

export default ProjectInputCreate;