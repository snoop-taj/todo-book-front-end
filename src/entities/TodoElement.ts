
export class TodoElement {
    id: number;
    userName: string;
    content: string;
    createdAt: string;
  
    constructor(options) {
      Object.assign(this, options);
    }
  }