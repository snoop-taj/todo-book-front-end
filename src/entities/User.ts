import { getTypeNameForDebugging } from "@angular/common/src/directives/ng_for_of";

export class User {
    public fullName : string
    public email : string
    public password : string
    public id: string
    public friends: User[]

    constructor(fullName?, email?, password?, id?, friends?) {
        this.fullName = fullName;
        this.email = email;
        this.password = password
        this.id = id
        this.friends = friends
    }

    getName() {
        return this.fullName;
    }

    isFriendOf(user: User) {
        if (!this.friends) {
            return false;
        }

        return Boolean(this.friends.find(friend => friend.id === user.id));
    }
}
