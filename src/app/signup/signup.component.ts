import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { User } from '../../entities/User';
import { AuthService } from '../shared';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    public model: User

    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.model = new User();
    }

    async submitHandler() {
        const response = await this.auth.register(this.model);

        if (response['success']) {
            alert('Success!');
        } else {
            alert('Fail!');
        }
    }
}
