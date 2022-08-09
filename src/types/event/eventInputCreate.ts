import { TypeEvent } from '.prisma/client';

interface EventInputCreate {
    name: string,
    date: string,
    typeEvent: TypeEvent,
    idCreator: string
}

export default EventInputCreate;