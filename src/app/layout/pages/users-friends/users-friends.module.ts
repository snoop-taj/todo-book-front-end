import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFriendsComponent } from './users-friends.component';
import { UsersFriendsRoutingModule } from './users-friends-routing.module';
import { PageHeaderModule } from '../../../shared';


@NgModule({
    imports: [CommonModule, UsersFriendsRoutingModule, PageHeaderModule],
    declarations: [UsersFriendsComponent]
})
export class UsersFriendsModule {}
