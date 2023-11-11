import { v4 as uuid } from "uuid"

export const generateKey = (pre: string) => {
    return `${ pre }_${ uuid() }`;
}