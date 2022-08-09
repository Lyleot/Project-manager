import {Status} from "@prisma/client";
import Return from "../return/return";
import WastedHour from "../wastedHour/wastedHour";
import Comment from "../comment/comment";
import TimeTask from "../timeTask/timeTask";

interface Task {
    id: string,
    name: string,
    idDeveloper: string,
    idTester: string,
    idSprint: string,
    status: Status,
    createdAt: Date,
    updatedAt: Date,
    idCreator: string,
  
    return: Return[],
    wastedHour: WastedHour[],
    comment: Comment[]
    timeTask: TimeTask[]
}

export default Task;