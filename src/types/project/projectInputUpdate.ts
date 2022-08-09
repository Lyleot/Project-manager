import {Status, TypeProject} from "@prisma/client";

interface ProjectInputUpdate {
    name?: string,
    dateStart?: Date,
    dateFinih?: Date,
    status?: Status,
    type?: TypeProject,
    updatedAt?: Date,
}

export default ProjectInputUpdate;