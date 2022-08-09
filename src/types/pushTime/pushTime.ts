import Comment from '../comment/comment';

interface PushTime {
    id: string,
    time: number,
    idUser: string,
    idTask: string,
    createdAt: Date

    comment?: Comment[]
}

export default PushTime;