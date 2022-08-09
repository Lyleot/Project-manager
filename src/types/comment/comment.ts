import { TypeComment } from '@prisma/client';

interface Comment {
    id: string,
    content: string,
    idProject?: string,
    idSprint?: string,
    idTask?: string,
    idReturn?: string,
    idWastedHour?: string,
    idPushTime?: string,
    idEvent?: string,
    typeComment: TypeComment,
    createdAt: Date,
    updatedAt: Date,
    idCreator: string
}

export default Comment;