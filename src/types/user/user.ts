import { Role } from '@prisma/client';
import UserProject from '../userProject';
import Sprint from '../sprint/sprint';
import Task from '../task/task';
import Return from '../return/return';
import WastedHour from '../wastedHour/wastedHour';
import Comment from '../comment/comment';
import TimeTask from '../timeTask/timeTask';
import PushTime from '../pushTime/pushTime';
import PositionUser from '../positionUser/positionUser';
import Event from '../event/event';
import Image from '../image';
import File from '../file';

interface User {
    id: string,
    name: string,
    surname?: string,
    middleName?: string,
    email?: string,
    password: string,
    role?: Role,
    dateOfBirth?: Date,
    phone?: string,
    telegram?: string,
    slack?: string,
    github?: string,
    idSupervisor?: string,
    createAt: Date,
    updateAt: Date,

    userProject?: UserProject[],
    userTask?: Task[],
    lastUserTask?: Task[],
    userReturn?: Return[],
    userWastedHour?: WastedHour[],
    userComment?: Comment[],
    supervisorUser?: User[],
    userPushTime?: PushTime[],
    userPosition?: PositionUser[],

    creatorUserProject?: UserProject[],
    creatorSprint?: Sprint[],
    creatorTask?: Task[],
    creatorReturn?: Return[],
    creatorComment?: Comment[],
    creatorTimeTask?: TimeTask[],
    creatorEvent?: Event[],
    creatorImage?: Image[],
    creatorFile?: File[]
}

export default User;