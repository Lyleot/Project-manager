import Comment from "../comment/comment";

interface WastedHour {
    id: string,
    loss: number,
    idUser: string,
    idProject: string,
    idSprint: string,
    idTask: string,
    createdAt: Date,
  
    comment: Comment[]
}

export default WastedHour;