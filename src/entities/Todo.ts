export enum TODO_VISIBILITY_STATUS {
    PUBLIC = 100,
    FRIENDS = 200
}

export class Todo {
    public id: number
    public userId: number
    public content: string
    public createdAt: string

    constructor(options) {
        Object.assign(this, options);
    }
}