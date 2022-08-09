import { Status, TypeProject } from '@prisma/client';
import UserProject from '../userProject';
import Sprint from '../sprint/sprint';
import Return from '../return/return';
import WastedHour from '../wastedHour/wastedHour';
import Comment from '../comment/comment';

interface Project {
    id: string,
    name: string,
    dateStart: Date,
    dateFinih: Date,
    status: Status,
    type: TypeProject,
    createdAt: Date,
    updatedAt: Date,
    idCreator: string,

    userProject?: UserProject[],
    sprint?: Sprint[],
    return?: Return[],
    wastedHour?: WastedHour[],
    comment?: Comment[]
}

export default Project;