import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersFriendsComponent } from './users-friends.component';

const routes: Routes = [
    {
        path: '', component: UsersFriendsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersFriendsRoutingModule {
}