import Comment from "../comment/comment";

interface Return {
    id: string,
    idUser: string,
    idProject: string,
    idSprint: string,
    idTask: string,
    createdAt: Date,
    idCreator: string,
  
    comment: Comment[]
}

export default Return;