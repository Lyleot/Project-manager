

interface TimeTask {
    id: string,
    idTask?: string,
    dateStart: Date,
    dateFinish: Date,
    timeLead: number,
    currentState: number,
    createdAt: Date,
    updatedAt: Date,
    idCreator: string,
}

export default TimeTask;