import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { User } from '../../entities/User';
import { AuthService } from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public model: User

    constructor(public router: Router, private auth: AuthService) { }

    ngOnInit() {
        this.model = new User();
    }

    async login() {
        const response = await this.auth.login(this.model);

        this.router.navigate(['dashboard']);
    }
}
