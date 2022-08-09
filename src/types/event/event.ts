import { TypeEvent } from '.prisma/client';
import Comment from '../comment/comment';

interface Event {
    id: string,
    name: string,
    date: string,
    typeEvent: TypeEvent,
    createdAt: Date,
    updatedAt: Date,
    idCreator: string,

    comment?: Comment[]
}

export default Event;