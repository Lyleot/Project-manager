import { TypeEvent } from '.prisma/client';

interface EventInputUpdate {
    name?: string,
    date?: string,
    typeEvent?: TypeEvent,
    updatedAt: Date,
}

export default EventInputUpdate;