import {Status} from "@prisma/client";
import Task from "../task/task";
import Return from "../return/return";
import WastedHour from "../wastedHour/wastedHour";
import Comment from "../comment/comment";

interface Sprint {
    id: string,
    number: number,
    idProject: string,
    dateStart: Date,
    dateFinish: Date,
    status: Status,
    createdAt: Date,
    updatedAt: Date,
    idCreator: string,
  
    task: Task[],
    return: Return[],
    wastedHour: WastedHour[],
    comment: Comment[]
}

export default Sprint;