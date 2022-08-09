import { TypeComment } from '@prisma/client';

interface CommentInputCreate {
    content: string,
    idProject?: string,
    idSprint?: string,
    idTask?: string,
    idReturn?: string,
    idWastedHour?: string,
    idPushTime?: string,
    idEvent?: string,
    typeComment: TypeComment,
    idCreator: string
}

export default CommentInputCreate;