import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFriendsComponent } from './users-friends.component';
import { UsersFriendsRoutingModule } from './users-friends-routing.module';
import { PageHeaderModule } from '../../../shared';
import { MatTableModule, MatButtonModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        UsersFriendsRoutingModule,
        PageHeaderModule,
        MatButtonModule,
        MatTableModule
    ],
    declarations: [UsersFriendsComponent]
})
export class UsersFriendsModule {}
